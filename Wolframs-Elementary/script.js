//Made with ♥ by Tom Franklin
w=500; //Size of Grid, recommend equal height and width
h=500;
var size = 10; //Size of cubes, make sure the height/width are both dividable by the size. 
var frames = 30; //Framerate. Works with max frames tbh. 
var ruleset = [0,0,0,1,1,1,1,0];
var cells = Array(w/size);
var generation = 0;
var grid = [];

function setup() {
    createCanvas(w, h);
    background(200);
    frameRate(frames);
    
    for(var f = 0; f!=cells.length;f++) {
            cells[f] = 0;
    }

    cells[Math.round(cells.length/2)] = 1;

    for(var i = 0; i<w/size; i++) {
        for(var ii=0;ii<h/size; ii++) {
            fill('white');
            square(ii*size,i*size, size); 
        }
    }
    grid.length = h/size;

    grid.push(cells);
}


function draw() {

    console.log(cells);

    for(var i = 0; i<w/size; i++) {
        for(var ii=0;ii<h/size; ii++) {
            fill('white');
            square(ii*size,i*size, size); 
        }
    }
    
    var nextgen = Array(w/size);
    
    for(var i = 0; i<cells.length;i++) {
        if(cells[i-1] !=null) {
            
            var left = cells[i-1];
        } else {
            var left = 0;
        }
        var center = cells[i];
        if(cells[i+1]!=null) {
            var right = cells[i+1];
        } else {
            var right = 0;
        }
        nextgen[i] = wolframRules(left,center,right);
    }
 
    grid.push(nextgen);
    cells = nextgen;
    generation++;

        grid.shift();
    
    
    for(var i = 0; i<grid.length; i++) {
        if(grid[i] != null) {
            for(var ii=0; ii<grid[i].length;ii++) {
                if(grid[i][ii] == 1) {
                    fill('#262626');
                    square(ii*size,i*size, size);
                } 
            }
        }   
    }
}

function wolframRules(a,b,c) {
    var idx = 4*a + 2*b + c;
    return ruleset[7 - idx];
}


function changeFrameRate() {
    frames = parseInt(document.getElementById('frames').value);
    frameRate(frames);
}

function resetFunc() {
    setup();
}

function changeRule() {
switch(document.getElementById('ruleSelect').value) {
    case "30": ruleset = [0,0,0,1,1,1,1,0] //Rule 30
    break; 
    case "54": ruleset = [0,0,1,1,0,1,1,0] //Rule 54
    break; 
    case "60": ruleset = [0,0,1,1,1,1,0,0]; //Rule 60
    break; 
    case "90": ruleset = [0,1,0,1,1,0,1,0]; //Rule 90
    break; 
    case "94": ruleset = [0,1,0,1,1,1,1,0]; //Rule 94
    break; 
    case "102": ruleset = [0,1,1,0,0,1,1,0]; //Rule 102
    break; 
    case "122": ruleset = [0,1,1,1,1,0,1,0]; //Rule 122
    break; 
    case "126": ruleset = [0,1,1,1,1,1,1,0]; //Rule 126
    break; 
    case "150": ruleset = [1,0,0,1,0,1,1,0]; //Rule 150
    break; 
    case "158": ruleset = [1,0,0,1,1,1,1,0]; //Rule 158
    break; 
    case "182": ruleset = [1,0,1,1,0,1,1,0]; //Rule 182
    break; 
    case "188": ruleset = [1,0,1,1,1,1,0,0]; //Rule 188
    break; 
    case "190": ruleset = [1,0,1,1,1,1,1,0]; //Rule 190
    break; 
    case "220": ruleset = [1,1,0,1,1,1,0,0]; //Rule 220
    break; 
    case "222": ruleset = [1,1,0,1,1,1,1,0]; //Rule 222
    break; 
    case "250": ruleset = [1,1,1,1,1,0,1,0]; //Rule 250
    break; 
}

}

$(document).ready(function() {

});