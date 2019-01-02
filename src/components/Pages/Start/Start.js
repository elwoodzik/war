import ButtonStart from './ButtonStart';
import ButtonOption from './ButtonOption';

class Start {

    constructor(game) {
        this.game = game;
    }

    create() {
        new ButtonStart(this.game, {});
        new ButtonOption(this.game, {});
    }

    update(dt) {

    }
};

export default Start;
