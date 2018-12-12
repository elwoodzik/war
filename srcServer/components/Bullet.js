import Image from '../GameLib/Image';

class Bullet extends Image {

    constructor(game, options) {
        super(game, options);
        this.marginX = options.marginX || 0;
        this.marginY = options.marginY || 0;

        this.create();
    }

    create() {
        this.body.setAnchor(0.5, 0.5);
        this.zIndex = 8;
        this.startLifeTime = 38;
        this.speed = 900;
    }

    update(dt) {
        superUpdate.call(this, dt);

        const centerX = this.getCenter().x;
        const centerY = this.getCenter().y;

        const skeleton = {
            front: this.game.map.getPoint(centerX, centerY, centerX + this.halfWidth, centerY, this.body.angle)
        }

        if (this.game.map.getNextPosition(skeleton) === 'solid') {
            this.game.multiplayer.socket.emitToMe("bullet destroy", this.socket, { socketId: this.socketId, collision: true, x: this.x, y: this.y, idx: this.idx });
            this.game.multiplayer.socket.broadcastToRoom(this.socket, 'bullet destroy', 'global', { socketId: this.socketId, collision: true, x: this.x, y: this.y, idx: this.idx });
            this.game.GROUP.Bullet.recycle(this);
        }

        this.lifeTime--;

        if (this.lifeTime <= 0) {
            this.game.multiplayer.socket.emitToMe("bullet destroy", this.socket, { socketId: this.socketId, x: this.x, y: this.y, idx: this.idx });
            this.game.multiplayer.socket.broadcastToRoom(this.socket, 'bullet destroy', 'global', { socketId: this.socketId, x: this.x, y: this.y, idx: this.idx });
            this.game.GROUP.Bullet.recycle(this);
        }

        this.game.physic.collide(this, this.game.gameObjects, (bullet, obj) => {
            if (obj.constructor.name === 'Tank' && obj.socketId !== this.socketId) {
                obj.life--;

                if (obj.life <= 0) {
                    if (obj.barrel) {
                        obj.barrel.hide();
                        obj.hide();

                        this.game.multiplayer.socket.emitToMe("tank enemy destroy", this.socket, { socketId: obj.socketId, respawnTime: obj.respawnTime });
                        this.game.multiplayer.socket.broadcastToRoom(this.socket, 'tank enemy destroy', 'global', { socketId: obj.socketId, respawnTime: obj.respawnTime });

                        obj.respawn();
                    }
                }

                this.game.multiplayer.socket.emitToMe("bullet destroy", this.socket, { socketId: this.socketId, x: this.x, y: this.y, tankSocketId: obj.socketId, idx: this.idx });
                this.game.multiplayer.socket.broadcastToRoom(this.socket, 'bullet destroy', 'global', { socketId: this.socketId, x: this.x, y: this.y, tankCollision: true, life: obj.life, tankSocketId: obj.socketId, idx: this.idx });
                this.game.GROUP.Bullet.recycle(this);
            }
        })
    }

    move(barrel) {
        if (barrel) {
            this.lifeTime = this.startLifeTime;
            this.body.angle = barrel.body.angle;
            this.x = barrel.x + this.marginX + Math.cos(this.body.angle) * barrel.barrelLength;
            this.y = barrel.y + this.marginY + Math.sin(this.body.angle) * barrel.barrelLength;
            this.body.setVelocity(Math.cos(this.body.angle) * this.speed, Math.sin(this.body.angle) * this.speed);

            this.game.multiplayer.socket.emitToMe("create bullet", this.socket, { velocityX: this.body.velocity.x, velocityY: this.body.velocity.y, x: this.x, y: this.y, angle: this.body.angle, speed: this.speed, socketId: this.socketId, marginX: this.marginX, marginY: this.marginY, idx: this.idx });
            this.game.multiplayer.socket.broadcastToRoom(this.socket, 'create bullet', 'global', { velocityX: this.body.velocity.x, velocityY: this.body.velocity.y, x: this.x, y: this.y, angle: this.body.angle, speed: this.speed, socketId: this.socketId, marginX: this.marginX, marginY: this.marginY, idx: this.idx });
        }
    }
};

const superUpdate = Image.prototype.update;

export default Bullet;