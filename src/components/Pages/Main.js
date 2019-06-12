
import EasyStar from 'easystarjs';
import Peasant from "../Units/Peasant/Peasant";
import Town from "../Buildings/Town/Town";
import GoldMine from "../Buildings/GoldMine/GoldMine";

import HudTop from "../Hud/HudTop/HudTop";
import HudRight from "../Hud/HudRight/HudRight";
import HudBottom from "../Hud/HudBottom/HudBottom";
import TextError from "../Hud/TextError";
import Farm from '../Buildings/Farm/Farm';
import Barracks from '../Buildings/Barracks/Barracks';
import LumberMill from '../Buildings/LumberMill/LumberMill';
import Blacksmith from '../Buildings/Blacksmith/Blacksmith';
// import BuildingPut from '../Hud/BuildingPut';
import HudLeft from '../Hud/HudLeft/HudLeft';
import Warrior from '../Units/Warrior/Warrior';
import Grunt from '../AI/Units/Peasant/Peasant';
import Archer from '../Units/Archer/Archer';


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
                gold: 200000, //1500,
                goldUpdateBy: 100,
                wood: 500000,
                woodUpdateBy: 100,
                homeMax: 400,
                people: [],
                requirements: {
                    lumbermill: false,
                },
                buildSpeed: 44, //default 1
                timeInMine: 4500,
                timeInTown: 2500,
                timeInForest: 1000,//15000
                unitsSpeed: 1.5
            }

            this.game.VAR.hudTop = new HudTop(this.game, { zIndex: 50 });
            this.game.VAR.hudRight = new HudRight(this.game, { zIndex: 50 });
            this.game.VAR.hudBottom = new HudBottom(this.game, { zIndex: 50 });
            this.game.VAR.hudLeft = new HudLeft(this.game, { zIndex: 50 });
            this.game.VAR.textError = new TextError(this.game, { zIndex: 50 });

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

            // this.game.VAR.settings.people.push(new Peasant(this.game, {
            //     key: 'peasant',
            //     x: 32 * 3,
            //     y: 32 * 12
            // }));

            // this.game.VAR.settings.people.push(new Peasant(this.game, {
            //     key: 'peasant',
            //     x: 32 * 14,
            //     y: 32 * 13
            // }));

            this.game.VAR.settings.people.push(new Peasant(this.game, {
                key: 'peasant',
                x: 32 * 14,
                y: 32 * 14
            }));

            // this.game.VAR.settings.people.push(new Warrior(this.game, {
            //     key: 'warrior',
            //     x: 32 * 14,
            //     y: 32 * 12
            // }));
            const grunt = new Grunt(this.game, {
                key: 'peasant',
                x: 32 * 12,
                y: 32 * 8
            });

            // this.game.VAR.settings.people.push(new Archer(this.game, {
            //     key: 'archer',
            //     x: 32 * 7,
            //     y: 32 * 12
            // }));

            this.game.VAR.town = new Town(this.game, {
                key: 'buildings',
                x: 32 * 15,
                y: 32 * 12
            })


            // new Farm(this.game, {
            //     key: 'gold',
            //     x: 32 * 15,
            //     y: 32 * 9,
            //     completed: true
            // })

            // new Farm(this.game, {
            //     key: 'buildings',
            //     x: 32 * 18,
            //     y: 32 * 9,
            //     completed: true
            // })

            // new Barracks(this.game, {
            //     key: 'buildings',
            //     x: 32 * 14,
            //     y: 32 * 17,
            //     completed: true
            // })

            // new LumberMill(this.game, {
            //     key: 'buildings',
            //     x: 32 * 18,
            //     y: 32 * 5,
            //     completed: true
            // })

            // new Blacksmith(this.game, {
            //     key: 'buildings',
            //     x: 32 * 21,
            //     y: 32 * 5,
            //     completed: true
            // })

            this.game.VAR.goldMine = new GoldMine(this.game, {
                key: 'gold',
                x: 32 * 2,
                y: 32 * 7
            })

            this.game.easystar.setGrid(this.game.VAR.map.mapTilesLayers[0].pathfinder);
            // grunt.move(null, this.game.VAR.town)
            // grunt.move({ row: 5, column: 25 })
            for (let i = 0; i < 5; i++) {
                const pes = new Peasant(this.game, {
                    key: 'peasant',
                    x: 32 * (i + 6),
                    y: 32 * 13
                });
                // pes.pathMove.move(pes.pathMove.findShortPathToBuilding(this.game.VAR.goldMine));
                this.game.VAR.settings.people.push(pes);

            }
            for (let i = 0; i < 5; i++) {
                const pes = new Peasant(this.game, {
                    key: 'peasant',
                    x: 32 * (i + 6),
                    y: 32 * 14
                });
                // pes.pathMove.move(pes.pathMove.findShortPathToBuilding(this.game.VAR.goldMine));
                this.game.VAR.settings.people.push(pes);

            }
            for (let i = 0; i < 5; i++) {
                const pes = new Peasant(this.game, {
                    key: 'peasant',
                    x: 32 * (i + 6),
                    y: 32 * 15
                });
                // pes.pathMove.move(pes.pathMove.findShortPathToBuilding(this.game.VAR.goldMine));
                this.game.VAR.settings.people.push(pes);

            }

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
                console.log(this.game.gameObjects.length)
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
                this.game.VAR.sellectedObj.isAttacking = false;
                // this.game.VAR.sellectedObj.pathMove.restartPosition();
                this.game.VAR.sellectedObj.pathMove.move(endPos);
            }
        }, false)
    }

    leftMouseClick() {
        this.game.mouse.trigger((mouse) => {
            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objectType === 'unit' && this.game.VAR.sellectedObj.buildingPut.used) {
                const canPut = this.game.VAR.sellectedObj.buildingPut.canPut();
                if (canPut) {
                    this.game.VAR.sellectedObj.buildingPut.used = false;
                    this.game.VAR.sellectedObj.buildingPut.border.used = false;

                    this.game.VAR.hudLeft.cancelBox.used = false;
                    this.game.VAR.hudLeft.set(this.game.VAR.sellectedObj.info);
                    const endPos = this.game.VAR.map.getTileByMouse();
                    const tile = this.game.VAR.map.getTileByMouse();
                    //
                    this.game.VAR.sellectedObj.getRandomMoveSound();
                    this.game.VAR.sellectedObj.pathMove.restartPosition();
                    const worker = this.game.VAR.sellectedObj;

                    worker.pathMove.move(endPos, (pathMove, peaseant) => {
                        if (this.game.VAR.settings.gold >= peaseant.buildingPut.action.goldCost && this.game.VAR.settings.wood >= peaseant.buildingPut.action.woodCost) {

                            peaseant.dir = `idle${peaseant.dir.slice(4)}`;
                            pathMove.nextTile.type = 'empty';

                            if (this.game.VAR.sellectedObj && peaseant.objID === this.game.VAR.sellectedObj.objID) {
                                peaseant.buildingPut.hide();
                                this.game.VAR.hudLeft.infoBox.hide();
                                this.game.VAR.hudLeft.actionBox.hide();
                            }

                            const canPut = peaseant.buildingPut.canPut();
                            if (canPut) {
                                peaseant.used = false;
                                peaseant.unSelectedBorder();
                                peaseant.buildingPut.building(tile, peaseant);
                            } else {
                                pathMove.nextTile.type = 'solid';
                            }
                        } else {
                            this.game.VAR.textError.display('resources');

                        }
                    });
                }
            }
        }, false)
    }
};

export default Main;
