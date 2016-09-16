var io,
isPrivate = location.href.indexOf('/private'),
socket = isPrivate > 0 ? io('/private') : io('/public'),
msgId = '7ydhidjf'

document.addEventListener( "DOMContentLoaded",  function(){

  let form = document.querySelector('form')

  addFormListener(form,socket)

  socket.on(msgId, function(msg){
    appendMsg(msg)
  })

}, false )

function addFormListener(form, socket){
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var m = document.querySelector('#m')

    socket.emit(msgId, m.value)

    appendMsg(m.value)
    m.value = ''
    return false
  }, false)
}

function appendMsg(msg){
  var temp = document.querySelector('.template').content
  temp.querySelector('li').textContent = msg
  var clone = document.importNode(temp, true)
  var messages = document.querySelector('#messages')
  messages.appendChild(clone)
  return false
}
