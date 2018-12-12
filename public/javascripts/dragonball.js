/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Leya = __webpack_require__(1);

	var _Leya2 = _interopRequireDefault(_Leya);

	var _Main = __webpack_require__(77);

	var _Main2 = _interopRequireDefault(_Main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Game = function () {
	    function Game() {
	        var _this = this;

	        _classCallCheck(this, Game);

	        var gameWidth = 1024;
	        var gameHeight = 768;
	        var orientation = false; //false -> vertical, true -> horizontal (obecnie 'horizontal' jest nie obslugiwany!!!)
	        var scallable = true;
	        var mobile = false;
	        var images = {
	            world: 'images/world_summer.png',
	            peasant: 'images/peasant.png',
	            buildings: 'images/buildings.png',
	            gold: 'images/gold.png'
	        };

	        new _Leya2.default(gameWidth, gameHeight, orientation, scallable, mobile, images).then(function (game) {
	            return _this.create(game);
	        });
	    }

	    _createClass(Game, [{
	        key: 'create',
	        value: function create(game) {
	            game.keyboard.initialize();
	            game.mouse.initialize();
	            // game.mouse.enableHover();

	            game.state.add('Main', _Main2.default);
	            game.state.start('Main');
	        }
	    }]);

	    return Game;
	}();

	;

	exports.default = new Game();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AssetManager = __webpack_require__(2);

	var _AssetManager2 = _interopRequireDefault(_AssetManager);

	var _Mobile = __webpack_require__(3);

	var _Mobile2 = _interopRequireDefault(_Mobile);

	var _GameStateFactory = __webpack_require__(4);

	var _GameStateFactory2 = _interopRequireDefault(_GameStateFactory);

	var _GameObjectFactory = __webpack_require__(5);

	var _GameObjectFactory2 = _interopRequireDefault(_GameObjectFactory);

	var _Physic = __webpack_require__(74);

	var _Physic2 = _interopRequireDefault(_Physic);

	var _Mouse = __webpack_require__(75);

	var _Mouse2 = _interopRequireDefault(_Mouse);

	var _Keyboard = __webpack_require__(76);

	var _Keyboard2 = _interopRequireDefault(_Keyboard);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var elapsed = 0;
	var last = 0;
	var step = 1 / 60;

	var Leya = function () {
	    function Leya(width, height, orientation, scallable, mobile, images) {
	        _classCallCheck(this, Leya);

	        this.gameObjects = [];

	        this.states = {};

	        this.width = width;

	        this.height = height;

	        this.orientation = orientation;

	        this.images = images;

	        this.VAR = {};

	        this.GROUP = {};

	        this.CLASS = {};

	        this.camera = {
	            xScroll: 0,
	            yScroll: 0
	        };

	        this.useFpsCounter = false;

	        this.renderer = true;

	        this.mobile = new _Mobile2.default(this, mobile);

	        this.state = new _GameStateFactory2.default(this);

	        this.add = new _GameObjectFactory2.default(this);

	        this.physic = new _Physic2.default(this);

	        this.mouse = new _Mouse2.default(this);

	        this.keyboard = new _Keyboard2.default(this);

	        this.createCanvas(width, height, orientation);

	        this.scallable(scallable);

	        return this.preloadedImages();
	    }

	    _createClass(Leya, [{
	        key: 'preloadedImages',
	        value: function preloadedImages() {
	            var _this = this;

	            // const elements = Object.keys(this.images).length;

	            // const bar = this.add.bar({
	            //     x: this.width / 2 - 200,
	            //     y: 400,
	            //     min: 0,
	            //     max: elements,
	            //     width: 400,
	            //     height: 40
	            // })

	            // const percentText = this.add.text({
	            //     text: '0',
	            //     x: this.width / 2 - 15,
	            //     y: 430,
	            //     color: 'black'
	            // })

	            // const percentIcon = this.add.text({
	            //     text: '%',
	            //     x: this.width / 2 + 25,
	            //     y: 430,
	            //     color: 'black'
	            // })

	            this.add.text({
	                text: 'Ładowanie...',
	                x: this.width / 2 - 80,
	                y: 390,
	                color: 'black',
	                asImage: true
	            });

	            return _AssetManager2.default.loadSync(this.images).then(function () {
	                return _this;
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render(dt) {
	            if (this.renderer) {
	                this.clearCanvas(this.ctx);
	                this.fadeOutHandler();
	                this.fadeInHandler();

	                for (var i = 0, iMax = this.gameObjects.length; i < iMax; i++) {
	                    var entityRender = this.gameObjects[i];
	                    if (entityRender && entityRender.draw && entityRender.contextType === 'main' && entityRender.used) {

	                        if (!entityRender.isOutOfScreen) {
	                            if (entityRender.body && entityRender.body.angle != 0) {
	                                //this.ctx.save();
	                                this.ctx.translate(entityRender.x - this.camera.xScroll + entityRender.width * entityRender.body.anchorX, entityRender.y - this.camera.yScroll + entityRender.height * entityRender.body.anchorY);
	                                this.ctx.rotate(entityRender.body.angle);
	                                //this.ctx.translate(-entityRender.x + this.camera.xScroll - entityRender.width * entityRender.body.anchorX, -entityRender.y + this.camera.yScroll - entityRender.height * entityRender.body.anchorY);
	                            }

	                            entityRender.draw(dt);

	                            if (entityRender.body && entityRender.body.angle != 0) {
	                                // this.ctx.restore();
	                                this.ctx.setTransform(1, 0, 0, 1, 0, 0);
	                            }
	                        }
	                    }
	                    entityRender = null;
	                }
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            for (var u = 0, uMax = this.gameObjects.length; u < uMax; u++) {
	                var entityUpdate = this.gameObjects[u];

	                if (entityUpdate && entityUpdate.update && entityUpdate.used) {
	                    if (entityUpdate.updateOfScreen) {
	                        entityUpdate.update(dt);
	                    } else if (!entityUpdate.updateOfScreen && !entityUpdate.isOutOfScreen) {
	                        entityUpdate.update(dt);
	                    }
	                }
	                entityUpdate = null;
	            }
	            if (this.currentState && typeof this.currentState.update === 'function') {
	                this.currentState.update(dt);
	            }
	        }
	    }, {
	        key: 'animationLoop',
	        value: function animationLoop(timestamp) {
	            if (this.useFpsCounter) {
	                this.fpsmeter.tickStart();
	            }

	            if (!timestamp) {
	                timestamp = 0;
	                last = 0;
	            }

	            elapsed = elapsed + Math.min(1, (timestamp - last) / 1000);

	            while (elapsed >= step) {
	                this.capturePreviousPositions(this.gameObjects);

	                this.update(step);

	                elapsed -= step;
	            }

	            this.render(elapsed);

	            last = timestamp;

	            if (this.useFpsCounter) {
	                this.fpsmeter.tick();
	            }

	            window.requestAnimationFrame(this.animationLoop.bind(this));
	        }
	    }, {
	        key: 'createCanvas',
	        value: function createCanvas(width, height, orientation) {
	            this.canvas = document.createElement('canvas');
	            this.ctx = this.canvas.getContext("2d");
	            this.screenWidth = width || 960;
	            this.screenHeight = height || 540;
	            this.portViewWidth = width;
	            this.portViewHeight = height;
	            this.orientation = orientation || false;
	            this.canvas.style.zIndex = 5;
	            this.canvas.id = "main";
	            this.canvas.width = this.screenWidth;
	            this.canvas.height = this.screenHeight;

	            this.canvas.style.width = this.canvas.width + "px";
	            this.canvas.style.height = this.canvas.height + "px";

	            if (!this.mobile.active) {
	                this.canvas.style.position = 'absolute';
	                this.canvas.style.left = '50%';
	                this.canvas.style.top = '0px';
	                this.canvas.style.marginLeft = -this.canvas.width / 2 + "px";
	                this.scale1 = 1;
	            }

	            document.body.style.overflow = 'hidden';

	            document.body.appendChild(this.canvas);

	            this.animationLoop();
	        }
	    }, {
	        key: 'scallable',
	        value: function scallable(bool) {
	            var _this2 = this;

	            this.scaleUsed = bool;
	            this.resizeCanvas(this.canvas, this.orientation);

	            if (this.bgcanvas) {
	                this.resizeCanvas(this.bgcanvas, this.orientation);
	            }
	            if (this.onbgcanvas) {
	                this.resizeCanvas(this.onbgcanvas, this.orientation);
	            }
	            window.removeEventListener("resize", function () {
	                return _this2.scallableFunction();
	            });
	            if (bool) {
	                window.addEventListener("resize", function () {
	                    return _this2.scallableFunction();
	                });
	            }
	        }
	    }, {
	        key: 'scallableFunction',
	        value: function scallableFunction() {
	            this.resizeCanvas(this.canvas, this.orientation);

	            if (this.bgcanvas) {
	                this.resizeCanvas(this.bgcanvas, this.orientation);
	            }
	            if (this.onbgcanvas) {
	                this.resizeCanvas(this.onbgcanvas, this.orientation);
	            }
	        }
	    }, {
	        key: 'resizeCanvas',
	        value: function resizeCanvas(canvas, orientation) {
	            if (!orientation) {
	                var w = window.innerWidth;
	                var h = window.innerHeight;

	                this.portViewWidth = this.portViewWidth;
	                this.portViewHeight = this.portViewHeight;

	                if (this.scaleUsed) {
	                    this.scale1 = Math.max(0.2, Math.min(Math.min(w, w) / this.screenWidth, Math.min(h, h) / this.screenHeight));

	                    var width = Math.min(Math.floor(this.screenWidth * this.scale1), w);
	                    var height = Math.min(Math.floor(this.screenHeight * this.scale1), h);

	                    canvas.style.width = width + "px";
	                    canvas.style.height = height + "px";

	                    if (!this.mobile.active) {
	                        canvas.style.position = 'absolute';
	                        canvas.style.left = '50%';
	                        canvas.style.top = '0px';
	                        canvas.style.marginLeft = -width / 2 + "px";
	                    }
	                } else {
	                    this.scale1 = 1;
	                    canvas.style.width = this.portViewWidth + "px";
	                    canvas.style.height = this.portViewHeight + "px";
	                    if (!this.mobile.active) {
	                        canvas.style.position = 'absolute';
	                        canvas.style.left = '50%';
	                        canvas.style.top = '0px';
	                        canvas.style.marginLeft = -this.screenWidth / 2 + "px";
	                    }
	                }
	            } else {
	                var _w = window.innerHeight;
	                var _h = window.innerWidth;

	                this.portViewWidth = this.portViewHeight;
	                this.portViewHeight = this.portViewWidth;

	                this.scale1 = Math.max(0.2, Math.min(_w / this.screenWidth, _h / this.screenHeight));

	                var _width = Math.floor(this.screenWidth * this.scale1);
	                var _height = Math.floor(this.screenHeight * this.scale1);

	                canvas.style.width = _height + "px";
	                canvas.style.height = _width + "px";
	            }
	        }
	    }, {
	        key: 'sortByIndex',
	        value: function sortByIndex(arr) {
	            this.gameObjects.sort(function (obj1, obj2) {
	                if (!obj1.zIndex) {
	                    obj1.zIndex = 1;
	                }

	                if (obj1.zIndex > obj2.zIndex) return 1;else if (obj1.zIndex < obj2.zIndex) {
	                    return -1;
	                } else {
	                    return 0;
	                }
	            });
	        }
	    }, {
	        key: 'sortArrayByIndex',
	        value: function sortArrayByIndex(arr) {
	            if (arr) {
	                arr.sort(function (obj1, obj2) {
	                    if (!obj1.zIndex) {
	                        obj1.zIndex = 1;
	                    }

	                    if (obj1.zIndex > obj2.zIndex) return 1;else if (obj1.zIndex < obj2.zIndex) {
	                        return -1;
	                    } else {
	                        return 0;
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'rand',
	        value: function rand(min, max) {
	            return Math.floor(Math.random() * (max - min + 1)) + min;
	        }
	    }, {
	        key: 'randF',
	        value: function randF(min, max) {
	            return Math.random() * (max - min + 1) + min;
	        }
	    }, {
	        key: 'saveData',
	        value: function saveData(name, data) {
	            localStorage.setItem(name, JSON.stringify(data));
	        }
	    }, {
	        key: 'saveDataAd',
	        value: function saveDataAd(name, data) {
	            var oldItems = this.loadData(name) || [];
	            oldItems.push(data);

	            localStorage.setItem(name, JSON.stringify(oldItems));
	        }
	    }, {
	        key: 'loadData',
	        value: function loadData(name) {
	            var data = localStorage.getItem(name);
	            //
	            if (data) {
	                return JSON.parse(data);
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'removeData',
	        value: function removeData(name) {
	            localStorage.removeItem(name);
	        }
	    }, {
	        key: 'shuffle',
	        value: function shuffle(arr) {
	            var counter = arr.length;
	            var tmp = void 0;
	            var index = void 0;
	            while (counter > 0) {
	                counter--;
	                index = Math.floor(Math.random() * counter);
	                //
	                tmp = arr[counter];
	                //
	                arr[counter] = arr[index];
	                //
	                arr[index] = tmp;
	            }
	            return arr;
	        }
	    }, {
	        key: 'clearCanvas',
	        value: function clearCanvas(context) {
	            context.clearRect(0, 0, this.width, this.height);
	        }
	    }, {
	        key: 'capturePreviousPositions',
	        value: function capturePreviousPositions(entities) {
	            for (var u = 0, uMax = entities.length; u < uMax; u++) {
	                var entityCapture = entities[u];
	                if (entityCapture.used && entityCapture.body && entityCapture.body.angle === 0) {
	                    entityCapture.previousX = entityCapture.x;
	                    entityCapture.previousY = entityCapture.y;
	                    if (entityCapture.body) {
	                        entityCapture.body.previousAngle = entityCapture.angle;
	                    }
	                }
	                entityCapture = null;
	            }
	        }
	    }, {
	        key: 'setPortView',
	        value: function setPortView(width, height) {
	            if (!this.orientation) {
	                this.portViewWidth = width;
	                this.portViewHeight = height;
	            } else {
	                this.portViewWidth = height;
	                this.portViewHeight = width;
	            }
	        }
	    }, {
	        key: 'loaded',
	        value: function loaded() {
	            return this.create(this);
	        }
	    }, {
	        key: 'fadeOut',
	        value: function fadeOut(time, key, callback) {
	            this.ctx.globalAlpha = 1;
	            this.timerFade = time;
	            this.currentTimerFade = time;
	            this.timerCallback = callback;
	            this.timerFadeOutActive = true;
	            this.timerFadeInActive = false;
	            if (this.mouse) {
	                this.mouse.used = false;
	            }
	        }
	    }, {
	        key: 'fadeIn',
	        value: function fadeIn(time, callback) {
	            this.timerFade = time;
	            this.currentTimerFade = 0;
	            this.timerCallback = callback;
	            this.timerFadeInActive = true;
	        }
	    }, {
	        key: 'fadeOutHandler',
	        value: function fadeOutHandler() {
	            if (this.timerFadeOutActive) {
	                this.currentTimerFade -= 1 / 60 * 1000;
	                this.ctx.globalAlpha = this.currentTimerFade / this.timerFade;

	                if (this.currentTimerFade <= 0) {
	                    this.ctx.globalAlpha = 0;
	                    this.timerFadeOutActive = false;
	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'showFPS',
	        value: function showFPS() {
	            this.fpsmeter = new FPSMeter({ decimals: 0, graph: false, theme: 'dark', left: '5px' });
	            this.useFpsCounter = true;
	        }
	    }, {
	        key: 'fadeInHandler',
	        value: function fadeInHandler() {
	            if (this.timerFadeInActive) {
	                this.currentTimerFade += 1 / 60 * 1000;
	                this.ctx.globalAlpha = this.currentTimerFade / this.timerFade;
	                if (this.currentTimerFade > this.timerFade) {
	                    this.timerFadeInActive = false;
	                    this.ctx.globalAlpha = 1;
	                    if (this.mouse) {
	                        this.mouse.used = true;
	                    }
	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            }
	        }
	    }]);

	    return Leya;
	}();

	;

	exports.default = Leya;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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


	var AssetManager = (_temp = _class = function () {
	    function AssetManager() {
	        _classCallCheck(this, AssetManager);

	        this.queueSync = [];
	        this.queueAsync = [];
	        this._assets = {};
	    }

	    _createClass(AssetManager, [{
	        key: "loadSync",
	        value: function loadSync(scriptTags) {
	            var _this = this;

	            return new Promise(function (res, rej) {
	                _this.queueSync = [].concat(_toConsumableArray(_this.queueSync));

	                _this.addToQueue('queueSync', scriptTags, res, rej);

	                if (_this.queueSync.length === 0) {
	                    return res(_this.queueSync);
	                }

	                _this._loadItemSync(_this.queueSync[0], _this.queueSync, 0, res, rej);
	            });
	        }
	    }, {
	        key: "_loadItemSync",
	        value: function _loadItemSync(queueItem, queue, index, res, rej) {
	            var _this2 = this;

	            var ext = this.ext(queueItem.path);
	            var availableExt = this.availableExt(ext);

	            if (availableExt) {
	                var scriptElement = document.querySelector('#' + queueItem.key + '_lib');
	                if (scriptElement) {
	                    var isExistInAsyncQueue = this.queueAsync.find(function (x) {
	                        return x.key === queueItem.key;
	                    });

	                    var interval = setInterval(function () {
	                        var scriptElement = document.querySelector('#' + queueItem.key + '_lib');

	                        if (queueItem.success || isExistInAsyncQueue && isExistInAsyncQueue.success) {
	                            clearInterval(interval);
	                            _this2.onScriptLoad(scriptElement, queueItem, queue, index, res, rej);
	                        } else if (scriptElement.dataset.loaded) {
	                            clearInterval(interval);
	                            _this2.onScriptLoad(scriptElement, queueItem, queue, index, res, rej);
	                        } else if (queueItem.error || isExistInAsyncQueue && isExistInAsyncQueue.error) {
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
	    }, {
	        key: "loadAsync",
	        value: function loadAsync(scriptTags, xxx) {
	            var _this3 = this;

	            return new Promise(function (res, rej) {
	                _this3.queueAsync = [].concat(_toConsumableArray(_this3.queueAsync));

	                _this3.addToQueue('queueAsync', scriptTags, res, rej);

	                if (_this3.queueAsync.length === 0) {
	                    return res(_this3.queueAsync);
	                }

	                var itemsPromise = _this3.queueAsync.map(function (item, i) {
	                    return _this3._loadItemAsync(item, _this3.queueAsync, i, res, rej);
	                });

	                return Promise.all(itemsPromise).then(function () {
	                    return res(_this3.queueAsync);
	                }).catch(function (err) {
	                    console.error(err + 1111);
	                });
	            });
	        }
	    }, {
	        key: "_loadItemAsync",
	        value: function _loadItemAsync(queueItem, queue, index, res, rej) {
	            var _this4 = this;

	            return new Promise(function (resolve, reject) {
	                var ext = _this4.ext(queueItem.path);
	                var availableExt = _this4.availableExt(ext);

	                if (availableExt) {
	                    var scriptElement = document.querySelector('#' + queueItem.key + '_lib');

	                    if (scriptElement) {
	                        var isExistInSyncQueue = _this4.queueSync.find(function (x) {
	                            return x.key === queueItem.key;
	                        });

	                        var interval = setInterval(function () {
	                            var scriptElement = document.querySelector('#' + queueItem.key + '_lib');

	                            if (queueItem.success || isExistInSyncQueue && isExistInSyncQueue.success) {
	                                clearInterval(interval);
	                                _this4._onItemLoaded(scriptElement, queueItem, true, false);
	                                return resolve();
	                            } else if (scriptElement.dataset.loaded) {
	                                clearInterval(interval);
	                                _this4._onItemLoaded(scriptElement, queueItem, true, false);
	                                return resolve();
	                            } else if (queueItem.error || isExistInSyncQueue && isExistInSyncQueue.error) {
	                                clearInterval(interval);
	                                _this4._onItemLoaded(scriptElement, queueItem, false, true);
	                                return reject(AssetManager.ERRORS[2](queueItem));
	                            }
	                        }, AssetManager.INTERVAL_TIME);
	                    } else {
	                        var scriptTag = document.createElement(availableExt.element);

	                        if (availableExt.element === 'script') {
	                            scriptTag.src = queueItem.path;
	                        } else if (availableExt.element === 'link') {
	                            scriptTag.rel = 'stylesheet';
	                            scriptTag.href = queueItem.path;
	                        } else if (availableExt.element === 'image') {
	                            scriptTag = new Image();
	                            scriptTag.src = queueItem.path;
	                        } else {
	                            return console.error(AssetManager.ERRORS[4](availableExt.element));
	                        }

	                        scriptTag.id = queueItem.key + '_lib';
	                        scriptTag.onload = function () {
	                            _this4._onItemLoaded(scriptTag, queueItem, true, false);
	                            return resolve();
	                        };
	                        scriptTag.onerror = function () {
	                            _this4._onItemLoaded(scriptTag, queueItem, false, true);
	                            return reject(AssetManager.ERRORS[2](queueItem));
	                        };
	                        document.head.appendChild(scriptTag);
	                    }
	                } else {
	                    return rej(AssetManager.ERRORS[1](queueItem));
	                }
	            });
	        }
	    }, {
	        key: "createSyncElement",
	        value: function createSyncElement(availableExt, queueItem, queue, index, res, rej) {
	            var scriptTag = void 0;

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
	            } else {
	                return console.error(AssetManager.ERRORS[4](availableExt.element));
	            }

	            scriptTag.id = queueItem.key + '_lib';
	            scriptTag.onload = this.onScriptLoad.bind(this, scriptTag, queueItem, queue, index, res, rej);
	            scriptTag.onerror = this.onScriptError.bind(this, scriptTag, queueItem, queue, index, res, rej);
	            document.head.appendChild(scriptTag);
	        }
	    }, {
	        key: "onScriptLoad",
	        value: function onScriptLoad(scriptElement, queueItem, queue, index, res, rej) {
	            var nextIndex = index + 1;

	            this._onItemLoaded(scriptElement, queueItem, true, false);

	            if (this.isElementInQueue(queue, nextIndex)) {
	                this._loadItemSync(queue[nextIndex], queue, nextIndex, res, rej);
	            } else {
	                res(queue);
	            }
	        }
	    }, {
	        key: "onScriptError",
	        value: function onScriptError(scriptElement, queueItem, queue, index, res, rej) {
	            var nextIndex = index + 1;

	            this._onItemLoaded(queueItem, false, true);
	            return rej(AssetManager.ERRORS[2](queueItem));
	        }
	    }, {
	        key: "_onItemLoaded",
	        value: function _onItemLoaded(scriptElement, queueItem, success, err) {
	            if (!this._assets[queueItem.key]) {
	                this._assets[queueItem.key] = scriptElement;
	            }
	            scriptElement.dataset.loaded = success;
	            queueItem.success = success;
	            queueItem.error = err;
	        }
	    }, {
	        key: "ext",
	        value: function ext(url) {
	            return (url = url.substr(1 + url.lastIndexOf("/")).split('?')[0]).split('#')[0].substr(url.lastIndexOf("."));
	        }
	    }, {
	        key: "availableExt",
	        value: function availableExt(ext) {
	            for (var i = 0; i < AssetManager.AVAILABLE_EXT.length; i++) {
	                if (AssetManager.AVAILABLE_EXT[i].ext.toLowerCase() === ext.toLowerCase()) {
	                    return AssetManager.AVAILABLE_EXT[i];
	                }
	            }
	            return false;
	        }
	    }, {
	        key: "addToQueue",
	        value: function addToQueue(queue, scriptTags, res, rej) {
	            var _this5 = this;

	            Object.keys(scriptTags).forEach(function (scriptTag) {
	                var isExistInQueue = _this5[queue].find(function (x) {
	                    return x.key === scriptTag;
	                });

	                if (!isExistInQueue) {
	                    _this5[queue].push({
	                        key: scriptTag,
	                        path: scriptTags[scriptTag]
	                    });
	                }
	            });
	        }
	    }, {
	        key: "isElementInQueue",
	        value: function isElementInQueue(queue, index) {
	            if (queue[index]) {
	                return true;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: "get",
	        value: function get(key) {
	            if (this._assets[key]) {
	                return this._assets[key];
	            }
	            return console.error(AssetManager.ERRORS[6](key));
	        }
	    }, {
	        key: "getSrc",
	        value: function getSrc(key) {
	            if (this._assets[key]) {
	                return this._assets[key].src;
	            }
	            return console.error(AssetManager.ERRORS[5](key));
	        }
	    }], [{
	        key: "initialize",
	        value: function initialize() {
	            if (!(AssetManager.ASSET_MANAGER_INSTANCE instanceof AssetManager)) {
	                AssetManager.ASSET_MANAGER_INSTANCE = new AssetManager();
	                return AssetManager.ASSET_MANAGER_INSTANCE;
	            } else {
	                return AssetManager.ASSET_MANAGER_INSTANCE;
	            }
	        }
	    }]);

	    return AssetManager;
	}(), _class.LIBS = {
	    "facebook": "https://connect.facebook.net/pl_PL/sdk.js",
	    "redplayer": "https://r.dcs.redcdn.pl/http/o2/web/player/redcdn/0.9.8.1-eurozet/js/redcdnplayer.min.js",
	    "swiper": "//gfx." + document.location.host + "/design/chillizet/javascript/plugins/swiper.min.js"
	}, _class.ASSET_MANAGER_INSTANCE = null, _class.AVAILABLE_EXT = [{ element: 'script', ext: '.js' }, { element: 'link', ext: '.css' }, { element: 'image', ext: '.png' }, { element: 'image', ext: '.jpg' }, { element: 'image', ext: '.jpeg' }, { element: 'image', ext: '.gif' }, { element: 'image', ext: '.svg' }], _class.INTERVAL_TIME = 100, _class.ERRORS = {
	    1: function _(queueItem) {
	        return 'plik ' + queueItem.path + ' nie zostal zaladowany! Rozszerzenie pliku nie jest poprawne!';
	    },
	    2: function _(queueItem) {
	        return "Nie uda\u0142o si\u0119 za\u0142adowa\u0107 pliku " + queueItem.path + ". Prawdopodobnie scie\u017Cka do pliku jest nie poprawna! \n Wykonywanie skryt\xF3w zosta\u0142o zatrzymane!";
	    },
	    3: function _(scriptTag) {
	        return "Tag: " + scriptTag + " nie mo\u017Ce by\u0107 u\u017Cyty poniewa\u017C nie jest zdeklarowany w configu. Dalsze wykonywanie skryptu zosta\u0142o przerwane!";
	    },
	    4: function _(element) {
	        return "Element " + element + " nie jest wspierany!";
	    },
	    5: function _(element) {
	        return "Nie uda\u0142o si\u0119 pobra\u0107 scie\u017Cki do elementu " + element + " ";
	    },
	    6: function _(element) {
	        return "Nie uda\u0142o si\u0119 pobra\u0107 elementu " + element + " ";
	    }
	}, _temp);
	exports.default = AssetManager.initialize();

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mobile = function () {
	    function Mobile(game, mobile) {
	        _classCallCheck(this, Mobile);

	        this.game = game;
	        this.active = mobile;
	        this.platform = this.getMobileOperatingSystem();
	    }

	    _createClass(Mobile, [{
	        key: "getMobileOperatingSystem",
	        value: function getMobileOperatingSystem() {
	            var userAgent = navigator.userAgent || navigator.vendor || window.opera;

	            // Windows Phone must come first because its UA also contains "Android"
	            if (/windows phone/i.test(userAgent)) {
	                return "mobile"; // "Windows Phone";
	            }

	            if (/android/i.test(userAgent)) {
	                return "mobile"; // "Android";
	            }

	            // iOS detection from: http://stackoverflow.com/a/9039885/177710
	            if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
	                return "mobile"; // "iOS";
	            }

	            return "desktop";
	        }
	    }]);

	    return Mobile;
	}();

	exports.default = Mobile;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameStateFactory = function () {
	    function GameStateFactory(game) {
	        _classCallCheck(this, GameStateFactory);

	        this.game = game;
	    }

	    _createClass(GameStateFactory, [{
	        key: 'add',
	        value: function add(key, stateObject) {
	            this.game.states[key] = stateObject;
	        }
	    }, {
	        key: 'start',
	        value: function start(key, options) {
	            var _this = this;

	            if (!options) {
	                options = {};
	            }
	            if (key === 'Logo') {
	                this.game.gameObjects.length = 0;
	                // this.game.gameObjectsStatic.length = 0;
	                // this.game.gameObjectsOnStatic.length = 0;
	                this.game.camera.xScroll = 0;
	                this.game.camera.yScroll = 0;
	                this.game.VAR = {};
	                this.game.ARR = {};
	                this.game.currentState = null;
	                this.game.currentState = new this.game.states[key](this.game, 'aaa');

	                if (this.game.currentState.create) {
	                    this.game.currentState.create.apply(this.game);
	                    if (this.game.bgctx) {
	                        this.game.renderStatic();
	                    }
	                    if (this.game.onbgctx) {
	                        this.game.renderOnStatic();
	                    }
	                    this.game.sortByIndex();
	                } else {
	                    throw "Brakuje metody create w scenie " + key;
	                }
	            } else {
	                this.game.fadeOut(options.fadeOut || 400, key, function () {
	                    _this.game.gameObjects.length = 0;
	                    // this.game.gameObjectStatic.length = 0;
	                    // this.game.gameObjectOnStatic.length = 0;
	                    _this.game.camera.xScroll = 0;
	                    _this.game.camera.yScroll = 0;
	                    _this.game.VAR = {};
	                    _this.game.ARR = {};
	                    _this.game.currentState = null;
	                    if (_this.game.states[key]) {
	                        _this.game.currentState = new _this.game.states[key](_this.game);
	                    } else {
	                        return console.error('Nie ma stanu o takiej nazwie: ' + key + '\nDostepne stany:\n' + _this.getAllStates());
	                    }

	                    if (_this.game.currentState.create) {
	                        // this.game.currentState.create.call(this.game, options.data);
	                        _this.game.currentState.create(options.data);
	                        if (_this.game.bgctx) {
	                            _this.game.renderStatic();
	                        }
	                        if (_this.game.onbgctx) {
	                            _this.game.renderOnStatic();
	                        }
	                        _this.game.sortByIndex();

	                        setTimeout(function () {
	                            if (!_this.game.timerFadeOutActive) {
	                                _this.game.fadeIn(options.fadeIn || 400, null);
	                            }
	                        }, 300);
	                    } else {
	                        throw "Brakuje metody create w scenie " + key;
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'getAllStates',
	        value: function getAllStates() {
	            return Object.keys(this.game.states);
	        }
	    }]);

	    return GameStateFactory;
	}();

	;

	exports.default = GameStateFactory;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	// import TileSprite from './TileSprite';

	// import DialogImg from './DialogImg';
	// import Particles from './Particles';
	// import ButtonImg from './ButtonImg';
	// import Grid from './Grid';


	var _Sprite = __webpack_require__(6);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	var _Image = __webpack_require__(10);

	var _Image2 = _interopRequireDefault(_Image);

	var _Rect = __webpack_require__(11);

	var _Rect2 = _interopRequireDefault(_Rect);

	var _Text = __webpack_require__(12);

	var _Text2 = _interopRequireDefault(_Text);

	var _Button = __webpack_require__(13);

	var _Button2 = _interopRequireDefault(_Button);

	var _Bar = __webpack_require__(14);

	var _Bar2 = _interopRequireDefault(_Bar);

	var _Camera = __webpack_require__(15);

	var _Camera2 = _interopRequireDefault(_Camera);

	var _Dialog = __webpack_require__(17);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _Group = __webpack_require__(18);

	var _Group2 = _interopRequireDefault(_Group);

	var _Point = __webpack_require__(20);

	var _Point2 = _interopRequireDefault(_Point);

	var _Circle = __webpack_require__(21);

	var _Circle2 = _interopRequireDefault(_Circle);

	var _Particles = __webpack_require__(22);

	var _Particles2 = _interopRequireDefault(_Particles);

	var _Multiplayer = __webpack_require__(23);

	var _Multiplayer2 = _interopRequireDefault(_Multiplayer);

	var _Map = __webpack_require__(72);

	var _Map2 = _interopRequireDefault(_Map);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameObjectFactory = function () {
	    function GameObjectFactory(game) {
	        _classCallCheck(this, GameObjectFactory);

	        this.game = game;
	    }

	    _createClass(GameObjectFactory, [{
	        key: 'sprite',
	        value: function sprite(options) {
	            return new _Sprite2.default(this.game, options);
	        }
	    }, {
	        key: 'image',
	        value: function image(options) {
	            return new _Image2.default(this.game, options);
	        }
	    }, {
	        key: 'group',
	        value: function group(options) {
	            return new _Group2.default(this.game, options);
	        }
	    }, {
	        key: 'point',
	        value: function point(options) {
	            return new _Point2.default(this.game, options);
	        }
	    }, {
	        key: 'circle',
	        value: function circle(options) {
	            return new _Circle2.default(this.game, options);
	        }
	    }, {
	        key: 'particles',
	        value: function particles(options) {
	            return new _Particles2.default(this.game, options);
	        }

	        // tileSprite(context, x, y, key, w, h) {
	        //     return new TileSprite(this.game, false, context, x, y, key, w, h);
	        // }

	        // particles(x, y, options) {
	        //     return new Particles(this.game, x, y, options);
	        // }

	    }, {
	        key: 'button',
	        value: function button(options) {
	            return new _Button2.default(this.game, options);
	        }

	        // buttonImg(context, key, keyHover, x, y, width, height, action) {
	        //     return new ButtonImg(this.game, false, context, key, keyHover, x, y, width, height, action);
	        // }

	    }, {
	        key: 'rect',
	        value: function rect(options) {
	            return new _Rect2.default(this.game, options);
	        }
	    }, {
	        key: 'map',
	        value: function map(options) {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                var map = new _Map2.default(_this.game, options);
	                map.getJson(map.jsonPath).then(function (mapa) {
	                    map.setMapData(mapa);
	                    var twoDimensionalLayers = map.generateTwoDimensionalLayers(mapa);
	                    map.mapTilesLayers = map.generateTilesAndEmptyArrays(twoDimensionalLayers);
	                    map.generateMapAsImage(map.mapTilesLayers);
	                    return resolve(map);
	                });
	            });
	        }

	        // grid(context, count, width) {
	        //     return new Grid(this.game, context, count, width);
	        // }

	    }, {
	        key: 'multiplayer',
	        value: function multiplayer(ip) {
	            this.game.multiplayer = new _Multiplayer2.default(this.game, ip);
	            return this.game.multiplayer;
	        }
	    }, {
	        key: 'text',
	        value: function text(options) {
	            return new _Text2.default(this.game, options);
	        }
	    }, {
	        key: 'bar',
	        value: function bar(options) {
	            return new _Bar2.default(this.game, options);
	        }
	    }, {
	        key: 'camera',
	        value: function camera(options) {
	            this.game.camera = new _Camera2.default(this.game, options);
	            return this.game.camera;
	        }
	    }, {
	        key: 'dialog',
	        value: function dialog(options) {
	            return new _Dialog2.default(this.game, options);
	        }

	        // dialogImg(x, y, width, height, key, close) {
	        //     return new DialogImg(this.game, x, y, width, height, key, close);
	        // }

	        // sounds(sounds) {
	        //     return this.game.sounds = sounds;
	        // }

	        // toMulti(obj) {
	        //     let o = {
	        //         x: obj.x,
	        //         y: obj.y,
	        //         vx: obj.body.velocity.x,
	        //         vy: obj.body.velocity.y,
	        //         key: obj.key,
	        //         w: obj.currentWidth,
	        //         h: obj.currentHeight,
	        //         states: obj.states,
	        //         state: obj.state,
	        //         type: obj.type,
	        //         oClass: obj.oClass,
	        //         angle: obj.body.angle,
	        //         arguments: obj._arguments
	        //     }
	        //     this.game.multiplayer.emit('add object', o, function (ID, sockID, room) {
	        //         obj.ID = ID;
	        //         obj.sockID = sockID;
	        //         obj.room = room;
	        //     });
	        // }

	    }]);

	    return GameObjectFactory;
	}();

	exports.default = GameObjectFactory;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	var _GameAnimationFactory = __webpack_require__(9);

	var _GameAnimationFactory2 = _interopRequireDefault(_GameAnimationFactory);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sprite = function (_ObjectSettings2) {
	    _inherits(Sprite, _ObjectSettings2);

	    function Sprite(game, options) {
	        _classCallCheck(this, Sprite);

	        var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, game, options));

	        if (!_this.key) {
	            throw 'Musi podany byc klucz do obrazka przy tworzeniu: ' + _this.constructor.name;
	        }

	        _this.type = "sprite";

	        _this.body = new _Body2.default(_this.game, _this);

	        _this.animations = new _GameAnimationFactory2.default(_this);

	        // this.border = this.game.add.rect({ x: this.x, y: this.y, fill: null, strokeColor: 'yellow', zIndex : 1011 });
	        // this.border.hide();

	        _this.state = 'static';

	        _this.sx = options.sx || 0;
	        _this.sy = options.sy || 0;

	        _this.states = {
	            'static': {
	                frames: [{ sx: _this.sx, sy: _this.sy, fW: _this.width, fH: _this.height }]
	            }
	        };

	        _this.current_f = 0;

	        _this.change_f_delay = 0;

	        _this.f_max_delay = 4;

	        _this.playCallbackDelayCurrent = 0;
	        return _this;
	    }

	    // constructor(game, pooled, context, x, y, key, width, height) {
	    //     super();
	    //     this.initializeGlobalSettings({
	    //         game: game,
	    //         pooled: pooled || false,
	    //         context: context || 'main',
	    //         x: x || 1,
	    //         y: y || 1,
	    //         key: key || null,
	    //         width: width,
	    //         height: height
	    //     });
	    //     this.type = 'sprite';
	    //     this.zIndex = 3;

	    //     this.state = 'static';

	    //     this.states = {
	    //         'static': { sx: 0, sy: 0, fW: this.currentWidth, fH: this.currentHeight, f: [0] }
	    //     };

	    //     this.animations = new GameAnimationFactory(this);

	    //     this.body = new Body(this.game, this);

	    //     this.useRpgCollision = false;

	    //     this.body.tolerance = 0;

	    //     this.current_f = 0;
	    //     this.change_f_delay = 0;
	    //     this.f_max_delay = 4;
	    //     this.playCallbackDelayCurrent = 0;
	    // }

	    _createClass(Sprite, [{
	        key: 'draw',
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.game.ctx.globalAlpha === 1) {
	                this.game.ctx.save();
	                this.game.ctx.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = Math.floor((this.x - this.previousX) * dt + this.previousX); //this.x + (this.body.velocity.x * dt);                 
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = Math.floor((this.y - this.previousY) * dt + this.previousY); //this.y + (this.body.velocity.y * dt);
	            } else {
	                this.renderY = this.y;
	            }

	            if (this.states[this.state].frames[this.current_f].flip) {
	                this.game.ctx.save();
	                this.game.ctx.scale(-1, 1);
	            }

	            this.width = this.states[this.state].frames[this.current_f].fW;
	            this.height = this.states[this.state].frames[this.current_f].fH;

	            this.game.ctx.drawImage(this.image, this.states[this.state].frames[this.current_f].sx, //+ !this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fW : 0,
	            this.states[this.state].frames[this.current_f].sy, //+ this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fH : 0,
	            this.states[this.state].frames[this.current_f].fW, this.states[this.state].frames[this.current_f].fH,
	            // Math.floor(this.states[this.state].flip ? (-this.states[this.state].frames[this.current_f].fW - this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
	            // Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
	            this.body.angle === 0 ? this.states[this.state].frames[this.current_f].flip ? -this.states[this.state].frames[this.current_f].fW - this.renderX + (!this.static ? Math.floor(this.game.camera.xScroll) : 0) : this.renderX - (!this.static ? Math.floor(this.game.camera.xScroll) : 0) : -this.states[this.state].frames[this.current_f].fW * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? Math.floor(this.game.camera.yScroll) : 0) : -this.states[this.state].frames[this.current_f].fH * this.body.anchorY, this.states[this.state].frames[this.current_f].fW, this.states[this.state].frames[this.current_f].fH);

	            if (this.states[this.state].frames[this.current_f].flip) {
	                this.game.ctx.restore();
	            }

	            if (this.objAlfa !== 1) {
	                this.game.ctx.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	            //this.frameUpdate(dt);
	        }

	        // redraw(dt) {
	        //     if (this.previousX) {
	        //         this.renderX = this.x + (this.body.velocity.x * dt);
	        //     } else {
	        //         this.renderX = this.x;
	        //     }
	        //     if (this.previousY) {
	        //         this.renderY = this.y + (this.body.velocity.y * dt);
	        //     } else {
	        //         this.renderY = this.y;
	        //     }

	        //     if (this.states[this.state].flip) {
	        //         this.game.ctx.save();
	        //         this.game.ctx.scale(-1, 1);
	        //     }

	        //     //this.context.clearRect(this.renderX, this.renderY, this.image.width, this.image.height);
	        //     this.frameUpdate();

	        //     this.context.drawImage(
	        //         this.image,
	        //         this.states[this.state].frames[this.current_f].sx + !this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fW : 0,
	        //         this.states[this.state].frames[this.current_f].sy + this.states[this.state].horizontal ? this.states[this.state].frames[this.current_f] * this.states[this.state].fH : 0,
	        //         this.states[this.state].frames[this.current_f].fW,
	        //         this.states[this.state].frames[this.current_f].fH,
	        //         Math.floor(this.states[this.state].flip ? (-this.states[this.state].frames[this.current_f].fW - this.renderX + (!this.static ? this.game.camera.xScroll : 0)) : Math.floor(this.renderX - (!this.static ? this.game.camera.xScroll : 0))), // * this.scale
	        //         Math.floor(this.renderY - (!this.static ? this.game.camera.yScroll : 0)),// * this.scale
	        //         this.states[this.state].frames[this.current_f].fW * this.scale,
	        //         this.states[this.state].frames[this.current_f].fH * this.scale
	        //     )

	        //     if (this.states[this.state].flip) {
	        //         this.game.ctx.restore();
	        //     }

	        //     if (this.useRpgCollision) {
	        //         this.rowAndColumn();
	        //     }
	        //     //this.frameUpdate();
	        // }

	    }, {
	        key: 'update',
	        value: function update(dt) {
	            //this.body.useGravity(this);

	            this.body.worldBounce();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();
	            this.useThereAndBack();
	            this.body.scaleUpDownHandler();
	            this.doInTimeHandler();
	            this.moveToPointLinearHandler();

	            if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
	                this.x += dt * this.body.velocity.x;
	                this.y += dt * this.body.velocity.y;
	            }

	            this.frameUpdate(dt);
	        }
	    }, {
	        key: 'updateWhenPositionChange',
	        value: function updateWhenPositionChange(callback) {
	            if (this.previousX !== this.x || this.previousY !== this.y) {
	                if (typeof _callback === 'function') {
	                    _callback(this);
	                }
	            }
	        }
	    }, {
	        key: 'multiUpdate',
	        value: function multiUpdate() {
	            if (this.body.angle !== this.previousAngle || (this.previousX !== this.x || this.previousY !== this.y) && this.ID) {
	                this.game.multiplayer.emit("update obj", { x: this.x, y: this.y, angle: this.body.angle, ID: this.ID, room: this.room });
	            }
	        }
	    }, {
	        key: 'frameUpdate',
	        value: function frameUpdate(dt) {
	            if (!this.once) {
	                if (this.change_f_delay < this.f_max_delay) {
	                    this.change_f_delay += 1 * (dt * 100);
	                } else {
	                    this.change_f_delay = 0;
	                    this.current_f = this.current_f + 1 >= this.states[this.state].frames.length ? 0 : this.current_f + 1;

	                    if (this.current_f === this.states[this.state].frames.length - 1 && typeof this.playCallback === 'function') {
	                        this.playCallbackDelayCurrent++;
	                        if (this.playCallbackDelay === this.playCallbackDelayCurrent) {
	                            this.playCallbackDelayCurrent = 0;
	                            this.playCallback();
	                        }
	                    }
	                }
	            } else {
	                if (this.change_f_delay < this.f_max_delay) {
	                    this.change_f_delay += 1 * (dt * 100);
	                } else {
	                    this.change_f_delay = 0;
	                    this.current_f = this.current_f + 1 >= this.states[this.state].frames.length ? this.states[this.state].frames.length - 1 : this.current_f + 1;

	                    if (this.current_f === this.states[this.state].frames.length - 1 && typeof this.onceCallback === 'function') {
	                        return this.onceCallback();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'rpgCollision',
	        value: function rpgCollision() {
	            this.useRpgCollision = this.useRpgCollision ? false : true;
	        }
	    }, {
	        key: 'moveByLineToEnd',
	        value: function moveByLineToEnd(_mouseX, _mouseY, _speed, _maxDistance, type, _callback) {
	            if (!_mouseX || !_mouseY) {
	                return false;
	            }

	            var dx = _mouseX - this.x - this.halfWidth;
	            var dy = _mouseY - this.y - this.halfHeight;
	            var distance = Math.sqrt(dx * dx + dy * dy);
	            var maxDistance = _maxDistance || 10;
	            var speed = _speed || 4;

	            if (distance > maxDistance) {
	                if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
	                    if (type === 'up') {
	                        this.body.velocity.x = Math.cos(this.body.angle / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin(this.body.angle / (180 / Math.PI)) * speed;
	                    } else if (type === 'down') {
	                        this.body.velocity.x = Math.cos(this.body.angle - 180 / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin(this.body.angle - 180 / (180 / Math.PI)) * speed;
	                    }
	                    if (type === 'left') {
	                        this.body.velocity.x = Math.cos((this.body.angle - 90) / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin((this.body.angle - 90) / (180 / Math.PI)) * speed;
	                    } else if (type === 'right') {
	                        this.body.velocity.x = Math.cos((this.body.angle + 90) / (180 / Math.PI)) * speed;
	                        this.body.velocity.y = Math.sin((this.body.angle + 90) / (180 / Math.PI)) * speed;
	                    }
	                }
	            } else {
	                this.body.velocity.x = 0; //Math.cos(angle) * speed;
	                this.body.velocity.y = 0; //Math.sin(angle) * speed;w

	                if (typeof _callback === 'function') {
	                    this._callback.call(this.game, this);
	                }
	            }
	        }

	        // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
	        //     if (!_mouseX || !_mouseY) {
	        //         return false;
	        //     }
	        //     let dx = (_mouseX - this.x - this.halfWidth);
	        //     let dy = (_mouseY - this.y - this.halfHeight);
	        //     let distance = Math.sqrt(dx * dx + dy * dy);
	        //     let maxDistance = _maxDistance || 4;
	        //     let speed = _speed || 4;

	        //     if (distance > maxDistance) {
	        //         if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
	        //             let angle = Math.atan2(dy, dx);
	        //             this.body.rotate(angle * (180 / Math.PI));

	        //             this.body.velocity.x = Math.cos(angle) * speed;
	        //             this.body.velocity.y = Math.sin(angle) * speed;
	        //         }
	        //     } else {
	        //         this.body.velocity.x = 0;//Math.cos(angle) * speed;
	        //         this.body.velocity.y = 0;//Math.sin(angle) * speed;
	        //         if (typeof _callback === 'function') {
	        //             this._callback.call(this.game, this);
	        //         }
	        //     }
	        // }

	    }, {
	        key: 'moveToPointLinear',
	        value: function moveToPointLinear(x, y, speed, type, callback) {
	            this.positionToLinearMoveX = Math.floor(x);
	            this.positionToLinearMoveY = Math.floor(y);
	            this.linearSpeed = speed;
	            this.linearType = type;
	            this.moveLinearTo = true;
	            this.positionLinearCallback = callback;
	        }
	    }, {
	        key: 'moveToPointLinearHandler',
	        value: function moveToPointLinearHandler() {
	            if (this.moveLinearTo) {
	                if (this.linearType === 'down') {
	                    if (this.y <= this.positionToLinearMoveY) {
	                        this.body.velocity.y = +this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                } else if (this.linearType === 'up') {
	                    if (this.y >= this.positionToLinearMoveY) {
	                        this.body.velocity.y = -this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                } else if (this.linearType === 'right') {
	                    if (this.x <= this.positionToLinearMoveX) {
	                        this.body.velocity.x = +this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                } else if (this.linearType === 'left') {
	                    if (this.x >= this.positionToLinearMoveX) {
	                        this.body.velocity.x = -this.linearSpeed;
	                    } else {
	                        this.moveLinearTo = false;
	                        this.positionLinearCallback.call(this.game, this);
	                    }
	                }
	            }
	        }

	        // setAtributes(options) {
	        //     for (var i = 0; i < Object.keys(options).length; i++) {
	        //         this[Object.keys(options)[i]] = options[Object.keys(options)[i]];
	        //     }
	        // }

	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'width' || key === 'height' || key === 'scale' || key === 'playCallbackDelayCurrent') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Sprite;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Sprite;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _AssetManager = __webpack_require__(2);

	var _AssetManager2 = _interopRequireDefault(_AssetManager);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var _ObjectSettings = (_temp = _class = function () {
	    function _ObjectSettings(game, options) {
	        _classCallCheck(this, _ObjectSettings);

	        if (!game) {
	            throw 'oczekiwano obiektu game jako pierwszy parametr!';
	        }
	        if (!options) {
	            throw 'oczekiwano obiektu jako parametr do: ' + this.constructor.name;
	        }

	        this.objID = _ObjectSettings.ID++;

	        this.AssetManager = _AssetManager2.default;

	        this.game = game;

	        //this.pooled = options.pooled; 

	        this.contextType = options.context || 'main';

	        this.x = options.x === undefined ? 100 : options.x;

	        this.y = options.y === undefined ? 100 : options.y;

	        this.startX = options.x === undefined ? 100 : options.x;

	        this.startY = options.y === undefined ? 100 : options.y;

	        this.key = options.key || false;

	        this.isOutOfScreen = options.isOutOfScreen || false;

	        this.isRender = options.isRender === undefined ? true : false;

	        this.updateOfScreen = options.updateOfScreen === undefined || options.updateOfScreen === true ? true : false;

	        this.used = options.used === undefined ? true : false;

	        this.useCollision = options.useCollision === undefined || options.useCollision === true ? true : false;

	        this.static = options.static || false;

	        this.scale = options.scale || 1;

	        this.zIndex = options.zIndex || 3;

	        this.objAlfa = options.objAlfa || 1;

	        this.timeLocal = 0;

	        this.hovered = false;

	        this.touchActive = false;

	        this.playerControlled = true;

	        if (this.key) {
	            this.image = this.AssetManager.get(this.key) || this.key;
	        }

	        this.width = options.width || (this.image ? this.image.width : 150);
	        this.height = options.height || (this.image ? this.image.height : 150);

	        this.halfWidth = this.width / 2;
	        this.halfHeight = this.height / 2;

	        this.setContext(this.contextType);
	    }

	    _createClass(_ObjectSettings, [{
	        key: 'optionsAssign',
	        value: function optionsAssign(options, me) {
	            var _this = this;

	            Object.keys(options).forEach(function (key) {
	                if (_typeof(options[key]) === 'object') {
	                    _this.optionsAssign(options[key], me[key]);
	                } else {
	                    if (key) {
	                        me[key] = options[key];
	                    }
	                }
	            });
	        }
	    }, {
	        key: 'changeContext',
	        value: function changeContext(context, array) {
	            if (this.contextType != context) {
	                this.destroy(array);
	                this.setContext(context);
	            }
	            return this;
	        }
	    }, {
	        key: 'getCenter',
	        value: function getCenter() {
	            return {
	                x: this.x + this.halfWidth,
	                y: this.y + this.halfHeight
	            };
	        }
	    }, {
	        key: 'setContext',
	        value: function setContext(context) {
	            if (context) {
	                if (context === 'main') {
	                    this.context = this.game.ctx;
	                    this.contextType = context;
	                    var gameObjectLength = this.game.gameObjects.length;
	                    this.game.gameObjects[gameObjectLength] = this;
	                } else if (context === 'background') {
	                    this.context = this.game.bgctx;
	                    this.contextType = context;
	                    var gameObjectStaticLength = this.game.gameObjectsStatic.length;
	                    this.game.gameObjectsStatic[gameObjectStaticLength] = this;
	                    //this.redraw(); 
	                } else if (context === 'onbackground') {
	                    this.context = this.game.onbgctx;
	                    this.contextType = context;
	                    var gameObjectOnStaticLength = this.game.gameObjectsOnStatic.length;
	                    this.game.gameObjectsOnStatic[gameObjectOnStaticLength] = this;
	                    //this.redraw();
	                } else {
	                    return console.error("Niepoprawna nazwa Contextu. Dostępne nazwy to: \n1. background \n2. onbackground \n3. main");
	                }
	            }
	        }
	    }, {
	        key: 'setIndex',
	        value: function setIndex(index) {
	            this.zIndex = index;
	            return this;
	            // this.game.gameObjects.sort((obj1, obj2) => {
	            //     if (obj1.zIndex > obj2.zIndex)
	            //         return 1;
	            //     else if (obj1.zIndex < obj2.zIndex) {
	            //         return -1;
	            //     } else {
	            //         return 0;
	            //     }
	            // });
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy(array) {
	            if (Array.isArray(array)) {
	                array.splice(array.indexOf(this), 1);
	            }
	            this.x = -500;
	            this.y = -500;
	            return this.game.gameObjects.splice(this.game.gameObjects.indexOf(this), 1);
	        }
	    }, {
	        key: 'kill',
	        value: function kill(array) {
	            if (Array.isArray(array)) {
	                array.splice(array.indexOf(this), 1);
	            }
	        }
	    }, {
	        key: 'doInTime',
	        value: function doInTime(time, callback) {
	            this.timeLocal = 0;
	            this.timeMax = time;
	            this.timeCallback = callback;
	            this.inTime = true;
	        }
	    }, {
	        key: 'doInTimeHandler',
	        value: function doInTimeHandler() {
	            if (this.inTime) {
	                this.timeLocal += 1 / 60 * 1000;

	                if (this.timeLocal > this.timeMax) {
	                    this.timeLocal = 0;
	                    this.inTime = false;
	                    this.timeCallback.call(this, this);
	                }
	            }
	        }
	    }, {
	        key: 'doInTimeStop',
	        value: function doInTimeStop() {
	            this.inTime = false;
	        }
	    }, {
	        key: 'fadeOut',
	        value: function fadeOut(time, callback) {
	            this.timerFade = time;
	            this.currentTimerFade = time;
	            this.timerFadeMin = 0;
	            this.timerCallback = callback;
	            this.timerFadeInActive = false;
	            this.timerFadeOutActive = true;
	        }
	    }, {
	        key: 'fadeIn',
	        value: function fadeIn(time, callback) {
	            this.timerFade = time;
	            this.currentTimerFade = 0;
	            this.timerFadeMin = 0;
	            this.timerCallback = callback;
	            this.timerFadeOutActive = false;
	            this.timerFadeInActive = true;
	        }
	    }, {
	        key: 'fadeOutHandler',
	        value: function fadeOutHandler() {
	            if (this.timerFadeOutActive) {

	                this.currentTimerFade -= 1 / 60 * 1000;
	                this.objAlfa = this.currentTimerFade / this.timerFade;

	                if (this.currentTimerFade <= 0) {
	                    this.objAlfa = 0;
	                    this.timerFadeOutActive = false;
	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'fadeInHandler',
	        value: function fadeInHandler() {
	            if (this.timerFadeInActive && this.objAlfa !== 1) {

	                this.currentTimerFade += 1 / 60 * 1000;
	                this.objAlfa = this.currentTimerFade / this.timerFade;

	                if (this.currentTimerFade >= this.timerFade) {
	                    this.timerFadeInActive = false;
	                    this.objAlfa = 1;

	                    if (typeof this.timerCallback === 'function') {
	                        return this.timerCallback.call();
	                    }
	                }
	            } else {
	                this.timerFadeInActive = false;
	            }
	        }
	    }, {
	        key: 'thereAndBack',
	        value: function thereAndBack(options) {
	            if (!options.distance || !options.direction || !options.speed) {
	                throw "Wymagany obiekt jako argument z wlasciowsciami \n distance: INT \n direction: String ('left, right, up, down') \n speed: INT";
	            }
	            if (options.direction !== 'left' && options.direction !== 'right' && options.direction !== 'down' && options.direction !== 'up') {
	                throw "Wybrano niedostepny kierunek! dostepne direction: ('left, right, up, down') ";
	            }
	            this.thereAndBack_startX = this.x;
	            this.thereAndBack_startY = this.y;
	            if (options.direction === 'right' || options.direction === 'left') {
	                this.thereAndBack_dis = options.direction === 'right' ? this.x + options.distance : this.x - options.distance;
	            } else {
	                this.thereAndBack_dis = options.direction === 'down' ? this.y + options.distance : this.y - options.distance;
	            }

	            this.thereAndBack_dir = options.direction;
	            this.thereAndBack_speed = options.speed;
	            this.thereAndBack_site = true;
	            this.thereAndBackUsed = true;
	            return this;
	        }
	    }, {
	        key: 'useThereAndBack',
	        value: function useThereAndBack() {
	            if (this.thereAndBackUsed) {
	                if (this.thereAndBack_dir === 'right') {
	                    if (this.x < this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.x = this.thereAndBack_speed;
	                    } else if (this.x > this.thereAndBack_startX) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.x = -this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.x = this.body.velocity.x * -1;
	                    }
	                } else if (this.thereAndBack_dir === 'left') {
	                    if (this.x > this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.x = -this.thereAndBack_speed;
	                    } else if (this.x < this.thereAndBack_startX) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.x = this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.x = this.body.velocity.x * -1;
	                    }
	                } else if (this.thereAndBack_dir === 'up') {
	                    if (this.y > this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.y = -this.thereAndBack_speed;
	                    } else if (this.y < this.thereAndBack_startY) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.y = this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.y = this.body.velocity.y * -1;
	                    }
	                } else if (this.thereAndBack_dir === 'down') {
	                    if (this.y < this.thereAndBack_dis && this.thereAndBack_site) {
	                        this.body.velocity.y = this.thereAndBack_speed;
	                    } else if (this.y > this.thereAndBack_startY) {
	                        this.thereAndBack_site = false;
	                        this.body.velocity.y = -this.thereAndBack_speed;
	                    } else {
	                        this.thereAndBack_site = true;
	                        this.body.velocity.y = this.body.velocity.y * -1;
	                    }
	                }
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'moveToPoint',
	        value: function moveToPoint(options) {
	            if (!options) {
	                throw "Wymagany obiekt jako argument! \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) \n anchor: boolean (opcjonalnie) \n rotation: boolean (opcjonalnie) tilt: INT (opcjonalnie)";
	            }
	            if (!options.x && !options.y && !options.speed) {
	                throw "Niepoprawne parametry! \n Wymagane: \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) \n anchor: boolean (opcjonalnie) \n rotation: boolean (opcjonalnie) tilt: INT (opcjonalnie)";
	            }

	            this.positionToMoveX = Math.floor(options.x);
	            this.positionToMoveY = Math.floor(options.y);
	            this.positionSpeed = options.speed;
	            this.positionRotation = options.rotation || false;
	            this.positionAnchor = options.anchor || false;
	            this.positionTilt = options.tilt || 0;
	            this.oldVelocityX = this.body.velocity.x;
	            this.oldVelocityY = this.body.velocity.y;
	            this.oldUseCollision = this.useCollision;
	            this.useCollision = options.collision || true;
	            this.moveTo = true;
	            this.positionCallback = options.callback;
	        }
	    }, {
	        key: 'moveToPointHandler',
	        value: function moveToPointHandler() {
	            if (this.moveTo) {
	                var dx = Math.floor(this.positionToMoveX - this.x - (this.positionAnchor ? this.halfWidth : 0));
	                var dy = Math.floor(this.positionToMoveY - this.y - (this.positionAnchor ? this.halfHeight : 0));

	                var distance = Math.sqrt(dx * dx + dy * dy);

	                if (distance > 2) {
	                    if (this.positionRotation) {
	                        var tilt = this.positionTilt * Math.PI / 180;
	                        this.body.angle = Math.atan2(dy, dx) - tilt;
	                    }
	                    this.body.velocity.x = dx / distance * this.positionSpeed;
	                    this.body.velocity.y = dy / distance * this.positionSpeed;
	                } else {
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    this.x = this.positionToMoveX;
	                    this.y = this.positionToMoveY;
	                    this.useCollision = this.oldUseCollision;
	                    this.moveTo = false;
	                    if (typeof this.positionCallback === 'function') {
	                        this.positionCallback.call(this.game, this);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'moveToPointBreak',
	        value: function moveToPointBreak() {
	            var _this2 = this;

	            var time = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 50;

	            if (this.moveTo) {
	                setTimeout(function () {
	                    _this2.body.velocity.x = 0;
	                    _this2.body.velocity.y = 0;
	                    _this2.useCollision = _this2.oldUseCollision;
	                    _this2.moveTo = false;
	                }, time);
	            }
	        }
	    }, {
	        key: 'moveToPointEasing',
	        value: function moveToPointEasing(options) {
	            if (!options) {
	                throw "Wymagany obiekt jako argument! \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) ";
	            }
	            if (!options.x && !options.y && !options.speed) {
	                throw "Niepoprawne parametry! \n Wymagane: \n x: INT, \n y: INT, \n speed: INT, \n callback: function (opcjonalnie) ";
	            }

	            this.positionEasingToMoveX = Math.floor(options.x);
	            this.positionEasingToMoveY = Math.floor(options.y);
	            this.positionEasingSpeed = options.speed;
	            this.oldVelocityX = this.body.velocity.x;
	            this.oldVelocityY = this.body.velocity.y;
	            this.oldUseCollision = this.useCollision;
	            this.useCollision = false;
	            this.moveToEasing = true;

	            this.positionEasingCallback = options.callback;
	        }
	    }, {
	        key: 'moveToPointEasingHandler',
	        value: function moveToPointEasingHandler() {
	            if (this.moveToEasing) {
	                this.myX = Math.floor(this.x);
	                this.myY = Math.floor(this.y);

	                if (this.moveToEasing && this.myX != this.positionEasingToMoveX && this.myY != this.positionEasingToMoveY) {
	                    this.x -= (this.myX - this.positionEasingToMoveX) / this.positionEasingSpeed;
	                    this.y -= (this.myY - this.positionEasingToMoveY) / this.positionEasingSpeed;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                } else if (this.moveToEasing) {
	                    this.body.velocity.x = this.oldVelocityX;
	                    this.body.velocity.y = this.oldVelocityY;
	                    this.useCollision = this.oldUseCollision;
	                    this.x = Math.floor(this.x);
	                    this.y = Math.floor(this.y);
	                    this.moveToEasing = false;
	                    if (typeof this.positionEasingCallback === 'function') {
	                        this.positionEasingCallback.call(this.game, this);
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'topShooter',
	        value: function topShooter(blockWidth, callback) {
	            //if(this.game.keyboard.use['W'].pressed){
	            if (Math.abs(this.body.velocity.x) > 0 || Math.abs(this.body.velocity.y) > 0) {
	                this.column = Math.round(this.x / blockWidth);
	                this.row = Math.round(this.y / blockWidth);

	                this.next_columnRight = Math.round((this.x + blockWidth) / blockWidth);
	                this.next_columnLeft = Math.round((this.x - blockWidth) / blockWidth);

	                this.next_rowBottom = Math.floor((this.y + this.height) / blockWidth);
	                this.next_rowTop = Math.floor(this.y / blockWidth);
	                //
	                if (this.game.map.b[this.next_rowBottom][this.column].type != 'empty') {
	                    this.y = this.row * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('bottom');
	                }
	                if (this.game.map.b[this.next_rowTop][this.column].type != 'empty') {
	                    this.y = this.row * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('top');
	                }
	                if (this.game.map.b[this.row][this.next_columnRight].type != 'empty') {
	                    this.x = this.column * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('');
	                }
	                if (this.game.map.b[this.row][this.next_columnLeft].type != 'empty') {
	                    this.x = this.column * blockWidth;
	                    this.body.velocity.x = 0;
	                    this.body.velocity.y = 0;
	                    return callback('');
	                }
	            }
	            return false;
	            // }
	        }
	    }, {
	        key: 'setClone',
	        value: function setClone(x, y, w, h) {
	            this.clone = this.game.ctx.getImageData(x, y, w, h);
	        }
	    }, {
	        key: 'hide',
	        value: function hide() {
	            this.renderX = 0;
	            this.renderY = 0;
	            this.previousX = 0;
	            this.previousY = 0;
	            this.x = 0;
	            this.y = 0;
	            this.used = false;
	            this.once = false;

	            return this;
	        }
	    }, {
	        key: 'show',
	        value: function show() {
	            this.used = true;

	            return this;
	        }
	    }, {
	        key: 'toggle',
	        value: function toggle() {
	            this.used = !this.used;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps(superProps) {
	            var props = {};

	            for (var key in this) {
	                if (key !== 'game' && key !== 'AssetManager' && key !== 'body' && key !== 'context' && key !== 'startX' && key !== 'startY' && key !== 'contextType' && key !== 'timeLocal' && key !== 'halfHeight' && key !== 'halfWidth' && key !== 'hovered' && key !== 'isOutOfScreen' && key !== 'touchActive' && key !== 'type' && key !== 'playerControlled' && key !== 'image' && key !== 'animations' && key !== 'f_max_delay' && key !== 'change_f_delay' && key !== 'states' && key !== 'state' && key !== 'current_f' && key !== 'once' && key !== 'playCallback' && key !== 'playCallbackDellayCurrent' && key !== 'currentStatusX' && key !== 'statusX' && key !== 'textSize' && key !== 'cloneText' && key !== 'axis' && key !== 'viewportRect' && key !== 'worldRect' && key !== 'wView' && key !== 'hView' && key !== 'xDeadZone' && key !== 'yDeadZone' && key !== 'xScroll' && key !== 'yScroll') {
	                    props[key] = this[key];
	                }
	            }

	            if (!superProps) {
	                console.log(props);
	                return this;
	            } else {
	                return props;
	            }
	        }
	    }]);

	    return _ObjectSettings;
	}(), _class.ID = 0, _temp);

	exports.default = _ObjectSettings;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Body = function () {
	    function Body(game, sprite) {
	        _classCallCheck(this, Body);

	        this.game = game;
	        this.sprite = sprite;

	        this.velocity = {
	            x: 0,
	            y: 0
	        };
	        this.gravity = {
	            x: 0,
	            y: 0
	            //
	        };this.scale = 1;
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

	    _createClass(Body, [{
	        key: 'setWorldBounds',
	        value: function setWorldBounds(bool) {
	            this.worldBounds = bool;
	            return this.sprite;
	        }
	    }, {
	        key: 'setWorldColider',
	        value: function setWorldColider(bool) {
	            this.colideWorldSide = bool;
	            return this.sprite;
	        }
	    }, {
	        key: 'worldBounce',
	        value: function worldBounce() {
	            if (this.colideWorldSide) {
	                if (this.colideWorldSideBottom && this.sprite.y + this.sprite.height * this.scale >= this.game.portViewHeight) {
	                    this.velocity.y = this.worldBounds ? this.velocity.y * -1 : 0;
	                    this.sprite.y = this.game.portViewHeight - this.sprite.height * this.scale;
	                } else if (this.colideWorldSideTop && this.sprite.y * this.scale <= 0) {
	                    this.velocity.y = this.worldBounds ? this.velocity.y * -1 : 0;
	                    this.sprite.y = 0;
	                }
	                if (this.colideWorldSideRight && this.sprite.x + this.sprite.width * this.scale >= this.game.portViewWidth) {
	                    this.velocity.x = this.worldBounds ? this.velocity.x * -1 : 0;
	                    this.sprite.x = this.game.portViewWidth - this.sprite.width * this.scale;
	                } else if (this.colideWorldSideLeft && this.sprite.x * this.scale <= 0) {
	                    this.velocity.x = this.worldBounds ? this.velocity.x * -1 : 0;
	                    this.sprite.x = 0;
	                }
	            }
	        }
	    }, {
	        key: 'setScale',
	        value: function setScale(scale) {
	            this.scale = scale;
	        }
	    }, {
	        key: 'scaleUp',
	        value: function scaleUp(too, speed, callback) {
	            this.scaleUpTrig = true;
	            this.scaleSpeed = speed;
	            this.scaleToo = too;
	            this.scallUpCallback = callback;
	        }
	    }, {
	        key: 'scaleDown',
	        value: function scaleDown(too, speed, callback) {
	            this.scaleDownTrig = true;
	            this.scaleSpeed = speed;
	            this.scaleToo = too;
	            this.scallDownCallback = callback;
	        }
	    }, {
	        key: 'scaleUpDownHandler',
	        value: function scaleUpDownHandler() {
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
	    }, {
	        key: 'useGravity',
	        value: function useGravity(obj) {
	            // !obj.body.isGround && 
	            if (obj.y + obj.states[obj.state].fH < obj.game.canvas.height && !obj.body.ground) {
	                obj.body.velocity.y += obj.body.gravity.y / 1000;
	            } else {
	                obj.body.velocity.y = 0;
	                obj.body.ground = false;
	            }
	        }
	    }, {
	        key: 'addAngle',
	        value: function addAngle(val) {
	            if (this.angle * 180 / Math.PI >= 360) {
	                this.angle = 0;
	            }
	            this.angle += val * Math.PI / 180;
	        }
	    }, {
	        key: 'remAngle',
	        value: function remAngle(val) {
	            if (this.angle * 180 / Math.PI <= -360) {
	                this.angle = 0;
	            }
	            this.angle -= val * Math.PI / 180;
	        }
	    }, {
	        key: 'rotate',
	        value: function rotate(val) {
	            this.angle = val || 0;
	            return this.sprite;
	        }
	    }, {
	        key: 'setVelocity',
	        value: function setVelocity(x, y) {
	            if (!x || !y) {
	                console.log("wymagane podanie parametrów: 'x' i 'y' ");
	            } else {
	                this.velocity.x = x;
	                this.velocity.y = y;
	            }
	            return this.sprite;
	        }
	    }, {
	        key: 'setAnchor',
	        value: function setAnchor(x, y) {
	            this.anchorX = x;
	            this.anchorY = y;

	            return this.sprite;
	        }
	    }, {
	        key: 'rotateByMouse',
	        value: function rotateByMouse(spritePosition, easing) {
	            var easingSpeed = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0.06;


	            if (spritePosition === undefined) {
	                throw "Wymagane jest podanie poczatkowego nachylenia obrazka, jako INT.\n Opcjonalnie można użyć dwóch pozostałych parametrów do easingu. \n easing: Boolean i easingSpeed: Float";
	            }

	            var dx = this.game.mouse.mouseX + this.game.camera.xScroll - this.sprite.x - this.sprite.width * this.anchorX;
	            var dy = this.game.mouse.mouseY + this.game.camera.yScroll - this.sprite.y - this.sprite.height * this.anchorY;

	            if (easing) {
	                var toAngle = Math.atan2(dy, dx) - spritePosition * Math.PI / 180;

	                var radDiff = toAngle - this.angle;
	                if (radDiff > Math.PI) {
	                    this.angle += 2 * Math.PI;
	                } else if (radDiff < -Math.PI) {
	                    this.angle -= 2 * Math.PI;
	                }

	                var targetVel = radDiff * easingSpeed;
	                this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.01, this.rotSpeed + 0.01);

	                this.angle += this.rotSpeed;
	            } else {
	                var disX = Math.abs(dx);
	                var disY = Math.abs(dx);

	                if (disX > 3 || disY > 3) {
	                    this.angle = Math.atan2(dy, dx) - spritePosition * Math.PI / 180;
	                }
	            }
	        }
	    }, {
	        key: 'rotateAndMoveByMouse',
	        value: function rotateAndMoveByMouse(spritePosition, speed, easing) {
	            var easingSpeed = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0.06;

	            if (spritePosition === undefined || speed === undefined) {
	                throw "Wymagane jest podanie poczatkowego nachylenia obrazka, jako INT i predkości jako INT.\n Opcjonalnie można użyć dwóch pozostałych parametrów do easingu. \n easing: Boolean i easingSpeed: Float";
	            }

	            var dx = this.game.mouse.mouseX - this.sprite.x - this.sprite.halfWidth;
	            var dy = this.game.mouse.mouseY - this.sprite.y - this.sprite.halfHeight;
	            var tilt = spritePosition * Math.PI / 180;

	            if (easing) {
	                var toAngle = Math.atan2(dy, dx) - tilt;
	                var toPos = this.angle + tilt;
	                var pi2 = 2 * Math.PI;

	                var radDiff = toAngle - this.angle;
	                if (radDiff > Math.PI) {
	                    this.angle += pi2;
	                } else if (radDiff < -Math.PI) {
	                    this.angle -= pi2;
	                }

	                var targetVel = radDiff * easingSpeed;
	                this.rotSpeed = this.clip(targetVel, this.rotSpeed - 0.04, this.rotSpeed + 0.04);
	                this.angle += this.rotSpeed;

	                this.velocity.x = Math.cos(toPos) * speed;
	                this.velocity.y = Math.sin(toPos) * speed;
	            } else {
	                var disX = Math.abs(dx);
	                var disY = Math.abs(dy);

	                if (disX > 20 || disY > 20) {
	                    var distance = Math.sqrt(dx * dx + dy * dy);
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

	    }, {
	        key: 'clip',
	        value: function clip(x, min, max) {
	            return x < min ? min : x > max ? max : x;
	        }
	    }]);

	    return Body;
	}();

	exports.default = Body;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var GameAnimationFactory = function () {
	    function GameAnimationFactory(sprite) {
	        _classCallCheck(this, GameAnimationFactory);

	        this.sprite = sprite;
	    }

	    _createClass(GameAnimationFactory, [{
	        key: 'add',
	        value: function add(options) {
	            if (!options) {
	                throw 'oczekiwano obiektu jako argument przy tworzeniu animacji do: ' + this.sprite.constructor.name;
	            }

	            if (!options.key) {
	                throw 'oczekiwano wlasciwosci `key` w przekazanym obiekcie';
	            }

	            if (!options.frames) {
	                throw 'oczekiwano tablicy obiektów `frames` w przekazanym obiekcie';
	            }

	            this.chceckFrames(options.frames);

	            this.sprite.states[options.key] = options;
	            return this.sprite;
	        }
	    }, {
	        key: 'chceckFrames',
	        value: function chceckFrames(frames) {
	            if (frames.length === 0) {
	                throw "W przekazanej tablicy frames jest błąd. Wymagane parametry to obiekt z kluczami: \n 'sx' \n 'sy' \n 'fW' \n 'fH' \n przy czym 'fW' i 'fH' muszą być większe od 0!";
	            }
	            for (var i = 0; i < frames.length; i++) {
	                var frame = frames[i];
	                if (!frame.sx && frame.sx !== 0 || !frame.sy && frame.sy !== 0 || !frame.fW || !frame.fH) {
	                    throw "W przekazanej tablicy frames jest błąd. Wymagane parametry to obiekt z kluczami: \n 'sx' \n 'sy' \n 'fW' \n 'fH' \n przy czym 'fW' i 'fH' muszą być większe od 0!";
	                }
	            }
	        }
	    }, {
	        key: 'play',
	        value: function play(options) {

	            if (!options) {
	                throw "Metoda play wymaga obiektu jako parametr";
	            }

	            if (!options.key) {
	                throw "W momencie wywolania metody play wymagany jest 'key' nazwanej animacji";
	            }

	            if (options.key != this.sprite.state) {
	                this.sprite.current_f = 0;
	                this.sprite.once = false;
	                this.sprite.state = options.key;
	                this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW * this.sprite.scale;
	                this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH * this.sprite.scale;
	                this.sprite.halfWidth = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW / 2 * this.sprite.scale;
	                this.sprite.halfHeight = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH / 2 * this.sprite.scale;
	                this.sprite.f_max_delay = options.delay || 10;
	                if (typeof options.callback === 'function') {
	                    this.sprite.playCallback = options.callback;
	                    this.sprite.playCallbackDelay = options.callbackDelay || 1;
	                } else {
	                    this.sprite.playCallback = null;
	                }
	            }

	            return this.sprite;
	        }
	    }, {
	        key: 'playOnce',
	        value: function playOnce(options) {

	            if (!options) {
	                throw "Metoda play wymaga obiektu jako parametr";
	            }

	            if (!options.key) {
	                throw "W momencie wywolania metody play wymagany jest 'key' obrazka";
	            }

	            if (options.key != this.sprite.state) {
	                this.sprite.once = true;
	                this.sprite.current_f = 0;
	                this.sprite.state = options.key;
	                this.sprite.width = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW * this.sprite.scale;
	                this.sprite.height = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH * this.sprite.scale;
	                this.sprite.halfWidth = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fW / 2 * this.sprite.scale;
	                this.sprite.halfHeight = this.sprite.states[this.sprite.state].frames[this.sprite.current_f].fH / 2 * this.sprite.scale;
	                this.sprite.f_max_delay = options.delay || 10;
	                if (typeof options.callback === 'function') {
	                    this.sprite.onceCallback = options.callback;
	                } else {
	                    this.sprite.onceCallback = null;
	                }
	            }
	        }
	    }, {
	        key: 'setImage',
	        value: function setImage(image) {
	            this.sprite.image = this.sprite.loader.assetManager.get(image);
	            this.sprite.current_f = 0;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            return this.sprite.state;
	        }
	    }]);

	    return GameAnimationFactory;
	}();

	;

	exports.default = GameAnimationFactory;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Image = function (_ObjectSettings2) {
	    _inherits(Image, _ObjectSettings2);

	    function Image(game, options) {
	        _classCallCheck(this, Image);

	        var _this = _possibleConstructorReturn(this, (Image.__proto__ || Object.getPrototypeOf(Image)).call(this, game, options));

	        if (!_this.key) {
	            var _ret;

	            return _ret = console.error('Musi podany byc key do obrazka przy tworzeniu Classy: ' + _this.constructor.name), _possibleConstructorReturn(_this, _ret);
	        }

	        _this.type = "image";
	        _this.body = new _Body2.default(_this.game, _this);
	        // console.log(options)
	        // this.optionsAssign(options, this)
	        return _this;
	    }

	    _createClass(Image, [{
	        key: 'draw',
	        value: function draw(lag) {

	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.body.angle === 0) {
	                if (this.previousX) {
	                    this.renderX = (this.x - this.previousX) * lag + this.previousX;
	                } else {
	                    this.renderX = this.x;
	                }
	                if (this.previousY) {
	                    this.renderY = (this.y - this.previousY) * lag + this.previousY;
	                } else {
	                    this.renderY = this.y;
	                }
	            }

	            this.context.drawImage(this.image, 0, 0, this.image.width, this.image.height, this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) * this.body.scale : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) * this.body.scale : -this.height * this.body.anchorY, this.width * this.body.scale, this.height * this.body.scale);

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.body.worldBounce();
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();

	            if (this.body.velocity.x != 0 || this.body.velocity.y != 0) {
	                this.x += dt * this.body.velocity.x;
	                this.y += dt * this.body.velocity.y;
	            }
	        }
	    }, {
	        key: 'updateWhenPositionChange',
	        value: function updateWhenPositionChange(x, y, callback) {
	            if (this.previousX !== this.x || this.previousY !== this.y) {
	                if (typeof _callback === 'function') {
	                    _callback(this);
	                }
	            }
	        }
	    }, {
	        key: 'multiUpdate',
	        value: function multiUpdate() {
	            if ((this.previousX !== this.x || this.previousY !== this.y) && this.ID) {
	                this.game.multiplayer.emit("update obj", { x: this.x, y: this.y, ID: this.ID, room: this.room });
	            }
	        }
	    }, {
	        key: 'changeImage',
	        value: function changeImage(key) {
	            if (key) {
	                this.image = this.AssetManager.get(key) || this.image;
	            }
	        }

	        // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
	        //     if (!_mouseX || !_mouseY) {
	        //         return false;
	        //     }
	        //     let dx = (_mouseX - this.x - this.currentHalfWidth);
	        //     let dy = (_mouseY - this.y - this.currentHalfHeight);
	        //     let distance = Math.sqrt(dx * dx + dy * dy);
	        //     let maxDistance = _maxDistance || 10;
	        //     let speed = _speed || 4;

	        //     if (distance > maxDistance) {
	        //         if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {
	        //             let angle = Math.atan2(dy, dx);
	        //             this.body.rotate(angle * (180 / Math.PI));

	        //             this.body.velocity.x = Math.cos(angle) * speed;
	        //             this.body.velocity.y = Math.sin(angle) * speed;
	        //         }
	        //     } else {
	        //         this.body.velocity.x = 0;
	        //         this.body.velocity.y = 0;
	        //         if (typeof _callback === 'function') {
	        //             this._callback.call(this.game, this);
	        //         }
	        //     }
	        // }

	    }]);

	    return Image;
	}(_ObjectSettings4.default);

	exports.default = Image;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Rect = function (_ObjectSettings2) {
	    _inherits(Rect, _ObjectSettings2);

	    function Rect(game, options) {
	        _classCallCheck(this, Rect);

	        var _this = _possibleConstructorReturn(this, (Rect.__proto__ || Object.getPrototypeOf(Rect)).call(this, game, options));

	        _this.strokeColor = options.strokeColor || null;

	        _this.fill = options.fill === null ? null : options.fill || 'red';

	        _this.borderWidth = options.borderWidth || 1;

	        _this.type = "rect";

	        _this.body = new _Body2.default(_this.game, _this);
	        return _this;
	    }

	    _createClass(Rect, [{
	        key: 'draw',
	        value: function draw(lag) {
	            if (this.isRender) {

	                if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                    this.context.save();
	                    this.context.globalAlpha = this.objAlfa;
	                }

	                if (this.previousX) {
	                    this.renderX = (this.x - this.previousX) * lag + this.previousX;
	                } else {
	                    this.renderX = this.x;
	                }
	                if (this.previousY) {
	                    this.renderY = (this.y - this.previousY) * lag + this.previousY;
	                } else {
	                    this.renderY = this.y;
	                }

	                this.context.strokeStyle = this.strokeColor;
	                this.context.lineWidth = this.borderWidth;
	                this.context.fillStyle = this.fill;

	                if (this.strokeColor === null) {
	                    this.context.fillRect(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.width * this.scale, this.height * this.scale);
	                } else if (this.fill === null) {
	                    this.context.beginPath();
	                    this.context.rect(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.width * this.scale, this.height * this.scale);
	                    this.context.stroke();
	                    this.context.closePath();
	                } else {
	                    this.context.beginPath();
	                    this.context.rect(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.width * this.scale, this.height * this.scale);
	                    this.context.stroke();
	                    this.context.fill();
	                    this.context.closePath();
	                }

	                if (this.objAlfa !== 1) {
	                    this.context.restore();
	                }

	                this.fadeInHandler();
	                this.fadeOutHandler();
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.body.worldBounce();
	            this.body.scaleUpDownHandler();
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();

	            this.x = this.x + dt * this.body.velocity.x;
	            this.y = this.y + dt * this.body.velocity.y;
	        }
	    }, {
	        key: 'setBorderWidth',
	        value: function setBorderWidth(width) {
	            this.borderWidth = width;
	        }

	        // moveByLine(_mouseX, _mouseY, _speed, _maxDistance, _callback) {
	        //     if (!_mouseX || !_mouseY) {
	        //         return false;
	        //     }
	        //     let dx = (_mouseX - this.x - this.halfWidth);
	        //     let dy = (_mouseY - this.y - this.halfHeight);
	        //     let distance = Math.sqrt(dx * dx + dy * dy);
	        //     let maxDistance = _maxDistance || 4;
	        //     let speed = _speed || 4;
	        //     this.body.angle = Math.atan2(dy, dx) * (180 / Math.PI);
	        //     //this.body.rotate(this.body.angle / (180 / Math.PI));

	        //     if (distance > maxDistance) {
	        //         // if (Math.abs(dx) > 1 && Math.abs(dy) > 1) {

	        //         this.body.velocity.x = Math.cos(this.body.angle / (180 / Math.PI)) * speed;
	        //         this.body.velocity.y = Math.sin(this.body.angle / (180 / Math.PI)) * speed;
	        //         //}
	        //     } else {
	        //         this.body.velocity.x = 0;//Math.cos(angle) * speed;
	        //         this.body.velocity.y = 0;//Math.sin(angle) * speed;
	        //         if (typeof _callback === 'function') {
	        //             this._callback.call(this.game, this);
	        //         }
	        //     }
	        // }

	        // moveToPoint(x, y, speed, callback) {
	        //     //if(!this.moveTo){
	        //     this.positionToMoveX = Math.floor(x);
	        //     this.positionToMoveY = Math.floor(y);
	        //     this.positionSpeed = speed;
	        //     this.oldVelocityX = this.body.velocity.x;
	        //     this.oldVelocityY = this.body.velocity.y;
	        //     this.oldUseCollision = this.useCollision;
	        //     this.useCollision = false;
	        //     this.moveTo = true;

	        //     this.positionCallback = callback;
	        //     //}
	        // }

	        // moveToPointHandler() {
	        //     if (this.moveTo) {
	        //         this.myX = Math.floor(this.x);
	        //         this.myY = Math.floor(this.y);

	        //         if (this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY)) {
	        //             this.x -= (((this.myX - this.positionToMoveX) / this.positionSpeed));
	        //             this.y -= (((this.myY - this.positionToMoveY) / this.positionSpeed));
	        //             this.body.velocity.x = 0;
	        //             this.body.velocity.y = 0;

	        //         } else if (this.moveTo) {
	        //             this.body.velocity.x = this.oldVelocityX;
	        //             this.body.velocity.y = this.oldVelocityY;
	        //             this.useCollision = this.oldUseCollision;
	        //             this.x = Math.floor(this.x)
	        //             this.y = Math.floor(this.y)
	        //             this.moveTo = false;

	        //             if (typeof this.positionCallback === 'function') {
	        //                 this.positionCallback.call(this.game, this);
	        //             }
	        //         }
	        //     }
	        // }

	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Rect;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Rect;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Text = function (_ObjectSettings2) {
	    _inherits(Text, _ObjectSettings2);

	    function Text(game, options) {
	        _classCallCheck(this, Text);

	        var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, game, options));

	        _this.type = "text";

	        _this.body = new _Body2.default(_this.game, _this);

	        _this.fontSize = options.fontSize || 36;

	        _this.color = options.color || 'black';

	        _this.text = options.text || 'Text';

	        _this.fontType = options.fontType || "Forte";

	        _this.useCollision = options.useCollision === undefined || !options.useCollision ? false : true;

	        _this.asImage = options.asImage || false;

	        _this.context.font = _this.fontSize + "px " + _this.fontType;

	        _this.textSize = _this.context.measureText(_this.text);

	        _this.width = _this.textSize.width;

	        _this.height = _this.fontSize;

	        _this.halfWidth = _this.textSize.width / 2;

	        _this.halfHeight = _this.fontSize / 2;

	        _this.useStroke = options.useStroke || false;

	        _this.strokeColor = options.strokeColor || '#333';

	        _this.strokeWidth = options.strokeWidth || 2;

	        if (_this.asImage) {
	            _this.generate();
	        }
	        return _this;
	    }

	    _createClass(Text, [{
	        key: 'generate',
	        value: function generate() {
	            var ctx = document.createElement("canvas").getContext("2d");
	            ctx.canvas.width = this.width;
	            ctx.canvas.height = this.height;

	            ctx.font = this.fontSize + "px " + this.fontType;
	            ctx.fillStyle = this.color;
	            ctx.fillText(this.text, 0, this.height / 1.27);

	            if (this.useStroke) {
	                ctx.lineWidth = this.strokeWidth;
	                ctx.strokeStyle = this.strokeColor;
	                ctx.strokeText(this.text, 0, this.height / 1.27);
	            }

	            this.cloneText = ctx.canvas;
	            ctx = null;
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();
	            // this.doInTimeHandler();
	        }
	    }, {
	        key: 'draw',
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = (this.x - this.previousX) * dt + this.previousX;
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = (this.y - this.previousY) * dt + this.previousY;
	            } else {
	                this.renderY = this.y;
	            }

	            if (this.asImage) {
	                this.context.drawImage(this.cloneText, 0, //Math.floor(this.renderX), // + (this.game.camera.lerpAmount * dt)
	                0, //Math.floor(this.renderY), // + (this.game.camera.lerpAmount * dt)
	                this.width, this.height, this.renderX - (!this.static ? this.game.camera.xScroll : 0) * this.body.scale, this.renderY - (!this.static ? this.game.camera.yScroll : 0) * this.body.scale, this.width * this.body.scale, this.height * this.body.scale);
	            } else {
	                this.context.font = this.fontSize + "px " + this.fontType;
	                this.context.fillStyle = this.color;
	                this.context.fillText(this.text, this.x, this.y);
	                if (this.useStroke) {
	                    this.context.lineWidth = this.strokeWidth;
	                    this.context.strokeStyle = this.strokeColor;
	                    this.context.strokeText(this.text, this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0));
	                }
	            }

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'redraw',
	        value: function redraw() {
	            this.context.fillStyle = this.color;
	            this.context.font = this.fontSize + "px " + this.fontType;
	            this.context.fillText(this.text, this.x, this.y);
	        }
	    }, {
	        key: 'add',
	        value: function add(count) {
	            this.text += count;
	        }
	    }, {
	        key: 'rem',
	        value: function rem(count) {
	            this.text -= count;
	        }
	    }, {
	        key: 'use',
	        value: function use(count) {
	            this.text = count;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            return this.text;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'height' || key === 'width' || key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Text;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Text;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Button = function (_ObjectSettings2) {
	    _inherits(Button, _ObjectSettings2);

	    function Button(game, options) {
	        _classCallCheck(this, Button);

	        var _this = _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, game, options));

	        _this.type = "button";

	        _this.fontSize = options.fontSize || 42;
	        _this.fillStyle = options.fillStyle || 'black';
	        _this.fillStyleHover = options.fillStyleHover || '#666';
	        _this.strokeStyle = options.strokeStyle || null;
	        _this.strokeStyleHover = options.strokeStyleHover || null;
	        _this.textColor = options.textColor || 'white';
	        _this.textColorHover = options.textColorHover || 'white';
	        _this.borderWidth = options.borderWidth || 2;

	        _this.textMarginX = options.textMarginX || 0;
	        _this.textMarginY = options.textMarginY || 0;

	        _this.clickHold = options.clickHold || false;

	        _this.useCollision = options.useCollision || false;

	        _this.updateOfScreen = options.updateOfScreen || false;

	        _this.text = options.text || 'button';
	        _this.action = options.action || _this.defaultClick;
	        return _this;
	    }

	    _createClass(Button, [{
	        key: 'defaultClick',
	        value: function defaultClick() {
	            console.error("Do wlasciwosci 'action' przypisz funkcje jaka ma sie wykonac po kliknieciu");
	        }

	        // constructor(game, text, x, y, width, height, background, backgroundHover, strokeStyle, strokeStyleHover, textColor, action) {
	        //     super();

	        //     this.initializeGlobalSettings({
	        //         game: game,
	        //         pooled: false,
	        //         context: 'main',
	        //         x: x || 1,
	        //         y: y || 1,
	        //         key: null,
	        //         width: width,
	        //         height: height
	        //     });

	        //     this.fontSize = 42;
	        //     this.fillStyle = background;
	        //     this.fillStyleHover = backgroundHover;
	        //     this.strokeStyle = strokeStyle;
	        //     this.strokeStyleHover = strokeStyleHover;
	        //     this.textColor = textColor;
	        //     this.borderWidth = 2;

	        //     this.textMarginX = 0;
	        //     this.textMarginY = 0

	        //     this.clickHold = false;

	        //     this.text = text;
	        //     this.action = action;
	        //     this.zIndex = 5;

	        //     this.colors = ["#FFABAB", "#FFDAAB", "#DDFFAB", "#ABE4FF", "#D9ABFF"];
	        // }

	    }, {
	        key: 'update',
	        value: function update() {
	            var _this2 = this;

	            this.game.mouse.trigger(this, !this.static ? false : true, function () {
	                if (typeof _this2.action === 'function') {
	                    _this2.action.call(_this2.game, _this2);
	                }
	            }, this.clickHold);

	            this.game.mouse.onHover(this, !this.static ? false : true, null);
	        }
	    }, {
	        key: 'draw',
	        value: function draw() {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.hovered) {
	                this.context.fillStyle = this.backgroundHover;
	                this.fillCol = this.fillStyleHover ? this.fillStyleHover : 'transparent';
	                this.strokeCol = this.strokeStyleHover;
	                this.textCol = this.textColorHover;
	            } else {
	                this.context.fillStyle = this.background;
	                this.fillCol = this.fillStyle ? this.fillStyle : 'transparent';
	                this.strokeCol = this.strokeStyle;
	                this.textCol = this.textColor;
	            }

	            //draw button
	            this.context.strokeStyle = this.strokeCol;
	            this.context.fillStyle = this.fillCol;

	            if (this.strokeStyle === null) {
	                this.context.fillRect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	            } else if (this.fillStyle === null && this.fillStyleHover === null) {
	                this.context.beginPath();
	                this.context.rect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	                this.context.lineWidth = this.borderWidth;
	                this.context.stroke();
	                this.context.closePath();
	            } else {
	                this.context.beginPath();
	                this.context.rect(this.x - (!this.static ? this.game.camera.xScroll : 0), this.y - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	                this.context.lineWidth = this.borderWidth;
	                this.context.stroke();
	                this.context.fill();
	                this.context.closePath();
	            }
	            //text options
	            this.context.fillStyle = this.textCol;
	            this.context.font = this.fontSize + "px Forte";
	            this.textSize = this.context.measureText(this.text);
	            //text position
	            var textX = this.x - (!this.static ? this.game.camera.xScroll : 0) + this.width / 2 - this.textSize.width / 2;
	            var textY = this.y - (!this.static ? this.game.camera.yScroll : 0) + this.height - this.height / 4;

	            //draw the text
	            this.context.fillText(this.text, textX + this.textMarginX, textY + this.textMarginY);
	            // this.context.fillText(this.text, textX - this.game.camera.xScroll, textY - this.game.camera.yScroll);
	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }

	            this.fadeInHandler();
	            this.fadeOutHandler();
	        }
	    }, {
	        key: 'add',
	        value: function add(count) {
	            this.text += count;
	        }
	    }, {
	        key: 'rem',
	        value: function rem(count) {
	            this.text -= count;
	        }
	    }, {
	        key: 'use',
	        value: function use(count) {
	            this.text = count;
	        }
	    }, {
	        key: 'get',
	        value: function get() {
	            return this.text;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale' || key === 'clickHold') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Button;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Button;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Bar = function (_ObjectSettings2) {
	    _inherits(Bar, _ObjectSettings2);

	    function Bar(game, options) {
	        _classCallCheck(this, Bar);

	        var _this = _possibleConstructorReturn(this, (Bar.__proto__ || Object.getPrototypeOf(Bar)).call(this, game, options));

	        if (options.max === undefined || options.min === undefined) {
	            throw "Wymagane wlasciwości to 'min' i 'max'! dla Classy: " + _this.constructor.name;
	        }

	        _this.type = "bar";

	        _this.max = options.max;
	        _this.min = options.min > _this.max ? _this.error() : options.min;

	        _this.currentStatusX = _this.min;

	        _this.statusX = _this.currentStatusX / _this.max * _this.width;

	        _this.lineWidth = 1;
	        _this.currentTimer = 0;

	        _this.strokeStyle = options.stroke || 'black';
	        _this.fillStyle = options.fill || 'green';

	        _this.useCollision = options.useCollision || false;
	        return _this;
	    }

	    _createClass(Bar, [{
	        key: "draw",
	        value: function draw(lag) {
	            if (this.objAlfa !== 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            if (this.previousX) {
	                this.renderX = (this.x - this.previousX) * lag + this.previousX;
	            } else {
	                this.renderX = this.x;
	            }
	            if (this.previousY) {
	                this.renderY = (this.y - this.previousY) * lag + this.previousY;
	            } else {
	                this.renderY = this.y;
	            }

	            this.context.fillStyle = this.fillStyle;

	            if (this.strokeStyle) {
	                this.context.beginPath();
	                this.context.strokeStyle = this.strokeStyle;
	                this.context.lineWidth = this.lineWidth;

	                this.context.rect(this.renderX - (!this.static ? this.game.camera.xScroll : 0), this.renderY - (!this.static ? this.game.camera.yScroll : 0), this.width, this.height);
	                this.context.stroke();
	                //this.context.fill();
	                this.context.closePath();
	            }
	            if (this.fillStyle) {
	                this.context.fillRect(this.renderX + this.lineWidth - (!this.static ? this.game.camera.xScroll : 0), this.renderY + this.lineWidth - (!this.static ? this.game.camera.yScroll : 0), this.statusX - this.lineWidth * 2 <= 0 ? 0 : this.statusX - this.lineWidth * 2, this.height - this.lineWidth * 2);
	            }

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }
	        }
	    }, {
	        key: "add",
	        value: function add(count) {
	            if (this.currentStatusX + count < this.max) {
	                this.currentStatusX = this.currentStatusX + count;
	            } else {
	                this.currentStatusX = this.max;
	            }

	            this.setStatusX(this.currentStatusX);
	        }
	    }, {
	        key: "timeAdd",
	        value: function timeAdd(time) {
	            if (this.currentStatusX < this.max) {
	                this.currentTimer += 1 / 60 * 1000;
	                this.currentStatusX = this.currentTimer / time;
	            } else {
	                this.currentStatusX = this.max;
	            }

	            this.setStatusX(this.currentStatusX);
	        }
	    }, {
	        key: "rem",
	        value: function rem(count) {
	            if (this.currentStatusX - count > 0) {
	                this.currentStatusX = this.currentStatusX - count;
	            } else {
	                this.currentStatusX = 0;
	            }

	            this.setStatusX(this.currentStatusX);
	        }
	    }, {
	        key: "setStatusX",
	        value: function setStatusX(statusX) {
	            this.statusX = statusX / this.max * this.width;
	        }
	    }, {
	        key: "getValue",
	        value: function getValue() {
	            return this.currentStatusX;
	        }
	    }, {
	        key: "error",
	        value: function error() {
	            throw "Minimalna wartosc nie moze byc wieksza od maksymalnej";
	        }
	    }, {
	        key: "getProps",
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Bar;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Bar;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _class, _temp;

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Rectangle = __webpack_require__(16);

	var _Rectangle2 = _interopRequireDefault(_Rectangle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Camera = (_temp = _class = function (_ObjectSettings2) {
	    _inherits(Camera, _ObjectSettings2);

	    function Camera(game, options) {
	        _classCallCheck(this, Camera);

	        var _this = _possibleConstructorReturn(this, (Camera.__proto__ || Object.getPrototypeOf(Camera)).call(this, game, options));

	        if (!options.followed) {
	            throw "Wymagane wlasciwosci przy tworzeniu: " + _this.constructor.name + " to: \n'followed' -> obiekt śledzony \n";
	        }

	        _this.type = "camera";

	        _this.static = true;

	        _this.xScroll = options.xView || 0;
	        _this.yScroll = options.yView || 0;

	        _this.xDeadZone = 0; // min distance to horizontal borders
	        _this.yDeadZone = 0; // min distance to vertical borders

	        _this.wView = _this.game.width;
	        _this.hView = _this.game.height;

	        _this.axis = Camera.AXIS.BOTH;

	        _this.followed = options.followed;

	        _this.worldWidth = _this.game.width;

	        _this.worldHeight = _this.game.height;

	        _this.follow(_this.followed);

	        _this.viewportRect = new _Rectangle2.default(_this.xScroll, _this.yScroll, _this.wView, _this.hView);

	        _this.worldRect = new _Rectangle2.default(0, -32 * 5, _this.worldWidth, _this.worldHeight);
	        return _this;
	    }

	    _createClass(Camera, [{
	        key: 'update',
	        value: function update(dt) {
	            this.moveToPointHandler();
	            if (this.followed != null) {
	                if (this.axis === Camera.AXIS.HORIZONTAL || this.axis === Camera.AXIS.BOTH) {
	                    // moves camera on horizontal axis based on followed object position
	                    if (this.followed.renderX - this.xScroll + this.xDeadZone > this.wView) this.xScroll = this.followed.x - (this.wView - this.xDeadZone);else if (this.followed.renderX - this.xDeadZone < this.xScroll) this.xScroll = this.followed.x - this.xDeadZone;
	                }

	                if (this.axis === Camera.AXIS.VERTICAL || this.axis === Camera.AXIS.BOTH) {
	                    // moves camera on vertical axis based on followed object position
	                    if (this.followed.renderY - this.yScroll + this.yDeadZone > this.hView) this.yScroll = this.followed.y + this.followed.halfHeight - (this.hView - this.yDeadZone);else if (this.followed.renderY - this.yDeadZone < this.yScroll) this.yScroll = this.followed.y + this.followed.halfHeight - this.yDeadZone;
	                }
	            }

	            this.viewportRect.set(this.xScroll, this.yScroll);

	            if (!this.viewportRect.within(this.worldRect)) {
	                if (this.viewportRect.left < this.worldRect.left) {
	                    this.xScroll = this.worldRect.left;
	                }
	                // if(this.viewportRect.top < this.worldRect.top)					
	                //     this.yScroll = this.worldRect.top;
	                if (this.xScroll >= this.game.portViewWidth - this.game.width + 20) {
	                    this.xScroll = this.game.portViewWidth - this.game.width + 20;
	                }
	                if (this.yScroll < -20) this.yScroll = -20;
	                if (this.yScroll > this.game.portViewHeight - this.game.height + 20) this.yScroll = this.game.portViewHeight - this.game.height + 20;
	            }
	            this.game.physic.outOfScreen(this.game.gameObjects);
	        }
	    }, {
	        key: 'follow',
	        value: function follow(sprite, xDeadZone, yDeadZone) {
	            this.followed = sprite;
	            this.xDeadZone = xDeadZone === undefined ? this.game.width / 2 : xDeadZone;
	            this.yDeadZone = yDeadZone === undefined ? this.game.height / 2 : yDeadZone;
	        }
	    }, {
	        key: 'moveToPoint',
	        value: function moveToPoint(x, y, speed, callback) {
	            this.positionToMoveX = Math.floor(x);
	            this.positionToMoveY = Math.floor(y);
	            this.positionSpeed = speed;
	            this.followed = null;
	            this.moveTo = true;

	            this.positionCallback = callback;
	        }
	    }, {
	        key: 'moveToPointHandler',
	        value: function moveToPointHandler() {
	            if (this.moveTo) {
	                this.myX = Math.floor(this.xScroll + this.wView / 2);
	                this.myY = Math.floor(this.yScroll + this.hView / 2);

	                if (this.moveTo && (this.myX != this.positionToMoveX || this.myY != this.positionToMoveY)) {
	                    this.xScroll -= (this.myX - this.positionToMoveX) / this.positionSpeed;
	                    this.yScroll -= (this.myY - this.positionToMoveY) / this.positionSpeed;
	                } else if (this.moveTo) {
	                    this.xScroll = Math.floor(this.xScroll);
	                    this.yScroll = Math.floor(this.yScroll);
	                    this.moveTo = false;

	                    if (typeof this.positionCallback === 'function') {
	                        this.positionCallback.call(this.game, this);
	                    }
	                }

	                if (!this.viewportRect.within(this.worldRect)) {
	                    if (this.xScroll <= 0) this.positionToMoveX = this.myX;
	                    // if(this.viewportRect.top < this.worldRect.top)					
	                    //     this.yScroll = this.worldRect.top;
	                    // if(this.xScroll >= this.game.portViewWidth-this.game.width )
	                    //      this.positionToMoveX = this.myX
	                    if (this.yScroll < 0) this.positionToMoveY = this.myY;
	                    if (this.yScroll > this.game.portViewHeight - this.game.height) this.positionToMoveY = this.myY;
	                }
	            }
	        }
	    }]);

	    return Camera;
	}(_ObjectSettings4.default), _class.AXIS = {
	    NONE: "none",
	    HORIZONTAL: "horizontal",
	    VERTICAL: "vertical",
	    BOTH: "both"
	}, _temp);
	;

	exports.default = Camera;

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Rectangle = function () {
	    function Rectangle(game, left, top, width, height) {
	        _classCallCheck(this, Rectangle);

	        this.left = left || 0;
	        this.top = top || 0;
	        this.width = width || 0;
	        this.height = height || 0;
	        this.right = this.left + this.width;
	        this.bottom = this.top + this.height;
	    }

	    _createClass(Rectangle, [{
	        key: "set",
	        value: function set(left, top, /*optional*/width, /*optional*/height) {
	            this.left = left;
	            this.top = top;
	            this.width = width || this.width;
	            this.height = height || this.height;
	            this.right = this.left + this.width;
	            this.bottom = this.top + this.height;
	        }
	    }, {
	        key: "within",
	        value: function within(r) {
	            return r.left <= this.left && r.right >= this.right && r.top <= this.top && r.bottom >= this.bottom;
	        }
	    }, {
	        key: "overlaps",
	        value: function overlaps(r) {
	            return this.left < r.right && r.left < this.right && this.top < r.bottom && r.top < this.bottom;
	        }
	    }]);

	    return Rectangle;
	}();

	;

	exports.default = Rectangle;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dialog = function (_ObjectSettings2) {
	    _inherits(Dialog, _ObjectSettings2);

	    function Dialog(game, options) {
	        _classCallCheck(this, Dialog);

	        var _this = _possibleConstructorReturn(this, (Dialog.__proto__ || Object.getPrototypeOf(Dialog)).call(this, game, options));

	        _this.onClose = function () {
	            _this.hideDialog();
	        };

	        if (!options.x || !options.y || !options.width || !options.height) {
	            throw "Wymagane jest podanie: \n 'x'\n 'y'\n  'width'\n 'height'\n przy tworzeniu: " + _this.constructor.name;
	        }

	        _this.close = options.close || false;

	        _this.objs = [];

	        _this.type = "dialog";

	        _this.toggleTime = 400;

	        _this.objs.push(_this);

	        _this.objs.push(_this.game.add.rect(options));

	        if (_this.close) {
	            _this.objs.push(_this.game.add.button({
	                x: _this.x + _this.width - 50,
	                y: _this.y,
	                width: 50,
	                height: 50,
	                text: 'X',
	                textColor: 'black',
	                textColorHover: 'red',
	                fillStyle: 'transparent',
	                fillStyleHover: 'transparent',
	                action: _this.onClose,
	                static: _this.static
	            }));
	        }
	        return _this;
	    }

	    _createClass(Dialog, [{
	        key: "draw",
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.game.ctx.globalAlpha === 1) {
	                this.game.ctx.save();
	                this.game.ctx.globalAlpha = this.objAlfa;
	            }

	            if (this.objAlfa !== 1) {
	                this.game.ctx.restore();
	            }

	            // this.fadeInHandler();
	            // this.fadeOutHandler();
	        }
	    }, {
	        key: "add",
	        value: function add(type) {
	            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	            options.x = this.x + (options.x || 0);
	            options.y = this.y + (options.y || 0);
	            var obj = this.game.add[type](options);

	            this.objs.push();

	            return this;
	        }
	    }, {
	        key: "getProps",
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale' || key === 'onClose' || key === 'objs') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }, {
	        key: "hideDialog",
	        value: function hideDialog() {
	            var _this2 = this;

	            this.objs.reverse().forEach(function (obj) {
	                obj.fadeOut(_this2.toggleTime, function () {
	                    //obj.destroy();
	                    obj.used = false;
	                    console.log(_this2.game.gameObjects);
	                });
	            });
	            return this;
	        }
	    }, {
	        key: "showDialog",
	        value: function showDialog() {
	            var _this3 = this;

	            this.objs.forEach(function (obj) {
	                obj.used = true;
	                obj.fadeIn(_this3.toggleTime);
	            });
	            return this;
	        }
	    }]);

	    return Dialog;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;
	// constructor(game, context, x, y, width, height, strokeColor, fillColor) {
	//     super();

	//     this.initializeGlobalSettings({
	//         game: game,
	//         pooled: false,
	//         context: context || 'main',
	//         x: x || 1,
	//         y: y || 1,
	//         key: null,
	//         width: width,
	//         height: height
	//     });

	//     this.objAlfa = 0;
	//     this.toggleTime = 1000;

	//     this.obj = [];

	//     this.zIndex = 10;
	//     this.strokeColor = strokeColor;
	//     this.fillColor = fillColor;

	//     this.border = this.game.add.rect('main', this.x, this.y, this.currentWidth, this.currentHeight, this.strokeColor, this.fillColor);
	//     this.border.static = true;
	//     this.border.objAlfa = 0;
	//     this.border.zIndex = 10;

	//     this.button1 = this.game.add.button('Menu', this.x + 110, this.y + this.currentHeight - 80, 180, 60, null, null, 'black', 'green', '#333', () => this.buttonDefaultAction());
	//     this.button1.static = true;
	//     this.button1.objAlfa = 0;
	//     this.button1.zIndex = 11;

	//     this.button2 = this.game.add.button('Ok', this.x + this.currentWidth - 290, this.y + this.currentHeight - 80, 180, 60, null, null, 'black', 'green', '#333', () => this.buttonDefaultAction());
	//     this.button2.static = true;
	//     this.button2.objAlfa = 0;
	//     this.button2.zIndex = 11;

	//     this.headline = this.game.add.text('main', 'Jestem tytułem', this.x + 200, this.y + 60, 44, '#333', null);
	//     this.headline.static = true;
	//     this.headline.objAlfa = 0;
	//     this.headline.zIndex = 11;
	// }

	// draw(dt) {
	//     if (this.objAlfa < 1.1 && this.game.ctx.globalAlpha === 1) {
	//         this.border.objAlfa = this.objAlfa;
	//         this.button1.objAlfa = this.objAlfa;
	//         this.button2.objAlfa = this.objAlfa;
	//         this.headline.objAlfa = this.objAlfa;
	//         if (this.closeButton) {
	//             this.closeButton.objAlfa = this.objAlfa;
	//         }
	//         for (var i = 0; i < this.obj.length; i++) {
	//             this.obj[i].objAlfa = this.objAlfa;
	//         }
	//         this.objAlfa = 1.1

	//         this.fadeInHandler();
	//     }

	//     this.fadeOutHandler();
	// }

	// toggle(bool) {
	//     if (!bool) {
	//         this.border.used = false;
	//         this.button1.used = false;
	//         this.button2.used = false;
	//     } else {
	//         this.border.used = true;
	//         this.button1.used = true;
	//         this.button2.used = true;
	//     }
	// }

	// buttonDefaultAction() {
	//     alert('dodaj akcje do tego przycisku przy konfiguracji. action: function')
	// }

	// configure(options = {}) {
	//     this.toggleTime = options.toggleTime || 400;


	//     //let alfa = options.alfa || 1;
	//     let borderWidth = options.borderWidth || 1;
	//     this.used = options.used === false ? false : true;
	//     this.toggle(this.used);
	//     this.main = options.main || null;


	//     if (options.close) {
	//         this.closeButton = this.game.add.button('X', this.x + this.currentWidth - 45, this.y, 45, 45, null, 'red', 'black', 'black', '#333', () => this.close());
	//         this.closeButton.static = true;
	//         this.closeButton.objAlfa = 0;
	//         this.closeButton.zIndex = 11;

	//     }

	//     this.fadeIn(this.toggleTime, () => {

	//     })

	//     if (options.button1) {
	//         this.button1.text = options.button1.text || 'Menu';
	//         this.button1.currentWidth = options.button1.width || 180;
	//         this.button1.currentHeight = options.button1.height || 60;
	//         this.button1.strokeStyle = options.button1.strokeColor || '#333';
	//         this.button1.strokeStyleHover = options.button1.strokeColorHover || 'green';
	//         this.button1.fillStyle = options.button1.fillColor || null;
	//         this.button1.fillStyleHover = options.button1.fillColorHover || null;
	//         this.button1.textColor = options.button1.textColor || '#333';
	//         this.button1.borderWidth = options.button1.borderWidth || 2;
	//         this.button1.action = options.button1.action || this.buttonDefaultAction;
	//         this.button1.used = options.button1.used === false ? false : true;
	//     }
	//     if (options.button2) {
	//         this.button2.text = options.button2.text || 'Menu';
	//         this.button2.currentWidth = options.button2.width || 180;
	//         this.button2.currentHeight = options.button2.height || 60;
	//         this.button2.strokeStyle = options.button2.strokeColor || '#333';
	//         this.button2.strokeStyleHover = options.button2.strokeColorHover || 'green';
	//         this.button2.fillStyle = options.button2.fillColor || null;
	//         this.button2.fillStyleHover = options.button2.fillColorHover || null;
	//         this.button2.textColor = options.button2.textColor || '#333';
	//         this.button2.borderWidth = options.button2.borderWidth || 2;
	//         this.button2.action = options.button2.action || this.buttonDefaultAction;
	//         this.button2.used = options.button2.used === false ? false : true;
	//     }
	//     if (options.headline) {
	//         this.headline.text = options.headline.text || 'Jestem tytułem';
	//         this.headline.x = this.x + options.headline.x || this.x + 200;
	//         this.headline.y = this.y + options.headline.y || this.y + 60;
	//         this.headline.size = options.headline.size || 42;
	//         this.headline.color = options.headline.color || '#333';
	//     }
	//     this.border.setBorderWidth(borderWidth);
	//     //this.border.setAlfa(alfa);

	//     if (this.main) {
	//         this.main.call(this, this);
	//     }
	// }

	// add(obj) {
	//     if (typeof obj !== 'object') {
	//         return console.error('oczekiwano obiektu!');
	//     } else {
	//         this.obj.push(obj);
	//     }
	// }

	// close() {
	//     this.fadeOut(this.toggleTime, () => {
	//         this.destroy();
	//         this.border.destroy();
	//         this.button1.destroy();
	//         this.button2.destroy();
	//         if (this.closeButton) {
	//             this.closeButton.destroy();
	//         }
	//         this.headline.destroy();

	//         for (var i = 0; i < this.obj.length; i++) {
	//             this.obj[i].destroy();
	//         }
	//         this.obj = [];
	//     })
	// }

	exports.default = Dialog;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _DoublyLinkedList = __webpack_require__(19);

	var _DoublyLinkedList2 = _interopRequireDefault(_DoublyLinkedList);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Group = function () {
	    function Group(game) {
	        _classCallCheck(this, Group);

	        this.game = game;
	        this.entities = [];
	        this.indexes = new _DoublyLinkedList2.default();
	    }

	    _createClass(Group, [{
	        key: 'add',
	        value: function add(object, hide) {
	            this.entities.push(object);
	            this.indexes.append(this.entities.length - 1);

	            object.groupIndex = this.entities.length - 1;

	            if (hide) {
	                object.hide();
	            }
	        }
	    }, {
	        key: 'spawn',
	        value: function spawn() {
	            if (this.indexes.view() !== 'list is empty') {
	                var index = this.indexes.viewAt(0);
	                var entity = this.entities[index];

	                if (entity) {
	                    entity.show();

	                    this.indexes.removeAt(0);
	                    return entity;
	                } else {
	                    return false;
	                }
	            }
	        }
	    }, {
	        key: 'recycle',
	        value: function recycle(object) {
	            object.hide();
	            this.indexes.append(object.groupIndex);
	        }
	    }]);

	    return Group;
	}();

	;

	exports.default = Group;

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DoublyLinkedList = function () {
	    function DoublyLinkedList() {
	        _classCallCheck(this, DoublyLinkedList);

	        this.size = 0;
	        this.head = null;
	        this.tail = null;
	    }

	    _createClass(DoublyLinkedList, [{
	        key: 'node',
	        value: function node(element) {
	            this.element = element;
	            this.next = null;
	            this.prev = null;
	        }
	    }, {
	        key: 'view',
	        value: function view() {
	            var current = this.head;
	            var string = '';

	            while (current) {
	                string += current.element + ", ";
	                current = current.next;
	            }
	            if (string === '') {
	                return "list is empty";
	            } else {
	                return string;
	            }
	        }
	    }, {
	        key: 'append',
	        value: function append(element) {
	            var node = new this.node(element);

	            if (this.size === 0) {
	                this.head = node;
	                this.tail = node;
	            } else {
	                this.tail.next = node;
	                node.prev = this.tail;
	                this.tail = node;
	            }
	            this.size++;
	        }
	    }, {
	        key: 'viewAt',
	        value: function viewAt(position) {
	            if (position >= 0 && position <= this.size) {
	                var current = this.head;
	                var index = 0;
	                while (position > index) {
	                    current = current.next;
	                    index++;
	                }
	                return current.element;
	            } else {
	                return "no such position on list";
	            }
	        }
	    }, {
	        key: 'insertAt',
	        value: function insertAt(position, element) {
	            var node = new this.node(element);
	            var current = this.head;
	            var index = 0;
	            var previous = void 0;
	            if (position >= 0 && position <= this.size) {
	                if (position === 0) {
	                    if (this.size === 0) {
	                        this.head = node;
	                        this.tail = node;
	                    } else {
	                        node.next = this.head;
	                        this.head.prev = node;
	                        this.head = node;
	                    }
	                } else if (position === this.size) {
	                    this.tail.next = node;
	                    node.prev = this.tail;
	                    this.tail = node;
	                } else {
	                    while (index < position) {
	                        previous = current;
	                        current = current.next;
	                        index++;
	                    }
	                    node.next = current;
	                    previous.next = node;
	                    node.prev = previous;
	                    current.prev = node;
	                }
	                this.size++;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'removeAt',
	        value: function removeAt(position) {
	            if (position >= 0 && position <= this.size) {
	                var current = this.head;
	                var index = 0;
	                var previous = void 0;
	                if (position === 0) {
	                    if (this.size === 1) {
	                        this.head = null;
	                        this.tail = null;
	                    } else {
	                        this.head = current.next;
	                        this.head.prev = null;
	                    }
	                } else if (position === this.size - 1) {
	                    current = this.tail;
	                    this.tail = current.prev;
	                    this.tail.next = null;
	                } else {
	                    while (index < position) {
	                        previous = current;
	                        current = current.next;
	                        index++;
	                    }
	                    previous.next = current.next;
	                    current.next.prev = previous;
	                }
	                this.size--;
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'viewReverse',
	        value: function viewReverse() {
	            var current = this.tail;
	            var returnString = '';
	            if (this.size != 0) {
	                while (current) {
	                    returnString += current.element + ", ";
	                    current = current.prev;
	                }
	                return returnString;
	            } else {
	                return "this list is empty";
	            }
	        }
	    }]);

	    return DoublyLinkedList;
	}();

	;

	exports.default = DoublyLinkedList;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Point = function (_ObjectSettings2) {
	    _inherits(Point, _ObjectSettings2);

	    function Point(game, options) {
	        _classCallCheck(this, Point);

	        var _this = _possibleConstructorReturn(this, (Point.__proto__ || Object.getPrototypeOf(Point)).call(this, game, options));

	        if (!options.element) {
	            var _ret;

	            return _ret = console.error('Musi zostac przekazany element np sprite, image itd.: ' + _this.constructor.name), _possibleConstructorReturn(_this, _ret);
	        }

	        _this.type = "point";
	        _this.body = new _Body2.default(_this.game, _this);

	        _this.element = options.element;
	        _this.diffX = options.diffX || 0;
	        _this.diffY = options.diffY || 0;
	        _this.width = options.width || 5;
	        _this.height = options.height || 5;
	        _this.halfWidth = _this.width / 2;
	        _this.halfHeight = _this.height / 2;
	        _this.isRender = options.isRender === false ? false : true;
	        return _this;
	    }

	    _createClass(Point, [{
	        key: 'draw',
	        value: function draw(dt) {
	            if (this.isRender) {
	                if (this.objAlfa !== 1 && this.game.ctx.globalAlpha === 1) {
	                    this.game.ctx.save();
	                    this.game.ctx.globalAlpha = this.objAlfa;
	                }

	                if (this.previousX) {
	                    this.renderX = Math.floor((this.x - this.previousX) * dt + this.previousX); //this.x + (this.body.velocity.x * dt);                 
	                } else {
	                    this.renderX = this.x;
	                }
	                if (this.previousY) {
	                    this.renderY = Math.floor((this.y - this.previousY) * dt + this.previousY); //this.y + (this.body.velocity.y * dt);
	                } else {
	                    this.renderY = this.y;
	                }

	                this.context.fillStyle = 'black';
	                this.context.fillRect(this.renderX - (!this.static ? Math.floor(this.game.camera.xScroll) : 0), this.renderY - (!this.static ? Math.floor(this.game.camera.yScroll) : 0), this.width, this.height);

	                if (this.objAlfa !== 1) {
	                    this.game.ctx.restore();
	                }
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update() {
	            var dist = Math.sqrt(this.diffX * this.diffX + this.diffY * this.diffY);
	            // const ca = Math.atan2(this.diffY, this.diffX) * 180 / Math.PI;
	            // const na = ((ca + angle * 180 / Math.PI) % 360) * Math.PI / 180;

	            /// find angle from pivot to corner
	            var ca = Math.atan2(this.diffY, this.diffX);

	            /// get new angle based on old + current delta angle
	            var na = ca + this.element.body.angle;

	            /// get new x and y and round it off to integer
	            this.x = this.element.getCenter().x + dist * Math.cos(na) + 0.5 | 0;
	            this.y = this.element.getCenter().y + dist * Math.sin(na) + 0.5 | 0;
	        }
	    }, {
	        key: 'getPoints',
	        value: function getPoints() {
	            return {
	                x: this.x,
	                y: this.y
	            };
	        }
	    }]);

	    return Point;
	}(_ObjectSettings4.default);

	exports.default = Point;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Circle = function (_ObjectSettings2) {
	    _inherits(Circle, _ObjectSettings2);

	    function Circle(game, options) {
	        _classCallCheck(this, Circle);

	        var _this = _possibleConstructorReturn(this, (Circle.__proto__ || Object.getPrototypeOf(Circle)).call(this, game, options));

	        _this.strokeColor = options.strokeColor || null;

	        _this.fill = options.fill === null ? null : options.fill || null;

	        _this.radius = options.radius || 100;

	        _this.borderWidth = options.borderWidth || 1;

	        _this.type = "circle";

	        _this.body = new _Body2.default(_this.game, _this);
	        return _this;
	    }

	    _createClass(Circle, [{
	        key: 'draw',
	        value: function draw(lag) {
	            if (this.isRender) {

	                if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                    this.context.save();
	                    this.context.globalAlpha = this.objAlfa;
	                }

	                if (this.previousX) {
	                    this.renderX = (this.x - this.previousX) * lag + this.previousX;
	                } else {
	                    this.renderX = this.x;
	                }
	                if (this.previousY) {
	                    this.renderY = (this.y - this.previousY) * lag + this.previousY;
	                } else {
	                    this.renderY = this.y;
	                }

	                this.context.strokeStyle = this.strokeColor;
	                this.context.lineWidth = this.borderWidth;
	                this.context.fillStyle = this.fill;

	                if (this.fill) {
	                    this.context.beginPath();
	                    this.context.arc(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.radius, 0, 2 * Math.PI);
	                    this.context.fill();
	                    this.context.stroke();
	                } else {
	                    this.context.beginPath();
	                    this.context.arc(this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX, this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY, this.radius, 0, 2 * Math.PI);
	                    this.context.stroke();
	                }

	                // if (this.strokeColor === null) {
	                //     this.context.fillRect(
	                //         this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
	                //         this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
	                //         this.width * this.scale,
	                //         this.height * this.scale
	                //     );
	                // } else if (this.fill === null) {
	                //     this.context.beginPath();
	                //     this.context.rect(
	                //         this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
	                //         this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
	                //         this.width * this.scale,
	                //         this.height * this.scale
	                //     );
	                //     this.context.stroke();
	                //     this.context.closePath();
	                // } else {
	                //     this.context.beginPath();
	                //     this.context.rect(
	                //         this.body.angle === 0 ? this.renderX - (!this.static ? this.game.camera.xScroll : 0) : -this.width * this.body.anchorX,
	                //         this.body.angle === 0 ? this.renderY - (!this.static ? this.game.camera.yScroll : 0) : -this.height * this.body.anchorY,
	                //         this.width * this.scale,
	                //         this.height * this.scale
	                //     );
	                //     this.context.stroke();
	                //     this.context.fill();
	                //     this.context.closePath();
	                // }

	                if (this.objAlfa !== 1) {
	                    this.context.restore();
	                }

	                this.fadeInHandler();
	                this.fadeOutHandler();
	            }
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.body.worldBounce();
	            this.body.scaleUpDownHandler();
	            this.useThereAndBack();
	            this.moveToPointEasingHandler();
	            this.moveToPointHandler();

	            this.x = this.x + dt * this.body.velocity.x;
	            this.y = this.y + dt * this.body.velocity.y;
	        }
	    }, {
	        key: 'setBorderWidth',
	        value: function setBorderWidth(width) {
	            this.borderWidth = width;
	        }
	    }, {
	        key: 'getProps',
	        value: function getProps() {
	            var props = superProps.call(this, true);

	            for (var key in this) {
	                if (key === 'key' || key === 'scale') {
	                    delete props[key];
	                }
	            }

	            console.log(props);

	            return this;
	        }
	    }]);

	    return Circle;
	}(_ObjectSettings4.default);

	;

	var superProps = _ObjectSettings4.default.prototype.getProps;

	exports.default = Circle;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	var _Body = __webpack_require__(8);

	var _Body2 = _interopRequireDefault(_Body);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Particles = function (_ObjectSettings2) {
	    _inherits(Particles, _ObjectSettings2);

	    function Particles(game, options) {
	        _classCallCheck(this, Particles);

	        var _this = _possibleConstructorReturn(this, (Particles.__proto__ || Object.getPrototypeOf(Particles)).call(this, game, options));

	        _this.body = new _Body2.default(_this.game, _this);

	        _this.radius = options.radius || 10;

	        _this.zIndex = 7;
	        // this.colors = options.colors || {
	        //     r: this.game.rand(188, 255),
	        //     g: this.game.rand(0, 200),
	        //     b: 0
	        // }
	        _this.colors = options.colors || {
	            r: 0,
	            g: _this.game.rand(140, 180),
	            b: 255
	        };

	        _this.opacity = 1;
	        _this.body.velocity.y = _this.game.rand(100, 120);
	        _this.repeatX = options.x;
	        _this.repeatY = options.y;
	        // //
	        // this.speed = this.options.speed || { x: -3 + Math.random() * 5, y: -4 + Math.random() * 5 };

	        // this.velocity = {
	        //     x: this.speed.x,
	        //     y: this.speed.y
	        // }

	        // //
	        // if (this.options.radius) {
	        //     this.radius = this.game.rand(this.options.radius.min, this.options.radius.max) + this.options.radius.static;
	        // } else {
	        //     this.radius = this.game.rand(0, 10) + 5;
	        // }

	        // //
	        _this.life = options.life || _this.game.rand(10, 40);
	        _this.remaining_life = _this.life;
	        // //

	        // //
	        _this.composite = options.composite || "screen";
	        return _this;
	    }

	    _createClass(Particles, [{
	        key: 'draw',
	        value: function draw() {
	            if (this.objAlfa !== 1) {
	                this.game.ctx.save();
	                this.game.ctx.globalAlpha = this.objAlfa;
	            }
	            // this.game.ctx.globalAlpha = this.game.ctx.globalAlpha === 1 ? this.objAlfa : this.game.ctx.globalAlpha;
	            this.game.ctx.globalCompositeOperation = this.composite;

	            //this.opacity = Math.round(this.remaining_life / this.life * 100) / 100;

	            this.game.ctx.beginPath();

	            var gradient = this.game.ctx.createRadialGradient(this.x - this.game.camera.xScroll, this.y - this.game.camera.yScroll, 0, this.x - this.game.camera.xScroll, this.y - this.game.camera.yScroll, this.radius);
	            gradient.addColorStop(0, "rgba(" + this.colors.r + ", " + this.colors.g + ", " + this.colors.b + ", " + this.opacity + ")");
	            gradient.addColorStop(0.5, "rgba(" + this.colors.r + ", " + this.colors.g + ", " + this.colors.b + ", " + this.opacity + ")");
	            gradient.addColorStop(1, "rgba(" + this.colors.r + ", " + this.colors.g + ", " + this.colors.b + ", 0)");
	            this.game.ctx.fillStyle = gradient;
	            this.game.ctx.arc(this.x - this.game.camera.xScroll, this.y - this.game.camera.yScroll, this.radius, Math.PI * 2, false);
	            this.game.ctx.fill();
	            this.game.ctx.closePath();

	            if (this.objAlfa !== 1) {
	                this.game.ctx.restore();
	            }

	            this.game.ctx.globalCompositeOperation = "source-over";
	        }
	    }, {
	        key: 'cancel',
	        value: function cancel() {
	            this.radius = 2;
	            this.x = this.repeatX;
	            this.y = this.repeatY;
	            this.used = false;
	        }
	    }, {
	        key: 'reUse',
	        value: function reUse(x, y) {
	            this.x = x;
	            this.y = y;
	            this.used = true;
	        }
	    }, {
	        key: 'update',
	        value: function update(dt) {
	            this.x = this.x + dt * this.body.velocity.x;
	            this.y = this.y + dt * this.body.velocity.y;
	            //this.remaining_life-=0.01;
	            this.radius -= 0.03;

	            if (this.remaining_life < 0 || this.radius < 0) {
	                //     //a brand new particle replacing the dead one
	                if (this.radius) {
	                    this.cancel();
	                } else {}

	                //     this.speed = this.options.speed || { x: -50 + (Math.random() * 100), y: -250 };
	                //     this.velocity = {
	                //         x: this.speed.x,
	                //         y: this.speed.y
	                //     }
	                //     this.life = this.options.life || this.game.rand(10, 30);
	                //     this.remaining_life = this.life;

	                // this.x = this.repeatX;
	                // this.y = this.repeatY;
	            }
	        }
	    }]);

	    return Particles;
	}(_ObjectSettings4.default);

	;

	exports.default = Particles;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _socket = __webpack_require__(24);

	var _socket2 = _interopRequireDefault(_socket);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Multiplayer = function () {
	    function Multiplayer(game, _ip) {
	        var _this = this;

	        _classCallCheck(this, Multiplayer);

	        this.removeAllObjects = function (data) {
	            var tab = [];

	            for (var i = 0; i < _this.game.gameObject.length; i++) {
	                if (_this.game.gameObject[i].sockID === data) {
	                    tab.push(_this.game.gameObject[i]);
	                }
	            }

	            for (var _i = 0; _i < tab.length; _i++) {
	                _this.game.gameObject.splice(_this.game.gameObject.indexOf(tab[_i]), 1);
	            }
	        };

	        this.shareObj = function (data) {
	            _this.switchType(data);
	        };

	        this.updateObject = function (data) {
	            var obj = _this.getObjById(data.ID);
	            obj.x = data.x;
	            obj.y = data.y;
	        };

	        this.ip = _ip;
	        this.game = game;
	    }

	    _createClass(Multiplayer, [{
	        key: 'initializeConnetion',
	        value: function initializeConnetion(socket) {
	            this.socket = socket || _socket2.default.connect(this.ip);

	            this.onSocket('connected', function (err, msg) {
	                if (err) {
	                    console.error(err);
	                } else {
	                    console.log(msg);
	                }
	            });
	        }
	    }, {
	        key: 'initializeGameConnetion',
	        value: function initializeGameConnetion(socket) {
	            this.socket = socket || _socket2.default.connect(this.ip);

	            this.socket.on('remove objs', this.removeObj.bind(this));
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var _this2 = this;

	            this.getCurrentRoom(function (err, roomName) {
	                if (!err) {
	                    _this2.emit('waiting for init', roomName);
	                    _this2.onSocket('share obj', _this2.shareObj);
	                    _this2.onSocket('removed objs', _this2.removeAllObjects);
	                    _this2.onSocket('update obj', _this2.updateObject);
	                } else {
	                    console.error(err);
	                }
	            });
	        }
	    }, {
	        key: 'onSocket',
	        value: function onSocket(name, callback) {
	            this.socket.removeAllListeners(name);

	            if (typeof callback === 'function') {
	                this.socket.on(name, callback);
	            } else {
	                throw 'Metoda przyjmuje dwa parametry. Nazwe Socketu (String) i callback (Function)';
	            }
	        }
	    }, {
	        key: 'emit',
	        value: function emit(name, data, callback) {
	            if (!name) {
	                throw 'musisz podac jako pierwszy parametr nazwe socketu';
	            }
	            this.socket.emit(name, data, callback);
	        }
	    }, {
	        key: 'enemyLeave',
	        value: function enemyLeave(data, callback) {
	            if (typeof callback === 'function') {} else {
	                console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	            }
	        }
	    }, {
	        key: 'removeObj',
	        value: function removeObj(data) {
	            this.game.gameObjects = this.game.gameObjects.filter(function (obj) {
	                if (obj.socketId !== data.socketId) {
	                    return obj;
	                }
	            });
	        }

	        // mozliwe ze trzeba poprawic do jedej petli
	        // otrzymywane z servera

	    }, {
	        key: 'getObjById',
	        value: function getObjById(id) {
	            for (var i = 0; i < this.game.gameObject.length; i++) {
	                if (id === this.game.gameObject[i].ID) {
	                    return this.game.gameObject[i];
	                }
	            }
	        }
	    }, {
	        key: 'createRoom',
	        value: function createRoom(options, _callback) {
	            this.emit('create room', options, function (err, room) {
	                if (typeof _callback === 'function') {
	                    return _callback(err, room);
	                } else {
	                    console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	                }
	            });
	        }
	    }, {
	        key: 'leaveRoom',
	        value: function leaveRoom(_callback) {
	            this.emit('leave room', null, function (err, room) {
	                if (typeof _callback === 'function') {
	                    return _callback(err, room);
	                } else {
	                    console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	                }
	            });
	        }
	    }, {
	        key: 'joinRoom',
	        value: function joinRoom(data, _callback) {
	            if (!data.name) {
	                return console.error('musisz podac nazwe pokoju do ktorego chcesz dolaczyc. Pole: "name"');
	            }

	            this.emit('join room', data, function (err, room) {
	                if (typeof _callback === 'function') {
	                    return _callback(err, room);
	                } else {
	                    console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	                }
	            });
	        }
	    }, {
	        key: 'getCurrentRoom',
	        value: function getCurrentRoom(_callback) {
	            this.emit('get current room', null, function (err, room) {
	                if (typeof _callback === 'function') {
	                    return _callback(err, room);
	                } else {
	                    console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	                }
	            });
	        }
	    }, {
	        key: 'getUsersInRoom',
	        value: function getUsersInRoom(_callback) {
	            this.emit('users in room', this.socket.id, function (err, room) {
	                if (typeof _callback === 'function') {
	                    return _callback(err, room);
	                } else {
	                    console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	                }
	            });
	        }
	    }, {
	        key: 'getRoomsList',
	        value: function getRoomsList(_callback) {
	            this.emit('list rooms', null, function (rooms) {
	                if (typeof _callback === 'function') {
	                    return _callback(rooms);
	                } else {
	                    console.error('brak zdefiniowanego callbacka lub nie jest to funkcja!');
	                }
	            });
	        }
	    }, {
	        key: 'switchType',
	        value: function switchType(data) {
	            var obj = null;

	            if (data.oClass) {
	                // var req = require('module/Objects/Player')
	                // console.log(req)
	                obj = new this.game.CLASS[data.oClass](this.game, data.arguments[0], data.arguments[1], data.arguments[2], data.arguments[3], data.arguments[4], data.arguments[5], data.arguments[6], data.arguments[7], data.arguments[8], data.arguments[9], data.arguments[10]);
	                obj.playerControlled = false;
	            } else {
	                switch (data.type) {
	                    case 'image':

	                        obj = this.game.add[data.type]('main', data.x, data.y, data.key);
	                        obj.zIndex = 10;
	                        break;
	                    case 'sprite':
	                        obj = this.game.add[data.type]('main', data.x, data.y, data.key);
	                        break;
	                }
	            }

	            obj.sockID = data.sockID;
	            obj.ID = data.ID;

	            return obj;
	        }
	    }]);

	    return Multiplayer;
	}();

	exports.default = Multiplayer;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module dependencies.
	 */

	var url = __webpack_require__(25);
	var parser = __webpack_require__(31);
	var Manager = __webpack_require__(40);
	var debug = __webpack_require__(27)('socket.io-client');

	/**
	 * Module exports.
	 */

	module.exports = exports = lookup;

	/**
	 * Managers cache.
	 */

	var cache = exports.managers = {};

	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */

	function lookup(uri, opts) {
	  if ((typeof uri === 'undefined' ? 'undefined' : _typeof(uri)) === 'object') {
	    opts = uri;
	    uri = undefined;
	  }

	  opts = opts || {};

	  var parsed = url(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] || false === opts.multiplex || sameNamespace;

	  var io;

	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = Manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = Manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  }
	  return io.socket(parsed.path, opts);
	}

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = parser.protocol;

	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */

	exports.connect = lookup;

	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */

	exports.Manager = __webpack_require__(40);
	exports.Socket = __webpack_require__(67);

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Module dependencies.
	 */

	var parseuri = __webpack_require__(26);
	var debug = __webpack_require__(27)('socket.io-client:url');

	/**
	 * Module exports.
	 */

	module.exports = url;

	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */

	function url(uri, loc) {
	  var obj = uri;

	  // default to window.location
	  loc = loc || global.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;

	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }

	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }

	    // parse
	    debug('parse %s', uri);
	    obj = parseuri(uri);
	  }

	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }

	  obj.path = obj.path || '/';

	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : ':' + obj.port);

	  return obj;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	var parts = ['source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'];

	module.exports = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');

	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }

	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;

	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }

	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }

	    return uri;
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(29);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = ['lightseagreen', 'forestgreen', 'goldenrod', 'dodgerblue', 'darkorchid', 'crimson'];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
	  // double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};

	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';

	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout() {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	})();
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }
	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e) {
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e) {
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }
	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) {
	    return [];
	};

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(30);

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Previous log timestamp.
	 */

	var prevTime;

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0,
	      i;

	  for (i in namespace) {
	    hash = (hash << 5) - hash + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  return debug;
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (var i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	module.exports = function (val, options) {
	  options = options || {};
	  var type = typeof val === 'undefined' ? 'undefined' : _typeof(val);
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error('val is not a non-empty string or a valid number. val=' + JSON.stringify(val));
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') || plural(ms, h, 'hour') || plural(ms, m, 'minute') || plural(ms, s, 'second') || ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module dependencies.
	 */

	var debug = __webpack_require__(32)('socket.io-parser');
	var Emitter = __webpack_require__(34);
	var hasBin = __webpack_require__(35);
	var binary = __webpack_require__(37);
	var isArray = __webpack_require__(38);
	var isBuf = __webpack_require__(39);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = 4;

	/**
	 * Packet types.
	 *
	 * @api public
	 */

	exports.types = ['CONNECT', 'DISCONNECT', 'EVENT', 'ACK', 'ERROR', 'BINARY_EVENT', 'BINARY_ACK'];

	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */

	exports.CONNECT = 0;

	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */

	exports.DISCONNECT = 1;

	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */

	exports.EVENT = 2;

	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */

	exports.ACK = 3;

	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */

	exports.ERROR = 4;

	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */

	exports.BINARY_EVENT = 5;

	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */

	exports.BINARY_ACK = 6;

	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */

	exports.Encoder = Encoder;

	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */

	exports.Decoder = Decoder;

	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */

	function Encoder() {}

	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */

	Encoder.prototype.encode = function (obj, callback) {
	  if ((obj.type === exports.EVENT || obj.type === exports.ACK) && hasBin(obj.data)) {
	    obj.type = obj.type === exports.EVENT ? exports.BINARY_EVENT : exports.BINARY_ACK;
	  }

	  debug('encoding packet %j', obj);

	  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
	    encodeAsBinary(obj, callback);
	  } else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};

	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */

	function encodeAsString(obj) {

	  // first is type
	  var str = '' + obj.type;

	  // attachments if we have them
	  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
	    str += obj.attachments + '-';
	  }

	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' !== obj.nsp) {
	    str += obj.nsp + ',';
	  }

	  // immediately followed by the id
	  if (null != obj.id) {
	    str += obj.id;
	  }

	  // json data
	  if (null != obj.data) {
	    str += JSON.stringify(obj.data);
	  }

	  debug('encoded %j as %s', obj, str);
	  return str;
	}

	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */

	function encodeAsBinary(obj, callback) {

	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;

	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }

	  binary.removeBlobs(obj, writeEncoding);
	}

	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */

	function Decoder() {
	  this.reconstructor = null;
	}

	/**
	 * Mix in `Emitter` with Decoder.
	 */

	Emitter(Decoder.prototype);

	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */

	Decoder.prototype.add = function (obj) {
	  var packet;
	  if (typeof obj === 'string') {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) {
	      // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);

	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else {
	      // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  } else if (isBuf(obj) || obj.base64) {
	    // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) {
	        // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  } else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};

	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */

	function decodeString(str) {
	  var i = 0;
	  // look up type
	  var p = {
	    type: Number(str.charAt(0))
	  };

	  if (null == exports.types[p.type]) {
	    return error('unknown packet type ' + p.type);
	  }

	  // look up attachments if type binary
	  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
	    var buf = '';
	    while (str.charAt(++i) !== '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) !== '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }

	  // look up namespace (if any)
	  if ('/' === str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' === c) break;
	      p.nsp += c;
	      if (i === str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }

	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i === str.length) break;
	    }
	    p.id = Number(p.id);
	  }

	  // look up json data
	  if (str.charAt(++i)) {
	    var payload = tryParse(str.substr(i));
	    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isArray(payload));
	    if (isPayloadValid) {
	      p.data = payload;
	    } else {
	      return error('invalid payload');
	    }
	  }

	  debug('decoded %s as %j', str, p);
	  return p;
	}

	function tryParse(str) {
	  try {
	    return JSON.parse(str);
	  } catch (e) {
	    return false;
	  }
	}

	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */

	Decoder.prototype.destroy = function () {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};

	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */

	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}

	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */

	BinaryReconstructor.prototype.takeBinaryData = function (binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length === this.reconPack.attachments) {
	    // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};

	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */

	BinaryReconstructor.prototype.finishedReconstruction = function () {
	  this.reconPack = null;
	  this.buffers = [];
	};

	function error(msg) {
	  return {
	    type: exports.ERROR,
	    data: 'parser error: ' + msg
	  };
	}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(33);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }

	  // Internet Explorer and Edge do not support colors.
	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	    return false;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
	  // double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};

	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(30);

	/**
	 * Active `debug` instances.
	 */
	exports.instances = [];

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0,
	      i;

	  for (i in namespace) {
	    hash = (hash << 5) - hash + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  var prevTime;

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	  debug.destroy = destroy;

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  exports.instances.push(debug);

	  return debug;
	}

	function destroy() {
	  var index = exports.instances.indexOf(this);
	  if (index !== -1) {
	    exports.instances.splice(index, 1);
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var i;
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }

	  for (i = 0; i < exports.instances.length; i++) {
	    var instance = exports.instances[i];
	    instance.enabled = exports.enabled(instance.namespace);
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  if (name[name.length - 1] === '*') {
	    return true;
	  }
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Expose `Emitter`.
	 */

	if (true) {
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	};

	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on = Emitter.prototype.addEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || []).push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function (event, fn) {
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function (event, fn) {
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function (event) {
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1),
	      callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function (event) {
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function (event) {
	  return !!this.listeners(event).length;
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/* global Blob File */

	/*
	 * Module requirements.
	 */

	var isArray = __webpack_require__(36);

	var toString = Object.prototype.toString;
	var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
	var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

	/**
	 * Module exports.
	 */

	module.exports = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Supports Buffer, ArrayBuffer, Blob and File.
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary(obj) {
	  if (!obj || (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
	    return false;
	  }

	  if (isArray(obj)) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      if (hasBinary(obj[i])) {
	        return true;
	      }
	    }
	    return false;
	  }

	  if (typeof global.Buffer === 'function' && global.Buffer.isBuffer && global.Buffer.isBuffer(obj) || typeof global.ArrayBuffer === 'function' && obj instanceof ArrayBuffer || withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
	    return true;
	  }

	  // see: https://github.com/Automattic/has-binary/pull/4
	  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
	    return hasBinary(obj.toJSON(), true);
	  }

	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
	      return true;
	    }
	  }

	  return false;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*global Blob,File*/

	/**
	 * Module requirements
	 */

	var isArray = __webpack_require__(38);
	var isBuf = __webpack_require__(39);
	var toString = Object.prototype.toString;
	var withNativeBlob = typeof global.Blob === 'function' || toString.call(global.Blob) === '[object BlobConstructor]';
	var withNativeFile = typeof global.File === 'function' || toString.call(global.File) === '[object FileConstructor]';

	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */

	exports.deconstructPacket = function (packet) {
	  var buffers = [];
	  var packetData = packet.data;
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData, buffers);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return { packet: pack, buffers: buffers };
	};

	function _deconstructPacket(data, buffers) {
	  if (!data) return data;

	  if (isBuf(data)) {
	    var placeholder = { _placeholder: true, num: buffers.length };
	    buffers.push(data);
	    return placeholder;
	  } else if (isArray(data)) {
	    var newData = new Array(data.length);
	    for (var i = 0; i < data.length; i++) {
	      newData[i] = _deconstructPacket(data[i], buffers);
	    }
	    return newData;
	  } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object' && !(data instanceof Date)) {
	    var newData = {};
	    for (var key in data) {
	      newData[key] = _deconstructPacket(data[key], buffers);
	    }
	    return newData;
	  }
	  return data;
	}

	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */

	exports.reconstructPacket = function (packet, buffers) {
	  packet.data = _reconstructPacket(packet.data, buffers);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};

	function _reconstructPacket(data, buffers) {
	  if (!data) return data;

	  if (data && data._placeholder) {
	    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
	  } else if (isArray(data)) {
	    for (var i = 0; i < data.length; i++) {
	      data[i] = _reconstructPacket(data[i], buffers);
	    }
	  } else if ((typeof data === 'undefined' ? 'undefined' : _typeof(data)) === 'object') {
	    for (var key in data) {
	      data[key] = _reconstructPacket(data[key], buffers);
	    }
	  }

	  return data;
	}

	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */

	exports.removeBlobs = function (data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;

	    // convert any blob
	    if (withNativeBlob && obj instanceof Blob || withNativeFile && obj instanceof File) {
	      pendingBlobs++;

	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function () {
	        // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        } else {
	          bloblessData = this.result;
	        }

	        // if nothing pending its callback time
	        if (! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };

	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isArray(obj)) {
	      // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && !isBuf(obj)) {
	      // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }

	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	'use strict';

	var toString = {}.toString;

	module.exports = Array.isArray || function (arr) {
	  return toString.call(arr) == '[object Array]';
	};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {"use strict";

	module.exports = isBuf;

	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */

	function isBuf(obj) {
	  return global.Buffer && global.Buffer.isBuffer(obj) || global.ArrayBuffer && (obj instanceof ArrayBuffer || ArrayBuffer.isView(obj));
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module dependencies.
	 */

	var eio = __webpack_require__(41);
	var Socket = __webpack_require__(67);
	var Emitter = __webpack_require__(34);
	var parser = __webpack_require__(31);
	var on = __webpack_require__(69);
	var bind = __webpack_require__(70);
	var debug = __webpack_require__(27)('socket.io-client:manager');
	var indexOf = __webpack_require__(66);
	var Backoff = __webpack_require__(71);

	/**
	 * IE6+ hasOwnProperty
	 */

	var has = Object.prototype.hasOwnProperty;

	/**
	 * Module exports
	 */

	module.exports = Manager;

	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */

	function Manager(uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof(uri))) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};

	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new Backoff({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  var _parser = opts.parser || parser;
	  this.encoder = new _parser.Encoder();
	  this.decoder = new _parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}

	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */

	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};

	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */

	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.generateId(nsp);
	    }
	  }
	};

	/**
	 * generate `socket.id` for the given `nsp`
	 *
	 * @param {String} nsp
	 * @return {String}
	 * @api private
	 */

	Manager.prototype.generateId = function (nsp) {
	  return (nsp === '/' ? '' : nsp + '#') + this.engine.id;
	};

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Manager.prototype);

	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};

	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};

	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};

	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};

	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};

	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};

	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */

	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};

	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */

	Manager.prototype.open = Manager.prototype.connect = function (fn, opts) {
	  debug('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;

	  debug('opening %s', this.uri);
	  this.engine = eio(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;

	  // emit `open`
	  var openSub = on(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });

	  // emit `connect_error`
	  var errorSub = on(socket, 'error', function (data) {
	    debug('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });

	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug('connect attempt will timeout after %d', timeout);

	    // set timer
	    var timer = setTimeout(function () {
	      debug('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);

	    this.subs.push({
	      destroy: function destroy() {
	        clearTimeout(timer);
	      }
	    });
	  }

	  this.subs.push(openSub);
	  this.subs.push(errorSub);

	  return this;
	};

	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */

	Manager.prototype.onopen = function () {
	  debug('open');

	  // clear old subs
	  this.cleanup();

	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');

	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on(socket, 'data', bind(this, 'ondata')));
	  this.subs.push(on(socket, 'ping', bind(this, 'onping')));
	  this.subs.push(on(socket, 'pong', bind(this, 'onpong')));
	  this.subs.push(on(socket, 'error', bind(this, 'onerror')));
	  this.subs.push(on(socket, 'close', bind(this, 'onclose')));
	  this.subs.push(on(this.decoder, 'decoded', bind(this, 'ondecoded')));
	};

	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */

	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};

	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */

	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};

	/**
	 * Called with data.
	 *
	 * @api private
	 */

	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};

	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */

	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */

	Manager.prototype.onerror = function (err) {
	  debug('error', err);
	  this.emitAll('error', err);
	};

	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */

	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new Socket(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.generateId(nsp);
	    });

	    if (this.autoConnect) {
	      // manually call here since connecting event is fired before listening
	      onConnecting();
	    }
	  }

	  function onConnecting() {
	    if (!~indexOf(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }

	  return socket;
	};

	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */

	Manager.prototype.destroy = function (socket) {
	  var index = indexOf(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;

	  this.close();
	};

	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Manager.prototype.packet = function (packet) {
	  debug('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else {
	    // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};

	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */

	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};

	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */

	Manager.prototype.cleanup = function () {
	  debug('cleanup');

	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }

	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;

	  this.decoder.destroy();
	};

	/**
	 * Close the current socket.
	 *
	 * @api private
	 */

	Manager.prototype.close = Manager.prototype.disconnect = function () {
	  debug('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};

	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */

	Manager.prototype.onclose = function (reason) {
	  debug('onclose');

	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);

	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};

	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */

	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;

	  var self = this;

	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug('will wait %dms before reconnect attempt', delay);

	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;

	      debug('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);

	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;

	      self.open(function (err) {
	        if (err) {
	          debug('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);

	    this.subs.push({
	      destroy: function destroy() {
	        clearTimeout(timer);
	      }
	    });
	  }
	};

	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */

	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(42);

	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	module.exports.parser = __webpack_require__(49);

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module dependencies.
	 */

	var transports = __webpack_require__(43);
	var Emitter = __webpack_require__(34);
	var debug = __webpack_require__(61)('engine.io-client:socket');
	var index = __webpack_require__(66);
	var parser = __webpack_require__(49);
	var parseuri = __webpack_require__(26);
	var parseqs = __webpack_require__(58);

	/**
	 * Module exports.
	 */

	module.exports = Socket;

	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */

	function Socket(uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);

	  opts = opts || {};

	  if (uri && 'object' === (typeof uri === 'undefined' ? 'undefined' : _typeof(uri))) {
	    opts = uri;
	    uri = null;
	  }

	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }

	  this.secure = null != opts.secure ? opts.secure : global.location && 'https:' === location.protocol;

	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }

	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname || (global.location ? location.hostname : 'localhost');
	  this.port = opts.port || (global.location && location.port ? location.port : this.secure ? 443 : 80);
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.transportOptions = opts.transportOptions || {};
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? opts.perMessageDeflate || {} : false;

	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }

	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;

	  // other options for Node.js client
	  var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' && global;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }

	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }

	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;

	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;

	  this.open();
	}

	Socket.priorWebsocketSuccess = false;

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	Socket.protocol = parser.protocol; // this is an int

	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */

	Socket.Socket = Socket;
	Socket.Transport = __webpack_require__(48);
	Socket.transports = __webpack_require__(43);
	Socket.parser = __webpack_require__(49);

	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */

	Socket.prototype.createTransport = function (name) {
	  debug('creating transport "%s"', name);
	  var query = clone(this.query);

	  // append engine.io protocol identifier
	  query.EIO = parser.protocol;

	  // transport name
	  query.transport = name;

	  // per-transport options
	  var options = this.transportOptions[name] || {};

	  // session id if we already have one
	  if (this.id) query.sid = this.id;

	  var transport = new transports[name]({
	    query: query,
	    socket: this,
	    agent: options.agent || this.agent,
	    hostname: options.hostname || this.hostname,
	    port: options.port || this.port,
	    secure: options.secure || this.secure,
	    path: options.path || this.path,
	    forceJSONP: options.forceJSONP || this.forceJSONP,
	    jsonp: options.jsonp || this.jsonp,
	    forceBase64: options.forceBase64 || this.forceBase64,
	    enablesXDR: options.enablesXDR || this.enablesXDR,
	    timestampRequests: options.timestampRequests || this.timestampRequests,
	    timestampParam: options.timestampParam || this.timestampParam,
	    policyPort: options.policyPort || this.policyPort,
	    pfx: options.pfx || this.pfx,
	    key: options.key || this.key,
	    passphrase: options.passphrase || this.passphrase,
	    cert: options.cert || this.cert,
	    ca: options.ca || this.ca,
	    ciphers: options.ciphers || this.ciphers,
	    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
	    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
	    extraHeaders: options.extraHeaders || this.extraHeaders,
	    forceNode: options.forceNode || this.forceNode,
	    localAddress: options.localAddress || this.localAddress,
	    requestTimeout: options.requestTimeout || this.requestTimeout,
	    protocols: options.protocols || void 0
	  });

	  return transport;
	};

	function clone(obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}

	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';

	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }

	  transport.open();
	  this.setTransport(transport);
	};

	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */

	Socket.prototype.setTransport = function (transport) {
	  debug('setting transport %s', transport.name);
	  var self = this;

	  if (this.transport) {
	    debug('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }

	  // set up transport
	  this.transport = transport;

	  // set up transport listeners
	  transport.on('drain', function () {
	    self.onDrain();
	  }).on('packet', function (packet) {
	    self.onPacket(packet);
	  }).on('error', function (e) {
	    self.onError(e);
	  }).on('close', function () {
	    self.onClose('transport close');
	  });
	};

	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */

	Socket.prototype.probe = function (name) {
	  debug('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;

	  Socket.priorWebsocketSuccess = false;

	  function onTransportOpen() {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;

	    debug('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

	        debug('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug('changing transport and sending upgrade packet');

	          cleanup();

	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }

	  function freezeTransport() {
	    if (failed) return;

	    // Any callback called by transport should be ignored since now
	    failed = true;

	    cleanup();

	    transport.close();
	    transport = null;
	  }

	  // Handle any error that happens while probing
	  function onerror(err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;

	    freezeTransport();

	    debug('probe transport "%s" failed because of error: %s', name, err);

	    self.emit('upgradeError', error);
	  }

	  function onTransportClose() {
	    onerror('transport closed');
	  }

	  // When the socket is closed while we're probing
	  function onclose() {
	    onerror('socket closed');
	  }

	  // When the socket is upgraded while we're probing
	  function onupgrade(to) {
	    if (transport && to.name !== transport.name) {
	      debug('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }

	  // Remove all listeners on the transport and on self
	  function cleanup() {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }

	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);

	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);

	  transport.open();
	};

	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */

	Socket.prototype.onOpen = function () {
	  debug('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();

	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};

	/**
	 * Handles a packet.
	 *
	 * @api private
	 */

	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket receive: type "%s", data "%s"', packet.type, packet.data);

	    this.emit('packet', packet);

	    // Socket is live - any packet counts
	    this.emit('heartbeat');

	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(JSON.parse(packet.data));
	        break;

	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;

	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;

	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug('packet received with socket readyState "%s"', this.readyState);
	  }
	};

	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */

	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();

	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};

	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */

	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || self.pingInterval + self.pingTimeout);
	};

	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */

	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};

	/**
	* Sends a ping packet.
	*
	* @api private
	*/

	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};

	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */

	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);

	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;

	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};

	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */

	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length) {
	    debug('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};

	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */

	Socket.prototype.write = Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */

	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }

	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }

	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }

	  options = options || {};
	  options.compress = false !== options.compress;

	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};

	/**
	 * Closes the connection.
	 *
	 * @api private
	 */

	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';

	    var self = this;

	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }

	  function close() {
	    self.onClose('forced close');
	    debug('socket closing - telling transport to close');
	    self.transport.close();
	  }

	  function cleanupAndClose() {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }

	  function waitForUpgrade() {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }

	  return this;
	};

	/**
	 * Called upon transport error
	 *
	 * @api private
	 */

	Socket.prototype.onError = function (err) {
	  debug('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};

	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */

	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug('socket close with reason: "%s"', reason);
	    var self = this;

	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);

	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');

	    // ensure transport won't stay open
	    this.transport.close();

	    // ignore further transport communication
	    this.transport.removeAllListeners();

	    // set ready state
	    this.readyState = 'closed';

	    // clear session id
	    this.id = null;

	    // emit close event
	    this.emit('close', reason, desc);

	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};

	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */

	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~index(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Module dependencies
	 */

	var XMLHttpRequest = __webpack_require__(44);
	var XHR = __webpack_require__(46);
	var JSONP = __webpack_require__(63);
	var websocket = __webpack_require__(64);

	/**
	 * Export transports.
	 */

	exports.polling = polling;
	exports.websocket = websocket;

	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */

	function polling(opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }

	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new XMLHttpRequest(opts);

	  if ('open' in xhr && !opts.forceJSONP) {
	    return new XHR(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new JSONP(opts);
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	// browser shim for xmlhttprequest module

	var hasCORS = __webpack_require__(45);

	module.exports = function (opts) {
	  var xdomain = opts.xdomain;

	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;

	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;

	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCORS)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) {}

	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) {}

	  if (!xdomain) {
	    try {
	      return new global[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) {}
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' && 'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Module requirements.
	 */

	var XMLHttpRequest = __webpack_require__(44);
	var Polling = __webpack_require__(47);
	var Emitter = __webpack_require__(34);
	var inherit = __webpack_require__(59);
	var debug = __webpack_require__(61)('engine.io-client:polling-xhr');

	/**
	 * Module exports.
	 */

	module.exports = XHR;
	module.exports.Request = Request;

	/**
	 * Empty function
	 */

	function empty() {}

	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function XHR(opts) {
	  Polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;
	  this.extraHeaders = opts.extraHeaders;

	  if (global.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    this.xd = opts.hostname !== global.location.hostname || port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(XHR, Polling);

	/**
	 * XHR supports binary
	 */

	XHR.prototype.supportsBinary = true;

	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */

	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;

	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;

	  return new Request(opts);
	};

	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */

	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	XHR.prototype.doPoll = function () {
	  debug('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};

	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Request(opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;

	  this.create();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Request.prototype);

	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */

	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  var xhr = this.xhr = new XMLHttpRequest(opts);
	  var self = this;

	  try {
	    debug('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}

	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }

	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}

	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }

	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }

	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 2) {
	          try {
	            var contentType = xhr.getResponseHeader('Content-Type');
	            if (self.supportsBinary && contentType === 'application/octet-stream') {
	              xhr.responseType = 'arraybuffer';
	            }
	          } catch (e) {}
	        }
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }

	    debug('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }

	  if (global.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};

	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */

	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};

	/**
	 * Called if we have data.
	 *
	 * @api private
	 */

	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};

	/**
	 * Called upon error.
	 *
	 * @api private
	 */

	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};

	/**
	 * Cleans up house.
	 *
	 * @api private
	 */

	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }

	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }

	  if (global.document) {
	    delete Request.requests[this.index];
	  }

	  this.xhr = null;
	};

	/**
	 * Called upon load.
	 *
	 * @api private
	 */

	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type');
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      data = this.xhr.responseText;
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};

	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */

	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof global.XDomainRequest && !this.xs && this.enablesXDR;
	};

	/**
	 * Aborts the request.
	 *
	 * @api public
	 */

	Request.prototype.abort = function () {
	  this.cleanup();
	};

	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	Request.requestsCount = 0;
	Request.requests = {};

	if (global.document) {
	  if (global.attachEvent) {
	    global.attachEvent('onunload', unloadHandler);
	  } else if (global.addEventListener) {
	    global.addEventListener('beforeunload', unloadHandler, false);
	  }
	}

	function unloadHandler() {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(48);
	var parseqs = __webpack_require__(58);
	var parser = __webpack_require__(49);
	var inherit = __webpack_require__(59);
	var yeast = __webpack_require__(60);
	var debug = __webpack_require__(61)('engine.io-client:polling');

	/**
	 * Module exports.
	 */

	module.exports = Polling;

	/**
	 * Is XHR2 supported?
	 */

	var hasXHR2 = function () {
	  var XMLHttpRequest = __webpack_require__(44);
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	}();

	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */

	function Polling(opts) {
	  var forceBase64 = opts && opts.forceBase64;
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(Polling, Transport);

	/**
	 * Transport name.
	 */

	Polling.prototype.name = 'polling';

	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */

	Polling.prototype.doOpen = function () {
	  this.poll();
	};

	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */

	Polling.prototype.pause = function (onPause) {
	  var self = this;

	  this.readyState = 'pausing';

	  function pause() {
	    debug('paused');
	    self.readyState = 'paused';
	    onPause();
	  }

	  if (this.polling || !this.writable) {
	    var total = 0;

	    if (this.polling) {
	      debug('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug('pre-pause polling complete');
	        --total || pause();
	      });
	    }

	    if (!this.writable) {
	      debug('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};

	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */

	Polling.prototype.poll = function () {
	  debug('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};

	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */

	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug('polling got data %s', data);
	  var callback = function callback(packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }

	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }

	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };

	  // decode payload
	  parser.decodePayload(data, this.socket.binaryType, callback);

	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');

	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};

	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */

	Polling.prototype.doClose = function () {
	  var self = this;

	  function close() {
	    debug('writing close packet');
	    self.write([{ type: 'close' }]);
	  }

	  if ('open' === this.readyState) {
	    debug('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug('transport not open - deferring close');
	    this.once('open', close);
	  }
	};

	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */

	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function callbackfn() {
	    self.writable = true;
	    self.emit('drain');
	  };

	  parser.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';

	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // avoid port if default for schema
	  if (this.port && ('https' === schema && Number(this.port) !== 443 || 'http' === schema && Number(this.port) !== 80)) {
	    port = ':' + this.port;
	  }

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(49);
	var Emitter = __webpack_require__(34);

	/**
	 * Module exports.
	 */

	module.exports = Transport;

	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */

	function Transport(opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Transport.prototype);

	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */

	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};

	/**
	 * Opens the transport.
	 *
	 * @api public
	 */

	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }

	  return this;
	};

	/**
	 * Closes the transport.
	 *
	 * @api private
	 */

	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }

	  return this;
	};

	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */

	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};

	/**
	 * Called upon open
	 *
	 * @api private
	 */

	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};

	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */

	Transport.prototype.onData = function (data) {
	  var packet = parser.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};

	/**
	 * Called with a decoded packet.
	 */

	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon close.
	 *
	 * @api private
	 */

	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Module dependencies.
	 */

	var keys = __webpack_require__(50);
	var hasBinary = __webpack_require__(35);
	var sliceBuffer = __webpack_require__(51);
	var after = __webpack_require__(52);
	var utf8 = __webpack_require__(53);

	var base64encoder;
	if (global && global.ArrayBuffer) {
	  base64encoder = __webpack_require__(56);
	}

	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */

	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;

	/**
	 * Current protocol version.
	 */

	exports.protocol = 3;

	/**
	 * Packet types.
	 */

	var packets = exports.packets = {
	  open: 0 // non-ws
	  , close: 1 // non-ws
	  , ping: 2,
	  pong: 3,
	  message: 4,
	  upgrade: 5,
	  noop: 6
	};

	var packetslist = keys(packets);

	/**
	 * Premade error packet.
	 */

	var err = { type: 'error', data: 'parser error' };

	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */

	var Blob = __webpack_require__(57);

	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */

	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if (typeof supportsBinary === 'function') {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }

	  if (typeof utf8encode === 'function') {
	    callback = utf8encode;
	    utf8encode = null;
	  }

	  var data = packet.data === undefined ? undefined : packet.data.buffer || packet.data;

	  if (global.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (Blob && data instanceof global.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }

	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }

	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];

	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
	  }

	  return callback('' + encoded);
	};

	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}

	/**
	 * Encode packet helpers for binary types
	 */

	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);

	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i + 1] = contentArray[i];
	  }

	  return callback(resultBuffer.buffer);
	}

	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var fr = new FileReader();
	  fr.onload = function () {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}

	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }

	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob = new Blob([length.buffer, packet.data]);

	  return callback(blob);
	}

	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */

	exports.encodeBase64Packet = function (packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (Blob && packet.data instanceof global.Blob) {
	    var fr = new FileReader();
	    fr.onload = function () {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }

	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += global.btoa(b64data);
	  return callback(message);
	};

	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */

	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data === 'string') {
	    if (data.charAt(0) === 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }

	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);

	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }

	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }

	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = sliceBuffer(data, 1);
	  if (Blob && binaryType === 'blob') {
	    rest = new Blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};

	function tryDecode(data) {
	  try {
	    data = utf8.decode(data, { strict: false });
	  } catch (e) {
	    return false;
	  }
	  return data;
	}

	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */

	exports.decodeBase64Packet = function (msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }

	  var data = base64encoder.decode(msg.substr(1));

	  if (binaryType === 'blob' && Blob) {
	    data = new Blob([data]);
	  }

	  return { type: type, data: data };
	};

	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */

	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary === 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }

	  var isBinary = hasBinary(packets);

	  if (supportsBinary && isBinary) {
	    if (Blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }

	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }

	  if (!packets.length) {
	    return callback('0:');
	  }

	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function (message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }

	  map(packets, encodeOne, function (err, results) {
	    return callback(results.join(''));
	  });
	};

	/**
	 * Async array map using after
	 */

	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after(ary.length, done);

	  var eachWithIndex = function eachWithIndex(i, el, cb) {
	    each(el, function (error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };

	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}

	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */

	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data !== 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }

	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var packet;
	  if (data === '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	  var length = '',
	      n,
	      msg;

	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);

	    if (chr !== ':') {
	      length += chr;
	      continue;
	    }

	    if (length === '' || length != (n = Number(length))) {
	      // parser error - ignoring payload
	      return callback(err, 0, 1);
	    }

	    msg = data.substr(i + 1, n);

	    if (length != msg.length) {
	      // parser error - ignoring payload
	      return callback(err, 0, 1);
	    }

	    if (msg.length) {
	      packet = exports.decodePacket(msg, binaryType, false);

	      if (err.type === packet.type && err.data === packet.data) {
	        // parser error in individual packet - ignoring payload
	        return callback(err, 0, 1);
	      }

	      var ret = callback(packet, i + n, l);
	      if (false === ret) return;
	    }

	    // advance cursor
	    i += n;
	    length = '';
	  }

	  if (length !== '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }
	};

	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */

	exports.encodePayloadAsArrayBuffer = function (packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function (data) {
	      return doneCallback(null, data);
	    });
	  }

	  map(packets, encodeOne, function (err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function (acc, p) {
	      var len;
	      if (typeof p === 'string') {
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);

	    var resultArray = new Uint8Array(totalLength);

	    var bufferIndex = 0;
	    encodedPackets.forEach(function (p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }

	      if (isString) {
	        // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else {
	        // true binary
	        resultArray[bufferIndex++] = 1;
	      }

	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;

	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });

	    return callback(resultArray.buffer);
	  });
	};

	/**
	 * Encode as Blob
	 */

	exports.encodePayloadAsBlob = function (packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function (encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }

	      var len = encoded instanceof ArrayBuffer ? encoded.byteLength : encoded.size;

	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;

	      if (Blob) {
	        var blob = new Blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob);
	      }
	    });
	  }

	  map(packets, encodeOne, function (err, results) {
	    return callback(new Blob(results));
	  });
	};

	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */

	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var bufferTail = data;
	  var buffers = [];

	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';

	    for (var i = 1;; i++) {
	      if (tailArray[i] === 255) break;

	      // 310 = char length of Number.MAX_VALUE
	      if (msgLength.length > 310) {
	        return callback(err, 0, 1);
	      }

	      msgLength += tailArray[i];
	    }

	    bufferTail = sliceBuffer(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);

	    var msg = sliceBuffer(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }

	    buffers.push(msg);
	    bufferTail = sliceBuffer(bufferTail, msgLength);
	  }

	  var total = buffers.length;
	  buffers.forEach(function (buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */

	module.exports = Object.keys || function keys(obj) {
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;

	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */

	module.exports = function (arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;

	  if (arraybuffer.slice) {
	    return arraybuffer.slice(start, end);
	  }

	  if (start < 0) {
	    start += bytes;
	  }
	  if (end < 0) {
	    end += bytes;
	  }
	  if (end > bytes) {
	    end = bytes;
	  }

	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }

	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = after;

	function after(count, callback, err_cb) {
	    var bail = false;
	    err_cb = err_cb || noop;
	    proxy.count = count;

	    return count === 0 ? callback() : proxy;

	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times');
	        }
	        --proxy.count;

	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true;
	            callback(err);
	            // future error callbacks will go to error handler
	            callback = err_cb;
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result);
	        }
	    }
	}

	function noop() {}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*! https://mths.be/utf8js v2.1.2 by @mathias */
	;(function (root) {

		// Detect free variables `exports`
		var freeExports = ( false ? 'undefined' : _typeof(exports)) == 'object' && exports;

		// Detect free variable `module`
		var freeModule = ( false ? 'undefined' : _typeof(module)) == 'object' && module && module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = (typeof global === 'undefined' ? 'undefined' : _typeof(global)) == 'object' && global;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) {
						// low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		function checkScalarValue(codePoint, strict) {
			if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
				if (strict) {
					throw Error('Lone surrogate U+' + codePoint.toString(16).toUpperCase() + ' is not a scalar value');
				}
				return false;
			}
			return true;
		}
		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(codePoint >> shift & 0x3F | 0x80);
		}

		function encodeCodePoint(codePoint, strict) {
			if ((codePoint & 0xFFFFFF80) == 0) {
				// 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) {
				// 2-byte sequence
				symbol = stringFromCharCode(codePoint >> 6 & 0x1F | 0xC0);
			} else if ((codePoint & 0xFFFF0000) == 0) {
				// 3-byte sequence
				if (!checkScalarValue(codePoint, strict)) {
					codePoint = 0xFFFD;
				}
				symbol = stringFromCharCode(codePoint >> 12 & 0x0F | 0xE0);
				symbol += createByte(codePoint, 6);
			} else if ((codePoint & 0xFFE00000) == 0) {
				// 4-byte sequence
				symbol = stringFromCharCode(codePoint >> 18 & 0x07 | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode(codePoint & 0x3F | 0x80);
			return symbol;
		}

		function utf8encode(string, opts) {
			opts = opts || {};
			var strict = false !== opts.strict;

			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint, strict);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, it’s not a continuation byte
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol(strict) {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read first byte
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				byte2 = readContinuationByte();
				codePoint = (byte1 & 0x1F) << 6 | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = (byte1 & 0x0F) << 12 | byte2 << 6 | byte3;
				if (codePoint >= 0x0800) {
					return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = (byte1 & 0x07) << 0x12 | byte2 << 0x0C | byte3 << 0x06 | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid UTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function utf8decode(byteString, opts) {
			opts = opts || {};
			var strict = false !== opts.strict;

			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol(strict)) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var utf8 = {
			'version': '2.1.2',
			'encode': utf8encode,
			'decode': utf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if ("function" == 'function' && _typeof(__webpack_require__(55)) == 'object' && __webpack_require__(55)) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return utf8;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && !freeExports.nodeType) {
			if (freeModule) {
				// in Node.js or RingoJS v0.8.0+
				freeModule.exports = utf8;
			} else {
				// in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in utf8) {
					hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
				}
			}
		} else {
			// in Rhino or a web browser
			root.utf8 = utf8;
		}
	})(undefined);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(54)(module), (function() { return this; }())))

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (module) {
		if (!module.webpackPolyfill) {
			module.deprecate = function () {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	};

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	"use strict";

	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function () {
	  "use strict";

	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }

	  exports.encode = function (arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	        i,
	        len = bytes.length,
	        base64 = "";

	    for (i = 0; i < len; i += 3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[(bytes[i] & 3) << 4 | bytes[i + 1] >> 4];
	      base64 += chars[(bytes[i + 1] & 15) << 2 | bytes[i + 2] >> 6];
	      base64 += chars[bytes[i + 2] & 63];
	    }

	    if (len % 3 === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }

	    return base64;
	  };

	  exports.decode = function (base64) {
	    var bufferLength = base64.length * 0.75,
	        len = base64.length,
	        i,
	        p = 0,
	        encoded1,
	        encoded2,
	        encoded3,
	        encoded4;

	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }

	    var arraybuffer = new ArrayBuffer(bufferLength),
	        bytes = new Uint8Array(arraybuffer);

	    for (i = 0; i < len; i += 4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i + 1)];
	      encoded3 = lookup[base64.charCodeAt(i + 2)];
	      encoded4 = lookup[base64.charCodeAt(i + 3)];

	      bytes[p++] = encoded1 << 2 | encoded2 >> 4;
	      bytes[p++] = (encoded2 & 15) << 4 | encoded3 >> 2;
	      bytes[p++] = (encoded3 & 3) << 6 | encoded4 & 63;
	    }

	    return arraybuffer;
	  };
	})();

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Create a blob builder even when vendor prefixes exist
	 */

	var BlobBuilder = global.BlobBuilder || global.WebKitBlobBuilder || global.MSBlobBuilder || global.MozBlobBuilder;

	/**
	 * Check if Blob constructor is supported
	 */

	var blobSupported = function () {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch (e) {
	    return false;
	  }
	}();

	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */

	var blobSupportsArrayBufferView = blobSupported && function () {
	  try {
	    var b = new Blob([new Uint8Array([1, 2])]);
	    return b.size === 2;
	  } catch (e) {
	    return false;
	  }
	}();

	/**
	 * Check if BlobBuilder is supported
	 */

	var blobBuilderSupported = BlobBuilder && BlobBuilder.prototype.append && BlobBuilder.prototype.getBlob;

	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */

	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;

	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }

	      ary[i] = buf;
	    }
	  }
	}

	function BlobBuilderConstructor(ary, options) {
	  options = options || {};

	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);

	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }

	  return options.type ? bb.getBlob(options.type) : bb.getBlob();
	};

	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	};

	module.exports = function () {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? global.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */

	exports.encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};

	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */

	exports.decode = function (qs) {
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = function (a, b) {
	  var fn = function fn() {};
	  fn.prototype = b.prototype;
	  a.prototype = new fn();
	  a.prototype.constructor = a;
	};

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	'use strict';

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(''),
	    length = 64,
	    map = {},
	    seed = 0,
	    i = 0,
	    prev;

	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}

	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}

	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode(+new Date());

	  if (now !== prev) return seed = 0, prev = now;
	  return now + '.' + encode(seed++);
	}

	//
	// Map each character to its index.
	//
	for (; i < length; i++) {
	  map[alphabet[i]] = i;
	} //
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode;
	yeast.decode = decode;
	module.exports = yeast;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = __webpack_require__(62);
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome && 'undefined' != typeof chrome.storage ? chrome.storage.local : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = ['#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC', '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF', '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC', '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF', '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC', '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033', '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933', '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC', '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF', '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }

	  // Internet Explorer and Edge do not support colors.
	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	    return false;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance ||
	  // is firebug? http://stackoverflow.com/a/398120/376773
	  typeof window !== 'undefined' && window.console && (window.console.firebug || window.console.exception && window.console.table) ||
	  // is firefox >= v31?
	  // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 ||
	  // double check webkit in userAgent just in case we are in a worker
	  typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function (v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};

	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '') + this.namespace + (useColors ? ' %c' : ' ') + args[0] + (useColors ? '%c ' : ' ') + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function (match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === (typeof console === 'undefined' ? 'undefined' : _typeof(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch (e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch (e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(28)))

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = __webpack_require__(30);

	/**
	 * Active `debug` instances.
	 */
	exports.instances = [];

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0,
	      i;

	  for (i in namespace) {
	    hash = (hash << 5) - hash + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  var prevTime;

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function (match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	  debug.destroy = destroy;

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  exports.instances.push(debug);

	  return debug;
	}

	function destroy() {
	  var index = exports.instances.indexOf(this);
	  if (index !== -1) {
	    exports.instances.splice(index, 1);
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var i;
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }

	  for (i = 0; i < exports.instances.length; i++) {
	    var instance = exports.instances[i];
	    instance.enabled = exports.enabled(instance.namespace);
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  if (name[name.length - 1] === '*') {
	    return true;
	  }
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Module requirements.
	 */

	var Polling = __webpack_require__(47);
	var inherit = __webpack_require__(59);

	/**
	 * Module exports.
	 */

	module.exports = JSONPPolling;

	/**
	 * Cached regular expressions.
	 */

	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;

	/**
	 * Global JSONP callbacks.
	 */

	var callbacks;

	/**
	 * Noop.
	 */

	function empty() {}

	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */

	function JSONPPolling(opts) {
	  Polling.call(this, opts);

	  this.query = this.query || {};

	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!global.___eio) global.___eio = [];
	    callbacks = global.___eio;
	  }

	  // callback identifier
	  this.index = callbacks.length;

	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });

	  // append to query string
	  this.query.j = this.index;

	  // prevent spurious errors from being emitted when the window is unloaded
	  if (global.document && global.addEventListener) {
	    global.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty;
	    }, false);
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	inherit(JSONPPolling, Polling);

	/*
	 * JSONP only supports binary as base64 encoded strings
	 */

	JSONPPolling.prototype.supportsBinary = false;

	/**
	 * Closes the socket.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }

	  Polling.prototype.doClose.call(this);
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');

	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };

	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;

	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};

	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */

	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;

	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;

	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);

	    this.form = form;
	    this.area = area;
	  }

	  this.form.action = this.uri();

	  function complete() {
	    initIframe();
	    fn();
	  }

	  function initIframe() {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }

	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }

	    iframe.id = self.iframeId;

	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }

	  initIframe();

	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');

	  try {
	    this.form.submit();
	  } catch (e) {}

	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * Module dependencies.
	 */

	var Transport = __webpack_require__(48);
	var parser = __webpack_require__(49);
	var parseqs = __webpack_require__(58);
	var inherit = __webpack_require__(59);
	var yeast = __webpack_require__(60);
	var debug = __webpack_require__(61)('engine.io-client:websocket');
	var BrowserWebSocket = global.WebSocket || global.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = __webpack_require__(65);
	  } catch (e) {}
	}

	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */

	var WebSocket = BrowserWebSocket;
	if (!WebSocket && typeof window === 'undefined') {
	  WebSocket = NodeWebSocket;
	}

	/**
	 * Module exports.
	 */

	module.exports = WS;

	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */

	function WS(opts) {
	  var forceBase64 = opts && opts.forceBase64;
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  this.protocols = opts.protocols;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket = NodeWebSocket;
	  }
	  Transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	inherit(WS, Transport);

	/**
	 * Transport name.
	 *
	 * @api public
	 */

	WS.prototype.name = 'websocket';

	/*
	 * WebSockets support binary
	 */

	WS.prototype.supportsBinary = true;

	/**
	 * Opens socket.
	 *
	 * @api private
	 */

	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }

	  var uri = this.uri();
	  var protocols = this.protocols;
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }

	  try {
	    this.ws = this.usingBrowserWebSocket ? protocols ? new WebSocket(uri, protocols) : new WebSocket(uri) : new WebSocket(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }

	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }

	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }

	  this.addEventListeners();
	};

	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */

	WS.prototype.addEventListeners = function () {
	  var self = this;

	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};

	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */

	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;

	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      parser.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }

	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? global.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }

	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug('websocket closed before onclose event');
	        }

	        --total || done();
	      });
	    })(packets[i]);
	  }

	  function done() {
	    self.emit('flush');

	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};

	/**
	 * Called upon close
	 *
	 * @api private
	 */

	WS.prototype.onClose = function () {
	  Transport.prototype.onClose.call(this);
	};

	/**
	 * Closes socket.
	 *
	 * @api private
	 */

	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';

	  // avoid port if default for schema
	  if (this.port && ('wss' === schema && Number(this.port) !== 443 || 'ws' === schema && Number(this.port) !== 80)) {
	    port = ':' + this.port;
	  }

	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast();
	  }

	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */

	WS.prototype.check = function () {
	  return !!WebSocket && !('__initialize' in WebSocket && this.name === WS.prototype.name);
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	"use strict";

	var indexOf = [].indexOf;

	module.exports = function (arr, obj) {
	  if (indexOf) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/**
	 * Module dependencies.
	 */

	var parser = __webpack_require__(31);
	var Emitter = __webpack_require__(34);
	var toArray = __webpack_require__(68);
	var on = __webpack_require__(69);
	var bind = __webpack_require__(70);
	var debug = __webpack_require__(27)('socket.io-client:socket');
	var parseqs = __webpack_require__(58);

	/**
	 * Module exports.
	 */

	module.exports = exports = Socket;

	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */

	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};

	/**
	 * Shortcut to `Emitter#emit`.
	 */

	var emit = Emitter.prototype.emit;

	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */

	function Socket(io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}

	/**
	 * Mix in `Emitter`.
	 */

	Emitter(Socket.prototype);

	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */

	Socket.prototype.subEvents = function () {
	  if (this.subs) return;

	  var io = this.io;
	  this.subs = [on(io, 'open', bind(this, 'onopen')), on(io, 'packet', bind(this, 'onpacket')), on(io, 'close', bind(this, 'onclose'))];
	};

	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */

	Socket.prototype.open = Socket.prototype.connect = function () {
	  if (this.connected) return this;

	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};

	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.send = function () {
	  var args = toArray(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};

	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }

	  var args = toArray(arguments);
	  var packet = { type: parser.EVENT, data: args };

	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;

	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }

	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }

	  delete this.flags;

	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};

	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */

	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');

	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      var query = _typeof(this.query) === 'object' ? parseqs.encode(this.query) : this.query;
	      debug('sending connect packet with query %s', query);
	      this.packet({ type: parser.CONNECT, query: query });
	    } else {
	      this.packet({ type: parser.CONNECT });
	    }
	  }
	};

	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */

	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};

	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onpacket = function (packet) {
	  if (packet.nsp !== this.nsp) return;

	  switch (packet.type) {
	    case parser.CONNECT:
	      this.onconnect();
	      break;

	    case parser.EVENT:
	      this.onevent(packet);
	      break;

	    case parser.BINARY_EVENT:
	      this.onevent(packet);
	      break;

	    case parser.ACK:
	      this.onack(packet);
	      break;

	    case parser.BINARY_ACK:
	      this.onack(packet);
	      break;

	    case parser.DISCONNECT:
	      this.ondisconnect();
	      break;

	    case parser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};

	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);

	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }

	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};

	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */

	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray(arguments);
	    debug('sending ack %j', args);

	    self.packet({
	      type: parser.ACK,
	      id: id,
	      data: args
	    });
	  };
	};

	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};

	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */

	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};

	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */

	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];

	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};

	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */

	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};

	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */

	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }

	  this.io.destroy(this);
	};

	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.close = Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: parser.DISCONNECT });
	  }

	  // remove socket from pool
	  this.destroy();

	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};

	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.compress = function (compress) {
	  this.flags = this.flags || {};
	  this.flags.compress = compress;
	  return this;
	};

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	"use strict";

	module.exports = toArray;

	function toArray(list, index) {
	    var array = [];

	    index = index || 0;

	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i];
	    }

	    return array;
	}

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Module exports.
	 */

	module.exports = on;

	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */

	function on(obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function destroy() {
	      obj.removeListener(ev, fn);
	    }
	  };
	}

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	'use strict';

	/**
	 * Slice reference.
	 */

	var slice = [].slice;

	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */

	module.exports = function (obj, fn) {
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function () {
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  };
	};

/***/ }),
/* 71 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Expose `Backoff`.
	 */

	module.exports = Backoff;

	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}

	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */

	Backoff.prototype.duration = function () {
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand = Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0 ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};

	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */

	Backoff.prototype.reset = function () {
	  this.attempts = 0;
	};

	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMin = function (min) {
	  this.ms = min;
	};

	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMax = function (max) {
	  this.max = max;
	};

	/**
	 * Set the jitter
	 *
	 * @api public
	 */

	Backoff.prototype.setJitter = function (jitter) {
	  this.jitter = jitter;
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _AssetManager = __webpack_require__(2);

	var _AssetManager2 = _interopRequireDefault(_AssetManager);

	var _MapDrawLayers = __webpack_require__(73);

	var _MapDrawLayers2 = _interopRequireDefault(_MapDrawLayers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Map = function () {
	    function Map(game, options) {
	        var _this = this;

	        _classCallCheck(this, Map);

	        if (!options || !options.json || !options.key) {
	            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json i klucza 'key' z nazwa zaimportowanego obrazka";
	        }
	        this.obstacles = options.obstacles || false;
	        this.game = game;
	        this.jsonPath = options.json;
	        this.asSprite = options.asSprite || false;
	        this.image = _AssetManager2.default.get(options.key);
	        this.key = options.key;
	        this.used = true;
	        this.type = 'Map';
	        this.zIndex = 1;
	        this.game.ARR.obstacles = [];

	        return this.getJson(this.jsonPath).then(function (map) {
	            _this.map = map;
	            if (_this.asSprite) {
	                _this.renderMap(map);
	            } else {
	                var c = _this.generateTwoDimensionalLayers(map);
	                console.log(c);
	                _this.renderOffscreenMap(map);
	            }
	            return _this;
	        });
	    }

	    _createClass(Map, [{
	        key: 'getJson',
	        value: function getJson(jsonPath) {
	            return fetch(jsonPath).then(function (map) {
	                return map.json();
	            }).then(function (map) {
	                return map;
	            });
	        }
	    }, {
	        key: 'renderMap',
	        value: function renderMap(mapData) {
	            var _this2 = this;

	            var z = 1;
	            mapData.layers.forEach(function (layer, layerIndex) {
	                layer.data.forEach(function (gid, index) {
	                    if (gid !== 0) {
	                        var tile = {};
	                        tile.column = index % layer.width;
	                        tile.row = Math.floor(index / layer.width);
	                        tile.x = tile.column * mapData.tileheight - mapData.tilesets[0].margin;
	                        tile.y = tile.row * mapData.tileheight - mapData.tilesets[0].margin;
	                        tile.tileX = (gid - 1) % mapData.tilesets[0].columns * (mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin);
	                        tile.tileY = Math.floor((gid - 1) / mapData.tilesets[0].columns) * (mapData.tilesets[0].tileheight + mapData.tilesets[0].margin);

	                        var sprite = _this2.game.add.sprite({
	                            key: _this2.key,
	                            sx: tile.tileX,
	                            sy: tile.tileY,
	                            width: mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin,
	                            height: mapData.tilesets[0].tileheight + mapData.tilesets[0].margin, //mapData.tilewidth
	                            x: tile.x, //-32,
	                            y: tile.y, //-32,
	                            zIndex: z,
	                            iso: true
	                        });
	                        // sprite.setOffset((this.game.width / 2) - this.map.tileheight, 0);
	                    }
	                });
	                z += 1;
	            });
	        }
	    }, {
	        key: 'renderOffscreenMap',
	        value: function renderOffscreenMap(mapData) {
	            var _this3 = this;

	            this.mapImages = [];

	            mapData.layers.forEach(function (layer, layerIndex) {
	                var ctx = document.createElement("canvas").getContext("2d");
	                ctx.canvas.width = mapData.tilewidth * mapData.width;
	                ctx.canvas.height = mapData.tileheight * mapData.height;

	                layer.data.forEach(function (gid, index) {
	                    if (gid !== 0) {
	                        var tile = {};
	                        tile.column = index % layer.width;
	                        tile.row = Math.floor(index / layer.width);
	                        tile.x = tile.column * mapData.tileheight - mapData.tilesets[0].margin;
	                        tile.y = tile.row * mapData.tileheight - mapData.tilesets[0].margin;
	                        tile.tileX = (gid - 1) % mapData.tilesets[0].columns * (mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin);
	                        tile.tileY = Math.floor((gid - 1) / mapData.tilesets[0].columns) * (mapData.tilesets[0].tileheight + mapData.tilesets[0].margin);

	                        ctx.drawImage(_this3.image, tile.tileX, tile.tileY, mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin, mapData.tilesets[0].tileheight + mapData.tilesets[0].margin, tile.x, tile.y, mapData.tilesets[0].tilewidth + mapData.tilesets[0].margin, mapData.tilesets[0].tileheight + mapData.tilesets[0].margin);
	                    }
	                });
	                _this3.mapImages.push({ map: ctx.canvas, zIndex: 2 });
	            });
	            this.mapImages.forEach(function (image, index, tab) {
	                new _MapDrawLayers2.default(_this3.game, {
	                    mapImages: image.map,
	                    zIndex: image.zIndex,
	                    index: index,
	                    tabLength: tab.length,
	                    image: _this3.image
	                });
	            });
	        }
	    }, {
	        key: 'generateTwoDimensionalLayers',
	        value: function generateTwoDimensionalLayers(mapData) {
	            var _this4 = this;

	            this.twoDimensionalLayers = [];

	            mapData.layers.forEach(function (layer) {
	                var twoDimensional = [];
	                var mapDataLayers = layer.data;
	                var k = -1;

	                for (var i = 0; i < mapDataLayers.length; i++) {
	                    if (i % mapData.width === 0) {
	                        k++;
	                        twoDimensional[k] = [];
	                    }
	                    var tile = {};

	                    twoDimensional[k].push(mapDataLayers[i]);
	                }
	                _this4.twoDimensionalLayers.push({ layer: twoDimensional });
	            });

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

	    }]);

	    return Map;
	}();

	exports.default = Map;

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MapDrawLayers = function (_ObjectSettings2) {
	    _inherits(MapDrawLayers, _ObjectSettings2);

	    function MapDrawLayers(game, options) {
	        _classCallCheck(this, MapDrawLayers);

	        var _this = _possibleConstructorReturn(this, (MapDrawLayers.__proto__ || Object.getPrototypeOf(MapDrawLayers)).call(this, game, options));

	        _this.game = game;
	        _this.mapImages = options.mapImages;
	        _this.zIndex = options.zIndex;
	        _this.type = 'layers';
	        _this.static = true;
	        _this.generateMask();
	        return _this;
	    }

	    _createClass(MapDrawLayers, [{
	        key: 'generateMask',
	        value: function generateMask() {
	            var _this2 = this;

	            setTimeout(function () {
	                var ctx = document.createElement("canvas").getContext("2d");
	                ctx.canvas.width = 500;
	                ctx.canvas.height = 500;

	                _this2.imageMask = ctx.canvas;
	            }, 1000);
	        }
	    }, {
	        key: 'draw',
	        value: function draw(dt) {
	            if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                this.context.save();
	                this.context.globalAlpha = this.objAlfa;
	            }

	            this.context.drawImage(this.mapImages, this.game.camera.xScroll || 0, this.game.camera.yScroll || 0, this.game.width, this.game.height, 0, 0, this.game.width, this.game.height);

	            if (this.objAlfa !== 1) {
	                this.context.restore();
	            }
	        }
	    }]);

	    return MapDrawLayers;
	}(_ObjectSettings4.default);

	;

	exports.default = MapDrawLayers;

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Physic = function () {
	    function Physic(game) {
	        _classCallCheck(this, Physic);

	        this.game = game;
	    }

	    _createClass(Physic, [{
	        key: 'outOfScreen',
	        value: function outOfScreen(item, callback) {
	            if (Array.isArray(item)) {
	                for (var i = 0, max = item.length; i < max; i++) {
	                    if (item[i] && item[i].used && !item[i].static) {
	                        this.outOfScreenHandler(item[i], callback);
	                    }
	                }
	            } else {
	                this.outOfScreenHandler(item, callback);
	            }
	        }
	        // Poprawic by dzialaly poprawnie wszystkie kierunki

	    }, {
	        key: 'outOfScreenHandler',
	        value: function outOfScreenHandler(item, callback) {
	            if (item) {
	                if (item.type === 'CAMERA') {
	                    return false;
	                }
	                if (!item.isOutOfScreen) {
	                    if (item.y >= this.game.height + this.game.camera.yScroll || item.y + item.height <= 0 + this.game.camera.yScroll) {
	                        item.isOutOfScreen = true;

	                        if (typeof callback === 'function') {
	                            return callback.call(this, item);
	                        }
	                    } else if (item.x >= this.game.width + this.game.camera.xScroll || item.x + item.width <= 0 + this.game.camera.xScroll) {
	                        item.isOutOfScreen = true;
	                        if (typeof callback === 'function') {
	                            return callback.call(this, item);
	                        }
	                    }
	                } else if (item.isOutOfScreen) {
	                    if (item.x < this.game.width + this.game.camera.xScroll && item.x + item.width > 0 + this.game.camera.xScroll && item.y < this.game.height + this.game.camera.yScroll && item.y + item.height > 0 + this.game.camera.yScroll) {
	                        return item.isOutOfScreen = false;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'overlap',
	        value: function overlap(obj1, obj2, margin, callback, bounds) {
	            if (!obj1 || !obj2 || Array.isArray(obj1) && obj1.length <= 0 || Array.isArray(obj2) && obj2.length <= 0) {
	                return false;
	            }
	            if (!Array.isArray(obj1) && Array.isArray(obj2)) {
	                if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object') {
	                    for (var i = 0, max = obj2.length; i < max; i++) {
	                        if (obj2[i] !== null && obj1 !== null && obj1 !== obj2[i]) {
	                            this.collectedHandler(obj1, obj2[i], margin, callback, bounds);
	                        }
	                    }
	                } else {
	                    throw 'overlap(): oczekiwano obiektu jako pierwszy parametr';
	                }
	            }
	            if (Array.isArray(obj1) && !Array.isArray(obj2)) {
	                if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object') {
	                    for (var _i = 0, _max = obj1.length; _i < _max; _i++) {
	                        this.collectedHandler(obj1[_i], obj2, margin, callback, bounds);
	                    }
	                } else {
	                    throw 'overlap(): oczekiwano obiektu jako drugi parametr';
	                }
	            }
	            if (Array.isArray(obj1) && Array.isArray(obj2)) {
	                for (var _i2 = 0, _max2 = obj1.length; _i2 < _max2; _i2++) {
	                    if (obj1[_i2]) {
	                        obj1[_i2].checked = false;
	                    } else {
	                        return false;
	                    }
	                    for (var j = 0, max1 = obj2.length; j < max1; j++) {
	                        if (obj2[j]) {
	                            obj2[j].checked = false;
	                            this.collectedHandler(obj1[_i2], obj2[j], margin, callback, bounds);
	                        } else {
	                            return false;
	                        }
	                    }
	                }
	            }
	            if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
	                obj1.checked = false;
	                obj2.checked = false;
	                this.collectedHandler(obj1, obj2, margin, callback, bounds);
	            }
	        }
	    }, {
	        key: 'collectedHandler',
	        value: function collectedHandler(entity1, entity2, margin, callback, bounds) {
	            if (entity1 != entity2 && entity1 && entity2) {
	                if (entity1.useCollision && entity2.useCollision) {
	                    var vX = entity1.x + (entity1.halfWidth - margin) - (entity2.x + (entity2.halfWidth - margin)),
	                        vY = entity1.y + (entity1.halfHeight - margin) - (entity2.y + (entity2.halfHeight - margin)),
	                        hWidths = entity1.halfWidth - margin + (entity2.halfWidth - margin),
	                        hHeights = entity1.halfHeight - margin + (entity2.halfHeight - margin),
	                        colDir = null;

	                    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
	                        if (typeof callback === 'function') {
	                            return callback.call(this, this, entity1, entity2, colDir);
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'collide',
	        value: function collide(obj1, obj2, callback, bounds) {
	            if (!obj1 || !obj2 || Array.isArray(obj1) && obj1.length <= 0 || Array.isArray(obj2) && obj2.length <= 0) {
	                return false;
	            }

	            if (!Array.isArray(obj1) && Array.isArray(obj2)) {
	                if ((typeof obj1 === 'undefined' ? 'undefined' : _typeof(obj1)) === 'object') {
	                    for (var i = 0, max = obj2.length; i < max; i++) {
	                        if (obj2[i] !== null && obj2[i].used) this.collideHandler(obj1, obj2[i], callback, bounds);
	                    }
	                } else {
	                    throw 'oczekiwano obiektu jako pierwszy parametr';
	                }
	            }
	            if (Array.isArray(obj1) && !Array.isArray(obj2)) {
	                if ((typeof obj2 === 'undefined' ? 'undefined' : _typeof(obj2)) === 'object') {
	                    for (var _i3 = 0, _max3 = obj1.length; _i3 < _max3; _i3++) {
	                        this.collideHandler(obj1[_i3], obj2, callback, bounds);
	                    }
	                } else {
	                    throw 'oczekiwano obiektu jako drugi parametr';
	                }
	            }
	            if (Array.isArray(obj1) && Array.isArray(obj2)) {
	                for (var _i4 = 0, _max4 = obj1.length; _i4 < _max4; _i4++) {
	                    if (obj1[_i4] && obj1[_i4].used) {
	                        obj1[_i4].checked = false;
	                    }
	                    for (var j = 0, max1 = obj2.length; j < max1; j++) {
	                        if (obj2[j] && obj2[j].used) {
	                            obj2[j].checked = false;

	                            this.collideHandler(obj1[_i4], obj2[j], callback, bounds);
	                        }
	                    }
	                }
	            }
	            if (!Array.isArray(obj1) && !Array.isArray(obj2)) {
	                obj1.checked = false;
	                obj2.checked = false;
	                this.collideHandler(obj1, obj2, callback, bounds);
	            }
	        }
	    }, {
	        key: 'collideHandler',
	        value: function collideHandler(entity1, entity2, callback, bounds) {
	            if (entity1 && entity2 && entity1 != entity2) {
	                //if(!entity1.checked && !entity2.checked && entity1.useCollision && entity2.useCollision){
	                if (entity1.useCollision && entity2.useCollision) {

	                    var vX = entity1.x + entity1.halfWidth - (entity2.x + entity2.halfWidth),
	                        vY = entity1.y + entity1.halfHeight - (entity2.y + entity2.halfHeight),
	                        hWidths = entity1.halfWidth + entity2.halfWidth,
	                        hHeights = entity1.halfHeight + entity2.halfHeight,
	                        colDir = null;

	                    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
	                        var oX = hWidths - Math.abs(vX),
	                            oY = hHeights - Math.abs(vY);

	                        if (oX >= oY) {
	                            if (vY > 0) {
	                                colDir = "u";
	                                entity1.y += entity1.body.immoveable ? oY : 0;
	                                entity2.y -= entity2.body.immoveable ? oY : 0;

	                                entity1.body.velocity.y = bounds ? entity1.body.velocity.y * -1 : entity1.body.velocity.y;
	                                entity2.body.velocity.y = bounds ? entity2.body.velocity.y * -1 : entity2.body.velocity.y;
	                            } else {
	                                colDir = "d";
	                                entity1.y -= entity1.body.immoveable ? oY : 0;
	                                entity2.y += entity2.body.immoveable ? oY : 0;

	                                //entity1.body.falling = false;
	                                //entity1.body.jumping = false;
	                                entity1.body.velocity.y = bounds ? entity1.body.velocity.y * -1 : 0;
	                                entity2.body.velocity.y = bounds ? entity2.body.velocity.y * -1 : entity2.body.velocity.y;
	                            }
	                        } else {
	                            if (vX > 0) {
	                                colDir = "l";
	                                entity1.x += entity1.body.immoveable ? oX : 0;
	                                entity2.x -= entity2.body.immoveable ? oX : 0;
	                                entity2.body.pushedLeft = !entity2.body.pushedLeft ? true : false;
	                                entity1.body.velocity.x = bounds ? entity1.body.velocity.x * -1 : entity1.body.velocity.x;
	                                entity2.body.velocity.x = bounds ? entity2.body.velocity.x * -1 : entity2.body.velocity.x;
	                            } else {
	                                colDir = "r";
	                                entity1.x -= entity1.body.immoveable ? oX : 0;
	                                entity2.x += entity2.body.immoveable ? oX : 0;
	                                entity2.body.pushedRight = !entity2.body.pushedRight ? true : false;
	                                entity1.body.velocity.x = bounds ? entity1.body.velocity.x * -1 : entity1.body.velocity.x;
	                                entity2.body.velocity.x = bounds ? entity2.body.velocity.x * -1 : entity2.body.velocity.x;
	                            }
	                        }
	                        if (colDir != null) {
	                            entity1.checked = true;
	                            entity2.checked = true;

	                            if (typeof callback === 'function') {
	                                return callback.call(this, entity1, entity2, colDir, oY, oX);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'inRange',
	        value: function inRange(circle, rect, radius, callback) {
	            if (Array.isArray(rect)) {
	                for (var i = 0, max = rect.length; i < max; i++) {
	                    this.rectCircleColliding(circle, rect[i], radius, callback);
	                }
	            } else {
	                this.rectCircleColliding(circle, rect, radius, callback);
	            }
	        }
	    }, {
	        key: 'rectCircleColliding',
	        value: function rectCircleColliding(circle, rect, radius, callback) {
	            var distX = Math.abs(circle.x + circle.halfWidth - rect.x - rect.halfWidth);
	            var distY = Math.abs(circle.y + circle.halfHeight - rect.y - rect.halfHeight);
	            var dx = void 0;
	            var dy = void 0;
	            if (distX > rect.halfWidth + radius) {
	                return rect.used = false;
	            }
	            if (distY > rect.halfHeight + radius) {
	                return rect.used = false;
	            }

	            if (!rect.used) {
	                if (distX <= rect.halfWidth) {
	                    return true;
	                }
	                if (distY <= rect.halfHeight) {
	                    return true;
	                }

	                dx = distX - rect.halfWidth;
	                dy = distY - rect.halfHeight;

	                if (typeof callback === 'function') {
	                    rect.used = true;
	                    return callback.call(Leya, circle, rect);
	                } else {
	                    return false;
	                }
	            }
	        }
	    }]);

	    return Physic;
	}();

	;

	exports.default = Physic;

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Mouse = function () {
	    function Mouse(game) {
	        _classCallCheck(this, Mouse);

	        this.game = game;
	        //
	        this.platform = this.game.mobile.platform;
	        this.used = true;
	        this.click = false;
	        this.hover = false;
	        this.down = false;
	        this.trig = false;
	        this.sellectedObj = false;
	        this.hoveredObj = false;
	        this.mouseX = null;
	        this.mouseY = null;
	        this.currentTouches = [];
	        this.touchesIntersects = [];
	        this.currentTouchesActive = [];
	    }

	    _createClass(Mouse, [{
	        key: "initialize",
	        value: function initialize() {
	            var _this = this;

	            // this.game.canvas.addEventListener("mousemove", (e) => { this.mouseMove(e) }, false);
	            this.game.canvas.addEventListener("mousedown", function (e) {
	                _this.mouseDown(e);
	            }, false);
	            this.game.canvas.addEventListener("touchstart", function (e) {
	                _this.touchStart(e);
	            }, false);
	            this.game.canvas.addEventListener("touchmove", function (e) {
	                _this.touchMove(e);
	            }, false);
	            this.game.canvas.addEventListener("touchend", function (e) {
	                _this.touchEnded(e);
	            }, false);
	            this.game.canvas.addEventListener("mouseup", function (e) {
	                _this.mouseUp(e);
	            }, false);
	            // this.game.canvas.addEventListener("contextmenu", (e) => { this.mousedown(e) }, false);
	        }
	    }, {
	        key: "enableHover",
	        value: function enableHover() {
	            this.hover = true;
	        }
	    }, {
	        key: "disableHover",
	        value: function disableHover() {
	            this.hover = false;
	        }
	    }, {
	        key: "findCurrentActiveTouchIndex",
	        value: function findCurrentActiveTouchIndex(id) {
	            for (var i = 0; i < this.currentTouchesActive.length; i++) {
	                if (this.currentTouchesActive[i].id === id) {
	                    return i;
	                }
	            }
	            // Touch not found! Return -1.
	            return -1;
	        }
	    }, {
	        key: "findCurrentTouchIndex",
	        value: function findCurrentTouchIndex(id) {
	            for (var i = 0; i < this.currentTouches.length; i++) {
	                if (this.currentTouches[i].id === id) {
	                    return i;
	                }
	            }
	            // Touch not found! Return -1.
	            return -1;
	        }
	    }, {
	        key: "mouseMove",
	        value: function mouseMove(e) {
	            e.preventDefault();
	            this.mouseX = e.offsetX / this.game.scale1;
	            this.mouseY = e.offsetY / this.game.scale1;
	            if (this.dragged) {
	                this.dragged.x = this.mouseX - this.dragged.halfWidth;
	                this.dragged.y = this.mouseY - this.dragged.halfHeight;
	                if (this.sellectedObj) {
	                    this.sellectedObj.border.x = this.dragged.x;
	                    this.sellectedObj.border.y = this.dragged.y;
	                }
	            } else if (this.hover) {
	                var gameObjects = this.game.gameObjects.length;

	                while (gameObjects--) {
	                    if (this.updateStats(this.game.gameObjects[gameObjects], this.game.gameObjects[gameObjects].immovable, this.game.gameObjects[gameObjects].hold)) {
	                        if (this.game.gameObjects[gameObjects].onHover) {
	                            if (this.hoveredObj.objID === this.game.gameObjects[gameObjects].objID) {
	                                return false;
	                            }
	                            this.hoveredObj = this.game.gameObjects[gameObjects];
	                            return this.game.gameObjects[gameObjects].onHover(this, this.game.gameObjects[gameObjects]);
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "touchMove",
	        value: function touchMove(e) {
	            e.preventDefault();
	            var touches = e.changedTouches;
	            if (this.dragged) {
	                for (var i = 0; i < touches.length; i++) {
	                    var touch = touches[i];
	                    var index = this.findCurrentTouchIndex(touch.identifier);

	                    if (!this.currentTouches[index].hold) {
	                        this.currentTouches[index].hold = true;
	                    }

	                    this.currentTouches[index].pageX = touch.pageX / this.game.scale1;
	                    this.currentTouches[index].pageY = touch.pageY / this.game.scale1;
	                    if (this.dragged) {
	                        this.dragged.x = this.currentTouches[index].pageX - this.dragged.halfWidth;
	                        this.dragged.y = this.currentTouches[index].pageY - this.dragged.halfHeight;
	                    }
	                }
	            }
	        }
	    }, {
	        key: "touchStart",
	        value: function touchStart(e) {
	            e.preventDefault();
	            var touches = e.changedTouches;
	            // let touch = e.changedTouches[0];
	            this.click = this.used ? true : false;

	            for (var i = 0; i < touches.length; i++) {
	                var touch = touches[i];

	                this.currentTouches.push({
	                    id: touch.identifier,
	                    pageX: touch.pageX / this.game.scale1,
	                    pageY: touch.pageY / this.game.scale1,
	                    interactive: false,
	                    hold: false,
	                    obj: null
	                });
	            }
	        }
	    }, {
	        key: "touchEnded",
	        value: function touchEnded(e) {
	            var touches = e.changedTouches;
	            this.down = false;
	            this.click = false;
	            if (this.dragged) {
	                this.dragged.zIndex = this.orginalZindex;
	                this.game.sortByIndex();
	                this.draggedAction(this, this.dragged);

	                this.dragged = false;
	            }
	            for (var i = 0; i < touches.length; i++) {
	                var touch = touches[i];

	                var currentTouchActiveIndex = this.findCurrentActiveTouchIndex(touch.identifier);

	                if (currentTouchActiveIndex >= 0) {
	                    var currentActiveTouch = this.currentTouchesActive[currentTouchActiveIndex];
	                    if (currentActiveTouch.obj) {
	                        currentActiveTouch.obj.touchActive = false;
	                        currentActiveTouch.obj.hovered = false;
	                    }

	                    this.currentTouchesActive.splice(currentTouchActiveIndex, 1);
	                } else {
	                    // console.log('Touch active was not found!');
	                }

	                var currentTouchIndex = this.findCurrentTouchIndex(touch.identifier);

	                if (currentTouchIndex >= 0) {
	                    var currentTouch = this.currentTouches[currentTouchIndex];

	                    this.currentTouches.splice(currentTouch, 1);
	                } else {
	                    //console.log('Touch was not found!');
	                }
	            }
	        }
	    }, {
	        key: "mouseDown",
	        value: function mouseDown(e) {
	            e.preventDefault();
	            //
	            this.mouseX = e.offsetX / this.game.scale1;
	            this.mouseY = e.offsetY / this.game.scale1;
	            this.click = this.used ? true : false;
	            this.down = true;
	            this.trig = false;

	            this.game.sortByIndex();

	            var gameObjects = this.game.gameObjects.length;

	            // for (let i = this.game.gameObjects.length - 1; i >= 0; i--) {
	            while (gameObjects--) {
	                if (this.game.gameObjects[gameObjects].used) {
	                    if (this.updateStats(this.game.gameObjects[gameObjects], this.game.gameObjects[gameObjects].immovable, this.game.gameObjects[gameObjects].hold)) {
	                        if (this.game.gameObjects[gameObjects].onSelect || this.game.gameObjects[gameObjects].onDeselect || this.game.gameObjects[gameObjects].onClick) {
	                            if (this.sellectedObj) {
	                                if (this.game.gameObjects[gameObjects].onClick && this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
	                                    this.sellectedObj.onClick(this, this.sellectedObj, this.sellectedObj);
	                                    return false;
	                                } else if (this.game.gameObjects[gameObjects].onDrag && this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
	                                    this.dragged = this.game.gameObjects[gameObjects];
	                                    this.draggedStartX = this.dragged.x;
	                                    this.draggedStartY = this.dragged.y;
	                                    this.orginalZindex = this.dragged.zIndex;
	                                    this.dragged.zIndex = 100;
	                                    this.game.sortByIndex();
	                                    this.draggedAction = this.dragged.onDrag;
	                                    return false;
	                                } else if (this.game.gameObjects[gameObjects].onDeselect) {
	                                    this.sellectedObj.onDeselect(this, this.sellectedObj);
	                                    if (this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
	                                        this.sellectedObj = null;
	                                        return false;
	                                    }
	                                    this.sellectedObj = null;
	                                }
	                            }
	                            if (this.game.gameObjects[gameObjects].onSelect) {
	                                this.sellectedObj = this.game.gameObjects[gameObjects];
	                                this.game.gameObjects[gameObjects].onSelect(this, this.sellectedObj);
	                                return;
	                            } else if (this.game.gameObjects[gameObjects].onClick) {
	                                this.game.gameObjects[gameObjects].onClick(this, this.sellectedObj, this.game.gameObjects[gameObjects]);
	                                this.sellectedObj = null;
	                                return;
	                            } else if (this.game.gameObjects[gameObjects].onDrag) {
	                                this.dragged = this.game.gameObjects[gameObjects];
	                                this.draggedStartX = this.dragged.x;
	                                this.draggedStartY = this.dragged.y;
	                                this.orginalZindex = this.dragged.zIndex;
	                                this.dragged.zIndex = 100;
	                                this.game.sortByIndex();
	                                this.draggedAction = this.dragged.onDrag;
	                            }
	                        }
	                        // if (this.game.gameObjects[gameObjects].onSelect) {
	                        //     if (this.sellectedObj) {
	                        //         if (this.game.gameObjects[gameObjects].onDeselect) {
	                        //             this.sellectedObj.onDeselect(this, this.sellectedObj);
	                        //         }

	                        //         if (this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
	                        //             return false;
	                        //         }
	                        //     }
	                        //     this.sellectedObj = this.game.gameObjects[gameObjects];
	                        //     this.game.gameObjects[gameObjects].onSelect(this, this.game.gameObjects[gameObjects]);
	                        //     return;
	                        // } else if (this.game.gameObjects[gameObjects].onClick) {
	                        //     return this.game.gameObjects[gameObjects].onClick(this, this.game.gameObjects[gameObjects]);
	                        // } else if (this.game.gameObjects[gameObjects].onDrag) {
	                        //     this.dragged = this.game.gameObjects[gameObjects];
	                        //     this.draggedStartX = this.dragged.x;
	                        //     this.draggedStartY = this.dragged.y;
	                        //     this.orginalZindex = this.dragged.zIndex;
	                        //     this.dragged.zIndex = 100;
	                        //     this.game.sortByIndex();
	                        //     this.draggedAction = this.dragged.onDrag;
	                        //     return;
	                        // }
	                        // else {
	                        //     return console.warn('klikniety element nie ma przypietego zdarzenie onClick')
	                        // }
	                    }
	                }
	            }

	            if (this.triggerHandler && typeof this.triggerHandler === 'function') {
	                this.triggerHandler(this);
	            }
	        }
	    }, {
	        key: "mouseUp",
	        value: function mouseUp(e) {
	            e.preventDefault();
	            //
	            this.down = false;
	            this.click = false;
	            if (this.dragged) {
	                this.dragged.zIndex = this.orginalZindex;

	                this.draggedAction(this, this.dragged, this.draggedStartX, this.draggedStartY);
	                this.game.sortByIndex();

	                this.dragged = false;
	            }
	        }
	    }, {
	        key: "intersects",
	        value: function intersects(obj, immovable) {
	            var t = 2; //tolerance
	            var tempMouseY = this.mouseY;
	            var tempMouseX = this.mouseX;
	            var xIntersect = void 0;
	            var yIntersect = void 0;

	            if (this.platform === 'desktop') {
	                if (!immovable) {
	                    tempMouseX = tempMouseX + this.game.camera.xScroll;
	                    tempMouseY = tempMouseY + this.game.camera.yScroll;
	                }

	                xIntersect = tempMouseX + t >= obj.x && tempMouseX + t <= obj.x + obj.width;
	                yIntersect = tempMouseY + t >= obj.y && tempMouseY - t <= obj.y + obj.height;
	            } else if (this.platform === 'mobile') {
	                for (var i = 0; i < this.currentTouches.length; i++) {
	                    tempMouseY = this.currentTouches[i].pageY;
	                    tempMouseX = this.currentTouches[i].pageX - this.game.canvas.offsetLeft;

	                    if (!immovable) {
	                        tempMouseX = tempMouseX + this.game.camera.xScroll;
	                        tempMouseY = tempMouseY + this.game.camera.yScroll;
	                    }

	                    xIntersect = tempMouseX + t >= obj.x && tempMouseX + t <= obj.x + obj.width;
	                    yIntersect = tempMouseY + t >= obj.y && tempMouseY - t <= obj.y + obj.height;
	                }
	            }
	            return xIntersect && yIntersect;
	        }

	        // touchIntersects(obj, immovable, callback) {
	        //     const t = 2; //tolerance

	        //     if (Array.isArray(obj)) {
	        //         for (let i = 0; i < this.currentTouches.length; i++) {
	        //             for (let j = 0; j < obj.length; j++) {

	        //                 if (!obj[j].touchActive && !obj[j].hovered) {
	        //                     let tempMouseY = this.currentTouches[i].pageY / this.game.scale1;
	        //                     let tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft) / this.game.scale1;

	        //                     if (!immovable) {
	        //                         tempMouseX = tempMouseX + (this.game.camera.xScroll);
	        //                         tempMouseY = tempMouseY + (this.game.camera.yScroll);
	        //                     }

	        //                     let xIntersect = (tempMouseX + t) >= obj[j].x && (tempMouseX + t) <= obj[j].x + obj[j].width;
	        //                     let yIntersect = (tempMouseY + t) >= obj[j].y && (tempMouseY - t) <= obj[j].y + obj[j].height;

	        //                     this.currentTouches[i].interactive = xIntersect && yIntersect;

	        //                     if (this.currentTouches[i].interactive) {
	        //                         obj[j].touchActive = true;
	        //                         obj[j].hovered = true;

	        //                         this.currentTouchesActive.push({
	        //                             id: this.currentTouches[i].id,
	        //                             obj: obj[j]
	        //                         });

	        //                         callback.call(this, obj[j]);
	        //                     }
	        //                 }
	        //             }
	        //         }
	        //     } else {
	        //         for (let i = 0; i < this.currentTouches.length; i++) {

	        //             if (!obj.touchActive && !obj.hovered) {
	        //                 let tempMouseY = this.currentTouches[i].pageY / this.game.scale1;
	        //                 let tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft) / this.game.scale1;

	        //                 if (!immovable) {
	        //                     tempMouseX = tempMouseX + (this.game.camera.xScroll);
	        //                     tempMouseY = tempMouseY + (this.game.camera.yScroll);
	        //                 }

	        //                 let xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.width;
	        //                 let yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.height;

	        //                 this.currentTouches[i].interactive = xIntersect && yIntersect;

	        //                 if (this.currentTouches[i].interactive) {

	        //                     obj.touchActive = true;
	        //                     obj.hovered = true;
	        //                     if (this.sellectedObj) {
	        //                         this.sellectedObj.sellected = false;
	        //                     }
	        //                     this.sellectedObj = obj;
	        //                     this.sellectedObj.sellected = true;

	        //                     this.currentTouchesActive.push({
	        //                         id: this.currentTouches[i].id,
	        //                         obj: obj
	        //                     });

	        //                     this.currentTouches.splice(i, 1);
	        //                     if (typeof callback === 'function') {
	        //                         callback.call(this, obj);
	        //                     }

	        //                     //return false; 
	        //                 }
	        //             }
	        //         }
	        //     }
	        // }

	        // intersectsSprite(obj, immovable) {
	        //     const t = 2; //tolerance

	        //     const xIntersect = (this.mouseX + t) >= obj.x && (this.mouseX + t) <= obj.x + obj.states[obj.state].fW;
	        //     const yIntersect = (this.mouseY + t) >= obj.y && (this.mouseY - t) <= obj.y + obj.states[obj.state].fH;

	        //     return xIntersect && yIntersect;
	        // }

	    }, {
	        key: "updateHoverStats",
	        value: function updateHoverStats(obj, immovable) {
	            if (this.intersects(obj, immovable)) {
	                obj.hovered = true;
	                return true;
	            } else {
	                obj.hovered = false;
	            }
	        }
	    }, {
	        key: "updateStats",
	        value: function updateStats(obj, immovable, hold) {
	            if (this.intersects(obj, immovable)) {
	                obj.hovered = true;

	                obj.hovered = true;
	                if (!hold) {
	                    this.click = false;
	                    obj.touchActive = true;
	                }
	                return true;
	            } else {
	                obj.hovered = false;
	                return false;
	            }
	        }

	        // touchtrigger(obj, immovable, callback, hold) {
	        //     if (this.click ) {
	        //         //  console.log('aaa')
	        //         if (!this.trig) {
	        //             this.trig = hold ? true : false;

	        //             if (Array.isArray(obj)) {
	        //                 for (let u = obj.length - 1; u >= 0; u--) {
	        //                     if (this.updateTouchStats(obj[u], immovable, hold)[u]) {
	        //                         callback.call(this, obj[u]);
	        //                     }
	        //                 }
	        //                 this.trig = false;
	        //                 return false
	        //             }
	        //             else if (typeof obj === 'object' && obj != null) {
	        //                 let tab = this.updateTouchStats(obj, immovable, hold);

	        //                 for (let i = 0; i < tab.length; i++) {
	        //                     if (tab[i]) {
	        //                         callback.call(this, obj);
	        //                     }
	        //                 }
	        //                 this.trig = false;
	        //                 return false
	        //             }
	        //             else if (obj === null) {
	        //                 if (typeof callback === 'function') {
	        //                     this.click = false;
	        //                     this.trig = false;
	        //                     this.down = false;
	        //                     callback.call(this);
	        //                 }
	        //             }
	        //         }
	        //     }
	        // }

	    }, {
	        key: "drag",
	        value: function drag(obj, immovable, callback) {

	            if (this.click || this.currentTouches.length > 0) {

	                if (!this.trig && !this.dragged) {
	                    if (Array.isArray(obj)) {
	                        for (var u = obj.length - 1; u >= 0; u--) {
	                            if (this.updateStats(obj[u], immovable, false)) {
	                                if (!this.dragged) {
	                                    this.dragged = obj[u];
	                                    this.orginalZindex = this.dragged.zIndex;
	                                    this.dragged.zIndex = 100;
	                                    this.game.sortByIndex();

	                                    this.draggedAction = callback;
	                                }
	                            }
	                        }
	                    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                        if (this.updateStats(obj, immovable, true)) {
	                            if (!this.dragged) {
	                                this.dragged = obj;
	                                this.orginalZindex = this.dragged.zIndex;
	                                this.dragged.zIndex = 100;
	                                this.game.sortByIndex();
	                                this.draggedAction = callback;
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "trigger",
	        value: function trigger(callback) {
	            this.triggerHandler = callback;
	        }
	        // trigger(obj, immovable, hold) {
	        //     if (this.click) {
	        //         if (!this.trig) {

	        //             this.trig = hold ? true : false;

	        //             if (Array.isArray(obj)) {
	        //                 this.game.sortArrayByIndex(obj);
	        //                 console.log('a')
	        //                 for (let u = obj.length - 1; u >= 0; u--) {
	        //                     if (this.updateStats(obj[u], immovable, hold)) {
	        //                         return callback.call(this, this, obj[u]);
	        //                     }
	        //                 }
	        //                 this.trig = false;
	        //             }
	        //             else if (obj === null) {
	        //                 this.game.sortByIndex();

	        //                 let gameObjects = this.game.gameObjects.length;

	        //                 // for (let i = this.game.gameObjects.length - 1; i >= 0; i--) {
	        //                 while (gameObjects--) {
	        //                     if (this.updateStats(this.game.gameObjects[gameObjects], immovable, hold)) {
	        //                         if (this.game.gameObjects[gameObjects].onClick) {
	        //                             return this.game.gameObjects[gameObjects].onClick(this, this.game.gameObjects[gameObjects]);
	        //                         } else {
	        //                             return console.warn('klikniety element nie ma przypietego zdarzenie onClick')
	        //                         }
	        //                     }
	        //                 }

	        //                 if (!hold) {
	        //                     this.click = false;
	        //                 }

	        //                 this.trig = false;
	        //             }
	        //             // else if (obj === null) {
	        //             //     if (!hold) {
	        //             //         this.click = false;
	        //             //     }
	        //             //     if (typeof callback === 'function') {

	        //             //         this.trig = false;
	        //             //         this.down = false;
	        //             //         return callback.call(this, this);
	        //             //     }
	        //             // }
	        //         }

	        //     }
	        // }

	    }, {
	        key: "sellect",
	        value: function sellect(obj, immovable, callback, hold) {
	            if (this.click || this.currentTouches.length > 0) {
	                if (!this.trig) {

	                    this.trig = hold ? true : false;
	                    if (this.sellectedObj === obj) {
	                        // console.log('a')
	                        return;
	                    }
	                    if (Array.isArray(obj)) {
	                        for (var u = obj.length - 1; u >= 0; u--) {
	                            if (this.updateStats(obj[u], immovable, hold)) {
	                                if (this.sellectedObj) {
	                                    this.sellectedObj.sellectedObj = false;
	                                    this.sellectedObj.border.hide();
	                                }
	                                this.sellectedObj = obj;
	                                this.sellectedObj.sellected = true;
	                                this.showObjBorder();
	                                if (typeof callback === 'function') {
	                                    callback.call(this, obj[u]);
	                                }
	                            }
	                        }
	                        this.trig = false;
	                    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                        if (this.updateStats(obj, immovable, hold)) {
	                            if (this.sellectedObj) {
	                                this.sellectedObj.sellected = false;
	                                this.sellectedObj.border.hide();
	                            }
	                            this.sellectedObj = obj;
	                            this.sellectedObj.sellected = true;
	                            this.showObjBorder();
	                            if (typeof callback === 'function') {
	                                callback.call(this, obj);
	                            }
	                        }
	                        this.trig = false;
	                    } else if (obj === null) {
	                        if (typeof callback === 'function') {
	                            this.click = false;
	                            this.trig = false;
	                            this.down = false;
	                            if (this.sellectedObj) {
	                                this.sellectedObj.sellected = false;
	                                this.sellectedObj.border.hide();
	                            }
	                            this.sellectedObj = obj;
	                            this.sellectedObj.sellected = true;
	                            this.showObjBorder();
	                            if (typeof callback === 'function') {
	                                callback.call(this);
	                            }
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: "onHover",
	        value: function onHover(obj, immovable, callback) {
	            if (Array.isArray(obj)) {
	                for (var u = 0, uMax = obj.length; u < uMax; u++) {
	                    if (this.updateHoverStats(obj[u], immovable)) {
	                        if (typeof callback === 'function') {
	                            return callback.call(this, obj[u]);
	                        }
	                    }
	                }
	            } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && obj != null) {
	                if (this.updateHoverStats(obj, immovable)) {
	                    if (typeof callback === 'function') {
	                        return callback.call(this, obj);
	                    }
	                }
	            } else if (!obj) {
	                return false;
	            }
	        }
	    }, {
	        key: "showObjBorder",
	        value: function showObjBorder() {
	            this.sellectedObj.border.show();
	            this.sellectedObj.border.width = this.sellectedObj.width;
	            this.sellectedObj.border.height = this.sellectedObj.height;
	            this.sellectedObj.border.x = this.sellectedObj.x;
	            this.sellectedObj.border.y = this.sellectedObj.y;
	        }
	    }]);

	    return Mouse;
	}();

	exports.default = Mouse;

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Keyboard = function () {
	    function Keyboard(game) {
	        _classCallCheck(this, Keyboard);

	        this.game = game;
	        this.keysPressed = 0;
	        this.use = {
	            'left': {
	                hold: false,
	                pressed: false,
	                name: "left"
	            },
	            'up': {
	                hold: false,
	                pressed: false,
	                name: "up"
	            },
	            'down': {
	                hold: false,
	                pressed: false,
	                name: "down"
	            },
	            'right': {
	                hold: false,
	                pressed: false,
	                name: "right"
	            },
	            'W': {
	                hold: false,
	                pressed: false,
	                name: "W"
	            },
	            'S': {
	                hold: false,
	                pressed: false,
	                name: "S"
	            },
	            'A': {
	                hold: false,
	                pressed: false,
	                name: "A"
	            },
	            'D': {
	                hold: false,
	                pressed: false,
	                name: "D"
	            },
	            'Q': {
	                hold: false,
	                pressed: false,
	                name: "D"
	            },
	            '1': {
	                hold: false,
	                pressed: false,
	                name: "1"
	            },

	            'SPACE': {
	                hold: false,
	                pressed: false,
	                name: "SPACE"
	            }
	        };

	        this.lastKeyCode = null;

	        this.keys = {
	            '37': 'left',
	            '38': 'up',
	            '40': 'down',
	            '39': 'right',
	            '87': 'W',
	            '83': 'S',
	            '65': 'A',
	            '68': 'D',
	            '49': '1',
	            '81': 'Q',

	            '32': 'SPACE'
	        };
	        this.hold = false;
	    }

	    _createClass(Keyboard, [{
	        key: 'initialize',
	        value: function initialize() {
	            var _this = this;

	            window.document.addEventListener("keydown", function (e) {
	                return _this.keyDown(e);
	            });
	            window.document.addEventListener("keyup", function (e) {
	                return _this.keyUp(e);
	            });
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(keyName) {
	            if (this.use[keyName].pressed) {
	                return true;
	            }
	        }
	    }, {
	        key: 'keyDown',
	        value: function keyDown(e) {
	            var code = e.which || e.keyCode;
	            var key = this.getKeyByCode(e, code);

	            if (!this.use[key]) {
	                return false;
	            }

	            if (this.lastKeyCode === code) {
	                this.use[key].hold = true;
	                return;
	            }

	            this.lastKeyCode = code;
	            this.use[key].pressed = true;
	            this.keysPressed++;

	            //this.game.multiplayer.emit("on move start", { type: key });
	        }
	    }, {
	        key: 'keyUp',
	        value: function keyUp(e) {
	            var code = e.which || e.keyCode;
	            var key = this.getKeyByCode(e, code);
	            this.hold = false;
	            this.lastKeyCode = null;
	            this.keysPressed--;
	            if (this.use[key] && (this.use[key].pressed || this.use[key].hold)) {
	                this.use[key].pressed = false;
	                this.use[key].hold = false;

	                // this.game.multiplayer.emit("on move stop", { type: key });
	            }
	        }
	    }, {
	        key: 'getKeyByCode',
	        value: function getKeyByCode(e, code) {
	            if (this.keys[code]) {
	                e.preventDefault();
	                return this.keys[code];
	            } else {
	                return;
	            }
	        }
	    }]);

	    return Keyboard;
	}();

	;

	exports.default = Keyboard;

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Pathfinder = __webpack_require__(78);

	var _Pathfinder2 = _interopRequireDefault(_Pathfinder);

	var _easystarjs = __webpack_require__(79);

	var _easystarjs2 = _interopRequireDefault(_easystarjs);

	var _Map = __webpack_require__(72);

	var _Map2 = _interopRequireDefault(_Map);

	var _Peasant = __webpack_require__(84);

	var _Peasant2 = _interopRequireDefault(_Peasant);

	var _Town = __webpack_require__(87);

	var _Town2 = _interopRequireDefault(_Town);

	var _GoldMine = __webpack_require__(89);

	var _GoldMine2 = _interopRequireDefault(_GoldMine);

	var _Hud = __webpack_require__(90);

	var _Hud2 = _interopRequireDefault(_Hud);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Main = function () {
	    function Main(game) {
	        _classCallCheck(this, Main);

	        this.game = game;
	    }

	    _createClass(Main, [{
	        key: "create",
	        value: function create() {
	            var _this = this;

	            new _Map2.default(this.game, {
	                key: 'world',
	                json: '../../jsons/map2.json'
	            }).then(function (map) {
	                _this.game.VAR.map = map;
	                new _Pathfinder2.default(_this.game, {
	                    json: '../../jsons/path2.json',
	                    isRender: true
	                }).then(function (pathfinder) {
	                    _this.game.VAR.pathfinder = pathfinder;

	                    _this.game.easystar = new _easystarjs2.default.js();
	                    _this.game.easystar.setGrid(_this.game.VAR.pathfinder.paths);
	                    _this.game.easystar.setAcceptableTiles([6, 5, 4, 3, 1]);
	                    _this.game.easystar.enableDiagonals();
	                    _this.game.easystar.enableCornerCutting();

	                    _this.game.VAR.cameraMan = _this.game.add.rect({
	                        x: 350,
	                        y: 400,
	                        width: 20,
	                        height: 20
	                    });

	                    _this.game.VAR.cameraSpeed = 700;

	                    _this.game.setPortView(2240, 2240);
	                    _this.game.add.camera({
	                        followed: _this.game.VAR.cameraMan
	                    });

	                    _this.game.VAR.player = new _Peasant2.default(_this.game, {
	                        key: 'peasant',
	                        x: 32 * 9,
	                        y: 32 * 4
	                    });

	                    for (var i = 0; i < 20; i++) {
	                        new _Peasant2.default(_this.game, {
	                            key: 'peasant',
	                            x: 32 * i,
	                            y: 32 * 12
	                        });
	                    }
	                    for (var _i = 0; _i < 20; _i++) {
	                        new _Peasant2.default(_this.game, {
	                            key: 'peasant',
	                            x: 32 * _i,
	                            y: 32 * 13
	                        });
	                    }
	                    for (var _i2 = 0; _i2 < 20; _i2++) {
	                        new _Peasant2.default(_this.game, {
	                            key: 'peasant',
	                            x: 32 * _i2,
	                            y: 32 * 14
	                        });
	                    }

	                    _this.game.VAR.town = new _Town2.default(_this.game, {
	                        key: 'buildings',
	                        x: 32 * 13,
	                        y: 32 * 11
	                    });

	                    _this.game.VAR.goldMine = new _GoldMine2.default(_this.game, {
	                        key: 'gold',
	                        x: 32 * 1,
	                        y: 32 * 7
	                    });

	                    new _Hud2.default(_this.game, {
	                        x: 0,
	                        y: 0,
	                        width: 32 * 5,
	                        height: _this.game.height,
	                        fill: 'gray',
	                        static: true

	                    });

	                    _this.game.VAR.sellectedObj = null;
	                    _this.game.VAR.sellectedBorder = _this.game.add.rect({ fill: null, strokeColor: 'yellow', zIndex: 2 });
	                    _this.game.VAR.sellectedBorder.hide();

	                    _this.normalMouseClick();
	                    // this.mouseElement = {
	                    //     x: this.game.mouse.mouseX,
	                    //     y: this.game.mouse.mouseY,
	                    //     halfHeight: 1,
	                    //     halfWidth: 1
	                    // }
	                    // this.game.add.camera({
	                    //     followed: this.mouseElement///this.game.VAR.player
	                    // });
	                });
	            });
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            if (this.game.VAR.cameraMan) {
	                if (this.game.keyboard.trigger('D') || this.game.keyboard.trigger('right')) {
	                    this.game.VAR.cameraMan.body.velocity.x = this.game.VAR.cameraSpeed;
	                } else if (this.game.keyboard.trigger('A') || this.game.keyboard.trigger('left')) {
	                    this.game.VAR.cameraMan.body.velocity.x = -this.game.VAR.cameraSpeed;
	                } else {
	                    this.game.VAR.cameraMan.body.velocity.x = 0;
	                }
	                if (this.game.keyboard.trigger('W') || this.game.keyboard.trigger('up')) {
	                    this.game.VAR.cameraMan.body.velocity.y = -this.game.VAR.cameraSpeed;
	                } else if (this.game.keyboard.trigger('S') || this.game.keyboard.trigger('down')) {
	                    this.game.VAR.cameraMan.body.velocity.y = this.game.VAR.cameraSpeed;
	                } else {
	                    this.game.VAR.cameraMan.body.velocity.y = 0;
	                }
	            }
	        }
	    }, {
	        key: "normalMouseClick",
	        value: function normalMouseClick() {
	            var _this2 = this;

	            this.game.mouse.trigger(function (mouse) {
	                // this.game.VAR.pathfinder.reRenderTile(Math.floor(this.game.mouse.mouseX / 32), Math.floor(this.game.mouse.mouseY / 32), 6);
	                if (_this2.game.VAR.sellectedObj && _this2.game.VAR.sellectedObj.move) {
	                    var endPos = _this2.game.VAR.pathfinder.getTileByMouse();

	                    if (_this2.game.VAR.sellectedObj.inWooding) {
	                        _this2.game.VAR.sellectedObj.doInTimeStop();
	                        _this2.game.VAR.sellectedObj.inWooding = false;
	                    }

	                    _this2.game.VAR.sellectedObj.restartPosition();
	                    _this2.game.VAR.sellectedObj.move(endPos);
	                }
	            }, false);
	        }
	    }]);

	    return Main;
	}();

	;

	exports.default = Main;

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _ObjectSettings3 = __webpack_require__(7);

	var _ObjectSettings4 = _interopRequireDefault(_ObjectSettings3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ctx = null;

	var Pathfinder = function (_ObjectSettings2) {
	    _inherits(Pathfinder, _ObjectSettings2);

	    function Pathfinder(game, options) {
	        var _ret;

	        _classCallCheck(this, Pathfinder);

	        var _this = _possibleConstructorReturn(this, (Pathfinder.__proto__ || Object.getPrototypeOf(Pathfinder)).call(this, game, options));

	        if (!options || !options.json) {
	            throw "Przy tworzeniu mapy wymagane jest podanie klucza 'json' z adresem do pliku json.";
	        }

	        _this.game = game;
	        _this.type = 'Pathfinder';
	        _this.jsonPath = options.json;
	        _this.static = true;
	        _this.zIndex = 1000;
	        _this.paths = [];

	        _this.used = options.isRender === false ? false : true;
	        _this.isRender = options.isRender === false ? false : true;
	        _this.mapWidth = options.mapWidth || 0;

	        return _ret = _this.getJson(_this.jsonPath).then(function (pathfinder) {
	            _this.pathfinderJson = pathfinder;
	            if (pathfinder.paths) {
	                _this.paths = pathfinder.paths;

	                _this.offScreenRender(pathfinder.paths, pathfinder);
	            } else {
	                var paths = _this.createPaths(pathfinder);
	                _this.offScreenRender(paths, pathfinder);
	            }
	            return _this;
	        }), _possibleConstructorReturn(_this, _ret);
	    }

	    _createClass(Pathfinder, [{
	        key: 'getJson',
	        value: function getJson(jsonPath) {
	            return fetch(jsonPath).then(function (map) {
	                return map.json();
	            }).then(function (map) {
	                return map;
	            });
	        }
	    }, {
	        key: 'createPaths',
	        value: function createPaths(pathfinder) {
	            for (var i = 0; i < pathfinder.rows; i++) {
	                this.paths[i] = [];
	                for (var j = 0; j < pathfinder.columns; j++) {
	                    this.paths[i][j] = 1;
	                }
	            }

	            return this.paths;
	        }
	    }, {
	        key: 'offScreenRender',
	        value: function offScreenRender(paths, pathfinder) {
	            var colors = ['blue', 'red', 'black', 'purple', 'purple', 'purple'];
	            ctx = document.createElement("canvas").getContext("2d");
	            ctx.canvas.width = pathfinder.columns * pathfinder.width || this.game.canvas.width; //pathfinder.columns * pathfinder.width;
	            ctx.canvas.height = pathfinder.rows * pathfinder.height || this.game.canvas.height; //pathfinder.rows * pathfinder.height;

	            for (var i = 0; i < paths.length; i++) {
	                for (var j = 0; j < paths[i].length; j++) {
	                    var offX = j * pathfinder.width;
	                    var offY = i * pathfinder.height;
	                    // const cartX = offX + this.originX + this.pathfinderJson.offsetX
	                    this.drawGrid(pathfinder.width, pathfinder.height, colors[paths[i][j] - 1], offX, offY);
	                }
	            }
	        }
	    }, {
	        key: 'drawGrid',
	        value: function drawGrid(width, height, color, offX, offY) {
	            this.drawLine(offX + width, offY, offX + width, offY + height, color);
	            this.drawLine(offX + width, offY, offX, offY, color);
	            this.drawLine(offX, offY, offX, offY + height, color);
	            this.drawLine(offX, offY + height, offX + width, offY + height, color);
	        }
	    }, {
	        key: 'reRenderTile',
	        value: function reRenderTile(row, column, type) {
	            var colors = ['blue', 'red', 'black', 'purple', 'purple', 'purple'];

	            this.paths[column][row] = type;
	            var offX = row * this.pathfinderJson.width;
	            var offY = column * this.pathfinderJson.height;
	            ctx.clearRect(offX - 1, offY - 1, this.pathfinderJson.width + 2, this.pathfinderJson.height + 2);
	            this.drawGrid(this.pathfinderJson.width, this.pathfinderJson.height, colors[type - 1], offX, offY);
	            localStorage.setItem('mapa', JSON.stringify(this.paths));

	            return {
	                row: row,
	                column: column,
	                x: offX,
	                y: offY,
	                type: type
	            };
	        }
	    }, {
	        key: 'drawLine',
	        value: function drawLine(x1, y1, x2, y2, color) {
	            color = typeof color !== 'undefined' ? color : 'white';
	            ctx.strokeStyle = color;
	            ctx.beginPath();
	            ctx.lineWidth = 1;
	            ctx.moveTo(x1, y1);
	            ctx.lineTo(x2, y2);
	            ctx.stroke();
	        }
	    }, {
	        key: 'draw',
	        value: function draw(dt) {
	            if (ctx && this.isRender) {
	                if (this.objAlfa !== 1 && this.context.globalAlpha === 1) {
	                    this.context.save();
	                    this.context.globalAlpha = this.objAlfa;
	                }

	                this.context.drawImage(ctx.canvas, this.game.camera.xScroll || 0, this.game.camera.yScroll || 0, this.game.width, this.game.height, 0, 0, this.game.width, this.game.height);

	                if (this.objAlfa !== 1) {
	                    this.context.restore();
	                }
	            }
	        }
	    }, {
	        key: 'getTileByMouse',
	        value: function getTileByMouse() {
	            var x = this.game.mouse.mouseX + this.game.camera.xScroll;
	            var y = this.game.mouse.mouseY + this.game.camera.yScroll;

	            var row = Math.floor(x / this.pathfinderJson.width); // Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
	            var column = Math.floor(y / this.pathfinderJson.height);

	            return {
	                x: row * this.pathfinderJson.width,
	                y: column * this.pathfinderJson.height,
	                row: row,
	                column: column,
	                tile: this.getTile(row, column)
	            };
	        }
	    }, {
	        key: 'getTileBySprite',
	        value: function getTileBySprite(sprite) {
	            var center = sprite.getCenter();

	            var row = Math.floor(center.x / this.pathfinderJson.width); // Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
	            var column = Math.floor(center.y / this.pathfinderJson.height);

	            return {
	                x: row * this.pathfinderJson.width,
	                y: column * this.pathfinderJson.height,
	                row: row,
	                column: column,
	                tile: this.getTile(row, column)
	            };
	        }
	    }, {
	        key: 'getTileByCords',
	        value: function getTileByCords(x, y) {
	            var row = Math.floor(x / this.pathfinderJson.width); // Math.round(x / this.pathfinderJson.width - y / this.pathfinderJson.height);//
	            var column = Math.floor(y / this.pathfinderJson.height);

	            return {
	                x: row * this.pathfinderJson.width,
	                y: column * this.pathfinderJson.height,
	                row: row,
	                column: column,
	                tile: this.getTile(row, column)
	            };
	        }
	    }, {
	        key: 'getTile',
	        value: function getTile(row, column) {
	            if (this.paths[column] && this.paths[column][row]) {
	                return this.paths[column][row];
	            } else {
	                return false;
	            }
	        }
	    }, {
	        key: 'getPosition',
	        value: function getPosition(row, col) {
	            var cartX = col * this.pathfinderJson.height;
	            var cartY = row * this.pathfinderJson.height;
	            var isoX = cartX - cartY;
	            var isoY = (cartX + cartY) / 2;
	            // let x = row * this.pathfinderJson.width / 2 + col * this.pathfinderJson.width / 2 + this.originX;
	            // let y = col * this.pathfinderJson.height / 2 - row * this.pathfinderJson.height / 2 + this.originY;
	            // x = x - 54 / 2;
	            // y = y - 74;
	            return { x: isoX, y: isoY, cartX: cartX, cartY: cartY };
	        }
	    }]);

	    return Pathfinder;
	}(_ObjectSettings4.default);

	exports.default = Pathfinder;

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	/**
	*   EasyStar.js
	*   github.com/prettymuchbryce/EasyStarJS
	*   Licensed under the MIT license.
	*
	*   Implementation By Bryce Neal (@prettymuchbryce)
	**/

	var EasyStar = {};
	var Instance = __webpack_require__(80);
	var Node = __webpack_require__(81);
	var Heap = __webpack_require__(82);

	var CLOSED_LIST = 0;
	var OPEN_LIST = 1;

	module.exports = EasyStar;

	var nextInstanceId = 1;

	EasyStar.js = function () {
	    var STRAIGHT_COST = 1.0;
	    var DIAGONAL_COST = 1.4;
	    var syncEnabled = false;
	    var pointsToAvoid = {};
	    var collisionGrid;
	    var costMap = {};
	    var pointsToCost = {};
	    var directionalConditions = {};
	    var allowCornerCutting = true;
	    var iterationsSoFar;
	    var instances = {};
	    var instanceQueue = [];
	    var iterationsPerCalculation = Number.MAX_VALUE;
	    var acceptableTiles;
	    var diagonalsEnabled = false;

	    /**
	    * Sets the collision grid that EasyStar uses.
	    *
	    * @param {Array|Number} tiles An array of numbers that represent
	    * which tiles in your grid should be considered
	    * acceptable, or "walkable".
	    **/
	    this.setAcceptableTiles = function (tiles) {
	        if (tiles instanceof Array) {
	            // Array
	            acceptableTiles = tiles;
	        } else if (!isNaN(parseFloat(tiles)) && isFinite(tiles)) {
	            // Number
	            acceptableTiles = [tiles];
	        }
	    };

	    /**
	    * Enables sync mode for this EasyStar instance..
	    * if you're into that sort of thing.
	    **/
	    this.enableSync = function () {
	        syncEnabled = true;
	    };

	    /**
	    * Disables sync mode for this EasyStar instance.
	    **/
	    this.disableSync = function () {
	        syncEnabled = false;
	    };

	    /**
	     * Enable diagonal pathfinding.
	     */
	    this.enableDiagonals = function () {
	        diagonalsEnabled = true;
	    };

	    /**
	     * Disable diagonal pathfinding.
	     */
	    this.disableDiagonals = function () {
	        diagonalsEnabled = false;
	    };

	    /**
	    * Sets the collision grid that EasyStar uses.
	    *
	    * @param {Array} grid The collision grid that this EasyStar instance will read from.
	    * This should be a 2D Array of Numbers.
	    **/
	    this.setGrid = function (grid) {
	        collisionGrid = grid;

	        //Setup cost map
	        for (var y = 0; y < collisionGrid.length; y++) {
	            for (var x = 0; x < collisionGrid[0].length; x++) {
	                if (!costMap[collisionGrid[y][x]]) {
	                    costMap[collisionGrid[y][x]] = 1;
	                }
	            }
	        }
	    };

	    /**
	    * Sets the tile cost for a particular tile type.
	    *
	    * @param {Number} The tile type to set the cost for.
	    * @param {Number} The multiplicative cost associated with the given tile.
	    **/
	    this.setTileCost = function (tileType, cost) {
	        costMap[tileType] = cost;
	    };

	    /**
	    * Sets the an additional cost for a particular point.
	    * Overrides the cost from setTileCost.
	    *
	    * @param {Number} x The x value of the point to cost.
	    * @param {Number} y The y value of the point to cost.
	    * @param {Number} The multiplicative cost associated with the given point.
	    **/
	    this.setAdditionalPointCost = function (x, y, cost) {
	        if (pointsToCost[y] === undefined) {
	            pointsToCost[y] = {};
	        }
	        pointsToCost[y][x] = cost;
	    };

	    /**
	    * Remove the additional cost for a particular point.
	    *
	    * @param {Number} x The x value of the point to stop costing.
	    * @param {Number} y The y value of the point to stop costing.
	    **/
	    this.removeAdditionalPointCost = function (x, y) {
	        if (pointsToCost[y] !== undefined) {
	            delete pointsToCost[y][x];
	        }
	    };

	    /**
	    * Remove all additional point costs.
	    **/
	    this.removeAllAdditionalPointCosts = function () {
	        pointsToCost = {};
	    };

	    /**
	    * Sets a directional condition on a tile
	    *
	    * @param {Number} x The x value of the point.
	    * @param {Number} y The y value of the point.
	    * @param {Array.<String>} allowedDirections A list of all the allowed directions that can access
	    * the tile.
	    **/
	    this.setDirectionalCondition = function (x, y, allowedDirections) {
	        if (directionalConditions[y] === undefined) {
	            directionalConditions[y] = {};
	        }
	        directionalConditions[y][x] = allowedDirections;
	    };

	    /**
	    * Remove all directional conditions
	    **/
	    this.removeAllDirectionalConditions = function () {
	        directionalConditions = {};
	    };

	    /**
	    * Sets the number of search iterations per calculation.
	    * A lower number provides a slower result, but more practical if you
	    * have a large tile-map and don't want to block your thread while
	    * finding a path.
	    *
	    * @param {Number} iterations The number of searches to prefrom per calculate() call.
	    **/
	    this.setIterationsPerCalculation = function (iterations) {
	        iterationsPerCalculation = iterations;
	    };

	    /**
	    * Avoid a particular point on the grid,
	    * regardless of whether or not it is an acceptable tile.
	    *
	    * @param {Number} x The x value of the point to avoid.
	    * @param {Number} y The y value of the point to avoid.
	    **/
	    this.avoidAdditionalPoint = function (x, y) {
	        if (pointsToAvoid[y] === undefined) {
	            pointsToAvoid[y] = {};
	        }
	        pointsToAvoid[y][x] = 1;
	    };

	    /**
	    * Stop avoiding a particular point on the grid.
	    *
	    * @param {Number} x The x value of the point to stop avoiding.
	    * @param {Number} y The y value of the point to stop avoiding.
	    **/
	    this.stopAvoidingAdditionalPoint = function (x, y) {
	        if (pointsToAvoid[y] !== undefined) {
	            delete pointsToAvoid[y][x];
	        }
	    };

	    /**
	    * Enables corner cutting in diagonal movement.
	    **/
	    this.enableCornerCutting = function () {
	        allowCornerCutting = true;
	    };

	    /**
	    * Disables corner cutting in diagonal movement.
	    **/
	    this.disableCornerCutting = function () {
	        allowCornerCutting = false;
	    };

	    /**
	    * Stop avoiding all additional points on the grid.
	    **/
	    this.stopAvoidingAllAdditionalPoints = function () {
	        pointsToAvoid = {};
	    };

	    /**
	    * Find a path.
	    *
	    * @param {Number} startX The X position of the starting point.
	    * @param {Number} startY The Y position of the starting point.
	    * @param {Number} endX The X position of the ending point.
	    * @param {Number} endY The Y position of the ending point.
	    * @param {Function} callback A function that is called when your path
	    * is found, or no path is found.
	    * @return {Number} A numeric, non-zero value which identifies the created instance. This value can be passed to cancelPath to cancel the path calculation.
	    *
	    **/
	    this.findPath = function (startX, startY, endX, endY, callback) {
	        // Wraps the callback for sync vs async logic
	        var callbackWrapper = function callbackWrapper(result) {
	            if (syncEnabled) {
	                callback(result);
	            } else {
	                setTimeout(function () {
	                    callback(result);
	                });
	            }
	        };

	        // No acceptable tiles were set
	        if (acceptableTiles === undefined) {
	            throw new Error("You can't set a path without first calling setAcceptableTiles() on EasyStar.");
	        }
	        // No grid was set
	        if (collisionGrid === undefined) {
	            throw new Error("You can't set a path without first calling setGrid() on EasyStar.");
	        }

	        // Start or endpoint outside of scope.
	        if (startX < 0 || startY < 0 || endX < 0 || endY < 0 || startX > collisionGrid[0].length - 1 || startY > collisionGrid.length - 1 || endX > collisionGrid[0].length - 1 || endY > collisionGrid.length - 1) {
	            throw new Error("Your start or end point is outside the scope of your grid.");
	        }

	        // Start and end are the same tile.
	        if (startX === endX && startY === endY) {
	            callbackWrapper([]);
	            return;
	        }

	        // End point is not an acceptable tile.
	        var endTile = collisionGrid[endY][endX];
	        var isAcceptable = false;
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (endTile === acceptableTiles[i]) {
	                isAcceptable = true;
	                break;
	            }
	        }

	        if (isAcceptable === false) {
	            callbackWrapper(null);
	            return;
	        }

	        // Create the instance
	        var instance = new Instance();
	        instance.openList = new Heap(function (nodeA, nodeB) {
	            return nodeA.bestGuessDistance() - nodeB.bestGuessDistance();
	        });
	        instance.isDoneCalculating = false;
	        instance.nodeHash = {};
	        instance.startX = startX;
	        instance.startY = startY;
	        instance.endX = endX;
	        instance.endY = endY;
	        instance.callback = callbackWrapper;

	        instance.openList.push(coordinateToNode(instance, instance.startX, instance.startY, null, STRAIGHT_COST));

	        var instanceId = nextInstanceId++;
	        instances[instanceId] = instance;
	        instanceQueue.push(instanceId);
	        return instanceId;
	    };

	    /**
	     * Cancel a path calculation.
	     *
	     * @param {Number} instanceId The instance ID of the path being calculated
	     * @return {Boolean} True if an instance was found and cancelled.
	     *
	     **/
	    this.cancelPath = function (instanceId) {
	        if (instanceId in instances) {
	            delete instances[instanceId];
	            // No need to remove it from instanceQueue
	            return true;
	        }
	        return false;
	    };

	    /**
	    * This method steps through the A* Algorithm in an attempt to
	    * find your path(s). It will search 4-8 tiles (depending on diagonals) for every calculation.
	    * You can change the number of calculations done in a call by using
	    * easystar.setIteratonsPerCalculation().
	    **/
	    this.calculate = function () {
	        if (instanceQueue.length === 0 || collisionGrid === undefined || acceptableTiles === undefined) {
	            return;
	        }
	        for (iterationsSoFar = 0; iterationsSoFar < iterationsPerCalculation; iterationsSoFar++) {
	            if (instanceQueue.length === 0) {
	                return;
	            }

	            if (syncEnabled) {
	                // If this is a sync instance, we want to make sure that it calculates synchronously.
	                iterationsSoFar = 0;
	            }

	            var instanceId = instanceQueue[0];
	            var instance = instances[instanceId];
	            if (typeof instance == 'undefined') {
	                // This instance was cancelled
	                instanceQueue.shift();
	                continue;
	            }

	            // Couldn't find a path.
	            if (instance.openList.size() === 0) {
	                instance.callback(null);
	                delete instances[instanceId];
	                instanceQueue.shift();
	                continue;
	            }

	            var searchNode = instance.openList.pop();

	            // Handles the case where we have found the destination
	            if (instance.endX === searchNode.x && instance.endY === searchNode.y) {
	                var path = [];
	                path.push({ x: searchNode.x, y: searchNode.y });
	                var parent = searchNode.parent;
	                while (parent != null) {
	                    path.push({ x: parent.x, y: parent.y });
	                    parent = parent.parent;
	                }
	                path.reverse();
	                var ip = path;
	                instance.callback(ip);
	                delete instances[instanceId];
	                instanceQueue.shift();
	                continue;
	            }

	            searchNode.list = CLOSED_LIST;

	            if (searchNode.y > 0) {
	                checkAdjacentNode(instance, searchNode, 0, -1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y - 1));
	            }
	            if (searchNode.x < collisionGrid[0].length - 1) {
	                checkAdjacentNode(instance, searchNode, 1, 0, STRAIGHT_COST * getTileCost(searchNode.x + 1, searchNode.y));
	            }
	            if (searchNode.y < collisionGrid.length - 1) {
	                checkAdjacentNode(instance, searchNode, 0, 1, STRAIGHT_COST * getTileCost(searchNode.x, searchNode.y + 1));
	            }
	            if (searchNode.x > 0) {
	                checkAdjacentNode(instance, searchNode, -1, 0, STRAIGHT_COST * getTileCost(searchNode.x - 1, searchNode.y));
	            }
	            if (diagonalsEnabled) {
	                if (searchNode.x > 0 && searchNode.y > 0) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, -1, -1, DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y - 1));
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y < collisionGrid.length - 1) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, 1, 1, DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y + 1));
	                    }
	                }
	                if (searchNode.x < collisionGrid[0].length - 1 && searchNode.y > 0) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y - 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x + 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, 1, -1, DIAGONAL_COST * getTileCost(searchNode.x + 1, searchNode.y - 1));
	                    }
	                }
	                if (searchNode.x > 0 && searchNode.y < collisionGrid.length - 1) {

	                    if (allowCornerCutting || isTileWalkable(collisionGrid, acceptableTiles, searchNode.x, searchNode.y + 1, searchNode) && isTileWalkable(collisionGrid, acceptableTiles, searchNode.x - 1, searchNode.y, searchNode)) {

	                        checkAdjacentNode(instance, searchNode, -1, 1, DIAGONAL_COST * getTileCost(searchNode.x - 1, searchNode.y + 1));
	                    }
	                }
	            }
	        }
	    };

	    // Private methods follow
	    var checkAdjacentNode = function checkAdjacentNode(instance, searchNode, x, y, cost) {
	        var adjacentCoordinateX = searchNode.x + x;
	        var adjacentCoordinateY = searchNode.y + y;

	        if ((pointsToAvoid[adjacentCoordinateY] === undefined || pointsToAvoid[adjacentCoordinateY][adjacentCoordinateX] === undefined) && isTileWalkable(collisionGrid, acceptableTiles, adjacentCoordinateX, adjacentCoordinateY, searchNode)) {
	            var node = coordinateToNode(instance, adjacentCoordinateX, adjacentCoordinateY, searchNode, cost);

	            if (node.list === undefined) {
	                node.list = OPEN_LIST;
	                instance.openList.push(node);
	            } else if (searchNode.costSoFar + cost < node.costSoFar) {
	                node.costSoFar = searchNode.costSoFar + cost;
	                node.parent = searchNode;
	                instance.openList.updateItem(node);
	            }
	        }
	    };

	    // Helpers
	    var isTileWalkable = function isTileWalkable(collisionGrid, acceptableTiles, x, y, sourceNode) {
	        var directionalCondition = directionalConditions[y] && directionalConditions[y][x];
	        if (directionalCondition) {
	            var direction = calculateDirection(sourceNode.x - x, sourceNode.y - y);
	            var directionIncluded = function directionIncluded() {
	                for (var i = 0; i < directionalCondition.length; i++) {
	                    if (directionalCondition[i] === direction) return true;
	                }
	                return false;
	            };
	            if (!directionIncluded()) return false;
	        }
	        for (var i = 0; i < acceptableTiles.length; i++) {
	            if (collisionGrid[y][x] === acceptableTiles[i]) {
	                return true;
	            }
	        }

	        return false;
	    };

	    /**
	     * -1, -1 | 0, -1  | 1, -1
	     * -1,  0 | SOURCE | 1,  0
	     * -1,  1 | 0,  1  | 1,  1
	     */
	    var calculateDirection = function calculateDirection(diffX, diffY) {
	        if (diffX === 0 && diffY === -1) return EasyStar.TOP;else if (diffX === 1 && diffY === -1) return EasyStar.TOP_RIGHT;else if (diffX === 1 && diffY === 0) return EasyStar.RIGHT;else if (diffX === 1 && diffY === 1) return EasyStar.BOTTOM_RIGHT;else if (diffX === 0 && diffY === 1) return EasyStar.BOTTOM;else if (diffX === -1 && diffY === 1) return EasyStar.BOTTOM_LEFT;else if (diffX === -1 && diffY === 0) return EasyStar.LEFT;else if (diffX === -1 && diffY === -1) return EasyStar.TOP_LEFT;
	        throw new Error('These differences are not valid: ' + diffX + ', ' + diffY);
	    };

	    var getTileCost = function getTileCost(x, y) {
	        return pointsToCost[y] && pointsToCost[y][x] || costMap[collisionGrid[y][x]];
	    };

	    var coordinateToNode = function coordinateToNode(instance, x, y, parent, cost) {
	        if (instance.nodeHash[y] !== undefined) {
	            if (instance.nodeHash[y][x] !== undefined) {
	                return instance.nodeHash[y][x];
	            }
	        } else {
	            instance.nodeHash[y] = {};
	        }
	        var simpleDistanceToTarget = getDistance(x, y, instance.endX, instance.endY);
	        if (parent !== null) {
	            var costSoFar = parent.costSoFar + cost;
	        } else {
	            costSoFar = 0;
	        }
	        var node = new Node(parent, x, y, costSoFar, simpleDistanceToTarget);
	        instance.nodeHash[y][x] = node;
	        return node;
	    };

	    var getDistance = function getDistance(x1, y1, x2, y2) {
	        if (diagonalsEnabled) {
	            // Octile distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            if (dx < dy) {
	                return DIAGONAL_COST * dx + dy;
	            } else {
	                return DIAGONAL_COST * dy + dx;
	            }
	        } else {
	            // Manhattan distance
	            var dx = Math.abs(x1 - x2);
	            var dy = Math.abs(y1 - y2);
	            return dx + dy;
	        }
	    };
	};

	EasyStar.TOP = 'TOP';
	EasyStar.TOP_RIGHT = 'TOP_RIGHT';
	EasyStar.RIGHT = 'RIGHT';
	EasyStar.BOTTOM_RIGHT = 'BOTTOM_RIGHT';
	EasyStar.BOTTOM = 'BOTTOM';
	EasyStar.BOTTOM_LEFT = 'BOTTOM_LEFT';
	EasyStar.LEFT = 'LEFT';
	EasyStar.TOP_LEFT = 'TOP_LEFT';

/***/ }),
/* 80 */
/***/ (function(module, exports) {

	"use strict";

	/**
	 * Represents a single instance of EasyStar.
	 * A path that is in the queue to eventually be found.
	 */
	module.exports = function () {
	    this.pointsToAvoid = {};
	    this.startX;
	    this.callback;
	    this.startY;
	    this.endX;
	    this.endY;
	    this.nodeHash = {};
	    this.openList;
	};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	"use strict";

	/**
	* A simple Node that represents a single tile on the grid.
	* @param {Object} parent The parent node.
	* @param {Number} x The x position on the grid.
	* @param {Number} y The y position on the grid.
	* @param {Number} costSoFar How far this node is in moves*cost from the start.
	* @param {Number} simpleDistanceToTarget Manhatten distance to the end point.
	**/
	module.exports = function (parent, x, y, costSoFar, simpleDistanceToTarget) {
	    this.parent = parent;
	    this.x = x;
	    this.y = y;
	    this.costSoFar = costSoFar;
	    this.simpleDistanceToTarget = simpleDistanceToTarget;

	    /**
	    * @return {Number} Best guess distance of a cost using this node.
	    **/
	    this.bestGuessDistance = function () {
	        return this.costSoFar + this.simpleDistanceToTarget;
	    };
	};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(83);

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	// Generated by CoffeeScript 1.8.0
	(function () {
	  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

	  floor = Math.floor, min = Math.min;

	  /*
	  Default comparison function to be used
	   */

	  defaultCmp = function defaultCmp(x, y) {
	    if (x < y) {
	      return -1;
	    }
	    if (x > y) {
	      return 1;
	    }
	    return 0;
	  };

	  /*
	  Insert item x in list a, and keep it sorted assuming a is sorted.
	  
	  If x is already in a, insert it to the right of the rightmost x.
	  
	  Optional args lo (default 0) and hi (default a.length) bound the slice
	  of a to be searched.
	   */

	  insort = function insort(a, x, lo, hi, cmp) {
	    var mid;
	    if (lo == null) {
	      lo = 0;
	    }
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (lo < 0) {
	      throw new Error('lo must be non-negative');
	    }
	    if (hi == null) {
	      hi = a.length;
	    }
	    while (lo < hi) {
	      mid = floor((lo + hi) / 2);
	      if (cmp(x, a[mid]) < 0) {
	        hi = mid;
	      } else {
	        lo = mid + 1;
	      }
	    }
	    return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
	  };

	  /*
	  Push item onto heap, maintaining the heap invariant.
	   */

	  heappush = function heappush(array, item, cmp) {
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    array.push(item);
	    return _siftdown(array, 0, array.length - 1, cmp);
	  };

	  /*
	  Pop the smallest item off the heap, maintaining the heap invariant.
	   */

	  heappop = function heappop(array, cmp) {
	    var lastelt, returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    lastelt = array.pop();
	    if (array.length) {
	      returnitem = array[0];
	      array[0] = lastelt;
	      _siftup(array, 0, cmp);
	    } else {
	      returnitem = lastelt;
	    }
	    return returnitem;
	  };

	  /*
	  Pop and return the current smallest value, and add the new item.
	  
	  This is more efficient than heappop() followed by heappush(), and can be
	  more appropriate when using a fixed size heap. Note that the value
	  returned may be larger than item! That constrains reasonable use of
	  this routine unless written as part of a conditional replacement:
	      if item > array[0]
	        item = heapreplace(array, item)
	   */

	  heapreplace = function heapreplace(array, item, cmp) {
	    var returnitem;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    returnitem = array[0];
	    array[0] = item;
	    _siftup(array, 0, cmp);
	    return returnitem;
	  };

	  /*
	  Fast version of a heappush followed by a heappop.
	   */

	  heappushpop = function heappushpop(array, item, cmp) {
	    var _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (array.length && cmp(array[0], item) < 0) {
	      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
	      _siftup(array, 0, cmp);
	    }
	    return item;
	  };

	  /*
	  Transform list into a heap, in-place, in O(array.length) time.
	   */

	  heapify = function heapify(array, cmp) {
	    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    _ref1 = function () {
	      _results1 = [];
	      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
	        _results1.push(_j);
	      }
	      return _results1;
	    }.apply(this).reverse();
	    _results = [];
	    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
	      i = _ref1[_i];
	      _results.push(_siftup(array, i, cmp));
	    }
	    return _results;
	  };

	  /*
	  Update the position of the given item in the heap.
	  This function should be called every time the item is being modified.
	   */

	  updateItem = function updateItem(array, item, cmp) {
	    var pos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    pos = array.indexOf(item);
	    if (pos === -1) {
	      return;
	    }
	    _siftdown(array, 0, pos, cmp);
	    return _siftup(array, pos, cmp);
	  };

	  /*
	  Find the n largest elements in a dataset.
	   */

	  nlargest = function nlargest(array, n, cmp) {
	    var elem, result, _i, _len, _ref;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    result = array.slice(0, n);
	    if (!result.length) {
	      return result;
	    }
	    heapify(result, cmp);
	    _ref = array.slice(n);
	    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	      elem = _ref[_i];
	      heappushpop(result, elem, cmp);
	    }
	    return result.sort(cmp).reverse();
	  };

	  /*
	  Find the n smallest elements in a dataset.
	   */

	  nsmallest = function nsmallest(array, n, cmp) {
	    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    if (n * 10 <= array.length) {
	      result = array.slice(0, n).sort(cmp);
	      if (!result.length) {
	        return result;
	      }
	      los = result[result.length - 1];
	      _ref = array.slice(n);
	      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
	        elem = _ref[_i];
	        if (cmp(elem, los) < 0) {
	          insort(result, elem, 0, null, cmp);
	          result.pop();
	          los = result[result.length - 1];
	        }
	      }
	      return result;
	    }
	    heapify(array, cmp);
	    _results = [];
	    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
	      _results.push(heappop(array, cmp));
	    }
	    return _results;
	  };

	  _siftdown = function _siftdown(array, startpos, pos, cmp) {
	    var newitem, parent, parentpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    newitem = array[pos];
	    while (pos > startpos) {
	      parentpos = pos - 1 >> 1;
	      parent = array[parentpos];
	      if (cmp(newitem, parent) < 0) {
	        array[pos] = parent;
	        pos = parentpos;
	        continue;
	      }
	      break;
	    }
	    return array[pos] = newitem;
	  };

	  _siftup = function _siftup(array, pos, cmp) {
	    var childpos, endpos, newitem, rightpos, startpos;
	    if (cmp == null) {
	      cmp = defaultCmp;
	    }
	    endpos = array.length;
	    startpos = pos;
	    newitem = array[pos];
	    childpos = 2 * pos + 1;
	    while (childpos < endpos) {
	      rightpos = childpos + 1;
	      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
	        childpos = rightpos;
	      }
	      array[pos] = array[childpos];
	      pos = childpos;
	      childpos = 2 * pos + 1;
	    }
	    array[pos] = newitem;
	    return _siftdown(array, startpos, pos, cmp);
	  };

	  Heap = function () {
	    Heap.push = heappush;

	    Heap.pop = heappop;

	    Heap.replace = heapreplace;

	    Heap.pushpop = heappushpop;

	    Heap.heapify = heapify;

	    Heap.updateItem = updateItem;

	    Heap.nlargest = nlargest;

	    Heap.nsmallest = nsmallest;

	    function Heap(cmp) {
	      this.cmp = cmp != null ? cmp : defaultCmp;
	      this.nodes = [];
	    }

	    Heap.prototype.push = function (x) {
	      return heappush(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.pop = function () {
	      return heappop(this.nodes, this.cmp);
	    };

	    Heap.prototype.peek = function () {
	      return this.nodes[0];
	    };

	    Heap.prototype.contains = function (x) {
	      return this.nodes.indexOf(x) !== -1;
	    };

	    Heap.prototype.replace = function (x) {
	      return heapreplace(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.pushpop = function (x) {
	      return heappushpop(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.heapify = function () {
	      return heapify(this.nodes, this.cmp);
	    };

	    Heap.prototype.updateItem = function (x) {
	      return updateItem(this.nodes, x, this.cmp);
	    };

	    Heap.prototype.clear = function () {
	      return this.nodes = [];
	    };

	    Heap.prototype.empty = function () {
	      return this.nodes.length === 0;
	    };

	    Heap.prototype.size = function () {
	      return this.nodes.length;
	    };

	    Heap.prototype.clone = function () {
	      var heap;
	      heap = new Heap();
	      heap.nodes = this.nodes.slice(0);
	      return heap;
	    };

	    Heap.prototype.toArray = function () {
	      return this.nodes.slice(0);
	    };

	    Heap.prototype.insert = Heap.prototype.push;

	    Heap.prototype.top = Heap.prototype.peek;

	    Heap.prototype.front = Heap.prototype.peek;

	    Heap.prototype.has = Heap.prototype.contains;

	    Heap.prototype.copy = Heap.prototype.clone;

	    return Heap;
	  }();

	  (function (root, factory) {
	    if (true) {
	      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
	      return module.exports = factory();
	    } else {
	      return root.Heap = factory();
	    }
	  })(this, function () {
	    return Heap;
	  });
	}).call(undefined);

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Units2 = __webpack_require__(85);

	var _Units3 = _interopRequireDefault(_Units2);

	var _Animations = __webpack_require__(86);

	var _Animations2 = _interopRequireDefault(_Animations);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Peasant = function (_Units) {
	    _inherits(Peasant, _Units);

	    function Peasant(game, options) {
	        _classCallCheck(this, Peasant);

	        var _this = _possibleConstructorReturn(this, (Peasant.__proto__ || Object.getPrototypeOf(Peasant)).call(this, game, options));

	        _this.type = 'worker';

	        _this.inBuildin = false;
	        _this.dir = 'idle_up';
	        _this.cargo = 'empty';
	        _this.inForestPos = {};

	        new _Animations2.default(_this);
	        return _this;
	    }

	    _createClass(Peasant, [{
	        key: "update",
	        value: function update(dt) {
	            _get(Peasant.prototype.__proto__ || Object.getPrototypeOf(Peasant.prototype), "update", this).call(this, dt);
	        }
	    }, {
	        key: "extendsMove",
	        value: function extendsMove(nextTile, nextStep, startPos) {
	            // nextTile 4 === kopalnia
	            if (nextTile === 4 && !this.inBuildin) {
	                this.inMine(nextStep, startPos);
	                return true;
	            } else if (nextTile === 5 && (this.cargo === 'gold' || this.cargo === 'wood') && !this.inBuildin) {
	                this.inTown(nextStep, startPos);
	                return true;
	            } else if (nextTile === 6) {
	                this.inForest(nextStep, startPos);
	                return true;
	            }
	        }
	    }, {
	        key: "inMine",
	        value: function inMine(nextStep, startPos) {
	            var _this2 = this;

	            this.unSelectedBorder();
	            this.inBuildin = true;
	            this.used = false;

	            this.x = startPos.x;
	            this.y = startPos.y;
	            this.restartPosition();

	            setTimeout(function () {
	                _this2.used = true;
	                _this2.inBuildin = false;
	                _this2.cargo = 'gold';
	                var endPos = _this2.game.VAR.pathfinder.getTileBySprite(_this2.game.VAR.town);
	                var currentPos = _this2.game.VAR.pathfinder.getTileBySprite(_this2);

	                if (endPos.column > currentPos.column) {
	                    endPos = _extends({}, endPos, { column: endPos.column - 1 });
	                }
	                if (endPos.row >= currentPos.row) {
	                    endPos = _extends({}, endPos, { row: endPos.row - 1 });
	                }
	                // this.game.VAR.sellectedObj.restartPosition();
	                _this2.move(endPos);
	                _this2.showBorder();
	            }, 4500);
	        }
	    }, {
	        key: "inForest",
	        value: function inForest(nextStep, startPos) {
	            var _this3 = this;

	            this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 2);
	            this.inForestPos = { x: this.x, y: this.y, column: nextStep.y, row: nextStep.x };
	            if (this.cargo === 'wood' || this.cargo === 'gold') {
	                var endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.town);
	                var currentPos = this.game.VAR.pathfinder.getTileBySprite(this);

	                if (endPos.column >= currentPos.column) {
	                    endPos = _extends({}, endPos, { column: endPos.column - 1 });
	                }
	                if (endPos.row > currentPos.row) {
	                    endPos = _extends({}, endPos, { row: endPos.row - 1 });
	                }
	                this.move(endPos);
	                this.showBorder();
	            } else {
	                this.inWooding = true;
	                // this.getAnimationInMove(startPos, nextStep);
	                this.doInTime(4500, function () {
	                    _this3.cargo = 'wood';
	                    var endPos = _this3.game.VAR.pathfinder.getTileBySprite(_this3.game.VAR.town);
	                    var currentPos = _this3.game.VAR.pathfinder.getTileBySprite(_this3);

	                    if (endPos.column >= currentPos.column) {
	                        endPos = _extends({}, endPos, { column: endPos.column - 1 });
	                    }
	                    if (endPos.row > currentPos.row) {
	                        endPos = _extends({}, endPos, { row: endPos.row - 1 });
	                    }
	                    _this3.move(endPos);
	                    _this3.showBorder();
	                });
	            }
	        }
	    }, {
	        key: "inTown",
	        value: function inTown(nextStep, startPos) {
	            var _this4 = this;

	            this.unSelectedBorder();
	            this.inBuildin = true;
	            this.used = false;

	            this.x = startPos.x;
	            this.y = startPos.y;
	            this.restartPosition();

	            setTimeout(function () {
	                _this4.used = true;
	                _this4.inBuildin = false;
	                var endPos = void 0;
	                if (_this4.cargo === 'gold') {
	                    endPos = _this4.game.VAR.pathfinder.getTileBySprite(_this4.game.VAR.goldMine);
	                } else if (_this4.cargo === 'wood') {
	                    endPos = _this4.inForestPos;
	                }
	                _this4.cargo = 'empty';
	                // this.game.VAR.sellectedObj.restartPosition();
	                _this4.move(endPos);
	                _this4.showBorder();
	            }, 2000);
	        }
	    }]);

	    return Peasant;
	}(_Units3.default);

	exports.default = Peasant;

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Sprite2 = __webpack_require__(6);

	var _Sprite3 = _interopRequireDefault(_Sprite2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Units = function (_Sprite) {
	    _inherits(Units, _Sprite);

	    function Units(game, options) {
	        _classCallCheck(this, Units);

	        var _this = _possibleConstructorReturn(this, (Units.__proto__ || Object.getPrototypeOf(Units)).call(this, game, options));

	        _this.type = 'worker';

	        _this.currentPosition = null;
	        _this.nextPosition = null;
	        _this.speed = 65;
	        return _this;
	    }

	    _createClass(Units, [{
	        key: "onClick",
	        value: function onClick() {
	            this.selectedBorder();
	        }
	    }, {
	        key: "selectedBorder",
	        value: function selectedBorder() {
	            this.game.VAR.sellectedObj = this;
	            this.game.VAR.sellectedBorder.show();
	            // this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
	            // this.game.VAR.sellectedBorder.y = this.y; //+ this.height / 2
	            // this.game.VAR.sellectedBorder.width = this.width;
	            // this.game.VAR.sellectedBorder.height = this.height;
	        }
	    }, {
	        key: "unSelectedBorder",
	        value: function unSelectedBorder() {
	            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
	                this.game.VAR.sellectedObj = null;
	                this.game.VAR.sellectedBorder.hide();
	            }
	        }
	    }, {
	        key: "hideBorder",
	        value: function hideBorder() {
	            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
	                this.game.VAR.sellectedBorder.hide();
	            }
	        }
	    }, {
	        key: "showBorder",
	        value: function showBorder() {
	            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
	                this.game.VAR.sellectedBorder.show();
	            }
	        }
	    }, {
	        key: "updateBorder",
	        value: function updateBorder() {
	            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.objID === this.objID) {
	                this.game.VAR.sellectedBorder.x = this.x; //+ this.width / 4
	                this.game.VAR.sellectedBorder.y = this.y + (this.height - 30); //+ this.height / 2
	                this.game.VAR.sellectedBorder.width = 32; //this.width;
	                this.game.VAR.sellectedBorder.height = 32; //this.height;
	            }
	        }
	    }, {
	        key: "update",
	        value: function update(dt) {
	            _get(Units.prototype.__proto__ || Object.getPrototypeOf(Units.prototype), "update", this).call(this, dt);
	            this.updateBorder();
	            this.animations.play({
	                key: this.dir
	            });
	        }
	    }, {
	        key: "move",
	        value: function move(endPos) {
	            var _this2 = this;

	            var startPos = this.game.VAR.pathfinder.getTileBySprite(this);
	            this.game.easystar.setGrid(this.game.VAR.pathfinder.paths);

	            this.game.easystar.findPath(startPos.row, startPos.column, endPos.row, endPos.column, function (newPath) {
	                if (newPath === null) {
	                    console.log("Path was not found.");
	                } else {
	                    if (newPath.length > 0) {
	                        newPath.shift();
	                        var nextStep = newPath.shift();
	                        var nextTile = _this2.game.VAR.pathfinder.getTile(nextStep.x, nextStep.y);

	                        if (nextTile === 3) {
	                            // 3 oznacza ze juz na tym polu stoi jakas postac
	                            _this2.game.VAR.pathfinder.reRenderTile(nextStep.x, nextStep.y, 2);
	                            _this2.move(endPos);
	                            return false;
	                        }

	                        if (_this2.extendsMove && typeof _this2.extendsMove === 'function') {
	                            var bool = _this2.extendsMove(nextTile, nextStep, startPos);
	                            if (bool) {
	                                return;
	                            }
	                        }

	                        _this2.currentPosition = _this2.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 1);
	                        _this2.nextPosition = _this2.game.VAR.pathfinder.reRenderTile(nextStep.x, nextStep.y, 3);

	                        _this2.getAnimationInMove(_this2.currentPosition, _this2.nextPosition);

	                        _this2.moveToPoint({
	                            x: nextStep.x * 32, y: nextStep.y * 32, speed: _this2.speed, callback: function callback() {
	                                if (newPath.length > 0) {
	                                    _this2.move(endPos);
	                                } else {
	                                    _this2.currentPosition = _this2.game.VAR.pathfinder.reRenderTile(nextStep.x, nextStep.y, 3);
	                                    _this2.dir = "idle" + _this2.dir.slice(4);
	                                }
	                            }
	                        });
	                    }
	                }
	            });
	            this.game.easystar.calculate();
	        }
	    }, {
	        key: "restartPosition",
	        value: function restartPosition() {
	            if (this.nextPosition) {
	                this.game.VAR.pathfinder.reRenderTile(this.nextPosition.row, this.nextPosition.column, 1);
	            }
	            if (this.currentPosition) {
	                this.game.VAR.pathfinder.reRenderTile(this.currentPosition.row, this.currentPosition.column, 1);
	            }

	            this.nextPosition = null;
	            this.currentPosition = null;
	        }
	    }, {
	        key: "getAnimationInMove",
	        value: function getAnimationInMove(currentPos, pos) {
	            if (pos.x > currentPos.x && pos.y > currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_right_down';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_right_down'; //'move_wood_right_down';
	                } else {
	                    this.dir = 'move_right_down';
	                }
	            } else if (pos.x === currentPos.x && pos.y > currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_down';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_down'; //'move_wood_down';
	                } else {
	                    this.dir = 'move_down';
	                }
	            } else if (pos.x < currentPos.x && pos.y > currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_left_down';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_left_down'; //'move_wood_left_down';
	                } else {
	                    this.dir = 'move_left_down';
	                }
	            } else if (pos.x < currentPos.x && pos.y === currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_left';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_left'; //'move_wood_left';
	                } else {
	                    this.dir = 'move_left';
	                }
	            } else if (pos.x < currentPos.x && pos.y < currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_left_up';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_left_up'; //'move_wood_left_up';
	                } else {
	                    this.dir = 'move_left_up';
	                }
	            } else if (pos.x === currentPos.x && pos.y < currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_up';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_up'; //'move_wood_up';
	                } else {
	                    this.dir = 'move_up';
	                }
	            } else if (pos.x > currentPos.x && pos.y < currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_right_up';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_right_up'; //'move_wood_right_up';
	                } else {
	                    this.dir = 'move_right_up';
	                }
	            } else if (pos.x > currentPos.x && pos.y === currentPos.y) {
	                if (this.cargo === 'gold') {
	                    this.dir = 'move_gold_right';
	                } else if (this.cargo === 'wood') {
	                    this.dir = 'move_right'; //'move_wood_right';
	                } else {
	                    this.dir = 'move_right';
	                }
	            }
	        }
	    }]);

	    return Units;
	}(_Sprite3.default);

	exports.default = Units;

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Animations = function Animations(sprite) {
	    _classCallCheck(this, Animations);

	    sprite.animations.add({
	        key: 'idle_up',
	        frames: [{ sx: 13, sy: 3, fW: 32, fH: 32 }]
	    });
	    sprite.animations.add({
	        key: 'idle_right_up',
	        frames: [{ sx: 15 + 35 * 1, sy: 3, fW: 32, fH: 32 }]
	    });
	    sprite.animations.add({
	        key: 'idle_right',
	        frames: [{ sx: 18 + 35 * 2, sy: 3, fW: 32, fH: 32 }]
	    });
	    sprite.animations.add({
	        key: 'idle_right_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 2, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'idle_down',
	        frames: [{ sx: 22 + 35 * 4, sy: 3, fW: 32, fH: 32 }]
	    });
	    sprite.animations.add({
	        key: 'idle_left_down',
	        frames: [{ sx: 15 + 35 * 3, sy: 3, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'idle_left',
	        frames: [{ sx: 19 + 35 * 2, sy: 3, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'idle_left_up',
	        frames: [{ sx: 15 + 35 * 1, sy: 3, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'move_up',
	        frames: [{ sx: 13, sy: 8 + 36 * 1, fW: 32, fH: 32 }, { sx: 13, sy: 12 + 36 * 2, fW: 32, fH: 32 }, { sx: 13, sy: 12 + 36 * 3, fW: 32, fH: 32 }, { sx: 13, sy: 12 + 36 * 4, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'move_right_up',
	        frames: [{ sx: 15 + 35 * 1, sy: 6 + 36 * 1, fW: 32, fH: 32 }, { sx: 15 + 35 * 1, sy: 10 + 36 * 2, fW: 32, fH: 32 }, { sx: 15 + 35 * 1, sy: 10 + 36 * 3, fW: 32, fH: 32 }, { sx: 15 + 35 * 1, sy: 10 + 36 * 4, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'move_right',
	        frames: [{ sx: 18 + 35 * 2, sy: 6 + 36 * 1, fW: 32, fH: 32 }, { sx: 18 + 35 * 2, sy: 10 + 36 * 2, fW: 32, fH: 32 }, { sx: 18 + 35 * 2, sy: 10 + 36 * 3, fW: 32, fH: 32 }, { sx: 18 + 35 * 2, sy: 10 + 36 * 4, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'move_right_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 1 + 36 * 1, fW: 32, fH: 32 }, { sx: 18 + 35 * 3, sy: 5 + 36 * 2, fW: 32, fH: 32 }, { sx: 18 + 35 * 3, sy: 6 + 36 * 3, fW: 32, fH: 32 }, { sx: 18 + 35 * 3, sy: 7 + 36 * 4, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'move_down',
	        frames: [{ sx: 24 + 35 * 4, sy: 5 + 36 * 1, fW: 32, fH: 32 }, { sx: 24 + 35 * 4, sy: 10 + 36 * 2, fW: 32, fH: 32 }, { sx: 24 + 35 * 4, sy: 10 + 36 * 3, fW: 32, fH: 32 }, { sx: 24 + 35 * 4, sy: 10 + 36 * 4, fW: 32, fH: 32 }]
	    });
	    sprite.animations.add({
	        key: 'move_left_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 1 + 36 * 1, fW: 32, fH: 32, flip: true }, { sx: 18 + 35 * 3, sy: 5 + 36 * 2, fW: 32, fH: 32, flip: true }, { sx: 18 + 35 * 3, sy: 6 + 36 * 3, fW: 32, fH: 32, flip: true }, { sx: 18 + 35 * 3, sy: 7 + 36 * 4, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'move_left',
	        frames: [{ sx: 18 + 35 * 2, sy: 6 + 36 * 1, fW: 32, fH: 32, flip: true }, { sx: 18 + 35 * 2, sy: 10 + 36 * 2, fW: 32, fH: 32, flip: true }, { sx: 18 + 35 * 2, sy: 10 + 36 * 3, fW: 32, fH: 32, flip: true }, { sx: 18 + 35 * 2, sy: 10 + 36 * 4, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'move_left_up',
	        frames: [{ sx: 15 + 35 * 1, sy: 6 + 36 * 1, fW: 32, fH: 32, flip: true }, { sx: 15 + 35 * 1, sy: 10 + 36 * 2, fW: 32, fH: 32, flip: true }, { sx: 15 + 35 * 1, sy: 10 + 36 * 3, fW: 32, fH: 32, flip: true }, { sx: 15 + 35 * 1, sy: 10 + 36 * 4, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_up',
	        frames: [{ sx: 24, sy: 22 + 36 * 13, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_right_up',
	        frames: [{ sx: 24 + 35 * 1, sy: 22 + 36 * 13, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_right',
	        frames: [{ sx: 24 + 35 * 2, sy: 22 + 36 * 13, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_right_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 16 + 36 * 13, fW: 32, fH: 38 }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_down',
	        frames: [{ sx: 15 + 35 * 4, sy: 16 + 36 * 13, fW: 32, fH: 38 }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_left_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 16 + 36 * 13, fW: 32, fH: 38, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_left',
	        frames: [{ sx: 24 + 35 * 2, sy: 22 + 36 * 13, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'idle_gold_left_up',
	        frames: [{ sx: 24 + 35 * 1, sy: 22 + 36 * 13, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_up',
	        frames: [{ sx: 24, sy: 28 + 36 * 14, fW: 32, fH: 34 }, { sx: 24, sy: 35 + 36 * 15, fW: 32, fH: 34 }, { sx: 24, sy: 42 + 36 * 16, fW: 32, fH: 34 }, { sx: 24, sy: 49 + 36 * 17, fW: 32, fH: 34 }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_right_up',
	        frames: [{ sx: 24 + 35 * 1, sy: 28 + 36 * 14, fW: 32, fH: 33 }, { sx: 24 + 35 * 1, sy: 34 + 36 * 15, fW: 32, fH: 33 }, { sx: 24 + 35 * 1, sy: 40 + 36 * 16, fW: 32, fH: 33 }, { sx: 24 + 35 * 1, sy: 46 + 36 * 17, fW: 32, fH: 33 }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_right',
	        frames: [{ sx: 24 + 35 * 2, sy: 47 + 36 * 17, fW: 32, fH: 32 }, { sx: 24 + 35 * 2, sy: 40 + 36 * 16, fW: 32, fH: 32 }, { sx: 24 + 35 * 2, sy: 33 + 36 * 15, fW: 32, fH: 32 }, { sx: 24 + 35 * 2, sy: 26 + 36 * 14, fW: 32, fH: 32 }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_right_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 44 + 36 * 17, fW: 32, fH: 38 }, { sx: 18 + 35 * 3, sy: 36 + 36 * 16, fW: 32, fH: 38 }, { sx: 18 + 35 * 3, sy: 26 + 36 * 15, fW: 32, fH: 38 }, { sx: 18 + 35 * 3, sy: 20 + 36 * 14, fW: 32, fH: 38 }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_down',
	        frames: [{ sx: 15 + 35 * 4, sy: 21 + 36 * 14, fW: 32, fH: 38 }, { sx: 15 + 35 * 4, sy: 28 + 36 * 15, fW: 32, fH: 38 }, { sx: 15 + 35 * 4, sy: 35 + 36 * 16, fW: 32, fH: 38 }, { sx: 15 + 35 * 4, sy: 42 + 36 * 17, fW: 32, fH: 38 }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_left_down',
	        frames: [{ sx: 18 + 35 * 3, sy: 44 + 36 * 17, fW: 32, fH: 38, flip: true }, { sx: 18 + 35 * 3, sy: 36 + 36 * 16, fW: 32, fH: 38, flip: true }, { sx: 18 + 35 * 3, sy: 26 + 36 * 15, fW: 32, fH: 38, flip: true }, { sx: 18 + 35 * 3, sy: 20 + 36 * 14, fW: 32, fH: 38, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_left',
	        frames: [{ sx: 24 + 35 * 2, sy: 47 + 36 * 17, fW: 32, fH: 32, flip: true }, { sx: 24 + 35 * 2, sy: 40 + 36 * 16, fW: 32, fH: 32, flip: true }, { sx: 24 + 35 * 2, sy: 33 + 36 * 15, fW: 32, fH: 32, flip: true }, { sx: 24 + 35 * 2, sy: 26 + 36 * 14, fW: 32, fH: 32, flip: true }]
	    });

	    sprite.animations.add({
	        key: 'move_gold_left_up',
	        frames: [{ sx: 24 + 35 * 1, sy: 28 + 36 * 14, fW: 32, fH: 33, flip: true }, { sx: 24 + 35 * 1, sy: 34 + 36 * 15, fW: 32, fH: 33, flip: true }, { sx: 24 + 35 * 1, sy: 40 + 36 * 16, fW: 32, fH: 33, flip: true }, { sx: 24 + 35 * 1, sy: 46 + 36 * 17, fW: 32, fH: 33, flip: true }]
	    });

	    sprite.animations.play({ key: sprite.dir, delay: 16 });
	};

	exports.default = Animations;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Buildings2 = __webpack_require__(88);

	var _Buildings3 = _interopRequireDefault(_Buildings2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Town = function (_Buildings) {
	    _inherits(Town, _Buildings);

	    function Town(game, options) {
	        _classCallCheck(this, Town);

	        var _this = _possibleConstructorReturn(this, (Town.__proto__ || Object.getPrototypeOf(Town)).call(this, game, options));

	        _this.animations.add({
	            key: 'first',
	            frames: [{ sx: 265, sy: 5, fW: 128, fH: 128 }]
	        });

	        _this.animations.playOnce({ key: 'first', delay: 16 });
	        _this.unWalkable(5);
	        return _this;
	    }

	    _createClass(Town, [{
	        key: 'update',
	        value: function update(dt) {
	            _get(Town.prototype.__proto__ || Object.getPrototypeOf(Town.prototype), 'update', this).call(this, dt);
	        }
	    }]);

	    return Town;
	}(_Buildings3.default);

	exports.default = Town;

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Sprite2 = __webpack_require__(6);

	var _Sprite3 = _interopRequireDefault(_Sprite2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Building = function (_Sprite) {
	    _inherits(Building, _Sprite);

	    function Building(game, options) {
	        _classCallCheck(this, Building);

	        return _possibleConstructorReturn(this, (Building.__proto__ || Object.getPrototypeOf(Building)).call(this, game, options));

	        // const startPos = this.game.VAR.pathfinder.getTileBySprite(this);
	        // this.currentPosition = this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, 3);
	        // this.nextPosition = null;
	    }

	    _createClass(Building, [{
	        key: "onClick",
	        value: function onClick() {
	            this.selectedBorder();
	        }
	    }, {
	        key: "selectedBorder",
	        value: function selectedBorder() {
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

	        // update(dt) {
	        //     super.update(dt);

	        // }

	    }, {
	        key: "restartPosition",
	        value: function restartPosition() {
	            if (this.nextPosition) {
	                this.game.VAR.pathfinder.reRenderTile(this.nextPosition.row, this.nextPosition.column, 1);
	            }

	            if (this.currentPosition) {
	                this.game.VAR.pathfinder.reRenderTile(this.currentPosition.row, this.currentPosition.column, 1);
	            }

	            this.nextPosition = null;
	            this.currentPosition = null;
	        }
	    }, {
	        key: "unWalkable",
	        value: function unWalkable(index) {
	            for (var i = 0; i < this.width; i += 32) {
	                for (var j = 0; j < this.height; j += 32) {
	                    var startPos = this.game.VAR.pathfinder.getTileByCords(this.x + i, this.y + j);
	                    this.currentPosition = this.game.VAR.pathfinder.reRenderTile(startPos.row, startPos.column, index);
	                    this.game.easystar.setAdditionalPointCost(Math.floor((this.x + i) / 32), Math.floor((this.y + j) / 32), 20);
	                }
	            }
	        }
	    }]);

	    return Building;
	}(_Sprite3.default);

	exports.default = Building;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _Buildings2 = __webpack_require__(88);

	var _Buildings3 = _interopRequireDefault(_Buildings2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GoldMine = function (_Buildings) {
	    _inherits(GoldMine, _Buildings);

	    function GoldMine(game, options) {
	        _classCallCheck(this, GoldMine);

	        var _this = _possibleConstructorReturn(this, (GoldMine.__proto__ || Object.getPrototypeOf(GoldMine)).call(this, game, options));

	        _this.animations.add({
	            key: 'first',
	            frames: [{ sx: 12, sy: 10, fW: 96, fH: 96 }]
	        });

	        _this.animations.playOnce({ key: 'first', delay: 16 });
	        _this.unWalkable(4);
	        return _this;
	    }

	    _createClass(GoldMine, [{
	        key: 'onClick',
	        value: function onClick() {
	            if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && this.game.VAR.sellectedObj.cargo === 'empty') {
	                var endPos = this.game.VAR.pathfinder.getTileBySprite(this);
	                this.game.VAR.sellectedObj.restartPosition();
	                this.game.VAR.sellectedObj.move(endPos);
	            } else if (this.game.VAR.sellectedObj && this.game.VAR.sellectedObj.type === 'worker' && this.game.VAR.sellectedObj.cargo === 'gold') {
	                var _endPos = this.game.VAR.pathfinder.getTileBySprite(this.game.VAR.town);
	                this.game.VAR.sellectedObj.restartPosition();
	                this.game.VAR.sellectedObj.move(_endPos);
	            } else {
	                _get(GoldMine.prototype.__proto__ || Object.getPrototypeOf(GoldMine.prototype), 'onClick', this).call(this);
	            }
	        }

	        // update(dt) {
	        //     super.update(dt);
	        // }

	    }]);

	    return GoldMine;
	}(_Buildings3.default);

	exports.default = GoldMine;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Rect2 = __webpack_require__(11);

	var _Rect3 = _interopRequireDefault(_Rect2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Hud = function (_Rect) {
	    _inherits(Hud, _Rect);

	    function Hud(game, options) {
	        _classCallCheck(this, Hud);

	        var _this = _possibleConstructorReturn(this, (Hud.__proto__ || Object.getPrototypeOf(Hud)).call(this, game, options));

	        _this.immovable = true;
	        return _this;
	    }

	    _createClass(Hud, [{
	        key: "onClick",
	        value: function onClick() {
	            console.log('rect');
	            return false;
	        }
	    }]);

	    return Hud;
	}(_Rect3.default);

	exports.default = Hud;

/***/ })
/******/ ]);