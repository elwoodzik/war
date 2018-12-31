import Rect from "../../../lib/Rect";
import Icons from "./Icons";
import Action from "./Action";

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

        this.infoName = this.game.add.text({
            text: ' ',
            x: 60,
            y: 45,
            // asImage: true,
            static: true,
            fontSize: 18,
            zIndex: 51
        }).getProps()

        this.infoIcon = new Icons(this.game, {
            key: 'icons',
            used: false,
            zIndex: 51
        })

        this.descriptionsInfoBorder = this.game.add.rect({
            width: 154,
            height: 175,
            x: 4,
            y: 20,
            fill: null,
            strokeColor: 'black',
            zIndex: 51,
            static: true,
            used: false,
        })
        this.descriptionsInfo = [];

        for (let i = 0; i < 5; i++) {
            this.descriptionsInfo.push(
                this.game.add.text({
                    x: -500,
                    y: 80,
                    static: true,
                    fontSize: 18,
                    text: 'test',
                    zIndex: 51,
                    // asImage: true,
                })
            )
        }

        this.actions = [];

        for (let i = 0; i < 10; i++) {
            this.actions.push(
                new Action(this.game, {
                    key: 'icons',
                    used: false,
                    zIndex: 51
                })
            )
        }

        this.creationBar = this.game.add.bar({
            min: 0,
            max: 100,
            height: 25,
            static: true,
            x: 7,
            y: 166,
            used: false,
            zIndex: 51,
            width: 148
        })

        this.creationBarText = this.game.add.text({
            x: 33,
            y: 185,
            static: true,
            fontSize: 18,
            text: '% ukończone',
            zIndex: 51,
            // asImage: true,
            used: false,
        })

        this.trainIcon = new Icons(this.game, {
            key: 'icons',
            used: false,
            zIndex: 51,
            x: 105,
            y: 110,
        })

        this.trainText = this.game.add.text({
            x: 28,
            y: 125,
            static: true,
            fontSize: 18,
            text: 'Trenuje:',
            zIndex: 51,
            // asImage: true,
            used: false,
        })
    }

    update(dt) {
        super.update(dt);

        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.info.inProgress) {
            this.creationBar.used = true;
            this.creationBarText.used = true;
            this.trainIcon.used = true;
            this.trainText.used = true;
            this.hideActions();
            this.hideDescription();
            this.creationBar.setStatusX(this.game.VAR.sellectedObj.timeLocal / (this.game.VAR.sellectedObj.info.inProgressTime / 100));
        } else {
            this.creationBar.used = false;
            this.creationBarText.used = false;
            this.trainIcon.used = false;
            this.trainText.used = false;
        }
    }

    setInfo(info) {
        this.infoName.use(info.name);
        this.infoIcon.used = true;
        this.descriptionsInfoBorder.used = true;
        this.infoIcon.animations.playOnce({ key: info.imageKey });
        this.hideDescription();
        this.hideActions();
        this.showDescription(info.descriptios);

        if (!info.inProgress) {
            this.showActions(info.actions);
        }
    }

    hideDescription() {
        for (let i = 0; i < this.descriptionsInfo.length; i++) {
            const text = this.descriptionsInfo[i];
            text.used = false;
        }
    }

    showDescription(descriptios) {
        for (let i = 0; i < descriptios.length; i++) {
            const text = this.descriptionsInfo[i];
            text.x = 32;
            text.y = 85 + 22 * i;
            text.used = true;
            text.use(descriptios[i]);
        }
    }

    showActions(actions) {
        if (actions && actions.length > 0) {
            let x = 5;
            let y = 200;
            let index = 1;
            for (let i = 0; i < actions.length; i++) {
                const action = this.actions[i];
                action.used = true;
                action.animations.playOnce({ key: actions[i].key });
                action.x = x;
                action.y = y;
                action.currentAction = actions[i];
                x += 52;
                if (index % 3 === 0) {
                    y += 50;
                    x = 5;
                }
                index++;
            }
        } else {
            return false;
        }
    }

    hideActions() {
        for (let i = 0; i < this.actions.length; i++) {
            const action = this.actions[i];
            this.game.VAR.hudBottom.hoverText.use(' ');
            this.game.VAR.hudBottom.goldIcon.used = false;
            this.game.VAR.hudBottom.woodIcon.used = false;
            action.used = false;
        }
    }

}
export default HudLeft;