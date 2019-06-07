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
        this.waitToPathWillBeFree = 1250;
    }

    move(_endPos, callback, follow) {
        this.follow = follow;
        this.moveCallback = callback;
        // 
        this.startPos = this.game.VAR.map.getTileBySprite(this.sprite);
        if (this.follow) {
            this.endPos = this.game.VAR.map.getTileBySprite(follow);
        } else {
            this.endPos = _endPos;
        }
        this.myCurrentPath = this.game.easystar.findPath(this.startPos.row, this.startPos.column, this.endPos.row, this.endPos.column, this.findPathCallbackCache);
        this.game.easystar.calculate();
    }



    findPathCallback(newPath) {
        this.path = newPath;

        if (this.path === null) {
            console.log("Path was not found.");
            this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);
            this.currentTile.type = 'solid';
        } else {
            if (this.path.length > 0) {
                this.path.shift();
                this.nextStep = this.path.shift();
                this.isMoving = true;
                if (!this.nextStep || !this.startPos) {
                    this.startPos = null;
                    this.nextStep = null;
                    this.isMoving = false;
                    return false;
                }
                this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);
                this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);

                if (this.extendsMove && typeof this.extendsMove === 'function') {
                    const bool = this.extendsMove(this.nextTile, this.currentTile, this.nextStep, this.startPos);
                    if (bool === 'stop') {
                        this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
                        this.isMoving = false;
                        return false;
                    } else if (bool === 'restart') {
                        if (this.waitToPathWillBeFree > 0) {
                            this.waitToPathWillBeFree--;
                            this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                            return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                        } else {
                            console.log('nie udało się wyszukać dostepnęj scieżki!');
                            this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                            this.waitToPathWillBeFree = 1;
                            this.startPos = null;
                            this.nextStep = null;
                            this.isMoving = false;
                            return false;
                        }
                    }
                }

                if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                    this.spriteAnimation(this.startPos, this.nextStep);
                }

                if (this.sprite.isAttacking) {
                    this.sprite.isAttacking = false;
                    this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW;
                    this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH;
                    this.sprite.x = this.currentTile.x + this.sprite.width - 32;
                    this.sprite.y = this.currentTile.y - this.sprite.height + 32;
                }



                this.currentTile.type = 'solid';

                if (this.nextTile.type === 'solid') {
                    this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
                    this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                    this.nextTile.type = 'solid';
                    if (this.path.length === 0) {
                        // 
                        this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                        this.sprite.x = this.currentTile.x;
                        this.sprite.y = this.currentTile.y - this.sprite.height + 32;
                        this.sprite.moveToPointBreak(1);

                        this.startPos = null;
                        this.nextStep = null;
                        this.isMoving = false;
                        if (this.moveCallback && typeof this.moveCallback === 'function') {
                            return this.moveCallback(this, this.sprite);
                        } else {
                            return false;
                        }

                    } else {
                        this.startPos = null;
                        this.nextStep = null;
                        this.isMoving = false;
                        if (this.waitToPathWillBeFree > 0) {
                            this.waitToPathWillBeFree--;
                            return this.move(this.endPos ? this.endPos : null, this.moveCallback, this.follow);
                        } else {
                            console.log('nie udało się wyszukać dostepnęj scieżki!');
                            this.waitToPathWillBeFree = 1
                            return false;
                        }
                    }
                } else {
                    this.waitToPathWillBeFree = 1250;
                    this.nextTile.type = 'solid';
                    this.sprite.moveToPoint({
                        x: this.nextStep.x * 32, y: this.nextStep.y * 32 - this.sprite.height + 32, speed: this.sprite.speed, callback: this.moveToPointCallbackCache
                    })
                }
            } else {
                this.isMoving = false;
                return false;
            }
        }
    }

    moveToPointCallback() {
        if (this.sprite.inWooding) {
            this.isMoving = false;
            return false;
        }
        if (this.startPos) {
            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
            this.currentTile.type = 'empty';

            if (this.path && this.path.length > 0) {
                this.move(this.endPos, this.moveCallback, this.follow);
            } else {
                if (this.nextTile && !this.sprite.inWooding) {
                    this.nextTile.type = 'solid';
                }
                this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 500);
                this.startPos = null;
                this.nextStep = null;
                this.isMoving = false;
                // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 3);
                // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 20);
                this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                if (this.moveCallback && typeof this.moveCallback === 'function') {
                    return this.moveCallback(this, this.sprite);
                }
            }
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