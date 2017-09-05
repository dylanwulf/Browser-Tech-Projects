/* Filename: shapes.js
 * Dylan Wulf
 * Project 3
 * CSC 470-03
 * April 17, 2016
 * Defines constructors for different shape objects 
 * and provides functions to draw those shapes on a 2d canvas
 */
 
 //Shape constructor
 var Shape = function() {
    //Set default values
    this.fillStyle = "#FFFFFF"; //white fill
    this.strokeStyle = "#000000"; //black stroke
    this.lineWidth = 4; //4 px line width
};
 
//Shape draw function will be inherited by all shapes
Shape.prototype.draw = function(ctx) {
    this.trace(ctx); //first trace the shape
    if (this.strokeStyle !== undefined && this.lineWidth !== undefined) {
        //If we're gonna stroke it, stroke it.
        ctx.strokeStyle = this.strokeStyle;
        ctx.lineWidth = this.lineWidth;
        ctx.stroke();
    }
    if (this.fillStyle !== undefined) {
        //If we're gonna fill it, fill it
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
    }
};

//Constructor for line shape
//(x1, y1): beginning point of line
//(x2, y2): end point of line
var Line = function(x1, y1, x2, y2) {
    Shape.call(this);
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.fillStyle = undefined; //Lines don't have space inside, so don't bother filling
};

Line.prototype = Object.create(Shape.prototype); //set up inheritence
Line.prototype.constructor = Line;
Line.prototype.trace = function(ctx) { //trace the line
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1); //move to beginning point
    ctx.lineTo(this.x2, this.y2); //draw line to end point
};

//Constructor for rectangle shape
//(x, y): point of top-left corner of rectangle
//w: width, h: height
var Rectangle = function(x, y, w, h) {
    Shape.call(this);
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
};
Rectangle.prototype = Object.create(Shape.prototype); //set up inheritence
Rectangle.prototype.constructor = Rectangle;
Rectangle.prototype.trace = function(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y); //start at top left
    ctx.lineTo(this.x + this.w, this.y); //draw line to top right
    ctx.lineTo(this.x + this.w, this.y + this.h); //draw line to bottom right
    ctx.lineTo(this.x, this.y + this.h); //draw line to bottom left
    ctx.closePath(); //close the shape
};

//Constructor for Ellipse shape
//(cx, cy): center point of ellipse
//rx: x radius (1/2 of width)
//ry: y radius (1/2 of height)
var Ellipse = function(cx, cy, rx, ry) {
    Shape.call(this);
    this.cx = cx;
    this.cy = cy;
    this.rx = rx;
    this.ry = ry;
};
Ellipse.prototype = Object.create(Shape.prototype); //set up inheritence
Ellipse.prototype.constructor = Ellipse;
Ellipse.prototype.trace = function(ctx) {
    var xyRatio = this.rx / this.ry; //calculate x to y ratio
    ctx.translate(this.cx, this.cy); //translate to correct position
    ctx.scale(1, 1 / xyRatio); //scale by x:y ratio so it's an ellipse and not a circle
    ctx.beginPath();
    ctx.arc(0, 0, this.rx, 0, Math.PI * 2); //draw arc at (0, 0) (translation done above)
    ctx.closePath();
    ctx.scale(1, xyRatio); //scale back so future shapes aren't affected
    ctx.translate(-this.cx, -this.cy); //translate back so future shapes aren't affected
};

//Constructor for polygon shape
//(cx, cy): center point of polygon
//radius: distance from the center to the points of polygon
//npoints: the number of points (or sides) on the polygon
var Polygon = function(cx, cy, radius, npoints) {
    Shape.call(this);
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.npoints = npoints;
};
Polygon.prototype = Object.create(Shape.prototype); //set up inheritence
Polygon.prototype.constructor = Polygon;
Polygon.prototype.trace = function(ctx) {
    var theta = Math.PI * 2 / this.npoints; //distance (in radians) between points
    var r = this.radius; //just for convenience
    ctx.beginPath();
    for (var i = 0; i < this.npoints; i++) { //draw outer points on an invisible circle
        ctx.lineTo(r * Math.cos(i * theta - Math.PI / 2) + this.cx, r * Math.sin(i * theta - Math.PI / 2) + this.cy);
    }
    ctx.closePath(); //close the shape
};

//Constructor for star shape
//(cx, cy): center point of star
//radius: distance from the center to the outer points of the star
//npoints: number of outer points on the star
var Star = function(cx, cy, radius, npoints) {
    Shape.call(this);
    this.cx = cx;
    this.cy = cy;
    this.radius = radius;
    this.npoints = npoints;
};
Star.prototype = Object.create(Shape.prototype); //set up inheritence
Star.prototype.constructor = Star;
Star.prototype.trace = function(ctx) {
    var innerR = 0.5 * this.radius; //Inner radius is half the outer radius
    var theta = Math.PI * 2 / (this.npoints * 2); //distance (in radians) between points
    ctx.beginPath();
    for (var i = 0; i < this.npoints * 2; i++) {
        var r = (i % 2 === 0)? this.radius : innerR; //changes depending on whether this is an inner or outer point
        //draw outer points on an invisible circle of size radius, 
        //and inner points on invisible circle of size innerR
        ctx.lineTo(r * Math.cos(i * theta - Math.PI / 2) + this.cx, r * Math.sin(i * theta - Math.PI / 2) + this.cy);
    }
    ctx.closePath(); //close the shape
};