
class Body {
    constructor(game, sprite) {
        this.game = game;
        this.sprite = sprite;

        this.velocity = {
            x: 0,
            y: 0
        };
        this.gravity = {
            x: 0,
            y: 0
        }
        //
        this.scale = 1;
        this.angle = 0;
        this.anchorX = 0;
        this.anchorY = 0;
        this.pushed = false;
        //
        this.colideWorldSide = false;
        this.colideWorldSideLeft = true;
        this.colideWorldSideRight = true;
        this.colideWorldSideBottom = true;
        this.colideWorldSideTop = true;

        this.isGround = false;

        this.worldBounds = false;
        this.isOutOfScreen = false;
    }

    setWorldBounds(bool) {
        this.worldBounds = bool;
        return this.sprite;
    }

    setWorldColider(bool) {
        this.colideWorldSide = bool;
        return this.sprite;
    }

    worldBounce() {
        if (this.colideWorldSide) {
            if (this.colideWorldSideBottom && this.sprite.y + this.sprite.height * this.scale >= this.game.portViewHeight) {
                this.velocity.y = this.worldBounds ? this.velocity.y * -1 : 0;
                this.sprite.y = this.game.portViewHeight - this.sprite.height * this.scale;
            }
            else if (this.colideWorldSideTop && this.sprite.y * this.scale <= 0) {
                this.velocity.y = this.worldBounds ? this.velocity.y * -1 : 0;
                this.sprite.y = 0;
            }
            if (this.colideWorldSideRight && this.sprite.x + this.sprite.width * this.scale >= this.game.portViewWidth) {
                this.velocity.x = this.worldBounds ? this.velocity.x * -1 : 0;
                this.sprite.x = this.game.portViewWidth - this.sprite.width * this.scale;
            }
            else if (this.colideWorldSideLeft && this.sprite.x * this.scale <= 0) {
                this.velocity.x = this.worldBounds ? this.velocity.x * -1 : 0;
                this.sprite.x = 0
            }
        }
    }

    setScale(scale) {
        this.scale = scale;
    }

    scaleUp(too, speed, callback) {
        this.scaleUpTrig = true;
        this.scaleSpeed = speed;
        this.scaleToo = too;
        this.scallUpCallback = callback;
    }

    scaleDown(too, speed, callback) {
        this.scaleDownTrig = true;
        this.scaleSpeed = speed;
        this.scaleToo = too;
        this.scallDownCallback = callback;
    }

    scaleUpDownHandler() {
        if (this.scaleUpTrig) {
            if (this.scale < this.scaleToo) {
                this.scale += this.scaleSpeed;
                if (this.scale > this.scaleToo) {
                    this.scale = this.scaleToo;
                }
            } else {
                this.scaleUpTrig = false;
                if (typeof this.scallUpCallback === 'function') {
                    this.scallUpCallback();
                }

            }
        } else if (this.scaleDownTrig) {
            if (this.scale > this.scaleToo) {
                this.scale -= this.scaleSpeed;
            } else {
                this.scaleDownTrig = false;
                this.scale = 1;
                if (typeof this.scallDownCallback === 'function') {
                    this.scallDownCallback();
                }
            }
        }
    }

    useGravity(obj) {
        // !obj.body.isGround && 
        if (obj.y + obj.states[obj.state].fH < obj.game.canvas.height && !obj.body.ground) {
            obj.body.velocity.y += obj.body.gravity.y / 1000;
        } else {
            obj.body.velocity.y = 0;
            obj.body.ground = false;
        }
    }

    addAngle(val) {
        if (this.angle * 180 / Math.PI >= 360) {
            this.angle = 0;
        }
        this.angle += val * Math.PI / 180;
    }

    remAngle(val) {
        if (this.angle * 180 / Math.PI <= -360) {
            this.angle = 0;
        }
        this.angle -= val * Math.PI / 180;
    }
    
    rotate(val) {
        this.angle = val || 0;
        return this.sprite;
    }

    setVelocity(x, y) {
        if (!x || !y) {
            console.log("wymagane podanie parametrów: 'x' i 'y' ");
        } else {
            this.velocity.x = x;
            this.velocity.y = y;
        }
        return this.sprite;
    }

    setAnchor(x, y) {
        this.anchorX = x;
        this.anchorY = y;

        return this.sprite;
    }

    rotateByMouse(spritePosition, easing, easingSpeed = 0.06) {

        if (spritePosition === undefined) {
            throw "Wymagane jest podanie poczatkowego nachylenia obrazka, jako INT.\n Opcjonalnie można użyć dwóch pozostałych parametrów do easingu. \n easing: Boolean i easingSpeed: Float"
        }

        const dx = this.game.mouse.mouseX + this.game.camera.xScroll - this.sprite.x - this.sprite.width * this.anchorX;
        const dy = this.game.mouse.mouseY + this.game.camera.yScroll - this.sprite.y - this.sprite.height * this.anchorY;

        if (easing) {
            const toAngle = Math.atan2(dy, dx) - spritePosition * Math.PI / 180;

            const radDiff = toAngle - this.angle;
            if (radDiff > (Math.PI)) {
                this.angle += 2 * Math.PI;
            } else if (radDiff < -Math.PI) {
                this.angle -= 2 * Math.PI;
            }

            const targetVel = radDiff * easingSpeed;
            this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.01, this.rotSpeed + 0.01);

            this.angle += this.rotSpeed;
        } else {
            const disX = Math.abs(dx);
            const disY = Math.abs(dx);

            if (disX > 3 || disY > 3) {
                this.angle = Math.atan2(dy, dx) - spritePosition * Math.PI / 180;
            }
        }
    }

    rotateAndMoveByMouse(spritePosition, speed, easing, easingSpeed = 0.06) {
        if (spritePosition === undefined || speed === undefined) {
            throw "Wymagane jest podanie poczatkowego nachylenia obrazka, jako INT i predkości jako INT.\n Opcjonalnie można użyć dwóch pozostałych parametrów do easingu. \n easing: Boolean i easingSpeed: Float"
        }

        const dx = this.game.mouse.mouseX - this.sprite.x - this.sprite.halfWidth;
        const dy = this.game.mouse.mouseY - this.sprite.y - this.sprite.halfHeight;
        const tilt = spritePosition * Math.PI / 180;

        if (easing) {
            const toAngle = Math.atan2(dy, dx) - tilt;
            const toPos = this.angle + tilt;
            const pi2 = 2 * Math.PI;

            const radDiff = toAngle - this.angle;
            if (radDiff > (Math.PI)) {
                this.angle += pi2;
            } else if (radDiff < -Math.PI) {
                this.angle -= pi2;
            }

            const targetVel = radDiff * easingSpeed;
            this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.04, this.rotSpeed + 0.04);
            this.angle += this.rotSpeed;

            this.velocity.x = Math.cos(toPos) * speed;
            this.velocity.y = Math.sin(toPos) * speed;
        } else {
            const disX = Math.abs(dx);
            const disY = Math.abs(dy);

            if (disX > 20 || disY > 20) {
                const distance = Math.sqrt(dx * dx + dy * dy);
                this.angle = Math.atan2(dy, dx) - tilt;
                this.velocity.x = dx / distance * speed;
                this.velocity.y = dy / distance * speed;
            }
        }
    }

    // moveToPoint(x, y, speed) {
    //     const dx = x - this.sprite.x;
    //     const dy = y - this.sprite.y;

    //     const distance = Math.sqrt(dx * dx + dy * dy);

    //     if (distance > 1) {
    //         this.velocity.x = dx / distance * speed;
    //         this.velocity.y = dy / distance * speed;
    //     } else {
    //         this.velocity.x = 0;
    //         this.velocity.y = 0;
    //     }
    // }

    // moveToPointRotate(x, y, speed) {
    //     const tilt = 90 * Math.PI / 180;
    //     const dx = x - this.sprite.x;
    //     const dy = y - this.sprite.y;

    //     const distance = Math.sqrt(dx * dx + dy * dy);

    //     if (distance > 1) {
    //         this.angle = Math.atan2(dy, dx) - tilt;
    //         this.velocity.x = dx / distance * speed;
    //         this.velocity.y = dy / distance * speed;
    //     } else {
    //         this.velocity.x = 0;
    //         this.velocity.y = 0;
    //     }
    // }

    clip(x, min, max) {
        return x < min ? min : x > max ? max : x;
    }
}

export default Body;