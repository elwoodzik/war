import Sprite from "../../../lib/Sprite";
import Main from "../Pages/Main";

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
        this.places = [];

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

        this.animations.add({
            key: 'lumber_mill',
            frames: [
                { sx: 105, sy: 265, fW: 96, fH: 96 },
            ]
        });

        this.animations.add({
            key: 'blacksmith',
            frames: [
                { sx: 5, sy: 265, fW: 96, fH: 96 },
            ]
        });

        this.animations.add({
            key: 'tower',
            frames: [
                { sx: 465, sy: 5, fW: 64, fH: 64, },
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

        this.x = Math.floor((this.game.mouse.mouseX + this.game.camera.xScroll) / 32) * 32;
        this.y = Math.floor((this.game.mouse.mouseY + this.game.camera.yScroll) / 32) * 32;

        this.canPut();

        this.animations.play({ key: this.dir });
        this.updateBorder();
    }

    canPut() {
        this.places = [];

        for (let i = 0; i < this.width; i += 32) {
            for (let j = 0; j < this.height; j += 32) {
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

        Main.SETTINGS.player.gold -= this.action.goldCost;
        Main.SETTINGS.player.wood -= this.action.woodCost;
        this.game.VAR.hudTop.goldText.use(Main.SETTINGS.player.gold);
        this.game.VAR.hudTop.woodText.use(Main.SETTINGS.player.wood);

        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === building.objID) {
            this.game.VAR.hudLeft.creationBox.icon.animations.playOnce({ key: this.action.key });
            this.game.VAR.hudLeft.creationBox.show(true);
        }

        building.doInTime(this.action.time, () => {
            building.info.inProgress = false;

            building.completed = true;
            building.isBuilt();

            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === building.objID) {
                this.game.VAR.hudLeft.creationBox.hide();
                this.game.VAR.hudLeft.set(building.info);

            } else if (this.game.VAR.sellectedObj && !this.game.VAR.sellectedObj.buildingPut.used && !this.game.VAR.hudLeft.creationBox.bar.used) {
                this.game.VAR.hudLeft.set(this.game.VAR.sellectedObj.info);
            }

            building.freePlace(building.x - 32, building.y, this.action.key, (place) => {
                worker.x = place.x;
                worker.y = place.y;
                worker.used = true;
                worker.pathMove.startPos = this.game.VAR.map.getTileBySprite(worker);
                worker.pathMove.currentTile = this.game.VAR.map.getTile(worker.pathMove.startPos.row, worker.pathMove.startPos.column);
                this.game.easystar.setAdditionalPointCost(worker.pathMove.startPos.row, worker.pathMove.startPos.column, 200);
                worker.pathMove.currentTile.type = 'solid';
                // worker.pathMove.startPos = null;
                // worker.pathMove.nextStep = null;
                this.AssetManager.play('S_workComplete');
            })
        })
    }
}
export default BuildingPut;