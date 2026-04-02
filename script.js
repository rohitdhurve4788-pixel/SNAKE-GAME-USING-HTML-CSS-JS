let board = document.querySelector('.board')
let welcome = document.querySelector('.welcome')
let btn = document.querySelector('.btn-start')
let gameover = document.querySelector('.gameover')
let end = document.querySelector('.btn-end')
let modes = document.querySelector('#difficulty')
let label = document.querySelector('h5')
let play=document.querySelector('.play button')
let highscore=document.querySelector('.high-score')
let currentscore=document.querySelector('.score')
let timerunner=document.querySelector('.remaintime')



let score=0
let time='00:00'

let high=localStorage.getItem('high')||0

highscore.innerText=high

let timerintervalid=null


let pause=false
play.addEventListener('click',function(){

    if(!pause){
        clearInterval(interval)
        pause=true
        play.innerHTML='PAUSE ⏸️'
        clearInterval(timerintervalid)
    }else{
        
        interval = setInterval(render, speed);
        pause=false
        play.innerHTML='PLAY ▶️'
    }
    
})


label.textContent = `GAME MODE : ${modes.value}`;

modes.addEventListener('change', function () {
    label.textContent = `GAME MODE : ${modes.value}`;
});



let blocksheight = 70
let blockwidth = 70

let colums = Math.floor(board.clientWidth / blocksheight)
let rows = Math.floor(board.clientHeight / blockwidth)

let food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * colums) }

let direction = 'up'
let blank = []


let snake = [
    {
        x: 5, y: 3
    },
]
for (r = 0; r < rows; r++) {
    for (l = 0; l < colums; l++) {
        const block = document.createElement('div')
        block.classList.add('blocks')
        board.appendChild(block)
        // block.innerText = `${r}-${l}`
        blank[`${r}-${l}`] = block
    }
}



function render() {

    blank[`${food.x}-${food.y}`].classList.add('food')

    let starting = null
    if (direction == 'left') starting = { x: snake[0].x, y: snake[0].y - 1 }
    else if (direction == 'right') starting = { x: snake[0].x, y: snake[0].y + 1 }
    else if (direction == 'down') starting = { x: snake[0].x + 1, y: snake[0].y }
    else if (direction == 'up') starting = { x: snake[0].x - 1, y: snake[0].y }
    
    if (starting.x < 0 || starting.x >= rows || starting.y < 0 || starting.y >= colums) {
        clearInterval(interval)
        interval = null
        gameover.style.display = 'flex'
        return
    }
    
    
    snake.forEach(saga => blank[`${saga.x}-${saga.y}`].classList.remove('saap'))
    
    if (starting.x === food.x && starting.y === food.y) {
        blank[`${food.x}-${food.y}`].classList.remove('food')
        food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * colums) }
        blank[`${food.x}-${food.y}`].classList.add('food')
        snake.unshift(starting)
        score+=10
        currentscore.innerText=score
        if(score>high){
            high=score
            localStorage.setItem("high",high.toString())
        }
        
    } else {
        snake.unshift(starting)
        snake.pop()
    }
    snake.forEach(saga => blank[`${saga.x}-${saga.y}`].classList.add('saap')) // ✅ sirf ek baar
}


document.addEventListener('keydown', function (event) {
    if (event.key == 'ArrowDown') {
        direction = 'down'
    } else if (event.key == 'ArrowUp') {
        direction = 'up'
    } else if (event.key == 'ArrowRight') {
        direction = 'right'
    } else if (event.key == 'ArrowLeft') {
        direction = 'left'
    }
})

end.addEventListener('click', restartgame)

function restartgame() {
    score=0
    time='00:00'

     currentscore.innerText=score
    
highscore.innerText=high
timerunner.innerText=time


         currentscore.innerText=score
    if (interval) clearInterval(interval);
    gameover.style.display = 'none'
    blank[`${food.x}-${food.y}`].classList.remove('food')
    snake.forEach(saga => {
        (blank[`${saga.x}-${saga.y}`]).classList.remove('saap')

    })
    snake = [{ x: 5, y: 3 },]
    food = { x: Math.floor(Math.random() * rows), y: Math.floor(Math.random() * colums) }
    direction = 'up'
    interval = setInterval(render, speed);
}

let interval = null;
let speed = 300;

btn.addEventListener('click', function () {
    let mode = modes.value;
    if (!mode) { alert('please select option'); return; }
    if (interval) clearInterval(interval);


    if (mode === 'EASY') speed = 850;
    else if (mode === 'MEDIUM') speed = 450;
    else if (mode === 'HARD') speed = 170;



timerintervalid = setInterval(() => {

    let [min, sec] = time.split(':').map(Number);

    if (sec == 59) {
        min += 1;   
        sec = 0;
    } else {
        sec += 1;
    }

    let displayMin = min < 10 ? "0" + min : min;
    let displaySec = sec < 10 ? "0" + sec : sec;

    time = `${displayMin}:${displaySec}`;
    timerunner.innerText = time;

}, 1000);


    interval = setInterval(render, speed);
    welcome.style.display = 'none';;
});










