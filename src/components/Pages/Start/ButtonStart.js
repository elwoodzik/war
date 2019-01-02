import Button from "../../../../lib/Button";

class ButtonStart extends Button {

    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.text = 'Graj';
        this.height = 50;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2;
    }

    onClick() {
        this.game.state.start('Main');
    }
};

export default ButtonStart;