import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Warrior from "../../Units/Warrior/Warrior";
import Archer from "../../Units/Archer/Archer";
import Main from "../../Pages/Main";

class Barracks extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.armor = 0;
        this.hitPointsMax = 2230;
        this.currentHp = this.hitPointsMax;

        this.info = {
            imageKey: 'barracks',
            name: 'Koszary',
            descriptios: () => [
                'Trenuj',
                'wojsko',
                // 'Wood: 100'
            ],
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'warrior',
                    woodCost: 0,
                    goldCost: 600,
                    time: 60000 / Main.SETTINGS.buildSpeed,
                    onActionClick: this.onActionClick,
                    used: true,
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
                    time: 70000 / Main.SETTINGS.buildSpeed,
                    requirements: ['lumbermill'],
                    onActionClick: this.onActionClick,
                    used: true,
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