import axios from 'axios';

class Map {

    constructor(game, options) {
        if (!options || !options.json || !options.key) {
            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json i klucza 'key' z nazwa zaimportowanego obrazka";
        }

        this.game = game;
        this.jsonPath = options.json;
        this.key = options.key;
        this.used = true;
        this.type = 'map';
        this.zIndex = 1;
    }

    getJson(url) {
        return axios.get(url).then((res) => {
            return res.data;
        }).then((map) => {
            return map;
        })
    }

    toEmit() {
        return {
            tileLayers: this.mapTilesLayers,
            tilewidth: this.mapData.tilewidth,
            tileheight: this.mapData.tileheight,
            width: this.mapData.width,
            height: this.mapData.height,
            layers: this.mapData.layers,
            key: this.key
        }
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
            const emptySpaces = [];

            for (let i = 0; i < layer.layer.length; i++) {
                tilesArray[i] = [];
                for (let j = 0; j < layer.layer[i].length; j++) {

                    const tile = {};
                    tile.row = j;
                    tile.column = i;
                    tile.x = j * mapData.tileheight;
                    tile.y = i * mapData.tilewidth;
                    tile.tileX = ((layer.layer[i][j] - 1) % mapData.tilesets[0].columns) * mapData.tilewidth;
                    tile.tileY = (Math.floor((layer.layer[i][j] - 1) / mapData.tilesets[0].columns)) * mapData.tileheight;
                    tile.type = !mapDataTiles[layer.layer[i][j] - 1] ? 'empty' : mapDataTiles[layer.layer[i][j] - 1].type;
                    tile.id = layer.layer[i][j] - 1;
                    tile.width = mapData.tilewidth;
                    tile.height = mapData.tileheight;

                    if (tile.type === 'empty') {
                        emptySpaces.push(tile)
                    }
                    tilesArray[i].push(tile);
                }
            }
            tilesLayers.push({ tilesLayer: tilesArray, emptySpacesLayer: emptySpaces })
        });

        this.emptyFields = this.getEmptyFields(tilesLayers);

        return tilesLayers;
    }

    getEmptyFields(arr) {
        const free = [];
        const deleted = [];

        arr.forEach((elem, index) => {
            elem.emptySpacesLayer.forEach((tile) => {
                if (tile.type === 'empty') {
                    let toSave = true;
                    deleted.forEach((del) => {
                        if (del.x === tile.x && del.y === tile.y) {
                            toSave = false;
                        }
                    })
                    if (toSave) {
                        free.push(tile);
                    }

                } else {
                    free.forEach((empty) => {
                        if (empty.x === tile.x && empty.y === tile.y) {
                            free.splice(empty, 1);
                            deleted.push(tile);
                        }
                    })
                }
            })
        })

        const emptyArr = free.filter((el, index, self) =>
            index === self.findIndex((t) => (
                t.x === el.x && t.y === el.y
            ))
        )

        return emptyArr;
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

    getPosition(sprite) {
        const mapData = this.getMapData();
        const row = Math.floor(sprite.x / mapData.tilewidth);
        const column = Math.floor(sprite.y / mapData.tileheight);
        return this.getTile(row, column);
    }

    getTile(row, column) {
        const tiles = this.mapTilesLayers.map((map) => {
            if (map.tilesLayer[column] && map.tilesLayer[column][row]) {
                return map.tilesLayer[column][row];
            } else {
                return false;
            }
        })

        return tiles;
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


    setMapData(map) {
        this.mapData = map;
    }

    getMapData() {
        return this.mapData;
    }

};

export default Map;