
import EasyStar from 'easystarjs';
import Peasant from "../Units/Peasant/Peasant";
import Town from "../Buildings/Town/Town";
import GoldMine from "../Buildings/GoldMine/GoldMine";

import HudTop from "../Hud/HudTop";
import HudRight from "../Hud/HudRight";
import HudBottom from "../Hud/HudBottom";
import TextError from "../Hud/TextError";
import Farm from '../Buildings/Farm/Farm';
import Barracks from '../Buildings/Barracks/Barracks';
import LumberMill from '../Buildings/LumberMill/LumberMill';
import Blacksmith from '../Buildings/Blacksmith/Blacksmith';
import BuildingPut from '../Hud/BuildingPut';
import HudLeft from '../Hud/HudLeft/HudLeft';


class Main {

    constructor(game) {
        this.game = game;
    }

    create() {
        this.game.add.map({
            key: 'world',
            json: '../../jsons/map2.json',
        }).then((map) => {
            this.game.VAR.map = map;

            this.game.VAR.settings = {
                gold: 5100,
                goldUpdateBy: 100,
                wood: 100,
                woodUpdateBy: 100,
                homeMax: 4,
                people: []
            }

            this.game.VAR.hudTop = new HudTop(this.game, { zIndex: 50 });
            this.game.VAR.hudRight = new HudRight(this.game, { zIndex: 50 });
            this.game.VAR.hudBottom = new HudBottom(this.game, { zIndex: 50 });
            this.game.VAR.hudLeft = new HudLeft(this.game, { zIndex: 50 });
            this.game.VAR.textError = new TextError(this.game, { zIndex: 50 });
            this.game.VAR.buildingPut = new BuildingPut(this.game, { key: 'buildings', zIndex: 49 });

            this.game.VAR.hudTop.goldText.use(this.game.VAR.settings.gold);
            this.game.VAR.hudTop.woodText.use(this.game.VAR.settings.wood);
            this.game.VAR.hudTop.homeTextMax.use(this.game.VAR.settings.homeMax);

            this.game.easystar = new EasyStar.js();
            this.game.easystar.setAcceptableTiles([266, 349, 116, 117, 137]);
            this.game.easystar.enableDiagonals();
            this.game.easystar.enableCornerCutting();

            this.game.VAR.cameraMan = this.game.add.rect({
                x: 350,
                y: 200,
                width: 20,
                height: 20,
                isRender: false
            });

            this.game.VAR.cameraMan.cameraSpeed = 1100;

            this.game.setPortView(2240, 2240);

            this.game.add.camera({
                followed: this.game.VAR.cameraMan
            })

            this.game.VAR.settings.people.push(new Peasant(this.game, {
                key: 'peasant',
                x: 32 * 5,
                y: 32 * 10
            }));

            this.game.VAR.town = new Town(this.game, {
                key: 'buildings',
                x: 32 * 15,
                y: 32 * 12
            })

            new Farm(this.game, {
                key: 'gold',
                x: 32 * 15,
                y: 32 * 9,
                // completed: true
            })

            new Farm(this.game, {
                key: 'buildings',
                x: 32 * 18,
                y: 32 * 9,
                completed: true
            })

            new Barracks(this.game, {
                key: 'buildings',
                x: 32 * 14,
                y: 32 * 5,
                completed: true
            })

            new LumberMill(this.game, {
                key: 'buildings',
                x: 32 * 18,
                y: 32 * 5,
                completed: true
            })

            new Blacksmith(this.game, {
                key: 'buildings',
                x: 32 * 21,
                y: 32 * 5,
                completed: true
            })

            this.game.VAR.goldMine = new GoldMine(this.game, {
                key: 'gold',
                x: 32 * 2,
                y: 32 * 7
            })

            this.game.easystar.setGrid(this.game.VAR.map.mapTilesLayers[0].pathfinder);

            // for (let i = 0; i < 15; i++) {
            //     const pes = new Peasant(this.game, {
            //         key: 'peasant',
            //         x: 32 * (i + 3),
            //         y: 32 * 19
            //     });
            //     pes.move(null, this.game.VAR.goldMine, 1);
            //     this.game.VAR.settings.people.push(pes);

            // }

            // for (let i = 0; i < 15; i++) {
            //     const pes = new Peasant(this.game, {
            //         key: 'peasant',
            //         x: 32 * (i + 3),
            //         y: 32 * 21
            //     });
            //     this.game.VAR.settings.people.push(pes);
            //     // pes.move(null, this.game.VAR.goldMine, 1);

            // }

            this.game.VAR.sellectedObj = null;
            this.game.VAR.sellectedBorder = this.game.add.rect({ fill: null, strokeColor: 'yellow', zIndex: 2 })
            this.game.VAR.sellectedBorder.hide();

            this.game.VAR.hudTop.homeTextCurrent.use(this.game.VAR.settings.people.length)
            this.rightMouseClick();
            this.leftMouseClick();
            this.game.sortByIndex();
        })
    }

    update(dt) {
        if (this.game.VAR.cameraMan) {
            if ((this.game.keyboard.trigger('D') || this.game.keyboard.trigger('right')) && this.game.VAR.cameraMan.x <= this.game.portViewWidth - this.game.width / 2 + 21) {
                this.game.VAR.cameraMan.body.velocity.x = this.game.VAR.cameraMan.cameraSpeed;
            } else if ((this.game.keyboard.trigger('A') || this.game.keyboard.trigger('left')) && this.game.VAR.cameraMan.x >= this.game.width / 2 - 32 * 5 + 1) {
                this.game.VAR.cameraMan.body.velocity.x = -this.game.VAR.cameraMan.cameraSpeed;
            } else {
                this.game.VAR.cameraMan.body.velocity.x = 0
            }
            if ((this.game.keyboard.trigger('W') || this.game.keyboard.trigger('up')) && this.game.VAR.cameraMan.y >= this.game.height / 2 - 21) {
                this.game.VAR.cameraMan.body.velocity.y = -this.game.VAR.cameraMan.cameraSpeed;
            } else if ((this.game.keyboard.trigger('S') || this.game.keyboard.trigger('down')) && this.game.VAR.cameraMan.y <= this.game.portViewHeight - this.game.height / 2 + 21) {
                this.game.VAR.cameraMan.body.velocity.y = this.game.VAR.cameraMan.cameraSpeed;
            } else {
                this.game.VAR.cameraMan.body.velocity.y = 0;
            }
        }

        // const tile = this.game.VAR.map.getTileByCords(this.game.mouse.mouseX + this.game.camera.xScroll, this.game.mouse.mouseY + this.game.camera.yScroll);
        // console.log(tile.id)
    }

    rightMouseClick() {
        this.game.mouse.triggerRight((mouse) => {
            // this.game.VAR.pathfinder.reRenderTile(Math.floor(this.game.mouse.mouseX / 32), Math.floor(this.game.mouse.mouseY / 32), 6);
            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objectType === 'unit') {
                const endPos = this.game.VAR.map.getTileByMouse();

                if (this.game.VAR.sellectedObj.inWooding) {
                    this.game.VAR.sellectedObj.doInTimeStop();
                    this.game.VAR.sellectedObj.inWooding = false;
                }

                this.game.VAR.sellectedObj.getRandomMoveSound();
                this.game.VAR.sellectedObj.restartPosition();
                this.game.VAR.sellectedObj.move(endPos);
            }
        }, false)
    }

    leftMouseClick() {
        this.game.mouse.trigger((mouse) => {
            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objectType === 'unit' && this.game.VAR.buildingPut.used) {
                const canPut = this.game.VAR.buildingPut.canPut();
                if (canPut) {
                    this.game.VAR.buildingPut.used = false;
                    this.game.VAR.buildingPut.border.used = false;

                    this.game.VAR.hudLeft.cancelIcon.used = false;
                    this.game.VAR.hudLeft.showActions(this.game.VAR.sellectedObj.info.actions);
                    const endPos = this.game.VAR.map.getTileByMouse();
                    const tile = this.game.VAR.map.getTileByMouse();
                    //
                    this.game.VAR.sellectedObj.getRandomMoveSound();
                    this.game.VAR.sellectedObj.restartPosition();

                    this.game.VAR.sellectedObj.goAndCreateBuilding(endPos, () => {
                        const canPut = this.game.VAR.buildingPut.canPut();
                        if (canPut) {
                            this.game.VAR.sellectedObj.used = false;
                            this.game.VAR.sellectedObj.unSelectedBorder();
                            const building = new this.game.VAR.buildingPut.action.create.class(this.game, {
                                key: 'gold',
                                x: tile.row * 32,
                                y: tile.column * 32,
                                zIndex: 11
                            });
                            this.game.sortByIndex();
                        }
                    });
                }
            }
        }, false)
    }
};

export default Main;
