
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'complete',
            frames: [
                { sx: 5, sy: 265, fW: 96, fH: 96 },
            ]
        });

        sprite.animations.add({
            key: 'half',
            frames: [
                { sx: 5, sy: 361, fW: 96, fH: 96 },
            ]
        });

        sprite.animations.add({
            key: 'start',
            frames: [
                { sx: 570, sy: 185, fW: 96, fH: 96, },
            ]
        });

        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;