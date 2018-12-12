import _ObjectSettings from './_ObjectSettings';

let ctx = null;
class Pathfinder extends _ObjectSettings {

    constructor(game, options) {
        super(game, options);
        if (!options || !options.json) {
            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json.";
        }

        this.game = game;
        this.type = 'Pathfinder';
        this.jsonPath = options.json;
        this.static = true;
        this.zIndex = 1000;
        this.paths = [];

        this.used = options.isRender === false ? false : true;
        this.isRender = options.isRender === false ? false : true;
        this.mapWidth = options.mapWidth || 0;

        return this.getJson(this.jsonPath)
            .then((pathfinder) => {
                this.pathfinderJson = pathfinder;
                if (pathfinder.paths) {
                    this.paths = pathfinder.paths;

                    this.offScreenRender(pathfinder.paths, pathfinder);
                } else {
                    const paths = this.createPaths(pathfinder);
                    this.offScreenRender(paths, pathfinder);
                }
                return this
            })
    }

    getJson(jsonPath) {
        return fetch(jsonPath)
            .then((map) => map.json())
            .then((map) => map);
    }

    createPaths(pathfinder) {
        for (let i = 0; i < pathfinder.rows; i++) {
            this.paths[i] = [];
            for (let j = 0; j < pathfinder.columns; j++) {
                this.paths[i][j] = 1;
            }
        }

        return this.paths;
    }

    offScreenRender(paths, pathfinder) {
        const colors = ['blue', 'red', 'black', 'purple', 'purple', 'purple'];
        ctx = document.createElement("canvas").getContext("2d");
        ctx.canvas.width = pathfinder.columns * pathfinder.width || this.game.canvas.width;//pathfinder.columns * pathfinder.width;
        ctx.canvas.height = pathfinder.rows * pathfinder.height || this.game.canvas.height; //pathfinder.rows * pathfinder.height;

        for (let i = 0; i < paths.length; i++) {
            for (let j = 0; j < paths[i].length; j++) {
                const offX = j * pathfinder.width;
                const offY = i * pathfinder.height;
                // const cartX = offX + this.originX + this.pathfinderJson.offsetX
                this.drawGrid(pathfinder.width, pathfinder.height, colors[paths[i][j] - 1], offX, offY);
            }
        }
    }

    drawGrid(width, height, color, offX, offY) {
        this.drawLine(offX + width, offY, offX + width, offY + height, color);
        this.drawLine(offX + width, offY, offX, offY, color);
        this.drawLine(offX, offY, offX, offY + height, color);
        this.drawLine(offX, offY + height, offX + width, offY + height, color);
    }

    reRenderTile(row, column, type) {
        const colors = ['blue', 'red', 'black', 'purple', 'purple', 'purple'];

        this.paths[column][row] = type;
        const offX = row * this.pathfinderJson.width;
        const offY = column * this.pathfinderJson.height;
        ctx.clearRect(offX - 1, offY - 1, this.pathfinderJson.width + 2, this.pathfinderJson.height + 2);
        this.drawGrid(this.pathfinderJson.width, this.pathfinderJson.height, colors[type - 1], offX, offY);
        localStorage.setItem('mapa', JSON.stringify(this.paths));

        return {
            row: row,
            column: column,
            x: offX,
            y: offY,
            type: type
        }
    }

    drawLine(x1, y1, x2, y2, color) {
        color = typeof color !== 'undefined' ? color : 'white';
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    draw(dt) {
        if (ctx && this.isRender) {
            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
                this.context.save();
                this.context.globalAlpha = this.objAlfa;
            }

            this.context.drawImage(
                ctx.canvas,
                this.game.camera.xScroll || 0,
                (this.game.camera.yScroll) || 0,
                this.game.width,
                this.game.height,
                0,
                0,
                this.game.width,
                this.game.height,
            )

            if (this.objAlfa !== 1) {
                this.context.restore();
            }
        }
    }

    getTileByMouse() {
        const x = this.game.mouse.mouseX + this.game.camera.xScroll;
        const y = this.game.mouse.mouseY + this.game.camera.yScroll;

        const row = Math.floor(x / this.pathfinderJson.width);// Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
        const column = Math.floor((y) / this.pathfinderJson.height);

        return {
            x: row * this.pathfinderJson.width,
            y: column * this.pathfinderJson.height,
            row: row,
            column: column,
            tile: this.getTile(row, column)
        }
    }

    getTileBySprite(sprite) {
        const center = sprite.getCenter();

        const row = Math.floor(center.x / this.pathfinderJson.width);// Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
        const column = Math.floor((center.y) / this.pathfinderJson.height);

        return {
            x: row * this.pathfinderJson.width,
            y: column * this.pathfinderJson.height,
            row: row,
            column: column,
            tile: this.getTile(row, column)
        }
    }

    getTileByCords(x, y) {
        const row = Math.floor(x / this.pathfinderJson.width);// Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
        const column = Math.floor((y) / this.pathfinderJson.height);

        return {
            x: row * this.pathfinderJson.width,
            y: column * this.pathfinderJson.height,
            row: row,
            column: column,
            tile: this.getTile(row, column)
        }
    }

    getTile(row, column) {
        if (this.paths[column] && this.paths[column][row]) {
            return this.paths[column][row];
        } else {
            return false;
        }
    }

    getPosition(row, col) {
        let cartX = col * this.pathfinderJson.height;
        let cartY = row * this.pathfinderJson.height;
        const isoX = cartX - cartY;
        const isoY = (cartX + cartY) / 2;
        // let x = row * this.pathfinderJson.width / 2 + col * this.pathfinderJson.width / 2 + this.originX;
        // let y = col * this.pathfinderJson.height / 2 - row * this.pathfinderJson.height / 2 + this.originY;
        // x = x - 54 / 2;
        // y = y - 74;
        return { x: isoX, y: isoY, cartX: cartX, cartY: cartY }
    }
}

export default Pathfinder;