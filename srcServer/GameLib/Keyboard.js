class Keyboard {

    constructor(game) {
        this.game = game;

        this.use = {
            'left': {
                pressed: false
            },
            'up': {
                pressed: false
            },
            'down': {
                pressed: false
            },
            'right': {
                pressed: false
            },
            'W': {
                pressed: false
            },
            'S': {
                pressed: false
            },
            'A': {
                pressed: false
            },
            'D': {
                pressed: false
            },
            '1': {
                pressed: false
            },
            'SPACE': {
                pressed: false
            }
        }
    }

    trigger(type) {
        this.use[type].pressed = true;
    }

    triggerStop(type) {
        this.use[type].pressed = false;
    }

    off(type) {
        Object.keys(this.use).forEach((key) => {
            this.use[key].pressed = false;
        })
    }

    get(type) {
        return this.use[type].pressed;
    }
};

export default Keyboard;