import _ObjectSettings from './_ObjectSettings';
import Body from './Body';

class Circle extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        this.strokeColor = options.strokeColor || null;

        this.fill = options.fill === null ? null : options.fill || null;

        this.radius = options.radius || 100;

        this.borderWidth = options.borderWidth || 1;

        this.type = "circle";

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

            if (this.fill) {
                this.context.beginPath();
                this.context.arc(
                    this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
                    this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
                    this.radius,
                    0,
                    2 * Math.PI
                );
                this.context.fill();
                this.context.stroke();
            } else {
                this.context.beginPath();
                this.context.arc(
                    this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
                    this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
                    this.radius,
                    0,
                    2 * Math.PI
                );
                this.context.stroke();
            }


            // if (this.strokeColor === null) {
            //     this.context.fillRect(
            //         this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
            //         this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
            //         this.width * this.scale,
            //         this.height * this.scale
            //     );
            // } else if (this.fill === null) {
            //     this.context.beginPath();
            //     this.context.rect(
            //         this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
            //         this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
            //         this.width * this.scale,
            //         this.height * this.scale
            //     );
            //     this.context.stroke();
            //     this.context.closePath();
            // } else {
            //     this.context.beginPath();
            //     this.context.rect(
            //         this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
            //         this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
            //         this.width * this.scale,
            //         this.height * this.scale
            //     );
            //     this.context.stroke();
            //     this.context.fill();
            //     this.context.closePath();
            // }

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

export default Circle;