const canvas = $("#canvas")
const ctx = canvas[0].getContext('2d')
let cursorActive = false;
metaData = {
    Author: "Zest! @ PYgames",
    Description: "My project I made 5/30/2023",
    Title: "Infinite Canvas",
    Short: "Inf Canvas",
    Version: "3.4"
}

const render = new Rendering(canvas)

let selectedColor = "red"

//document.addEventListener('contextmenu', event => event.preventDefault());
$("*").css({
    padding: "0",
    margin: "0",
    boxSizing: "border-box",
    overflow: 'hidden'
})

//palette
$("#palette").css({
    background:'#cfcfcf',
    padding: "10px",
    boxSizing: "border-box",
    position: "absolute"
}).mouseenter(e=>{
    cursorActive = false
})

$(document).keydown(e=>{if(e.code=="ArrowRight"){
    let index = (colors.indexOf(selectedColor))+1
    index %= colors.length
    selectedColor = colors[index]
};if(e.code=="ArrowLeft"){
    let index = (colors.indexOf(selectedColor))-1
    index %= colors.length
    if (index==-1){
        index = colors.length-1
    }
    selectedColor = colors[index]
}})

//canvas
canvas.css({
    "background": "#cfcfcf",
    "width":"100%",
    "height":"100%"
})

canvas[0].width = window.innerWidth
canvas[0].height = window.innerHeight

const audioPlayer = new Audio('select-sound.mp3')

var colors = ['white', 'grey', 'black', 'magenta', 'hotpink', 'purple', 'blue', 'turquoise', 'green', 'lime', 'yellow', 'orange', 'red']
colors.forEach(color=>{
    let btn = document.createElement('button');
    btn.id = color
    btn.className = 'color'
    $("#palette")[0].appendChild(btn)
    $("#"+color).mousedown(event=>{
        selectedColor = $("#"+color)[0].id
        audioPlayer.play()
    }).css({
        background: color
    })
})



var pos = {
    x: 0,
    y: 0
}

const queue = [

]



var cTime = new Date;
let iTime = new Date - cTime;
var scale = 25

canvas[0].addEventListener('ontouchstart', event => {
    console.log(event)
})

const drawsquare = (x, y, color) =>
{
    //is visible on screen checking
}
function easeInSine(x) {
    return 1 - Math.cos((x * Math.PI) / 2);
}
function easeOutSine(x) {
    return Math.sin((x * Math.PI) / 2);
}

const keyboard = new InputHandler;

var zoomedSpeed = 1


let cursorHover = [0, 0];
let cursorDrawing = false;

var velocity_speed = 0.1
var velocity_pos = {
    x: 0,
    y: 0
};

var showHelpMenu=true
if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    showHelpMenu=false
} else {
    $("#controller").css({"display":"none"})
}
  

function movement()
{
    if(keyboard.pressed("KeyA"))
    {
        velocity_pos.x+=0.1
    } else if(keyboard.pressed("KeyD"))
    {
        velocity_pos.x-=0.1
    } else {
        velocity_pos.x/=1.1
    }

    pos.x+=velocity_pos.x

    if(keyboard.pressed("KeyW"))
    {
        velocity_pos.y+=0.1
    } else if(keyboard.pressed("KeyS"))
    {
        velocity_pos.y-=0.1
    } else {
        velocity_pos.y/=1.1
    }

    pos.y+=velocity_pos.y
}

var previous_sel = []

function renderHelpMenu()
{
    ctx.fillStyle = "rgb(111,111,111,.75)"
    
    ctx.fillRect(0, 0, 200, 125)
    ctx.fillStyle = 'white'
    ctx.font = '20px arial'
    ctx.fillText("[Q,E] Zoom", 5, 20+40)
    ctx.fillText("[W,A,S,D] Movement", 5, 20+60)
    ctx.fillText("[LMB] Place", 5, 20+80)
    ctx.fillText("[F] Hide this menu", 5, 20+100)
    ctx.font = '40px arial'
}

// https://pygames.7m.pl/InfiniteCanvas/
function move(dir){
    let speed = 2;
    switch (dir) {
        case "up":
            velocity_pos.y = speed
            break;
        case "down":
            velocity_pos.y = -speed
            break;
        case "left":
            velocity_pos.x = speed
            break;
        case "right":
            velocity_pos.x = -speed
            break;
        case "in":
            scale += speed
            break;
        case "out":
            scale -= speed
            break;
        default:
            break;
    }
}

function gameLoop()
{
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight);iTime = new Date - cTime;
    //pixels.forEach(e => {drawsquare(e['x']+pos.x, e['y']+pos.y, e['color'])});
    render.drawPixels()
    if(!showHelpMenu)
    {
        ctx.beginPath()
        ctx.lineWidth = 4
        ctx.strokeStyle = selectedColor
        ctx.rect(
            cursorHover[0]*scale+pos.x*scale,
            cursorHover[1]*scale+pos.y*scale,
            scale, scale
        )
        ctx.stroke()
    } else {
        renderHelpMenu()
    }

    zoomedSpeed=scale/2/50
    velocity_speed = 1000/scale
    scale += keyboard.pressed("KeyE") ? zoomedSpeed : keyboard.pressed("KeyQ")*-1 * zoomedSpeed
    movement()

    requestAnimationFrame(gameLoop)
}
gameLoop()

$(window).keydown(e=>{if(e.code=='KeyF'){showHelpMenu=false}})

$("#canvas").mousemove(e=>{
    cursorActive = !showHelpMenu
    cursorHoverTemp = [
        Math.round((e.pageX-scale/2)/scale-pos.x), 
        Math.round((e.pageY-scale/2)/scale-pos.y)
    ]
    if(cursorActive&&cursorDrawing&&cursorHover[0])
    {
        firebasePlaceRequest(cursorHover[0], cursorHover[1], selectedColor);
    }
    cursorHover = cursorHoverTemp
}).mouseleave(()=>{
    cursorActive = false
}).click(e=>{
    e.preventDefault()
    if(cursorActive){
        firebasePlaceRequest(cursorHover[0], cursorHover[1], selectedColor);
    }
}).mousedown(()=>{
    cursorDrawing = true
}).mouseup(()=>{
    cursorDrawing = false
})
$(window).on('resize',()=>{
    canvas[0].width = window.innerWidth
    canvas[0].height = window.innerHeight
})