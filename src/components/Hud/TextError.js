import Text from "../../../lib/Text";

class TextError extends Text {
    constructor(game, options) {
        super(game, options);

        this.game = game;

        this.color = '#d2d216';
        this.static = true;
        this.x = 210;
        this.y = this.game.height - 60;
        this.text = 'ERROR';
        this.fontSize = 17;
        this.zIndex = 51;
        this.used = false;

        this.texts = {
            "resources": "Masz za mało surowców!",
            "houses": "Brak miejsc, zbuduj więcej farm",
            "default": "BRAK ODPOWIEDNIEGO TEKSTU DO TEGO ZDARZENIA"
        }
    }

    display(text) {
        if (this.used) {
            this.doInTimeStop();
            console.log('zatrzymany licznik')
        }

        if (this.texts[text]) {
            this.text = this.texts[text];
        } else {
            this.text = this.texts['default'];
        }

        this.used = true;
        this.doInTime(3000, this.undisplay)
    }

    undisplay() {
        this.used = false;
    }
}
export default TextError;

// text: ' ',
//     x: 60,
//         y: 45,
//             // asImage: true,
//             static: true,
//                 fontSize: 18,
//                     zIndex: 51