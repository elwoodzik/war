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

        this.inRange = this.game.add.inRange({
            element: this,
            target: this.game.VAR.settings.people,
            isRender: true,
            zIndex: 2,
        })

        this.y = this.y - this.height + 32;
        this.pathMove.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
        this.pathMove.currentTile.type = 'solid';
        this.pathMove.currentTile.enemy = true;
    }

    update(dt) {
        super.update(dt);
        // if (this.inRange.rectCircleColliding()) {
        //     console.log('x')
        // }
        if (!this.attackTarget) {
            this.inRange.rectCircleColliding(this.followEnemy)
        }

        // else {
        // if (this.life > 0) {
        //     this.generateRandomMove(dt);
        // }
    }

    followEnemy = (enemy) => {
        console.log('ffff', enemy)
        this.attackTarget = true;

        this.pathMove.move(null, (path, player) => {
            console.log('atakuj')
            console.log(enemy.pathMove.isMoving)
            if (enemy.pathMove.isMoving) {
                this.followEnemy(enemy);
            }
        }, enemy);
    }

    extendsMove(nextTile, nextStep, startPos) {
        return false;
    }
}
export default Warrior;