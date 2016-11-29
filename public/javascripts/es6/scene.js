function drawZones(w, h) {
  let winZone = new PIXI.Graphics()

  const dividerLine = h / 4

  // winzone bgcolor
  winZone.beginFill(0x12ffa5)
  winZone.drawRect(0, 0, w, dividerLine)
  winZone.endFill()
  stage.addChild(winZone)

  // winzone text
  const style = {
    fontFamily: 'Arial',
    fontSize: '50px',
    fontWeight: 'bold',
    fill: '#F7EDCA'
  }
  let winnerText = new PIXI.Text('WINNER', style)

  winnerText.x = w / 2 - winnerText.width / 2
  winnerText.y = dividerLine - 1.5 * winnerText.height

  stage.addChild(winnerText)

  //division line
  let zoneDiv = new PIXI.Graphics()
  // set a fill and line style
  zoneDiv.lineStyle(4, 0xffffff, 1)
  zoneDiv.moveTo(0, dividerLine)
  for(let s = 20, m = w/s, i = m; i <= w; i+=m){
    zoneDiv.lineTo(i-m/2, dividerLine)
    zoneDiv.moveTo(i, dividerLine)
  }
  stage.addChild(zoneDiv)

  // losezone text
  let loserText = new PIXI.Text('LOSER', style)

  loserText.x = w / 2 - loserText.width / 2
  loserText.y = dividerLine + 0.5 * loserText.height

  stage.addChild(loserText)

  return dividerLine
}
