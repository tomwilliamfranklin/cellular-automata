//Made with ♥ by Tom Franklin

w=1000; //Size of Grid, recommend equal height and width
h=1000;
var size = 25; //Size of cubes, make sure the height/width are both dividable by the size. 
var frames = 30; //Framerate. Works with max frames tbh. 


var squares = Array(w/size+1);
function setup() {
    for(var foo = 0; foo < squares.length; foo++) {
        squares[foo] = Array(w/size+1);
    }

    squares[1][6] = true;

    createCanvas(w, h);
    background(200);
    nextposw = 0;
    nextposh = 0;

    frameRate(frames); // Attempt to refresh at starting FPS
    for(i=0;i<=w/size;i++) {
        for(ii=0;ii<=h/size;ii++) {
            
            squares[i][ii] = false;
            square(nextposw,nextposh, size);
            nextposh = nextposh+size;
        }
        nextposh = 0;
        nextposw = nextposw+size;
    }
    bringAliveMultiple(300);
}

function draw() {
    ConwaysRules();
}

function bringAlive(w,h) {
    var maxw = (w/size) + 1;
    var maxh = (h/size) + 1;
    fill(color(0, 0, 255));
    square(w,h, size);
    squares[w/size][h/size] = true;
}

var nextFrame = Array(w/size+1);

function ConwaysRules() {
    for(var foo = 0; foo < nextFrame.length; foo++) {
        nextFrame[foo] = Array(w/size+1);
    }

    for(i=0;i<=w/size;i++) {
        for(ii=0;ii<=h/size;ii++) {
            aliveNeighbours = 0;
            try  {
                if(squares[i-1][ii-1]==true) {
                    aliveNeighbours++;
                } } catch (e) {
                }
                try { if(squares[i][ii-1]==true) {
                    aliveNeighbours++;
                }  } catch (e) {

                }
               try { if(squares[i+1][ii-1]==true) {
                    aliveNeighbours++;
                }  } catch (e) {

                }
               try { if(squares[i-1][ii]==true) {
                    aliveNeighbours++;
                }  } catch (e) {

                }
               try { if(squares[i+1][ii]==true) {
                    aliveNeighbours++;
                }  } catch (e) {

                }
                try { if(squares[i-1][ii+1]==true) {
                    aliveNeighbours++;
                }  } catch (e) {

                }
                try { if(squares[i][ii+1]==true) {
                    aliveNeighbours++;
                }  } catch (e) {

                }
                try { if(squares[i+1][ii+1]==true) {

                    aliveNeighbours++;
                } } catch (e) {
                }
                fill("white");
                if(squares[i][ii]) {
                    if(aliveNeighbours < 2 || aliveNeighbours > 3) {
                        nextFrame[i][ii] = false;
                    }
                    if(aliveNeighbours === 2 || aliveNeighbours === 3) {
                        nextFrame[i][ii] = true;
                    }
                } else {
                    if(aliveNeighbours === 3) {
                        nextFrame[i][ii] = true;
                    }
                }
                

        }
    }

    for(i=0;i<=w/size;i++) {
        for(ii=0;ii<=h/size;ii++) {
            if(nextFrame[i][ii]) {
                fill(color(0, 0, 255));
                squares[i][ii] = true;
                square(i*size,ii*size, size);       
            } else {
                fill('white');
                squares[i][ii] = false;
                square(i*size,ii*size, size);        
            }
        }
    }
}


function bringAlive() {
    var maxw = (w/size) + 1;
    var maxh = (h/size) + 1;
    var coorw =  (Math.floor((Math.random()) * maxw)) * size;
    var coorh =  (Math.floor((Math.random()) * maxh)) * size;
    fill(color(0, 0, 255));
    square(coorw,coorh, size);
    squares[coorw/size][coorh/size] = true;
}


function bringAliveMultiple(num) {
    for(var n = 0; n != num; n ++) {
        var maxw = (w/size) + 1;
        var maxh = (h/size) + 1;
        var coorw =  (Math.floor((Math.random()) * maxw)) * size;
        var coorh =  (Math.floor((Math.random()) * maxh)) * size;
        fill(color(0, 0, 255));
        square(coorw,coorh, size);
        squares[coorw/size][coorh/size] = true;
    }
}

function changeFrameRate() {
    frames = parseInt(document.getElementById('frames').value);
    setup();
}


$(document).ready(function() {

});