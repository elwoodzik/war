

class CreationBar {

    constructor(game) {
        this.group = game.add.group();

        this.name = new Name(game, {});
        this.icon = new Icon(game, { key: 'icons' });

    
        this.group.add(this.name);
        this.group.add(this.icon);
    }

    set(info) {
        this.hide();
        this.name.use(info.name);
        this.icon.animations.playOnce({ key: info.imageKey });
        this.showDescription(info.descriptios);
        this.show();
    }

    hide() {
        this.group.hide();
    }

    show() {
        this.group.show();
    }
};

export default CreationBar;