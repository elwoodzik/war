class DoublyLinkedList {

    constructor() {
        this.size = 0;
        this.head = null;
        this.tail = null;
    }

    node(element) {
        this.element = element;
        this.next = null;
        this.prev = null;
    }

    view() {
        let current = this.head;
        let string = '';

        while (current) {
            string += (current.element + ", ");
            current = current.next;
        }
        if (string === '') {
            return "list is empty";
        } else {
            return string;
        }
    }

    append(element) {
        const node = new this.node(element);
        
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

    viewAt(position) {
        if (position >= 0 && position <= this.size) {
            let current = this.head;
            let index = 0;
            while (position > index) {
                current = current.next;
                index++;
            }
            return current.element;
        } else {
            return "no such position on list"
        }
    };

    insertAt(position, element) {
        let node = new this.node(element);
        let current = this.head;
        let index = 0;
        let previous;
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

    removeAt(position) {
        if (position >= 0 && position <= this.size) {
            let current = this.head;
            let index = 0;
            let previous;
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

    viewReverse() {
        let current = this.tail;
        let returnString = '';
        if (this.size != 0) {
            while (current) {
                returnString += (current.element + ", ");
                current = current.prev
            }
            return returnString;
        } else {
            return "this list is empty";
        }
    }
};

export default DoublyLinkedList;