import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Farm extends Buildings {

    static addPeople = 4;

    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'farm',
            name: 'Farma',
            descriptios: [
                'Budynek',
                'mieszkalny',
                // 'Wood: 100'
            ],
        }

        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(4, null);
        this.isBuilt();
    }

    isBuilt() {
        if (this.completed) {
            this.game.VAR.settings.homeMax += Farm.addPeople;
            this.game.VAR.hudTop.homeTextMax.use(this.game.VAR.settings.homeMax);
        }
    }
}
export default Farm;