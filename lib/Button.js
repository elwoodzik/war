import _ObjectSettings from './_ObjectSettings';

class Button extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        this.type = "button";

        this.fontSize = options.fontSize || 42;
        this.fillStyle = options.fillStyle || 'black';
        this.fillStyleHover = options.fillStyleHover || '#666';
        this.strokeStyle = options.strokeStyle || null;
        this.strokeStyleHover = options.strokeStyleHover || null;
        this.textColor = options.textColor || 'white';
        this.textColorHover = options.textColorHover || 'white';
        this.borderWidth = options.borderWidth || 2;

        this.textMarginX = options.textMarginX || 0;
        this.textMarginY = options.textMarginY || 0;

        this.clickHold = options.clickHold || false;

        this.useCollision = options.useCollision || false;

        this.updateOfScreen = options.updateOfScreen || false;

        this.text = options.text || 'button';
        this.action = options.action || this.defaultClick;
    }

    defaultClick() {
        console.error("Do wlasciwosci 'action' przypisz funkcje jaka ma sie wykonac po kliknieciu");
    }

    // constructor(game, text, x, y, width, height, background, backgroundHover, strokeStyle, strokeStyleHover, textColor, action) {
    //     super();

    //     this.initializeGlobalSettings({
    //         game: game,
    //         pooled: false,
    //         context: 'main',
    //         x: x || 1,
    //         y: y || 1,
    //         key: null,
    //         width: width,
    //         height: height
    //     });

    //     this.fontSize = 42;
    //     this.fillStyle = background;
    //     this.fillStyleHover = backgroundHover;
    //     this.strokeStyle = strokeStyle;
    //     this.strokeStyleHover = strokeStyleHover;
    //     this.textColor = textColor;
    //     this.borderWidth = 2;

    //     this.textMarginX = 0;
    //     this.textMarginY = 0

    //     this.clickHold = false;

    //     this.text = text;
    //     this.action = action;
    //     this.zIndex = 5;

    //     this.colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];
    // }

    update() {
        this.game.mouse.trigger(this, !this.static ? false : true, () => {
            if (typeof this.action === 'function') {
                this.action.call(this.game, this)
            }
        }, this.clickHold)

        this.game.mouse.onHover(this, !this.static ? false : true, null);
    }

    draw() {
        if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
            this.context.save();
            this.context.globalAlpha = this.objAlfa;
        }

        if (this.hovered) {
            this.context.fillStyle = this.backgroundHover;
            this.fillCol = this.fillStyleHover ? this.fillStyleHover : 'transparent';
            this.strokeCol = this.strokeStyleHover;
            this.textCol = this.textColorHover;
        } else {
            this.context.fillStyle = this.background;
            this.fillCol = this.fillStyle ? this.fillStyle : 'transparent';
            this.strokeCol = this.strokeStyle;
            this.textCol = this.textColor;
        }

        //draw button
        this.context.strokeStyle = this.strokeCol;
        this.context.fillStyle = this.fillCol;

        if (this.strokeStyle === null) {
            this.context.fillRect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
        } else if (this.fillStyle === null && this.fillStyleHover === null) {
            this.context.beginPath();
            this.context.rect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
            this.context.lineWidth = this.borderWidth;
            this.context.stroke();
            this.context.closePath();
        } else {
            this.context.beginPath();
            this.context.rect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
            this.context.lineWidth = this.borderWidth;
            this.context.stroke();
            this.context.fill();
            this.context.closePath();
        }
        //text options
        this.context.fillStyle = this.textCol;
        this.context.font = this.fontSize + "px Forte";
        this.textSize = this.context.measureText(this.text);
        //text position
        let textX = this.x - (!this.static ? this.game.camera.xScroll : 0) + (this.width / 2) - (this.textSize.width / 2);
        let textY = this.y - (!this.static ? this.game.camera.yScroll : 0) + this.height - this.height / 4;

        //draw the text
        this.context.fillText(this.text, textX + this.textMarginX, textY + this.textMarginY);
        // this.context.fillText(this.text, textX - this.game.camera.xScroll, textY - this.game.camera.yScroll);
        if (this.objAlfa !== 1) {
            this.context.restore();
        }

        this.fadeInHandler();
        this.fadeOutHandler();
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
            if (key === 'key' || key === 'scale' || key === 'clickHold') {
                delete props[key];
            }
        }

        console.log(props);

        return this;
    }
};

const superProps = _ObjectSettings.prototype.getProps;

export default Button;