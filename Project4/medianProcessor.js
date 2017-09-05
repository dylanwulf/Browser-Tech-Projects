self.onmessage = function(data) {
    var imgData = data.data.imgData; //original image data
    var empty = data.data.emptyImgData; //empty array to be filled with new processed data
    //empty array: width and height should both be 2 less than original
    var emptyArr = empty.data;
    var x = data.data.x; //x and y location on the canvas
    var y = data.data.y;
    for (var py = 1; py < imgData.height - 1; py++) { //do calculations for every single pixel
        for (var px = 1; px < imgData.width - 1; px++) {
            var newPixel = processPixel(imgData, px, py);
            var pos = 4 * ((py-1) * empty.width + (px-1)); //position in array of current pixel
            emptyArr[pos] = newPixel.red;
            emptyArr[pos + 1] = newPixel.green;
            emptyArr[pos + 2] = newPixel.blue;
            emptyArr[pos + 3] = newPixel.alpha;
        }
    }
    //when all done, post data back to main
    postMessage({imgData: empty, x:x, y:y, workerNum: data.data.workerNum});
}

//this function processes a single pixel
var processPixel = function(imgData, px, py) {
    var h = imgData.height;
    var w = imgData.width;
    var arr = imgData.data;
    var reds = [];
    var greens = [];
    var blues = [];
    for (var y = py - 1; y <= py + 1; y++) { //start at top left pixel, go to bottom right
        for (var x = px - 1; x <= px + 1; x++) {
            var pos = 4 * (y * w + x); //array position of current pixel
            reds.push(arr[pos]);
            greens.push(arr[pos + 1]);
            blues.push(arr[pos + 2]);
        }
    }
    var fr = getMedian(reds); //sort and get median values
    var fg = getMedian(greens);
    var fb = getMedian(blues);
    var fa = 255; //alpha stays at max because we're not dealing with opacity right now
    var resultPixel = {red: fr, green: fg, blue: fb, alpha: fa}; 
    return resultPixel; //store values in object and return
}

//This function sorts an array and returns the median number
var getMedian = function(arr) {
    var numCompare = function(a, b) {return a-b;};
    arr.sort(numCompare);
    if (arr.length % 2 == 0) { //if array length is even, there is no middle number
        var a = arr[arr.length / 2 - 1]; //so we take the average of the two middle nums
        var b = arr[arr.length / 2];
        return (a+b)/2; //and return that
    }
    else {
        return arr[Math.floor(arr.length/2)]; //if the array length is odd, return the middle num
    }
}
