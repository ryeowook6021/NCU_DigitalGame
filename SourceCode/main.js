sessionStorage.setItem("total_score",1000);
let user_score = parseInt(sessionStorage.getItem("total_score"));

const gameStateEnum = Object.freeze(
   {
      "unStart": -1,
      "Start":0,
      "Person1-Q":1,
      "Person1-A":2,
      "Person2-Q":3,
      "Person2-A":4,
      "Person3-Q":5,
      "Person3-A":6,
      "Person4-Q":7,
      "Person4-A":8,
      "UnlockBlackArea":9,
      "getLightHint":10,
      "getCoffeeHint":11,
      "teaRoomOpen":12,
      "level1Success":13
   }
);

let questionAndRoles = [
   {
      "x":15,
      "y":40
   },
   {
      "x":130,
      "y":40
   },
   {
      "x":165,
      "y":40
   },
   {
      "x":200,
      "y":40
   }
];

let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
let sources;
let gameState = gameStateEnum.unStart;
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
   [0, 1, 1, 2, 0, 1, 1, 1, 0, 1, 1, 10],
   [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
   [1, 4, 0, 1, 4, 0, 1, 4, 0, 1, 4, 0],
   [1, 3, 0, 1, 5, 0, 1, 6, 0, 1, 7, 0],
   [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
   [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9],
  ];
  //11-CoffeeCup
  //12-OpenDoor
  ctx = $("#myCanvas")[0].getContext("2d");

  imgMain = new Image();
  imgMain.src = "images/office_worker.png";
  currentImgMain = {
   "x":0,
   "y":0
  };

  sources = {
   mountain:'images/material.png',
   enemy:'images/Enemy.png',
   office:'images/office.png',
   roles:'images/roles.png',
   white:'images/white.png',
   coffee:'images/coffee.png'
  };

  imgMain.onload = function(){
   ctx.drawImage(imgMain,10, 10, 40, 50, currentImgMain.x, currentImgMain.y , gridLength,gridLength);
};

loadImages(sources, function(images){
   for(var x in mapArray){
      for(var y in mapArray[x]){
         if(mapArray[x][y]==1){
            //Draw Locker
            ctx.drawImage(images.office,31, 14, 65, 80, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==2){
            //Draw Locker
            ctx.drawImage(images.office,31, 14, 65, 80, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==3){
            //Draw Role1
            ctx.drawImage(images.roles, 15, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==4){
            //Draw desk
            ctx.drawImage(images.office, 0, 97, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
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
            ctx.drawImage(images.office, 340, 110, 60, 50, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==8){
            //Draw Coffee
            ctx.drawImage(images.coffee, y*gridLength, x*gridLength , gridLength,gridLength);
         }else if(mapArray[x][y]==12){
            //Draw Open Door
            ctx.drawImage(images.office, 315, 25, 70, 50, y*gridLength, x*gridLength , gridLength,gridLength);
         }

      }
   }

   drawUnlockedArea();
   drawStartScreen();

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
      ctx.drawImage(imgMain,10, 10, 40, 50, currentImgMain.x, currentImgMain.y , gridLength,gridLength);
  };

   loadImages(sources, function(images){
      for(var x in mapArray){
         for(var y in mapArray[x]){
            if(mapArray[x][y]==1){
               //Draw Mountain
               ctx.drawImage(images.office,31, 14, 65, 80, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==2){
               //Draw Mountain
               ctx.drawImage(images.office,31, 14, 65, 80, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==3){
               //Draw Role1
               ctx.drawImage(images.roles, 15, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==4){
               //Draw desk
               ctx.drawImage(images.office, 0, 97, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
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
               ctx.drawImage(images.office, 340, 110, 60, 50, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==8){
               //Draw Coffee
               ctx.drawImage(images.coffee, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==12){
               //Draw Open Door
               ctx.drawImage(images.office, 315, 25, 70, 50, y*gridLength, x*gridLength , gridLength,gridLength);
            }
         }
      }
      drawUnlockedArea();
   });
}


function loadInitialThemesWithotUnlock(){
   imgMain = new Image();
   imgMain.src = "images/office_worker.png";
   // currentImgMain = {
   //    "x":0,
   //    "y":0
   // };

   imgMain.onload = function(){
      ctx.drawImage(imgMain,10, 10, 40, 50, currentImgMain.x, currentImgMain.y , gridLength,gridLength);
  };

   loadImages(sources, function(images){
      for(var x in mapArray){
         for(var y in mapArray[x]){
            if(mapArray[x][y]==1){
               //Draw Locker
               ctx.drawImage(images.office,31, 14, 65, 80, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==2){
               //Draw Locker
               ctx.drawImage(images.office,31, 14, 65, 80, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==3){
               //Draw Role1
               ctx.drawImage(images.roles, 15, 40, 30, 40, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==4){
               //Draw desk
               ctx.drawImage(images.office, 0, 97, 50, 50, y*gridLength, x*gridLength , gridLength,gridLength);
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
               ctx.drawImage(images.office, 340, 110, 60, 50, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==8){
               //Draw Coffee
               ctx.drawImage(images.coffee, y*gridLength, x*gridLength , gridLength,gridLength);
            }else if(mapArray[x][y]==12){
               //Draw Open Door
               ctx.drawImage(images.office, 315, 25, 70, 50, y*gridLength, x*gridLength , gridLength,gridLength);
            }
         }
      }
      
   });
}


function drawUnlockedArea(){
   ctx.strokeStyle = "rgba(135,135,130,0.8)";
   ctx.fillStyle = "rgba(135,135,130,0.9)";
   ctx.fillRect(900,0,300,400);
}

function drawStartScreen(){
   ctx.strokeStyle = "brown";
   ctx.fillStyle = "rgba(255,99,71,0.8)";

   roundRect(ctx, 200,100,800,400, 20, true);

   ctx.font = "40px Verdana";
   ctx.fillStyle = "black";
   ctx.fillText("Welcome to Office English King!", 280, 180);
   ctx.fillText("Level 1 - Office Talk", 400, 250);
   ctx.font = "25px Verdana";
   ctx.fillText("You are a newbie to the office, go to talk to everyone.", 280, 320);
   ctx.fillText("Choose the most proper option to answer!", 280, 350);
   ctx.font = "40px Verdana";
   ctx.fillText("Press Enter to Start!", 400, 450);
}

function drawQuestion(currentQ){
   ctx.strokeStyle = "brown";
   ctx.fillStyle = "rgba(255,99,71,0.8)";

   roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);

   loadImages(sources, function(images){
      //Draw Role1
      ctx.drawImage(images.roles, questionAndRoles[currentQ].x, questionAndRoles[currentQ].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
   });


   ctx.font = "20px Verdana";
   ctx.fillStyle = "black";
   ctx.fillText(quizAndAnswers[currentQ].question, 0+100+100, 400+100);
   ctx.fillText("Press Enter to Continue", 900, 560);
}

function drawHint(){
   
   loadImages(sources, function(images){
      ctx.strokeStyle = "brown";
      ctx.fillStyle = "rgba(255,99,71,0.8)";

      roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);
      //Draw Role1
      ctx.drawImage(images.roles, questionAndRoles[currentQuestion].x, questionAndRoles[currentQuestion].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
      ctx.font = "20px Verdana";
      ctx.fillStyle = "black";
      ctx.fillText("The light switch for the other side of office is on the top third locker.", 0+100+100, 400+100);
      ctx.fillText("Press Enter to Continue", 900, 560);
      gameState = gameStateEnum.getLightHint;
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
      ctx.drawImage(images.roles, questionAndRoles[currentQuestion].x, questionAndRoles[currentQuestion].y, 30, 40, 0+30, 400+50 , gridLength,gridLength);
      ctx.font = "20px Verdana";
      ctx.fillStyle = "black";
      ctx.fillText("Mission Complete!", 0+100+100, 400+100);
      ctx.fillText("Press ENTER to go to next level", 600, 560);
      gameState = gameStateEnum.level1Success;
   });

}



function drawAnswers(currentQ){

   ctx.strokeStyle = "brown";
   ctx.fillStyle = "rgba(255,99,71,0.8)";

   roundRect(ctx, 0+10,400+10,1200-20,200-20, 20, true);

   ctx.font = "20px Verdana";
   ctx.fillStyle = "black";
   ctx.fillText(quizAndAnswers[currentQ].question, 0+400, 400+40);

   ctx.fillStyle = "yellow";
   roundRect(ctx, 0+50,400+60,550,60, 20, true);
   ctx.fillStyle = "black";
   ctx.fillText("⏺[A] "+quizAndAnswers[currentQ].answer[0][0], 0+100, 400+100);

   ctx.fillStyle = "yellow";
   roundRect(ctx, 0+50+555,400+60,550,60, 20, true);
   ctx.fillStyle = "black";
   ctx.fillText("🔀[B] "+quizAndAnswers[currentQ].answer[1][0], 0+100+555, 400+100);

   ctx.fillStyle = "yellow";
   roundRect(ctx, 0+50,400+60+65,550,60, 20, true);
   ctx.fillStyle = "black";
   ctx.fillText("⏹[C] "+quizAndAnswers[currentQ].answer[2][0], 0+100, 400+100+65);

   ctx.fillStyle = "yellow";
   roundRect(ctx, 0+50+555,400+60+65,550,60, 20, true);
   ctx.fillStyle = "black";
   ctx.fillText("🔼[D] "+quizAndAnswers[currentQ].answer[3][0], 0+100+555, 400+100+65);
   
   
   
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
      quizAndAnswers[currentQuestion].answer[3][1]
   ];
   let correctKeys;
   for(let x=0;x<quizAndAnswers[currentQuestion].answer.length;x++){
      if(quizAndAnswers[currentQuestion].answer[x][1]){
         correctKeys = answerKeys[x];
      }
   }

   if(event.code == correctKeys){
      snd_correct.play();
      user_score += 10;
      $("#user_score").text(`Score : ${user_score}`);
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
      if(gameState == gameStateEnum["Person3-A"]){
         drawHint();
      }else if(gameState == gameStateEnum["Person4-A"]){
         drawHint2();
      }
      gameState = gameStateEnum.Start;
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
   let targetImg, targetBlock, cutImagePositionX, cutImagePositionY;
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

   if(gameState == gameStateEnum.Start || gameState == gameStateEnum.UnlockBlackArea){
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

      if(gameState == gameStateEnum.UnlockBlackArea){
         rightMargin = 1100;
         bottomMargin = 300;
      }else{
         rightMargin = 800;
         bottomMargin = 300;
      }
   
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
               ctx.clearRect(0,0,1200,600);
               loadInitialThemesWithotUnlock();
               gameState = gameStateEnum.UnlockBlackArea;
               user_score += 10;
               $("#user_score").text(`Score : ${user_score}`);
               var snd_correct = new Audio("assets/switch.mp3");
               snd_correct.play();
               break;
            case 3:
               gameState = gameStateEnum["Person1-Q"];
               currentQuestion = 0;
               drawQuestion(currentQuestion);
               break;
            case 5:
               gameState = gameStateEnum["Person2-Q"];
               currentQuestion = 1;
               drawQuestion(currentQuestion);
               break;
            case 6:
               gameState = gameStateEnum["Person3-Q"];
               currentQuestion = 2;
               drawQuestion(currentQuestion);
               break;
            case 7:
               gameState = gameStateEnum["Person4-Q"];
               currentQuestion = 3;
               drawQuestion(currentQuestion);
               break;
            case 8:
               //Take the coffee cup
               currentImgMain.x = targetImg.x;
               currentImgMain.y = targetImg.y;
               user_score += 10;
               $("#user_score").text(`Score : ${user_score}`);
               var snd_correct = new Audio("assets/take.mp3");
               snd_correct.play();
               mapArray[0][8]=0;
               mapArray[0][11]=12;
               loadInitialThemesWithotUnlock();
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
   
   }else if (gameState == gameStateEnum.unStart){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum.Start;
         ctx.clearRect(0,0,1200,600);
         loadInitialThemes();
      }
   }else if (gameState == gameStateEnum["Person1-Q"]){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum["Person1-A"];
         prepareAndLoadAnswers();
      }
   }else if (gameState == gameStateEnum["Person1-A"]){
      checkAnswer()
   }else if (gameState == gameStateEnum["Person2-Q"]){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum["Person2-A"];
         prepareAndLoadAnswers();
      }
   }else if (gameState == gameStateEnum["Person2-A"]){
      checkAnswer();
   }else if (gameState == gameStateEnum["Person3-Q"]){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum["Person3-A"];
         prepareAndLoadAnswers();
      }
   }else if (gameState == gameStateEnum["Person3-A"]){
      checkAnswer();
   }else if (gameState == gameStateEnum["Person4-Q"]){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum["Person4-A"];
         prepareAndLoadAnswers();
      }
   }else if (gameState == gameStateEnum["Person4-A"]){
      checkAnswer();
   }else if (gameState == gameStateEnum.getLightHint){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum.Start;
         ctx.clearRect(0,0,1200,600);
         loadInitialThemes();
      }
   }else if (gameState == gameStateEnum.getCoffeeHint){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         gameState = gameStateEnum.Start;
         ctx.clearRect(0,0,1200,600);
         loadInitialThemesWithotUnlock();
         drawCoffeeCup();
         gameState = gameStateEnum.UnlockBlackArea;
      }
   }else if (gameState == gameStateEnum.level1Success){
      if(event.code == "Enter" || event.code == "KeyA"){
         console.log("You press Enter!");
         window.location.href = "level2.html";
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