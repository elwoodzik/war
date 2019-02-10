import Bar from "../../../../../../../lib/Bar";

class CreationBar extends Bar {

    constructor(game, options) {
        super(game, options);

        this.height = 25;
        this.static = true;
        this.x = 7;
        this.y = 166;
        this.used = false;
        this.zIndex = 51;
        this.width = 148;
    }

    update(dt) {
        super.update(dt);

        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.info.inProgress) {
            this.setStatusX(this.game.VAR.sellectedObj.timeLocal / (this.game.VAR.sellectedObj.info.inProgressTime / 100));
        }
    }
};

export default CreationBar;