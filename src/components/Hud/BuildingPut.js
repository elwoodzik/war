import Sprite from "../../../lib/Sprite";

class BuildingPut extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.used = false;
        this.x = -500;
        this.y = -500;

        this.objAlfa = 0.6;

        this.dir = 'farm';

        this.border = this.game.add.rect({ fill: null, strokeColor: 'yellow', zIndex: 2, used: false, x: -100, y: -100 });

        this.animations.add({
            key: 'farm',
            frames: [
                { sx: 400, sy: 5, fW: 64, fH: 64, },
            ]
        });

        this.animations.playOnce({ key: this.dir })
    }

    hide() {
        this.border.used = false;
        this.used = false;
        this.game.VAR.hudLeft.cancelIcon.used = false;
    }

    updateBorder() {
        if (this.border && this.border.used) {
            this.border.x = this.x; //+ this.width / 4
            // this.border.y = this.y + 8//+ this.height / 2
            this.border.y = this.y; //+ this.height / 2
            this.border.width = this.width;//this.width;
            this.border.height = this.height;//this.height;
        }
    }

    draw(dt) {
        super.draw(dt);

        if (this.places.length > 0) {
            this.places.forEach((place) => {
                this.context.save();
                this.context.globalAlpha = 0.4;
                this.context.fillStyle = 'red';
                this.context.fillRect(place.x - this.game.camera.xScroll, place.y - this.game.camera.yScroll, 32, 32);
                this.context.restore();
            })
        }
    }

    update(dt) {
        super.update(dt);

        this.x = this.game.mouse.mouseX - this.halfWidth + 10 + this.game.camera.xScroll;
        this.y = this.game.mouse.mouseY - 10 + this.game.camera.yScroll;

        this.canPut();

        this.animations.play({ key: this.dir });
        this.updateBorder();
    }

    canPut() {
        this.places = [];

        for (let i = 0; i < this.width + 32; i += 32) {
            for (let j = 0; j < this.height + 32; j += 32) {
                const tile = this.game.VAR.map.getTileByCords(this.x + i, this.y + j);

                if (tile && (tile.type === 'solid' || tile.type === 'gold' || tile.type === 'town' || tile.type === 'forest')) {
                    this.places.push({
                        x: this.x + i,
                        y: this.y + j
                    });
                }
            }
        }

        if (this.places.length > 0) {
            return false
        }
        return true;
    }
}
export default BuildingPut;