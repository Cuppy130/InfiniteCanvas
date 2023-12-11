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