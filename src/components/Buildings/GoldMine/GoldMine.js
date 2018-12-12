import Buildings from "../Buildings";

class GoldMine extends Buildings {
    constructor(game, options) {
        super(game, options);

        this.animations.add({
            key: 'first',
            frames: [
                { sx: 12, sy: 10, fW: 96, fH: 96, },
            ]
        });

        this.animations.playOnce({ key: 'first', delay: 16 })
        this.unWalkable(4);
    }

    onClick() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && this.game.VAR.sellectedObj.cargo === 'empty') {
            const endPos = this.game.VAR.pathfinder.getTileBySprite(this);
            this.game.VAR.sellectedObj.restartPosition();
            this.game.VAR.sellectedObj.move(endPos);
        } else if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && (this.game.VAR.sellectedObj.cargo === 'gold' )) {
            const endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.town);
            this.game.VAR.sellectedObj.restartPosition();
            this.game.VAR.sellectedObj.move(endPos);
        } else {
            super.onClick();
        }
    }

    // update(dt) {
    //     super.update(dt);
    // }
}
export default GoldMine;