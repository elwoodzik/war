
// class AssetManager {

//     constructor(placeholderDataUri) {
//         this._assets = {};

//         if (placeholderDataUri) {
//             this._placeholder = new Image();
//             this._placeholder.src = placeholderDataUri;
//         }

//         this.sounds = true;
//     }

//     load(images, onDone, onProgress) {
//         // Kolejka obrazków
//         let queue = [];
//         for (let im in images) {
//             queue.push({
//                 key: im,
//                 path: images[im]
//             });
//         }

//         if (queue.length === 0) {
//             onProgress && onProgress(0, 0, null, null, true);
//             onDone && onDone();
//             return;
//         }

//         let itemCounter = {
//             loaded: 0,
//             total: queue.length
//         };

//         for (let i = 0; i < queue.length; i++) {
//             this._loadItem(queue[i], itemCounter, onDone, onProgress);
//         }
//     }

//     _loadItem(queueItem, itemCounter, onDone, onProgress) {

//         if (queueItem.path.slice(-3) === "jpg" || queueItem.path.slice(-3) === "png" || queueItem.path.slice(-4) === "jpeg"
//             || queueItem.path.slice(-3) === "gif" || queueItem.path.slice(-3) === "JPG" || queueItem.path.slice(-3) === "PNG"
//             || queueItem.path.slice(-3) === "GIF") {

//             let img = new Image();

//             img.onload = () => {
//                 this._assets[queueItem.key] = img;
//                 this._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
//             };

//             img.onerror = () => {
//                 this._assets[queueItem.key] = this._placeholder ? this._placeholder : null;
//                 this._onItemLoaded(queueItem, itemCounter, onDone, onProgress, false);
//             };

//             img.src = queueItem.path;
//         }
//         else if (queueItem.path.slice(-3) === "mp3" || queueItem.path.slice(-3) === "ogg" || queueItem.path.slice(-3) === "wav") {
//             createjs.Sound.registerSound(queueItem.path, queueItem.key, 0);
//             this._onItemLoaded(queueItem, itemCounter, onDone, onProgress, true);
//         }
//         else {
//             console.error('plik ' + queueItem.path + ' nie zostal zaladowany!')
//         }
//     }

//     _onItemLoaded(queueItem, itemCounter, onDone, onProgress, success) {
//         itemCounter.loaded++;
//         onProgress && onProgress(itemCounter.loaded, itemCounter.total, queueItem.key, queueItem.path, success);
//         if (itemCounter.loaded == itemCounter.total) {
//             onDone && onDone();
//         }
//     }

//     get(key) {
//         return this._assets[key];
// 	}

// 	getSrc(key) {
//         return this._assets[key].src;
// 	}

// 	play(key) {
//         if(this.sounds){
//             createjs.Sound.play(key);
//         }
// 	}

//     stop(key) {
//         this._assets[key].pause();
//      	this._assets[key].currentTime = 0;	
//         createjs.Sound.stop(key);
// 	}

//     useSounds(bool){
//         if(typeof bool !== 'boolean'){
//             return console.error('Metoda "useSounds" wymaga podania argumentu: True / False');
//         }

//         this.sounds = bool;
//         return this.sounds;
//     }

//     preload(){
//         this.canvas = document.createElement("canvas");
//         this.ctx = this.canvas.getContext("2d");        
//         this.canvas.width =  500;
//         this.canvas.height =  300;
//         this.canvas.id = 'preload';

//         this.canvas.style.position = 'absolute';
//         this.canvas.style.left = '50%';
//         this.canvas.style.marginLeft = -this.canvas.width/2 + "px";

//         document.body.style.overflow = 'hidden';

//         document.body.appendChild(this.canvas);
//     }

//     preloadOnProgress(loaded, total){
//         if(this.canvas){
//             let currentProgress = loaded / total * 400;
//             if(loaded === 1){
//                 this.ctx.font = "30px Arial";
//                 this.ctx.fillStyle = 'orange';
//                 this.ctx.fillText("Ładowanie", 180, 60);
//             }
//             this.ctx.beginPath();
//             this.ctx.strokeStyle = 'orange';
//             this.ctx.rect(50,80,400,30);
//             this.ctx.stroke();
//             this.ctx.closePath();

//             this.ctx.fillStyle = 'green';
//             this.ctx.fillRect(51, 81, currentProgress-1, 28);
//             //

//             this.ctx.clearRect(200,120,500,300);
//             this.ctx.font = "30px Arial";
//             this.ctx.fillStyle = 'orange';
//             this.ctx.fillText(Math.floor(currentProgress/4) + "%", 230, 150);

//             if(loaded === total){
//                 const child = document.getElementById("preload");
//                 document.body.removeChild(child);
//             }
//         }
//     }
// }

// export default new AssetManager();



class AssetManager {

    static LIBS = {
        "facebook": `https://connect.facebook.net/pl_PL/sdk.js`,
        "redplayer": `https://r.dcs.redcdn.pl/http/o2/web/player/redcdn/0.9.8.1-eurozet/js/redcdnplayer.min.js`,
        "swiper": `//gfx.${document.location.host}/design/chillizet/javascript/plugins/swiper.min.js`,
    }

    static ASSET_MANAGER_INSTANCE = null;

    static AVAILABLE_EXT = [
        { element: 'script', ext: '.js' },
        { element: 'link', ext: '.css' },
        { element: 'image', ext: '.png' },
        { element: 'image', ext: '.jpg' },
        { element: 'image', ext: '.jpeg' },
        { element: 'image', ext: '.gif' },
        { element: 'image', ext: '.svg' },
        { element: 'sound', ext: '.wav' },
        { element: 'sound', ext: '.mp3' },
    ];

    static INTERVAL_TIME = 100;

    static ERRORS = {
        1: (queueItem) => 'plik ' + queueItem.path + ' nie zostal zaladowany! Rozszerzenie pliku nie jest poprawne!',
        2: (queueItem) => `Nie udało się załadować pliku ${queueItem.path}. Prawdopodobnie scieżka do pliku jest nie poprawna! \n Wykonywanie skrytów zostało zatrzymane!`,
        3: (scriptTag) => `Tag: ${scriptTag} nie może być użyty ponieważ nie jest zdeklarowany w configu. Dalsze wykonywanie skryptu zostało przerwane!`,
        4: (element) => `Element ${element} nie jest wspierany!`,
        5: (element) => `Nie udało się pobrać scieżki do elementu ${element} `,
        6: (element) => `Nie udało się pobrać elementu ${element} `,
    }

    constructor() {
        this.queueSync = [];
        this.queueAsync = [];
        this._assets = {};
    }

    static initialize() {
        if (!(AssetManager.ASSET_MANAGER_INSTANCE instanceof AssetManager)) {
            AssetManager.ASSET_MANAGER_INSTANCE = new AssetManager();
            return AssetManager.ASSET_MANAGER_INSTANCE;
        } else {
            return AssetManager.ASSET_MANAGER_INSTANCE;
        }
    }

    loadSync(scriptTags) {
        return new Promise((res, rej) => {
            this.queueSync = [...this.queueSync];

            this.addToQueue('queueSync', scriptTags, res, rej);

            if (this.queueSync.length === 0) {
                return res(this.queueSync);
            }

            this._loadItemSync(this.queueSync[0], this.queueSync, 0, res, rej);
        })
    }

    _loadItemSync(queueItem, queue, index, res, rej) {
        const ext = this.ext(queueItem.path);
        const availableExt = this.availableExt(ext);

        if (availableExt) {
            const scriptElement = document.querySelector('#' + queueItem.key + '_lib');
            if (scriptElement) {
                const isExistInAsyncQueue = this.queueAsync.find(x => x.key === queueItem.key);

                const interval = setInterval(() => {
                    const scriptElement = document.querySelector('#' + queueItem.key + '_lib');

                    if (queueItem.success || (isExistInAsyncQueue && isExistInAsyncQueue.success)) {
                        clearInterval(interval);
                        this.onScriptLoad(scriptElement, queueItem, queue, index, res, rej);
                    } else if (scriptElement.dataset.loaded) {
                        clearInterval(interval);
                        this.onScriptLoad(scriptElement, queueItem, queue, index, res, rej);
                    } else if (queueItem.error || (isExistInAsyncQueue && isExistInAsyncQueue.error)) {
                        clearInterval(interval);
                        return rej(AssetManager.ERRORS[2](queueItem));
                    }
                }, AssetManager.INTERVAL_TIME);
            } else {
                this.createSyncElement(availableExt, queueItem, queue, index, res, rej);
            }
        } else {
            return rej(AssetManager.ERRORS[1](queueItem));
        }
    }

    // loadAsync(scriptTags, xxx) {
    //     return new Promise((res, rej) => {
    //         this.queueAsync = [...this.queueAsync];

    //         this.addToQueue('queueAsync', scriptTags, res, rej);

    //         if (this.queueAsync.length === 0) {
    //             return res(this.queueAsync);
    //         }

    //         const itemsPromise = this.queueAsync.map((item, i) => {
    //             return this._loadItemAsync(item, this.queueAsync, i, res, rej);
    //         })

    //         return Promise.all(itemsPromise).then(() => {
    //             return res(this.queueAsync);
    //         }).catch((err) => {
    //             console.error(err + 1111);
    //         });
    //     });
    // }

    // _loadItemAsync(queueItem, queue, index, res, rej) {
    //     return new Promise((resolve, reject) => {
    //         const ext = this.ext(queueItem.path);
    //         const availableExt = this.availableExt(ext);

    //         if (availableExt) {
    //             const scriptElement = document.querySelector('#' + queueItem.key + '_lib');

    //             if (scriptElement) {
    //                 const isExistInSyncQueue = this.queueSync.find(x => x.key === queueItem.key);

    //                 const interval = setInterval(() => {
    //                     const scriptElement = document.querySelector('#' + queueItem.key + '_lib');

    //                     if (queueItem.success || (isExistInSyncQueue && isExistInSyncQueue.success)) {
    //                         clearInterval(interval);
    //                         this._onItemLoaded(scriptElement, queueItem, true, false);
    //                         return resolve();
    //                     } else if (scriptElement.dataset.loaded) {
    //                         clearInterval(interval);
    //                         this._onItemLoaded(scriptElement, queueItem, true, false);
    //                         return resolve();
    //                     } else if (queueItem.error || (isExistInSyncQueue && isExistInSyncQueue.error)) {
    //                         clearInterval(interval);
    //                         this._onItemLoaded(scriptElement, queueItem, false, true);
    //                         return reject(AssetManager.ERRORS[2](queueItem));
    //                     }
    //                 }, AssetManager.INTERVAL_TIME);
    //             } else {
    //                 let scriptTag = document.createElement(availableExt.element);

    //                 if (availableExt.element === 'script') {
    //                     scriptTag.src = queueItem.path;
    //                 } else if (availableExt.element === 'link') {
    //                     scriptTag.rel = 'stylesheet';
    //                     scriptTag.href = queueItem.path;
    //                 } else if (availableExt.element === 'image') {
    //                     scriptTag = new Image();
    //                     scriptTag.src = queueItem.path;
    //                 } else {
    //                     return console.error(AssetManager.ERRORS[4](availableExt.element));
    //                 }

    //                 scriptTag.id = queueItem.key + '_lib';
    //                 scriptTag.onload = () => {
    //                     this._onItemLoaded(scriptTag, queueItem, true, false);
    //                     return resolve();
    //                 }
    //                 scriptTag.onerror = () => {
    //                     this._onItemLoaded(scriptTag, queueItem, false, true);
    //                     return reject(AssetManager.ERRORS[2](queueItem));
    //                 }
    //                 document.head.appendChild(scriptTag);
    //             }
    //         } else {
    //             return rej(AssetManager.ERRORS[1](queueItem));
    //         }
    //     })
    // }

    createSyncElement(availableExt, queueItem, queue, index, res, rej) {
        let scriptTag;

        if (availableExt.element === 'script') {
            scriptTag = document.createElement(availableExt.element);
            scriptTag.src = queueItem.path;
        } else if (availableExt.element === 'link') {
            scriptTag = document.createElement(availableExt.element);
            scriptTag.rel = 'stylesheet';
            scriptTag.href = queueItem.path;
        } else if (availableExt.element === 'image') {
            scriptTag = new Image();
            scriptTag.src = queueItem.path;
        } else if (availableExt.element === 'sound') {
            createjs.Sound.registerSound(queueItem.path, queueItem.key);
            scriptTag = { src: queueItem.path, key: queueItem.key };
            this.onScriptLoad(scriptTag, queueItem, queue, index, res, rej);
        } else {
            return console.error(AssetManager.ERRORS[4](availableExt.element));
        }

        if (scriptTag && availableExt.element !== 'sound') {
            scriptTag.id = queueItem.key + '_lib';
            scriptTag.onload = this.onScriptLoad.bind(this, scriptTag, queueItem, queue, index, res, rej);
            scriptTag.onerror = this.onScriptError.bind(this, scriptTag, queueItem, queue, index, res, rej);
            document.head.appendChild(scriptTag);
        }

    }


    onScriptLoad(scriptElement, queueItem, queue, index, res, rej) {
        const nextIndex = index + 1;

        this._onItemLoaded(scriptElement, queueItem, true, false);

        if (this.isElementInQueue(queue, nextIndex)) {
            this._loadItemSync(queue[nextIndex], queue, nextIndex, res, rej);
        } else {
            res(queue);
        }
    }

    onScriptError(scriptElement, queueItem, queue, index, res, rej) {
        const nextIndex = index + 1;

        this._onItemLoaded(queueItem, false, true);
        return rej(AssetManager.ERRORS[2](queueItem));
    }

    _onItemLoaded(scriptElement, queueItem, success, err) {
        if (!this._assets[queueItem.key]) {
            this._assets[queueItem.key] = scriptElement;
        }
        if (scriptElement && scriptElement.dataset) {
            scriptElement.dataset.loaded = success;
        }
        queueItem.success = success;
        queueItem.error = err;
    }

    ext(url) {
        return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).split('#')[0].substr(url.lastIndexOf("."))
    }

    availableExt(ext) {
        for (let i = 0; i < AssetManager.AVAILABLE_EXT.length; i++) {
            if (AssetManager.AVAILABLE_EXT[i].ext.toLowerCase() === ext.toLowerCase()) {
                return AssetManager.AVAILABLE_EXT[i];
            }
        }
        return false;
    }

    addToQueue(queue, scriptTags, res, rej) {
        Object.keys(scriptTags).forEach((scriptTag) => {
            const isExistInQueue = this[queue].find(x => x.key === scriptTag);

            if (!isExistInQueue) {
                this[queue].push({
                    key: scriptTag,
                    path: scriptTags[scriptTag]
                });
            }
        })
    }

    isElementInQueue(queue, index) {
        if (queue[index]) {
            return true;
        } else {
            return false;
        }
    }

    get(key) {
        if (this._assets[key]) {
            return this._assets[key];
        }
        return console.error(AssetManager.ERRORS[6](key))
    }

    getSrc(key) {
        if (this._assets[key]) {
            return this._assets[key].src;
        }
        // console.error(AssetManager.ERRORS[5](key))
        return false;
    }

    play(key, options) {
        // if (this.sounds) {
        return createjs.Sound.play(key, options);
        // }
    }
}

export default AssetManager.initialize();