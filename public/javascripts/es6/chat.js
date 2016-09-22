"use strict";

var io, socket
let isConnected = false, fleet = new Map()

document.addEventListener( "DOMContentLoaded",  function(){
  initShip("hello")

  let isPrivate = location.href.indexOf('/private'),
  socket = isPrivate > 0 ? io('/private') : io('/public')
  socket.on('init', function(data){ onConnect(data); })

}, false )

function onConnect(data){
  if(!isConnected){ initSocketListener(data.msg); isConnected = true; }
}

function initSocketListener(msg){
  socket.on(msg.input, function(data){ onInput(data); })
  socket.on(msg.newroom, function(data){ onNewRoom(data); })
}

function onInput(data){

}

function onNewRoom(data){

}

// function addFormListener(form, socket){
//   form.addEventListener('submit',function(e){
//     e.preventDefault();
//     let m = document.querySelector('#m')
//
//     socket.emit(msgId, m.value)
//
//     appendMsg(m.value)
//     m.value = ''
//     return false
//   }, false)
// }

// function appendMsg(msg){
//   let temp = document.querySelector('.template').content
//   temp.querySelector('li').textContent = msg
//   let clone = document.importNode(temp, true)
//   let messages = document.querySelector('#messages')
//   messages.appendChild(clone)
//   return false
// }
