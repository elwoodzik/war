
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'idle_up',
            frames: [
                { sx: 22, sy: 0, fW: 31, fH: 52, },
            ]
        });

        sprite.animations.add({
            key: 'idle_right_up',
            frames: [
                // { sx: (25 + 35 * 2), sy: -6, fW: 59, fH: 59, },
                { sx: 99, sy: 0, fW: 25, fH: 48, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right',
            frames: [
                { sx: 170, sy: 5, fW: 32, fH: 48, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right_down',
            frames: [
                { sx: 242, sy: 5, fW: 40, fH: 48, },
            ]
        });

        sprite.animations.add({
            key: 'idle_down',
            frames: [
                { sx: 316, sy: 8, fW: 32, fH: 48, },
            ]
        });
        sprite.animations.add({
            key: 'idle_left_down',
            frames: [
                { sx: 240, sy: 5, fW: 40, fH: 48, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_left',
            frames: [
                { sx: 170, sy: 5, fW: 32, fH: 48, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_left_up',
            frames: [
                { sx: 99, sy: 0, fW: 25, fH: 48, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_up',
            frames: [
                { sx: 22, sy: 62, fW: 30, fH: 52, },
                { sx: 22, sy: 119, fW: 30, fH: 52, },
                { sx: 23, sy: 168, fW: 29, fH: 52, },
                { sx: 22, sy: 219, fW: 31, fH: 52, },
            ]
        });

        sprite.animations.add({
            key: 'move_right_up',
            frames: [
                { sx: 92, sy: 64, fW: 38, fH: 48, },
                { sx: 92, sy: 120, fW: 38, fH: 48, },
                { sx: 92, sy: 169, fW: 38, fH: 48, },
                { sx: 92, sy: 217, fW: 31, fH: 48, },
            ]
        });

        sprite.animations.add({
            key: 'move_right',
            frames: [
                { sx: 167, sy: 64, fW: 38, fH: 48, },
                { sx: 167, sy: 120, fW: 38, fH: 48, },
                { sx: 167, sy: 169, fW: 38, fH: 48, },
                { sx: 167, sy: 217, fW: 31, fH: 48, },
            ]
        });

        sprite.animations.add({
            key: 'move_right_down',
            frames: [
                { sx: 240, sy: 64, fW: 38, fH: 48, },
                { sx: 240, sy: 120, fW: 38, fH: 48, },
                { sx: 240, sy: 169, fW: 38, fH: 48, },
                { sx: 240, sy: 217, fW: 31, fH: 48, },
            ]
        });

        sprite.animations.add({
            key: 'move_down',
            frames: [
                { sx: 315, sy: 64, fW: 38, fH: 48, },
                { sx: 315, sy: 120, fW: 38, fH: 48, },
                { sx: 315, sy: 172, fW: 38, fH: 48, },
                { sx: 315, sy: 220, fW: 31, fH: 48, },
            ]
        });

        sprite.animations.add({
            key: 'move_left_down',
            frames: [
                { sx: 240, sy: 64, fW: 38, fH: 48, flip: true },
                { sx: 240, sy: 120, fW: 38, fH: 48, flip: true },
                { sx: 240, sy: 169, fW: 38, fH: 48, flip: true },
                { sx: 240, sy: 217, fW: 31, fH: 48, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_left',
            frames: [
                { sx: 167, sy: 64, fW: 38, fH: 48, flip: true },
                { sx: 167, sy: 120, fW: 38, fH: 48, flip: true },
                { sx: 167, sy: 169, fW: 38, fH: 48, flip: true },
                { sx: 167, sy: 217, fW: 31, fH: 48, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_left_up',
            frames: [
                { sx: 92, sy: 64, fW: 38, fH: 48, flip: true },
                { sx: 92, sy: 120, fW: 38, fH: 48, flip: true },
                { sx: 92, sy: 169, fW: 38, fH: 48, flip: true },
                { sx: 92, sy: 217, fW: 31, fH: 48, flip: true },
            ]
        });


        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;