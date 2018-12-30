import Sprite from "../../../lib/Sprite";
import Peasant from "../Units/Peasant/Peasant";

class Building extends Sprite {
    constructor(game, options) {
        super(game, options);

        this.game = game;
        // const startPos = this.game.VAR.pathfinder.getTileBySprite(this);
        // this.currentPosition = this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 3);
        // this.nextPosition = null;
    }

    onClick() {
        this.selectedBorder();
        this.game.VAR.hudLeft.setInfo(this.info);
        this.getRandomSelectedSound();
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

    // getRandomActionCompletedSound() {
    //     if (this.sounds && this.sounds.actionCompleted && this.sounds.actionCompleted.length > 0) {
    //         const rand = this.game.rand(0, this.sounds.actionCompleted.length - 1);
    //         this.AssetManager.play(this.sounds.actionCompleted[rand]);
    //     }
    // }

    onActionBuild = (action) => {
        if (this.game.VAR.settings.gold >= action.goldCost && this.game.VAR.settings.wood >= action.woodCost) {
            if (this.game.VAR.settings.people.length < this.game.VAR.settings.homeMax) {
                this.game.VAR.settings.gold -= action.goldCost;
                this.game.VAR.settings.wood -= action.woodCost;
                this.game.VAR.hudTop.goldText.use(this.game.VAR.settings.gold)
                this.game.VAR.hudTop.woodText.use(this.game.VAR.settings.wood)
                this.game.VAR.hudLeft.trainIcon.animations.playOnce({ key: action.key });
                this.info.inProgress = true;
                this.info.inProgressTime = action.time;
                this.AssetManager.play('S_click');
                this.doInTime(action.time, () => {
                    this.info.inProgress = false;
                    this.game.VAR.hudLeft.showActions(this.info.actions);
                    this.game.VAR.hudLeft.showDescription(this.info.descriptios);
                    const unit = new action.create.class(this.game, {
                        key: action.create.key,
                        x: this.x - 32,
                        y: this.y
                    });
                    unit.AssetManager.play(unit.sounds.created[0]);
                    this.game.VAR.settings.people.push(unit)
                    this.game.VAR.hudTop.homeTextCurrent.use(this.game.VAR.settings.people.length);
                    this.game.sortByIndex();
                })
            }
        }
    }

    onActionHover = (action) => {
        return `Train ${action.key}.                                                                           ${action.goldCost}                              ${action.woodCost} `;
    }

    selectedBorder() {
        this.game.VAR.sellectedObj = this;
        this.game.VAR.sellectedBorder.show();
        this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
        this.game.VAR.sellectedBorder.y = this.y; //+ this.height / 2
        this.game.VAR.sellectedBorder.width = this.width;
        this.game.VAR.sellectedBorder.height = this.height;
    }

    // updateBorder() {
    //     if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
    //         this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
    //         this.game.VAR.sellectedBorder.y = this.y;//+ this.height / 2
    //         this.game.VAR.sellectedBorder.width = this.width;
    //         this.game.VAR.sellectedBorder.height = this.height;
    //     }
    // }

    update(dt) {
        super.update(dt);

    }

    // restartPosition() {
    //     if (this.nextPosition) {
    //         this.game.VAR.pathfinder.reRenderTile(this.nextPosition.row, this.nextPosition.column, 1);
    //     }

    //     if (this.currentPosition) {
    //         this.game.VAR.pathfinder.reRenderTile(this.currentPosition.row, this.currentPosition.column, 1);
    //     }


    //     this.nextPosition = null;
    //     this.currentPosition = null;
    // }

    unWalkable(index, type, cost) {
        for (let i = 0; i < this.width; i += 32) {
            for (let j = 0; j < this.height; j += 32) {
                const tile = this.game.VAR.map.getTileByCords(this.x + i, this.y + j);
                tile.type = type || 'solid';
                // this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, index);
                this.game.easystar.setAdditionalPointCost(Math.floor((this.x + i) / 32), Math.floor((this.y + j) / 32), 30)
            }
        }
    }
}
export default Building;