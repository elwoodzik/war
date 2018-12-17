import Rect from "../../../lib/Rect";
import Icons from "./Icons";

class Hud extends Rect {
    constructor(game, options) {
        super(game, options);

        this.immovable = true;
        this.x = 0;
        this.y = 0;
        this.width = 32 * 5;
        this.height = this.game.height;
        this.fill = 'gray';
        this.static = true;

        this.infoName = this.game.add.text({
            text: 'aaa\r\nss',
            x: 60,
            y: 45,
            // asImage: true,
            static: true,
            fontSize: 18
        }).getProps()

        this.infoIcon = new Icons(this.game, {
            key: 'icons'
        })

        this.descriptionsInfo = []
        for (let i = 0; i < 5; i++) {
            this.descriptionsInfo.push(
                this.game.add.text({
                    x: -500,
                    y: 100,
                    static: true,
                    fontSize: 18,
                    text: 'test',

                })
            )
        }
    }

    setInfo(info) {
        console.log(info)
        this.infoName.use(info.name);
        this.infoIcon.animations.playOnce({ key: info.imageKey });
        this.hideDescription();
        this.showDescription(info.descriptios)
    }

    hideDescription() {
        for (let i = 0; i < this.descriptionsInfo.length; i++) {
            const text = this.descriptionsInfo[i];
            text.used = false;
        }
    }

    showDescription(descriptios) {
        for (let i = 0; i < descriptios.length; i++) {
            const text = this.descriptionsInfo[i];
            text.x = 30;
            text.y = 100 + 22 * i;
            text.used = true;
            text.use(descriptios[i])
            console.log(text)
        }
    }

    onClick() {
        console.log('rect')
        return false;
    }
}
export default Hud;