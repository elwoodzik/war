
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'idle',
            frames: [
                { sx: 265, sy: 5, fW: 128, fH: 128, },
            ]
        });

        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;