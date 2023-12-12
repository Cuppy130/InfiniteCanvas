//totally not stolen from a youtube video
class InputHandler {
    constructor(){
        this.keys = [];
        $(window).keydown( e => {
            if( this.keys.indexOf( e.code ) === -1 ) {
                this.keys.push( e.code )
            }
        });
        $(window).keyup( e => {
            if( this.keys.indexOf( e.code ) > -1 ) {
                this.keys.splice( this.keys.indexOf( e.code ), 1)
            }
        });
    }
    pressed(code=""){
        let r = 0;
        if( this.keys.indexOf( code ) > -1 ){ r = 1 } else { r = 0 };
        return r;
    }
}