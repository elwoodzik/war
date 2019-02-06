import Icon from "../../InfoBox/modules/Icon";


class Action extends Icon {
    constructor(game, options) {
        super(game, options);
        
        this.used = false;
        this.zIndex = 51;
    }

    onClick() {
        if (this.currentAction && this.currentAction.onActionClick) {
            this.currentAction.onActionClick(this.currentAction);
        }
    }

    update(dt) {
        super.update(dt);
    }

    onHover() {
        if (this.currentAction && this.currentAction.onActionHover) {
            this.game.VAR.hudBottom.hoverText.use(this.currentAction.onActionHover(this.currentAction));
            this.game.VAR.hudBottom.goldIcon.used = true;
            this.game.VAR.hudBottom.woodIcon.used = true;
        }
    }

    onLeave() {
        this.game.VAR.hudBottom.hoverText.use(' ');
        this.game.VAR.hudBottom.goldIcon.used = false;
        this.game.VAR.hudBottom.woodIcon.used = false;
    }
}
export default Action;