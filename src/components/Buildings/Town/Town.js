import Buildings from "../Buildings";

class Town extends Buildings {
    constructor(game, options) {
        super(game, options);


        this.info = {
            imageKey: 'town',
            name : 'Town',
            descriptios : [
                'Production',
                'Gold: 100',
                'Wood: 100'
            ],
            inProgress : false,
            inProgressTime : 0,
    
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