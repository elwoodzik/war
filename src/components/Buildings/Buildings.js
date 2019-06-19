import Sprite from "../../../lib/Sprite";
import Main from "../Pages/Main";

class Building extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.objectType = 'building';

        this.currentHp = 1;

        this.buildingPut = {};

        this.enemy = options.enemy || false;

        this.completed = options.completed || false;

        this.buildingState = options.buildingState || 'complete';

        this.game = game;

        this.dir = 'start';

        if (this.completed) {
            this.dir = 'complete';
            // this.key = 'buildings';
            this.image = this.AssetManager.get(this.key);
        }
        // const startPos = this.game.VAR.pathfinder.getTileBySprite(this);
        // this.currentPosition = this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 3);
        // this.nextPosition = null;
    }

    onClick() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.buildingPut && this.game.VAR.sellectedObj.buildingPut.used) {
            return false;
        }
        // if (!this.game.VAR.sellectedObj.buildingPut.used) {
        this.selectedBorder();
        this.game.VAR.hudLeft.cancelBox.used = false;
        this.game.VAR.hudLeft.set(this.info);
        this.game.VAR.hudLeft.creationBox.show();
        if (this.completed) {
            this.getRandomSelectedSound('selected');
        } else {
            this.getRandomSelectedSound('building');
        }
    }

    isBuilt() {
        if (this.completed) {
            this.currentHp = this.hitPointsMax;
        }
    }

    onRightClick() {
        //nic sie nie dzieje po prawym klawiszu
    }

    getRandomSelectedSound(type) {
        if (this.sounds && this.sounds[type] && this.sounds[type].length > 0) {
            const rand = this.game.rand(0, this.sounds[type].length - 1);
            this.AssetManager.play(this.sounds[type][rand]);
        }
    }

    // getRandomActionCompletedSound() {
    //     if (this.sounds && this.sounds.actionCompleted && this.sounds.actionCompleted.length > 0) {
    //         const rand = this.game.rand(0, this.sounds.actionCompleted.length - 1);
    //         this.AssetManager.play(this.sounds.actionCompleted[rand]);
    //     }
    // }

    onActionClick = (action) => {
        if (Main.SETTINGS.player.gold >= action.goldCost && Main.SETTINGS.player.wood >= action.woodCost) {
            if (Main.SETTINGS.player.people.length < Main.SETTINGS.player.homeMax) {
                this.game.VAR.hudLeft.infoBox.hideDescription();
                this.game.VAR.hudLeft.actionBox.hide();

                this.info.inProgress = true;
                this.info.inProgressTime = action.time;
                Main.SETTINGS.player.gold -= action.goldCost;
                Main.SETTINGS.player.wood -= action.woodCost;
                this.game.VAR.hudTop.goldText.use(Main.SETTINGS.player.gold)
                this.game.VAR.hudTop.woodText.use(Main.SETTINGS.player.wood)
                this.game.VAR.hudLeft.creationBox.icon.animations.playOnce({ key: action.key });

                if (typeof Main.SETTINGS.player.requirements[action.key] !== 'undefined') {
                    Main.SETTINGS.player.requirements[action.key] = true;
                }

                if (action.create.upgradeDir) {
                    this.dir = action.create.upgradeDir
                }

                // do zmiany
                this.game.VAR.hudBottom.hide();

                this.game.VAR.hudLeft.creationBox.show();

                this.AssetManager.play('S_click');
                //
                this.doInTime(action.time, () => {
                    if (action.create.class) {
                        this.freePlace(this.x - 32, this.y, action.key, (place) => {
                            const unit = new action.create.class(this.game, {
                                key: action.create.key,
                                x: place.x,
                                y: place.y
                            });
                            this.info.inProgress = false;

                            if (this.game.VAR.sellectedObj && this.objID === this.game.VAR.sellectedObj.objID) {
                                this.game.VAR.hudLeft.creationBox.hide();
                                this.game.VAR.hudLeft.infoBox.showDescription(this.info.descriptios());
                                this.game.VAR.hudLeft.actionBox.set(this.info.actions);
                            }

                            unit.AssetManager.play(unit.sounds.created[0]);
                            Main.SETTINGS.player.people.push(unit);
                            this.game.VAR.hudTop.homeTextCurrent.use(Main.SETTINGS.player.people.length);
                            this.game.sortByIndex();
                        });
                    } else if (action.create.upgrade) {
                        Main.SETTINGS.player.upgrade[action.create.upgrade] += action.create.upgradeValue;

                        if (action.create.upgradeFinishDir) {
                            this.dir = action.create.upgradeFinishDir
                        }

                        this.info.inProgress = false;
                        action.used = false;

                        if (this.game.VAR.sellectedObj && this.objID === this.game.VAR.sellectedObj.objID) {
                            this.game.VAR.hudLeft.creationBox.hide();
                            this.game.VAR.hudLeft.infoBox.showDescription(this.info.descriptios());
                            this.game.VAR.hudLeft.actionBox.set(this.info.actions);
                        } else if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objectType === 'unit') {
                            this.game.VAR.hudLeft.infoBox.showDescription(this.game.VAR.sellectedObj.info.descriptios());
                        }
                    }
                });
            }
            else {
                this.AssetManager.play('S_click');
                this.game.VAR.textError.display('houses');
            }
        } else {
            this.AssetManager.play('S_click');
            this.game.VAR.textError.display('resources');
        }
    }

    selectedBorder() {
        this.game.VAR.sellectedObj = this;
        this.game.VAR.sellectedBorder.show();
        this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
        this.game.VAR.sellectedBorder.y = this.y; //+ this.height / 2
        this.game.VAR.sellectedBorder.width = this.width;
        this.game.VAR.sellectedBorder.height = this.height;
    }

    freePlace(_x, _y, key, callback) {
        const place = this.game.VAR.map.getTileByCords(_x, _y);
        const buildingHeight = this.y + this.height;
        const buildingWidth = this.x + this.width;

        if (place.type === 'solid' || place.type === 'gold' || place.type === 'tree' || place.type === 'town') {
            if (_y < buildingHeight && _x < this.x) {
                let y = _y + (32);

                return this.freePlace(_x, y, key, callback);
            } else if (_x < buildingWidth && _y > this.y) {
                let x = _x + (32);

                return this.freePlace(x, _y, key, callback);
            } else if (_y >= this.y) {
                let y = _y - (32);

                return this.freePlace(_x, y, key, callback);
            } else if (_x > this.x) {
                let x = _x - (32);
                return this.freePlace(x, _y, key, callback);
            } else {
                return setTimeout(() => {
                    return this.freePlace(this.x - 32, this.y, key, callback);
                }, 1000)
            }
        } else {
            let y = place.y;
            if (key === 'warrior') {
                y = place.y
            }

            // return callback({ x: place.x, y: y });
            return callback({ x: place.x, y: y });
        }
    }

    // updateBorder() {
    //     if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
    //         this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
    //         this.game.VAR.sellectedBorder.y = this.y;//+ this.height / 2
    //         this.game.VAR.sellectedBorder.width = this.width;
    //         this.game.VAR.sellectedBorder.height = this.height;
    //     }
    // }

    update(dt) {
        super.update(dt);

        if (this.info.inProgress && this.dir !== 'complete') {
            this.currentHp = Math.ceil(this.timeLocal / (this.info.inProgressTime / this.hitPointsMax));
            this.info.currentHp = this.currentHp;
            const percent = Math.ceil(this.timeLocal / (this.info.inProgressTime / 100));
            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
                this.game.VAR.hudLeft.infoBox.lifeBar.setStatusX(this.currentHp)
            }
            if (!this.completed) {
                if (percent < 50) {
                    this.dir = 'start';
                } else if (percent >= 50 && percent < 100) {
                    this.image = this.AssetManager.get('buildings');
                    this.dir = 'half';
                } else if (percent >= 100) {
                    this.dir = 'complete';
                    this.completed = true;
                }
            }
        }

        this.animations.play({
            key: this.dir
        });
    }

    unWalkable(index, type, cost) {
        for (let i = 0; i < this.width; i += 32) {
            for (let j = 0; j < this.height; j += 32) {

                const tile = this.game.VAR.map.getTileByCords(this.x + i, this.y + j);

                if (tile) {
                    tile.type = type || 'solid';
                    this.game.easystar.setAdditionalPointCost(Math.floor((this.x + i) / 32), Math.floor((this.y + j) / 32), 130);
                }
            }
        }
    }
}
export default Building;