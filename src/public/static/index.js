 // Copyright (C) 2021  Tarcísio J. Santana Rodrigues

 // This file is part of Chato.

 // Chato is free software: you can redistribute it and/or modify
 // it under the terms of the GNU General Public License as published by
 // the Free Software Foundation, either version 3 of the License, or
 // (at your option) any later version.

 // Chato is distributed in the hope that it will be useful,
 // but WITHOUT ANY WARRANTY; without even the implied warranty of
 // MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 // GNU General Public License for more details.

 // You should have received a copy of the GNU General Public License
 // along with this program.  If not, see <https://www.gnu.org/licenses/>.

'use strict';

var username = 'Guest';

window.onload = () => {
  const socket = io();

  function writeMessage(data) {
    var messageElement = document.createElement('div');
    var senderNameElement = document.createElement('span');
    var messageTextElement = document.createElement('span');

    messageTextElement.className = 'Message';
    senderNameElement.className = 'SenderUsername';
    messageTextElement.className = 'MessageText';

    senderNameElement.innerText = data.sender.name;
    messageTextElement.innerText = ' ' + data.text;

    messageElement.appendChild(senderNameElement);
    messageElement.appendChild(messageTextElement);

    document
      .getElementById('messages')
      .appendChild(messageElement);
  }

  function addMessage(data) {
    if (data.sender.name === username)
      data.sender.name = 'You';

    data.sender.name += ':';

    writeMessage(data);
  }

  function notifyEntrance(data) {
    if (data.message)
      return writeMessage({ sender: { name: data.message }, text: '' });

    writeMessage({
      sender: { name: data.name + ' has joined the Hub.'},
      text: ''
    });
  }

  function notifyExit(data) {
    if (data.name === username)
      return writeMessage({
        sender: { name: 'You have left the Hub.'},
        text: ''
      });

    writeMessage({
      sender: { name: data.name + ' has left the Hub.'},
      text: ''
    });
  }

  socket.on('user-joined-the-hub', data => {
    notifyEntrance(data);
  });

  socket.on('new-message', data => {
    addMessage(data);
  });

  socket.on('get-messages-result', data => {
    for (let message of data) {
      addMessage(message);
    }
  })

  socket.on('user-disconnected', data => {
    notifyExit(data);
  });

  document
    .getElementById('messageForm')
    .addEventListener('submit', event => {
      event.preventDefault();

      var message = {
        sender: username,
        text: event.target.messageText.value
      };

      socket.emit('send-message', message);

      event.target.messageText.value = '';
    });

    document
    .getElementById('signinForm')
    .addEventListener('submit', event => {
      event.preventDefault();

      username = event.target.username.value;

      socket.emit('get-messages', null);

      socket.emit('enter-hub', { name: username });

      document.getElementById('usernameInfo').innerText = 'Chatting as ' + username;
      document.body.removeChild(document.getElementById('signinForm'));
    });
}
