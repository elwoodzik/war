import _ObjectSettings from './_ObjectSettings';
import Body from './Body';

class Rect extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        this.strokeColor = options.strokeColor || null;

        this.fill = options.fill === null ? null : options.fill || 'red';

        this.borderWidth = options.borderWidth || 1;

        this.type = "rect";

        this.body = new Body(this.game, this);
    }

    draw(lag) {
        if (this.isRender) {


            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
                this.context.save();
                this.context.globalAlpha = this.objAlfa;
            }

            if (this.previousX) {
                this.renderX = (this.x - this.previousX) * lag + this.previousX;
            } else {
                this.renderX = this.x;
            }
            if (this.previousY) {
                this.renderY = (this.y - this.previousY) * lag + this.previousY;
            } else {
                this.renderY = this.y;
            }

            this.context.strokeStyle = this.strokeColor;
            this.context.lineWidth = this.borderWidth;
            this.context.fillStyle = this.fill;
            
            if (this.strokeColor === null) {
                this.context.fillRect(
                    this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
                    this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
                    this.width * this.scale,
                    this.height * this.scale
                );
            } else if (this.fill === null) {
                this.context.beginPath();
                this.context.rect(
                    this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
                    this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
                    this.width * this.scale,
                    this.height * this.scale
                );
                this.context.stroke();
                this.context.closePath();
            } else {
                this.context.beginPath();
                this.context.rect(
                    this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
                    this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
                    this.width * this.scale,
                    this.height * this.scale
                );
                this.context.stroke();
                this.context.fill();
                this.context.closePath();
            }

            if (this.objAlfa !== 1) {
                this.context.restore();
            }

            this.fadeInHandler();
            this.fadeOutHandler();
        }
    }

    update(dt) {
        this.body.worldBounce();
        this.body.scaleUpDownHandler();
        this.useThereAndBack();
        this.moveToPointEasingHandler();
        this.moveToPointHandler();

        this.x = (this.x + (dt * this.body.velocity.x));
        this.y = (this.y + (dt * this.body.velocity.y));
    }

    setBorderWidth(width) {
        this.borderWidth = width;
    }

    // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
    //     if (!_mouseX || !_mouseY) {
    //         return false;
    //     }
    //     let dx = (_mouseX - this.x - this.halfWidth);
    //     let dy = (_mouseY - this.y - this.halfHeight);
    //     let distance = Math.sqrt(dx * dx + dy * dy);
    //     let maxDistance = _maxDistance || 4;
    //     let speed = _speed || 4;
    //     this.body.angle = Math.atan2(dy, dx) * (180 / Math.PI);
    //     //this.body.rotate(this.body.angle / (180 / Math.PI));

    //     if (distance > maxDistance) {
    //         // if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {

    //         this.body.velocity.x = Math.cos(this.body.angle / (180 / Math.PI)) * speed;
    //         this.body.velocity.y = Math.sin(this.body.angle / (180 / Math.PI)) * speed;
    //         //}
    //     } else {
    //         this.body.velocity.x = 0;//Math.cos(angle) * speed;
    //         this.body.velocity.y = 0;//Math.sin(angle) * speed;
    //         if (typeof _callback === 'function') {
    //             this._callback.call(this.game, this);
    //         }
    //     }
    // }

    // moveToPoint(x, y, speed, callback) {
    //     //if(!this.moveTo){
    //     this.positionToMoveX = Math.floor(x);
    //     this.positionToMoveY = Math.floor(y);
    //     this.positionSpeed = speed;
    //     this.oldVelocityX = this.body.velocity.x;
    //     this.oldVelocityY = this.body.velocity.y;
    //     this.oldUseCollision = this.useCollision;
    //     this.useCollision = false;
    //     this.moveTo = true;

    //     this.positionCallback = callback;
    //     //}
    // }

    // moveToPointHandler() {
    //     if (this.moveTo) {
    //         this.myX = Math.floor(this.x);
    //         this.myY = Math.floor(this.y);

    //         if (this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY)) {
    //             this.x -= (((this.myX - this.positionToMoveX) / this.positionSpeed));
    //             this.y -= (((this.myY - this.positionToMoveY) / this.positionSpeed));
    //             this.body.velocity.x = 0;
    //             this.body.velocity.y = 0;

    //         } else if (this.moveTo) {
    //             this.body.velocity.x = this.oldVelocityX;
    //             this.body.velocity.y = this.oldVelocityY;
    //             this.useCollision = this.oldUseCollision;
    //             this.x = Math.floor(this.x)
    //             this.y = Math.floor(this.y)
    //             this.moveTo = false;

    //             if (typeof this.positionCallback === 'function') {
    //                 this.positionCallback.call(this.game, this);
    //             }
    //         }
    //     }
    // }
    getProps() {
        let props = superProps.call(this, true);

        for (let key in this) {
            if (key === 'key' || key === 'scale') {
                delete props[key];
            }
        }

        console.log(props);

        return this;
    }
};

const superProps = _ObjectSettings.prototype.getProps;

export default Rect;