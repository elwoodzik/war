import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";

class LumberMill extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'lumber_mill',
            name: 'Tartak',
            descriptios: [
                'Zwiększa',
                'produkcję',
                'drewna o 10%',
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
export default LumberMill;