
import DoublyLinkedList from './DoublyLinkedList';

class Group {

    constructor(game) {
        this.game = game;
        this.entities = [];
        this.indexes = new DoublyLinkedList();
    }

    add(object, hide) {
        if (Array.isArray(object)) {
            object.forEach((obj, index) => {
                this.entities.push(obj);
                this.indexes.append(this.entities.length - 1);

                obj.groupIndex = this.entities.length - 1;

                if (hide) {
                    obj.hide();
                }
            })
        } else {
            this.entities.push(object);
            this.indexes.append(this.entities.length - 1);

            object.groupIndex = this.entities.length - 1;

            if (hide) {
                object.hide();
            }
        }
    }

    spawn() {
        if (this.indexes.view() !== 'list is empty') {
            const index = this.indexes.viewAt(0);
            const entity = this.entities[index];

            if (entity) {
                entity.show();

                this.indexes.removeAt(0);
                return entity;
            } else {
                return false
            }
        }
    }

    recycle(object) {
        object.hide();
        this.indexes.append(object.groupIndex);
    }

    hide() {
        this.entities.forEach((entity, index) => {
            if (entity.used) {
                entity.hide();
            }
        })
    }

    show() {
        this.entities.forEach((entity, index) => {
            if (!entity.used) {
                entity.show();
            }
        })
    }
};

export default Group;