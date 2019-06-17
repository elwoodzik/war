

import Border from "../../../helpers/Border";
import Description from "./modules/Description";
import TextLine from "../../../helpers/TextLine";
import Icon from "../../../helpers/Icon";


class InfoBox {

    constructor(game) {
        this.game = game;
        this.group = game.add.group();

        this.name = new TextLine(game, {});
        this.icon = new Icon(game, { key: 'icons' });
        this.lifeBar = this.game.add.bar({
            min: 0,
            max: 100,
            x: 4,
            y: 60,
            width: 46,
            height: 8,
            static: true,
            zIndex: 51,
            used: false
        }).getProps();
        this.border = new Border(game, {});

        this.descriptions = [];
        const descriptionCount = 5;

        for (let i = 0; i < descriptionCount; i++) {
            this.descriptions.push(new Description(game, {}));
        }

        this.group.add(this.name);
        this.group.add(this.icon);
        this.group.add(this.border);
        this.group.add(this.descriptions);
        this.group.add(this.lifeBar);
    }

    set(info) {
        this.hide();
        this.name.use(info.name);
        this.lifeBar.setMax(info.hitPointsMax);
        this.lifeBar.setMin(info.currentHp);
        this.lifeBar.setStatusX(info.currentHp)
        this.icon.animations.playOnce({ key: info.imageKey });
        this.showDescription(info.descriptios());
        this.show();
    }

    hide() {
        this.group.hide();
    }

    show() {
        this.group.show();
    }

    showDescription(_descriptions) {
        for (let i = 0; i < this.descriptions.length; i++) {
            this.descriptions[i].set(_descriptions[i] || ' ', i);
        }
    }

    hideDescription() {
        for (let i = 0; i < this.descriptions.length; i++) {
            this.descriptions[i].hide();
        }
    }
};

export default InfoBox;