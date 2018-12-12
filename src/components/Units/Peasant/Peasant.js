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
        if (nextTile === 4 && !this.inBuildin) {
            this.inMine(nextStep, startPos);
            return true;
        }
        else if (nextTile === 5 && (this.cargo === 'gold' || this.cargo === 'wood') && !this.inBuildin) {
            this.inTown(nextStep, startPos);
            return true;
        }
        else if (nextTile === 6) {
            this.inForest(nextStep, startPos);
            return true;
        }
    }

    inMine(nextStep, startPos) {
        this.unSelectedBorder();
        this.inBuildin = true;
        this.used = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        setTimeout(() => {
            this.used = true;
            this.inBuildin = false;
            this.cargo = 'gold';
            let endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.town);
            const currentPos = this.game.VAR.pathfinder.getTileBySprite(this);

            if (endPos.column > currentPos.column) {
                endPos = { ...endPos, column: endPos.column - 1 }
            }
            if (endPos.row >= currentPos.row) {
                endPos = { ...endPos, row: endPos.row - 1 }
            }
            // this.game.VAR.sellectedObj.restartPosition();
            this.move(endPos);
            this.showBorder();
        }, 4500)
    }

    inForest(nextStep, startPos) {
        this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 2);
        this.inForestPos = { x: this.x, y: this.y, column: nextStep.y, row: nextStep.x };
        if (this.cargo === 'wood' || this.cargo === 'gold') {
            let endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.town);
            const currentPos = this.game.VAR.pathfinder.getTileBySprite(this);

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
                let endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.town);
                const currentPos = this.game.VAR.pathfinder.getTileBySprite(this);

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

    inTown(nextStep, startPos) {
        this.unSelectedBorder();
        this.inBuildin = true;
        this.used = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        setTimeout(() => {
            this.used = true;
            this.inBuildin = false;
            let endPos;
            if (this.cargo === 'gold') {
                endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.goldMine);
            } else if (this.cargo === 'wood') {
                endPos = this.inForestPos;
            }
            this.cargo = 'empty';
            // this.game.VAR.sellectedObj.restartPosition();
            this.move(endPos);
            this.showBorder();
        }, 2000)
    }
}
export default Peasant;