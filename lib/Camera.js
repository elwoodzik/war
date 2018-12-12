import _ObjectSettings from './_ObjectSettings';
import Rectangle from './Rectangle';

class Camera extends _ObjectSettings {

    static AXIS = {
        NONE: "none",
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        BOTH: "both"
    }

    constructor(game, options) {
        super(game, options);

        if (!options.followed) {
            throw "Wymagane wlasciwosci przy tworzeniu: " + this.constructor.name + " to: \n'followed' -> obiekt śledzony \n";
        }

        this.type = "camera";

        this.static = true;

        this.xScroll = options.xView || 0;
        this.yScroll = options.yView || 0;

        this.xDeadZone = 0; // min distance to horizontal borders
        this.yDeadZone = 0; // min distance to vertical borders

        this.wView = this.game.width;
        this.hView = this.game.height;

        this.axis = Camera.AXIS.BOTH;

        this.followed = options.followed;

        this.worldWidth = this.game.width;

        this.worldHeight = this.game.height;

        this.follow(this.followed);

        this.viewportRect = new Rectangle(this.xScroll, this.yScroll, this.wView, this.hView);

        this.worldRect = new Rectangle(0, -32 * 5, this.worldWidth, this.worldHeight);
    }

    update(dt) {
        this.moveToPointHandler();
        if (this.followed != null) {
            if (this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH) {
                // moves camera on horizontal axis based on followed object position
                if (this.followed.renderX - this.xScroll + this.xDeadZone > this.wView)
                    this.xScroll = this.followed.x - (this.wView - this.xDeadZone);
                else if (this.followed.renderX - this.xDeadZone < this.xScroll)
                    this.xScroll = this.followed.x - this.xDeadZone;
            }

            if (this.axis === Camera.AXIS.VERTICAL || this.axis === Camera.AXIS.BOTH) {
                // moves camera on vertical axis based on followed object position
                if (this.followed.renderY - this.yScroll + this.yDeadZone > this.hView)
                    this.yScroll = this.followed.y + this.followed.halfHeight - (this.hView - this.yDeadZone);
                else if (this.followed.renderY - this.yDeadZone < this.yScroll)
                    this.yScroll = this.followed.y + this.followed.halfHeight - this.yDeadZone;
            }
        }

        this.viewportRect.set(this.xScroll, this.yScroll);

        if (!this.viewportRect.within(this.worldRect)) {
            if (this.viewportRect.left < this.worldRect.left){
                this.xScroll = this.worldRect.left;
            
            }
            // if(this.viewportRect.top < this.worldRect.top)					
            //     this.yScroll = this.worldRect.top;
            if (this.xScroll >= this.game.portViewWidth - this.game.width + 20){
                this.xScroll = this.game.portViewWidth - this.game.width + 20
            }
            if (this.yScroll < -20)
                this.yScroll = -20;
            if (this.yScroll > this.game.portViewHeight - this.game.height + 20)
                this.yScroll = this.game.portViewHeight - this.game.height + 20;
        }
        this.game.physic.outOfScreen(this.game.gameObjects);
    }

    follow(sprite, xDeadZone, yDeadZone) {
        this.followed = sprite;
        this.xDeadZone = xDeadZone === undefined ? this.game.width / 2 : xDeadZone;
        this.yDeadZone = yDeadZone === undefined ? this.game.height / 2 : yDeadZone;
    }

    moveToPoint(x, y, speed, callback) {
        this.positionToMoveX = Math.floor(x);
        this.positionToMoveY = Math.floor(y);
        this.positionSpeed = speed;
        this.followed = null;
        this.moveTo = true;

        this.positionCallback = callback;
    }

    moveToPointHandler() {
        if (this.moveTo) {
            this.myX = Math.floor(this.xScroll + this.wView / 2);
            this.myY = Math.floor(this.yScroll + this.hView / 2);

            if (this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY)) {
                this.xScroll -= (((this.myX - this.positionToMoveX) / this.positionSpeed));
                this.yScroll -= (((this.myY - this.positionToMoveY) / this.positionSpeed));
            } else if (this.moveTo) {
                this.xScroll = Math.floor(this.xScroll);
                this.yScroll = Math.floor(this.yScroll);
                this.moveTo = false;

                if (typeof this.positionCallback === 'function') {
                    this.positionCallback.call(this.game, this);
                }
            }

            if (!this.viewportRect.within(this.worldRect)) {
                if (this.xScroll <= 0)
                    this.positionToMoveX = this.myX
                // if(this.viewportRect.top < this.worldRect.top)					
                //     this.yScroll = this.worldRect.top;
                // if(this.xScroll >= this.game.portViewWidth-this.game.width )
                //      this.positionToMoveX = this.myX
                if (this.yScroll < 0)
                    this.positionToMoveY = this.myY
                if (this.yScroll > this.game.portViewHeight - this.game.height)
                    this.positionToMoveY = this.myY
            }
        }
    }
};

export default Camera;