import CreationBar from "./modules/CreationBar";
import Icon from "../../../helpers/Icon";
import TextLine from "../../../helpers/TextLine";



class CreationBox {

    constructor(game) {
        this.game = game;

        this.group = game.add.group();

        this.bar = new CreationBar(game, { min: 0, max: 100 });
        this.text = new TextLine(game, { text: '% ukończone', x: 33, y: 185, });
        this.icon = new Icon(game, { key: 'icons', x: 105, y: 110 });
        this.trainingText = new TextLine(game, { text: 'Produkuje:', x: 18, y: 125, });

        this.group.add(this.bar);
        this.group.add(this.text);
        this.group.add(this.icon);
        this.group.add(this.trainingText);
    }

    hide() {
        this.group.hide();
    }

    show() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.info.inProgress && this.game.VAR.sellectedObj.dir === 'complete') {
            this.group.show();
        } else if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.info.inProgress) {
            this.group.show();
            this.trainingText.used = false;
            this.icon.used = false;
        }
        else {
            this.hide();
        }
    }
};

export default CreationBox;