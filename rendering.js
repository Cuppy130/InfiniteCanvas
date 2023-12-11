class Rendering {
    constructor(canvas){
        this.pixels = [];
        this.canvasElement = canvas;
        this.scale = 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    addPixel(pixel){
        this.pixels.push(pixel);
    }
    removePixel(pixel){
        this.pixels.splice(this.pixels.indexOf(pixel), 1);
    }
    updatePixel(pixel){
        this.pixels[this.pixels.findIndex(({x, y, color}) => x===pixel.x && y===pixel.y)].color = pixel.color
    }
    drawPixels(){
        const ctx = this.canvasElement[0].getContext('2d');
        this.pixels.forEach(pixel=>{
            let posx = pixel.x*scale+pos.x*scale;
            let posy = pixel.y*scale+pos.y*scale;
            let wid = scale;
            let hei = scale;
        
            if(posx >= scale-scale*2 && posx <= scale*(innerWidth/scale) && posy+scale >= 0 && posy <= scale*(innerHeight/scale)){
                ctx.fillStyle = pixel.color;
                ctx.beginPath();
                ctx.moveTo(posx, posy+hei);
                ctx.lineTo(posx, posy-1);
                ctx.lineTo(posx+wid+1, posy-1);
                ctx.lineTo(posx+wid+1, posy+hei);
                ctx.fill();
            }
        })
    }
    
}