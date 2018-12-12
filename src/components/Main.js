import Pathfinder from "../../lib/Pathfinder";
import EasyStar from 'easystarjs';
import Map from "../../lib/Map";
import Peasant from "./Units/Peasant/Peasant";
import Town from "./Buildings/Town/Town";
import GoldMine from "./Buildings/GoldMine/GoldMine";
import Hud from "./Hud/Hud";


class Main {

    constructor(game) {
        this.game = game;
    }

    create() {
        new Map(this.game, {
            key: 'world',
            json: '../../jsons/map2.json'
        }).then((map) => {
            this.game.VAR.map = map;
            new Pathfinder(this.game, {
                json: '../../jsons/path2.json',
                isRender: true
            }).then((pathfinder) => {
                this.game.VAR.pathfinder = pathfinder;

                this.game.easystar = new EasyStar.js();
                this.game.easystar.setGrid(this.game.VAR.pathfinder.paths);
                this.game.easystar.setAcceptableTiles([6, 5, 4, 3, 1]);
                this.game.easystar.enableDiagonals();
                this.game.easystar.enableCornerCutting();

                this.game.VAR.cameraMan = this.game.add.rect({
                    x: 350,
                    y: 400,
                    width: 20,
                    height: 20
                });

                this.game.VAR.cameraSpeed = 700;

                this.game.setPortView(2240, 2240);
                this.game.add.camera({
                    followed: this.game.VAR.cameraMan
                })

                this.game.VAR.player = new Peasant(this.game, {
                    key: 'peasant',
                    x: 32 * 9,
                    y: 32 * 4
                });

                for (let i = 0; i < 20; i++) {
                    new Peasant(this.game, {
                        key: 'peasant',
                        x: 32 * i,
                        y: 32 * 12
                    });
                }
                for (let i = 0; i < 20; i++) {
                    new Peasant(this.game, {
                        key: 'peasant',
                        x: 32 * i,
                        y: 32 * 13
                    });
                }
                for (let i = 0; i < 20; i++) {
                    new Peasant(this.game, {
                        key: 'peasant',
                        x: 32 * i,
                        y: 32 * 14
                    });
                }

                this.game.VAR.town = new Town(this.game, {
                    key: 'buildings',
                    x: 32 * 13,
                    y: 32 * 11
                })

                this.game.VAR.goldMine = new GoldMine(this.game, {
                    key: 'gold',
                    x: 32 * 1,
                    y: 32 * 7
                })


                new Hud(this.game, {
                    x: 0,
                    y: 0,
                    width: 32 * 5,
                    height: this.game.height,
                    fill: 'gray',
                    static: true,

                })

                this.game.VAR.sellectedObj = null;
                this.game.VAR.sellectedBorder = this.game.add.rect({ fill: null, strokeColor: 'yellow', zIndex: 2 })
                this.game.VAR.sellectedBorder.hide();

                this.normalMouseClick();
                // this.mouseElement = {
                //     x: this.game.mouse.mouseX,
                //     y: this.game.mouse.mouseY,
                //     halfHeight: 1,
                //     halfWidth: 1
                // }
                // this.game.add.camera({
                //     followed: this.mouseElement///this.game.VAR.player
                // });

            })
        })
    }

    update(dt) {
        if (this.game.VAR.cameraMan) {
            if (this.game.keyboard.trigger('D') || this.game.keyboard.trigger('right')) {
                this.game.VAR.cameraMan.body.velocity.x = this.game.VAR.cameraSpeed;
            } else if (this.game.keyboard.trigger('A') || this.game.keyboard.trigger('left')) {
                this.game.VAR.cameraMan.body.velocity.x = -this.game.VAR.cameraSpeed;
            } else {
                this.game.VAR.cameraMan.body.velocity.x = 0
            }
            if (this.game.keyboard.trigger('W') || this.game.keyboard.trigger('up')) {
                this.game.VAR.cameraMan.body.velocity.y = -this.game.VAR.cameraSpeed;
            } else if (this.game.keyboard.trigger('S') || this.game.keyboard.trigger('down')) {
                this.game.VAR.cameraMan.body.velocity.y = this.game.VAR.cameraSpeed;
            } else {
                this.game.VAR.cameraMan.body.velocity.y = 0;
            }
        }

    }

    normalMouseClick() {
        this.game.mouse.trigger((mouse) => {
            // this.game.VAR.pathfinder.reRenderTile(Math.floor(this.game.mouse.mouseX / 32), Math.floor(this.game.mouse.mouseY / 32), 6);
            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.move) {
                const endPos = this.game.VAR.pathfinder.getTileByMouse();

                if (this.game.VAR.sellectedObj.inWooding) {
                    this.game.VAR.sellectedObj.doInTimeStop();
                    this.game.VAR.sellectedObj.inWooding = false;
                }

                this.game.VAR.sellectedObj.restartPosition();
                this.game.VAR.sellectedObj.move(endPos);
            }
        }, false)
    }
};

export default Main;
