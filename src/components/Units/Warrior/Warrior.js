import Units from "../Units";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Warrior extends Units {
    constructor(game, options) {
        super(game, options);

        this.type = 'warrior';
        this.dir = 'idle_down';
        this.buildingPut = {};

        this.dmg = this.setDmg(6, 6);
        this.armor = this.setArmor(2);

        this.range = 1;
        this.hitPointsMax = 60;
        this.currentHp = this.hitPointsMax;

        this.info = {
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            imageKey: 'warrior',
            name: 'Wojownik',
            descriptios: () => [
                `Obrażenia: ${this.dmg()[0]} - ${this.dmg()[1]}`,
                `Armor: ${this.armor()}`,
                `Zasięg: ${this.range}`
            ],
            actions: [

            ],
        }

        new Animations(this);
        this.sounds = new Sounds();

        this.y = this.y - this.height + 32;
        this.pathMove.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
        this.pathMove.currentTile.type = 'solid';
        this.game.easystar.setAdditionalPointCost(this.pathMove.currentTile.row, this.pathMove.currentTile.column, 300);
    }

    update(dt) {
        super.update(dt);
    }

    extendsMove(nextTile, nextStep, startPos) {
        return false;
    }
}
export default Warrior;