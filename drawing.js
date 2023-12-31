$("#canvas").mousemove(e=>{
    cursorActive = !showHelpMenu
    cursorHover = [
        Math.floor((e.pageX)/scale-pos.x), 
        Math.floor((e.pageY)/scale-pos.y)
    ]
    if(cursorActive&&cursorDrawing&&cursorHover[0])
    {
        firebasePlaceRequest(cursorHover[0], cursorHover[1], selectedColor);
    }
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