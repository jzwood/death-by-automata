/*
 * Clubhouse Factory
 */

function newController(dimensions) {
  let map = new Map()
  let rules = []
  function parseRules(r){
    //parse S/B rules
    let sb = r.split('/').map( i => {
      return i.trim()
    })
  }
  return {
    draw(){
    },
    getMap(){ return map },
    initMember(id){
      let user = newUser(id)
      map.set(id, user)
    }
  }
}

function newUser(){

  return {
    setRules(r){
        rules.push(r)
    },
    getRules(){
      return rules.slice(-1)
    }
  }
}
