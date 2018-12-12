
import DoublyLinkedList from './DoublyLinkedList';

class Group {

    constructor(game) {
        this.game = game;
        this.entities = [];
        this.indexes = new DoublyLinkedList();
    }

    add(object, hide) {
        this.entities.push(object);
        this.indexes.append(this.entities.length -1);

        object.groupIndex = this.entities.length -1;
    
        if (hide) {
            object.hide();
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
};

export default Group;