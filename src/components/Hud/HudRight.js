import Rect from "../../../lib/Rect";

class HudRight extends Rect {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = this.game.width - 21;
        this.y = 0;
        this.width = 21;//this.game.width;
        this.height = this.game.height;
        this.fill = 'gray';
        this.static = true;
    }
}
export default HudRight;