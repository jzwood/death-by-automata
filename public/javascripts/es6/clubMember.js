/*
Club member Factory
*/

function newClubMember(id, dim) {
    let index = 0, others = false, isMe = false
    const maxVel = 2, scale = 70, border = 2, maxDim = dim * dim

    const w = local.canvasWidth / dim,
    h = local.canvasHeight / dim

    let keyState = {'up':false, 'down':false, 'left':false, 'right':false}
    if (isMyId(id)) {
      isMe = true
      assignKeys(keyState) // binds your keyboard to only your character
    }

    const throttled = 200
		let moveH = throttle(dx => {
        const xdisp = index % dim + dx
        if(acceptableIndex(xdisp, dim)){
          index += dx
        }
    },throttled)

    let moveV = throttle(dy => {
        const ydisp = index + dy * dim
        if(acceptableIndex(ydisp, maxDim)){
          index = ydisp
        }
    },throttled)

    return {
      isSelf(){
        return isMe
      },
      update(){
        // local.environment.setSquareIndex(index,0)
        if(keyState.up) moveV(-1)
        else if(keyState.down) moveV(1)
        if(keyState.left) moveH(-1)
        else if(keyState.right) moveH(1)

        if(keyState.r) local.environment.setSquareIndex(index,1)

        window.stroke("#ff0000")
        window.strokeWeight(1)
        const edge = 0.25
        window.noFill()
        window.rect(w * (index%dim), h * ~~(index/dim), h-edge, w-edge)
        // local.environment.setSquareIndex(index,1)
      },
      getProps(){
        return index
      },
      setProps(i){
        index = i.index
      }
    }
}
