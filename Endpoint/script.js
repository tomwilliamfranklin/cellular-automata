//Made with ♥ by Tom Franklin

const w=135; //Size of Grid, recommend equal height and width
const h=65;
let frames = 30; //Framerate. Works with max frames tbh.
let teams = 2; 
//green = 4,255,0
//blue = 26,0,255
let img;

function preload() {
  img = loadImage('map.jpg');
}

land = [];
cells = [];
function setup() {
    cells = [];
    land = [];
    createCanvas(w, h);
    background(200);
    image(img, 0, 0, width, height);
    
    nextposw = 0;
    nextposh = 0;
    frameRate(frames); // Attempt to refresh at starting FPS
   
    for(let j = 0; j<w;j++) {
        for(let jj=0; jj<h;jj++) {
            if(get(j,jj)[0] === 4 && get(j,jj)[1] === 255 && get(j,jj)[2] === 0) {
                land.push([j,jj]);
            }
        }
    }

    $("#defaultCanvas0").css({ 'height': "720px" });
    $("#defaultCanvas0").css({ 'width': "1080px" });
    for(let i = 0; i<teams; i++) {
        bringAliveTeam([Math.random() * 255,Math.random() * 255,Math.random() * 255]); //random team colours
    }
}


function draw() {
    let len = cells.length; //has to be set rather than pointed to 
    const coor = [[-1, -1], [-1, 0], [-1, +1],
    [ 0, -1],          [ 0, +1],
    [+1, -1], [+1, 0], [+1, +1]];
    for(let j=0;j!=len;j++) {
        for(let i =0; i < coor.length; i++) {
            if(land.filter(obj => obj[0] == cells[j].x+coor[i][0] && obj[1] == cells[j].y+coor[i][1]).length != 0) { //i don't even know 
                bringAliveManual(cells[j].x+coor[i][0],cells[j].y+coor[i][1],cells[j].team);
            }
        }
    
    }
}

function bringAliveTeam(team) {
    let random =  (Math.floor((Math.random() * land.length)));
    set(land[random][0], land[random][1], [team[0],team[1], team[2],255]);
    cells.push({
        x:land[random][0],
        y:land[random][1],
        alive:true,
        team:team,
        health:100,
    });
    land.splice(random, 1);
    updatePixels(); 
}


function bringAliveRandom() {
    let random =  (Math.floor((Math.random() * land.length)));
    set(land[random][0], land[random][1], [Math.random() * 255,Math.random() * 255, Math.random() * 255,255]);
    cells.push({
        x:land[random][0],
        y:land[random][1],
        alive:true,
        team:[92, 36, 125],
        health:100,
    });
    land.splice(random, 1);
    updatePixels(); 
}


function bringAliveManual(w, h,team) {
    set(w, h,[team[0],team[1], team[2],255]);
    cells.push({
        x:w,
        y:h,
        alive:true,
        team:team,
        health:100,
    });

    for(let i = 0; i < land.length; i++) {
        if(land[i][0] == w && land[i][1] == h) {
           land.splice(i, 1);
            break;
        }
    };
    updatePixels(); 
}

function rules() {
    let Cell = {
        alive:false, 
        coor:[0,0], 
    }
}

function changeFrameRate() {
    frames = parseInt(document.getElementById('frames').value);
    frameRate(frames);
}

function setTeams() {
    teams = parseInt(document.getElementById('teams').value);
}


function resetFunc() {
    clear();
    setup();
}


function mouseClicked() {

}

$(document).ready(function() {

});