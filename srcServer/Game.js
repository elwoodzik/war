
import Multiplayer from './lib/Multiplayer';

import GameObjectFactory from './GameLib/GameObjectFactory';
import Physic from './GameLib/Physic';
import Math from 'mathjs';

import Field from './components/Field';

const tickLengthMs = 1000 / 60;

let previousTick = Date.now();
let actualTicks = 0;

class Game {

    constructor(io) {
        this.gameObjects = [];
        this.playersObjects = {};

        this.add = new GameObjectFactory(this);

        this.physic = new Physic(this);

        this.GROUP = {};

        this.initialize(io);
    }

    initialize(io) {
        this.multiplayer = new Multiplayer(io, this);

        this.gameLoop.call(this);



        this.multiplayer.socket.initializeSockets((socket) => {
            socket.on('setSow', this.setSow.bind(this, socket));
            socket.on('setWater', this.setWater.bind(this, socket));
            socket.on("game start", this.onGameStart.bind(this, socket));

            clearInterval(this.interval);

            this.interval = setInterval(() => {
                const fields = [];

                if (this.GROUP.fields) {
                    this.GROUP.fields.forEach((field) => {
                        if (field.type === 'filed_waterSow' && field.currentGrowTime < field.growTime) {
                            field.growUp();
                            fields.push({ id: field.id, currentGrowTime: field.currentGrowTime });
                        }
                    })
                }
                console.log(fields)
                this.multiplayer.socket.emitToMe('growUp', socket, { fields: fields });
            }, 1000)
        });
    }

    onGameStart(socket, callback) {
        const sendData = {};
        this.GROUP.fields = this.createFields(15);
        sendData['fields'] = this.GROUP.fields
        callback(sendData);
    }

    setSow(socket, data, callback) {
        const field = this.findById(data.id, this.GROUP.fields);
        if (field) {
            field.setSow();
            callback({ active: true });
        } else {
            callback({ active: false });
        }
    }

    setWater(socket, data, callback) {
        const field = this.findById(data.id, this.GROUP.fields);
        if (field) {
            field.setWater();
            callback({ active: true });
        } else {
            callback({ active: false });
        }
    }

    createFields(count) {
        const array = [];
        let x = 10;
        let y = 5;

        for (let i = 0; i < count; i++) {
            if (i % 6 === 0 && i != 0) {
                x = 10;
                y += 2;
            }
            array.push(new Field({
                x: 32 * x,
                y: 32 * y + 10
            }))
            x += 2;
        }
        return array;
    }

    findById(id, group) {
        for (let i = 0; i < group.length; i++) {
            if (group[i].id === id) {
                return group[i];
            }
        }
        return false;
    }

    gameLoop() {
        // let now = Date.now();

        // actualTicks++;
        // if (previousTick + tickLengthMs <= now) {
        //     let dt = (now - previousTick) / 1000;
        //     previousTick = now;
        //     this.update(dt);
        //     actualTicks = 0;
        // }

        // if (Date.now() - previousTick < tickLengthMs - 16) {
        //     setTimeout(this.gameLoop.bind(this));
        // } else {
        //     setImmediate(this.gameLoop.bind(this));
        // }
        let lastUpdate = Date.now();

        setInterval(() => {
            let now = Date.now();
            let dt = (now - lastUpdate) / 1000;
            lastUpdate = now;

            this.update(dt);
        }, 1000 / 60);
    }

    update(dt) {
        for (let i = 0, max = this.gameObjects.length; i < max; i++) {
            const entity = this.gameObjects[i];
            if (entity && entity.used) {
                entity.update(dt);
            }
        }
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

export default Game;