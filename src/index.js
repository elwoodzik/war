import Leya from '../lib/Leya';
import Main from './components/Pages/Main';
import Start from './components/Pages/Start/Start';

class Game {

    constructor() {
        const gameWidth = 960;
        const gameHeight = 540;
        const orientation = false; //false -> vertical, true -> horizontal (obecnie 'horizontal' jest nie obslugiwany!!!)
        const scallable = true;
        const mobile = false;
        const assets = {
            // world: 'images/world_summer.png',
            world: 'images/world_summer.png',
            peasant: 'images/peasant.png',
            chop: 'images/chop.png',
            buildings: 'images/buildings.png',
            gold: 'images/gold.png',
            icons: 'images/icons.png',
            gold_icon: 'images/gold_icon.png',
            wood_icon: 'images/wood_icon.png',
            home_icon: 'images/home_icon.png',
            S_peasantSelected1: 'sounds/selected1.wav',
            S_peasantSelected2: 'sounds/selected2.wav',
            S_peasantSelected3: 'sounds/selected3.wav',
            S_peasantSelected4: 'sounds/selected4.wav',
            S_peasantMove1: 'sounds/peasant_move1.wav',
            S_peasantMove2: 'sounds/peasant_move2.wav',
            S_peasantMove3: 'sounds/peasant_move3.wav',
            S_peasantMove4: 'sounds/peasant_move4.wav',
            S_peasant_created: 'sounds/peasant_created.wav',
            S_mineSelected: 'sounds/mine.wav',
            S_click: 'sounds/click2.mp3',
            S_chopTree1: 'sounds/tree1.wav',
            S_chopTree2: 'sounds/tree2.wav',
            S_chopTree3: 'sounds/tree3.wav',
            S_chopTree4: 'sounds/tree4.wav',
        }

        new Leya(gameWidth, gameHeight, orientation, scallable, mobile, assets)
            .then((game) => this.create(game))
    }

    create(game) {
        game.keyboard.initialize();
        game.mouse.initialize();
        game.mouse.enableHover();
        game.showFPS();
        game.state.add('Main', Main);
        game.state.add('Start', Start);
        game.state.start('Start');
    }
};

export default new Game();