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

        this.infoName = this.game.add.text({
            text: ' ',
            x: 60,
            y: 45,
            // asImage: true,
            static: true,
            fontSize: 18
        }).getProps()

        this.infoIcon = new Icons(this.game, {
            key: 'icons',
            used: false
        })

        this.descriptionsInfo = [];

        for (let i = 0; i < 5; i++) {
            this.descriptionsInfo.push(
                this.game.add.text({
                    x: -500,
                    y: 100,
                    static: true,
                    fontSize: 18,
                    text: 'test',

                })
            )
        }

        this.actions = [];

        for (let i = 0; i < 10; i++) {
            this.actions.push(
                new Action(this.game, {
                    key: 'icons',
                    used: false,
                    zIndex: 10
                })
            )
        }
    }

    setInfo(info) {
        // console.log(info)
        this.infoName.use(info.name);
        this.infoIcon.used = true;
        this.infoIcon.animations.playOnce({ key: info.imageKey });
        this.hideDescription();
        this.hideActions();
        this.showDescription(info.descriptios)
        this.showActions(info.actions)
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
            text.x = 30;
            text.y = 100 + 22 * i;
            text.used = true;
            text.use(descriptios[i])
        }
    }

    showActions(actions) {
        if (actions && actions.length > 0) {
            let x = 5;
            let y = 250;
            for (let i = 1; i < actions.length; i++) {
                const action = this.actions[i - 1];
                action.used = true;
                action.animations.playOnce({ key: actions[i - 1].key });
                action.x = x;
                action.y = y;
                action.data = actions[i - 1];
                x += 52;
                if (i % 3 === 0) {
                    y += 50;
                    x = 5;
                }
            }
        } else {
            return false;
        }
    }

    hideActions() {
        for (let i = 0; i < this.actions.length; i++) {
            const action = this.actions[i];
            action.used = false;
        }
    }

}
export default HudLeft;