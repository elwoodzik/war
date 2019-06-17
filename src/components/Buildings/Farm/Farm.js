import Buildings from "../Buildings";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Main from "../../Pages/Main";

class Farm extends Buildings {

    static addPeople = 4;

    constructor(game, options) {
        super(game, options);

        this.armor = 0;
        this.hitPointsMax = 2230;
        
        this.isBuilt();
        
        this.info = {
            imageKey: 'farm',
            name: 'Farma',
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            descriptios: () => [
                'Zwiększa populacje',
                'o 4',
                // 'Wood: 100'
            ],
        }

        new Animations(this);
        this.sounds = new Sounds();
        this.unWalkable(4, null);
        
    }

    isBuilt() {
        super.isBuilt();
        if (this.completed) {
            Main.SETTINGS.homeMax += Farm.addPeople;
            this.game.VAR.hudTop.homeTextMax.use(Main.SETTINGS.homeMax);
        }
    }
}
export default Farm;