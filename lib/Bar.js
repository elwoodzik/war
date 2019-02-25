import _ObjectSettings from './_ObjectSettings'

class Bar extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        if (options.max === undefined || options.min === undefined) {
            throw "Wymagane wlasciwości to 'min' i 'max'! dla Classy: " + this.constructor.name;
        }

        this.type = "bar";

        this.max = options.max;
        this.min = options.min > this.max ? this.error() : options.min;

        this.currentStatusX = this.min;

        this.statusX = this.currentStatusX / this.max * this.width;

        this.lineWidth = 1;
        this.currentTimer = 0;

        this.strokeStyle = options.stroke || 'black';
        this.fillStyle = options.fill || 'green';

        this.useCollision = options.useCollision || false;
    }

    update(dt) {

    }

    draw(lag) {
        if (this.objAlfa !== 1) {
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

        this.context.fillStyle = this.fillStyle;

        if (this.strokeStyle) {
            this.context.beginPath();
            this.context.strokeStyle = this.strokeStyle;
            this.context.lineWidth = this.lineWidth;

            this.context.rect(this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
            this.context.stroke();
            //this.context.fill();
            this.context.closePath();
        }
        if (this.fillStyle) {
            this.context.fillRect(this.renderX + this.lineWidth - (!this.static ? this.game.camera.xScroll : 0), this.renderY + this.lineWidth - (!this.static ? this.game.camera.yScroll : 0), (this.statusX - this.lineWidth * 2) <= 0 ? 0 : this.statusX - this.lineWidth * 2, this.height - this.lineWidth * 2);
        }

        if (this.objAlfa !== 1) {
            this.context.restore();
        }
    }

    add(count) {
        if (this.currentStatusX + count < this.max) {
            this.currentStatusX = this.currentStatusX + count;
        } else {
            this.currentStatusX = this.max;
        }

        this.setStatusX(this.currentStatusX);
    }

    timeAdd(time) {
        if (this.currentStatusX < this.max) {
            this.currentTimer += 1 / 60 * 1000;
            this.currentStatusX = this.currentTimer / time;
        } else {
            this.currentStatusX = this.max;
        }

        this.setStatusX(this.currentStatusX);
    }

    rem(count) {
        if (this.currentStatusX - count > 0) {
            this.currentStatusX = this.currentStatusX - count;
        } else {
            this.currentStatusX = 0;
        }

        this.setStatusX(this.currentStatusX);
    }

    setStatusX(statusX) {
        this.statusX = Math.round(statusX / this.max * this.width);
    }

    getValue() {
        return this.currentStatusX;
    }

    error() {
        throw "Minimalna wartosc nie moze byc wieksza od maksymalnej";
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

export default Bar;