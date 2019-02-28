import Units from "../Units";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Farm from "../../Buildings/Farm/Farm";
import Barracks from "../../Buildings/Barracks/Barracks";
import LumberMill from "../../Buildings/LumberMill/LumberMill";
import Blacksmith from "../../Buildings/Blacksmith/Blacksmith";
import BuildingPut from "../../Hud/BuildingPut";
import Tower from "../../Buildings/Tower/Tower";

class Peasant extends Units {
    constructor(game, options) {
        super(game, options);

        this.type = 'worker';

        this.inBuilding = false;
        this.dir = 'idle_up';
        this.cargo = 'empty';
        this.inForestPos = {};
        this.buildingPut = new BuildingPut(this.game, { key: 'buildings', zIndex: 49 });

        this.dmg = [2, 9];
        this.armor = 0;
        this.speed = 60;
        this.range = 1;
        this.hitPointsMax = 30;
        this.currentHp = this.hitPointsMax;


        this.info = {
            dmg: this.dmg,
            armor: this.armor,
            speed: this.speed,
            range: this.range,
            hitPointsMax: this.hitPointsMax,
            currentHp: this.currentHp,
            imageKey: 'peasant',
            name: 'Chłop',
            descriptios: [
                `Obrażenia: ${this.dmg[0]} - ${this.dmg[1]}`,
                `Armor: ${this.armor}`,
                `Zasięg: ${this.range}`
            ],
            inProgress: false,
            inProgressTime: 0,
            actions: [
                {
                    key: 'farm',
                    woodCost: 250,
                    goldCost: 500,
                    time: 100000 / this.game.VAR.settings.buildSpeed,
                    onActionClick: this.onActionBuild,
                    create: {
                        class: Farm,
                        key: 'buildings',
                        name: 'Farmę',
                        prefix: 'Buduj'
                    },
                },
                {
                    key: 'barracks',
                    woodCost: 450,
                    goldCost: 700,
                    time: 200000 / this.game.VAR.settings.buildSpeed,
                    onActionClick: this.onActionBuild,
                    create: {
                        class: Barracks,
                        key: 'buildings',
                        name: 'Koszary',
                        prefix: 'Buduj'
                    },
                },
                {
                    key: 'lumber_mill',
                    woodCost: 450,
                    goldCost: 600,
                    time: 150000 / this.game.VAR.settings.buildSpeed,
                    onActionClick: this.onActionBuild,
                    create: {
                        class: LumberMill,
                        key: 'buildings',
                        name: 'Tartak',
                        prefix: 'Buduj'
                    },
                },
                {
                    key: 'blacksmith',
                    woodCost: 450,
                    goldCost: 800,
                    time: 200000 / this.game.VAR.settings.buildSpeed,
                    onActionClick: this.onActionBuild,
                    create: {
                        class: Blacksmith,
                        key: 'buildings',
                        name: 'Kuźnia',
                        prefix: 'Buduj'
                    },
                },
                {
                    key: 'tower',
                    woodCost: 200,
                    goldCost: 550,
                    time: 60000 / this.game.VAR.settings.buildSpeed,
                    onActionClick: this.onActionBuild,
                    create: {
                        class: Tower,
                        key: 'buildings',
                        name: 'Wieżę',
                        prefix: 'Buduj'
                    },
                },
            ],
        }


        new Animations(this);
        this.sounds = new Sounds();
        this.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
        this.currentTile.type = 'solid';
    }

    update(dt) {
        super.update(dt);
    }

    // onActionHover = (action) => {
    //     // return `Buduj ${action.create.name}.                                                                           ${action.goldCost}                              ${action.woodCost} `;
    // }

    onActionBuild = (action) => {
        if (this.game.VAR.settings.gold >= action.goldCost && this.game.VAR.settings.wood >= action.woodCost) {
            this.buildingPut.dir = action.key;
            this.buildingPut.used = true;
            this.buildingPut.action = action;
            this.buildingPut.border.used = true;

            this.game.VAR.hudLeft.cancelBox.used = true;
            this.game.VAR.hudLeft.actionBox.hide();

            // this.game.VAR.settings.gold -= action.goldCost;
            // this.game.VAR.settings.wood -= action.woodCost;
            // this.game.VAR.hudTop.goldText.use(this.game.VAR.settings.gold)
            // this.game.VAR.hudTop.woodText.use(this.game.VAR.settings.wood)
            // this.game.VAR.hudLeft.trainIcon.animations.playOnce({ key: action.key });
            // this.info.inProgress = true;
            // this.info.inProgressTime = action.time;
            // this.AssetManager.play('S_click');
            // this.doInTime(action.time, () => {
            //     this.info.inProgress = false;
            //     this.game.VAR.hudLeft.showActions(this.info.actions);
            //     this.game.VAR.hudLeft.showDescription(this.info.descriptios);
            // const building = new action.create.class(this.game, {
            //     key: action.create.key,
            //     x: -100,
            //     y: -100,
            //     buildingState: 'putting'
            // });
            //     unit.AssetManager.play(unit.sounds.created[0]);
            //     this.game.VAR.settings.people.push(unit)
            //     this.game.VAR.hudTop.homeTextCurrent.use(this.game.VAR.settings.people.length);
            //     this.game.sortByIndex();
            // })
        } else {
            this.AssetManager.play('S_click');
            this.game.VAR.textError.display('resources')
        }
    }

    extendsMove(nextTile, nextStep, startPos) {
        // nextTile 4 === kopalnia
        if (nextTile.type === 'gold' && this.cargo === 'empty' && !this.inBuilding) {
            this.inMine(nextStep, startPos);
            return true;
        }
        else if (nextTile.type === 'town' && (this.cargo === 'gold' || this.cargo === 'wood') && !this.inBuilding) {
            this.inTown(nextStep, startPos);
            return true;
        }
        else if (nextTile.type === 'forest' && !this.inBuilding) {
            this.inForest(nextStep, startPos);
            return true;
        }
    }

    inMine(nextStep, startPos) {
        if (this.game.VAR.sellectedObj && this.objID === this.game.VAR.sellectedObj.objID) {
            this.game.VAR.hudLeft.infoBox.hide();
            this.game.VAR.hudLeft.actionBox.hide();
            // this.game.VAR.hudLeft.hideDescription();
            // this.game.VAR.hudLeft.infoName.used = false;
            // this.game.VAR.hudLeft.infoIcon.used = false;
            // this.game.VAR.hudLeft.descriptionsInfoBorder.used = false;
            this.buildingPut.hide();
        }

        this.unSelectedBorder();

        this.inBuilding = true;
        this.isRender = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        this.game.VAR.goldMine.addUserToMine();

        this.doInTime(4500, () => {
            this.cargo = 'gold';
            this.game.VAR.goldMine.removeUserFromMine();
            this.leaveBuilding(this.game.VAR.town, 2, startPos, 0, 800);
        })
    }

    inTown(nextStep, startPos) {
        if (this.game.VAR.sellectedObj && this.objID === this.game.VAR.sellectedObj.objID) {
            this.game.VAR.hudLeft.infoBox.hide();
            this.game.VAR.hudLeft.actionBox.hide();
            // this.game.VAR.hudLeft.hideActions();
            // this.game.VAR.hudLeft.hideDescription();
            // this.game.VAR.hudLeft.infoName.used = false;
            // this.game.VAR.hudLeft.infoIcon.used = false;
            // this.game.VAR.hudLeft.descriptionsInfoBorder.used = false;
            this.buildingPut.hide();
        }

        this.unSelectedBorder();

        this.inBuilding = true;
        this.isRender = false;

        this.x = startPos.x;
        this.y = startPos.y;
        this.restartPosition();

        if (this.cargo === 'gold') {
            this.game.VAR.settings.gold += this.game.VAR.settings.goldUpdateBy;
            this.game.VAR.hudTop.goldText.use(this.game.VAR.settings.gold);
        } else if (this.cargo === 'wood') {
            this.game.VAR.settings.wood += this.game.VAR.settings.woodUpdateBy;
            this.game.VAR.hudTop.woodText.use(this.game.VAR.settings.wood);
        }

        this.doInTime(2500, () => {
            if (this.cargo === 'gold') {
                this.cargo = 'empty';
                this.leaveBuilding(this.game.VAR.goldMine, 1, startPos, 0, 800);
            } else if (this.cargo === 'wood') {
                this.cargo = 'empty';
                this.leaveBuilding(this.inForestPos, 1, startPos, 0, 800);
                // endPos = this.inForestPos;
            }
        })
    }

    inForest(nextStep, startPos) {
        // this.game.VAR.map.reRenderTile(startPos.row, startPos.column, 2);
        this.inForestPos = { x: this.x, y: this.y, column: nextStep.y, row: nextStep.x };

        if (this.cargo === 'wood' || this.cargo === 'gold') {
            // let endPos = this.game.VAR.map.getTileBySprite(this.game.VAR.town);
            // const currentPos = this.game.VAR.map.getTileBySprite(this);

            // if (endPos.column >= currentPos.column) {
            //     endPos = { ...endPos, column: endPos.column - 1 }
            // }
            // if (endPos.row > currentPos.row) {
            //     endPos = { ...endPos, row: endPos.row - 1 }
            // }
            // this.move(endPos);
            // this.showBorder();
            this.goToBuilding(this.game.VAR.town, 2);
        } else {
            if (this.chopSound) {
                this.chopSound.destroy();
            }
            this.treeSound(1);
            this.inWooding = true;
            this.getAnimationInMove(startPos, nextStep);

            this.doInTime(13000, () => {
                this.cargo = 'wood';
                this.inWooding = false;
                this.goToBuilding(this.game.VAR.town, 2);
            })
        }
    }

    goAndCreateBuilding(_endPos, callback) {
        let endPos = _endPos;
        this.startPos = this.game.VAR.map.getTileBySprite(this);

        this.myCurrentPath = this.game.easystar.findPath(this.startPos.row, this.startPos.column, endPos.row, endPos.column, (newPath) => {
            this.path = newPath;
            if (newPath === null) {
                console.log("Path was not found.");
            } else {
                if (newPath.length > 0) {

                    newPath.shift();
                    this.nextStep = newPath.shift();
                    // this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 20);

                    this.nextTile = this.game.VAR.map.getTile(this.nextStep.x, this.nextStep.y);
                    this.currentTile = this.game.VAR.map.getTile(this.startPos.row, this.startPos.column);

                    this.getAnimationInMove(this.startPos, this.nextStep);

                    if (this.nextTile.type === 'town' && this.cargo === 'empty') {
                        this.nextTile.type = 'town';
                        return this.move(endPos);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'town' && this.cargo === 'empty') {
                        this.currentTile.type = 'town';
                        return this.move(endPos);
                    }

                    if (this.nextTile.type === 'gold' && this.cargo === 'gold') {
                        this.nextTile.type = 'gold';
                        return this.move(endPos);
                        // this.game.VAR.pathfinder.reRenderTile(this.startPos.row, this.startPos.column, 1);
                    }
                    if (this.currentTile.type === 'gold' && this.cargo === 'gold') {
                        this.currentTile.type = 'gold';
                        return this.move(endPos);
                    }

                    this.currentTile.type = 'solid';

                    if (this.nextTile.type === 'solid') {
                        this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 200);
                        this.dir = `idle${this.dir.slice(4)}`;
                        if (newPath.length === 0) {
                            this.currentTile.type = 'solid';
                            this.nextTile = null;
                            this.dir = `idle${this.dir.slice(4)}`;

                            return false;
                        }
                        return this.move(endPos);
                    }

                    this.nextTile.type = 'solid';

                    this.moveToPoint({
                        x: this.nextStep.x * 32, y: this.nextStep.y * 32, speed: this.speed, callback: () => {
                            this.game.easystar.setAdditionalPointCost(this.startPos.row, this.startPos.column, 1);
                            this.currentTile.type = 'empty';
                            if (newPath.length > 0) {
                                this.goAndCreateBuilding(_endPos, callback);
                            } else {
                                this.dir = `idle${this.dir.slice(4)}`;
                                this.nextTile.type = 'empty';
                                if (this.game.VAR.sellectedObj && this.objID === this.game.VAR.sellectedObj.objID) {
                                    this.game.VAR.hudLeft.infoBox.hide();
                                    this.game.VAR.hudLeft.actionBox.hide();
                                }
                                // this.used = false;
                                // this.unSelectedBorder();
                                // this.unSelectedBorder();
                                return callback(this);
                                // this.nextTile.type = 'solid';
                                // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 500);
                                // this.game.VAR.pathfinder.reRenderTile(this.nextStep.x, this.nextStep.y, 3);
                                // this.game.easystar.setAdditionalPointCost(this.nextStep.x, this.nextStep.y, 20);

                            }
                        }
                    })
                }
            }
        })
        this.game.easystar.calculate();
    }

    treeSound(index) {
        if (!this.AssetManager.getSrc(`S_chopTree${index}`)) {
            index = 1;
        }

        this.chopSound = this.AssetManager.play(`S_chopTree${index}`, { duration: 600, volume: !this.isOutOfScreen ? 0.5 : 0 })
        this.chopSound.on("complete", () => {
            if (this.inWooding) {
                this.treeSound(index + 1);
            }
        })
    }

    goToBuilding(building, index = 1) {
        // this.restartPosition();
        if (building.update) {
            this.move(null, building, index);
        } else {
            this.move(building);
        }
    }

    leaveBuilding(building, index = 1, startPos, firstTime, nextTime) {
        this.doInTime(firstTime, () => {
            if (this.game.VAR.map.getTile(startPos.row, startPos.column).type !== 'solid') {
                this.isRender = true;
                this.inBuilding = false;

                this.goToBuilding(building, index);
            } else {
                this.leaveBuilding(building, index, startPos, nextTime, nextTime);
            }
        })
    }

}
export default Peasant;