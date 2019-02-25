import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Barracks extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'barracks',
            name: 'Koszary',
            descriptios: [
                'Trenuj',
                'wojsko',
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
export default Barracks;