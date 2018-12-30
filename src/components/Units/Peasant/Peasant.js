import Units from "../Units";
import Animations from "./Animations";
import Sounds from "./Sounds";

class Peasant extends Units {
    constructor(game, options) {
        super(game, options);

        this.type = 'worker';

        this.inBuilding = false;
        this.dir = 'idle_up';
        this.cargo = 'empty';
        this.inForestPos = {};
        this.speed = 60;

        this.info = {
            imageKey: 'peasant',
            name: 'Peasant',
            descriptios: [
                'opis',
                'opis',
                'opis'
            ],
            inProgress: false,
            inProgressTime: 0,

            // actions : [
            //     {
            //         image: this.AssetManager.get('icons'),
            //         iconLeft: (-46 * 0 + -3 * 0) - 3,
            //         iconTop: (-38 * 0 + -3 * 0) - 3,
            //         goldCost: 100,
            //         woodCost: 0,
            //         time: 10000,
            //         // create: {
            //         //     class: Peasant,
            //         //     key: 'peasant'
            //         // },
            //         // callback: this.buildingUnit
            //     },
            // ],    
        }

        new Animations(this);
        this.sounds = new Sounds();
    }

    update(dt) {
        super.update(dt);

        if (this.inWooding) {

        }
    }

    extendsMove(nextTile, nextStep, startPos) {
        // nextTile 4 === kopalnia
        if (nextTile.type === 'gold' && this.cargo === 'empty' && !this.inBuilding) {
            this.inMine(nextStep, startPos);
            return true;
        }
        else if (nextTile.type === 'town' && (this.cargo === 'gold' || this.cargo === 'wood') && !this.inBuilding) {
            this.inTown(nextStep, startPos);
            return true;
        }
        else if (nextTile.type === 'forest' && this.cargo === 'empty' && !this.inBuilding) {
            this.inForest(nextStep, startPos);
            return true;
        }
    }

    inMine(nextStep, startPos) {
        this.unSelectedBorder();
        this.inBuilding = true;
        this.isRender = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        this.doInTime(4500, () => {
            this.cargo = 'gold';
            this.leaveBuilding(this.game.VAR.town, 2, startPos, 0, 800);
        })
    }

    inTown(nextStep, startPos) {
        this.unSelectedBorder();
        this.inBuilding = true;
        this.isRender = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        if (this.cargo === 'gold') {
            this.game.VAR.settings.gold += this.game.VAR.settings.goldUpdateBy;
            this.game.VAR.hudTop.goldText.use(this.game.VAR.settings.gold);
        } else if (this.cargo === 'wood') {
            this.game.VAR.settings.wood += this.game.VAR.settings.woodUpdateBy;
            this.game.VAR.hudTop.woodText.use(this.game.VAR.settings.wood);
        }

        this.doInTime(2500, () => {
            if (this.cargo === 'gold') {
                this.cargo = 'empty';
                this.leaveBuilding(this.game.VAR.goldMine, 1, startPos, 0, 800);
            } else if (this.cargo === 'wood') {
                this.cargo = 'empty';
                this.leaveBuilding(this.inForestPos, 1, startPos, 0, 800);
                // endPos = this.inForestPos;
            }
        })
    }

    inForest(nextStep, startPos) {
        // this.game.VAR.map.reRenderTile(startPos.row, startPos.column, 2);
        this.inForestPos = { x: this.x, y: this.y, column: nextStep.y, row: nextStep.x };
        if (this.cargo === 'wood' || this.cargo === 'gold') {
            let endPos = this.game.VAR.map.getTileBySprite(this.game.VAR.town);
            const currentPos = this.game.VAR.map.getTileBySprite(this);

            if (endPos.column >= currentPos.column) {
                endPos = { ...endPos, column: endPos.column - 1 }
            }
            if (endPos.row > currentPos.row) {
                endPos = { ...endPos, row: endPos.row - 1 }
            }
            this.move(endPos);
            this.showBorder();
        } else {
            this.inWooding = true;
            this.getAnimationInMove(startPos, nextStep);
            // this.AssetManager.play('S_chopTree1', { duration: 0, })
            // this.AssetManager.play('S_chopTree2', { duration: 100 })
            // this.AssetManager.play('S_chopTree3', { duration: 200 })
            // this.AssetManager.play('S_chopTree4', { duration: 300 })
            this.treeSound(1);
            this.doInTime(13000, () => {
                this.cargo = 'wood';
                this.inWooding = false;
                this.goToBuilding(this.game.VAR.town, 2);
            })
        }
    }

    treeSound(index) {
        // console.log(this.isOutOfScreen)
        if (!this.AssetManager.getSrc(`S_chopTree${index}`)) {
            index = 1;
        }

        this.AssetManager.play(`S_chopTree${index}`, { duration: 600, volume: !this.isOutOfScreen ? 0.5 : 0 }).on("complete", () => {
            if (this.inWooding) {
                this.treeSound(index + 1);
            }
        })
    }

    goToBuilding(building, index = 1) {
        // this.restartPosition();
        if (building.update) {
            this.move(null, building, index);
        } else {
            this.move(building);
        }
    }

    leaveBuilding(building, index = 1, startPos, firstTime, nextTime) {
        this.doInTime(firstTime, () => {
            if (this.game.VAR.map.getTile(startPos.row, startPos.column).type !== 'solid') {
                this.isRender = true;
                this.inBuilding = false;

                this.goToBuilding(building, index);
            } else {
                this.leaveBuilding(building, index, startPos, nextTime, nextTime);
            }
        })
    }

}
export default Peasant;