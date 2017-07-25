(function () {

  var username = prompt('Hi, what is you name').toUpperCase();

  init();

  function init() {
    var socket = io();
    socket.emit('hello', username);

    document.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();

      const userMessage = document.querySelector('#m').value;

      if (userMessage === 'clear') {
        clearMessages();
      } else {
        const newMessage = `${username}: ${userMessage}`;
        appendMessage(newMessage);
        socket.emit('chat message', newMessage);
      }
    });

    socket.on('chat message', (msg) => {
      appendMessage(msg);
    });

    socket.on('userleft', (message) => {
      appendMessage(message);
    });
  }

  function appendMessage(message) {
    var newli = document.createElement('li');
    newli.textContent = message;

    document.querySelector('#messages').appendChild(newli);
    document.querySelector('#m').value = '';
  }

  function clearMessages() {
    const elm = document.querySelector('#messages');
    while (elm.firstChild) {
      elm.removeChild(elm.firstChild);
    }

    document.querySelector('#m').value = '';
  }

})();