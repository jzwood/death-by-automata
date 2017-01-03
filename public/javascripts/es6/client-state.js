/*
 * Clubhouse Factory
 */

function newController(size, p) {
  let user = newUser(),
  animator = newAnimator(size, p)

  return {
    onEnter(s,r,keycode){
      // console.log(keycode)
      if(keycode === 13){
        user.readInput()
        s.emit('clientDataPush',r, user.getRule())
      }
    },
    getColor(colorIndex){
      return animator.getColor(colorIndex)
    },
    setSize(s){
      animator.setSize(s)
    },
    update(state){
      animator.setState(state)
    },
    animate() {
      animator.draw()
    }
  }
}

function newAnimator(size, p5){
  let state = []
  const colors = ['#000000','#ff00ff','#00ffff','#00ff00','#ffff00','#ff0000']
  let gridSize = 0, side = 0
  // console.assert(size%gridSize === 0)

  return {
    draw(){
      for(let i=0, n=state.length; i<n; i++){
        p5.fill(colors[state[i]])
        p5.rect( side * (i%gridSize), side * ~~(i/gridSize), side, side)
      }
    },
    getColor(colorIndex){
      return colorIndex > 0 && colorIndex < colors.length ? colors[colorIndex] : '#fff'
    },
    setSize(s){
      size = s
      side = size / gridSize
    },
    setState(s){
      state = s.slice(0)
      gridSize = Math.sqrt(state.length)
      side = size / gridSize
    }
  }
}

function newUser(){
  let rules = []
  let terminal = document.querySelector('.wrapper__terminal')

  function parseRules(r){
    //parse S/B rules
    let sb = r.split('/').map( i => {
      return i.trim()
    }).join('/')

    return sb
  }
  return {
    readInput(){
      rules.push(parseRules(terminal.value))
    },
    getRule(){
      let rule = rules.slice(-1).toString()
      return rule.length ? rule : '/'
    }
  }
}
