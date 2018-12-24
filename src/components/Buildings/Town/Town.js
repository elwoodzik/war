import Buildings from "../Buildings";
import BuildPeasant from "./actions/BuildPeasant";

class Town extends Buildings {
    constructor(game, options) {
        super(game, options);

        this.info = {
            imageKey: 'town',
            name: 'Town',
            descriptios: [
                'Production',
                'Gold: 100',
                'Wood: 100'
            ],
            inProgress: false,
            inProgressTime: 0,

            actions: [
                {
                    key: 'peasant',
                    hoverText: '1'
                },
                {
                    key: 'town',
                    hoverText: '2'
                },
                {
                    key: 'town',
                    hoverText: '3'
                },
                {
                    key: 'peasant',
                    hoverText: '4'
                },
                {
                    key: 'town',
                    hoverText: '5'
                },
                {
                    key: 'town',
                    hoverText: '6'
                }
            ],

        }
        // this.infoIcon = new BuildPeasant(this.game, {
        //     key: 'icons',
        //     x: 400
        // })
        // this.infoIcon.animations.playOnce({ key: 'peasant' });
        // console.log(this.infoIcon)
        this.animations.add({
            key: 'first',
            frames: [
                { sx: 265, sy: 5, fW: 128, fH: 128, },
            ]
        });

        this.animations.playOnce({ key: 'first', delay: 16 })
        this.unWalkable(5, 'town', 30);
    }

    onHover() {
        console.log('a')
    }

    update(dt) {
        super.update(dt);
    }
}
export default Town;