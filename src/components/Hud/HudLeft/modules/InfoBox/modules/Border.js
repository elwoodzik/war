import Rect from "../../../../../../../lib/Rect";


class Border extends Rect {

    constructor(game, options) {
        super(game, options);

        this.width = 154;
        this.height = 175;
        this.x = 4;
        this.y = 20;
        this.fill = null;
        this.strokeColor = 'black';
        this.zIndex = 51;
        this.static = true;
        this.used = false;
    }
};

export default Border;