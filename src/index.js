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
            warrior: 'images/warrior.png',
            archer: 'images/archer.png',
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
            S_farm: 'sounds/farm.wav',
            S_lumbermill: 'sounds/lumber-mill.wav',
            S_blacksmith: 'sounds/blacksmith.wav',
            S_workComplete: 'sounds/work-complete.wav',
            S_warriorSelected1: 'sounds/warrior_select1.wav',
            S_warriorSelected2: 'sounds/warrior_select2.wav',
            S_warriorSelected3: 'sounds/warrior_select3.wav',
            S_warriorSelected4: 'sounds/warrior_select4.wav',
            S_warriorSelected5: 'sounds/warrior_select5.wav',
            S_warriorSelected6: 'sounds/warrior_select6.wav',
            S_warriorMove1: 'sounds/warrior_move1.wav',
            S_warriorMove2: 'sounds/warrior_move2.wav',
            S_warriorMove3: 'sounds/warrior_move3.wav',
            S_warriorMove4: 'sounds/warrior_move4.wav',
            S_warrior_created: 'sounds/warrior_created.wav',
            S_archerSelected1: 'sounds/archer_select1.wav',
            S_archerSelected2: 'sounds/archer_select2.wav',
            S_archerSelected3: 'sounds/archer_select3.wav',
            S_archerSelected4: 'sounds/archer_select4.wav',
            S_archerMove1: 'sounds/archer_move1.wav',
            S_archerMove2: 'sounds/archer_move2.wav',
            S_archerMove3: 'sounds/archer_move3.wav',
            S_archerMove4: 'sounds/archer_move4.wav',
            S_archer_created: 'sounds/archer_created.wav',
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