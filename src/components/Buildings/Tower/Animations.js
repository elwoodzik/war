
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'complete',
            frames: [
                { sx: 465, sy: 5, fW: 64, fH: 64, },
            ]
        });

        sprite.animations.add({
            key: 'half',
            frames: [
                { sx: 465, sy: 70, fW: 64, fH: 64, },
            ]
        });


        sprite.animations.add({
            key: 'start',
            frames: [
                { sx: 585, sy: 135, fW: 64, fH: 64, },
            ]
        });

        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;