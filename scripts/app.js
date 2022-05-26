// DOM queries
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat');
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const chatRooms = document.querySelector('.chat-rooms');
const clearChat = document.querySelector('.clear-btn');

// class instances
const chatUI = new ChatUI(chatList);

//check local storage for a username
const username = localStorage.getItem('username') || 'Anon';
const chatroom = new Chatroom('general', username);


// get chats & render
chatroom.getChats(data => chatUI.render(data));

//add a new chat
console.log(newChatForm);
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    const message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => {
            newChatForm.reset();
        })
        .catch(err => console.log(err));
});

chatRooms.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatUI.clear();
        chatroom.getChats(data => chatUI.render(data));
    }
});

//update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    //get username from form
    const name = newNameForm.name.value.trim();
    //update username
    chatroom.updateUsername(name);
    //reset form
    newNameForm.reset();
    // show then hide the update message
    updateMssg.innerText = `Your name was updated to ${name}`;
    setTimeout(() => {
        updateMssg.innerText = '';
    }, 3000);
    
});

clearChat.addEventListener('click', () => {
    chatUI.clear();
});