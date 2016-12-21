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
        s.emit('clientDataPush', user.getRule())
      }
    },
    update: state => {
      animator.setState(state)
    },
    animate: () => {
      animator.draw()
    }
  }
}

function newAnimator(){
  let state = []
  const colors = ['#000000','#ff00ff','#00ffff','#00ff00','#ffff00','#ff0000']

  return {
    draw(){
      
    },
    setState(s){
      state = s.slice(0)
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
