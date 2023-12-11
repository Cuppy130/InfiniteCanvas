const canvas = $("#canvas")
const ctx = canvas[0].getContext('2d')
let cursorActive = false;
metaData = {
    Author: "Zest! @ PYgames",
    Description: "My project I made 5/30/2023",
    Title: "Infinite Canvas",
    Short: "Inf Canvas",
    Version: "3.41"
}

const render = new Rendering(canvas)
function getRandom(min, max) {return Math.random() * (max - min) + min;}

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
    $("#colorbutton-left").css({'background-color': colors[index-1%colors.length]})
    $("#colorbutton-right").css({'background-color': colors[index+1%colors.length]})
    $("#colorbutton").css({'background': selectedColor})

};if(e.code=="ArrowLeft"){
    let index = (colors.indexOf(selectedColor))-1
    index %= colors.length
    if (index==-1){
        index = colors.length-1
    }
    selectedColor = colors[index]
    $("#colorbutton").css({'background': selectedColor})
    var left = index -1
    if (left==-1) {
        left= colors.length-1
    }
    var right = index +1
    if (right==-1) {
        right= colors.length-1
    }
    console.log(left%colors.length)
    $("#colorbutton-left").css({'background-color': colors[left]})
    $("#colorbutton-right").css({'background-color': colors[right]})
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

{
    $("#colorbutton-left").click(event=>{
        let index = (colors.indexOf(selectedColor))-1
        index %= colors.length
        if (index==-1){
            index = colors.length-1
        }
        selectedColor = colors[index]
        $("#colorbutton").css({'background': selectedColor})
        var left = index -1
        if (left==-1) {
            left= colors.length-1
        }
        var right = index +1
        if (right==-1) {
            right= colors.length-1
        }
        console.log(left%colors.length)
        $("#colorbutton-left").css({'background-color': colors[left]})
        $("#colorbutton-right").css({'background-color': colors[right]})
    })
    $("#colorbutton-right").click(event=>{
        let index = (colors.indexOf(selectedColor))+1
        index %= colors.length
        if (index==-1){
            index = colors.length-1
        }
        selectedColor = colors[index]
        $("#colorbutton").css({'background': selectedColor})
        var left = index -1
        if (left==-1) {
            left= colors.length-1
        }
        var right = index +1
        if (right==-1) {
            right= right %colors.length
        }
        $("#colorbutton-left").css({'background-color': colors[left]})
        $("#colorbutton-right").css({'background-color': colors[right]})
    })
}


/*let visual_displacement = {
    x: 0,
    y: 0
}

{
    let start = [0, 0]
    let end = [0, 0]
    canvas[0].addEventListener('touchstart', (event)=>{
        start[0] = event.changedTouches[0].screenX
        start[1] = event.changedTouches[0].screenY
        console.log(start)
    })
    canvas[0].addEventListener('touchmove', (event)=>{
        end[0] = event.changedTouches[0].screenX
        end[1] = event.changedTouches[0].screenY
    })
    canvas[0].addEventListener('touchend', event => {
        pos.x += (end[0] - start[0]) * (scale / 50);
        pos.y += (end[1] - start[1]) * (scale / 50);
    })
}
*/
var pos = {
    x: 0,
    y: 0
}
/*
const queue = []
function findInQueue(pixel){
    queue.findIndex(({x, y, color}) => {if(pixel.x===x && pixel.y===y){return true}})
}
*/


var cTime = new Date;
let iTime = new Date - cTime;
var scale = 25


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
        ctx.lineWidth = 2
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

    zoomedSpeed=scale/2
    velocity_speed = scale
    scale += keyboard.pressed("KeyE") ? zoomedSpeed : keyboard.pressed("KeyQ")*-1 * zoomedSpeed
    movement()
}

setInterval(() => {
    gameLoop()
}, 1000/60);

$(window).keydown(e=>{if(e.code=='KeyF'){showHelpMenu=false}})

