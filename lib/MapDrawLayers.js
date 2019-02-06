import _ObjectSettings from './_ObjectSettings';

class MapDrawLayers extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);
        this.game = game;
        this.mapImages = options.mapImages;
        this.zIndex = options.zIndex;
        this.type = 'layers';
        this.static = true;
        this.generateMask();
    }

    generateMask() {
        setTimeout(() => {
            let ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = 500;
            ctx.canvas.height = 500;



            this.imageMask = ctx.canvas;
        }, 1000)

    }

    draw(dt) {
        if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
            this.context.save();
            this.context.globalAlpha = this.objAlfa;
        }

        this.context.drawImage(
            this.mapImages,
            this.game.camera.xScroll || 0,
            this.game.camera.yScroll || 0,
            this.game.width,
            this.game.height,
            0,
            0,
            this.game.width,
            this.game.height,
        )

        this.game.ctx.save();

        for (let i = 0; i < 2240 + 32; i += 32) {
            for (let j = 0; j < 2240 + 32; j += 32) {
                const tile = this.game.VAR.map.getTileByCords(i, j);

                if (tile && (tile.type === 'solid' || tile.type === 'gold' || tile.type === 'town' || tile.type === 'forest')) {
                    this.game.ctx.globalAlpha = 0.4;
                    this.game.ctx.fillStyle = 'red';
                    this.game.ctx.fillRect(i - this.game.camera.xScroll, j - this.game.camera.yScroll, 32, 32);
                }
            }
        }

        this.game.ctx.restore();

        if (this.objAlfa !== 1) {
            this.context.restore();
        }

    }
};

export default MapDrawLayers;