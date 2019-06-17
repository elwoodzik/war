import Sprite from "../../../../lib/Sprite";


class Icon extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = options.x || 5;
        this.y = options.y || 21;
        this.static = true;
        this.used = false;
        this.zIndex = options.zIndex || 51;

        this.animations.add({
            key: 'peasant',
            frames: [
                { sx: 3, sy: 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'warrior',
            frames: [
                { sx: (46 * 2 + 3 * 2) + 3, sy: (38 * 0 + 3 * 0) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'archer',
            frames: [
                { sx: (46 * 4 + 3 * 4) + 3, sy: (38 * 0 + 3 * 0) + 3, fW: 46, fH: 38, },
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

        this.animations.add({
            key: 'farm',
            frames: [
                { sx: (46 * 8 + 3 * 8) + 3, sy: (38 * 3 + 3 * 3) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'barracks',
            frames: [
                { sx: (46 * 2 + 3 * 2) + 3, sy: (38 * 4 + 3 * 4) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'lumber_mill',
            frames: [
                { sx: (46 * 4 + 3 * 4) + 3, sy: (38 * 4 + 3 * 4) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'blacksmith',
            frames: [
                { sx: (46 * 6 + 3 * 6) + 3, sy: (38 * 4 + 3 * 4) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'tower',
            frames: [
                { sx: (46 * 0 + 3 * 0) + 3, sy: (38 * 6 + 3 * 6) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'tower_arrow',
            frames: [
                { sx: (46 * 5 + 3 * 5) + 3, sy: (38 * 7 + 3 * 7) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'tower_cannon',
            frames: [
                { sx: (46 * 6 + 3 * 6) + 3, sy: (38 * 7 + 3 * 7) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'cancel',
            frames: [
                { sx: (46 * 1 + 3 * 1) + 3, sy: (38 * 9 + 3 * 9) + 3, fW: 46, fH: 38, },
            ]
        });

        this.animations.add({
            key: 'swordUpgrade1',
            frames: [
                { sx: (46 * 6 + 3 * 6) + 3, sy: (38 * 11 + 3 * 11) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'swordUpgrade2',
            frames: [
                { sx: (46 * 7 + 3 * 7) + 3, sy: (38 * 11 + 3 * 11) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'swordUpgrade3',
            frames: [
                { sx: (46 * 8 + 3 * 8) + 3, sy: (38 * 11 + 3 * 11) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'shieldUpgrade1',
            frames: [
                { sx: (46 * 4 + 3 * 4) + 3, sy: (38 * 16 + 3 * 16) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'shieldUpgrade2',
            frames: [
                { sx: (46 * 5 + 3 * 5) + 3, sy: (38 * 16 + 3 * 16) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'shieldUpgrade3',
            frames: [
                { sx: (46 * 6 + 3 * 6) + 3, sy: (38 * 16 + 3 * 16) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'arrowUpgrade1',
            frames: [
                { sx: (46 * 4 + 3 * 4) + 3, sy: (38 * 12 + 3 * 12) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'arrowUpgrade2',
            frames: [
                { sx: (46 * 5 + 3 * 5) + 3, sy: (38 * 12 + 3 * 12) + 3, fW: 46, fH: 38, },
            ]
        });
        this.animations.add({
            key: 'arrowUpgrade3',
            frames: [
                { sx: (46 * 6 + 3 * 6) + 3, sy: (38 * 12 + 3 * 12) + 3, fW: 46, fH: 38, },
            ]
        });



        this.animations.playOnce({ key: 'town', delay: 16 })
    }
}
export default Icon;