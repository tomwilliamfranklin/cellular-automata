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
}

function bringAlive() {
    var random =  (Math.floor((Math.random() * land.length)));
    set(land[random][0], land[random][1]);
    updatePixels(); 
}

function draw() {
    bringAlive();
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