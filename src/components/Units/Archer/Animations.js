
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'idle_up',
            frames: [
                { sx: 9, sy: 11, fW: 38, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'idle_right_up',
            frames: [
                { sx: 67, sy: 12, fW: 39, fH: 47, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right',
            frames: [
                { sx: 128, sy: 12, fW: 38, fH: 47, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right_down',
            frames: [
                { sx: 186, sy: 8, fW: 38, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'idle_down',
            frames: [
                { sx: 245, sy: 12, fW: 38, fH: 47, },
            ]
        });
        sprite.animations.add({
            key: 'idle_left_down',
            frames: [
                { sx: 186, sy: 8, fW: 38, fH: 47, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_left',
            frames: [
                { sx: 128, sy: 12, fW: 38, fH: 47, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_left_up',
            frames: [
                { sx: 67, sy: 12, fW: 39, fH: 47, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_up',
            frames: [
                { sx: 7, sy: 85, fW: 40, fH: 47, },
                { sx: 7, sy: 159, fW: 40, fH: 47, },
                { sx: 7, sy: 234, fW: 40, fH: 47, },
                { sx: 7, sy: 308, fW: 40, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'move_right_up',
            frames: [
                { sx: 70, sy: 85, fW: 40, fH: 47, },
                { sx: 70, sy: 159, fW: 40, fH: 47, },
                { sx: 70, sy: 234, fW: 40, fH: 47, },
                { sx: 70, sy: 308, fW: 40, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'move_right',
            frames: [
                { sx: 128, sy: 85, fW: 40, fH: 47, },
                { sx: 128, sy: 159, fW: 40, fH: 47, },
                { sx: 128, sy: 234, fW: 40, fH: 47, },
                { sx: 128, sy: 308, fW: 40, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'move_right_down',
            frames: [
                { sx: 183, sy: 85, fW: 40, fH: 47, },
                { sx: 183, sy: 159, fW: 40, fH: 47, },
                { sx: 183, sy: 234, fW: 40, fH: 47, },
                { sx: 183, sy: 308, fW: 40, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'move_down',
            frames: [
                { sx: 245, sy: 85, fW: 40, fH: 47, },
                { sx: 245, sy: 159, fW: 40, fH: 47, },
                { sx: 245, sy: 234, fW: 40, fH: 47, },
                { sx: 245, sy: 308, fW: 40, fH: 47, },
            ]
        });

        sprite.animations.add({
            key: 'move_left_down',
            frames: [
                { sx: 183, sy: 85, fW: 40, fH: 47, flip: true },
                { sx: 183, sy: 159, fW: 40, fH: 47, flip: true },
                { sx: 183, sy: 234, fW: 40, fH: 47, flip: true },
                { sx: 183, sy: 308, fW: 40, fH: 47, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_left',
            frames: [
                { sx: 128, sy: 85, fW: 40, fH: 47, flip: true },
                { sx: 128, sy: 159, fW: 40, fH: 47, flip: true },
                { sx: 128, sy: 234, fW: 40, fH: 47, flip: true },
                { sx: 128, sy: 308, fW: 40, fH: 47, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_left_up',
            frames: [
                { sx: 70, sy: 85, fW: 40, fH: 47, flip: true },
                { sx: 70, sy: 159, fW: 40, fH: 47, flip: true },
                { sx: 70, sy: 234, fW: 40, fH: 47, flip: true },
                { sx: 70, sy: 308, fW: 40, fH: 47, flip: true },
            ]
        });


        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;