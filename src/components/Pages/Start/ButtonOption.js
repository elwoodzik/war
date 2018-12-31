import Button from "../../../../lib/Button";

class ButtonOption extends Button {

    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.text = 'Opcje';
        this.height = 50;
        this.x = this.game.width / 2 - this.width / 2;
        this.y = this.game.height / 2 - this.height / 2 + 70;
    }

    onClick() {
        this.game.state.start('Main');
    }
};

export default ButtonOption;