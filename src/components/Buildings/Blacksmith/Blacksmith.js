import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Main from "../../Pages/Main";

class Blacksmith extends Buildings {

    constructor(game, options) {
        super(game, options);

        this.armor = 0;
        this.hitPointsMax = 2230;

        this.isBuilt();

        this.info = {
            imageKey: 'blacksmith',
            name: 'Kuźnia',
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            inProgress: false,
            inProgressTime: 0,
            descriptios: () => [
                'Zwiększa',
                'produkcję',
                'złota o 10%',
                // 'Wood: 100'
            ],
            actions: [
                {
                    key: 'swordUpgrade1',
                    woodCost: 400,
                    goldCost: 800,
                    time: 45000 / Main.SETTINGS.player.buildSpeed,
                    onActionClick: this.onActionClick,
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Miecz + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'sword',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'swordUpgrade2',
                    woodCost: 400,
                    goldCost: 800,
                    time: 45000 / Main.SETTINGS.player.buildSpeed,
                    onActionClick: this.onActionClick,
                    requirements: ['swordUpgrade1'],
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Miecz + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'sword',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'swordUpgrade3',
                    woodCost: 400,
                    goldCost: 800,
                    time: 45000 / Main.SETTINGS.player.buildSpeed,
                    onActionClick: this.onActionClick,
                    requirements: ['swordUpgrade2'],
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Miecz + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'sword',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'shieldUpgrade1',
                    woodCost: 0,
                    goldCost: 400,
                    time: 45000 / Main.SETTINGS.player.buildSpeed,
                    onActionClick: this.onActionClick,
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Tarcze + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'armor',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'shieldUpgrade2',
                    woodCost: 0,
                    goldCost: 400,
                    time: 45000 / Main.SETTINGS.player.buildSpeed,
                    onActionClick: this.onActionClick,
                    requirements: ['shieldUpgrade1'],
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Tarcze + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'armor',
                        upgradeValue: 2
                    },
                },
                {
                    key: 'shieldUpgrade3',
                    woodCost: 0,
                    goldCost: 400,
                    time: 45000 / Main.SETTINGS.player.buildSpeed,
                    onActionClick: this.onActionClick,
                    requirements: ['shieldUpgrade2'],
                    used: true,
                    create: {
                        class: null,
                        key: null,
                        name: 'Tarcze + 2',
                        prefix: 'Ulepsz',
                        upgrade: 'armor',
                        upgradeValue: 2
                    },
                },

            ],
        }
        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(4, null);
    }
}
export default Blacksmith;