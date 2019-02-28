import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Warrior from "../../Units/Warrior/Warrior";
import Archer from "../../Units/Archer/Archer";

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
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'warrior',
                    woodCost: 0,
                    goldCost: 600,
                    time: 60000  / this.game.VAR.settings.buildSpeed,
                    onActionClick: this.onActionClick,
                    create: {
                        class: Warrior,
                        key: 'warrior',
                        name: 'Wojownik',
                        prefix: 'Trenuj'
                    },
                },
                {
                    key: 'archer',
                    woodCost: 50,
                    goldCost: 500,
                    time: 70000  / this.game.VAR.settings.buildSpeed,
                    requirements: ['lumbermill'],
                    onActionClick: this.onActionClick,
                    create: {
                        class: Archer,
                        key: 'archer',
                        name: 'Łucznik',
                        prefix: 'Trenuj'
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
export default Barracks;