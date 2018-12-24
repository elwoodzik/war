import Sprite from "../../../lib/Sprite";

class Icons extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = options.x || 5;
        this.y = options.y || 20;
        this.static = true;

        this.animations.add({
            key: 'peasant',
            frames: [
                { sx: 3, sy: 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'peon',
            frames: [
                { sx: (46 * 7 + 3 * 7) + 3, sy: 0, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'town',
            frames: [
                { sx: (46 * 0 + 3 * 0) + 3, sy: (38 * 4 + 3 * 4) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'goldmine',
            frames: [
                { sx: (46 * 4 + 3 * 4) + 3, sy: (38 * 7 + 3 * 7) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.playOnce({ key: 'town', delay: 16 })
    }
}
export default Icons;