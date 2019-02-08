import Name from "./modules/Name";
import Icon from "./modules/Icon";
import Border from "./modules/Border";
import Description from "./modules/Description";


class InfoBox {

    constructor(game) {
        this.group = game.add.group();

        this.name = new Name(game, {});
        this.icon = new Icon(game, { key: 'icons' });
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
    }

    set(info) {
        this.hide();
        this.name.use(info.name);
        this.icon.animations.playOnce({ key: info.imageKey });
        this.showDescription(info.descriptios);
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
};

export default InfoBox;