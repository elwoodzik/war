import AssetManager from './AssetManager';
import MapDrawLayers from './MapDrawLayers';

class Map {
    constructor(game, options) {
        if (!options || !options.json || !options.key) {
            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json i klucza 'key' z nazwa zaimportowanego obrazka";
        }
        this.game = game;
        this.jsonPath = options.json;
        this.image = AssetManager.get(options.key);
        this.used = true;
        this.type = 'map';
        this.zIndex = 1;
    }

    getJson(jsonPath) {
        return fetch(jsonPath)
            .then((map) => {
                return map.json();
            })
            .then((map) => {
                return map;
            })
    }

    generateTwoDimensionalLayers(mapData) {
        const twoDimensionalLayers = [];


        mapData.layers.forEach((layer) => {
            const twoDimensional = [];
            const mapDataLayers = layer.data;
            let k = -1;

            for (let i = 0; i < mapDataLayers.length; i++) {
                if (i % mapData.width === 0) {
                    k++;
                    twoDimensional[k] = [];
                }
                twoDimensional[k].push(mapDataLayers[i]);
            }
            twoDimensionalLayers.push({ layer: twoDimensional })
        })

        return twoDimensionalLayers;
    }

    generateTilesAndEmptyArrays(layers) {
        const tilesLayers = [];

        const mapData = this.getMapData();
        const mapDataTiles = mapData.tilesets[0].tiles || [];

        layers.forEach(layer => {
            const tilesArray = [];
            const pathfinder = [];
            const emptySpaces = [];

            for (let i = 0; i < layer.layer.length; i++) {
                tilesArray[i] = [];
                pathfinder[i] = [];
                for (let j = 0; j < layer.layer[i].length; j++) {

                    const tile = {};
                    tile.row = j;
                    tile.column = i;
                    tile.x = j * mapData.tileheight;
                    tile.y = i * mapData.tilewidth;
                    tile.tileX = ((layer.layer[i][j] - 1) % mapData.tilesets[0].columns) * (mapData.tilewidth + mapData.tilesets[0].margin)
                    tile.tileY = (Math.floor((layer.layer[i][j] - 1) / mapData.tilesets[0].columns)) * (mapData.tileheight + mapData.tilesets[0].margin)
                    tile.type = !mapDataTiles[layer.layer[i][j] - 1] ? 'empty' : mapDataTiles[layer.layer[i][j] - 1].type;
                    tile.id = layer.layer[i][j] - 1;
                    tile.width = mapData.tilewidth;
                    tile.height = mapData.tileheight;

                    if (tile.type === 'empty') {
                        emptySpaces.push(tile)
                    }
                    if (tile.id === 116 || tile.id === 117 || tile.id === 137 || tile.id === 131) {
                        tile.type = 'forest';
                    }
                    tilesArray[i].push(tile);
                    pathfinder[i].push(tile.id);
                }
            }
            tilesLayers.push({ tilesLayer: tilesArray, pathfinder: pathfinder, emptySpacesLayer: emptySpaces })
        });

        return tilesLayers;
    }

    generateMapAsImage(mapTilesLayers) {
        this.mapImages = [];
        const mapData = this.getMapData();
        let zIndex = 0;

        mapTilesLayers.forEach((map, index) => {
            zIndex = 2;
            let ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = mapData.tilewidth * mapData.width;
            ctx.canvas.height = mapData.tileheight * mapData.height;

            for (let i = 0; i < map.tilesLayer.length; i++) {
                // 
                for (let j = 0; j < map.tilesLayer[i].length; j++) {
                    // 
                    ctx.drawImage(
                        this.image,
                        map.tilesLayer[i][j].tileX,
                        map.tilesLayer[i][j].tileY,
                        mapData.tilewidth + mapData.tilesets[0].margin,
                        mapData.tileheight + mapData.tilesets[0].margin,
                        j * map.tilesLayer[i][j].height,
                        i * map.tilesLayer[i][j].width,
                        mapData.tilewidth + mapData.tilesets[0].margin,
                        mapData.tileheight + mapData.tilesets[0].margin
                    );
                }
            }

            if (mapData.layers[index].properties) {
                zIndex = mapData.layers[index].properties['zIndex'] || 2;
            }

            this.mapImages.push({ map: ctx.canvas, zIndex: zIndex })
            ctx = null;

        })

        this.mapImages.forEach((image, index, tab) => {
            new MapDrawLayers(this.game, {
                mapImages: image.map,
                zIndex: image.zIndex,
                index: index,
                tabLength: tab.length
            })
        })
    }

    getPoint(centerX, centerY, width, height, angle) {
        /// get distance from center to point

        const diffX = width - centerX;
        const diffY = height - centerY;
        const dist = Math.sqrt(diffX * diffX + diffY * diffY);
        // const ca = Math.atan2(diffY, diffX) * 180 / Math.PI;
        // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

        /// find angle from pivot to corner
        const ca = Math.atan2(diffY, diffX);

        /// get new angle based on old + current delta angle
        const na = ((ca + angle));

        /// get new x and y and round it off to integer
        const x = (centerX + dist * Math.cos(na) + 0.5) | 0;
        const y = (centerY + dist * Math.sin(na) + 0.5) | 0;

        return { x: x, y: y };
    }

    // draw(dt) {
    //     if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
    //         this.context.save();
    //         this.context.globalAlpha = this.objAlfa;
    //     }

    //     this.mapImages.forEach((image) => {
    //         this.context.drawImage(
    //             image.map,
    //             this.game.camera.xScroll || 0,
    //             this.game.camera.yScroll || 0,
    //             this.game.width,
    //             this.game.height,
    //             0,
    //             0,
    //             this.game.width,
    //             this.game.height,
    //         )
    //     })


    //     if (this.objAlfa !== 1) {
    //         this.context.restore();
    //     }
    // }

    getPosition(sprite) {
        const mapData = this.getMapData();
        const row = Math.floor(sprite.x / mapData.tilewidth);
        const column = Math.floor(sprite.y / mapData.tileheight);
        return this.getTile(row, column);
    }

    getTileByCords(x, y) {
        const mapData = this.getMapData();

        const row = Math.floor(x / mapData.tilewidth);// Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
        const column = Math.floor((y) / mapData.tileheight);

        return this.getTile(row, column);
    }

    getTileByMouse() {
        const mapData = this.getMapData();
        const x = this.game.mouse.mouseX + this.game.camera.xScroll;
        const y = this.game.mouse.mouseY + this.game.camera.yScroll;

        const row = Math.floor(x / mapData.tilewidth);// Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
        const column = Math.floor((y) / mapData.tileheight);

        return this.getTile(row, column);
    }

    getTileBySprite(sprite) {
        const mapData = this.getMapData();
        const center = sprite.getCenter();

        const row = Math.floor(center.x / mapData.tilewidth);// Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
        const column = Math.floor((center.y) / mapData.tileheight);

        return this.getTile(row, column);
    }

    getNextPosition(skeleton) {
        const mapData = this.getMapData();
        //
        const skeletonTile = Object.keys(skeleton).map((key) => {
            const rowMiddle = Math.floor(skeleton[key].x / mapData.tilewidth);
            const columnMiddle = Math.floor(skeleton[key].y / mapData.tileheight);
            return this.getTile(rowMiddle, columnMiddle);
        })

        for (let j = 0; j < skeletonTile.length; j++) {
            for (let i = 0; i < skeletonTile[j].length; i++) {
                if (!skeletonTile[j][i]) {
                    return 'solid';
                }
                else if (skeletonTile[j][i].type === 'flaying') {
                    return skeletonTile[j][i].type;
                }
                else if (skeletonTile[j][i].type === 'solid') {
                    return skeletonTile[j][i].type;
                }
            }
        }
        return 'empty';
    }

    getTile(row, column) {
        const tiles = this.mapTilesLayers.map((map) => {
            if (map.tilesLayer[column] && map.tilesLayer[column][row]) {
                return map.tilesLayer[column][row];
            } else {
                return false;
            }
        })

        return tiles[0];
    }

    replaceGrid() {

    }

    getImageMap() {
        return this.imageMap;
    }

    getMapData() {
        return this.mapData;
    }

    setMapData(map) {
        this.mapData = map;
    }

    // for (let j = 0; j < this.mapData.layers[0].data[i].length; j++) {
    //     console.log(arr[i][j])
    //     // let tile = {};
    //     // tile.x = ((arr[i][j] - 1) % 13) * 72;
    //     // tile.y = (Math.floor((arr[i][j] - 1) / 13)) * 72;

    //     // if (this.tiles[arr[i][j] - 1]) {
    //     //     tile.type = !this.tiles[arr[i][j] - 1].type ? 'empty' : this.tiles[arr[i][j] - 1].type;
    //     // } else {
    //     //     tile.type = 'empty';
    //     // }
    //     // this.tilesMap[i].push(tile);
    // }

    // generate() {
    //     let ctx = document.createElement("canvas").getContext("2d");
    //     console.log(this.mapData)
    //     ctx.canvas.width = this.mapData.width * this.mapData.tilewidth;
    //     ctx.canvas.height = this.mapData.height * this.mapData.tileheight;

    //     for (let i = 0; i < this.tilesMap.length; i++) {
    //         // 
    //         for (let j = 0; j < this.tilesMap[i].length; j++) {
    //             // 
    //             ctx.drawImage(
    //                 this.image,
    //                 this.tilesMap[i][j].x,
    //                 this.tilesMap[i][j].y,
    //                 this.w,
    //                 this.h,
    //                 Math.floor((j * (this.currentWidth)) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0)),
    //                 Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0)),
    //                 (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.tilesMap[i].length)),
    //                 (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.tilesMap.length))
    //             );
    //         }
    //     }

    //     // this.cloneText = ctx.canvas;
    //     // ctx = null;
    // }

    // generate() {
    //     let ctx = document.createElement("canvas").getContext("2d");
    //     ctx.canvas.width = this.tilesMap[0].length * 70;
    //     ctx.canvas.height = this.tilesMap.length * 70;

    //     for (let i = 0; i < this.tilesMap.length; i++) {
    //         // 
    //         for (let j = 0; j < this.tilesMap[i].length; j++) {
    //             // 
    //             ctx.drawImage(
    //                 this.image,
    //                 this.tilesMap[i][j].x,
    //                 this.tilesMap[i][j].y,
    //                 this.w,
    //                 this.h,
    //                 Math.floor((j * (this.currentWidth)) - (this.game.camera.xScroll ? this.game.camera.xScroll : 0)),
    //                 Math.floor((i * (this.currentHeight)) - (this.game.camera.yScroll ? this.game.camera.yScroll : 0)),
    //                 (!this.scalled ? this.currentWidth : Math.ceil(this.game.canvas.width / this.tilesMap[i].length)),
    //                 (!this.scalled ? this.currentHeight : Math.ceil(this.game.canvas.height / this.tilesMap.length))
    //             );
    //         }
    //     }

    //     this.imageMap = new Image();
    //     this.imageMap.src = ctx.canvas.toDataURL("image/png");

    //     ctx = null;
    // }
}


export default Map;