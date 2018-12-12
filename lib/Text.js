import _ObjectSettings from './_ObjectSettings';
import Body from './Body';

class Text extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        this.type = "text";

        this.body = new Body(this.game, this);

        this.fontSize = options.fontSize || 36;

        this.color = options.color || 'black';

        this.text = options.text || 'Text';

        this.fontType = options.fontType || "Forte";

        this.useCollision = (options.useCollision === undefined || !options.useCollision) ? false : true;

        this.asImage = options.asImage || false;

        this.context.font = this.fontSize + "px " + this.fontType;

        this.textSize = this.context.measureText(this.text);

        this.width = this.textSize.width;

        this.height = this.fontSize;

        this.halfWidth = this.textSize.width / 2;

        this.halfHeight = this.fontSize / 2;

        this.useStroke = options.useStroke || false;

        this.strokeColor = options.strokeColor || '#333';

        this.strokeWidth = options.strokeWidth || 2;

        if (this.asImage) {
            this.generate();
        }
    }

    generate() {
        let ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = this.width;
        ctx.canvas.height = this.height;

        ctx.font = this.fontSize + "px " + this.fontType;
        ctx.fillStyle = this.color;
        ctx.fillText(this.text, 0, this.height / 1.27);

        if (this.useStroke) {
            ctx.lineWidth = this.strokeWidth;
            ctx.strokeStyle = this.strokeColor;
            ctx.strokeText(this.text, 0, this.height / 1.27);
        }

        this.cloneText = ctx.canvas;
        ctx = null;
    }

    update(dt) {
        this.useThereAndBack();
        this.moveToPointEasingHandler();
        this.moveToPointHandler();
        // this.doInTimeHandler();
    }

    draw(dt) {
        if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
            this.context.save();
            this.context.globalAlpha = this.objAlfa;
        }

        if (this.previousX) {
            this.renderX = (this.x - this.previousX) * dt + this.previousX;
        } else {
            this.renderX = this.x;
        }
        if (this.previousY) {
            this.renderY = (this.y - this.previousY) * dt + this.previousY;
        } else {
            this.renderY = this.y;
        }

        if (this.asImage) {
            this.context.drawImage(
                this.cloneText,
                0, //Math.floor(this.renderX), // + (this.game.camera.lerpAmount * dt)
                0, //Math.floor(this.renderY), // + (this.game.camera.lerpAmount * dt)
                this.width,
                this.height,
                this.renderX - (!this.static ? this.game.camera.xScroll : 0) * this.body.scale,
                this.renderY - (!this.static ? this.game.camera.yScroll : 0) * this.body.scale,
                this.width * this.body.scale,
                this.height * this.body.scale
            );
        } else {
            this.context.font = this.fontSize + "px " + this.fontType
            this.context.fillStyle = this.color;
            this.context.fillText(this.text, this.x, this.y);
            if (this.useStroke) {
                this.context.lineWidth = this.strokeWidth;
                this.context.strokeStyle = this.strokeColor;
                this.context.strokeText(this.text, this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0));
            }
        }

        if (this.objAlfa !== 1) {
            this.context.restore();
        }

        this.fadeInHandler();
        this.fadeOutHandler();
    }

    redraw() {
        this.context.fillStyle = this.color;
        this.context.font = this.fontSize + "px " + this.fontType
        this.context.fillText(this.text, this.x, this.y);
    }

    add(count) {
        this.text += count;
    }

    rem(count) {
        this.text -= count;
    }

    use(count) {
        this.text = count;
    }

    get() {
        return this.text;
    }

    getProps() {
        let props = superProps.call(this, true);

        for (let key in this) {
            if (key === 'height' || key === 'width' || key === 'key' || key === 'scale') {
                delete props[key];
            }
        }

        console.log(props);

        return this;
    }
};

const superProps = _ObjectSettings.prototype.getProps;

export default Text;