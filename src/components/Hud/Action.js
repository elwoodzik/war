import Icons from "./Icons";

class Action extends Icons {
    constructor(game, options) {
        super(game, options);

        // 
    }

    onClick() {
        console.log(this.data)
    }

    update(dt) {
        super.update(dt);
        // if (this.hovered) {
        //     console.log('a')
        //     this.game.VAR.hudBottom.hoverText.use(this.data.hoverText)
        // }
        // console.log('a')
    }

    onHover() {
        console.log('jest')
        this.game.VAR.hudBottom.hoverText.use(this.data.hoverText)
    }
    
    onLeave() {
        console.log('wysz')
        this.game.VAR.hudBottom.hoverText.use(' ')
    }
}
export default Action;