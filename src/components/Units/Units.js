import Sprite from "../../../lib/Sprite";
import PathMove from "../../../lib/PathMove";
import Main from "../Pages/Main";
import Peasant from "./Peasant/Peasant";

class Units extends Sprite {
    constructor(game, options) {
        super(game, options);
        this.game = game;

        this.objectType = 'unit';

        this.currentPosition = null;
        this.nextPosition = null;
        this.speed = 60 * Main.SETTINGS.unitsSpeed;
        this.isAttacking = false;
        this.enemy = options.enemy || false;

        // this.game.VAR.map.addToFog(this.x, this.y, 32);

        this.pathMove = new PathMove(this.game, {
            sprite: this,
            spriteAnimation: this.getAnimationInMove,
            extendsMove: this.extendsMove
        });

        this.inRange = this.game.add.inRange({
            element: this,
            target: Main.SETTINGS.people,
            isRender: false,
            zIndex: 2,
            radius: 120,
            diffX: -32 / 2,
        })
    }

    onClick() {
        if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.buildingPut.used || this.enemy) {
            return false;
        }

        this.selectedBorder();

        this.game.VAR.hudLeft.set(this.info);
        this.game.VAR.hudLeft.cancelBox.used = false;
        this.game.VAR.hudLeft.creationBox.show();
        this.getRandomSelectedSound();

    }

    onRightClick() {
        if (this.enemy && this.game.VAR.sellectedObj) {
            this.game.VAR.sellectedObj.pathMove.followEnemy(this);
        }
        return false;
    }

    setDmg(min, max) {
        return () => [min + Main.SETTINGS.upgrade.sword, max + Main.SETTINGS.upgrade.sword];
    }

    setRangeDmg(min, max) {
        return () => [min + Main.SETTINGS.upgrade.arrow, max + Main.SETTINGS.upgrade.arrow];
    }

    setArmor(val) {
        return () => val + Main.SETTINGS.upgrade.armor;
    }

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
        if (!this.attackTarget && this.enemy) {
            this.inRange.rectCircleColliding(this.pathMove.followEnemy)
        }
        super.update(dt);
        this.updateBorder();
    }

    // onHitEnemy(enemy) {
    //     if (enemy.used) {
    //         const dmg = this.game.rand(this.sprite.dmg[0], this.sprite.dmg[1]);
    //         enemy.currentHp -= dmg - enemy.armor;

    //         if (enemy.currentHp <= 0) {
    //             enemy.used = false;
    //             this.sprite.isAttacking = false;
    //             this.sprite.isMoving = false;
    //             if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
    //                 this.spriteAnimation(this.currentTile, this.nextStep);
    //             }

    //             if (enemy.pathMove.nextTile) {
    //                 enemy.pathMove.nextTile.type = 'empty';
    //                 this.game.easystar.setAdditionalPointCost(enemy.pathMove.nextTile.row, enemy.pathMove.nextTile.column, 0);
    //             }
    //             if (enemy.pathMove.currentTile) {
    //                 enemy.pathMove.currentTile.type = 'empty';
    //                 this.game.easystar.setAdditionalPointCost(enemy.pathMove.currentTile.row, enemy.pathMove.currentTile.column, 0);
    //             }
    //             // this.currentTile.type = 'solid';
    //             // this.game.easystar.setAdditionalPointCost(this.currentTile.row, this.currentTile.column, 200);

    //             enemy.unSelectedBorder();
    //             this.sprite.attackTarget = null;
    //         } else {
    //             this.followEnemy(enemy);
    //         }
    //     } else {
    //         this.sprite.attackTarget = null;
    //         this.sprite.isAttacking = false;
    //         this.sprite.isMoving = false;
    //         if (this.spriteAnimation && typeof this.spriteAnimation === 'function') {
    //             this.spriteAnimation(this.currentTile, this.nextStep);
    //         }
    //     }
    // }
    // upgrade(type) {
    //     if (type === 'sword') {
    //         this.
    //     }
    // }

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
        } else {
            this.dir = `idle${this.dir.slice(4)}`;
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