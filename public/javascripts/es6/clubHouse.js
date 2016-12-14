/*
Clubhouse Factory
*/

function newClubHouse(dimensions) {
  let map = new Map()
  return {
    update(){
      for (let member of map.values()) {
        member.update()
      }
    },
    updateMemberInformation(id, i) {
      map.get(id).setProps(i)
    },
    getMap(){ return map },
    initMember(id,i){
      let member = newClubMember(id,dimensions)
      member.setProps(i)
      map.set(id, member)
    }
  }
}
