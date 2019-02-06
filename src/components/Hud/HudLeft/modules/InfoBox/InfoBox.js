import Name from "./modules/Name";
import Icon from "./modules/Icon";
import Border from "./modules/Border";
import Description from "./modules/Description";


class InfoBox {

    constructor(game) {
        const descriptionCount = 5;
        this.name = new Name(game, {});
        this.icon = new Icon(game, { key: 'icons', });
        this.border = new Border(game, {});

        this.descriptions = [];

        for (let i = 0; i < descriptionCount; i++) {
            this.descriptions.push(new Description(game, {}));
        }
    }

    set(info) {
        this.name.use(info.name);
        this.name.used = true;
        this.icon.used = true;
        this.icon.animations.playOnce({ key: info.imageKey });
        this.border.used = true;
        this.showDescription(info.descriptios);
    }

    showDescription(_descriptions) {
        for (let i = 0; i < _descriptions.length; i++) {
            this.descriptions[i].set(_descriptions[i], i);
        }
    }
};

export default InfoBox;