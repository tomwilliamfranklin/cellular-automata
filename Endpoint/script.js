//Made with ♥ by Tom Franklin

const w=1080; //Size of Grid, recommend equal height and width
const h=720;
let frames = 30; //Framerate. Works with max frames tbh.
let teams = 1; 
//green = 4,255,0
//blue = 26,0,255
let img;

function preload() {
  img = loadImage('map.jpg');
}

land = [];

dand = new Array(w+1);
greenLand = [];
function setup() {
    cells = [];
    land = [];
    createCanvas(w, h);
    background(200);
    image(img, 0, 0, width, height);
    
    nextposw = 0;
    nextposh = 0;
    frameRate(frames); // Attempt to refresh at starting FPS

    for(let i = 0; i<w;i++) {
        dand[i] = new Array(h);
    }
    for(let j = 0; j<w;j++) {
        for(let jj=0; jj<h;jj++) {
            if(get(j,jj)[0] === 4 && get(j,jj)[1] === 255 && get(j,jj)[2] === 0) {     
                 dand[j][jj] = {alive:false,team:[]};
                 greenLand.push([j,jj]);
            }
        }
    }

    $("#defaultCanvas0").css({ 'height': "720px" });
    $("#defaultCanvas0").css({ 'width': "1080px" });
    for(let i = 0; i<teams; i++) {
        bringAliveTeam(); //random team colours
    }
}

const coor = [[-1, -1], [-1, 0], [-1, +1],
[ 0, -1],          [ 0, +1],
[+1, -1], [+1, 0], [+1, +1]];

dunk = 0;
function draw() {
    let leng = dand.length;
    let cellsToLive = [];
    for(let j=0;j<leng;j++) {
        if(dand[j] != null) {
        for(let jj=0;jj<h;jj++) {
            if(dand[j][jj] != null) {
                if(dand[j][jj].alive == true) {
                    for(let i = 0; i!=coor.length; i++) { 
                        if(dand[j + coor[i][0]][jj + coor[i][1]] != null) {
                            if(dand[j + coor[i][0]][jj + coor[i][1]].alive == false) {
                                cellsToLive.push([j + coor[i][0], jj + coor[i][1], dand[j][jj].team]);
                              //  bringAliveManual(j + coor[i][0], jj + coor[i][1], dand[j][jj].team);
                            }
                        } 
                    }
                }
            }
        
    /*    for(let i = 0; i!=coor.length; i++) { 
        if(dand[greenLand[j][0] + coor[i][0]][greenLand[j][1] + coor[i][1]] != null) {
            bringAliveManual(greenLand[j][0] + coor[i][0], greenLand[j][1] + coor[i][1], dand[greenLand[j][0] + coor[i][0]][greenLand[j][1] + coor[i][1]].team);
            dunk++;
        } */ 
         }
        }
    }

    for(var e = 0; e < cellsToLive.length; e++) {

        bringAliveManual(cellsToLive[e][0], cellsToLive[e][1], cellsToLive[e][2]);
    }
    updatePixels();
}

function bringAliveTeam(team) {
    let randomw =  (Math.floor((Math.random() * greenLand.length)));
    let teamcolour = [Math.random() * 255,Math.random() * 255, Math.random() * 255,255];
    set(greenLand[randomw][0], greenLand[randomw][1], teamcolour);
    dand[greenLand[randomw][0]][greenLand[randomw][1]] = {alive:true,team:teamcolour};
  /*  cells.push({
        x:land[random][0],
        y:land[random][1],
        alive:true,
        team:team,
        health:100,
    });
    land.splice(random, 1); */
}


function bringAliveRandom() {
    let random =  (Math.floor((Math.random() * land.length)));
    set(land[random][0], land[random][1], [Math.random() * 255,Math.random() * 255, Math.random() * 255,255]);
    cells.push({
        x:land[random][0],
        y:land[random][1],
        team:[92, 36, 125],
    });
    land.splice(random, 1);
}


function bringAliveManual(w, h,team) {
    set(w, h,[team[0],team[1], team[2],255]);
    dand[w][h] = {alive:true,team:team};

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