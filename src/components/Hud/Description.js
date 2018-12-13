import Text from "../../../lib/Text";

class Description extends Text {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = 0;
        this.y = 0;
        this.static = true;
        this.used = false;
    }

    show(count){
        
    }
}
export default Description;