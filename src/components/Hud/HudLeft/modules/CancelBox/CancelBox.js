
import Action from '../../../helpers/Action';

class CancelBox extends Action {

    constructor(game, options) {
        super(game, options);

        this.game = game;

        this.x = 5;
        this.y = 200;

        this.animations.play({ key: 'cancel' });

        this.currentAction = {
            cancel: true,
            create: {
                prefix: '',
                name: 'Anuluj'
            },
            onActionClick: this.onActionClick
        };
    }

    onActionClick = () => {
        this.used = false;
        this.game.VAR.sellectedObj.buildingPut.used  = false;
        this.game.VAR.hudLeft.set(this.game.VAR.sellectedObj.info);
    }
};

export default CancelBox;