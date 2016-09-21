"use strict";

var io, msg
let isPrivate = location.href.indexOf('/private'),
socket = isPrivate > 0 ? io('/private') : io('/public')

document.addEventListener( "DOMContentLoaded",  function(){
  socket.on('init', function(keys){
      if(!msg){ msg = keys.msg; }
      initShip(keys.socket.id)
  })
}, false )

function addFormListener(form, socket){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    let m = document.querySelector('#m')

    socket.emit(msgId, m.value)

    appendMsg(m.value)
    m.value = ''
    return false
  }, false)
}

function appendMsg(msg){
  let temp = document.querySelector('.template').content
  temp.querySelector('li').textContent = msg
  let clone = document.importNode(temp, true)
  let messages = document.querySelector('#messages')
  messages.appendChild(clone)
  return false
}
