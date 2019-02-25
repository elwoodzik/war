import Rect from "../../../../lib/Rect";
import InfoBox from "./modules/InfoBox/InfoBox";

import ActionBox from "./modules/ActionBox/ActionBox";
import CreationBox from "./modules/CreationBox/CreationBox";
import CancelBox from "./modules/CancelBox/CancelBox";

class HudLeft extends Rect {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = 0;
        this.y = 0;
        this.width = 32 * 5 + 1;
        this.height = this.game.height;
        this.fill = 'gray';
        this.static = true;
        this.inProgress = false;

        this.infoBox = new InfoBox(game);
        this.actionBox = new ActionBox(game);
        this.creationBox = new CreationBox(game);
        this.cancelBox = new CancelBox(game, {
            key: 'icons',
        });

        // this.infoName = this.game.add.text({
        //     text: ' ',
        //     x: 60,
        //     y: 45,
        //     // asImage: true,
        //     static: true,
        //     fontSize: 18,
        //     zIndex: 51
        // })


        // this.infoIcon = new Icons(this.game, {
        //     key: 'icons',
        //     used: false,
        //     zIndex: 51
        // })

        // this.descriptionsInfoBorder = this.game.add.rect({
        //     width: 154,
        //     height: 175,
        //     x: 4,
        //     y: 20,
        //     fill: null,
        //     strokeColor: 'black',
        //     zIndex: 51,
        //     static: true,
        //     used: false,
        // })
        // this.descriptionsInfo = [];

        // for (let i = 0; i < 5; i++) {
        //     this.descriptionsInfo.push(
        //         this.game.add.text({
        //             x: -500,
        //             y: 80,
        //             static: true,
        //             fontSize: 18,
        //             text: 'test',
        //             zIndex: 51,
        //             // asImage: true,
        //         })
        //     )
        // }

        // this.actions = [];

        // for (let i = 0; i < 10; i++) {
        //     this.actions.push(
        //         new Action(this.game, {
        //             key: 'icons',
        //             used: false,
        //             zIndex: 51
        //         })
        //     )
        // }

        // this.cancelIcon = new Action(this.game, {
        //     key: 'icons',
        //     used: false,
        //     zIndex: 51,
        //     x: 5,
        //     y: 200
        // })

        // this.cancelIcon.animations.play({ key: 'cancel' });
        // this.cancelIcon.currentAction = {
        //     onActionClick: () => {
        //         this.game.VAR.buildingPut.used = false;
        //         this.cancelIcon.used = false;
        //         this.showActions(this.game.VAR.sellectedObj.info.actions);
        //     }
        // }

        // this.creationBar = this.game.add.bar({
        //     min: 0,
        //     max: 100,
        //     height: 25,
        //     static: true,
        //     x: 7,
        //     y: 166,
        //     used: true,
        //     zIndex: 51,
        //     width: 148
        // })

        // this.creationBarText = this.game.add.text({
        //     x: 33,
        //     y: 185,
        //     static: true,
        //     fontSize: 18,
        //     text: '% ukończone',
        //     zIndex: 51,
        //     // asImage: true,
        //     used: true,
        // })

        // this.trainIcon = new Icons(this.game, {
        //     key: 'icons',
        //     used: false,
        //     zIndex: 51,
        //     x: 105,
        //     y: 110,
        // })

        // this.trainText = this.game.add.text({
        //     x: 28,
        //     y: 125,
        //     static: true,
        //     fontSize: 18,
        //     text: 'Trenuje:',
        //     zIndex: 51,
        //     // asImage: true,
        //     used: false,
        // })
    }

    update(dt) {
        super.update(dt);
    }

    set(info) {
        this.infoBox.set(info);
        this.actionBox.set(info.actions);
    }

    onClick() {
        return false;
    }

    onRightClick() {
        return false;
    }
}
export default HudLeft;