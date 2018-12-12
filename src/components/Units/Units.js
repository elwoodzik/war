import Sprite from "../../../lib/Sprite";

class Units extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.type = 'worker';

        this.currentPosition = null;
        this.nextPosition = null;
        this.speed = 65
    }

    onClick() {
        this.selectedBorder();
    }

    selectedBorder() {
        this.game.VAR.sellectedObj = this;
        this.game.VAR.sellectedBorder.show();
        // this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
        // this.game.VAR.sellectedBorder.y = this.y; //+ this.height / 2
        // this.game.VAR.sellectedBorder.width = this.width;
        // this.game.VAR.sellectedBorder.height = this.height;
    }

    unSelectedBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedObj = null;
            this.game.VAR.sellectedBorder.hide();
        }
    }

    hideBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedBorder.hide();
        }
    }

    showBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedBorder.show();
        }
    }

    updateBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
            this.game.VAR.sellectedBorder.y = this.y + (this.height - 30)//+ this.height / 2
            this.game.VAR.sellectedBorder.width = 32//this.width;
            this.game.VAR.sellectedBorder.height = 32//this.height;
        }
    }

    update(dt) {
        super.update(dt);
        this.updateBorder();
        this.animations.play({
            key: this.dir
        })
    }

    move(endPos) {
        const startPos = this.game.VAR.pathfinder.getTileBySprite(this);
        this.game.easystar.setGrid(this.game.VAR.pathfinder.paths);

        this.game.easystar.findPath(startPos.row, startPos.column, endPos.row, endPos.column, (newPath) => {
            if (newPath === null) {
                console.log("Path was not found.");
            } else {
                if (newPath.length > 0) {
                    newPath.shift();
                    const nextStep = newPath.shift();
                    const nextTile = this.game.VAR.pathfinder.getTile(nextStep.x, nextStep.y);

                    if (nextTile === 3) {
                        // 3 oznacza ze juz na tym polu stoi jakas postac
                        this.game.VAR.pathfinder.reRenderTile(nextStep.x, nextStep.y, 2);
                        this.move(endPos);
                        return false;
                    }

                    if (this.extendsMove && typeof this.extendsMove === 'function') {
                        const bool = this.extendsMove(nextTile, nextStep, startPos);
                        if (bool) {
                            return;
                        }
                    }

                    this.currentPosition = this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 1);
                    this.nextPosition = this.game.VAR.pathfinder.reRenderTile(nextStep.x, nextStep.y, 3);

                    this.getAnimationInMove(this.currentPosition, this.nextPosition);

                    this.moveToPoint({
                        x: nextStep.x * 32, y: nextStep.y * 32, speed: this.speed, callback: () => {
                            if (newPath.length > 0) {
                                this.move(endPos);
                            } else {
                                this.currentPosition = this.game.VAR.pathfinder.reRenderTile(nextStep.x, nextStep.y, 3);
                                this.dir = `idle${this.dir.slice(4)}`;

                            }
                        }
                    })
                }

            }
        })
        this.game.easystar.calculate();
    }

    restartPosition() {
        if (this.nextPosition) {
            this.game.VAR.pathfinder.reRenderTile(this.nextPosition.row, this.nextPosition.column, 1);
        }
        if (this.currentPosition) {
            this.game.VAR.pathfinder.reRenderTile(this.currentPosition.row, this.currentPosition.column, 1);
        }

        this.nextPosition = null;
        this.currentPosition = null;
    }

    getAnimationInMove(currentPos, pos) {
        if (pos.x > currentPos.x && pos.y > currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_right_down' //'move_wood_right_down';
            } else {
                this.dir = 'move_right_down';
            }
        } else if (pos.x === currentPos.x && pos.y > currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_down'//'move_wood_down';
            } else {
                this.dir = 'move_down';
            }
        } else if (pos.x < currentPos.x && pos.y > currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_left_down'//'move_wood_left_down';
            } else {
                this.dir = 'move_left_down';
            }
        } else if (pos.x < currentPos.x && pos.y === currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_left'//'move_wood_left';
            } else {
                this.dir = 'move_left';
            }
        } else if (pos.x < currentPos.x && pos.y < currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_left_up'//'move_wood_left_up';
            } else {
                this.dir = 'move_left_up';
            }
        } else if (pos.x === currentPos.x && pos.y < currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_up'//'move_wood_up';
            } else {
                this.dir = 'move_up';
            }
        } else if (pos.x > currentPos.x && pos.y < currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_right_up'//'move_wood_right_up';
            } else {
                this.dir = 'move_right_up';
            }
           
        } else if (pos.x > currentPos.x && pos.y === currentPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_right'//'move_wood_right';
            } else {
                this.dir = 'move_right';
            }
        }
    }
}
export default Units;