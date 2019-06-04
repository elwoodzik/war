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
        this.waitToPathWillBeFree = 250;
    }

    move(_endPos, callback) {
        this.endPos = _endPos;
        this.moveCallback = callback;
        // 
        this.startPos = this.game.VAR.map.getTileBySprite(this.sprite);

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
                this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);
                this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);

                if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
                    this.spriteAnimation(this.startPos, this.nextStep);
                }

                if (this.extendsMove && typeof this.extendsMove === 'function') {
                    const bool = this.extendsMove(this.nextTile, this.currentTile, this.nextStep, this.startPos);
                    if (bool === 'stop') {
                        return false;
                    } else if (bool === 'restart') {
                        if (this.waitToPathWillBeFree > 0) {
                            this.waitToPathWillBeFree--;
                            this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                            return this.move(this.endPos ? this.endPos : null, this.moveCallback);
                        } else {
                            console.log('nie udało się wyszukac dostepnej sciezki!');
                            this.sprite.dir = `idle${this.sprite.dir.slice(4)}`;
                            this.waitToPathWillBeFree = 1;
                            this.startPos = null;
                            this.nextStep = null;
                            return false;
                        }
                    }
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
                        this.sprite.y = this.currentTile.y;
                        this.sprite.moveToPointBreak(1);

                        this.startPos = null;
                        this.nextStep = null;
                        return this.moveCallback(this, this.sprite);
                    } else {
                        this.startPos = null;
                        this.nextStep = null;
                        if (this.waitToPathWillBeFree > 0) {
                            this.waitToPathWillBeFree--;
                            return this.move(this.endPos ? this.endPos : null, this.moveCallback);
                        } else {
                            console.log('nie udało się wyszukac dostepnej sciezki!');
                            this.waitToPathWillBeFree = 1
                            return false;
                        }
                    }
                } else {
                    this.waitToPathWillBeFree = 250;
                    this.nextTile.type = 'solid';
                    this.sprite.moveToPoint({
                        x: this.nextStep.x * 32, y: this.nextStep.y * 32 - this.sprite.height + 32, speed: this.sprite.speed, callback: this.moveToPointCallbackCache
                    })
                }
            } else {
                return false;
            }
        }
    }

    moveToPointCallback() {
        if (this.startPos) {
            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
            this.currentTile.type = 'empty';

            if (this.path.length > 0) {
                this.move(this.endPos, this.moveCallback);
            } else {
                if (this.nextTile) {
                    this.nextTile.type = 'solid';
                }
                this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 500);
                this.startPos = null;
                this.nextStep = null;
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