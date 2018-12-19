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
            this.isRender = true;
            this.inBuildin = false;
            this.cargo = 'gold';
            let endPos = this.game.VAR.map.getTileBySprite(this.game.VAR.town);
            const currentPos = this.game.VAR.map.getTileBySprite(this);

            if (endPos.column > currentPos.column) {
                endPos = { ...endPos, column: endPos.column - 1 }
            }
            if (endPos.row >= currentPos.row) {
                endPos = { ...endPos, row: endPos.row - 1 }
            }
            // this.game.VAR.sellectedObj.restartPosition();
            this.move(endPos);
            // this.showBorder();
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
            this.isRender = true;
            this.inBuildin = false;
            let endPos;
            if (this.cargo === 'gold') {
                // endPos = this.game.VAR.map.getTileBySprite(this.game.VAR.goldMine);
                this.game.VAR.goldMine.goToMine();
                this.cargo = 'empty';
            } else if (this.cargo === 'wood') {
                endPos = this.inForestPos;
            }
            // const currentPos = this.game.VAR.map.getTileBySprite(this);

            // if (endPos.column >= currentPos.column) {
            //     endPos = { ...endPos, column: endPos.column - 1 }
            // }
            // if (endPos.row > currentPos.row) {
            //     endPos = { ...endPos, row: endPos.row - 1 }
            // }

            // this.game.VAR.sellectedObj.restartPosition();
            // this.move(endPos);
            // this.showBorder();
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


}
export default Peasant;