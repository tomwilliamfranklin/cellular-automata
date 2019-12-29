//Made with ♥ by Tom Franklin
w=1000; //Size of Grid, recommend equal height and width
h=1000;
let size = 10; //Size of cubes, make sure the height/width are both dividable by the size. 
let frames = 30; //Framerate. Works with max frames tbh. 
let ruleset = [0,0,0,1,1,1,1,0];
let cells = Array(w/size);
let generation = 0;
let grid = [];

function setup() {
    createCanvas(w, h);
    background(200);
    frameRate(frames);
    
    for(let f = 0; f!=cells.length;f++) {
            cells[f] = 0;
    }

    cells[Math.round(cells.length/2)] = 1;

    for(let i = 0; i<w/size; i++) {
        for(let ii=0;ii<h/size; ii++) {
            fill('white');
            square(ii*size,i*size, size); 
        }
    }
    grid.length = h/size;

    grid.push(cells);
}


function draw() {
    for(let i = 0; i<w/size; i++) {
        for(let ii=0;ii<h/size; ii++) {
            fill('white');
            square(ii*size,i*size, size); 
        }
    }
    
    let nextgen = Array(w/size);
    
    
    for(let i = 0; i<cells.length;i++) {
        if(cells[i-1] !=null) {         
            var left = cells[i-1];
        } else {
            var left = 0;
        }
        let center = cells[i];
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
    
    
    for(let i = 0; i<grid.length; i++) {
        if(grid[i] != null) {
            for(let ii=0; ii<grid[i].length;ii++) {
                if(grid[i][ii] == 1) {
                    fill('#262626');
                    square(ii*size,i*size, size);
                } 
            }
        }   
    }
}

function wolframRules(a,b,c) {
    let idx = 4*a + 2*b + c;
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