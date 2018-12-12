// import Sprite from './Sprite';
import Image from './Image';
// import TileSprite from './TileSprite';
// import Rect from './Rect';
// import Text from './Text';
// import Button from './Button';
// import Bar from './Bar';
// import Camera from './Camera';
// import Dialog from './Dialog';
import Group from './Group';
// import DialogImg from './DialogImg';
// import Particles from './Particles';
// import ButtonImg from './ButtonImg';
// import Grid from './Grid';
// import Multiplayer from './Multiplayer';
import Map from './Map';


class GameObjectFactory {

    constructor(game) {
        this.game = game;
    }

    // sprite(options) {
    //     return new Sprite(this.game, options);
    // }

    image(options) {
        return new Image(this.game, options);
    }

    group(options) {
        return new Group(this.game, options);
    }

    // tileSprite(context, x, y, key, w, h) {
    //     return new TileSprite(this.game, false, context, x, y, key, w, h);
    // }

    // particles(x, y, options) {
    //     return new Particles(this.game, x, y, options);
    // }

    // button(options) {
    //     return new Button(this.game, options);
    // }

    // buttonImg(context, key, keyHover, x, y, width, height, action) {
    //     return new ButtonImg(this.game, false, context, key, keyHover, x, y, width, height, action);
    // }

    // rect(options) {
    //     return new Rect(this.game, options);
    // }

    map(options) {
        return new Promise((resolve, reject) => {
            const map = new Map(this.game, options);
            
            map.getJson(map.jsonPath)
                .then((mapa) => {
                    map.setMapData(mapa);
                    const twoDimensionalLayers = map.generateTwoDimensionalLayers(mapa);
                    map.mapTilesLayers = map.generateTilesAndEmptyArrays(twoDimensionalLayers);
                   
                    return resolve(map)
                })

        })
    }

    // grid(context, count, width) {
    //     return new Grid(this.game, context, count, width);
    // }

    // multiplayer(ip) {
    //     this.game.multiplayer = new Multiplayer(this.game, ip);
    //     return this.game.multiplayer;
    // }

    // text(options) {
    //     return new Text(this.game, options);
    // }

    // bar(options) {
    //     return new Bar(this.game, options);
    // }

    // camera(options) {
    //     this.game.camera = new Camera(this.game, options);
    //     return this.game.camera;
    // }

    // dialog(options) {
    //     return new Dialog(this.game, options);
    // }

}

export default GameObjectFactory;