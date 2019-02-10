import Text from "../../../../lib/Text";


class TextLine extends Text {

    constructor(game, options) {
        super(game, options);

        this.text = options.text || ' ';
        this.x = options.x || 60;
        this.y = options.y || 45;
        //this.asImage = true;
        this.static = true;
        this.fontSize = options.fontSize || 18;
        this.zIndex = options.zIndex || 51;
        this.used = options.used || false;
    }
};

export default TextLine;