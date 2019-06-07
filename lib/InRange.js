import _ObjectSettings from './_ObjectSettings';
import Body from './Body';


class InRange extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        if (!options.element) {
            return console.error('Musi zostac przekazany element np sprite, image itd.: ' + this.constructor.name);
        }
        if (!options.target) {
            return console.error('Musi zostac przekazany target np sprite, image itd.: ' + this.constructor.name);
        }

        this.type = "inRange";
        this.body = new Body(this.game, this);
        this.zIndex = 3;

        this.element = options.element;
        this.target = options.target;
        this.diffX = options.diffX || 0;
        this.diffY = options.diffY || 0;
        this.width = options.width || 80;
        this.height = options.height || 80;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
        this.radius = options.radius || 80;
        this.offsetX = options.offsetX || this.element.halfWidth;
        this.offsetY = options.offsetY || this.element.halfHeight + this.element.halfHeight - 32;
        this.isRender = options.isRender === false ? false : true;

        if (this.iso) {
            this.addIsoProperties(this.x, this.y, this.game.mapPathfinder.pathfinderJson.width, this.game.mapPathfinder.pathfinderJson.height);

            this.x = this.isoX;
            this.y = this.isoY;
            this.depthOffsetX = options.depthOffsetX || 0;
            this.depthOffsetY = options.depthOffsetY || 0;
        } else {
            this.x = options.element.x
            this.y = options.element.y
        }
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

            this.context.strokeStyle = 'yellow';
            this.context.beginPath();
            this.context.arc(this.renderX + this.offsetX - (!this.static ? Math.floor(this.game.camera.xScroll) : 0), this.renderY + this.offsetY - (!this.static ? Math.floor(this.game.camera.yScroll) : 0), this.radius, 0, 2 * Math.PI);
            this.context.stroke();
            // this.context.fillRect(this.renderX - (!this.static ? Math.floor(this.game.camera.xScroll) : 0), this.renderY - (!this.static ? Math.floor(this.game.camera.yScroll) : 0), this.width, this.height);

            if (this.objAlfa !== 1) {
                this.game.ctx.restore();
            }
        }
    }

    update() {
        // const dist = Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY);
        // // const ca = Math.atan2(this.diffY, this.diffX) * 180 / Math.PI;
        // // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

        // /// find angle from pivot to corner
        // const ca = Math.atan2(this.diffY, this.diffX);

        // /// get new angle based on old + current delta angle
        // const na = ((ca + this.element.body.angle));

        // /// get new x and y and round it off to integer
        // this.x = (this.element.getCenter().x + dist * Math.cos(na) + 0.5) | 0;
        // this.y = (this.element.getCenter().y + dist * Math.sin(na) + 0.5) | 0;

    }

    colidingToMany() {
        let i = 0;
        const targets = this.target;
        for (i = 0; i < targets.length; i++) {
            if (this.collidingToSingle(targets[i])) {
                return targets[i];
            }
        }
    }

    collidingToSingle(target) {
        var distX = Math.abs(this.x - target.x - target.halfWidth);
        var distY = Math.abs(this.y - target.y - target.halfHeight);

        if (distX > (target.halfWidth + this.radius)) { return false; }
        if (distY > (target.halfHeight + this.radius)) { return false; }

        if (distX <= (target.halfWidth)) { return true; }
        if (distY <= (target.halfHeight)) { return true; }

        var dx = distX - target.halfWidth;
        var dy = distY - target.halfHeight;
        // return (dx * dx + dy * dy <= (this.radius * this.radius));
        if ((dx * dx + dy * dy <= (this.radius * this.radius))) {
            return target;
        }
    }

    rectCircleColliding(callback) {
        if (this.target && Array.isArray(this.target)) {
            const player = this.colidingToMany()
            if (player) {
                return callback(player);
            }
        }
        else {
            if (this.collidingToSingle(this.target)) {
                return callback(this.target);
            }
        }
    }

    getPoints() {
        return {
            x: this.x,
            y: this.y
        }
    }
}

export default InRange;