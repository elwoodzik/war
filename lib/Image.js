import _ObjectSettings from './_ObjectSettings';
import Body from './Body';

class Image extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        if (!this.key) {
            return console.error('Musi podany byc key do obrazka przy tworzeniu Classy: ' + this.constructor.name);
        }


        this.type = "image";
        this.body = new Body(this.game, this);
        // console.log(options)
        // this.optionsAssign(options, this)
    }

    draw(lag) {

        if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
            this.context.save();
            this.context.globalAlpha = this.objAlfa;
        }

        if (this.body.angle === 0) {
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
        }

        this.context.drawImage(
            this.image,
            0,
            0,
            this.image.width,
            this.image.height,
            this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) * this.body.scale : -this.width * this.body.anchorX,
            this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) * this.body.scale : -this.height * this.body.anchorY,
            this.width * this.body.scale,
            this.height * this.body.scale
        )

        if (this.objAlfa !== 1) {
            this.context.restore();
        }

        this.fadeInHandler();
        this.fadeOutHandler();
    }

    update(dt) {
        this.body.worldBounce();
        this.useThereAndBack();
        this.moveToPointEasingHandler();
        this.moveToPointHandler();

        if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
            this.x += (dt * this.body.velocity.x);
            this.y += (dt * this.body.velocity.y);
        }
    }

    updateWhenPositionChange(x, y, callback) {
        if ((this.previousX !== this.x || this.previousY !== this.y)) {
            if (typeof _callback === 'function') {
                _callback(this);
            }
        }
    }

    multiUpdate() {
        if ((this.previousX !== this.x || this.previousY !== this.y) && this.ID) {
            this.game.multiplayer.emit("update obj", { x: this.x, y: this.y, ID: this.ID, room: this.room });
        }
    }

    changeImage(key) {
        if (key) {
            this.image = this.AssetManager.get(key) || this.image;
        }
    }

    // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
    //     if (!_mouseX || !_mouseY) {
    //         return false;
    //     }
    //     let dx = (_mouseX - this.x - this.currentHalfWidth);
    //     let dy = (_mouseY - this.y - this.currentHalfHeight);
    //     let distance = Math.sqrt(dx * dx + dy * dy);
    //     let maxDistance = _maxDistance || 10;
    //     let speed = _speed || 4;

    //     if (distance > maxDistance) {
    //         if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
    //             let angle = Math.atan2(dy, dx);
    //             this.body.rotate(angle * (180 / Math.PI));

    //             this.body.velocity.x = Math.cos(angle) * speed;
    //             this.body.velocity.y = Math.sin(angle) * speed;
    //         }
    //     } else {
    //         this.body.velocity.x = 0;
    //         this.body.velocity.y = 0;
    //         if (typeof _callback === 'function') {
    //             this._callback.call(this.game, this);
    //         }
    //     }
    // }
}

export default Image;