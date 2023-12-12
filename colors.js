const audioPlayer = new Audio('select-sound.mp3');

var colors = ['hotpink', 'purple', 'blue', 'green', 'lime', 'yellow', 'orange', 'red', 'white', 'grey', 'black']

colors.forEach(color=>{
    let btn = document.createElement('button');
    btn.id = color;
    btn.className = 'color';
    $("#palette")[0].appendChild(btn)
    $("#"+color).mousedown(event=>{
        selectedColor = $("#"+color)[0].id;
        audioPlayer.play();
    }).css({
        background: color
    })
})

// key down color change :
$(document).keydown(e=>{
    if(e.code=="ArrowRight"){
        let index = (colors.indexOf(selectedColor))+1
        index %= colors.length
        selectedColor = colors[index]
    };
    if(e.code=="ArrowLeft"){
        let index = (colors.indexOf(selectedColor))-1
        index %= colors.length
        if (index==-1){
            index = colors.length-1
        }
    selectedColor = colors[index]
}})