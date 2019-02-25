import Sprite from "../../../lib/Sprite";

class BuildingPut extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.game = game;
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

        this.animations.add({
            key: 'barracks',
            frames: [
                { sx: 308, sy: 460, fW: 96, fH: 96, },
            ]
        });

        this.animations.playOnce({ key: this.dir })
    }

    hide() {
        this.border.used = false;
        this.used = false;
        this.game.VAR.hudLeft.cancelBox.used = false;
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

        this.x = this.game.mouse.mouseX + this.game.camera.xScroll;
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

    building(tile, worker) {

        const building = new this.action.create.class(this.game, {
            key: 'gold',
            x: tile.row * 32,
            y: tile.column * 32,
            zIndex: 11
        });


        this.game.sortByIndex();

        building.info.inProgress = true;
        building.info.inProgressTime = this.action.time;

        this.game.VAR.settings.gold -= this.action.goldCost;
        this.game.VAR.settings.wood -= this.action.woodCost;
        this.game.VAR.hudTop.goldText.use(this.game.VAR.settings.gold);
        this.game.VAR.hudTop.woodText.use(this.game.VAR.settings.wood);

        this.game.VAR.hudLeft.creationBox.icon.animations.playOnce({ key: this.action.key });
        this.game.VAR.hudLeft.creationBox.show(true);

        building.doInTime(this.action.time, () => {
            building.info.inProgress = false;
            this.game.VAR.hudLeft.creationBox.hide();
            building.completed = true;
            building.isBuilt();
            building.freePlace(building.x - 32, building.y, (place) => {
                worker.x = place.x;
                worker.y = place.y;
                worker.used = true;
                worker.startPos = null;
                worker.nextStep = null;
            })
        })
    }
}
export default BuildingPut;