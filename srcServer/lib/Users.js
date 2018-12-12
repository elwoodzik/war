class Users {

    constructor(multiplayer) {
        this.users = {};
        this.multiplayer = multiplayer;
    }

    addNewUser(socket, callback) {
        this.users[socket.id] = {
            id: socket.id,
            objs: {},
            mouse: {
                mouseX: 1,
                mouseY: 1
            },
            camera: {
                cameraX: 0,
                cameraY: 0,
            }
        }

        this.multiplayer.rooms.join('global', socket, (err, room, sock) => {
            if (err) {
                console.error(err);
                callback(err);
            } else {
                callback(false);
            }
        });
    }

    removeUser(socket) {
        const id = socket.id;
        let user = this.findUserById(id);

        if (user) {
            this.removeObjs(id, socket);

            delete this.users[id];

            this.multiplayer.rooms.leaveRoom(user, socket, (err) => {
                if (err) {
                    console.error("\nWystąpił błąd przy probie disconnect\n");
                } else {
                    console.log("\nUżytkownik poprawnie WYLOGOWANY z servera  " + id + "\n");
                    // this.multiplayer.objs.remove(id);
                    if (user.room) {
                        let room = this.multiplayer.rooms.findRoomByName(user.room);
                        this.multiplayer.socket.emitToRoom('leave room', room.name, room);
                        this.multiplayer.socket.emitToMe('players online', socket, { online: Object.keys(this.multiplayer.users.users).length });
                        this.multiplayer.socket.broadcastToRoom(socket, 'players online', 'global', { online: Object.keys(this.multiplayer.users.users).length });
                    }
                }
            })
        }
        else {
            console.error('blad kurwa!');
        }
    }

    findUserById(id) {
        if (this.users[id]) {
            return this.users[id];
        }
        console.error('Nie znaleziono uzytkownika o id: ' + id);
        return false;
    }

    addObj(obj, socketId) {
        const user = this.findUserById(socketId);
        Object.assign(obj, { user: user });


        user.objs[obj.constructor.name] = obj;

    }

    removeObjs(socketId, socket) {
        const user = this.findUserById(socketId);
        user.objs = null;
        this.multiplayer.game.gameObjects = this.multiplayer.game.gameObjects.filter((obj) => {
            if (obj.socketId !== socketId) {
                return obj;
            }
        })
        this.multiplayer.socket.broadcastToRoom(socket, 'remove objs', 'global', { socketId: socketId });
    }
}

export default Users;