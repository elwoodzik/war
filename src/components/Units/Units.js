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

    draw(dt) {
        super.draw(dt);

        if (this.path) {
            this.path.forEach((path) => {
                this.context.beginPath();
                this.context.strokeStyle = 'red';
                this.context.rect((path.x * 32) - this.game.camera.xScroll, (path.y * 32) - this.game.camera.yScroll, 32, 32)
                this.context.stroke()
                this.context.closePath();
            })
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
        // this.game.easystar.setGrid(this.game.VAR.pathfinder.paths);
        this.startPos = this.game.VAR.map.getTileBySprite(this);


        this.myCurrentPath = this.game.easystar.findPath(this.startPos.row, this.startPos.column, endPos.row, endPos.column, (newPath) => {
            this.path = newPath;
            if (newPath === null) {
                console.log("Path was not found.");
            } else {
                if (newPath.length > 0) {
                    newPath.shift();
                    this.nextStep = newPath.shift();
                    // this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 20);

                    this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);
                    this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);

                    if (this.nextTile.type === 'town' && this.cargo === 'empty') {
                        this.nextTile.type = 'town'
                        return this.move(endPos);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'town' && this.cargo === 'empty') {
                        this.currentTile.type = 'town'
                        return this.move(endPos);
                    }
                    if (this.nextTile.type === 'gold' && this.cargo === 'gold') {
                        this.nextTile.type = 'gold'
                        return this.move(endPos);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'gold' && this.cargo === 'gold') {
                        this.currentTile.type = 'gold'
                        return this.move(endPos);
                    }

                    this.currentTile.type = 'solid';

                    if (this.nextTile.type === 'solid') {
                        this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 60);
                        this.dir = `idle${this.dir.slice(4)}`;
                        if (newPath.length === 0) {
                            this.currentTile.type = 'solid';
                            this.dir = `idle${this.dir.slice(4)}`;

                            return false;
                        }
                        return this.move(endPos);
                    }


                    if (this.extendsMove && typeof this.extendsMove === 'function') {
                        const bool = this.extendsMove(this.nextTile, this.nextStep, this.startPos);
                        if (bool) {
                            // newPath.pop();
                            // newPath.shift();
                            // newPath.shift();

                            // const a = {
                            //     row: this.nextStep.x,
                            //     column: this.nextStep.y
                            // }
                            // this.path = [];

                            return false
                        }
                    }

                    // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 20);
                    this.nextTile.type = 'solid';
                    // this.currentPosition = this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    // this.nextPosition = { x: this.nextStep.x * 32, y: this.nextStep.y * 32 } //this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 3);
                    // console.log(this.startPos)
                    this.getAnimationInMove(this.startPos, this.nextStep);

                    this.moveToPoint({
                        x: this.nextStep.x * 32, y: this.nextStep.y * 32, speed: this.speed, callback: () => {
                            // console.log(this.myCurrentPath)
                            // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
                            this.currentTile.type = 'empty';

                            if (newPath.length > 0) {
                                this.move(endPos);
                            } else {
                                this.nextTile.type = 'solid';
                                this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 60);
                                // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 3);
                                // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 20);


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
        if (this.startPos) {
            // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 0);
            if (this.currentTile.type === 'solid') {
                this.currentTile.type = 'empty';
            }
        }
        if (this.nextStep) {
            // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 1);
            this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 0);
            if (this.nextTile.type === 'solid') {
                this.nextTile.type = 'empty';
            }
        }



        // this.nextPosition = null;
        // this.currentPosition = null;
    }

    getAnimationInMove(startPos, nextStep) {
        const _nextStep = { x: nextStep.x * 32, y: nextStep.y * 32 };

        if (_nextStep.x > startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_right_down' //'move_wood_right_down';
            } else {
                this.dir = 'move_right_down';
            }
        } else if (_nextStep.x === startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_down'//'move_wood_down';
            } else {
                this.dir = 'move_down';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_left_down'//'move_wood_left_down';
            } else {
                this.dir = 'move_left_down';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y === startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_left'//'move_wood_left';
            } else {
                this.dir = 'move_left';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_left_up'//'move_wood_left_up';
            } else {
                this.dir = 'move_left_up';
            }
        } else if (_nextStep.x === startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_up'//'move_wood_up';
            } else {
                this.dir = 'move_up';
            }
        } else if (_nextStep.x > startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_right_up'//'move_wood_right_up';
            } else {
                this.dir = 'move_right_up';
            }

        } else if (_nextStep.x > startPos.x && _nextStep.y === startPos.y) {
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