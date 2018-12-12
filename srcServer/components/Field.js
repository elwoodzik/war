
class Field {

    static ID = 1;

    constructor(options) {

        this.id = Field.ID++;
        this.x = options.x || 100;
        this.y = options.y || 100;

        this.growTime = 10;
        this.currentGrowTime = 0;
        this.interval;

        this.create();
    }

    create() {
        this.type = null;
    }

    update(dt) {

    }

    setSow() {
        this.type = 'filed_sow';
    }

    setWater() {
        this.type = 'filed_waterSow';
    }

    growUp() {
        if (this.currentGrowTime < this.growTime) {
            this.currentGrowTime++;
        }
    }

};

export default Field;
