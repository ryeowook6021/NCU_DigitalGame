let user_score = parseInt(sessionStorage.getItem("total_score"));
let targetImg, targetBlock, cutImagePositionX = 10, cutImagePositionY = 10;

var boss_talk_snd_array = new Array(
    new Audio("assets/final-boss/01.wav"), 
    new Audio("assets/final-boss/02.wav"),
    new Audio("assets/final-boss/03.wav"),
    new Audio("assets/final-boss/04.wav"),
    new Audio("assets/final-boss/05.wav"),
    new Audio("assets/final-boss/06.wav"),
    new Audio("assets/final-boss/07.wav"),
    new Audio("assets/final-boss/08.wav"),
    new Audio("assets/final-boss/09.wav"),
    new Audio("assets/final-boss/10.wav"),
    new Audio("assets/final-boss/11.wav"),
    new Audio("assets/final-boss/12.wav"),
    new Audio("assets/final-boss/13.wav"),
    new Audio("assets/final-boss/14.wav"),
    new Audio("assets/final-boss/15.wav"),
    new Audio("assets/final-boss/16.wav"),
    new Audio("assets/final-boss/17.wav"),
    new Audio("assets/final-boss/18.wav")
    );

var i = -1;

function playSnd() {
    i++;
    if (i == boss_talk_snd_array.length) return;
    boss_talk_snd_array[i].addEventListener('ended', playSnd);
    boss_talk_snd_array[i].play();
}

const gameStateEnum_level4 = Object.freeze(
    {
        "unStart": -1,
        "Start": 0,
        "listen-talk":100,
        'Q1': 1,
        'A1': 2,
        'Q2': 3,
        'A2': 4,
        'Q3': 5,
        'A3': 6,
        'Q4': 7,
        'A4': 8,
        'Q5': 9,
        'A5': 10,
        'Q6': 11,
        'A6': 12,
        'Q7': 13,
        'A7': 14,
        'Q21': 21,
        'A21': 22,
        'Q22': 23,
        'A22': 24,
        'Q23': 25,
        'A23': 26,
        'Q24': 27,
        'A24': 28,
        'Q25': 29,
        'A25': 30,
        'Q31': 31,
        'A31': 32,
        'Q32': 33,
        'A32': 34,
        'MeetingRoom-Open': 51,
        "level2Success": 52
    }
);

let scores = [
    0, 0, 0, 0, 0
];

let machineLocations = [
    [0, 1],
    [0, 3],
    [2, 1],
    [2, 11],
    [0, 9],
    [0, 11],
];


let questionAndRoles = [
    {
        "x": 15,
        "y": 40
    },
    {
        "x": 130,
        "y": 40
    }
];

let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
let sources, sources_roles;
let gameState = gameStateEnum_level4.unStart;
let rightMargin, bottomMargin;
let currentQuestion;

//mapArray:遊戲地圖中的每個格子的元素
const gridLength = 100;

function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for (var src in sources) {
        numImages++;
    }
    for (var src in sources) {
        images[src] = new Image();
        images[src].onload = function () {
            if (++loadedImages >= numImages) {
                callback(images);
            }
        };
        images[src].src = sources[src];
    }
}


$(function () {
    //show score
    $("#user_score").text(`Score : ${user_score}`);
    //1200*400 => 12*4
    mapArray = [
        [0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0, 10],
        [0, 21, 24, 0, 46, 46, 46, 5, 0, 0, 0, 0],
        [0, 22, 25, 0, 0,   11, 0, 0, 0, 0, 0, 0],
        [0, 23, 26, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
        [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    ];
    //11-Listen Talk
    //12-OpenDoor
    ctx = $("#myCanvas")[0].getContext("2d");

    imgMain = new Image();
    imgMain.src = "images/office_worker.png";
    currentImgMain = {
        "x": 500,
        "y": 300
    };

    sources = {
        mountain: 'images/material.png',
        enemy: 'images/Enemy.png',
        office: 'images/office.png',
        roles: 'images/roles.png',
        white: 'images/white.png',
        coffee: 'images/coffee.png',
        black: 'images/black.png',
        object: 'images/tea_room_object.png',
        ranka: 'images/rank/rank-a.jpg',
        rankb: 'images/rank/rank-b.jpg',
        rankc: 'images/rank/rank-c.jpg',
        rankd: 'images/rank/rank-d.jpg',
        ranke: 'images/rank/rank-e.jpg',
        rankf: 'images/rank/rank-f.jpg',
    };

    sources_roles = {
        roles: 'images/roles.png'
    };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    //Draw Black
                    ctx.drawImage(images.black, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 21) {
                    //Draw Sofa 1
                    ctx.drawImage(images.office, 330, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 22) {
                    //Draw Sofa 2
                    ctx.drawImage(images.office, 330, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 23) {
                    //Draw Sofa 3
                    ctx.drawImage(images.office, 330, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 24) {
                    //Draw Sofa 4
                    ctx.drawImage(images.office, 390, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 25) {
                    //Draw Sofa 5
                    ctx.drawImage(images.office, 390, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 26) {
                    //Draw Sofa 6
                    ctx.drawImage(images.office, 390, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    //Draw Role1
                    ctx.drawImage(images.roles, 15, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 41 || mapArray[x][y] == 42 || mapArray[x][y] == 43) {
                    //Draw Tea Machine
                    ctx.drawImage(images.office, 192, 260, 33, 55, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 4) {
                    //Draw Locker
                    ctx.drawImage(images.office, 31, 14, 65, 80, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 6) {
                    //Draw Role3
                    ctx.drawImage(images.roles, 165, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 7) {
                    //Draw Role4
                    ctx.drawImage(images.roles, 200, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 9) {
                    //Draw white
                    ctx.drawImage(images.white, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 10) {
                    //Draw Close Door
                    ctx.drawImage(images.office, 340, 115, 60, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 8) {
                    //Draw Coffee
                    ctx.drawImage(images.coffee, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 12) {
                    //Draw Open Door
                    ctx.drawImage(images.office, 315, 32, 70, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 44) {
                    //Draw vertical desk
                    ctx.drawImage(images.office, 0, 310, 33, 35, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 45) {
                    //Draw vertical middle desk
                    ctx.drawImage(images.office, 10, 260, 21, 36, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 46) {
                    //Draw horizontal desk
                    ctx.drawImage(images.office, 55, 262, 51, 61, y * gridLength, x * gridLength, gridLength, gridLength);
                }

            }
        }
        drawStartScreen();
        // drawLockedArea();

    });


});

function loadInitialThemes() {
    imgMain = new Image();
    imgMain.src = "images/office_worker.png";
    // currentImgMain = {
    //    "x":0,
    //    "y":0
    // };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    loadImages(sources, function (images) {
        //Check if all questions done
        console.log(scores);
        let isFinish = true;
        for (let x in scores) {
            if (scores[x] == 0) {
                isFinish = false;
            }
        }
        if (isFinish) {
            var snd_correct = new Audio("assets/switch.mp3");
            snd_correct.play();
            mapArray[0][11] = 12;
        }
        


        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    //Draw Black
                    ctx.drawImage(images.black, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 21) {
                    //Draw Sofa 1
                    ctx.drawImage(images.office, 330, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 22) {
                    //Draw Sofa 2
                    ctx.drawImage(images.office, 330, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 23) {
                    //Draw Sofa 3
                    ctx.drawImage(images.office, 330, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 24) {
                    //Draw Sofa 4
                    ctx.drawImage(images.office, 390, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 25) {
                    //Draw Sofa 5
                    ctx.drawImage(images.office, 390, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 26) {
                    //Draw Sofa 6
                    ctx.drawImage(images.office, 390, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    //Draw Role1
                    ctx.drawImage(images.roles, 15, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 41 || mapArray[x][y] == 42 || mapArray[x][y] == 43) {
                    //Draw Tea Machine
                    ctx.drawImage(images.office, 192, 260, 33, 55, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 4) {
                    //Draw Locker
                    ctx.drawImage(images.office, 31, 14, 65, 80, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 6) {
                    //Draw desk
                    ctx.drawImage(images.roles, 165, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 7) {
                    //Draw desk
                    ctx.drawImage(images.roles, 200, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 9) {
                    //Draw white
                    ctx.drawImage(images.white, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 10) {
                    //Draw Role4
                    ctx.drawImage(images.office, 340, 115, 60, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 8) {
                    //Draw Coffee
                    ctx.drawImage(images.coffee, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 12) {
                    //Draw Open Door
                    ctx.drawImage(images.office, 315, 32, 70, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 44) {
                    //Draw vertical desk
                    ctx.drawImage(images.office, 0, 310, 33, 35, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 45) {
                    //Draw vertical middle desk
                    ctx.drawImage(images.office, 10, 260, 21, 36, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 46) {
                    //Draw horizontal desk
                    ctx.drawImage(images.office, 55, 262, 51, 61, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
        //    drawLockedArea();
        // drawMeetingTalk();
    });
}

function loadInitialThemesWithMeetingTalk() {
    imgMain = new Image();
    imgMain.src = "images/office_worker.png";
    // currentImgMain = {
    //    "x":0,
    //    "y":0
    // };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    //Draw Black
                    ctx.drawImage(images.black, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 21) {
                    //Draw Sofa 1
                    ctx.drawImage(images.office, 330, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 22) {
                    //Draw Sofa 2
                    ctx.drawImage(images.office, 330, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 23) {
                    //Draw Sofa 3
                    ctx.drawImage(images.office, 330, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 24) {
                    //Draw Sofa 4
                    ctx.drawImage(images.office, 390, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 25) {
                    //Draw Sofa 5
                    ctx.drawImage(images.office, 390, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 26) {
                    //Draw Sofa 6
                    ctx.drawImage(images.office, 390, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    //Draw Role1
                    ctx.drawImage(images.roles, 15, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 41 || mapArray[x][y] == 42 || mapArray[x][y] == 43) {
                    //Draw Tea Machine
                    ctx.drawImage(images.office, 192, 260, 33, 55, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 4) {
                    //Draw Locker
                    ctx.drawImage(images.office, 31, 14, 65, 80, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 6) {
                    //Draw desk
                    ctx.drawImage(images.roles, 165, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 7) {
                    //Draw desk
                    ctx.drawImage(images.roles, 200, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 9) {
                    //Draw white
                    ctx.drawImage(images.white, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 10) {
                    //Draw Role4
                    ctx.drawImage(images.office, 340, 115, 60, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 8) {
                    //Draw Coffee
                    ctx.drawImage(images.coffee, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 12) {
                    //Draw Open Door
                    ctx.drawImage(images.office, 315, 32, 70, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 44) {
                    //Draw vertical desk
                    ctx.drawImage(images.office, 0, 310, 33, 35, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 45) {
                    //Draw vertical middle desk
                    ctx.drawImage(images.office, 10, 260, 21, 36, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 46) {
                    //Draw horizontal desk
                    ctx.drawImage(images.office, 55, 262, 51, 61, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
        //    drawLockedArea();
        drawMeetingTalk();
    });
}



function loadInitialThemesWithoutLockedArea() {
    imgMain = new Image();
    imgMain.src = "images/office_worker.png";
    // currentImgMain = {
    //    "x":0,
    //    "y":0
    // };

    imgMain.onload = function () {
        ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    };

    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 1) {
                    //Draw Black
                    ctx.drawImage(images.black, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 21) {
                    //Draw Sofa 1
                    ctx.drawImage(images.office, 330, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 22) {
                    //Draw Sofa 2
                    ctx.drawImage(images.office, 330, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 23) {
                    //Draw Sofa 3
                    ctx.drawImage(images.office, 330, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 24) {
                    //Draw Sofa 4
                    ctx.drawImage(images.office, 390, 160, 55, 67, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 25) {
                    //Draw Sofa 5
                    ctx.drawImage(images.office, 390, 210, 55, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 26) {
                    //Draw Sofa 6
                    ctx.drawImage(images.office, 390, 235, 55, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 3) {
                    //Draw Role1
                    ctx.drawImage(images.roles, 15, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 41 || mapArray[x][y] == 42 || mapArray[x][y] == 43) {
                    //Draw Tea Machine
                    ctx.drawImage(images.office, 192, 260, 33, 55, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 5) {
                    //Draw desk
                    ctx.drawImage(images.roles, 130, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 6) {
                    //Draw desk
                    ctx.drawImage(images.roles, 165, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 7) {
                    //Draw desk
                    ctx.drawImage(images.roles, 200, 40, 30, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 9) {
                    //Draw desk
                    ctx.drawImage(images.white, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 10) {
                    //Draw Role4
                    ctx.drawImage(images.office, 340, 115, 60, 40, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 8) {
                    //Draw Coffee
                    ctx.drawImage(images.coffee, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 12) {
                    //Draw Open Door
                    ctx.drawImage(images.office, 315, 32, 70, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 44) {
                    //Draw Open Door
                    ctx.drawImage(images.object, 240, 380, 50, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 45) {
                    //Draw Open Door
                    ctx.drawImage(images.object, 285, 380, 50, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                } else if (mapArray[x][y] == 46) {
                    //Draw Open Door
                    ctx.drawImage(images.object, 190, 96, 50, 50, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
        //    drawLockedArea();
    });
}

function drawStartScreen() {
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";

    roundRect(ctx, 200, 100, 800, 400, 20, true);

    ctx.font = "40px Verdana";
    ctx.fillStyle = "black";
    // ctx.fillText("Office English King", 380, 180);
    ctx.fillText("Level 4 - Boss Room", 380, 180);
    ctx.font = "25px Verdana";
    ctx.fillText("Listen carefully the talk between boss & you. ", 320, 280);
    ctx.fillText("Go to the right side of the desk to answer questions.", 290, 320);
    ctx.font = "40px Verdana";
    ctx.fillText("Press Enter to Start!", 400, 450);
}

// function drawStartScreen() {
//     ctx.strokeStyle = "brown";
//     ctx.fillStyle = "rgba(255,99,71,0.8)";

//     roundRect(ctx, 330, 0, 520, 580, 20, true);

//     ctx.font = "40px Verdana";
//     ctx.fillStyle = "black";
//     loadImages(sources, function (images) {
//         ctx.drawImage(images.ranka,350,0,480,580);
//     });
    
//     // ctx.fillText("Office English King", 380, 180);
//     // ctx.fillText("Level 4 - Boss Room", 380, 180);
//     // ctx.font = "25px Verdana";
//     // ctx.fillText("Listen carefully the talk between boss & you. ", 320, 280);
//     // ctx.fillText("Go to the right side of the desk to answer questions.", 290, 320);
//     // ctx.font = "40px Verdana";
//     // ctx.fillText("Press Enter to Start!", 400, 450);
// }



function drawMeetingTalk() {
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(237,228,206)";
    roundRect(ctx, 210, 110, 660, 70, 20, true);

    ctx.font = "17px Verdana";
    ctx.fillStyle = "black";

    let numberOfTalks = talks.length;
    let currentTalk = 0;
    let timer;
    timer = setInterval(function () {
        if (currentTalk == 0) {
            ctx.fillText(talks[currentTalk], 240, 150);
            currentTalk++;
        } else {
            if (currentTalk < numberOfTalks) {
                ctx.strokeStyle = "brown";
                ctx.fillStyle = "rgba(237,228,206)";
                roundRect(ctx, 210, 110, 660, 70, 20, true);
                ctx.fillStyle = "black";
                ctx.fillText(talks[currentTalk], 240, 150);
                currentTalk++;
            } else {
                ctx.strokeStyle = "brown";
                ctx.fillStyle = "rgba(237,228,206)";
                roundRect(ctx, 210, 110, 660, 70, 20, true);
                ctx.fillStyle = "black";
                ctx.fillText("The conversation is over. Check it again by 'hit books'.", 240, 150);
                clearInterval(timer);
            }
        }
    }, 3000);

}




//  function drawLockedArea(){
//     ctx.strokeStyle = "rgba(135,135,130,0.8)";
//     ctx.fillStyle = "rgba(135,135,130,0.4)";
//     let currentCount = 0;
//     for(var x=0;x<scores.length;x++){
//         if(scores[x]==0){
//             ctx.fillRect(machineLocations[x][1]*gridLength,machineLocations[x][0]*gridLength,gridLength,gridLength);
//         }else{
//             currentCount++;
//         }
//     }

//     console.log("currentCount",currentCount);
//     if(currentCount == 6){
//         mapArray[0][6]=12;
//         var snd_correct = new Audio("assets/take.mp3");
//         snd_correct.play();
//         gameState = gameStateEnum_level4.Start;
//         ctx.clearRect(0,0,1200,600);
//         loadInitialThemesWithoutLockedArea();
//     }

//  }


function drawQuestion(currentQ) {
    console.log("Current Q", currentQ);
    // ctx.clearRect(0,0,1200,600);
    // loadInitialThemes();
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";

    roundRect(ctx, 0 + 10, 400 + 10, 1200 - 20, 200 - 20, 20, true);

    ctx.font = "17px Verdana";
    ctx.fillStyle = "black";

    for (let x = 0; x < quizAndAnswers[currentQ].question.length; x++) {
        ctx.fillText(quizAndAnswers[currentQ].question[x], 0 + 100, 385 + 50 + (25 * x));
    }

    // ctx.fillText(quizAndAnswers[currentQ].question, 0+100, 400+50);
    ctx.fillText("Press Enter to Continue", 900, 560);
    // debugger;
}

function drawHint(currentTalk) {
    ctx.clearRect(0, 0, 1200, 600);
    loadInitialThemes();
    loadImages(sources_roles, function (images) {
        ctx.strokeStyle = "brown";
        ctx.fillStyle = "rgba(255,99,71,0.8)";

        roundRect(ctx, 0 + 10, 400 + 10, 1200 - 20, 200 - 20, 20, true);
        //Draw Role1
        let currentRole = talks[currentTalk].split(" : ")[0] == "Annie" ? 0 : 1;
        ctx.drawImage(images.roles, questionAndRoles[currentRole].x, questionAndRoles[currentRole].y, 30, 40, 0 + 30, 400 + 50, gridLength, gridLength);
        ctx.font = "20px Verdana";
        ctx.fillStyle = "black";
        ctx.fillText(talks[currentTalk], 0 + 100 + 50, 400 + 100);
        ctx.fillText("Press Enter to Continue", 900, 580);
        if (gameState < talks.length) {
            gameState++;
        } else if (gameState == talks.length) {
            gameState = gameStateEnum_level4["Talk-Finish"];
        }
        console.log("Game State:", gameState);
    });

}

function drawHint2() {

    loadImages(sources, function (images) {
        ctx.strokeStyle = "brown";
        ctx.fillStyle = "rgba(255,99,71,0.8)";

        roundRect(ctx, 0 + 10, 400 + 10, 1200 - 20, 200 - 20, 20, true);
        //Draw Role1
        ctx.drawImage(images.roles, questionAndRoles[currentQuestion].x, questionAndRoles[currentQuestion].y, 30, 40, 0 + 30, 400 + 50, gridLength, gridLength);
        ctx.font = "20px Verdana";
        ctx.fillStyle = "black";
        ctx.fillText("When you got the coffee cup, you can go to the tea room.", 0 + 100 + 100, 400 + 100);
        ctx.fillText("Press Enter to Continue", 900, 560);
        gameState = gameStateEnum.getCoffeeHint;
    });

}

function drawHint3() {
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";

    roundRect(ctx, 330, 0, 520, 580, 20, true);

    ctx.font = "40px Verdana";
    ctx.fillStyle = "black";
    loadImages(sources, function (images) {
        if(user_score >= 1250){
            ctx.drawImage(images.ranka, 350, 0, 480, 580);
            var game_win_level_high = new Audio("assets/game-win-level-high.wav");
            game_win_level_high.play();
        }else if(user_score >= 1200){
            ctx.drawImage(images.rankb, 350, 0, 480, 580);
            var game_win_level_high_2 = new Audio("assets/game-win-level-high-2.wav");
            game_win_level_high_2.play();
        }else if (user_score >= 1150) {
            ctx.drawImage(images.rankc, 350, 0, 480, 580);
            var game_win_level_high = new Audio("assets/game-win-level-high-2.wav");
            game_win_level_high_2.play();
        }else if (user_score >= 1100) {
            ctx.drawImage(images.rankd, 350, 0, 480, 580);
            var game_win_level_high = new Audio("assets/game-win-level-high-2.wav");
            game_win_level_high_2.play();
        }else if (user_score >= 800) {
            ctx.drawImage(images.ranke, 350, 0, 480, 580);
            var game_lose = new Audio("assets/game-lose.wav");
            game_lose.play();
        }else{
            ctx.drawImage(images.rankf, 350, 0, 480, 580);
            var game_lose = new Audio("assets/game-lose.wav");
            game_lose.play();
        }
    });

    // loadImages(sources, function (images) {
    //     ctx.strokeStyle = "brown";
    //     ctx.fillStyle = "rgba(255,99,71,0.8)";

    //     roundRect(ctx, 0 + 10, 400 + 10, 1200 - 20, 200 - 20, 20, true);
    //     //Draw Role1
    //     //    ctx.drawImage(images.roles, questionAndRoles[currentQuestion].x, questionAndRoles[currentQuestion].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
    //     ctx.font = "17px Verdana";
    //     ctx.fillStyle = "black";
    //     ctx.fillText("Mission Complete!", 0 + 100 + 100, 400 + 100);
    //     // ctx.fillText("Press ENTER to go to next level (Not Yet)", 600, 560);
    //     gameState = gameStateEnum_level4.level4Success;
    // });
}



function drawAnswers(currentQ) {

    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";

    roundRect(ctx, 0 + 10, 400 + 10, 1200 - 20, 200 - 20, 20, true);

    ctx.font = "17px Verdana";
    ctx.fillStyle = "black";

    for (let x = 0; x < quizAndAnswers[currentQ].question.length; x++) {
        ctx.fillText(quizAndAnswers[currentQ].question[x], 0 + 70, 385 + 50 + (25 * x));
    }

    ctx.fillStyle = "yellow";
    roundRect(ctx, 0 + 50, 445, 1000, 40, 20, true);
    ctx.fillStyle = "black";
    ctx.fillText("[A] " + quizAndAnswers[currentQ].answer[0][0], 70, 470);
    ctx.fillStyle = "yellow";
    roundRect(ctx, 0 + 50 , 445 + 50, 1000, 40, 20, true);
    ctx.fillStyle = "black";
    ctx.fillText("[B] " + quizAndAnswers[currentQ].answer[1][0], 70, 470 + 50);
    ctx.fillStyle = "yellow";
    roundRect(ctx, 0 + 50 , 445 + 100, 1000, 40, 20, true);
    ctx.fillStyle = "black";
    ctx.fillText("[C] " + quizAndAnswers[currentQ].answer[2][0], 70, 470 + 100);

}

function prepareAndLoadAnswers() {
    ctx.clearRect(0, 400, 1200, 200);
    loadImages(sources, function (images) {
        for (var x in mapArray) {
            for (var y in mapArray[x]) {
                if (mapArray[x][y] == 9) {
                    ctx.drawImage(images.white, y * gridLength, x * gridLength, gridLength, gridLength);
                }
            }
        }
        drawAnswers(currentQuestion);
    });
}

function checkAnswer() {
    var snd_correct = new Audio("assets/point.wav");
    var snd_wrong = new Audio("assets/game-over.wav");
    let answerKeys = ["KeyA", "KeyB", "KeyC", "KeyD"];
    // let correctAnswers = [
    //    quizAndAnswers[currentQuestion].answer[0][1],
    //    quizAndAnswers[currentQuestion].answer[1][1],
    //    quizAndAnswers[currentQuestion].answer[2][1],
    // ];
    let correctKeys;

    for (let x = 0; x < quizAndAnswers[currentQuestion].answer.length; x++) {
        if (quizAndAnswers[currentQuestion].answer[x][1]) {
            correctKeys = answerKeys[x];
        }
    }


    if (event.code == correctKeys) {
        user_score += 10;
        $("#user_score").text(`Score : ${user_score}`);
        snd_correct.play();
        scores[currentQuestion] = 1;


        loadInitialThemes();
        ctx.clearRect(0, 400, 1200, 200);
        loadImages(sources, function (images) {
            for (var x in mapArray) {
                for (var y in mapArray[x]) {
                    if (mapArray[x][y] == 9) {
                        ctx.drawImage(images.white, y * gridLength, x * gridLength, gridLength, gridLength);
                    }
                }
            }

            if (currentQuestion < quizAndAnswers.length - 1) {
                // debugger;
                currentQuestion++;
                gameState++;
                // debugger;
                drawQuestion(currentQuestion);
            } else {
                gameState = gameStateEnum_level4.Start;
            }

        });



    } else {
        user_score -= 50;
        $("#user_score").text(`Score : ${user_score}`);
        snd_wrong.play();
    }
}

function drawCoffeeCup() {
    mapArray[0][8] = 8;
    loadInitialThemesWithotUnlock();
}


$(document).on("keydown", function (event) {
    // let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
    targetImg = {
        "x": -1,
        "y": -1
    };
    targetBlock = {
        "x": -1,
        "y": -1
    };
    event.preventDefault();
    console.log(event.code);

    if (gameState == gameStateEnum_level4.Start) {
        switch (event.code) {
            case "ArrowLeft":
                targetImg.x = currentImgMain.x - gridLength;
                targetImg.y = currentImgMain.y;
                cutImagePositionX = 10;
                cutImagePositionY = 75;
                break;
            case "ArrowUp":
                targetImg.x = currentImgMain.x;
                targetImg.y = currentImgMain.y - gridLength;
                cutImagePositionX = 10;
                cutImagePositionY = 205;
                break;
            case "ArrowRight":
                targetImg.x = currentImgMain.x + gridLength;
                targetImg.y = currentImgMain.y;
                cutImagePositionX = 10;
                cutImagePositionY = 140;
                break;
            case "ArrowDown":
                targetImg.x = currentImgMain.x;
                targetImg.y = currentImgMain.y + gridLength;
                cutImagePositionX = 10;
                cutImagePositionY = 10;
                break;
            default:
                return;
        }

        rightMargin = 1100;
        bottomMargin = 300;

        if (targetImg.x <= rightMargin && targetImg.x >= 0 &&
            targetImg.y <= bottomMargin && targetImg.y >= 0
        ) {
            //在範圍中
            targetBlock.x = targetImg.y / gridLength;
            targetBlock.y = targetImg.x / gridLength;
        } else {
            //出界(-1->異常標示)
            targetBlock.x = -1;
            targetBlock.y = -1;
        }

        ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);


        if (targetBlock.x != -1 && targetBlock.y != -1) {
            switch (mapArray[targetBlock.x][targetBlock.y]) {
                case 0:
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    break;
                case 1:

                    break;
                case 2:
                    //turn on the light

                    break;
                case 4:
                    drawMeetingTalk();
                    break;
                case 5: // answer question
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    currentQuestion = 0;
                    gameState = gameStateEnum_level4.Q1;
                    drawQuestion(currentQuestion);
                    break;
                case 6: // second manager
                    currentChapter = 1;
                    currentQuestion = 0;
                    gameState = gameStateEnum_level4.Q21;
                    drawQuestion(currentQuestion);
                    break;
                case 7: // top manager
                    currentChapter = 0;
                    currentQuestion = 0;
                    gameState = gameStateEnum_level4.Q1;
                    drawQuestion(currentQuestion);
                    break;
                case 11://Play talk
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;                    
                    playSnd();
                    break;
                case 41:
                    currentQuestion = 3;
                    gameState = gameStateEnum_level4.Q4;
                    drawQuestion(currentQuestion);
                    break;
                case 42:
                    currentQuestion = 4;
                    gameState = gameStateEnum_level4.Q5;
                    drawQuestion(currentQuestion);
                    break;
                case 43:
                    currentQuestion = 5;
                    gameState = gameStateEnum_level4.Q6;
                    drawQuestion(currentQuestion);
                    break;
                case 11:
                    //Listen talk
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    gameState = gameStateEnum_level4["Talk-1"];
                    drawHint(gameState - 1);
                    break;
                case 12:
                    //Finish!
                    currentImgMain.x = targetImg.x;
                    currentImgMain.y = targetImg.y;
                    sessionStorage.setItem("total_score", user_score);
                    var snd_correct = new Audio("assets/success.mp3");
                    snd_correct.play();
                    drawHint3();
                    break;
            }
        } else {

        }

        ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y, gridLength, gridLength);

    } else if (gameState == gameStateEnum_level4.unStart) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.Start;
            ctx.clearRect(0, 0, 1200, 600);
            // loadInitialThemesWithMeetingTalk();
            loadInitialThemes();
            //   drawMeetingTalk();
        }
    } else if (gameState == gameStateEnum_level4.Q1) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A1;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q2) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A2;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q3) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A3;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q4) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A4;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q5) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A5;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q6) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A6;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q7) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A7;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q21) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A21;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q22) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A22;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q23) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A23;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q24) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A24;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q25) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A25;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q31) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A31;
            prepareAndLoadAnswers();
        }
    } else if (gameState == gameStateEnum_level4.Q32) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            gameState = gameStateEnum_level4.A32;
            prepareAndLoadAnswers();
        }
    } else if (gameState % 2 == 0) {
        checkAnswer();
    } else if (gameState == gameStateEnum_level4.level2Success) {
        if (event.code == "Enter" || event.code == "KeyA") {
            console.log("You press Enter!");
            //   window.location.href = "level3.html";
        }
    }
});
