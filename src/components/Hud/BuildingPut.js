import Sprite from "../../../lib/Sprite";

class BuildingPut extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.used = false;

        this.objAlfa = 0.6;

        this.dir = 'farm';

        this.animations.add({
            key: 'farm',
            frames: [
                { sx: 400, sy: 5, fW: 64, fH: 64, },
            ]
        });

        this.animations.playOnce({ key: this.dir })
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
            // this.context.save();

            // this.context.restore();
        }
    }

    update(dt) {
        super.update(dt);

        this.x = this.game.mouse.mouseX + this.game.camera.xScroll;
        this.y = this.game.mouse.mouseY + this.game.camera.yScroll;

        this.canPut();

        this.animations.play({ key: this.dir });
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
                    // return;
                }
            }
        }
    }
}
export default BuildingPut;