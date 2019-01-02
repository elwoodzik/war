import Units from "../Units";
import Animations from "./Animations";
import Sounds from "./Sounds";
import Farm from "../../Buildings/Farm/Farm";

class Peasant extends Units {
    constructor(game, options) {
        super(game, options);

        this.type = 'worker';

        this.inBuilding = false;
        this.dir = 'idle_up';
        this.cargo = 'empty';
        this.inForestPos = {};
        this.speed = 60;

        this.info = {
            imageKey: 'peasant',
            name: 'Chłop',
            descriptios: [
                'opis',
                'opis',
                'opis'
            ],
            inProgress: false,
            inProgressTime: 0,

            actions: [
                {
                    key: 'farm',
                    onActionHover: this.onActionHover,
                    woodCost: 100,
                    goldCost: 500,
                    time: 13000,
                    onBuild: this.onActionBuild,
                    create: {
                        class: Farm,
                        key: 'buildings',
                        name: 'Farmę'
                    },
                },
                {
                    key: 'barracks',
                    onActionHover: this.onActionHover,
                    woodCost: 0,
                    goldCost: 400,
                    time: 13000,
                    onBuild: this.onActionBuild,
                    create: {
                        class: Peasant,
                        key: 'peasant',
                        name: 'Koszary'
                    },
                },
                {
                    key: 'lumber_mill',
                    onActionHover: this.onActionHover,
                    woodCost: 0,
                    goldCost: 400,
                    time: 13000,
                    onBuild: this.onActionBuild,
                    create: {
                        class: Peasant,
                        key: 'peasant',
                        name: 'Tartak'
                    },
                },
                {
                    key: 'blacksmith',
                    onActionHover: this.onActionHover,
                    woodCost: 0,
                    goldCost: 400,
                    time: 13000,
                    onBuild: this.onActionBuild,
                    create: {
                        class: Peasant,
                        key: 'peasant',
                        name: 'Kuźnia'
                    },
                },
            ],
        }


        new Animations(this);
        this.sounds = new Sounds();
    }

    update(dt) {
        super.update(dt);
    }

    onActionHover = (action) => {
        return `Buduj ${action.create.name}.                                                                           ${action.goldCost}                              ${action.woodCost} `;
    }

    onActionBuild = (action) => {
        if (this.game.VAR.settings.gold >= action.goldCost && this.game.VAR.settings.wood >= action.woodCost) {
            this.game.VAR.buildingPut.dir = action.key;
            this.game.VAR.buildingPut.used = true;

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