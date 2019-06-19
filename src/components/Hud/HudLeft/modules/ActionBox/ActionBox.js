import Action from "../../../helpers/Action";
import Main from "../../../../Pages/Main";

class ActionBox {

    constructor(game) {
        this.game = game;
        this.group = game.add.group();

        const actionCount = 10;
        this.actions = [];

        for (let i = 0; i < actionCount; i++) {
            this.actions.push(new Action(game, { key: 'icons' }));
        }

        this.group.add(this.actions);
    }

    set(actions) {
        this.hide();
        if (this.game.VAR.sellectedObj && !this.game.VAR.sellectedObj.info.inProgress) {
            if (actions && actions.length > 0) {
                let x = 5;
                let y = 200;
                let index = 1;
                for (let i = 0; i < actions.length; i++) {
                    const action = this.actions[i];
                    action.currentAction = actions[i];
                    let req = true;

                    if (action.currentAction.requirements) {
                        req = action.currentAction.requirements.every((req) => Main.SETTINGS.player.requirements[req])
                    }

                    if (req && action.currentAction.used && !Main.SETTINGS.player.requirements[action.currentAction.key]) {
                        action.used = action.currentAction.used;
                        action.animations.playOnce({ key: actions[i].key });
                        action.x = x;
                        action.y = y;

                        x += 52;
                        if (index % 3 === 0) {
                            y += 42;
                            x = 5;
                        }
                        index++;
                    }
                }
            } else {
                return false;
            }
        }
    }

    hide() {
        this.group.hide();
    }
};

export default ActionBox;