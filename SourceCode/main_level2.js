let user_score = parseInt(sessionStorage.getItem("total_score"));

let targetImg, targetBlock, cutImagePositionX=10, cutImagePositionY=10;

const gameStateEnum_level2 = Object.freeze(
    {
       "unStart": -1,
       "Start":0,
       "Talk-1":1,
       "Talk-2":2,
       "Talk-3":3,
       "Talk-4":4,
       "Talk-5":5,
       "Talk-6":6,
       "Talk-7":7,
       "Talk-8":8,
       "Talk-9":9,
       "Talk-10":10,
       "Talk-11":11,
       "Talk-12":12,
       "Talk-13":13,
       "Talk-14":14,
       "Talk-15":15,
       "Talk-16":16,
       "Talk-17":17,
       "Talk-18":18,
       'Talk-Finish':19,
       'Q1':21,
       'A1':211,
       'Q2':22,
       'A2':221,
       'Q3':23,
       'A3':231,
       'Q4':41,
       'A4':411,
       'Q5':42,
       'A5':421,
       'Q6':43,
       'A6':431,
       'MeetingRoom-Open':51,
       "level2Success":52
    }
 );
 
let scores = [0,0,0,0,0,0];

let machineLocations = [
    [0,1],
    [0,3],
    [2,1],
    [2,11],
    [0,9],
    [0,11],
];


 let questionAndRoles = [
    {
       "x":15,
       "y":40
    },
    {
       "x":130,
       "y":40
    }
 ];
 
 let mapArray, ctx, currentImgMain;
 let imgMountain, imgMain, imgEnemy;
 let sources, sources_roles;
 let gameState = gameStateEnum_level2.unStart;
 let rightMargin, bottomMargin;
 let currentQuestion;
 
 //mapArray:遊戲地圖中的每個格子的元素
 const gridLength = 100;
 
 function loadImages(sources, callback) {
    var images = {};
    var loadedImages = 0;
    var numImages = 0;
    // get num of sources
    for(var src in sources) {
      numImages++;
    }
    for(var src in sources) {
      images[src] = new Image();
      images[src].onload = function() {
        if(++loadedImages >= numImages) {
          callback(images);
        }
      };
      images[src].src = sources[src];
    }
 }
  
 
 $(function(){
    //show score
    $("#user_score").text(`Score : ${user_score}`);
    //1200*400 => 12*4
   mapArray = [
    [1, 21, 0, 22, 46, 0, 10, 0, 46, 42, 0, 43],
    [1, 44, 0, 0, 0, 0, 0, 0, 0, 0, 0, 45],
    [1, 23, 0, 0, 5, 11, 3, 0, 0, 0, 0, 41],
    [1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
    [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
   ];
   //11-Listen Talk
   //12-OpenDoor
   ctx = $("#myCanvas")[0].getContext("2d");
 
   imgMain = new Image();
   imgMain.src = "images/office_worker.png";
   currentImgMain = {
    "x":500,
    "y":300
   };
 
   sources = {
    mountain:'images/material.png',
    enemy:'images/Enemy.png',
    office:'images/office.png',
    roles:'images/roles.png',
    white:'images/white.png',
    coffee:'images/coffee.png',
    black:'images/black.png',
    object:'images/tea_room_object.png'
   };

   sources_roles = {
      roles:'images/roles.png'
   };
 
   imgMain.onload = function(){
    ctx.drawImage(imgMain,cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x,currentImgMain.y, gridLength,gridLength);
 };
 
 loadImages(sources, function(images){
    for(var x in mapArray){
       for(var y in mapArray[x]){
          if(mapArray[x][y]==1){
             //Draw Black
             ctx.drawImage(images.black, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==21 || mapArray[x][y]==22 || mapArray[x][y]==23){
             //Draw Coffie Machine
             ctx.drawImage(images.office,192, 381, 33, 67, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==3){
             //Draw Role1
             ctx.drawImage(images.roles, 15, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==41 || mapArray[x][y]==42 || mapArray[x][y]==43){
             //Draw Tea Machine
             ctx.drawImage(images.office, 192, 260, 33, 55, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==5){
             //Draw Role2
             ctx.drawImage(images.roles, 130, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==6){
             //Draw Role3
             ctx.drawImage(images.roles, 165, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==7){
             //Draw Role4
             ctx.drawImage(images.roles, 200, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==9){
             //Draw desk
             ctx.drawImage(images.white, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==10){
             //Draw Close Door
             ctx.drawImage(images.office, 340, 115, 60, 40, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==8){
             //Draw Coffee
             ctx.drawImage(images.coffee, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==12){
             //Draw Open Door
             ctx.drawImage(images.office, 315, 32, 70, 50, y*gridLength, x*gridLength , gridLength,gridLength);
          }else if(mapArray[x][y]==44){
            //Draw Open Door
            ctx.drawImage(images.object, 240, 380, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==45){
            //Draw Open Door
            ctx.drawImage(images.object, 285, 380, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==46){
            //Draw Open Door
            ctx.drawImage(images.object, 190, 96, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
         }
 
       }
    }
    drawStartScreen();
    drawLockedArea();
 
 });
   
 
 });
 
 function loadInitialThemes(){
    imgMain = new Image();
    imgMain.src = "images/office_worker.png";
    // currentImgMain = {
    //    "x":0,
    //    "y":0
    // };
 
    imgMain.onload = function(){
       ctx.drawImage(imgMain,cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y , gridLength,gridLength);
   };
 
    loadImages(sources, function(images){
       for(var x in mapArray){
          for(var y in mapArray[x]){
             if(mapArray[x][y]==1){
                //Draw Black
                ctx.drawImage(images.black, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==21 || mapArray[x][y]==22 || mapArray[x][y]==23){
                //Draw Coffie Machine
                ctx.drawImage(images.office,192, 381, 33, 67, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==3){
                //Draw Role1
                ctx.drawImage(images.roles, 15, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==41 || mapArray[x][y]==42 || mapArray[x][y]==43){
                //Draw Tea Machine
                ctx.drawImage(images.office, 192, 260, 33, 55, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==5){
                //Draw desk
                ctx.drawImage(images.roles, 130, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==6){
                //Draw desk
                ctx.drawImage(images.roles, 165, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==7){
                //Draw desk
                ctx.drawImage(images.roles, 200, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==9){
                //Draw desk
                ctx.drawImage(images.white, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==10){
                //Draw Role4
                ctx.drawImage(images.office, 340, 115, 60, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==8){
                //Draw Coffee
                ctx.drawImage(images.coffee, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==12){
                //Draw Open Door
                ctx.drawImage(images.office, 315, 32, 70, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==44){
                //Draw Open Door
                ctx.drawImage(images.object, 240, 380, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==45){
                //Draw Open Door
                ctx.drawImage(images.object, 285, 380, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==46){
                //Draw Open Door
                ctx.drawImage(images.object, 190, 96, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }
          }
       }
       drawLockedArea();
    });
 }
 
 function loadInitialThemesWithoutLockedArea(){
    imgMain = new Image();
    imgMain.src = "images/office_worker.png";
    // currentImgMain = {
    //    "x":0,
    //    "y":0
    // };
 
    imgMain.onload = function(){
       ctx.drawImage(imgMain,cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y , gridLength,gridLength);
   };
 
    loadImages(sources, function(images){
       for(var x in mapArray){
          for(var y in mapArray[x]){
             if(mapArray[x][y]==1){
                //Draw Black
                ctx.drawImage(images.black, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==21 || mapArray[x][y]==22 || mapArray[x][y]==23){
                //Draw Coffie Machine
                ctx.drawImage(images.office,192, 381, 33, 67, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==3){
                //Draw Role1
                ctx.drawImage(images.roles, 15, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==41 || mapArray[x][y]==42 || mapArray[x][y]==43){
                //Draw Tea Machine
                ctx.drawImage(images.office, 192, 260, 33, 55, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==5){
                //Draw desk
                ctx.drawImage(images.roles, 130, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==6){
                //Draw desk
                ctx.drawImage(images.roles, 165, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==7){
                //Draw desk
                ctx.drawImage(images.roles, 200, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==9){
                //Draw desk
                ctx.drawImage(images.white, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==10){
                //Draw Role4
                ctx.drawImage(images.office, 340, 115, 60, 40, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==8){
                //Draw Coffee
                ctx.drawImage(images.coffee, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==12){
                //Draw Open Door
                ctx.drawImage(images.office, 315, 32, 70, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==44){
                //Draw Open Door
                ctx.drawImage(images.object, 240, 380, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==45){
                //Draw Open Door
                ctx.drawImage(images.object, 285, 380, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }else if(mapArray[x][y]==46){
                //Draw Open Door
                ctx.drawImage(images.object, 190, 96, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
             }
          }
       }
    //    drawLockedArea();
    });
 }
 
 function drawStartScreen(){
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";
 
    roundRect(ctx, 200,100,800,400, 20, true);
 
    ctx.font = "40px Verdana";
    ctx.fillStyle = "black";
    // ctx.fillText("Office English King", 380, 180);
    ctx.fillText("Level 2 - Tea Room Talk", 350, 180);
    ctx.font = "25px Verdana";
    ctx.fillText("Listen carefully about their talk. ", 380, 280);
    ctx.fillText("Answer questions to get key.", 380, 320);
    ctx.font = "40px Verdana";
    ctx.fillText("Press Enter to Start!", 400, 450);
 }

 function drawLockedArea(){
    ctx.strokeStyle = "rgba(135,135,130,0.8)";
    ctx.fillStyle = "rgba(135,135,130,0.4)";
    let currentCount = 0;
    for(var x=0;x<scores.length;x++){
        if(scores[x]==0){
            ctx.fillRect(machineLocations[x][1]*gridLength,machineLocations[x][0]*gridLength,gridLength,gridLength);
        }else{
            currentCount++;
        }
    }
    
    console.log("currentCount",currentCount);
    if(currentCount == 6){
        mapArray[0][6]=12;
        var snd_correct = new Audio("assets/take.mp3");
        snd_correct.play();
        gameState = gameStateEnum_level2.Start;
        ctx.clearRect(0,0,1200,600);
        loadInitialThemesWithoutLockedArea();
    }
    
 }

 
 function drawQuestion(currentQ){
    console.log("Current Q",currentQ);
    // ctx.clearRect(0,0,1200,600);
    // loadInitialThemes();
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";
 
    roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);
 
    ctx.font = "20px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(quizAndAnswers[currentQ].question, 0+100+100, 400+100);
    ctx.fillText("Press Enter to Continue", 900, 560);
 }
 
 function drawHint(currentTalk){
    ctx.clearRect(0,0,1200,600);
    loadInitialThemes();
    loadImages(sources_roles, function(images){
       ctx.strokeStyle = "brown";
       ctx.fillStyle = "rgba(255,99,71,0.8)";
 
       roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);
       //Draw Role1
       let currentRole = talks[currentTalk].split(" : ")[0] == "Annie" ? 0 : 1;
       ctx.drawImage(images.roles, questionAndRoles[currentRole].x, questionAndRoles[currentRole].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
       ctx.font = "20px Verdana";
       ctx.fillStyle = "black";
       ctx.fillText(talks[currentTalk], 0+100+50, 400+100);
       ctx.fillText("Press Enter to Continue", 900, 580);
       if(gameState<talks.length){
        gameState++;
       }else if (gameState == talks.length){
        gameState = gameStateEnum_level2["Talk-Finish"];
       }
       console.log("Game State:", gameState);
    });
 
 }
 
 function drawHint2(){
    
    loadImages(sources, function(images){
       ctx.strokeStyle = "brown";
       ctx.fillStyle = "rgba(255,99,71,0.8)";
 
       roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);
       //Draw Role1
       ctx.drawImage(images.roles, questionAndRoles[currentQuestion].x, questionAndRoles[currentQuestion].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
       ctx.font = "20px Verdana";
       ctx.fillStyle = "black";
       ctx.fillText("When you got the coffee cup, you can go to the tea room.", 0+100+100, 400+100);
       ctx.fillText("Press Enter to Continue", 900, 560);
       gameState = gameStateEnum.getCoffeeHint;
    });
 
 }
 
 function drawHint3(){
    
    loadImages(sources, function(images){
       ctx.strokeStyle = "brown";
       ctx.fillStyle = "rgba(255,99,71,0.8)";
 
       roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);
       //Draw Role1
    //    ctx.drawImage(images.roles, questionAndRoles[currentQuestion].x, questionAndRoles[currentQuestion].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
       ctx.font = "20px Verdana";
       ctx.fillStyle = "black";
       ctx.fillText("Mission Complete!", 0+100+100, 400+100);
       ctx.fillText("Press ENTER to go to next level", 600, 560);
       gameState = gameStateEnum_level2.level2Success;
    });
 
 }
 
 
 
 function drawAnswers(currentQ){
 
    ctx.strokeStyle = "brown";
    ctx.fillStyle = "rgba(255,99,71,0.8)";
 
    roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);
 
    ctx.font = "17px Verdana";
    ctx.fillStyle = "black";
    ctx.fillText(quizAndAnswers[currentQ].question, 0+400, 400+40);
 
    ctx.fillStyle = "yellow";
    roundRect(ctx, 0+50,400+60,550,60, 20, true);
    ctx.fillStyle = "black";
    ctx.fillText("[A] "+quizAndAnswers[currentQ].answer[0][0], 0+70, 400+100);
 
    ctx.fillStyle = "yellow";
    roundRect(ctx, 0+50+555,400+60,550,60, 20, true);
    ctx.fillStyle = "black";
    ctx.fillText("[B] "+quizAndAnswers[currentQ].answer[1][0], 0+70+555, 400+100);
 
    ctx.fillStyle = "yellow";
    roundRect(ctx, 0+50,400+60+65,550,60, 20, true);
    ctx.fillStyle = "black";
    ctx.fillText("[C] "+quizAndAnswers[currentQ].answer[2][0], 0+70, 400+100+65);

 }
 
 function prepareAndLoadAnswers(){
    ctx.clearRect(0,400,1200,200);
    loadImages(sources, function(images){
       for(var x in mapArray){
          for(var y in mapArray[x]){
             if(mapArray[x][y]==9){
                ctx.drawImage(images.white, y*gridLength, x*gridLength , gridLength,gridLength);
             }
          }
       }
       drawAnswers(currentQuestion);
    });
 }
 
 function checkAnswer(){
    var snd_correct = new Audio("assets/point.wav");
    var snd_wrong = new Audio("assets/game-over.wav");
    let answerKeys = ["KeyA","KeyB","KeyC","KeyD"];
    let correctAnswers = [
       quizAndAnswers[currentQuestion].answer[0][1],
       quizAndAnswers[currentQuestion].answer[1][1],
       quizAndAnswers[currentQuestion].answer[2][1],
    ];
    let correctKeys;
    for(let x=0;x<quizAndAnswers[currentQuestion].answer.length;x++){
       if(quizAndAnswers[currentQuestion].answer[x][1]){
          correctKeys = answerKeys[x];
       }
    }
 
    if(event.code == correctKeys){
       user_score += 10;
       $("#user_score").text(`Score : ${user_score}`);
       snd_correct.play();
       scores[currentQuestion]=1;
       loadInitialThemes();
       drawLockedArea();
       ctx.clearRect(0,400,1200,200);
       loadImages(sources, function(images){
          for(var x in mapArray){
             for(var y in mapArray[x]){
                if(mapArray[x][y]==9){
                   ctx.drawImage(images.white, y*gridLength, x*gridLength , gridLength,gridLength);
                }
             }
          }
       });
       
       gameState = gameStateEnum_level2.Start;
    }else{
       user_score -= 50;
       $("#user_score").text(`Score : ${user_score}`);
       snd_wrong.play();
    }
 }
 
 function drawCoffeeCup(){
    mapArray[0][8]=8;
    loadInitialThemesWithotUnlock();
 }
 
 
 $(document).on("keydown", function(event){
    // let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
    targetImg = {
       "x":-1,
       "y":-1
    };
    targetBlock = {
       "x":-1,
       "y":-1
    };
    event.preventDefault();
    console.log(event.code);
 
    if(gameState == gameStateEnum_level2.Start){
       switch(event.code){
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

       if(targetImg.x<=rightMargin && targetImg.x >=0 &&
          targetImg.y<=bottomMargin && targetImg.y >=0
          ){
             //在範圍中
             targetBlock.x = targetImg.y / gridLength;
             targetBlock.y = targetImg.x / gridLength;
       }else{
          //出界(-1->異常標示)
          targetBlock.x = -1;
          targetBlock.y = -1;
       }
    
       ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);
    
    
       if(targetBlock.x!=-1 && targetBlock.y!=-1){
          switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0:
                
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                
                break;
            case 1:
                
                break;
            case 2:
                //turn on the light
                
                break;
            case 21:
                currentQuestion = 0;
                gameState = gameStateEnum_level2.Q1;
                drawQuestion(currentQuestion);
                break;
            case 22:
                currentQuestion = 1;
                gameState = gameStateEnum_level2.Q2;
                drawQuestion(currentQuestion);
                break;
            case 23:
                currentQuestion = 2;
                gameState = gameStateEnum_level2.Q3;
                drawQuestion(currentQuestion);
                break;
            case 41:
                currentQuestion = 3;
                gameState = gameStateEnum_level2.Q4;
                drawQuestion(currentQuestion);
                break;
            case 42:
                currentQuestion = 4;
                gameState = gameStateEnum_level2.Q5;
                drawQuestion(currentQuestion);
                break;
            case 43:
                currentQuestion = 5;
                gameState = gameStateEnum_level2.Q6;
                drawQuestion(currentQuestion);
                break;
            case 11:
                //Listen talk
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                gameState = gameStateEnum_level2["Talk-1"];
                drawHint(gameState-1);
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
       }else{
          
       }
    
       ctx.drawImage(imgMain, cutImagePositionX, cutImagePositionY, 40, 50, currentImgMain.x, currentImgMain.y , gridLength,gridLength);
       
    }else if (gameState == gameStateEnum_level2.unStart){
       if(event.code == "Enter" || event.code == "KeyA"){
          console.log("You press Enter!");
          gameState = gameStateEnum_level2.Start;
          ctx.clearRect(0,0,1200,600);
          loadInitialThemes();
       }
    }else if (gameState >=  2 && gameState <= talks.length){
       if(event.code == "Enter" || event.code == "KeyA"){
          console.log("You press Enter!");
          drawHint(gameState-1);
       }
    }else if (gameState == gameStateEnum_level2["Talk-Finish"]){
        if(event.code == "Enter" || event.code == "KeyA"){
            ctx.clearRect(0,0,1200,600);
            loadInitialThemes();
            gameState = gameStateEnum_level2.Start;
        }
    }else if (gameState == gameStateEnum_level2.Q1){
       if(event.code == "Enter" || event.code == "KeyA"){
          console.log("You press Enter!");
          gameState = gameStateEnum_level2.A1;
          prepareAndLoadAnswers();
       }
    }else if (gameState == gameStateEnum_level2.Q2){
        if(event.code == "Enter" || event.code == "KeyA"){
           console.log("You press Enter!");
           gameState = gameStateEnum_level2.A2;
           prepareAndLoadAnswers();
        }
    }else if (gameState == gameStateEnum_level2.Q3){
        if(event.code == "Enter" || event.code == "KeyA"){
           console.log("You press Enter!");
           gameState = gameStateEnum_level2.A3;
           prepareAndLoadAnswers();
        }
    }else if (gameState == gameStateEnum_level2.Q4){
        if(event.code == "Enter" || event.code == "KeyA"){
           console.log("You press Enter!");
           gameState = gameStateEnum_level2.A4;
           prepareAndLoadAnswers();
        }
    }else if (gameState == gameStateEnum_level2.Q5){
        if(event.code == "Enter" || event.code == "KeyA"){
           console.log("You press Enter!");
           gameState = gameStateEnum_level2.A5;
           prepareAndLoadAnswers();
        }
    }else if (gameState == gameStateEnum_level2.Q6){
        if(event.code == "Enter" || event.code == "KeyA"){
           console.log("You press Enter!");
           gameState = gameStateEnum_level2.A6;
           prepareAndLoadAnswers();
        }
    }else if (gameState >= 211 && gameState <= 431 ){
       checkAnswer();
    }else if (gameState == gameStateEnum_level2.level2Success){
       if(event.code == "Enter" || event.code == "KeyA"){
          console.log("You press Enter!");
          window.location.href = "level3.html";
       }
    }
 });
 
 //Backup
 
 // $("#talkBox").text("Where is the conference room?");
 // $("#answer-options").append("<tr><td id='optionA'>A. It is right over there</td><td id='optionB'>B. The traffic is too heavy today.</td></tr><tr><td id='optionC'>C.	I am not sure.</td><td id='optionD'>D.	Let me check my schedule first.</td></tr>");
 // $("#optionA").on("click",function(){
 //    $(this).css({"color":"green","font-weight":"bold"});
 //    var snd = new Audio("assets/point.ogg"); // buffers automatically when created
 //    snd.play();
 // });
 // $("#optionB").on("click",function(){
 //    $(this).css({"color":"red","font-weight":"bold"});
 //    var snd = new Audio("assets/game-over.wav"); // buffers automatically when created
 //    snd.play();
 // });
 // $("#optionC").on("click",function(){
 //    $(this).css({"color":"red","font-weight":"bold"});
 //    var snd = new Audio("assets/game-over.wav"); // buffers automatically when created
 //    snd.play();
 // });
 // $("#optionD").on("click",function(){
 //    $(this).css({"color":"red","font-weight":"bold"});
 //    var snd = new Audio("assets/game-over.wav"); // buffers automatically when created
 //    snd.play();
 // });