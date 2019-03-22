import AssetManager from './AssetManager';
import Mobile from './Mobile';
import GameStateFactory from './GameStateFactory';
import GameObjectFactory from './GameObjectFactory';
import Physic from './Physic';
import Mouse from './Mouse';
import Keyboard from './Keyboard';


let elapsed = 0;
let last = 0;
let step = 1 / 60;

class Leya {

    constructor(width, height, orientation, scallable, mobile, images) {

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

        this.mobile = new Mobile(this, mobile);

        this.state = new GameStateFactory(this);

        this.add = new GameObjectFactory(this);

        this.physic = new Physic(this);

        this.mouse = new Mouse(this);

        this.keyboard = new Keyboard(this);

        this.createCanvas(width, height, orientation);

        this.scallable(scallable);

        return this.preloadedImages();
    }

    preloadedImages() {
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
        })

        return AssetManager.loadSync(this.images)
            .then(() => {
                return this;
            })
    }

    render(dt) {
        if (this.renderer) {
            this.clearCanvas(this.ctx);
            this.fadeOutHandler();
            this.fadeInHandler();

            for (let i = 0, iMax = this.gameObjects.length; i < iMax; i++) {
                let entityRender = this.gameObjects[i];
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

    update(dt) {
        for (let u = 0, uMax = this.gameObjects.length; u < uMax; u++) {
            let entityUpdate = this.gameObjects[u];

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

    animationLoop(timestamp) {
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

    createCanvas(width, height, orientation) {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d", { alpha: false });
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

    scallable(bool) {
        this.scaleUsed = bool;
        this.resizeCanvas(this.canvas, this.orientation);

        if (this.bgcanvas) {
            this.resizeCanvas(this.bgcanvas, this.orientation);
        }
        if (this.onbgcanvas) {
            this.resizeCanvas(this.onbgcanvas, this.orientation);
        }
        window.removeEventListener("resize", () => this.scallableFunction());
        if (bool) {
            window.addEventListener("resize", () => this.scallableFunction());
        }
    }

    scallableFunction() {
        this.resizeCanvas(this.canvas, this.orientation);

        if (this.bgcanvas) {
            this.resizeCanvas(this.bgcanvas, this.orientation);
        }
        if (this.onbgcanvas) {
            this.resizeCanvas(this.onbgcanvas, this.orientation);
        }
    }

    resizeCanvas(canvas, orientation) {
        if (!orientation) {
            const w = window.innerWidth;
            const h = window.innerHeight;

            this.portViewWidth = this.portViewWidth;
            this.portViewHeight = this.portViewHeight;

            if (this.scaleUsed) {
                this.scale1 = Math.max(0.2, Math.min(
                    (Math.min(w, w) / this.screenWidth),
                    (Math.min(h, h) / this.screenHeight)
                ));

                let width = Math.min(Math.floor(this.screenWidth * this.scale1), w);
                let height = Math.min(Math.floor(this.screenHeight * this.scale1), h);

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
            const w = window.innerHeight;
            const h = window.innerWidth;

            this.portViewWidth = this.portViewHeight;
            this.portViewHeight = this.portViewWidth;

            this.scale1 = Math.max(0.2, Math.min(
                (w / this.screenWidth),
                (h / this.screenHeight)
            ));

            let width = Math.floor(this.screenWidth * this.scale1);
            let height = Math.floor(this.screenHeight * this.scale1);

            canvas.style.width = height + "px";
            canvas.style.height = width + "px";
        }
    }

    sortByIndex(arr) {
        this.gameObjects.sort((obj1, obj2) => {
            if (!obj1.zIndex) {
                obj1.zIndex = 1;
            }

            if (obj1.zIndex > obj2.zIndex)
                return 1;
            else if (obj1.zIndex < obj2.zIndex) {
                return -1;
            } else {
                return 0;
            }
        });
    }

    sortArrayByIndex(arr) {
        if (arr) {
            arr.sort((obj1, obj2) => {
                if (!obj1.zIndex) {
                    obj1.zIndex = 1;
                }

                if (obj1.zIndex > obj2.zIndex)
                    return 1;
                else if (obj1.zIndex < obj2.zIndex) {
                    return -1;
                } else {
                    return 0;
                }
            });
        }
    }

    rand(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    randF(min, max) {
        return (Math.random() * (max - min + 1)) + min;
    }

    saveData(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    }

    saveDataAd(name, data) {
        let oldItems = this.loadData(name) || [];
        oldItems.push(data);

        localStorage.setItem(name, JSON.stringify(oldItems));
    }

    loadData(name) {
        const data = localStorage.getItem(name);
        //
        if (data) {
            return JSON.parse(data);
        }
        else {
            return false;
        }
    }

    removeData(name) {
        localStorage.removeItem(name);
    }

    shuffle(arr) {
        let counter = arr.length;
        let tmp;
        let index;
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

    clearCanvas(context) {
        context.clearRect(0, 0, this.width, this.height);
    }

    capturePreviousPositions(entities) {
        for (let u = 0, uMax = entities.length; u < uMax; u++) {
            let entityCapture = entities[u];
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

    setPortView(width, height) {
        if (!this.orientation) {
            this.portViewWidth = width;
            this.portViewHeight = height;
        } else {
            this.portViewWidth = height;
            this.portViewHeight = width;
        }
    }

    loaded() {
        return this.create(this);
    }

    fadeOut(time, key, callback) {
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

    fadeIn(time, callback) {
        this.timerFade = time;
        this.currentTimerFade = 0;
        this.timerCallback = callback;
        this.timerFadeInActive = true;
    }

    fadeOutHandler() {
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

    showFPS() {
        this.fpsmeter = new FPSMeter({ decimals: 0, graph: false, theme: 'dark', left: '5px' });
        this.useFpsCounter = true;
    }

    fadeInHandler() {
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
};

export default Leya;