import Sprite from './Sprite';
import Image from './Image';
// import TileSprite from './TileSprite';
import Rect from './Rect';
import Text from './Text';
import Button from './Button';
import Bar from './Bar';
import Camera from './Camera';
import Dialog from './Dialog';

import Point from './Point';
import Circle from './Circle';
import InRange from './InRange';
// import DialogImg from './DialogImg';
// import Particles from './Particles';
// import ButtonImg from './ButtonImg';
// import Grid from './Grid';
import Particles from './Particles';
import Multiplayer from './Multiplayer';
import Map from './Map';
import Pool from './Pool';
import Group from './Group';


class GameObjectFactory {

    constructor(game) {
        this.game = game;
    }

    sprite(options) {
        return new Sprite(this.game, options);
    }

    image(options) {
        return new Image(this.game, options);
    }

    pool(options) {
        return new Pool(this.game, options);
    }

    group() {
        return new Group(this.game);
    }

    point(options) {
        return new Point(this.game, options);
    }

    circle(options) {
        return new Circle(this.game, options);
    }

    particles(options) {
        return new Particles(this.game, options);
    }

    inRange(options) {
        return new InRange(this.game, options);
    }


    // tileSprite(context, x, y, key, w, h) {
    //     return new TileSprite(this.game, false, context, x, y, key, w, h);
    // }

    // particles(x, y, options) {
    //     return new Particles(this.game, x, y, options);
    // }

    button(options) {
        return new Button(this.game, options);
    }

    // buttonImg(context, key, keyHover, x, y, width, height, action) {
    //     return new ButtonImg(this.game, false, context, key, keyHover, x, y, width, height, action);
    // }

    rect(options) {
        return new Rect(this.game, options);
    }

    map(options) {
        return new Promise((resolve, reject) => {
            const map = new Map(this.game, options);
            map.getJson(map.jsonPath)
                .then((mapa) => {
                    map.setMapData(mapa);
                    const twoDimensionalLayers = map.generateTwoDimensionalLayers(mapa);
                    map.mapTilesLayers = map.generateTilesAndEmptyArrays(twoDimensionalLayers);
                    map.generateMapAsImage(map.mapTilesLayers);
                    return resolve(map)
                })

        })
    }

    // grid(context, count, width) {
    //     return new Grid(this.game, context, count, width);
    // }

    multiplayer(ip) {
        this.game.multiplayer = new Multiplayer(this.game, ip);
        return this.game.multiplayer;
    }

    text(options) {
        return new Text(this.game, options);
    }

    bar(options) {
        return new Bar(this.game, options);
    }

    camera(options) {
        this.game.camera = new Camera(this.game, options);
        return this.game.camera;
    }

    dialog(options) {
        return new Dialog(this.game, options);
    }

    // dialogImg(x, y, width, height, key, close) {
    //     return new DialogImg(this.game, x, y, width, height, key, close);
    // }

    // sounds(sounds) {
    //     return this.game.sounds = sounds;
    // }

    // toMulti(obj) {
    //     let o = {
    //         x: obj.x,
    //         y: obj.y,
    //         vx: obj.body.velocity.x,
    //         vy: obj.body.velocity.y,
    //         key: obj.key,
    //         w: obj.currentWidth,
    //         h: obj.currentHeight,
    //         states: obj.states,
    //         state: obj.state,
    //         type: obj.type,
    //         oClass: obj.oClass,
    //         angle: obj.body.angle,
    //         arguments: obj._arguments
    //     }
    //     this.game.multiplayer.emit('add object', o, function (ID, sockID, room) {
    //         obj.ID = ID;
    //         obj.sockID = sockID;
    //         obj.room = room;
    //     });
    // }

}

export default GameObjectFactory;