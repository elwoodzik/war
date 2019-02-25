

import Rect from "../../../../lib/Rect";
import TextLine from "../helpers/TextLine";

class HudTop extends Rect {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width;
        this.height = 21;
        this.fill = 'gray';
        this.static = true;

        this.goldIcon = this.game.add.image({ x: 350, y: 2, key: 'gold_icon', static: true, zIndex: 51 });
        this.goldText = new TextLine(game, { text: 500, x: 375, y: 16, used: true });

        this.woodIcon = this.game.add.image({ x: 550, y: 2, key: 'wood_icon', static: true, zIndex: 51 });
        this.woodText = new TextLine(game, { text: 200, x: 575, y: 16, used: true });

        this.homeIcon = this.game.add.image({ x: 750, y: 2, key: 'home_icon', static: true, zIndex: 51 });
        this.homeTextCurrent = new TextLine(game, { text: '0', x: 775, y: 16, used: true });
        this.homeSlash = new TextLine(game, { text: '/', x: 795, y: 16, used: true });
        this.homeTextMax = new TextLine(game, { text: 5, x: 810, y: 16, used: true });
    }
}
export default HudTop;