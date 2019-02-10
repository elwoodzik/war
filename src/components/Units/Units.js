import Sprite from "../../../lib/Sprite";

class Units extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.objectType = 'unit';

        this.currentPosition = null;
        this.nextPosition = null;
        this.speed = 65
    }

    onClick() {
        if (!this.game.VAR.buildingPut.used) {
            this.selectedBorder();
            this.game.VAR.hudLeft.set(this.info);
            this.game.VAR.hudLeft.creationBox.show();
            this.getRandomSelectedSound();
        }
    }


    getRandomSelectedSound() {
        if (this.sounds && this.sounds.selected && this.sounds.selected.length > 0) {
            const rand = this.game.rand(0, this.sounds.selected.length - 1);
            this.AssetManager.play(this.sounds.selected[rand]);
        }
    }

    getRandomMoveSound() {
        if (this.sounds && this.sounds.move && this.sounds.move.length > 0) {
            const rand = this.game.rand(0, this.sounds.move.length - 1);
            this.AssetManager.play(this.sounds.move[rand]);
        }
    }

    selectedBorder() {
        if (this.isRender) {
            this.game.VAR.sellectedObj = this;
            this.game.VAR.sellectedBorder.show();
        }

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
            // this.game.VAR.sellectedBorder.y = this.y + 8//+ this.height / 2
            this.game.VAR.sellectedBorder.y = this.y + (this.height - 30)//+ this.height / 2
            this.game.VAR.sellectedBorder.width = 32//this.width;
            this.game.VAR.sellectedBorder.height = 32//this.height;
        }
    }

    // draw(dt) {
    //     super.draw(dt);

    //     if (this.path) {
    //         this.path.forEach((path) => {
    //             this.context.beginPath();
    //             this.context.strokeStyle = 'red';
    //             this.context.rect((path.x * 32) - this.game.camera.xScroll, (path.y * 32) - this.game.camera.yScroll, 32, 32)
    //             this.context.stroke()
    //             this.context.closePath();
    //         })
    //     }
    // }


    update(dt) {
        this.animations.play({
            key: this.dir
        })
        super.update(dt);
        this.updateBorder();

    }

    move(_endPos, building, index = 1) {
        let endPos = _endPos;
        if (!endPos) {
            if (!building) {
                return false;
            } else {
                endPos = this.findShortPathToBuilding(building, index);
            }
        }
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

                    this.getAnimationInMove(this.startPos, this.nextStep);

                    if (this.nextTile.type === 'town' && this.cargo === 'empty') {
                        this.nextTile.type = 'town';
                        return this.move(endPos);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'town' && this.cargo === 'empty') {
                        this.currentTile.type = 'town';
                        return this.move(endPos);
                    }
                    if (this.nextTile.type === 'gold' && this.cargo === 'gold') {
                        this.nextTile.type = 'gold';
                        return this.move(endPos);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'gold' && this.cargo === 'gold') {
                        this.currentTile.type = 'gold';
                        return this.move(endPos);
                    }

                    this.currentTile.type = 'solid';

                    if (this.nextTile.type === 'solid') {
                        this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
                        this.dir = `idle${this.dir.slice(4)}`;
                        if (newPath.length === 0) {
                            this.currentTile.type = 'solid';
                            this.nextTile = null;
                            this.dir = `idle${this.dir.slice(4)}`;

                            return false;
                        }
                        return this.move(endPos);
                    }


                    if (this.extendsMove && typeof this.extendsMove === 'function') {
                        const bool = this.extendsMove(this.nextTile, this.nextStep, this.startPos);
                        if (bool) {
                            return false;
                        }
                    }

                    // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 20);
                    this.nextTile.type = 'solid';
                    // this.currentPosition = this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    // this.nextPosition = { x: this.nextStep.x * 32, y: this.nextStep.y * 32 } //this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 3);
                    // console.log(this.startPos)


                    this.moveToPoint({
                        x: this.nextStep.x * 32, y: this.nextStep.y * 32, speed: this.speed, callback: () => {
                            // console.log(this.myCurrentPath)
                            // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
                            this.currentTile.type = 'empty';

                            if (newPath.length > 0) {
                                this.move(_endPos ? endPos : null, building, index);
                            } else {

                                this.nextTile.type = 'solid';
                                this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 500);
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
            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
            if (this.currentTile && this.currentTile.type === 'solid') {
                this.currentTile.type = 'empty';
            }
        }
        if (this.nextStep && !this.inBuilding) {
            // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 1);
            this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 1);
            if (this.nextTile && this.nextTile.type === 'solid') {
                this.nextTile.type = 'empty';
            }
        }
    }

    findShortPathToBuilding(building, index = 1) {
        let endPos = this.game.VAR.map.getTileBySprite(building);
        const currentPos = this.game.VAR.map.getTileBySprite(this);
        if (endPos.column === currentPos.column) {
            endPos = { ...endPos, column: endPos.column }
        } else if (endPos.column > currentPos.column) {
            endPos = { ...endPos, column: endPos.column - index }
        } else if (endPos.column < currentPos.column) {
            endPos = { ...endPos, column: endPos.column + 1 }
        }

        if (endPos.row === currentPos.row) {
            endPos = { ...endPos, row: endPos.row }
        } else if (endPos.row > currentPos.row) {
            endPos = { ...endPos, row: endPos.row - index }
        } else if (endPos.row < currentPos.row) {
            endPos = { ...endPos, row: endPos.row + 1 }
        }
        return endPos;
    }

    getAnimationInMove(startPos, nextStep) {
        const _nextStep = { x: nextStep.x * 32, y: nextStep.y * 32 };
        // console.log(this.key, this.inWooding)
        // if (this.key === 'chop') {
        this.image = this.AssetManager.get('peasant');
        // }
        // this.image = this.AssetManager.get('chop')

        if (_nextStep.x > startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_right_down';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_right_down';
            } else {
                this.dir = 'move_right_down';
            }
        } else if (_nextStep.x === startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_down';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_down';
            } else {
                this.dir = 'move_down';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_left_down';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_left_down';
            } else {
                this.dir = 'move_left_down';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y === startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_left';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_left';
            } else {
                this.dir = 'move_left';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_left_up';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_left_up';
            } else {
                this.dir = 'move_left_up';
            }
        } else if (_nextStep.x === startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_up';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_up';
            } else {
                this.dir = 'move_up';
            }
        } else if (_nextStep.x > startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_right_up';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_right_up';
            } else {
                this.dir = 'move_right_up';
            }
        } else if (_nextStep.x > startPos.x && _nextStep.y === startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_right';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_right';
            } else {
                this.dir = 'move_right';
            }
        }
    }
}
export default Units;