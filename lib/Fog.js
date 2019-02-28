import Rect from "./Rect";

class Fog extends Rect {

    constructor(game, options) {
        super(game, options);

        this.static = false;
        this.zIndex = 111;
        this.game.sortByIndex();
        this.width = 32;
        this.height = 32;
    }

    draw(dt){
        // this.context.globalCompositeOperation = 'destination-atop';
      
        // super.draw(dt);
        
        // this.context.globalCompositeOperation = 'source-over';
        
    }
};

export default Fog;