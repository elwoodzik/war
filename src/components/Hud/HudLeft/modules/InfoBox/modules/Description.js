import Text from "../../../../../../../lib/Text";

class Description extends Text {

    constructor(game, options) {
        super(game, options);

        this.x = -500;
        this.y = 80;
        this.static = true;
        this.fontSize = 18;
        this.text = ' ';
        this.zIndex = 51;
    }

    set(description, i) {
        this.x = 32;
        this.y = 85 + 22 * i;
        this.used = true;
        this.use(description);
    }
};

export default Description;