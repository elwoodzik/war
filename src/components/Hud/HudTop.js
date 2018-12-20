import Rect from "../../../lib/Rect";

class HudTop extends Rect {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = 0;
        this.y = 0;
        this.width = this.game.width;
        this.height = 21;
        this.fill = 'gray';
        this.static = true;

        this.goldIcon = this.game.add.image({
            x: 350,
            y: 2,
            key: 'gold_icon',
            static: true
        })
        this.goldText = this.game.add.text({
            text: 500,
            x: 375,
            y: 2,
            asImage: true,
            static: true,
            fontSize: 18
        })

        this.woodIcon = this.game.add.image({
            x: 550,
            y: 2,
            key: 'wood_icon',
            static: true
        })
        this.woodText = this.game.add.text({
            text: 200,
            x: 575,
            y: 2,
            asImage: true,
            static: true,
            fontSize: 18
        })

        this.homeIcon = this.game.add.image({
            x: 750,
            y: 2,
            key: 'home_icon',
            static: true
        })

        this.homeTextCurrent = this.game.add.text({
            text: '0',
            x: 775,
            y: 2,
            asImage: true,
            static: true,
            fontSize: 18
        })
        this.game.add.text({
            text: '/',
            x: 788,
            y: 2,
            asImage: true,
            static: true,
            fontSize: 18
        })
        this.homeTextMax = this.game.add.text({
            text: 5,
            x: 795,
            y: 2,
            asImage: true,
            static: true,
            fontSize: 18
        })
    }
}
export default HudTop;