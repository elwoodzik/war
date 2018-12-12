import AssetManager from './AssetManager';
import MapDrawLayers from './MapDrawLayers';

class Map {

    constructor(game, options) {
        if (!options || !options.json || !options.key) {
            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json i klucza 'key' z nazwa zaimportowanego obrazka";
        }
        this.obstacles = options.obstacles || false;
        this.game = game;
        this.jsonPath = options.json;
        this.asSprite = options.asSprite || false;
        this.image = AssetManager.get(options.key);
        this.key = options.key;
        this.used = true;
        this.type = 'Map';
        this.zIndex = 1;
        this.game.ARR.obstacles = [];

        return this.getJson(this.jsonPath)
            .then((map) => {
                this.map = map;
                if (this.asSprite) {
                    this.renderMap(map);
                } else {
                    const c = this.generateTwoDimensionalLayers(map)
                    console.log(c)
                    this.renderOffscreenMap(map);
                }
                return this;
            })
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

    renderMap(mapData) {
        let z = 1;
        mapData.layers.forEach((layer, layerIndex) => {
            layer.data.forEach((gid, index) => {
                if (gid !== 0) {
                    const tile = {}
                    tile.column = index % layer.width;
                    tile.row = Math.floor(index / layer.width);
                    tile.x = tile.column * mapData.tileheight - mapData.tilesets[0].margin;
                    tile.y = tile.row * mapData.tileheight - mapData.tilesets[0].margin;
                    tile.tileX = ((gid - 1) % mapData.tilesets[0].columns) * (mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin);
                    tile.tileY = (Math.floor((gid - 1) / mapData.tilesets[0].columns)) * (mapData.tilesets[0].tileheight + mapData.tilesets[0].margin);

                    const sprite = this.game.add.sprite({
                        key: this.key,
                        sx: tile.tileX,
                        sy: tile.tileY,
                        width: mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin,
                        height: mapData.tilesets[0].tileheight + mapData.tilesets[0].margin,//mapData.tilewidth
                        x: tile.x,//-32,
                        y: tile.y,//-32,
                        zIndex: z,
                        iso: true
                    });
                    // sprite.setOffset((this.game.width / 2) - this.map.tileheight, 0);
                }
            })
            z += 1;
        })
    }

    renderOffscreenMap(mapData) {
        this.mapImages = [];

        mapData.layers.forEach((layer, layerIndex) => {
            let ctx = document.createElement("canvas").getContext("2d");
            ctx.canvas.width = mapData.tilewidth * mapData.width;
            ctx.canvas.height = mapData.tileheight * mapData.height;

            layer.data.forEach((gid, index) => {
                if (gid !== 0) {
                    const tile = {}
                    tile.column = index % layer.width;
                    tile.row = Math.floor(index / layer.width);
                    tile.x = tile.column * mapData.tileheight - mapData.tilesets[0].margin;
                    tile.y = tile.row * mapData.tileheight - mapData.tilesets[0].margin;
                    tile.tileX = ((gid - 1) % mapData.tilesets[0].columns) * (mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin);
                    tile.tileY = (Math.floor((gid - 1) / mapData.tilesets[0].columns)) * (mapData.tilesets[0].tileheight + mapData.tilesets[0].margin);

                    ctx.drawImage(
                        this.image,
                        tile.tileX,
                        tile.tileY,
                        mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin,
                        mapData.tilesets[0].tileheight + mapData.tilesets[0].margin,
                        tile.x,
                        tile.y,
                        mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin,
                        mapData.tilesets[0].tileheight + mapData.tilesets[0].margin
                    );
                }
            })
            this.mapImages.push({ map: ctx.canvas, zIndex: 2 })
        })
        this.mapImages.forEach((image, index, tab) => {
            new MapDrawLayers(this.game, {
                mapImages: image.map,
                zIndex: image.zIndex,
                index: index,
                tabLength: tab.length,
                image: this.image
            })
        })
    }


    generateTwoDimensionalLayers(mapData) {
        this.twoDimensionalLayers = [];

        mapData.layers.forEach((layer) => {
            const twoDimensional = [];
            const mapDataLayers = layer.data;
            let k = -1;

            for (let i = 0; i < mapDataLayers.length; i++) {
                if (i % mapData.width === 0) {
                    k++;
                    twoDimensional[k] = [];
                }
                const tile = {};
               
                twoDimensional[k].push(mapDataLayers[i]);
            }
            this.twoDimensionalLayers.push({ layer: twoDimensional })
        })

        return this.twoDimensionalLayers;
    }

    // generateTilesAndEmptyArrays(layers) {
    //     const tilesLayers = [];

    //     const mapData = this.getMapData();
    //     const mapDataTiles = mapData.tilesets[0].tiles || [];

    //     layers.forEach(layer => {
    //         const tilesArray = [];
    //         const emptySpaces = [];
    //         layer.layer.reverse();
    //         for (let i = layer.layer.length - 1; i >= 0; i--) {
    //             tilesArray[i] = [];
    //             for (let j = 0; j < layer.layer[i].length; j++) {

    //                 const tile = {};
    //                 tile.row = j;
    //                 tile.column = i;
    //                 tile.x = j * 129;
    //                 tile.y = i * 193;
    //                 tile.tileX = ((layer.layer[i][j] - 1) % mapData.tilesets[0].columns) * 129;
    //                 tile.tileY = (Math.floor((layer.layer[i][j] - 1) / mapData.tilesets[0].columns)) * 193;
    //                 tile.type = !mapDataTiles[layer.layer[i][j] - 1] ? 'empty' : mapDataTiles[layer.layer[i][j] - 1].type;
    //                 tile.id = layer.layer[i][j] - 1;
    //                 tile.width = 129;
    //                 tile.height = 193;

    //                 if (tile.type === 'empty') {
    //                     emptySpaces.push(tile)
    //                 }
    //                 console.log(tile)
    //                 tilesArray[i].push(tile);
    //             }
    //         }
    //         tilesLayers.push({ tilesLayer: tilesArray, emptySpacesLayer: emptySpaces })
    //     });

    //     return tilesLayers;
    // }

    // generateMapAsImage(mapTilesLayers) {
    //     this.mapImages = [];
    //     const mapData = this.getMapData();
    //     let zIndex = 0;

    //     mapTilesLayers.forEach((map, index) => {
    //         zIndex = 2;
    //         let ctx = document.createElement("canvas").getContext("2d");
    //         ctx.canvas.width = mapData.tilewidth * mapData.width;
    //         ctx.canvas.height = mapData.tileheight * mapData.height;

    //         for (let i = 0; i < map.tilesLayer.length; i++) {
    //             // 
    //             for (let j = 0; j < map.tilesLayer[i].length; j++) {
    //                 // 

    //                 ctx.drawImage(
    //                     this.image,
    //                     map.tilesLayer[i][j].tileY,
    //                     map.tilesLayer[i][j].tileX,
    //                     mapData.tilewidth,
    //                     mapData.tileheight,
    //                     j * map.tilesLayer[i][j].height,
    //                     i * map.tilesLayer[i][j].width,
    //                     mapData.tilewidth,
    //                     mapData.tileheight
    //                 );
    //                 if (this.obstacles && map.tilesLayer[i][j].type === 'solid') {
    //                     this.game.ARR.obstacles.push(this.game.add.rect({
    //                         x: j * map.tilesLayer[i][j].height,
    //                         y: i * map.tilesLayer[i][j].width,
    //                         width: mapData.tilewidth,
    //                         height: mapData.tileheight,
    //                         isRender: false,
    //                         updateOfScreen: false
    //                     }))
    //                 }

    //             }
    //         }

    //         // if (mapData.layers[index].properties) {
    //         //     zIndex = mapData.layers[index].properties['zIndex'] || 2;
    //         // }

    //         this.mapImages.push({ map: ctx.canvas, zIndex: zIndex })
    //         ctx = null;
    //     })

    //     this.mapImages.forEach((image, index, tab) => {
    //         new MapDrawLayers(this.game, {
    //             mapImages: image.map,
    //             zIndex: image.zIndex,
    //             index: index,
    //             tabLength: tab.length,
    //             mapTilesLayers: mapTilesLayers,
    //             image: this.image
    //         })
    //     })
    // }

    // getPoint(centerX, centerY, width, height, angle) {
    //     /// get distance from center to point

    //     const diffX = width - centerX;
    //     const diffY = height - centerY;

    //     const dist = Math.sqrt(diffX * diffX + diffY * diffY);
    //     // const ca = Math.atan2(diffY, diffX) * 180 / Math.PI;
    //     // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

    //     /// find angle from pivot to corner
    //     const ca = Math.atan2(diffY, diffX);

    //     /// get new angle based on old + current delta angle
    //     const na = ((ca + angle));

    //     /// get new x and y and round it off to integer
    //     const x = (centerX + dist * Math.cos(na) + 0.5) | 0;
    //     const y = (centerY + dist * Math.sin(na) + 0.5) | 0;

    //     return { x: x, y: y };
    // }

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

    // getPosition(sprite) {
    //     const mapData = this.getMapData();
    //     const row = Math.floor(sprite.x / mapData.tilewidth);
    //     const column = Math.floor(sprite.y / mapData.tileheight);
    //     return this.getTile(row, column);
    // }

    // getPositionByMouse() {
    //     const mapData = this.getMapData();
    //     console.log(mapData.tileheight)
    //     const row = Math.round(this.game.mouse.mouseX / 128 - this.game.mouse.mouseY / 64);//
    //     const column = Math.round(this.game.mouse.mouseX / 128 + this.game.mouse.mouseY / 64);
    //     // const row = Math.round(this.game.mouse.mouseX / 128);
    //     // const column = Math.round(this.game.mouse.mouseY / 64);
    //     return this.getTile(row, column);
    // }

    // setTile(tiles, type) {
    //     tiles.forEach((tile) => {
    //         tile.type = type
    //     })
    // }

    // getNextPosition(skeletons) {
    //     const mapData = this.getMapData();
    //     //

    //     const skeletonTile = skeletons.map((skeleton) => {
    //         const rowMiddle = Math.floor(skeleton.x / mapData.tilewidth);
    //         const columnMiddle = Math.floor(skeleton.y / mapData.tileheight);
    //         return this.getTile(rowMiddle, columnMiddle);
    //     })

    //     for (let j = 0; j < skeletonTile.length; j++) {
    //         for (let i = 0; i < skeletonTile[j].length; i++) {
    //             if (!skeletonTile[j][i]) {
    //                 return 'solid';
    //             }
    //             else if (skeletonTile[j][i].type === 'flaying') {
    //                 return skeletonTile[j][i].type;
    //             }
    //             else if (skeletonTile[j][i].type === 'solid') {
    //                 return skeletonTile[j][i].type;
    //             }
    //         }
    //     }
    //     return 'empty';
    // }


    // getTile(row, column) {
    //     const tiles = this.mapTilesLayers.map((map) => {
    //         if (map.tilesLayer[column] && map.tilesLayer[column][row]) {
    //             return map.tilesLayer[column][row];
    //         } else {
    //             return false;
    //         }
    //     })

    //     return tiles;
    // }

    // replaceGrid() {

    // }

    // getImageMap() {
    //     return this.imageMap;
    // }

    // getMapData() {
    //     return this.mapData;
    // }

    // setMapData(map) {
    //     this.mapData = map;
    // }

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