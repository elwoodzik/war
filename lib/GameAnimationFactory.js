class GameAnimationFactory {

    constructor(sprite) {
        this.sprite = sprite;
    }

    add(options) {
        if (!options) {
            throw 'oczekiwano obiektu jako argument przy tworzeniu animacji do: ' + this.sprite.constructor.name;
        }

        if (!options.key) {
            throw 'oczekiwano wlasciwosci `key` w przekazanym obiekcie';
        }

        if (!options.frames) {
            throw 'oczekiwano tablicy obiektów `frames` w przekazanym obiekcie';
        }

        this.chceckFrames(options.frames);

        this.sprite.states[options.key] = options;
        return this.sprite;
    }

    chceckFrames(frames) {
        if (frames.length === 0) {
            throw "W przekazanej tablicy frames jest błąd. Wymagane parametry to obiekt z kluczami: \n 'sx' \n 'sy' \n 'fW' \n 'fH' \n przy czym 'fW' i 'fH' muszą być większe od 0!";
        }
        for (let i = 0; i < frames.length; i++) {
            const frame = frames[i];
            if ((!frame.sx && frame.sx !== 0) || (!frame.sy && frame.sy !== 0) || !frame.fW || !frame.fH) {
                throw "W przekazanej tablicy frames jest błąd. Wymagane parametry to obiekt z kluczami: \n 'sx' \n 'sy' \n 'fW' \n 'fH' \n przy czym 'fW' i 'fH' muszą być większe od 0!";
            }
        }
    }

    play(options) {

        if (!options) {
            throw "Metoda play wymaga obiektu jako parametr";
        }

        if (!options.key) {
            throw "W momencie wywolania metody play wymagany jest 'key' nazwanej animacji";
        }

        if (options.key != this.sprite.state) {
            this.sprite.current_f = 0;
            this.sprite.once = false;
            this.sprite.state = options.key;
            this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW * this.sprite.scale;
            this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH * this.sprite.scale;
            this.sprite.halfWidth = (this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW / 2) * this.sprite.scale;
            this.sprite.halfHeight = (this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH / 2) * this.sprite.scale;
            this.sprite.f_max_delay = this.sprite.states[this.sprite.state].speed ? this.sprite.states[this.sprite.state].speed : options.delay || 10;
            if (typeof options.callback === 'function') {
                this.sprite.playCallback = options.callback;
                this.sprite.playCallbackDelay = options.callbackDelay || 1;
            } else {
                this.sprite.playCallback = null;
            }
        }

        return this.sprite;
    }

    playOnce(options) {

        if (!options) {
            throw "Metoda play wymaga obiektu jako parametr";
        }

        if (!options.key) {
            throw "W momencie wywolania metody play wymagany jest 'key' obrazka";
        }

        if (options.key != this.sprite.state) {
            this.sprite.once = true;
            this.sprite.current_f = 0;
            this.sprite.state = options.key;
            this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW * this.sprite.scale;
            this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH * this.sprite.scale;
            this.sprite.halfWidth = (this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW / 2) * this.sprite.scale;
            this.sprite.halfHeight = (this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH / 2) * this.sprite.scale;
            this.sprite.f_max_delay = options.delay || 10;
            if (typeof options.callback === 'function') {
                this.sprite.onceCallback = options.callback;
            } else {
                this.sprite.onceCallback = null
            }
        }
    }

    setImage(image) {
        this.sprite.image = this.sprite.loader.assetManager.get(image);
        this.sprite.current_f = 0;
    }

    get() {
        return this.sprite.state;
    }
};

export default GameAnimationFactory;