import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";

class GoldMine extends Buildings {
    constructor(game, options) {
        super(game, options);

        this.dir = 'idle';

        this.info = {
            imageKey: 'goldmine',
            name: 'Goldmine',
            descriptios: [
                'Resources:',
                'unlimited',
                // 'Wood: 100'
            ],
        }

        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(4, 'gold');
    }

    onClick() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && this.game.VAR.sellectedObj.cargo === 'empty') {
            this.game.VAR.sellectedObj.goToBuilding(this.game.VAR.goldMine, 1);
             this.game.VAR.sellectedObj.getRandomMoveSound();
        } else if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && (this.game.VAR.sellectedObj.cargo === 'gold')) {
            this.game.VAR.sellectedObj.goToBuilding(this.game.VAR.town, 2);
             this.game.VAR.sellectedObj.getRandomMoveSound();
        } else {
            super.onClick();
        }
    }
}
export default GoldMine;