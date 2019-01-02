
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'barracks',
            frames: [
                { sx: 308, sy: 460, fW: 96, fH: 96, },
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