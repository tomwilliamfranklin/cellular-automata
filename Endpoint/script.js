//Made with ♥ by Tom Franklin

const w=540; //Size of Grid, recommend equal height and width
const h=360;
let frames = 30; 
let teams = 20; 
//green = 4,255,0
//blue = 26,0,255
let img;
let loading = false;
function preload() {
  img = loadImage('map.jpg');
}
let teamscores = [];
dand = new Array(w+1);
greenLand = [];
function setup() {
    document.getElementById("scoreboard").innerHTML = "";
    loading = true;
    cells = [];
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
                 dand[j][jj] = {
                     alive:false,
                     team:[],
                     health:0,
                     age: 0,
                     teamid:0,
                    };
                    dand[j][jj].health = 0;
                 greenLand.push([j,jj]);
            }
        }
    }

    $("#defaultCanvas0").css({ 'height': "720px" });
    $("#defaultCanvas0").css({ 'width': "1080px" });
    for(let i = 0; i<teams; i++) {
        bringAliveTeam(i); //random team colours
    }
    loading = false;
}

const coor = [[-1, -1], [-1, 0], [-1, +1],
[ 0, -1],          [ 0, +1],
[+1, -1], [+1, 0], [+1, +1]];

dunk = 0;
function draw() {
    let leng = dand.length;
    let cellsToLive = [];
    let cellsToKill = [];
    let cellsToFight = [];
    for(let j=0;j<leng;j++) {
        if(dand[j] != null) {
        for(let jj=0;jj<h;jj++) {
            if(dand[j][jj] != null) {
                if(dand[j][jj].alive == true) { 
                    teamscores[dand[j][jj].teamid].score++;
                    if(age(dand[j][jj])) {
                        cellsToKill.push([j,jj]);
                        continue;
                    }
                    dand[j][jj].age++;
                   if(dand[j][jj].health <= 0) {
                        cellsToKill.push([j, jj]);
                        continue;
                    } 

                    for(let i = 0; i!=coor.length; i++) { 
                        if(dand[j + coor[i][0]][jj + coor[i][1]] != null) {
                            if(dand[j + coor[i][0]][jj + coor[i][1]].alive == false) {                              
                                cellsToLive.push([j + coor[i][0], jj + coor[i][1], dand[j][jj]]);
                                continue;
                            } else if (dand[j + coor[i][0]][jj + coor[i][1]].team != dand[j][jj].team) { 
                                cellsToFight.push([[dand[j + coor[i][0]][jj + coor[i][1]], j + coor[i][0], jj + coor[i][1]],[dand[j][jj], j, jj]]);
                                break;
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
    
    for(var e = 0; e < cellsToFight.length; e++) {
         fight(cellsToFight[e]);
    }

    for(var e = 0; e < cellsToKill.length; e++) {
        killManual(cellsToKill[e][0], cellsToKill[e][1]);
    }

    updatePixels();
}

function bringAliveTeam(team) {
    let randomw =  (Math.floor((Math.random() * greenLand.length)));
    let teamcolour = [Math.random() * 255,Math.random() * 255, Math.random() * 255,255];
    set(greenLand[randomw][0], greenLand[randomw][1], teamcolour);
    dand[greenLand[randomw][0]][greenLand[randomw][1]].alive = true;
    dand[greenLand[randomw][0]][greenLand[randomw][1]].team = teamcolour;
    dand[greenLand[randomw][0]][greenLand[randomw][1]].health = 100;
    dand[greenLand[randomw][0]][greenLand[randomw][1]].teamid = team;
    teamscores[team] = ({
        id:team,
        score: 0
    })

        document.getElementById("scoreboard").innerHTML = 
        "<div class='subscore'><div class='square' style='background-color: rgb("+teamcolour+"');></div><h4 id='team"+team+"'>Team "+team+": "+ teamscores[team].score + "</h4> </div>" + document.getElementById("scoreboard").innerHTML;
        setInterval(() => {
        document.getElementById("team"+team).innerHTML =      "Team "+team+": "+ teamscores[team].score;
    
        },1000);    
  /*  cells.push({
        x:land[random][0],
        y:land[random][1],
        alive:true,
        team:team,
        health:100,
    });
    land.splice(random, 1); */
}

function bringAliveManual(w, h,parent) {
    let chanceOfBirth = Math.random();
    if(chanceOfBirth > 0.6) {
    set(w, h,[parent.team[0],parent.team[1], parent.team[2],255]);
    const child = mutate(parent);
    dand[w][h] = child;
    }
}

function killManual(w, h) {
    set(w, h,[4,255,0,255]);
    dand[w][h].alive = false;
    dand[w][h].team = [];
    dand[w][h].health = 0;
    teamscores[dand[w][h].teamid].score--;
}

function killEnemy(w, h, parent) {
    set(w, h,parent.team);
    dand[w][h].alive = true;
    dand[w][h].team = parent.team;
    dand[w][h].health = parent.health
    dand[w][h].age = 0;
    dand[w][h].teamid = parent.teamid;
}

function age(cell) {
    const cellDeathDice = Math.floor(Math.random() * ((cell.age - 1) + 1) + 1);
    const suddenDeath = Math.random(Math.random() * ((12 - 1) + 1) + 1);
    if(cellDeathDice > 50) {
        return true;
    }
    else if (suddenDeath == 12) {
        return true;
    }
    else {
        return false;
    }
}

function fight(cells) {
    const cell1 = cells[0][0];
    const cell1w = cells[0][1];
    const cell1h= cells[0][2];
    const cell2 = cells[1][0];
    const cell2w = cells[1][1];
    const cell2h = cells[1][2];
    const cell1Dice = Math.floor(Math.random() * ((100 - 1) + 1) + 1);
    const cell2Dice = Math.floor(Math.random() * ((100 - 1) + 1) + 1);
    if((cell1.health/100 + cell1Dice + teamscores[cells[1][0].teamid].score/1000000) < (cell2Dice + cell2.health/100  + teamscores[cells[0][0].teamid].score/1000000)) {
        teamscores[cell1.teamid].score++;
        killEnemy(cell2w, cell2h, cell1);
    } else {
        teamscores[cell2.teamid].score++;
        killEnemy(cell1w, cell1h, cell2);
       
    }
}

function mutate(parent) {
    let child = {
        alive:false,
        team:[],
        health:0,
        age:0,
        teamid:parent.teamid,
       };
    child.team = parent.team;
    child.alive = true;
    
    let healthMutation = Math.random();
    switch(true) {
     case healthMutation > 0.99: child.health = parent.health + 100
       break;
       default: child.health = parent.health + 0;
    //    case healthMutation < 0.1: child.health = parent.health - 10;
    //    break;
    }
    return child;
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