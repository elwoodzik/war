import Rect from "../../../lib/Rect";

class HudBottom extends Rect {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = 0;
        this.y = this.game.height - 21;
        this.width = this.game.width;
        this.height = 21;
        this.fill = 'gray';
        this.static = true;


        this.hoverText = this.game.add.text({
            x: 200,
            y: this.game.height - 5,
            text: ' ',
            static: true,
            fontSize: 18
        })
    }
}
export default HudBottom;