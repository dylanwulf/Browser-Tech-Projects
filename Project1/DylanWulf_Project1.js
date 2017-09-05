/* Dylan Wulf
 * Feb 21, 2016
 * CSC 470-03
 * Project 1: Monte Hall Problem
 */

;(function() {
    //returns a random integer number between min and max, inclusive
    var randomInt = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    //Simulates the Monte Hall problem numTrials number of times and displays
    //the results in an alert popup
    var simulate = function(numTrials) {
        //Start nstay and nswitch at 0
        var nstay = 0;
        var nswitch = 0;
        
        //Create the play function, which simulates Monte Hall problem one time
        var play = function() {
            //Create array of all goats
            var doors = ["goat", "goat", "goat"];
            
            //Find random location to put the car
            var carLocation = randomInt(0, 2);
            doors[carLocation] = "car";
            
            //Find the player's door choice (also random)
            var playerChoice = randomInt(0, 2);
            
            //Find a door with a goat that the player has not chosen
            //This door now cannot be selected
            var openGoatDoor = 0;
            for (var o = 0; o < doors.length; o++) {
                if (doors[o] !== "car" && o !== playerChoice)
                    openGoatDoor = o;
            }
            
            //Find the remaining door that hasn't been selected or opened
            var uselectedUnopenedDoor = 0;
            for (var x = 0; x < doors.length; x++) {
                if (x !== playerChoice && x !== openGoatDoor) {
                    unselectedUnopenedDoor = x;
                }
            }
            
            //Find whether the player would have benefited from staying or switching
            if (doors[playerChoice] === "car")
                nstay += 1;
            else if (doors[unselectedUnopenedDoor] === "car")
                nswitch += 1;
            else
                console.log("Uh oh. Car was behind openGoatDoor. That's bad.");
        }
        
        //Call play() the number of time specified in the argument numTrials
        for (var i = 0; i < numTrials; i++)
            play();
        
        //Finally, display results
        alert("Staying was beneficial " + (nstay / numTrials)*100 + "% of the time. \n" +
              "Switching was beneficial " + (nswitch / numTrials)*100 + "% of the time.");
    }
    
    //Call the simulate function with 100,000 trials
    simulate(100000);
})();