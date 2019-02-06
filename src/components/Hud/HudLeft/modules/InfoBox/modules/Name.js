import Text from "../../../../../../../lib/Text";

class Name extends Text {

    constructor(game, options) {
        super(game, options);

        this.text = ' ';
        this.x = 60;
        this.y = 45;
        //this.asImage = true;
        this.static = true;
        this.fontSize = 18;
        this.zIndex = 51;
    }
};

export default Name;