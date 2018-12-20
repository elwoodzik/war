import Sprite from "../../../lib/Sprite";

class Building extends Sprite {
    constructor(game, options) {
        super(game, options);


        // const startPos = this.game.VAR.pathfinder.getTileBySprite(this);
        // this.currentPosition = this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 3);
        // this.nextPosition = null;
    }

    onClick() {
        this.selectedBorder();
        this.game.VAR.hudLeft.setInfo(this.info)
    }

    selectedBorder() {
        this.game.VAR.sellectedObj = this;
        this.game.VAR.sellectedBorder.show();
        this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
        this.game.VAR.sellectedBorder.y = this.y; //+ this.height / 2
        this.game.VAR.sellectedBorder.width = this.width;
        this.game.VAR.sellectedBorder.height = this.height;
    }

    // updateBorder() {
    //     if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
    //         this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
    //         this.game.VAR.sellectedBorder.y = this.y;//+ this.height / 2
    //         this.game.VAR.sellectedBorder.width = this.width;
    //         this.game.VAR.sellectedBorder.height = this.height;
    //     }
    // }

    // update(dt) {
    //     super.update(dt);

    // }

    // restartPosition() {
    //     if (this.nextPosition) {
    //         this.game.VAR.pathfinder.reRenderTile(this.nextPosition.row, this.nextPosition.column, 1);
    //     }

    //     if (this.currentPosition) {
    //         this.game.VAR.pathfinder.reRenderTile(this.currentPosition.row, this.currentPosition.column, 1);
    //     }


    //     this.nextPosition = null;
    //     this.currentPosition = null;
    // }

    unWalkable(index, type, cost) {
        for (let i = 0; i < this.width; i += 32) {
            for (let j = 0; j < this.height; j += 32) {
                const tile = this.game.VAR.map.getTileByCords(this.x + i, this.y + j);
                tile.type = type || 'solid';
                // this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, index);
                this.game.easystar.setAdditionalPointCost(Math.floor((this.x + i) / 32), Math.floor((this.y + j) / 32), 120)
            }
        }
    }
}
export default Building;