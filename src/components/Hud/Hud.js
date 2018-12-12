import Rect from "../../../lib/Rect";

class Hud extends Rect {
    constructor(game, options) {
        super(game, options);
        this.immovable = true
    }

    onClick() {
        console.log('rect')
       return false;
    }
}
export default Hud;