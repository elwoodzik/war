import Sprite from "../../../lib/Sprite";
import PathMove from "../../../lib/PathMove";

class Units extends Sprite {
    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.objectType = 'unit';

        this.currentPosition = null;
        this.nextPosition = null;
        this.speed = 65;
        this.isAttacking = false;

        // this.game.VAR.map.addToFog(this.x, this.y, 32);

        this.pathMove = new PathMove(this.game, {
            sprite: this,
            spriteAnimation: this.getAnimationInMove,
            extendsMove: this.extendsMove
        })
    }

    onClick() {
        if (!this.buildingPut.used) {
            this.selectedBorder();
            this.game.VAR.hudLeft.set(this.info);
            this.game.VAR.hudLeft.cancelBox.used = false;
            this.game.VAR.hudLeft.creationBox.show();
            this.getRandomSelectedSound();
        }
    }

    onRightClick() {
        return false;
        // if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objectType === 'unit' && this.game.VAR.sellectedObj.objID !== this.objID) {
        //     const endPos = this.game.VAR.map.getTileBySprite(this);

        //     if (this.game.VAR.sellectedObj.inWooding) {
        //         this.game.VAR.sellectedObj.doInTimeStop();
        //         this.game.VAR.sellectedObj.inWooding = false;
        //     }

        //     this.game.VAR.sellectedObj.getRandomMoveSound();
        //     this.game.VAR.sellectedObj.pathMove.restartPosition();
        //     this.game.VAR.sellectedObj.pathMove.move(endPos);
        // }
    }


    // followEnemy = (enemy) => {
    //     // console.log('ffff', enemy)
    //     // this.attackTarget = true;

    //     this.pathMove.move(null, (path, player) => {
    //         // console.log(enemy.pathMove.isMoving)
    //         if (enemy.pathMove.isMoving) {
    //             this.followEnemy(enemy);
    //         } else {
    //             this.attackEnemy(enemy)
    //         }
    //     }, enemy);
    // }

    // attackEnemy(enemy) {
    //     if (this.type === 'worker') {
    //         this.image = this.AssetManager.get('chop');
    //     }
    //     this.isAttacking = true;
    //     this.dir = `atck${this.dir.slice(4)}`;
    //     this.animations.play({
    //         key: this.dir,
    //         callback: this.onHitEnemy.bind(this, enemy)
    //     })

    //     this.width = this.states[this.state].frames[this.current_f].fW;
    //     this.height = this.states[this.state].frames[this.current_f].fH;
    //     this.y = this.y - this.height + 32;
    //     this.pathMove.currentTile.type = 'empty';
    //     this.pathMove.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
    //     this.pathMove.currentTile.type = 'solid';
    // }

    // onHitEnemy(enemy) {
    //     const dmg = this.game.rand(this.dmg[0], this.dmg[1]);

    //     enemy.currentHp -= dmg - enemy.armor;
    //     if (enemy.currentHp <= 0) {
    //         enemy.used = false;
    //         this.current_f = 0;
    //         if (this.type === 'worker') {
    //             this.image = this.AssetManager.get('peasant');
    //         }
    //         this.dir = `idle${this.dir.slice(4)}`;

    //         this.animations.play({
    //             key: this.dir,
    //         })

    //         this.width = this.states[this.state].frames[this.current_f].fW;
    //         this.height = this.states[this.state].frames[this.current_f].fH;

    //         this.y = this.pathMove.currentTile.y - this.height + 32;
    //         this.pathMove.currentTile = this.game.VAR.map.getTileByCords(this.x, this.y + this.height - 32);
    //         // 
    //         this.pathMove.currentTile.type = 'solid';

    //     }
    //     else {
    //         this.followEnemy(enemy);
    //     }
    // }


    getRandomSelectedSound() {
        if (this.sounds && this.sounds.selected && this.sounds.selected.length > 0) {
            const rand = this.game.rand(0, this.sounds.selected.length - 1);
            this.AssetManager.play(this.sounds.selected[rand]);
        }
    }

    getRandomMoveSound() {
        if (this.sounds && this.sounds.move && this.sounds.move.length > 0) {
            const rand = this.game.rand(0, this.sounds.move.length - 1);
            this.AssetManager.play(this.sounds.move[rand]);
        }
    }

    selectedBorder() {
        if (this.isRender) {
            this.game.VAR.sellectedObj = this;
            this.game.VAR.sellectedBorder.show();
        }

        // this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
        // this.game.VAR.sellectedBorder.y = this.y; //+ this.height / 2
        // this.game.VAR.sellectedBorder.width = this.width;
        // this.game.VAR.sellectedBorder.height = this.height;
    }

    unSelectedBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedObj = null;
            this.game.VAR.sellectedBorder.hide();
        }
    }

    hideBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedBorder.hide();
        }
    }

    showBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedBorder.show();
        }
    }

    updateBorder() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
            this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
            // this.game.VAR.sellectedBorder.y = this.y + 8//+ this.height / 2
            this.game.VAR.sellectedBorder.y = this.y + (this.height - 32)//+ this.height / 2
            this.game.VAR.sellectedBorder.width = 32//this.width;
            this.game.VAR.sellectedBorder.height = 32//this.height;
        }
    }

    draw(dt) {

        // this.context.globalCompositeOperation = 'source-over';

        super.draw(dt);


        // this.context.globalCompositeOperation = 'source-atop';

        // if (this.path) {
        //     this.path.forEach((path) => {
        //         this.context.beginPath();
        //         this.context.strokeStyle = 'red';
        //         this.context.rect((path.x * 32) - this.game.camera.xScroll, (path.y * 32) - this.game.camera.yScroll, 32, 32)
        //         this.context.stroke()
        //         this.context.closePath();
        //     })
        // }
    }


    update(dt) {
        this.animations.play({
            key: this.dir
        })
        super.update(dt);
        this.updateBorder();
    }

    getAnimationInMove(startPos, nextStep, callback) {
        const _nextStep = { x: nextStep.x * 32, y: nextStep.y * 32 };

        if (this.type === 'worker') {
            this.image = this.AssetManager.get('peasant');
        }
        // this.image = this.AssetManager.get('chop')

        if (_nextStep.x > startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_right_down';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_right_down';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_right_down';
            } else if (this.isMoving) {
                this.dir = 'move_right_down';
            } else {
                this.dir = 'idle_right_down';
            }
        } else if (_nextStep.x === startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_down';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_down';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_down';
            } else if (this.isMoving) {
                this.dir = 'move_down';
            } else {
                this.dir = 'idle_down';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y > startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_down';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_left_down';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_left_down';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_left_down';
            } else if (this.isMoving) {
                this.dir = 'move_left_down';
            } else {
                this.dir = 'idle_left_down';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y === startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_left';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_left';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_left';
            } else if (this.isMoving) {
                this.dir = 'move_left';
            } else {
                this.dir = 'idle_left';
            }
        } else if (_nextStep.x < startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_left_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_left_up';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_left_up';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_left_up';
            } else if (this.isMoving) {
                this.dir = 'move_left_up';
            } else {
                this.dir = 'idle_left_up';
            }
        } else if (_nextStep.x === startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_up';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_up';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_up';
            } else if (this.isMoving) {
                this.dir = 'move_up';
            } else {
                this.dir = 'idle_up';
            }
        } else if (_nextStep.x > startPos.x && _nextStep.y < startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right_up';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_right_up';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_right_up';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_right_up';
            } else if (this.isMoving) {
                this.dir = 'move_right_up';
            } else {
                this.dir = 'idle_right_up';
            }
        } else if (_nextStep.x > startPos.x && _nextStep.y === startPos.y) {
            if (this.cargo === 'gold') {
                this.dir = 'move_gold_right';
            } else if (this.cargo === 'wood') {
                this.dir = 'move_wood_right';
            } else if (this.inWooding) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'chop_right';
            } else if (this.isAttacking) {
                this.image = this.AssetManager.get('chop');
                this.dir = 'atck_right';
            } else if (this.isMoving) {
                this.dir = 'move_right';
            } else {
                this.dir = 'idle_right';
            }
        }

        this.animations.play({
            key: this.dir,
            callback: callback ? callback : null
        })

        this.width = this.states[this.state].frames[this.current_f].fW;
        this.height = this.states[this.state].frames[this.current_f].fH;

        this.pathMove.currentTile = this.game.VAR.map.getTileBySprite(this);
        this.y = this.pathMove.currentTile.y - this.height + 32;
    }
}
export default Units;