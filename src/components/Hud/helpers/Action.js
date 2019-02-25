import Icon from "./Icon";

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
        if (this.currentAction && this.currentAction.cancel) {
            this.game.VAR.hudBottom.hoverText.use(`${this.currentAction.create.prefix} ${this.currentAction.create.name}`);
            this.game.VAR.hudBottom.hide();
            this.game.VAR.hudBottom.showName();
        }else if(this.currentAction){
            this.game.VAR.hudBottom.hoverText.use(`${this.currentAction.create.prefix} ${this.currentAction.create.name}`);
            this.game.VAR.hudBottom.goldText.use(`${this.currentAction.goldCost}`);
            this.game.VAR.hudBottom.woodText.use(`${this.currentAction.woodCost}`);
            
            this.game.VAR.hudBottom.show();
        }
    }

    onLeave() {
        this.game.VAR.hudBottom.hide();
    }
}
export default Action;