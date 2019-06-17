
class Mouse {

    constructor(game) {
        this.game = game;
        //
        this.platform = this.game.mobile.platform;
        this.used = true;
        this.click = false;
        this.hover = false;
        this.down = false;
        this.trig = false;
        this.sellectedObj = false;
        this.hoveredObj = {};
        this.mouseX = null;
        this.mouseY = null;
        this.currentTouches = [];
        this.touchesIntersects = [];
        this.currentTouchesActive = [];
    }

    initialize() {
        this.game.canvas.addEventListener("mousemove", (e) => { this.mouseMove(e) }, false);
        this.game.canvas.addEventListener("click", (e) => { this.mouseDown(e) }, false);
        // this.game.canvas.addEventListener("touchstart", (e) => { this.touchStart(e) }, false);
        // this.game.canvas.addEventListener("touchmove", (e) => { this.touchMove(e) }, false);
        // this.game.canvas.addEventListener("touchend", (e) => { this.touchEnded(e) }, false);
        this.game.canvas.addEventListener("mouseup", (e) => { this.mouseUp(e) }, false);
        this.game.canvas.addEventListener("contextmenu", (e) => { this.mouseRightDown(e) }, false);
    }

    enableHover() {
        this.hover = true;
    }

    disableHover() {
        this.hover = false;
    }

    findCurrentActiveTouchIndex(id) {
        for (let i = 0; i < this.currentTouchesActive.length; i++) {
            if (this.currentTouchesActive[i].id === id) {
                return i;
            }
        }
        // Touch not found! Return -1.
        return -1;
    }

    findCurrentTouchIndex(id) {
        for (let i = 0; i < this.currentTouches.length; i++) {
            if (this.currentTouches[i].id === id) {
                return i;
            }
        }
        // Touch not found! Return -1.
        return -1;
    }

    mouseMove(e) {
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
            let gameObjects = this.game.gameObjects.length;

            while (gameObjects--) {
                if (this.game.gameObjects[gameObjects].used && this.game.gameObjects[gameObjects].isRender) {
                    if (this.updateStats(this.game.gameObjects[gameObjects], this.game.gameObjects[gameObjects].immovable, this.game.gameObjects[gameObjects].hold)) {
                        if (this.game.gameObjects[gameObjects].onHover) {
                            if (this.hoveredObj.objID === this.game.gameObjects[gameObjects].objID) {
                                return false;
                            }
                            this.hoveredObj = this.game.gameObjects[gameObjects];
                            return this.game.gameObjects[gameObjects].onHover(this, this.game.gameObjects[gameObjects]);
                        }
                    }
                    if (this.hoveredObj.objID === this.game.gameObjects[gameObjects].objID) {
                        this.hoveredObj = {}
                        if (this.game.gameObjects[gameObjects].onLeave) {
                            return this.game.gameObjects[gameObjects].onLeave(this, this.game.gameObjects[gameObjects]);
                        }
                    }
                }
            }
            this.hoveredObj = {}
        }
    }

    touchMove(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        if (this.dragged) {
            for (let i = 0; i < touches.length; i++) {
                let touch = touches[i];
                const index = this.findCurrentTouchIndex(touch.identifier);

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

    touchStart(e) {
        e.preventDefault();
        const touches = e.changedTouches;
        // let touch = e.changedTouches[0];
        this.click = this.used ? true : false;

        for (let i = 0; i < touches.length; i++) {
            let touch = touches[i];

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

    touchEnded(e) {
        const touches = e.changedTouches;
        this.down = false;
        this.click = false;
        if (this.dragged) {
            this.dragged.zIndex = this.orginalZindex;
            this.game.sortByIndex();
            this.draggedAction(this, this.dragged);

            this.dragged = false;
        }
        for (let i = 0; i < touches.length; i++) {
            let touch = touches[i];

            let currentTouchActiveIndex = this.findCurrentActiveTouchIndex(touch.identifier);

            if (currentTouchActiveIndex >= 0) {
                let currentActiveTouch = this.currentTouchesActive[currentTouchActiveIndex];
                if (currentActiveTouch.obj) {
                    currentActiveTouch.obj.touchActive = false;
                    currentActiveTouch.obj.hovered = false;
                }

                this.currentTouchesActive.splice(currentTouchActiveIndex, 1);
            } else {
                // console.log('Touch active was not found!');
            }

            let currentTouchIndex = this.findCurrentTouchIndex(touch.identifier);

            if (currentTouchIndex >= 0) {
                let currentTouch = this.currentTouches[currentTouchIndex];

                this.currentTouches.splice(currentTouch, 1);
            } else {
                //console.log('Touch was not found!');
            }
        }
    }

    mouseRightDown(e) {
        e.preventDefault();
        //
        this.mouseX = e.offsetX / this.game.scale1;
        this.mouseY = e.offsetY / this.game.scale1;
        this.click = this.used ? true : false;
        this.down = true;
        this.trig = false;

        this.game.sortByIndex();

        let gameObjects = this.game.gameObjects.length;

        while (gameObjects--) {
            if (this.game.gameObjects[gameObjects].used && this.game.gameObjects[gameObjects].isRender) {
                if (this.updateStats(this.game.gameObjects[gameObjects], this.game.gameObjects[gameObjects].immovable, this.game.gameObjects[gameObjects].hold)) {
                    if (this.game.gameObjects[gameObjects].onSelect || this.game.gameObjects[gameObjects].onDeselect || this.game.gameObjects[gameObjects].onRightClick) {
                        if (this.sellectedObj) {
                            if (this.game.gameObjects[gameObjects].onRightClick && this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
                                this.sellectedObj.onRightClick(this, this.sellectedObj, this.sellectedObj);
                                return false;
                            }
                        }
                        else if (this.game.gameObjects[gameObjects].onRightClick) {
                            this.game.gameObjects[gameObjects].onRightClick(this, this.sellectedObj, this.game.gameObjects[gameObjects]);
                            this.sellectedObj = null;
                            return;
                        }
                    }
                }
            }
        }

        if (this.triggerHandlerRight && typeof this.triggerHandlerRight === 'function') {
            this.triggerHandlerRight(this);
        }
    }

    mouseDown(e) {
        e.preventDefault();
        //
        this.mouseX = e.offsetX / this.game.scale1;
        this.mouseY = e.offsetY / this.game.scale1;
        this.click = this.used ? true : false;
        this.down = true;
        this.trig = false;

        this.game.sortByIndex();

        let gameObjects = this.game.gameObjects.length;

        // for (let i = this.game.gameObjects.length - 1; i >= 0; i--) {
        while (gameObjects--) {
            if (this.game.gameObjects[gameObjects].used && this.game.gameObjects[gameObjects].isRender) {
                if (this.updateStats(this.game.gameObjects[gameObjects], this.game.gameObjects[gameObjects].immovable, this.game.gameObjects[gameObjects].hold)) {
                    if (this.game.gameObjects[gameObjects].onSelect || this.game.gameObjects[gameObjects].onDeselect || this.game.gameObjects[gameObjects].onClick) {
                        if (this.sellectedObj) {
                            if (this.game.gameObjects[gameObjects].onClick && this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
                                this.sellectedObj.onClick(this, this.sellectedObj, this.sellectedObj);
                                return false;
                            }
                            else if (this.game.gameObjects[gameObjects].onDrag && this.sellectedObj.objID === this.game.gameObjects[gameObjects].objID) {
                                this.dragged = this.game.gameObjects[gameObjects];
                                this.draggedStartX = this.dragged.x;
                                this.draggedStartY = this.dragged.y;
                                this.orginalZindex = this.dragged.zIndex;
                                this.dragged.zIndex = 100;
                                this.game.sortByIndex();
                                this.draggedAction = this.dragged.onDrag;
                                return false;
                            }
                            else if (this.game.gameObjects[gameObjects].onDeselect) {
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

    mouseUp(e) {
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

    intersects(obj, immovable) {
        const t = 2; //tolerance
        let tempMouseY = this.mouseY;
        let tempMouseX = this.mouseX;
        let xIntersect;
        let yIntersect;

        if (this.platform === 'desktop') {
            if (!immovable) {
                tempMouseX = tempMouseX + (this.game.camera.xScroll);
                tempMouseY = tempMouseY + (this.game.camera.yScroll);
            }

            xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.width;
            yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.height;
        }
        else if (this.platform === 'mobile') {
            for (let i = 0; i < this.currentTouches.length; i++) {
                tempMouseY = this.currentTouches[i].pageY;
                tempMouseX = (this.currentTouches[i].pageX - this.game.canvas.offsetLeft);

                if (!immovable) {
                    tempMouseX = tempMouseX + (this.game.camera.xScroll);
                    tempMouseY = tempMouseY + (this.game.camera.yScroll);
                }

                xIntersect = (tempMouseX + t) >= obj.x && (tempMouseX + t) <= obj.x + obj.width;
                yIntersect = (tempMouseY + t) >= obj.y && (tempMouseY - t) <= obj.y + obj.height;
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

    updateHoverStats(obj, immovable) {
        if (this.intersects(obj, immovable)) {
            obj.hovered = true;
            return true;
        } else {
            obj.hovered = false;
        }
    }

    updateStats(obj, immovable, hold) {
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

    drag(obj, immovable, callback) {

        if (this.click || this.currentTouches.length > 0) {

            if (!this.trig && !this.dragged) {
                if (Array.isArray(obj)) {
                    for (let u = obj.length - 1; u >= 0; u--) {
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
                }
                else if (typeof obj === 'object' && obj != null) {
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

    trigger(callback) {
        this.triggerHandler = callback;
    }

    triggerRight(callback) {
        this.triggerHandlerRight = callback;
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

    sellect(obj, immovable, callback, hold) {
        if (this.click || this.currentTouches.length > 0) {
            if (!this.trig) {

                this.trig = hold ? true : false;
                if (this.sellectedObj === obj) {
                    // console.log('a')
                    return;
                }
                if (Array.isArray(obj)) {
                    for (let u = obj.length - 1; u >= 0; u--) {
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
                }
                else if (typeof obj === 'object' && obj != null) {
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
                }
                else if (obj === null) {
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

    onHover(obj, immovable, callback) {
        if (Array.isArray(obj)) {
            for (let u = 0, uMax = obj.length; u < uMax; u++) {
                if (this.updateHoverStats(obj[u], immovable)) {
                    if (typeof callback === 'function') {
                        return callback.call(this, obj[u]);
                    }
                }
            }
        }
        else if (typeof obj === 'object' && obj != null) {
            if (this.updateHoverStats(obj, immovable)) {
                if (typeof callback === 'function') {
                    return callback.call(this, obj);
                }
            }
        }
        else if (!obj) {
            return false;
        }
    }


    showObjBorder() {
        this.sellectedObj.border.show();
        this.sellectedObj.border.width = this.sellectedObj.width;
        this.sellectedObj.border.height = this.sellectedObj.height;
        this.sellectedObj.border.x = this.sellectedObj.x;
        this.sellectedObj.border.y = this.sellectedObj.y;
    }
}

export default Mouse;