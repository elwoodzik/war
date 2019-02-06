import Action from "./modules/Action";

class ActionBox {

    constructor(game) {
        const actionCount = 10;
        this.actions = [];

        for (let i = 0; i < actionCount; i++) {
            this.actions.push(
                new Action(game, { key: 'icons' })
            )
        }
    }

    set(actions) {
        if (actions && actions.length > 0) {
            let x = 5;
            let y = 200;
            let index = 1;
            for (let i = 0; i < actions.length; i++) {
                const action = this.actions[i];
                action.used = true;
                action.animations.playOnce({ key: actions[i].key });
                action.x = x;
                action.y = y;
                action.currentAction = actions[i];
                x += 52;
                if (index % 3 === 0) {
                    y += 42;
                    x = 5;
                }
                index++;
            }
        } else {
            return false;
        }
    }
};

export default ActionBox;