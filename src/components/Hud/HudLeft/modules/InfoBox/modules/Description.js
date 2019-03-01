
import TextLine from "../../../../helpers/TextLine";

class Description extends TextLine {

    constructor(game, options) {
        super(game, options);

        this.x = -500;
        this.y = 80;
        this.static = true;
        this.fontSize = 18;
        this.text = ' ';
        this.zIndex = 51;
    }

    set(description, i) {
        this.x = 8;
        this.y = 95 + 22 * i;
        this.used = true;
        this.use(description);
    }

    update(dt) {
        super.update(dt);
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.info.inProgress) {
            this.used = false;
        }
    }
};

export default Description;