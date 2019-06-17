import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Main from "../../Pages/Main";

class LumberMill extends Buildings {

    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.armor = 0;
        this.hitPointsMax = 2230;
      
        this.isBuilt();

        this.info = {
            imageKey: 'lumber_mill',
            name: 'Tartak',
            descriptios: () => [
                'Zwiększa',
                'produkcję',
                'drewna o 10%',
                // 'Wood: 100'
            ],
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'arrowUpgrade1',
                    woodCost: 400,
                    goldCost: 800,

                    time: 45000 / Main.SETTINGS.buildSpeed,
                    onActionClick: this.onActionClick,
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Łuk + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'arrow',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'arrowUpgrade2',
                    woodCost: 400,
                    goldCost: 800,
                    time: 45000 / Main.SETTINGS.buildSpeed,
                    onActionClick: this.onActionClick,
                    requirements: ['arrowUpgrade1'],
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Łuk + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'arrow',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'arrowUpgrade3',
                    woodCost: 400,
                    goldCost: 800,
                    time: 45000 / Main.SETTINGS.buildSpeed,
                    onActionClick: this.onActionClick,
                    requirements: ['arrowUpgrade2'],
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Łuk + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'arrow',
                        upgradeValue: 2
                    },
                }
            ],
        }

        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(4, null);
       
    }

    isBuilt() {
        super.isBuilt();

        if (this.completed) {
            Main.SETTINGS.requirements.lumbermill = true;
        }
    }
}
export default LumberMill;