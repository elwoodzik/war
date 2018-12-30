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
            x: 32 * 5 + 1,
            y: this.game.height - 5,
            text: ' ',
            static: true,
            fontSize: 18,
            zIndex: 51
        })

        this.goldIcon = this.game.add.image({
            x: 32 * 18 + 1,
            y: this.game.height - 19,
            key: 'gold_icon',
            static: true,
            zIndex: 51,
            used: false
        })

        this.woodIcon = this.game.add.image({
            x: 32 * 23 + 1,
            y: this.game.height - 19,
            key: 'wood_icon',
            static: true,
            zIndex: 51,
            used: false
        })
    }
}
export default HudBottom;