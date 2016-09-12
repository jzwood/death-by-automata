var socket = io();
var form = document.querySelector('form')
form.addEventListener('submit',function(e){
  e.preventDefault();
  var m = document.querySelector('#m')
  socket.emit('chat message', m.value);
  m.value = ''
  return false;
}, false)
socket.on('chat message', function(msg){
  var temp = document.querySelector('.template').content
  temp.querySelector('li').textContent = msg
  var clone = document.importNode(temp, true)
  var messages = document.querySelector('#messages')
  messages.appendChild(clone)
});
