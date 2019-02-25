import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Blacksmith extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'blacksmith',
            name: 'Kuźnia',
            descriptios: [
                'Zwiększa',
                'produkcję',
                'złota o 10%',
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

        }
    }
}
export default Blacksmith;