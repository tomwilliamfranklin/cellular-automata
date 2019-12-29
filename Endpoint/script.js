//Made with ♥ by Tom Franklin

w=270; //Size of Grid, recommend equal height and width
h=130;
var frames = 30; //Framerate. Works with max frames tbh. 
//green = 4,255,0
//blue = 26,0,255
let img;

function preload() {
  img = loadImage('map.jpg');
}

land = [];
cells = [];
function setup() {
    createCanvas(w, h);
    background(200);
    image(img, 0, 0, width, height);
    
    nextposw = 0;
    nextposh = 0;
    frameRate(frames); // Attempt to refresh at starting FPS
   
    for(var j = 0; j<w;j++) {
        for(var jj=0; jj<h;jj++) {
            if(get(j,jj)[0] === 4 && get(j,jj)[1] === 255 && get(j,jj)[2] === 0) {
                land.push([j,jj]);
            }
        }
    }

    $("#defaultCanvas0").css({ 'height': "720px" });
    $("#defaultCanvas0").css({ 'width': "1080px" });
    bringAlive();
}

function bringAlive() {
    var random =  (Math.floor((Math.random() * land.length)));
    set(land[random][0], land[random][1], [Math.random() * 255,Math.random() * 255, Math.random() * 255,255]);
    cells.push({
        x:land[random][0],
        y:land[random][1],
        alive:true,
        health:100,
    });
    land.splice(random, 1);
    updatePixels(); 
}


function bringAliveManual(w, h) {
    set(w, h, [Math.random() * 255,Math.random() * 255, Math.random() * 255,255]);
    cells.push({
        x:w,
        y:h,
        alive:true,
        health:100,
    });

    for(var i = 0; i < land.length; i++) {
        if(land[i][0] == w && land[i][1] == h) {
           land.splice(i, 1);
            break;
        }
    };
    updatePixels(); 
}

function rules() {
    var Cell = {
        alive:false, 
        coor:[0,0], 
    }
}

function draw() {
    var len = cells.length;

    let coor = [[-1, -1], [-1, 0], [-1, +1],
    [ 0, -1],          [ 0, +1],
    [+1, -1], [+1, 0], [+1, +1]];
    for(var j=0;j!=len;j++) {
        for(var i =0; i < coor.length; i++) {
            if(land.filter(obj => obj[0] == cells[j].x+coor[i][0] && obj[1] == cells[j].y+coor[i][1]).length != 0) {
                bringAliveManual(cells[j].x+coor[i][0],cells[j].y+coor[i][1]);
            }
        }
    }
}

function changeFrameRate() {
    frames = parseInt(document.getElementById('frames').value);
    frameRate(frames);
}

function resetFunc() {
    setup();
}


function mouseClicked() {

}

$(document).ready(function() {

});