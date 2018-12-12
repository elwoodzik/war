import Image from '../GameLib/Image';

class Barrel extends Image {

    constructor(game, options) {
        super(game, options);
        this.marginX = options.marginX || 0;
        this.marginY = options.marginY || 0;
        this.x = this.x + this.marginX;
        this.y = this.y + this.marginY;

        this.create();
    }

    create() {
        this.barrelLength = 35; // zasieg lufy
        this.currentTimeToShot = 150; // obecny czas do wystrzalu
        this.shotTime = 150; // czas potrzebny by wystrzelic
        this.shotTimeAcc = 1; // predkosc ladowania pocisku

        this.body.setAnchor(0.3, 0.5);

        this.setIndex(10);
    }

    update(dt) {
        superUpdate.call(this, dt);
        this.rotateByMouse();

    }

    rotateByMouse() {
        const dx = this.user.mouse.mouseX + this.user.camera.cameraX - this.x - this.width * this.body.anchorX;
        const dy = this.user.mouse.mouseY + this.user.camera.cameraY - this.y - this.height * this.body.anchorY;

        const toAngle = Math.atan2(dy, dx);

        const radDiff = toAngle - this.body.angle;

        if (radDiff > (Math.PI)) {
            this.body.angle += 2 * Math.PI;
        } else if (radDiff < -Math.PI) {
            this.body.angle -= 2 * Math.PI;
        }

        const targetVel = radDiff * 0.01;
        this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.01, this.rotSpeed + 0.01);

        this.body.angle += this.decimal(this.rotSpeed, 5);

        if (this.lastAngle !== this.body.angle) {
            this.game.multiplayer.socket.emitToMe("on barrel move", this.socket, { angle: this.body.angle, socketId: this.socketId });
            this.game.multiplayer.socket.broadcastToRoom(this.socket, 'on enemy barrel move', 'global', { angle: this.body.angle, socketId: this.socketId });
        }

        this.lastAngle = this.body.angle;
    }

    clip(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }

    decimal(number, k) {
        const factor = Math.pow(10, k + 1);
        number = Math.round(Math.round(number * factor) / 10);
        return number / (factor / 10);
    }
};

const superUpdate = Image.prototype.update;



export default Barrel;
