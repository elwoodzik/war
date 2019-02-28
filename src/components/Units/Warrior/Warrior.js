import Units from "../Units";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Warrior extends Units {
    constructor(game, options) {
        super(game, options);

        this.type = 'warrior';
        this.dir = 'idle_down';
        this.buildingPut = {};

        this.dmg = [6, 6];
        this.armor = 2;
        this.speed = 60;
        this.range = 1;
        this.hitPointsMax = 60;
        this.currentHp = this.hitPointsMax;

        this.info = {
            dmg: this.dmg,
            armor: this.armor,
            speed: this.speed,
            range: this.range,
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            imageKey: 'warrior',
            name: 'Wojownik',
            descriptios: [
                `Obrażenia: ${this.dmg[0]} - ${this.dmg[1]}`,
                `Armor: ${this.armor}`,
                `Zasięg: ${this.range}`
            ],
            actions: [

            ],
        }

        new Animations(this);
        this.sounds = new Sounds();

        this.y = this.y - this.height + 32;
        this.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
        this.currentTile.type = 'solid';
    }

    update(dt) {
        super.update(dt);
    }

    extendsMove(nextTile, nextStep, startPos) {
        return false;
    }
}
export default Warrior;