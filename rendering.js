class Rendering {
    constructor(canvas){
        this.pixels2 = [];
        this.pixels = {};
        this.canvasElement = canvas;
        this.scale = 1;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }
    main() {
        for (let x = 0; x < 200; i++) {
            this.pixels[`${100}x${x}`] = {x: 101, y: i-100, color: violet}
        }
    }
    addPixel(pixel){
        this.pixels[`${pixel.x}x${pixel.y}`] = pixel;
    }
    removePixel(pixel){
        this.pixels.splice(this.pixels.indexOf(pixel), 1);
    }
    updatePixel(pixel){
        this.pixels[`${pixel.x}x${pixel.y}`] = pixel;
    }
    drawPixels(){
        //const ctx = this.canvasElement[0].getContext('2d');
        
        const ctx = this.canvasElement[0].getContext('2d');
        /*this.pixels.forEach(pixel=>{
            let posx = pixel.x*scale+pos.x*scale;
            let posy = pixel.y*scale+pos.y*scale;
            let wid = scale;
            let hei = scale;
        
            if(posx >= scale-scale*2 && posx <= scale*(innerWidth/scale) && posy+scale >= 0 && posy <= scale*(innerHeight/scale)){
                ctx.fillStyle = pixel.color;
                ctx.beginPath();
                ctx.moveTo(posx, posy+hei);
                ctx.lineTo(posx, posy-1);
                ctx.lineTo(posx+wid, posy-1);
                ctx.lineTo(posx+wid, posy+hei);
                ctx.fill();
            }
        })*/
        //ctx.fillStyle = "rgba(255, 255, 255, 0.5"
        //ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
        
        let arr = []
        
        function recursion(x, y, pixels, width = 1){
            let height = 1;
            if(!pixels[`${x+1}x${y}`]){
                return arr
            }
            if(pixels[`${x}x${y}`].color == pixels[`${x+1}x${y}`].color){
                width++;
                x++;
                let color = pixels[`${x}x${y}`].color
                let x2= x-width+1
                recursion(x, y, pixels, width)
                arr.push({x:x2, y, color, width, height})
            } else {
                let color = pixels[`${x}x${y}`].color
                let x2= x-width+1
                arr.push({x:x2, y, color, width, height})
                recursion(x+1, y, pixels)
            }
            return arr
        }
        for(let i=0; i<=400; i++){
            recursion(Math.floor(-100), Math.floor(i-101), this.pixels)
        }
        
        this.pixels2 = arr
        this.pixels2.forEach(pixel=>{
            let posx = pixel.x*scale+pos.x*scale;
            let posy = pixel.y*scale+pos.y*scale;
            let wid = scale * pixel.width;
            let hei = scale * pixel.height + 1;
            ctx.fillStyle = pixel.color
            ctx.fillRect(posx, posy, wid, hei)
        })
    }
    
}