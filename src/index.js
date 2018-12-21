import Leya from '../lib/Leya';
import Main from './components/Main';

class Game {

    constructor() {
        const gameWidth = 960;
        const gameHeight = 540;
        const orientation = false; //false -> vertical, true -> horizontal (obecnie 'horizontal' jest nie obslugiwany!!!)
        const scallable = true;
        const mobile = false;
        const images = {
            world: 'images/world_summer.png',
            peasant: 'images/peasant.png',
            chop: 'images/chop.png',
            buildings: 'images/buildings.png',
            gold: 'images/gold.png',
            icons: 'images/icons.png',
            gold_icon: 'images/gold_icon.png',
            wood_icon: 'images/wood_icon.png',
            home_icon: 'images/home_icon.png',
        }

        new Leya(gameWidth, gameHeight, orientation, scallable, mobile, images)
            .then((game) => this.create(game))
    }

    create(game) {
        game.keyboard.initialize();
        game.mouse.initialize();
        // game.mouse.enableHover();

        game.state.add('Main', Main);
        game.state.start('Main');
    }
};

export default new Game();