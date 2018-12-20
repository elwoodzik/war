import Buildings from "../Buildings";

class GoldMine extends Buildings {
    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'goldmine',
            name: 'Goldmine',
            descriptios: [
                'Resources:',
                'unlimited',
                // 'Wood: 100'
            ],
            inProgress: false,
            inProgressTime: 0,

            // actions : [
            //     {
            //         image: this.AssetManager.get('icons'),
            //         iconLeft: (-46 * 0 + -3 * 0) - 3,
            //         iconTop: (-38 * 0 + -3 * 0) - 3,
            //         goldCost: 100,
            //         woodCost: 0,
            //         time: 10000,
            //         // create: {
            //         //     class: Peasant,
            //         //     key: 'peasant'
            //         // },
            //         // callback: this.buildingUnit
            //     },
            // ],    
        }

        this.animations.add({
            key: 'first',
            frames: [
                { sx: 12, sy: 10, fW: 96, fH: 96, },
            ]
        });

        this.animations.playOnce({ key: 'first', delay: 16 })
        this.unWalkable(4, 'gold');
    }

    onClick() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && this.game.VAR.sellectedObj.cargo === 'empty') {
            this.game.VAR.sellectedObj.goToBuilding(this.game.VAR.goldMine, 1);
        } else if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && (this.game.VAR.sellectedObj.cargo === 'gold')) {
            this.game.VAR.sellectedObj.goToBuilding(this.game.VAR.town, 2);
        } else {
            super.onClick();
        }
    }

    // goToMine() {
    //     let endPos = this.game.VAR.map.getTileBySprite(this);
    //     const currentPos = this.game.VAR.map.getTileBySprite(this.game.VAR.sellectedObj);
    //     if (endPos.column === currentPos.column) {
    //         endPos = { ...endPos, column: endPos.column }
    //     } else if (endPos.column > currentPos.column) {
    //         endPos = { ...endPos, column: endPos.column - 1 }
    //     } else if (endPos.column < currentPos.column) {
    //         endPos = { ...endPos, column: endPos.column + 1 }
    //     }

    //     if (endPos.row === currentPos.row) {
    //         endPos = { ...endPos, row: endPos.row }
    //     } else if (endPos.row > currentPos.row) {
    //         endPos = { ...endPos, row: endPos.row - 1 }
    //     } else if (endPos.row < currentPos.row) {
    //         endPos = { ...endPos, row: endPos.row + 1 }
    //     }

    //     this.game.VAR.sellectedObj.restartPosition();
    //     this.game.VAR.sellectedObj.move(endPos);
    // }

    // update(dt) {
    //     super.update(dt);
    // }
}
export default GoldMine;