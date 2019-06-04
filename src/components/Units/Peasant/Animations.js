
class Animations {
    constructor(sprite) {
        sprite.animations.add({
            key: 'idle_up',
            frames: [
                { sx: 13, sy: 3, fW: 32, fH: 32, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right_up',
            frames: [
                { sx: (15 + 35 * 1), sy: 3, fW: 32, fH: 32, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right',
            frames: [
                { sx: (18 + 35 * 2), sy: 3, fW: 32, fH: 32, },
            ]
        });
        sprite.animations.add({
            key: 'idle_right_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 2, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'idle_down',
            frames: [
                { sx: (22 + 35 * 4), sy: 3, fW: 32, fH: 32, },
            ]
        });
        sprite.animations.add({
            key: 'idle_left_down',
            frames: [
                { sx: (15 + 35 * 3), sy: 3, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_left',
            frames: [
                { sx: (19 + 35 * 2), sy: 3, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_left_up',
            frames: [
                { sx: (15 + 35 * 1), sy: 3, fW: 32, fH: 32, flip: true }
            ]
        });

        sprite.animations.add({
            key: 'move_up',
            frames: [
                { sx: 13, sy: 8 + 36 * 1, fW: 32, fH: 32, },
                { sx: 13, sy: 12 + 36 * 2, fW: 32, fH: 32, },
                { sx: 13, sy: 12 + 36 * 3, fW: 32, fH: 32, },
                { sx: 13, sy: 12 + 36 * 4, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'move_right_up',
            frames: [
                { sx: (15 + 35 * 1), sy: 6 + 36 * 1, fW: 32, fH: 32, },
                { sx: (15 + 35 * 1), sy: 10 + 36 * 2, fW: 32, fH: 32, },
                { sx: (15 + 35 * 1), sy: 10 + 36 * 3, fW: 32, fH: 32, },
                { sx: (15 + 35 * 1), sy: 10 + 36 * 4, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'move_right',
            frames: [
                { sx: (18 + 35 * 2), sy: 6 + 36 * 1, fW: 32, fH: 32, },
                { sx: (18 + 35 * 2), sy: 10 + 36 * 2, fW: 32, fH: 32, },
                { sx: (18 + 35 * 2), sy: 10 + 36 * 3, fW: 32, fH: 32, },
                { sx: (18 + 35 * 2), sy: 10 + 36 * 4, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'move_right_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 1 + 36 * 1, fW: 32, fH: 32, },
                { sx: (18 + 35 * 3), sy: 5 + 36 * 2, fW: 32, fH: 32, },
                { sx: (18 + 35 * 3), sy: 6 + 36 * 3, fW: 32, fH: 32, },
                { sx: (18 + 35 * 3), sy: 7 + 36 * 4, fW: 32, fH: 32, },

            ]
        });

        sprite.animations.add({
            key: 'move_down',
            frames: [
                { sx: (24 + 35 * 4), sy: 5 + 36 * 1, fW: 32, fH: 32, },
                { sx: (24 + 35 * 4), sy: 10 + 36 * 2, fW: 32, fH: 32, },
                { sx: (24 + 35 * 4), sy: 10 + 36 * 3, fW: 32, fH: 32, },
                { sx: (24 + 35 * 4), sy: 10 + 36 * 4, fW: 32, fH: 32, },
            ]
        });
        sprite.animations.add({
            key: 'move_left_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 1 + 36 * 1, fW: 32, fH: 32, flip: true },
                { sx: (18 + 35 * 3), sy: 5 + 36 * 2, fW: 32, fH: 32, flip: true },
                { sx: (18 + 35 * 3), sy: 6 + 36 * 3, fW: 32, fH: 32, flip: true },
                { sx: (18 + 35 * 3), sy: 7 + 36 * 4, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_left',
            frames: [
                { sx: (18 + 35 * 2), sy: 6 + 36 * 1, fW: 32, fH: 32, flip: true },
                { sx: (18 + 35 * 2), sy: 10 + 36 * 2, fW: 32, fH: 32, flip: true },
                { sx: (18 + 35 * 2), sy: 10 + 36 * 3, fW: 32, fH: 32, flip: true },
                { sx: (18 + 35 * 2), sy: 10 + 36 * 4, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_left_up',
            frames: [
                { sx: (15 + 35 * 1), sy: 6 + 36 * 1, fW: 32, fH: 32, flip: true },
                { sx: (15 + 35 * 1), sy: 10 + 36 * 2, fW: 32, fH: 32, flip: true },
                { sx: (15 + 35 * 1), sy: 10 + 36 * 3, fW: 32, fH: 32, flip: true },
                { sx: (15 + 35 * 1), sy: 10 + 36 * 4, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_up',
            frames: [
                { sx: 24, sy: 22 + 36 * 13, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_right_up',
            frames: [
                { sx: (24 + 35 * 1), sy: 22 + 36 * 13, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_right',
            frames: [
                { sx: (24 + 35 * 2), sy: 22 + 36 * 13, fW: 32, fH: 32, },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_right_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 16 + 36 * 13, fW: 32, fH: 38, },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_down',
            frames: [
                { sx: (15 + 35 * 4), sy: 16 + 36 * 13, fW: 32, fH: 38, },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_left_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 16 + 36 * 13, fW: 32, fH: 38, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_left',
            frames: [
                { sx: (24 + 35 * 2), sy: 22 + 36 * 13, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_gold_left_up',
            frames: [
                { sx: (24 + 35 * 1), sy: 22 + 36 * 13, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_up',
            frames: [
                { sx: 24, sy: 28 + 36 * 14, fW: 32, fH: 34, },
                { sx: 24, sy: 35 + 36 * 15, fW: 32, fH: 34, },
                { sx: 24, sy: 42 + 36 * 16, fW: 32, fH: 34, },
                { sx: 24, sy: 49 + 36 * 17, fW: 32, fH: 34, },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_right_up',
            frames: [
                { sx: (24 + 35 * 1), sy: 28 + 36 * 14, fW: 32, fH: 33, },
                { sx: (24 + 35 * 1), sy: 34 + 36 * 15, fW: 32, fH: 33, },
                { sx: (24 + 35 * 1), sy: 40 + 36 * 16, fW: 32, fH: 33, },
                { sx: (24 + 35 * 1), sy: 46 + 36 * 17, fW: 32, fH: 33, },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_right',
            frames: [
                { sx: (24 + 35 * 2), sy: 47 + 36 * 17, fW: 32, fH: 38, },
                { sx: (24 + 35 * 2), sy: 40 + 36 * 16, fW: 32, fH: 38, },
                { sx: (24 + 35 * 2), sy: 33 + 36 * 15, fW: 32, fH: 38, },
                { sx: (24 + 35 * 2), sy: 26 + 36 * 14, fW: 32, fH: 38, },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_right_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 44 + 36 * 17, fW: 32, fH: 38, },
                { sx: (18 + 35 * 3), sy: 36 + 36 * 16, fW: 32, fH: 38, },
                { sx: (18 + 35 * 3), sy: 26 + 36 * 15, fW: 32, fH: 38, },
                { sx: (18 + 35 * 3), sy: 20 + 36 * 14, fW: 32, fH: 38, },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_down',
            frames: [
                { sx: (15 + 35 * 4), sy: 21 + 36 * 14, fW: 32, fH: 38, },
                { sx: (15 + 35 * 4), sy: 28 + 36 * 15, fW: 32, fH: 38, },
                { sx: (15 + 35 * 4), sy: 35 + 36 * 16, fW: 32, fH: 38, },
                { sx: (15 + 35 * 4), sy: 42 + 36 * 17, fW: 32, fH: 38, },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_left_down',
            frames: [
                { sx: (18 + 35 * 3), sy: 44 + 36 * 17, fW: 32, fH: 38, flip: true },
                { sx: (18 + 35 * 3), sy: 36 + 36 * 16, fW: 32, fH: 38, flip: true },
                { sx: (18 + 35 * 3), sy: 26 + 36 * 15, fW: 32, fH: 38, flip: true },
                { sx: (18 + 35 * 3), sy: 20 + 36 * 14, fW: 32, fH: 38, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_left',
            frames: [
                { sx: (24 + 35 * 2), sy: 47 + 36 * 17, fW: 32, fH: 32, flip: true },
                { sx: (24 + 35 * 2), sy: 40 + 36 * 16, fW: 32, fH: 32, flip: true },
                { sx: (24 + 35 * 2), sy: 33 + 36 * 15, fW: 32, fH: 32, flip: true },
                { sx: (24 + 35 * 2), sy: 26 + 36 * 14, fW: 32, fH: 32, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_gold_left_up',
            frames: [
                { sx: (24 + 35 * 1), sy: 28 + 36 * 14, fW: 32, fH: 33, flip: true },
                { sx: (24 + 35 * 1), sy: 34 + 36 * 15, fW: 32, fH: 33, flip: true },
                { sx: (24 + 35 * 1), sy: 40 + 36 * 16, fW: 32, fH: 33, flip: true },
                { sx: (24 + 35 * 1), sy: 46 + 36 * 17, fW: 32, fH: 33, flip: true },
            ]
        });










        sprite.animations.add({
            key: 'idle_wood_up',
            frames: [
                { sx: 16, sy: 12 + 36 * 19, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_right_up',
            frames: [
                { sx: (16 + 41 * 1), sy: 14 + 36 * 19, fW: 32, fH: 36, }
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_right',
            frames: [
                { sx: (16 + 41 * 2), sy: 16 + 36 * 19, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_right_down',
            frames: [
                { sx: (8 + 41 * 3), sy: 16 + 36 * 19, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_down',
            frames: [
                { sx: (11 + 41 * 4), sy: 16 + 36 * 19, fW: 32, fH: 36, }
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_left_down',
            frames: [
                { sx: (8 + 41 * 3), sy: 16 + 36 * 19, fW: 32, fH: 36, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_left',
            frames: [
                { sx: (16 + 41 * 2), sy: 16 + 36 * 19, fW: 32, fH: 36, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'idle_wood_left_up',
            frames: [
                { sx: (16 + 41 * 1), sy: 14 + 36 * 19, fW: 32, fH: 36, flip: true }
            ]
        });


        sprite.animations.add({
            key: 'move_wood_up',
            frames: [
                { sx: 16, sy: 24 + 36 * 20, fW: 32, fH: 36, },
                { sx: 16, sy: 29 + 36 * 21, fW: 32, fH: 36, },
                { sx: 16, sy: 37 + 36 * 22, fW: 32, fH: 36, },
                { sx: 16, sy: 40 + 36 * 23, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_right_up',
            frames: [
                { sx: (16 + 41 * 1), sy: 24 + 36 * 20, fW: 32, fH: 36, },
                { sx: (16 + 41 * 1), sy: 31 + 36 * 21, fW: 32, fH: 36, },
                { sx: (16 + 41 * 1), sy: 38 + 36 * 22, fW: 32, fH: 36, },
                { sx: (16 + 41 * 1), sy: 43 + 36 * 23, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_right',
            frames: [
                { sx: (16 + 41 * 2), sy: 24 + 36 * 20, fW: 32, fH: 36, },
                { sx: (16 + 41 * 2), sy: 31 + 36 * 21, fW: 32, fH: 36, },
                { sx: (16 + 41 * 2), sy: 38 + 36 * 22, fW: 32, fH: 36, },
                { sx: (16 + 41 * 2), sy: 43 + 36 * 23, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_right_down',
            frames: [
                { sx: (7 + 41 * 3), sy: 24 + 36 * 20, fW: 32, fH: 36, },
                { sx: (7 + 41 * 3), sy: 31 + 36 * 21, fW: 32, fH: 36, },
                { sx: (7 + 41 * 3), sy: 38 + 36 * 22, fW: 32, fH: 36, },
                { sx: (7 + 41 * 3), sy: 43 + 36 * 23, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_down',
            frames: [
                { sx: (11 + 41 * 4), sy: 24 + 36 * 20, fW: 32, fH: 36, },
                { sx: (11 + 41 * 4), sy: 31 + 36 * 21, fW: 32, fH: 36, },
                { sx: (11 + 41 * 4), sy: 38 + 36 * 22, fW: 32, fH: 36, },
                { sx: (11 + 41 * 4), sy: 43 + 36 * 23, fW: 32, fH: 36, },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_left_down',
            frames: [
                { sx: (7 + 41 * 3), sy: 24 + 36 * 20, fW: 32, fH: 36, flip: true },
                { sx: (7 + 41 * 3), sy: 31 + 36 * 21, fW: 32, fH: 36, flip: true },
                { sx: (7 + 41 * 3), sy: 38 + 36 * 22, fW: 32, fH: 36, flip: true },
                { sx: (7 + 41 * 3), sy: 43 + 36 * 23, fW: 32, fH: 36, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_left',
            frames: [
                { sx: (16 + 41 * 2), sy: 24 + 36 * 20, fW: 32, fH: 36, flip: true },
                { sx: (16 + 41 * 2), sy: 31 + 36 * 21, fW: 32, fH: 36, flip: true },
                { sx: (16 + 41 * 2), sy: 38 + 36 * 22, fW: 32, fH: 36, flip: true },
                { sx: (16 + 41 * 2), sy: 43 + 36 * 23, fW: 32, fH: 36, flip: true },
            ]
        });

        sprite.animations.add({
            key: 'move_wood_left_up',
            frames: [
                { sx: (16 + 41 * 1), sy: 24 + 36 * 20, fW: 32, fH: 36, flip: true },
                { sx: (16 + 41 * 1), sy: 31 + 36 * 21, fW: 32, fH: 36, flip: true },
                { sx: (16 + 41 * 1), sy: 38 + 36 * 22, fW: 32, fH: 36, flip: true },
                { sx: (16 + 41 * 1), sy: 43 + 36 * 23, fW: 32, fH: 36, flip: true },
            ]
        });


        sprite.animations.add({
            key: 'chop_up',
            frames: [
                { sx: 8, sy: -6, fW: 32, fH: 42, },
                { sx: 7, sy: 4 + 38 * 1, fW: 32, fH: 42, },
                { sx: 5, sy: 24 + 38 * 2, fW: 32, fH: 42, },
                { sx: 6, sy: 51 + 38 * 3, fW: 32, fH: 42, },
                { sx: 5, sy: 75 + 38 * 4, fW: 32, fH: 42, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'chop_right_up',
            frames: [
                { sx: 8 + 36 * 1, sy: -6, fW: 32, fH: 42, },
                { sx: 7 + 36 * 1, sy: 4 + 38 * 1, fW: 32, fH: 42, },
                { sx: 5 + 36 * 1, sy: 24 + 38 * 2, fW: 32, fH: 42, },
                { sx: 6 + 36 * 1, sy: 51 + 38 * 3, fW: 32, fH: 42, },
                { sx: 5 + 36 * 1, sy: 75 + 38 * 4, fW: 32, fH: 42, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'chop_right',
            frames: [
                { sx: 14 + 36 * 2, sy: -6, fW: 30, fH: 42, },
                { sx: 13 + 36 * 2, sy: 4 + 38 * 1, fW: 26, fH: 42, },
                { sx: 11 + 36 * 2, sy: 24 + 38 * 2, fW: 36, fH: 42, },
                { sx: 12 + 36 * 2, sy: 51 + 38 * 3, fW: 40, fH: 42, },
                { sx: 11 + 36 * 2, sy: 75 + 38 * 4, fW: 40, fH: 42, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'chop_right_down',
            frames: [
                { sx: 11 + 36 * 3, sy: -6, fW: 32, fH: 44, },
                { sx: 10 + 36 * 3, sy: 4 + 38 * 1, fW: 31, fH: 44, },
                { sx: 8 + 36 * 3, sy: 24 + 38 * 2, fW: 32, fH: 44, },
                { sx: 13 + 36 * 3, sy: 51 + 38 * 3, fW: 38, fH: 44, },
                { sx: 12 + 36 * 3, sy: 75 + 38 * 4, fW: 36, fH: 44, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'chop_down',
            frames: [
                { sx: 14 + 36 * 4, sy: -6, fW: 32, fH: 44, },
                { sx: 13 + 36 * 4, sy: 4 + 38 * 1, fW: 31, fH: 44, },
                { sx: 11 + 36 * 4, sy: 24 + 38 * 2, fW: 32, fH: 44, },
                { sx: 16 + 36 * 4, sy: 51 + 38 * 3, fW: 38, fH: 44, },
                { sx: 15 + 36 * 4, sy: 75 + 38 * 4, fW: 36, fH: 44, },
            ],
            speed: 9
        });
        sprite.animations.add({
            key: 'chop_left_down',
            frames: [
                { sx: 11 + 36 * 3, sy: -6, fW: 32, fH: 44, flip: true },
                { sx: 10 + 36 * 3, sy: 4 + 38 * 1, fW: 31, fH: 44, flip: true },
                { sx: 8 + 36 * 3, sy: 24 + 38 * 2, fW: 32, fH: 44, flip: true },
                { sx: 13 + 36 * 3, sy: 51 + 38 * 3, fW: 38, fH: 44, flip: true },
                { sx: 12 + 36 * 3, sy: 75 + 38 * 4, fW: 36, fH: 44, flip: true },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'chop_left',
            frames: [
                { sx: 16 + 36 * 2, sy: 2, fW: 30, fH: 34, flip: true },
                { sx: 12 + 36 * 2, sy: 10 + 38 * 1, fW: 30, fH: 34, flip: true },
                { sx: 5 + 36 * 2, sy: 30 + 38 * 2, fW: 36, fH: 34, flip: true },
                { sx: 4 + 36 * 2, sy: 57 + 38 * 3, fW: 40, fH: 34, flip: true },
                { sx: 2 + 36 * 2, sy: 81 + 38 * 4, fW: 40, fH: 34, flip: true },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'chop_left_up',
            frames: [
                { sx: 8 + 36 * 1, sy: -6, fW: 32, fH: 42, flip: true },
                { sx: 7 + 36 * 1, sy: 4 + 38 * 1, fW: 32, fH: 42, flip: true },
                { sx: 5 + 36 * 1, sy: 24 + 38 * 2, fW: 32, fH: 42, flip: true },
                { sx: 6 + 36 * 1, sy: 51 + 38 * 3, fW: 32, fH: 42, flip: true },
                { sx: 5 + 36 * 1, sy: 75 + 38 * 4, fW: 32, fH: 42, flip: true },
            ],
            speed: 9
        });





















        sprite.animations.add({
            key: 'atck_up',
            frames: [
                { sx: 8, sy: -6, fW: 32, fH: 42, },
                { sx: 7, sy: 4 + 38 * 1, fW: 32, fH: 42, },
                { sx: 5, sy: 24 + 38 * 2, fW: 32, fH: 42, },
                { sx: 6, sy: 51 + 38 * 3, fW: 32, fH: 42, },
                { sx: 5, sy: 75 + 38 * 4, fW: 32, fH: 42, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'atck_right_up',
            frames: [
                { sx: 8 + 36 * 1, sy: -6, fW: 32, fH: 42, },
                { sx: 7 + 36 * 1, sy: 4 + 38 * 1, fW: 32, fH: 42, },
                { sx: 5 + 36 * 1, sy: 24 + 38 * 2, fW: 32, fH: 42, },
                { sx: 6 + 36 * 1, sy: 51 + 38 * 3, fW: 32, fH: 42, },
                { sx: 5 + 36 * 1, sy: 75 + 38 * 4, fW: 32, fH: 42, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'atck_right',
            frames: [
                { sx: 14 + 36 * 2, sy: -6, fW: 30, fH: 42, },
                { sx: 13 + 36 * 2, sy: 4 + 38 * 1, fW: 26, fH: 42, },
                { sx: 11 + 36 * 2, sy: 24 + 38 * 2, fW: 36, fH: 42, },
                { sx: 12 + 36 * 2, sy: 51 + 38 * 3, fW: 40, fH: 42, },
                { sx: 11 + 36 * 2, sy: 75 + 38 * 4, fW: 40, fH: 42, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'atck_right_down',
            frames: [
                { sx: 11 + 36 * 3, sy: -6, fW: 32, fH: 44, },
                { sx: 10 + 36 * 3, sy: 4 + 38 * 1, fW: 31, fH: 44, },
                { sx: 8 + 36 * 3, sy: 24 + 38 * 2, fW: 32, fH: 44, },
                { sx: 13 + 36 * 3, sy: 51 + 38 * 3, fW: 38, fH: 44, },
                { sx: 12 + 36 * 3, sy: 75 + 38 * 4, fW: 36, fH: 44, },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'atck_down',
            frames: [
                { sx: 14 + 36 * 4, sy: -6, fW: 32, fH: 44, },
                { sx: 13 + 36 * 4, sy: 4 + 38 * 1, fW: 31, fH: 44, },
                { sx: 11 + 36 * 4, sy: 24 + 38 * 2, fW: 32, fH: 44, },
                { sx: 16 + 36 * 4, sy: 51 + 38 * 3, fW: 38, fH: 44, },
                { sx: 15 + 36 * 4, sy: 75 + 38 * 4, fW: 36, fH: 44, },
            ],
            speed: 9
        });
        sprite.animations.add({
            key: 'atck_left_down',
            frames: [
                { sx: 11 + 36 * 3, sy: -6, fW: 32, fH: 44, flip: true },
                { sx: 10 + 36 * 3, sy: 4 + 38 * 1, fW: 31, fH: 44, flip: true },
                { sx: 8 + 36 * 3, sy: 24 + 38 * 2, fW: 32, fH: 44, flip: true },
                { sx: 13 + 36 * 3, sy: 51 + 38 * 3, fW: 38, fH: 44, flip: true },
                { sx: 12 + 36 * 3, sy: 75 + 38 * 4, fW: 36, fH: 44, flip: true },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'atck_left',
            frames: [
                { sx: 16 + 36 * 2, sy: 2, fW: 30, fH: 34, flip: true },
                { sx: 12 + 36 * 2, sy: 10 + 38 * 1, fW: 30, fH: 34, flip: true },
                { sx: 5 + 36 * 2, sy: 30 + 38 * 2, fW: 36, fH: 34, flip: true },
                { sx: 4 + 36 * 2, sy: 57 + 38 * 3, fW: 40, fH: 34, flip: true },
                { sx: 2 + 36 * 2, sy: 81 + 38 * 4, fW: 40, fH: 34, flip: true },
            ],
            speed: 9
        });

        sprite.animations.add({
            key: 'atck_left_up',
            frames: [
                { sx: 8 + 36 * 1, sy: -6, fW: 32, fH: 42, flip: true },
                { sx: 7 + 36 * 1, sy: 4 + 38 * 1, fW: 32, fH: 42, flip: true },
                { sx: 5 + 36 * 1, sy: 24 + 38 * 2, fW: 32, fH: 42, flip: true },
                { sx: 6 + 36 * 1, sy: 51 + 38 * 3, fW: 32, fH: 42, flip: true },
                { sx: 5 + 36 * 1, sy: 75 + 38 * 4, fW: 32, fH: 42, flip: true },
            ],
            speed: 9
        });

        sprite.animations.play({ key: sprite.dir, delay: 16 })
    }

}
export default Animations;