
let gameBox = document.querySelector('.game-box')
let scoreBox= document.querySelector('.score-box')
let foodXaxis, foodYaxis;
let sBodyX =10 , sBodyY= 15;
let speedX = 0 , speedY=0 ;
let snakeBody = [];
let score =0 ;



function getFood(){
    foodXaxis= Math.floor(Math.random()*25) + 1;
    foodYaxis= Math.floor(Math.random()*25) + 1;

    for(let i=0; i<snakeBody.length;i++){
        if(snakeBody[i][1]== foodYaxis && snakeBody[i][0]==foodXaxis){
            getFood();
        }
    }

}

function gameOver(){
    sBodyX=10;
    sBodyY=15;
    getFood();
    speedX=0;
    speedY=0;
    snakeBody=[];
    score=0;
    scoreBox.innerHTML='Score: ' + score;
    alert('Game is over!')
}


function gamePlay(){
    let gameUpdate = `<div class="food" style="grid-area: ${foodYaxis}/${foodXaxis};"></div>`;

    if(foodXaxis==sBodyX && foodYaxis==sBodyY){
        snakeBody.push([foodXaxis,foodYaxis]);
        getFood();
        score +=5;
        scoreBox.innerHTML= ' Score : ' + score;
    }

    snakeBody.pop();

    sBodyX+=speedX;
    sBodyY+=speedY;

    snakeBody.unshift([sBodyX,sBodyY])

    if(sBodyX==0 || sBodyY ==0 || sBodyX==26 || sBodyY==26){
        gameOver();
    }

    for (let i=1;i<snakeBody.length;i++){
        if(snakeBody[0][0]== snakeBody[i][0] && snakeBody[0][1]==snakeBody[i][1]){
            gameOver();
        }
    }

    for(let i=0; i<snakeBody.length;i++){
        gameUpdate+=`<div class="snake" style="grid-area: ${snakeBody[i][1]}/${snakeBody[i][0]};"></div>`;

    }


    

    gameBox.innerHTML= gameUpdate;
}

getFood();
setInterval(gamePlay,150);

document.addEventListener('keydown',function (e){
    
    let key = e.key;
    if(key=='ArrowUp' && speedY!=1){
        speedX=0;
        speedY= -1;
    }else if (key=='ArrowDown' && speedY!= -1){
        speedX=0;
        speedY= 1;
    }else if (key=='ArrowLeft' && speedX!=1){
        speedY=0;
        speedX= -1;
    }else if (key=='ArrowRight' && speedX!= -1){
        speedY=0;
        speedX= 1;
    }


})