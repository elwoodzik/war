
import TextLine from "../helpers/TextLine";
import Rect from "../../../../lib/Rect";

class HudBottom extends Rect {
    constructor(game, options) {
        super(game, options);

        this.group = game.add.group();

        this.immovable = true;
        this.x = 0;
        this.y = this.game.height - 21;
        this.width = this.game.width;
        this.height = 21;
        this.fill = 'gray';
        this.static = true;

        this.hoverText = new TextLine(game, { x: 32 * 5 + 1, y: this.game.height - 5, text: ' ', });

        this.goldIcon = this.game.add.image({ x: 32 * 18 + 1, y: this.game.height - 19, key: 'gold_icon', static: true, zIndex: 51, used: false });
        this.goldText = new TextLine(game, { x: 32 * 19 - 10, y: this.game.height - 5, text: 1500, });

        this.woodIcon = this.game.add.image({ x: 32 * 23 + 1, y: this.game.height - 19, key: 'wood_icon', static: true, zIndex: 51, used: false });
        this.woodText = new TextLine(game, { x: 32 * 24 - 10, y: this.game.height - 5, text: 500, });

        this.group.add(this.hoverText);
        this.group.add(this.goldIcon);
        this.group.add(this.goldText);
        this.group.add(this.woodIcon);
        this.group.add(this.woodText);
    }

    show() {
        this.group.show();
    }

    showName() {
        this.hoverText.used = true;
    }

    hide() {
        this.group.hide();
    }
}
export default HudBottom;