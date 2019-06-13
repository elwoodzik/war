import AssetManager from "./AssetManager";

class PathMove {

    constructor(game, options) {

        if (!options || !options.sprite) {
            throw "Przy tworzeniu tego obiektu wymagane jest podanie klucza 'sprite' z obiektem sprite";
        }
        this.sprite = options.sprite;
        this.spriteAnimation = options.spriteAnimation.bind(this.sprite) || null;
        this.extendsMove = options.extendsMove.bind(this.sprite) || null;
        this.game = game;
        this.findPathCallbackCache = this.findPathCallback.bind(this);
        this.moveToPointCallbackCache = this.moveToPointCallback.bind(this);
        this.waitToPathWillBeFree = 350;
    }

    move(_endPos, callback, follow) {
        // 
        if (!this.sprite.isMoving) {
            this.follow = follow;
            this.moveCallback = callback;
            this.currentTile = this.game.VAR.map.getTileBySprite(this.sprite);
            // console.log(this.follow)
            if (this.follow) {
                this.endPos = this.game.VAR.map.getTileBySprite(this.follow);
            } else {
                this.endPos = _endPos;
            }

            this.myCurrentPath = this.game.easystar.findPath(this.currentTile.row, this.currentTile.column, this.endPos.row, this.endPos.column, this.findPathCallbackCache);
            this.game.easystar.calculate();
        } else {
            this.path = null;
            this.follow = follow;
            this.moveCallback = callback;
            this.changeEndPos = _endPos;
        }
    }


    findPathCallback(newPath) {
        this.path = newPath;
        if (this.path === null) {
            console.log("Path was not found.");
            return false;
        }
        if (this.path.length > 0) {
            this.path.shift();
            this.nextStep = this.path.shift();
            this.sprite.isMoving = true;
            this.sprite.isAttacking = false
            this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);

            if (this.extendsMove && typeof this.extendsMove === 'function') {
                const bool = this.extendsMove(this.nextTile, this.currentTile, this.nextStep, this.currentTile);
                if (bool === 'stop') {
                    this.sprite.isMoving = false;
                    return false;
                }
                else if (bool === 'restart') {
                    if (this.waitToPathWillBeFree > 0) {
                        this.waitToPathWillBeFree--;
                        this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                        this.sprite.isMoving = false;
                        return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                    } else {
                        console.log('nie udało się wyszukać dostepnęj scieżki!');
                        this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                        this.waitToPathWillBeFree = 1;
                        this.sprite.isMoving = false;
                        return false;
                    }
                }
            }

            if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                this.spriteAnimation(this.currentTile, this.nextStep);
            }

            if (this.nextTile.type === 'solid') {
                this.sprite.isMoving = false;
                // if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                //     this.spriteAnimation(this.currentTile, this.nextStep);
                // }

                if (this.path.length > 0) {
                    if (this.waitToPathWillBeFree > 0) {
                        this.waitToPathWillBeFree--;
                        return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                    } else {
                        console.log('nie udało się wyszukać dostepnęj scieżki!')
                        this.waitToPathWillBeFree = 1
                        return false;
                    }
                } else {
                    if (this.waitToPathWillBeFree > 0) {
                        this.waitToPathWillBeFree--;

                        if (this.moveCallback && typeof this.moveCallback === 'function') {
                            return this.moveCallback(this, this.sprite);
                        } else {
                            return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                        }
                    } else {
                        console.log('nie udało się wyszukać dostepnęj scieżki!');
                        this.waitToPathWillBeFree = 1;
                        this.attackTarget = false;
                        return false;
                    }
                }


                // if (this.moveCallback && typeof this.moveCallback === 'function') {
                //     console.log('callback')
                //     return this.moveCallback(this, this.sprite);
                // } else {
                //     console.log('ruch')
                //     return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                // }

                // this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                // if (this.path.length > 0) {
                //     if (this.waitToPathWillBeFree > 0) {
                //         this.waitToPathWillBeFree--;
                //         this.sprite.isMoving = false;
                //         return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                //     } else {
                //         console.log('nie udało się wyszukać dostepnęj scieżki!');
                //         this.sprite.isMoving = false;
                //         this.waitToPathWillBeFree = 1
                //         return false;
                //     }
                // } else {
                //     if (this.waitToPathWillBeFree > 0) {
                //         this.waitToPathWillBeFree--;
                //         this.sprite.isMoving = false;
                //         if (this.moveCallback && typeof this.moveCallback === 'function') {
                //             console.log('callback')
                //             return this.moveCallback(this, this.sprite);
                //         } else {
                //             console.log('ruch')
                //             return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                //         }
                //     } else {
                //         console.log('nie udało się wyszukać dostepnęj scieżki!');
                //         this.sprite.isMoving = false;
                //         this.waitToPathWillBeFree = 1
                //         return false;
                //     }
                //     // this.sprite.isMoving = false;
                //     // if (this.moveCallback && typeof this.moveCallback === 'function') {
                //     //     return this.moveCallback(this, this.sprite);
                //     // } else {
                //     //     return false;
                //     // }
                // }
            }

            this.nextTile.type = 'solid';
            this.game.easystar.setAdditionalPointCost(this.nextTile.row, this.nextTile.column, 200);
            this.waitToPathWillBeFree = 350;
            this.sprite.moveToPoint({
                x: this.nextTile.x, y: this.nextTile.y - this.sprite.height + 32, speed: this.sprite.speed, callback: this.moveToPointCallbackCache
            })
        } else {
            console.log('o tutaj to zachodzi')
            this.sprite.attackTarget = false
        }
    }

    // findPathCallback(newPath) {
    //     this.path = newPath;

    //     if (this.path === null) {
    //         console.log("Path was not found.");
    //         this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);
    //         this.currentTile.type = 'solid';
    //         // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
    //     } else {
    //         if (this.path.length > 0) {
    //             this.path.shift();
    //             this.nextStep = this.path.shift();
    //             this.sprite.isMoving = true;
    //             if (!this.nextStep || !this.startPos) {
    //                 this.startPos = null;
    //                 this.nextStep = null;
    //                 this.sprite.isMoving = false;
    //                 return false;
    //             }
    //             this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);
    //             this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);

    //             console.log(this.startPos.type, this.currentTile.type)
    //             if (this.extendsMove && typeof this.extendsMove === 'function') {
    //                 const bool = this.extendsMove(this.nextTile, this.currentTile, this.nextStep, this.startPos);
    //                 if (bool === 'stop') {
    //                     this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
    //                     this.sprite.isMoving = false;
    //                     return false;
    //                 } else if (bool === 'restart') {
    //                     if (this.waitToPathWillBeFree > 0) {
    //                         this.waitToPathWillBeFree--;
    //                         this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
    //                         return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
    //                     } else {
    //                         console.log('nie udało się wyszukać dostepnęj scieżki!');
    //                         this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
    //                         this.waitToPathWillBeFree = 1;
    //                         this.startPos = null;
    //                         this.nextStep = null;
    //                         this.sprite.isMoving = false;
    //                         return false;
    //                     }
    //                 }
    //             }

    //             if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
    //                 this.spriteAnimation(this.startPos, this.nextStep);
    //             }

    //             if (this.sprite.isAttacking) {
    //                 this.sprite.isAttacking = false;
    //                 // this.sprite.moveToPointBreak(1);
    //                 this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 500);
    //                 this.startPos = null;
    //                 this.nextStep = null;


    //                 this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW;
    //                 this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH;
    //                 this.sprite.x = this.currentTile.x + this.sprite.width - 32;
    //                 this.sprite.y = this.currentTile.y - this.sprite.height + 32;
    //                 this.sprite.isMoving = false;
    //                 if (this.moveCallback && typeof this.moveCallback === 'function') {
    //                     return this.moveCallback(this, this.sprite);
    //                 } else {
    //                     return false;
    //                 }
    //             }

    //             this.currentTile.type = 'solid';

    //             // if (this.nextTile.type === 'solid') {
    //             // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);

    //             // this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
    //             // this.nextTile.type = 'solid';

    //             // s
    //             //     // this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
    //             //     this.game.easystar.setAdditionalPointCost(this.currentTile.x, this.currentTile.y, 500);
    //             //     this.sprite.x = this.currentTile.x;
    //             //     this.sprite.y = this.currentTile.y - this.sprite.height + 32;
    //             //     // this.sprite.moveToPointBreak(1);

    //             //     // this.startPos = null;
    //             //     // this.nextStep = null;
    //             //     this.sprite.isMoving = false;
    //             //     if (this.moveCallback && typeof this.moveCallback === 'function') {
    //             //         return this.moveCallback(this, this.sprite);
    //             //     } else {
    //             //         return false;
    //             //     }
    //             // } else {
    //             //     this.startPos = null;
    //             //     this.nextStep = null;
    //             //     this.sprite.isMoving = false;
    //             //     if (this.waitToPathWillBeFree > 0) {
    //             //         this.waitToPathWillBeFree--;

    //             //         return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
    //             //     } else {
    //             //         console.log('nie udało się wyszukać dostepnęj scieżki!');
    //             //         this.waitToPathWillBeFree = 1
    //             //         return false;
    //             //     }
    //             // }
    //             // } else {
    //             this.waitToPathWillBeFree = 350;
    //             this.nextTile.type = 'solid';
    //             this.sprite.moveToPoint({
    //                 x: this.nextStep.x * 32, y: this.nextStep.y * 32 - this.sprite.height + 32, speed: this.sprite.speed, callback: this.moveToPointCallbackCache
    //             })
    //             // }
    //         } else {
    //             console.log('tutaj')
    //             // this.sprite.moveToPointBreak(1);
    //             this.currentTile.type = 'solid';
    //             this.startPos = null;
    //             this.nextStep = null;
    //             this.sprite.isMoving = false;
    //             this.sprite.attackTarget = false
    //             return false;
    //         }
    //     }
    // }

    moveToPointCallback() {
        if (this.sprite.inWooding) {
            this.sprite.isMoving = false;
            return false;
        }

        if (this.currentTile) {
            this.game.easystar.setAdditionalPointCost(this.currentTile.row, this.currentTile.column, 0);
            this.currentTile.type = 'empty';

            if (this.path === null) {
                this.sprite.isMoving = false;
                this.move(this.changeEndPos, this.moveCallback, this.follow);
                return;
            }

            if (this.path && this.path.length > 0) {
                this.sprite.isMoving = false;
                // this.sprite.attackTarget = false
                this.move(this.endPos, this.moveCallback, this.follow);
            } else {
                if (this.nextTile && !this.sprite.inWooding) {
                    this.nextTile.type = 'solid';
                }
                if (this.nextStep) {
                    this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 300);
                }

                this.sprite.isMoving = false;
                this.sprite.attackTarget = false
                if (this.sprite.objID === 51) {
                    console.log('tutaj')
                }
                if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                    this.spriteAnimation(this.currentTile, this.nextStep);
                }
                // this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                if (this.moveCallback && typeof this.moveCallback === 'function') {
                    return this.moveCallback(this, this.sprite);
                }
            }
        }
    }

    followEnemy = (enemy) => {
        this.sprite.attackTarget = true;

        this.move(null, (path, player) => {
            player.isAttacking = false

            if (enemy.isMoving) {
                this.followEnemy(enemy);
            } else {
                player.isAttacking = true;
                if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                    this.spriteAnimation(this.currentTile, this.nextStep, this.onHitEnemy.bind(this, enemy));
                }

                player.animations.play({
                    key: player.dir,
                    callback: this.onHitEnemy.bind(this, enemy)
                })
                // this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW;
                // this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH;
                // this.sprite.y = this.sprite.pathMove.currentTile.y - this.sprite.height + 32;
                // this.currentTile.type = 'empty';
                // this.currentTile = this.game.VAR.map.getTileByCords(this.sprite.x, this.sprite.y + this.sprite.height - 32);
                // this.currentTile.type = 'solid';
            }
        }, enemy);
    }


    onHitEnemy(enemy) {
        const dmg = this.game.rand(this.sprite.dmg[0], this.sprite.dmg[1]);
        enemy.currentHp -= dmg - enemy.armor;
        console.log('wale')
        if (enemy.currentHp <= 0) {
            enemy.used = false;
            this.sprite.isAttacking = false;
            this.sprite.isMoving = false;
            if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                this.spriteAnimation(this.currentTile, this.nextStep);
            }
            // this.sprite.current_f = 0;
            // if (this.sprite.type === 'worker') {
            //     this.sprite.image = AssetManager.get('peasant');
            // }
            // this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;

            // this.sprite.animations.play({
            //     key: this.sprite.dir,
            // })

            this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW;
            this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH;
            this.sprite.y = this.currentTile.y - this.sprite.height + 32;
            this.currentTile = this.game.VAR.map.getTileByCords(this.sprite.x, this.sprite.y + this.sprite.height - 32);

            if (enemy.pathMove.nextTile) {
                enemy.pathMove.nextTile.type = 'empty';
                this.game.easystar.setAdditionalPointCost(enemy.pathMove.nextTile.row, enemy.pathMove.nextTile.column, 0);
            }
            enemy.pathMove.currentTile.type = 'empty';
            this.currentTile.type = 'solid';
            this.game.easystar.setAdditionalPointCost(enemy.pathMove.currentTile.row, enemy.pathMove.currentTile.column, 0);

            enemy.unSelectedBorder();
            this.sprite.attackTarget = null;
        } else {
            this.followEnemy(enemy);
        }
    }

    restartPosition() {
        // if (this.startPos) {
        //     // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
        //     this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
        //     if (this.currentTile && this.currentTile.type === 'solid') {
        //         this.currentTile.type = 'empty';
        //     }
        // }
        // if (this.nextStep && !this.inBuilding) {
        //     // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 1);
        //     this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 1);
        //     if (this.nextTile && this.nextTile.type === 'solid' && !this.nextTile.enemy) {
        //         this.nextTile.type = 'empty';
        //     }
        // }
    }

    findShortPathToBuilding(building, index = 1) {
        let endPos = this.game.VAR.map.getTileBySprite(building);
        const currentPos = this.game.VAR.map.getTileBySprite(this.sprite);
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

};

export default PathMove;