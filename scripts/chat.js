// adding new chat document
//setting up a realtime listener to get new chats
//update the username
//updating the room

class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }

    async addChat(message) {
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document to the database
        const response = await this.chats.add(chat);
        return response;
    }

    //get the chats from the database and listen for new ones
    getChats(callback) {
        this.unsub = this.chats
            .where('room', '==', this.room) // we only use a double == in firestore
            .orderBy('created_at', 'asc')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        callback(change.doc.data());
                    }
                });
            });
    }

    updateUsername(username) {
        this.username = username;
        localStorage.setItem('username', username);
    }

    updateRoom(room) {
        this.room = room;
        console.log('room updated');

        if (this.unsub) {
            this.unsub();
        }
        localStorage.setItem('room', room);
    }
}