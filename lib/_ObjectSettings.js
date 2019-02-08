import AssetManager from './AssetManager';

class _ObjectSettings {

    static ID = 0;


    constructor(game, options) {


        if (!game) {
            throw ('oczekiwano obiektu game jako pierwszy parametr!')
        }
        if (!options) {
            throw ('oczekiwano obiektu jako parametr do: ' + this.constructor.name)
        }

        this.objID = _ObjectSettings.ID++;

        this.AssetManager = AssetManager;

        this.game = game;

        //this.pooled = options.pooled; 

        this.contextType = options.context || 'main';

        this.x = options.x === undefined ? 100 : options.x;

        this.y = options.y === undefined ? 100 : options.y;

        this.startX = options.x === undefined ? 100 : options.x;

        this.startY = options.y === undefined ? 100 : options.y;

        this.key = options.key || false;

        this.isOutOfScreen = options.isOutOfScreen || false;

        this.isRender = options.isRender === undefined ? true : false;

        this.updateOfScreen = (options.updateOfScreen === undefined || options.updateOfScreen === true) ? true : false;

        this.used = options.used || options.used === undefined ? true : false;
        
        this.useCollision = (options.useCollision === undefined || options.useCollision === true) ? true : false;

        this.static = options.static || false;

        this.scale = options.scale || 1;

        this.zIndex = options.zIndex || 3;

        this.objAlfa = options.objAlfa || 1;

        this.timeLocal = 0;

        this.hovered = false;

        this.touchActive = false;

        this.playerControlled = true;

        if (this.key) {
            this.image = this.AssetManager.get(this.key) || this.key;
        }

        this.width = options.width || (this.image ? this.image.width : 150);
        this.height = options.height || (this.image ? this.image.height : 150);

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;

        this.setContext(this.contextType);
    }

    optionsAssign(options, me) {
        Object.keys(options).forEach((key) => {
            if (typeof options[key] === 'object') {
                this.optionsAssign(options[key], me[key]);
            } else {
                if (key) {
                    me[key] = options[key];
                }
            }
        })
    }

    changeContext(context, array) {
        if (this.contextType != context) {
            this.destroy(array);
            this.setContext(context);
        }
        return this;
    }

    getCenter() {
        return {
            x: this.x + this.halfWidth,
            y: this.y + this.halfHeight
        }
    }

    setContext(context) {
        if (context) {
            if (context === 'main') {
                this.context = this.game.ctx;
                this.contextType = context;
                const gameObjectLength = this.game.gameObjects.length;
                this.game.gameObjects[gameObjectLength] = this;
            } else if (context === 'background') {
                this.context = this.game.bgctx;
                this.contextType = context;
                const gameObjectStaticLength = this.game.gameObjectsStatic.length;
                this.game.gameObjectsStatic[gameObjectStaticLength] = this;
                //this.redraw(); 
            }
            else if (context === 'onbackground') {
                this.context = this.game.onbgctx;
                this.contextType = context;
                const gameObjectOnStaticLength = this.game.gameObjectsOnStatic.length;
                this.game.gameObjectsOnStatic[gameObjectOnStaticLength] = this;
                //this.redraw();
            } else {
                return console.error("Niepoprawna nazwa Contextu. Dostępne nazwy to: \n1. background \n2. onbackground \n3. main")
            }
        }
    }

    setIndex(index) {
        this.zIndex = index;
        return this;
        // this.game.gameObjects.sort((obj1, obj2) => {
        //     if (obj1.zIndex > obj2.zIndex)
        //         return 1;
        //     else if (obj1.zIndex < obj2.zIndex) {
        //         return -1;
        //     } else {
        //         return 0;
        //     }
        // });
    }

    destroy(array) {
        if (Array.isArray(array)) {
            array.splice(array.indexOf(this), 1);
        }
        this.x = -500;
        this.y = -500;
        return this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
    }

    kill(array) {
        if (Array.isArray(array)) {
            array.splice(array.indexOf(this), 1);
        }
    }

    doInTime(time, callback) {
        this.timeLocal = 0;
        this.timeMax = time;
        this.timeCallback = callback;
        this.inTime = true;
    }

    doInTimeHandler() {
        if (this.inTime) {
            this.timeLocal += 1 / 60 * 1000;

            if (this.timeLocal > this.timeMax) {
                this.timeLocal = 0;
                this.inTime = false;
                return this.timeCallback.call(this, this);
            }
        }
    }

    doInTimeStop() {
        this.inTime = false;
    }

    fadeOut(time, callback) {
        this.timerFade = time;
        this.currentTimerFade = time;
        this.timerFadeMin = 0;
        this.timerCallback = callback;
        this.timerFadeInActive = false;
        this.timerFadeOutActive = true;
    }

    fadeIn(time, callback) {
        this.timerFade = time;
        this.currentTimerFade = 0;
        this.timerFadeMin = 0;
        this.timerCallback = callback;
        this.timerFadeOutActive = false;
        this.timerFadeInActive = true;
    }

    fadeOutHandler() {
        if (this.timerFadeOutActive) {

            this.currentTimerFade -= 1 / 60 * 1000;
            this.objAlfa = this.currentTimerFade / this.timerFade;

            if (this.currentTimerFade <= 0) {
                this.objAlfa = 0;
                this.timerFadeOutActive = false;
                if (typeof this.timerCallback === 'function') {
                    return this.timerCallback.call();
                }
            }
        }
    }

    fadeInHandler() {
        if (this.timerFadeInActive && this.objAlfa !== 1) {

            this.currentTimerFade += 1 / 60 * 1000;
            this.objAlfa = this.currentTimerFade / this.timerFade;

            if (this.currentTimerFade >= this.timerFade) {
                this.timerFadeInActive = false;
                this.objAlfa = 1;

                if (typeof this.timerCallback === 'function') {
                    return this.timerCallback.call();
                }
            }
        } else {
            this.timerFadeInActive = false;
        }
    }

    thereAndBack(options) {
        if (!options.distance || !options.direction || !options.speed) {
            throw "Wymagany obiekt jako argument z wlasciowsciami \n distance: INT \n direction: String ('left, right, up, down') \n speed: INT"
        }
        if (options.direction !== 'left' && options.direction !== 'right' && options.direction !== 'down' && options.direction !== 'up') {
            throw "Wybrano niedostepny kierunek! dostepne direction: ('left, right, up, down') "
        }
        this.thereAndBack_startX = this.x;
        this.thereAndBack_startY = this.y;
        if (options.direction === 'right' || options.direction === 'left') {
            this.thereAndBack_dis = options.direction === 'right' ? this.x + options.distance : this.x - options.distance;
        } else {
            this.thereAndBack_dis = options.direction === 'down' ? this.y + options.distance : this.y - options.distance;
        }

        this.thereAndBack_dir = options.direction;
        this.thereAndBack_speed = options.speed;
        this.thereAndBack_site = true;
        this.thereAndBackUsed = true;
        return this;
    }

    useThereAndBack() {
        if (this.thereAndBackUsed) {
            if (this.thereAndBack_dir === 'right') {
                if (this.x < this.thereAndBack_dis && this.thereAndBack_site) {
                    this.body.velocity.x = this.thereAndBack_speed;
                } else if (this.x > this.thereAndBack_startX) {
                    this.thereAndBack_site = false;
                    this.body.velocity.x = -this.thereAndBack_speed;
                } else {
                    this.thereAndBack_site = true;
                    this.body.velocity.x = this.body.velocity.x * (-1);
                }
            } else if (this.thereAndBack_dir === 'left') {
                if (this.x > this.thereAndBack_dis && this.thereAndBack_site) {
                    this.body.velocity.x = -this.thereAndBack_speed;
                } else if (this.x < this.thereAndBack_startX) {
                    this.thereAndBack_site = false;
                    this.body.velocity.x = this.thereAndBack_speed;
                } else {
                    this.thereAndBack_site = true;
                    this.body.velocity.x = this.body.velocity.x * (-1);
                }
            }
            else if (this.thereAndBack_dir === 'up') {
                if (this.y > this.thereAndBack_dis && this.thereAndBack_site) {
                    this.body.velocity.y = -this.thereAndBack_speed;
                } else if (this.y < this.thereAndBack_startY) {
                    this.thereAndBack_site = false;
                    this.body.velocity.y = this.thereAndBack_speed;
                } else {
                    this.thereAndBack_site = true;
                    this.body.velocity.y = this.body.velocity.y * (-1);
                }
            }
            else if (this.thereAndBack_dir === 'down') {
                if (this.y < this.thereAndBack_dis && this.thereAndBack_site) {
                    this.body.velocity.y = this.thereAndBack_speed;
                } else if (this.y > this.thereAndBack_startY) {
                    this.thereAndBack_site = false;
                    this.body.velocity.y = -this.thereAndBack_speed;
                } else {
                    this.thereAndBack_site = true;
                    this.body.velocity.y = this.body.velocity.y * (-1);
                }
            }
        } else {
            return false;
        }
    }

    moveToPoint(options) {
        if (!options) {
            throw "Wymagany obiekt jako argument! \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) \n anchor: boolean (opcjonalnie) \n rotation: boolean (opcjonalnie) tilt: INT (opcjonalnie)";
        }
        if (!options.x && !options.y && !options.speed) {
            throw "Niepoprawne parametry! \n Wymagane: \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) \n anchor: boolean (opcjonalnie) \n rotation: boolean (opcjonalnie) tilt: INT (opcjonalnie)";
        }

        this.positionToMoveX = Math.floor(options.x);
        this.positionToMoveY = Math.floor(options.y);
        this.positionSpeed = options.speed;
        this.positionRotation = options.rotation || false;
        this.positionAnchor = options.anchor || false;
        this.positionTilt = options.tilt || 0;
        this.oldVelocityX = this.body.velocity.x;
        this.oldVelocityY = this.body.velocity.y;
        this.oldUseCollision = this.useCollision;
        this.useCollision = options.collision || true;
        this.moveTo = true;
        this.positionCallback = options.callback;
    }

    moveToPointHandler() {
        if (this.moveTo) {
            const dx = Math.floor(this.positionToMoveX - this.x - (this.positionAnchor ? this.halfWidth : 0));
            const dy = Math.floor(this.positionToMoveY - this.y - (this.positionAnchor ? this.halfHeight : 0));

            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 2) {
                if (this.positionRotation) {
                    const tilt = this.positionTilt * Math.PI / 180;
                    this.body.angle = Math.atan2(dy, dx) - tilt;
                }
                this.body.velocity.x = (dx / distance * this.positionSpeed);
                this.body.velocity.y = (dy / distance * this.positionSpeed);
            } else {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.x = this.positionToMoveX;
                this.y = this.positionToMoveY;
                this.useCollision = this.oldUseCollision;
                this.moveTo = false;
                if (typeof this.positionCallback === 'function') {
                    this.positionCallback.call(this.game, this);
                }
            }
        }
    }

    moveToPointBreak(time = 50) {
        if (this.moveTo) {
            setTimeout(() => {
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                this.useCollision = this.oldUseCollision;
                this.moveTo = false;
            }, time)
        }
    }

    moveToPointEasing(options) {
        if (!options) {
            throw "Wymagany obiekt jako argument! \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) "
        }
        if (!options.x && !options.y && !options.speed) {
            throw "Niepoprawne parametry! \n Wymagane: \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) ";
        }

        this.positionEasingToMoveX = Math.floor(options.x);
        this.positionEasingToMoveY = Math.floor(options.y);
        this.positionEasingSpeed = options.speed;
        this.oldVelocityX = this.body.velocity.x;
        this.oldVelocityY = this.body.velocity.y;
        this.oldUseCollision = this.useCollision;
        this.useCollision = false;
        this.moveToEasing = true;

        this.positionEasingCallback = options.callback;
    }

    moveToPointEasingHandler() {
        if (this.moveToEasing) {
            this.myX = Math.floor(this.x);
            this.myY = Math.floor(this.y);

            if (this.moveToEasing && (this.myX != this.positionEasingToMoveX && this.myY != this.positionEasingToMoveY)) {
                this.x -= ((this.myX - this.positionEasingToMoveX) / this.positionEasingSpeed);
                this.y -= ((this.myY - this.positionEasingToMoveY) / this.positionEasingSpeed);
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
            } else if (this.moveToEasing) {
                this.body.velocity.x = this.oldVelocityX;
                this.body.velocity.y = this.oldVelocityY;
                this.useCollision = this.oldUseCollision;
                this.x = Math.floor(this.x);
                this.y = Math.floor(this.y);
                this.moveToEasing = false;
                if (typeof this.positionEasingCallback === 'function') {
                    this.positionEasingCallback.call(this.game, this);
                }
            }
        }
    }

    topShooter(blockWidth, callback) {
        //if(this.game.keyboard.use['W'].pressed){
        if (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0) {
            this.column = Math.round(((this.x) / blockWidth));
            this.row = Math.round(((this.y) / blockWidth));

            this.next_columnRight = Math.round(((this.x + blockWidth) / blockWidth));
            this.next_columnLeft = Math.round(((this.x - blockWidth) / blockWidth));

            this.next_rowBottom = Math.floor(((this.y + this.height) / blockWidth));
            this.next_rowTop = Math.floor(((this.y) / blockWidth));
            //
            if (this.game.map.b[this.next_rowBottom][this.column].type != 'empty') {
                this.y = this.row * blockWidth
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                return callback('bottom');
            }
            if (this.game.map.b[this.next_rowTop][this.column].type != 'empty') {
                this.y = this.row * blockWidth
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                return callback('top');
            }
            if (this.game.map.b[this.row][this.next_columnRight].type != 'empty') {
                this.x = this.column * blockWidth;
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                return callback('');
            }
            if (this.game.map.b[this.row][this.next_columnLeft].type != 'empty') {
                this.x = this.column * blockWidth;
                this.body.velocity.x = 0;
                this.body.velocity.y = 0;
                return callback('');
            }
        }
        return false;
        // }
    }


    setClone(x, y, w, h) {
        this.clone = this.game.ctx.getImageData(x, y, w, h);
    }

    hide() {
        // this.renderX = 0;
        // this.renderY = 0;
        // this.previousX = 0;
        // this.previousY = 0;
        // this.x = 0;
        // this.y = 0;
        this.used = false;
        this.once = false;

        return this;
    }

    show() {
        this.used = true;

        return this;
    }

    toggle() {
        this.used = !this.used
    }

    getProps(superProps) {
        const props = {};

        for (let key in this) {
            if (key !== 'game' && key !== 'AssetManager' && key !== 'body' && key !== 'context'
                && key !== 'startX' && key !== 'startY' && key !== 'contextType' && key !== 'timeLocal'
                && key !== 'halfHeight' && key !== 'halfWidth' && key !== 'hovered' && key !== 'isOutOfScreen'
                && key !== 'touchActive' && key !== 'type' && key !== 'playerControlled' && key !== 'image'
                && key !== 'animations' && key !== 'f_max_delay' && key !== 'change_f_delay' && key !== 'states'
                && key !== 'state' && key !== 'current_f' && key !== 'once' && key !== 'playCallback' && key !== 'playCallbackDellayCurrent'
                && key !== 'currentStatusX' && key !== 'statusX' && key !== 'textSize' && key !== 'cloneText' && key !== 'axis'
                && key !== 'viewportRect' && key !== 'worldRect' && key !== 'wView' && key !== 'hView' && key !== 'xDeadZone'
                && key !== 'yDeadZone' && key !== 'xScroll' && key !== 'yScroll'
            ) {
                props[key] = this[key];
            }
        }

        if (!superProps) {
            console.log(props);
            return this;
        } else {
            return props;
        }
    }
}

export default _ObjectSettings;