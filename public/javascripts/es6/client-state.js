/*
 * Clubhouse Factory
 */

function newController(dimensions) {
  let user = newUser(),
  animator = newAnimator()

  return {
    onEnter(s,keycode){
      if(keycode === 13){
        user.setRules()
        s.emit('updateUser', user.getRule())
      }
    },
    'animate': animator.draw()
  }
}

function newAnimator(){
  let state = []
  const colors = ['red','blue','yellow','white']
  return {
    draw(){
    }
  }
}

function newUser(){
  let rules = []
  let terminal = document.querySelector('.terminal__input')

  function parseRules(r){
    //parse S/B rules
    let sb = r.split('/').map( i => {
      return i.trim()
    })
  }
  return {
    readInput(){
      rules.push(parseRules(terminal.textContent))
    },
    getRule(){
      return rules.slice(-1).toString()
    }
  }
}
