/*
Club member Factory
*/

function newClubMember(id, dim) {
    let index = 0, others = false, isMe = false
    const maxVel = 2, scale = 70, border = 2, maxDim = dim * dim

    let keyState = {'up':false, 'down':false, 'left':false, 'right':false}
    if (isMyId(id)) {
      isMe = true
      assignKeys(keyState) // binds your keyboard to only your character
    }

		let move = (dx,dy) => {
      const xdisp = index + dx
      if(acceptableIndex(xdisp, dim)) index = xdisp
      const ydisp = index + dy * dim
      if(acceptableIndex(ydisp, maxDim)) index = ydisp
    }

    return {
      isSelf(){
        return isMe
      },
      update(){
        console.log("do update step here")
      },
      getProps(){
        return index
      },
      setProps(i){
        index = i
      }
    }
}
