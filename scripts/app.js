const client = new tmi.Client({
	connection: { reconnect: true },
	channels: [ 'Dr_DinoMight' ]
});

const disallowList = [
    'PretzelRocks',
    'StreamElements'
];

let users = [];

client.connect();

client.on("chat", (channel, userstate, message, self) => {
    // Don't listen to my own messages..
    if (self || disallowList.indexOf(userstate['display-name']) === 1) return;
    // Do your stuff.
    if (users.indexOf(userstate['display-name']) === -1) {
        users.push(userstate['display-name']);
        console.log(users);
        createElement(userstate, message);
    }
    else{
        appendElement(userstate, message);
    }

});


client.on('message', (channel, tags, message, self) => {
	// "Alca: Hello, World!"
	console.log(`${tags['display-name']}: ${message}`);
});


var appendElement = (userstate, message) => {
    let avatarHolder = document.getElementById(userstate.username);

    if (! avatarHolder) return;

    let chat = avatarHolder.querySelector('p.message');
    console.log(avatarHolder,chat, message);
    chat.textContent = message;
}

var createElement = (userstate, message) => {
    let avatarWrapper  = document.createElement("div");
    avatarWrapper.className = 'x';


    let avatarHolder  = document.createElement("div");
    avatarHolder.classList.add('el','y');
    avatarHolder.id = userstate.username;
    let chatHolder =  document.getElementById("chat-holder");

    if (!chatHolder) return;

    let imgHolder = document.createElement('img');

    imgHolder.src = './resources/img/pewpew_pixel.gif';
    avatarHolder.appendChild(imgHolder);

    let user = document.createElement('p');
    user.textContent = userstate['display-name'];
    user.className = 'name';
    avatarHolder.appendChild(user);

    let messageHolder = document.createElement('p');
    messageHolder.className = 'message';
    messageHolder.textContent = message;


    avatarHolder.appendChild(messageHolder);
    avatarWrapper.appendChild(avatarHolder);
    chatHolder.appendChild(avatarWrapper);

}
