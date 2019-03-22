import Sprite from "../../../lib/Sprite";

class Units extends Sprite {
    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.objectType = 'unit';

        this.currentPosition = null;
        this.nextPosition = null;
        this.speed = 65;

        this.game.VAR.map.addToFog(this.x, this.y, 32);


        // this.game.easystar.setAdditionalPointCost(this.currentTile.row, this.currentTile.column, 500);
    }

    onClick() {
        if (!this.buildingPut.used) {
            this.selectedBorder();
            this.game.VAR.hudLeft.set(this.info);
            this.game.VAR.hudLeft.cancelBox.used = false;
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
            this.game.VAR.sellectedBorder.y = this.y + (this.height - 32)//+ this.height / 2
            this.game.VAR.sellectedBorder.width = 32//this.width;
            this.game.VAR.sellectedBorder.height = 32//this.height;
        }
    }

    draw(dt) {

        // this.context.globalCompositeOperation = 'source-over';

        super.draw(dt);


        // this.context.globalCompositeOperation = 'source-atop';

        // if (this.path) {
        //     this.path.forEach((path) => {
        //         this.context.beginPath();
        //         this.context.strokeStyle = 'red';
        //         this.context.rect((path.x * 32) - this.game.camera.xScroll, (path.y * 32) - this.game.camera.yScroll, 32, 32)
        //         this.context.stroke()
        //         this.context.closePath();
        //     })
        // }
    }


    update(dt) {
        this.animations.play({
            key: this.dir
        })
        super.update(dt);
        this.updateBorder();

    }

    move(_endPos, building, index = 1, callback) {
        let endPos = _endPos;

        if (!endPos) {
            if (!building) {
                return false;
            } else {
                if (building.objectType === 'unit') {
                    endPos = this.game.VAR.map.getTileBySprite(building);
                } else {
                    endPos = this.findShortPathToBuilding(building, index);
                }
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
                        return this.move(_endPos ? endPos : null, building, index, callback);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'town' && this.cargo === 'empty') {
                        this.currentTile.type = 'town';
                        return this.move(_endPos ? endPos : null, building, index, callback);
                    }
                    if (this.nextTile.type === 'gold' && this.cargo === 'gold') {
                        this.nextTile.type = 'gold';
                        return this.move(_endPos ? endPos : null, building, index, callback);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'gold' && this.cargo === 'gold') {
                        this.currentTile.type = 'gold';
                        return this.move(_endPos ? endPos : null, building, index, callback);
                    }

                    this.currentTile.type = 'solid';

                    if (this.nextTile.type === 'solid') {
                        this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
                        this.dir = `idle${this.dir.slice(4)}`;

                        if (newPath.length === 0) {
                            // console.log(endPos.enemy, callback)
                            if (endPos.enemy) {
                                if (callback && typeof callback === 'function') {
                                    return callback();
                                }
                                // this.getAnimationInMove(this.startPos, { x: endPos.row, y: endPos.column });

                            } else {
                                this.currentTile.type = 'solid';
                                this.nextTile = null;
                                this.dir = `idle${this.dir.slice(4)}`;

                                return false;
                            }

                        }
                        return this.move(_endPos ? endPos : null, building, index, callback);
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
                        x: this.nextStep.x * 32, y: this.nextStep.y * 32 - this.height + 32, speed: this.speed, callback: () => {
                            // console.log(this.myCurrentPath)
                            // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
                            this.currentTile.type = 'empty';

                            if (newPath.length > 0) {
                                this.move(_endPos ? endPos : null, building, index, callback);

                            } else {
                                console.log(endPos.enemy)
                                if (endPos.enemy) {
                                    console.log('ccc')
                                    if (callback && typeof callback === 'function') {
                                        return callback();
                                    }
                                    // this.getAnimationInMove(this.startPos, { x: endPos.row, y: endPos.column });

                                } else {
                                    this.nextTile.type = 'solid';

                                    this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 500);
                                    // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 3);
                                    // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 20);
                                    this.dir = `idle${this.dir.slice(4)}`;
                                }

                            }
                        }
                    })
                }
            }
        })
        this.game.easystar.calculate();
    }

    findAttackPath(enemy) {

        if (enemy && enemy.currentHp > 0) {
            // this.game.VAR.sellectedObj.restartPosition();
            const startPos = this.game.VAR.map.getTileBySprite(this);
            const endPos = this.game.VAR.map.getTileBySprite(enemy);// this.game.mapPathfinder.getTileByMouse();

            // console.log(bb)
            this.move(null, enemy, 1, () => {
                this.game.easystar.cancelPath(this.myCurrentPath);
                const lastHeight = this.height;
                console.log(this.height)
                if (this.type === 'worker') {
                    this.image = this.AssetManager.get('chop');
                    this.dir = `chop${this.dir.slice(4)}`;

                   
                    this.width = this.states[this.state].frames[this.current_f].fW;
                    this.height = this.states[this.state].frames[this.current_f].fH;
                }
                this.animations.play({
                    key: this.dir,
                    delay: 2111,
                    callback: () => this.findAttackPath(enemy)
                })
                if (this.height != lastHeight) {
                    this.y = this.y - this.height + 32;
                }

                this.currentTile.type = 'empty';
                this.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
                this.currentTile.type = 'solid';


                // this.animations.play({
                //     key: this.dir,
                //     delay:2111
                // })
            });

        }
        //  else {
        //     const startPos = this.game.mapPathfinder.getTileBySprite(this);
        //     const endPos = this.game.mapPathfinder.getTileByMouse();
        //     if (endPos.row < 0 || endPos.column < 0 || endPos.row > 39 || endPos.column > 39) {
        //         return false
        //     }
        //     this.mapGrid(1);
        //     this.game.easystar.findPath(startPos.row, startPos.column, endPos.row, endPos.column, (newPath) => {
        //         if (newPath === null) {
        //             console.log("Path was not found.");
        //             this.mapGrid(2);
        //         } else {
        //             newPath.reverse();
        //             newPath.pop();
        //             const currentPos = newPath.pop();
        //             this.move(newPath, currentPos);
        //         }
        //     })
        //     this.game.easystar.calculate();
        // }
    }

    moveAndAttack(newPath, startPos, endPos, enemy) {
        if (newPath.length > 2) {

            newPath.shift();
            this.nextStep = newPath.shift();
            // this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 20);

            this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);
            this.currentTile = this.game.VAR.map.getTile(startPos.row, startPos.column);

            this.getAnimationInMove(startPos, this.nextStep);

            this.moveToPoint({
                x: this.nextTile.x, y: this.nextTile.y, speed: 60, callback: () => {
                    this.findAttackPath(enemy);
                }
            })
        } else {
            console.log('stop')
            // this.moveToPointBreak(1);
            // const path = newPath.pop();

            // if (newPath.length === 0) {
            //     console.log('to miejsce')
            //     const posMouse = this.game.mapPathfinder.getTileByMouse();

            //     const pos = this.game.mapPathfinder.getPosition(posMouse.row, posMouse.column);
            //     const currentPos = this.game.mapPathfinder.getPosition(_currentPos.x, _currentPos.y);

            //     this.getAnimationInMove(currentPos, pos);
            //     this.mapGrid(2);
            //     this.dir = `atck${this.dir.slice(4)}`;

            //     if (enemy) {
            //         this.attackedEnemy = enemy;
            //     } else {
            //         this.attackedEnemy = null;
            //     }
            // } else {
            //     const pos = this.game.mapPathfinder.getPosition(path.x, path.y);
            //     const currentPos = this.game.mapPathfinder.getPosition(_currentPos.x, _currentPos.y);

            //     this.getAnimationInMove(currentPos, pos);
            //     this.mapGrid(2);
            //     this.dir = `atck${this.dir.slice(4)}`;

            //     if (enemy) {
            //         this.attackedEnemy = enemy;
            //     } else {
            //         this.attackedEnemy = null;
            //     }
            // }
        }
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
            if (this.nextTile && this.nextTile.type === 'solid' && !this.nextTile.enemy) {
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

        if (this.type === 'worker') {
            this.image = this.AssetManager.get('peasant');
        }
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
        this.animations.play({
            key: this.dir
        })
        this.width = this.states[this.state].frames[this.current_f].fW;
        this.height = this.states[this.state].frames[this.current_f].fH;
    }
}
export default Units;