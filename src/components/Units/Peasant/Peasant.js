import Units from "../Units";
import Animations from "./Animations";

class Peasant extends Units {
    constructor(game, options) {
        super(game, options);

        this.type = 'worker';

        this.inBuildin = false;
        this.dir = 'idle_up';
        this.cargo = 'empty';
        this.inForestPos = {};
        this.speed = 60;

        this.info = {
            imageKey: 'peasant',
            name: 'Peasant',
            descriptios: [
                'Production',
                'Gold: 100',
                'Wood: 100'
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
    }

    update(dt) {
        super.update(dt);
    }

    extendsMove(nextTile, nextStep, startPos) {
        // nextTile 4 === kopalnia
        if (nextTile.type === 'gold' && this.cargo === 'empty' && !this.inBuildin) {
            this.inMine(nextStep, startPos);
            return true;
        }
        else if (nextTile.type === 'town' && (this.cargo === 'gold' || this.cargo === 'wood') && !this.inBuildin) {
            this.inTown(nextStep, startPos);
            return true;
        }
        else if (nextTile === 'forest') {
            this.inForest(nextStep, startPos);
            return true;
        }
    }

    inMine(nextStep, startPos) {
        this.unSelectedBorder();
        this.inBuildin = true;
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
        this.inBuildin = true;
        this.isRender = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        this.doInTime(2500, () => {
            if (this.cargo === 'gold') {
                this.cargo = 'empty';
                this.leaveBuilding(this.game.VAR.goldMine, 1, startPos, 0, 800);
            } else if (this.cargo === 'wood') {
                this.cargo = 'empty';
                endPos = this.inForestPos;
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
            // this.getAnimationInMove(startPos, nextStep);
            this.doInTime(4500, () => {
                this.cargo = 'wood';
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
            })
        }
    }

    goToBuilding(building, index = 1) {
        this.restartPosition();
        this.move(null, building, index);
    }

    leaveBuilding(building, index = 1, startPos, firstTime, nextTime) {
        this.doInTime(firstTime, () => {
            if (this.game.VAR.map.getTile(startPos.row, startPos.column).type !== 'solid') {
                this.isRender = true;
                this.inBuildin = false;

                this.goToBuilding(building, index);
            } else {
                this.leaveBuilding(building, index, startPos, nextTime, nextTime);
            }
        })
    }

}
export default Peasant;