import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Tower extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'tower',
            name: 'Wieża',
            descriptios: [
                '',
            ],
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'tower_arrow',
                    woodCost: 0,
                    goldCost: 333400,
                    time: 22100,
                    onActionClick: this.onActionClick,
                    create: {
                        // class: Peasant,
                        key: 'tower_arrow',
                        name: 'wieżę łuczniczą',
                        prefix: 'Rozbuduj'
                    },
                },
                {
                    key: 'tower_cannon',
                    woodCost: 0,
                    goldCost: 333400,
                    time: 22100,
                    onActionClick: this.onActionClick,
                    create: {
                        // class: Peasant,
                        key: 'tower_cannon',
                        name: 'wieżę z działem',
                        prefix: 'Rozbuduj'
                    },
                },
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
export default Tower;