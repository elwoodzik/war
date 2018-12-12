import Buildings from "../Buildings";

class Town extends Buildings {
    constructor(game, options) {
        super(game, options);

        this.animations.add({
            key: 'first',
            frames: [
                { sx: 265, sy: 5, fW: 128, fH: 128, },
            ]
        });

        this.animations.playOnce({ key: 'first', delay: 16 })
        this.unWalkable(5);
    }

    update(dt) {
        super.update(dt);
    }
}
export default Town;