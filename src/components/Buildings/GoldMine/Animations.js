
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'idle',
            frames: [
                { sx: 12, sy: 10, fW: 96, fH: 96, },
            ]
        });

        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;