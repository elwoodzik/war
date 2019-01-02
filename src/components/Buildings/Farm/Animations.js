
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'farm',
            frames: [
                { sx: 400, sy: 5, fW: 64, fH: 64, },
            ]
        });

        // sprite.animations.add({
        //     key: 'inMine',
        //     frames: [
        //         { sx: 12, sy: 10 + 96, fW: 96, fH: 96, },
        //     ]
        // });

        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;