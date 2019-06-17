import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Main from "../../Pages/Main";

class Tower extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.armor = 0;
        this.hitPointsMax = 2230;
      
        this.isBuilt();

        this.info = {
            imageKey: 'tower',
            name: 'Wieża',
            descriptios: () => [
                'Wieża obronna',
            ],
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'tower_arrow',
                    woodCost: 0,
                    goldCost: 300,
                    time: 22100 / Main.SETTINGS.buildSpeed,
                    onActionClick: this.onActionClick,
                    used: true,
                    create: {
                        // class: Peasant,
                        key: 'tower_arrow',
                        name: 'wieżę łuczniczą',
                        prefix: 'Rozbuduj',
                        upgrade: 'arrowTower',
                        upgradeDir: 'upgrade',
                        upgradeFinishDir: 'completeArrow'
                    },
                },
                {
                    key: 'tower_cannon',
                    woodCost: 0,
                    goldCost: 300,
                    time: 22100 / Main.SETTINGS.buildSpeed,
                    onActionClick: this.onActionClick,
                    used: true,
                    create: {
                        // class: Peasant,
                        key: 'tower_cannon',
                        name: 'wieżę z działem',
                        prefix: 'Rozbuduj',
                        upgrade: 'cannonTower',
                        upgradeDir: 'upgrade',
                        upgradeFinishDir: 'completeCannon'
                    },
                },

            ],
        }

        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(4, null);
    }
}
export default Tower;