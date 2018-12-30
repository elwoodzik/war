import Buildings from "../Buildings";
import Peasant from "../../Units/Peasant/Peasant";
import Animations from "./Animations";
import Sounds from "./Sounds";


class Town extends Buildings {
    constructor(game, options) {
        super(game, options);

        this.dir = 'idle';

        this.info = {
            imageKey: 'town',
            name: 'Town Hall',
            descriptios: [
                'Production:',
                'Gold: 100',
                'Wood: 100'
            ],
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'peasant',
                    onActionHover: this.onActionHover,
                    woodCost: 0,
                    goldCost: 400,
                    time: 13000,
                    onBuild: this.onActionBuild,
                    create: {
                        class: Peasant,
                        key: 'peasant'
                    },
                },
            ],
        }
        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(5, 'town', 30);
    }

    update(dt) {
        super.update(dt);
    }
}
export default Town;