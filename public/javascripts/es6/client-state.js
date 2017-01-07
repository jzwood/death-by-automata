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

  let p1 = document.querySelector('.flags--color1'),
  p2 = document.querySelector('.flags--color2'),
  p3 = document.querySelector('.flags--color3'),
  p4 = document.querySelector('.flags--color4')

  let stampPercent = (pn,perc,n) => {
    if(n && pn.textContent !== perc){
      pn.textContent = (100 * (perc/n)).toFixed(1) + '%'
    }
  }

  return {
    draw(){
      const n = state.length
      let percentage = [0,0,0,0]
      for(let i=0; i<n; i++){
        const colorCode = state[i]
        p5.fill(colors[colorCode])
        p5.rect( side * (i%gridSize), side * ~~(i/gridSize), side, side)
        if(colorCode > 0 && colorCode < 5) percentage[colorCode - 1]++
      }
      // console.log(percentage)
      stampPercent(p1,percentage[0],n)
      stampPercent(p2,percentage[1],n)
      stampPercent(p3,percentage[2],n)
      stampPercent(p4,percentage[3],n)
      // p2.textContent = percentage[1]/n + '%'
      // p3.textContent = percentage[2]/n + '%'
      // p4.textContent = percentage[3]/n + '%'
      // console.log(percentage[0]/n + '%')
      // console.log(percentage)
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
  let terminal = document.querySelector('.terminal__input')

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
