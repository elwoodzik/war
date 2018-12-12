import _ObjectSettings from './_ObjectSettings';
import Body from './Body';


class Point extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        if (!options.element) {
            return console.error('Musi zostac przekazany element np sprite, image itd.: ' + this.constructor.name);
        }

        this.type = "point";
        this.body = new Body(this.game, this);

        this.element = options.element;
        this.diffX = options.diffX || 0;
        this.diffY = options.diffY || 0;
        this.width = options.width || 5;
        this.height = options.height || 5;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
        this.isRender = options.isRender === false ? false : true;
    }

    draw(dt) {
        if (this.isRender) {
            if (this.objAlfa !== 1 && this.game.ctx.globalAlpha === 1) {
                this.game.ctx.save();
                this.game.ctx.globalAlpha = this.objAlfa;
            }

            if (this.previousX) {
                this.renderX = Math.floor((this.x - this.previousX) * dt + this.previousX) //this.x + (this.body.velocity.x * dt);                 
            } else {
                this.renderX = this.x;
            }
            if (this.previousY) {
                this.renderY = Math.floor((this.y - this.previousY) * dt + this.previousY)  //this.y + (this.body.velocity.y * dt);
            } else {
                this.renderY = this.y;
            }

            this.context.fillStyle = 'black';
            this.context.fillRect(this.renderX - (!this.static ? Math.floor(this.game.camera.xScroll) : 0), this.renderY - (!this.static ? Math.floor(this.game.camera.yScroll) : 0), this.width, this.height);

            if (this.objAlfa !== 1) {
                this.game.ctx.restore();
            }
        }
    }

    update() {
        const dist = Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY);
        // const ca = Math.atan2(this.diffY, this.diffX) * 180 / Math.PI;
        // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

        /// find angle from pivot to corner
        const ca = Math.atan2(this.diffY, this.diffX);

        /// get new angle based on old + current delta angle
        const na = ((ca + this.element.body.angle));

        /// get new x and y and round it off to integer
        this.x = (this.element.getCenter().x + dist * Math.cos(na) + 0.5) | 0;
        this.y = (this.element.getCenter().y + dist * Math.sin(na) + 0.5) | 0;
    }

    getPoints() {
        return {
            x: this.x,
            y: this.y
        }
    }
}

export default Point;