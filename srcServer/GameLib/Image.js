import _ObjectSettings from './_ObjectSettings';
import Body from './Body';

class Image extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);

        if (!this.key) {
            return console.error('Musi podany byc klucz do obrazka przy tworzeniu Classy: ' + this.constructor.name);
        }

        this.type = "image";
        this.body = new Body(this.game, this);

    }

    update(dt) {
        this.body.worldBounce();
        this.useThereAndBack();
        this.moveToPointEasingHandler();
        this.moveToPointHandler();

        if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
            this.x += (dt * this.body.velocity.x);
            this.y += (dt * this.body.velocity.y);
        }

        //this.game.multiplayer.socket.socket.emit('entity update', this.toEmit());
        //this.game.multiplayer.socket.emit('entity update');
    }

    toEmit(callback) {
        if (typeof callback === 'function') {
            return callback();
        } else {
            console.error('brak callbacka! wyslano domyslny zestaw danych!');
            return {
                key: this.key,
                x: this.x,
                y: this.y,
                velocity: this.body.velocity,
                angle: this.body.angle,
                states: this.states,
                state: this.state,
                socketId: this.socketId,
                marginX: this.marginX,
                marginY: this.marginY
            }
        }

    }


}

export default Image;