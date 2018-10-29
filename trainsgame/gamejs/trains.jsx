//Aliases
let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    TextureCache = PIXI.utils.TextureCache;


let gameScene, dungeon, id, treasure



export default function setupTrainsScene(app) {
    //Make the game scene and add it to the stage
  gameScene = new Container();
  app.stage.addChild(gameScene);

    //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  gameScene.addChild(dungeon);

    //3. Create an optional alias called `id` for all the texture atlas
  //frame id textures.
  id = PIXI.loader.resources[treasHuntJs].textures;

  //Make the treasure box using the alias
  treasure = new Sprite(id["treasure.png"]);

    //Position the treasure next to the right edge of the canvas
  treasure.x = app.stage.width - treasure.width - 48;
  treasure.y = app.stage.height / 2 - treasure.height / 2;
  gameScene.addChild(treasure);

  // регистрируем отрисовку по сокетному событию
  webSocketBridge.listen(function(action, stream) {
    console.log("RESPONSE........:", action, stream);
    // console.log(JSON.parse(action.event.bi))
      let data = JSON.parse(action.event.bi)
      console.log(data)
      drawPlayGround(data)
      drawTrains(data)
  })

}

//отрисовываем тележки
function drawTrains(playGround){
    let trains = playGround['trains']
    let pathes = playGround['pathes']
    for(let trainK in trains){
        let train = trains[trainK]
        let path = pathes[train['pathNum']]

        //рисуем тележку
        let trainPic = new Sprite(id["blob.png"]);
        trainPic.x = path["coordBeg"]["x"];
        trainPic.y = path["coordBeg"]["y"];
        console.log("trainPic", trainK, train['pathNum'],  trainPic.x, trainPic.y)
        gameScene.addChild(trainPic);
    }


}

let lastCrossX=0; let lastCrossY=0;
let offSetX = 20; let offSetY = 10;
let lastLenghtX = 0; let lastLenghtY = 0;

//отрисовываем сетку дорог
function drawPlayGround(playGround){
    //отрисовывается 1 раз
    if(lastCrossX!=0){
        return;
    }
  // console.log(playGround);


  let crosses = playGround['crosses']
  let croscrossesNum = playGround['croscrossesNum']
  // for(let crossLine in croscrossesNum){
  // for(let crossLine in croscrossesNum){
  for(let i=0; i< croscrossesNum.length; i++){
      lastCrossX=offSetX
      if(i==0){
        // lastCrossY=offSetY
      }
    // for(let crossNum in crossLine) {
    for(let j=0; j<croscrossesNum[i].length; j++) {
      if(j==0){
        lastCrossY+=lastLenghtY
      }
      if(i==0 && j==0){
        lastCrossY=offSetY
      }
      let crosN = croscrossesNum[i][j]
      let cross = crosses[crosN]
        //console.log(cross);

        drawCross(cross, playGround['pathes'])
    }
  }

  //renderer.render(app);
}



function  drawCross(cross, pathes) {
  // рсуем линии только направо и вверх
   if(cross['dwPath']!=0){
    let path = pathes[cross['dwPath']]
      //console.log(path)
      drawPath(path,0,path['lengtOfPx'])
      // lastLenghtY = path['lengtOfPx']
  }

    if(cross['rightPath']!=0){
    let path = pathes[cross['rightPath']]
      //console.log(path)
      drawPath(path,path['lengtOfPx'],0)
      // lastLenghtX = path['lengtOfPx']
  }


}

function drawPath(path, moveX, moveY) {
    // console.log(lastCrossX,lastCrossY)
    // console.log(moveX,moveY)
    // console.log(lastLenghtX,lastLenghtY)
    // path["coordBeg"]["x"] = lastCrossX
    // path["coordBeg"]["y"] = lastCrossY

    var graphics = new Graphics()
    graphics.lineStyle(5, 0xFF0000);
    // draw a triangle using lines

    graphics.moveTo(path["coordBeg"]["x"],path["coordBeg"]["y"]);
    // graphics.moveTo(lastCrossX,lastCrossY);
    lastCrossX += moveX
    lastCrossY += moveY


    graphics.lineTo(path["coordEnd"]["x"],path["coordEnd"]["y"]);
    // graphics.lineTo(lastCrossX,lastCrossY);
    // path["coordEnd"]["x"] = lastCrossX
    // path["coordEnd"]["y"] = lastCrossY
    graphics.endFill();
    gameScene.addChild(graphics);
    //console.log("--",lastCrossX,lastCrossY)
    if(moveY != 0){
        lastLenghtY = moveY
        lastCrossY-=moveY
    }
}