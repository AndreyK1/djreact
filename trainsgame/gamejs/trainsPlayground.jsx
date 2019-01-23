//Aliases
import {drawTrains, createArrowTextures, drawTrainsBesideSocketResponse} from "./train";
import {drawDepos} from "./depo";
import getContainers from "./storageTrains";
import {drawTressuresFirstTime} from "./Tressure";
// import train from "./train";

let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

var renderer = PIXI.autoDetectRenderer(800, 600);

let gameScene, dungeon, id, treasure, gameScene2

export default function setupTrainsScene(app) {

    //Make the game scene and add it to the stage
  gameScene = new Container();
  getContainers().gameScene = gameScene
  app.stage.addChild(gameScene);


   gameScene2 = new Container();
  getContainers().gameScene2 = gameScene2
    gameScene2.y = 500
    gameScene.tint = 0xFF0000;
    app.stage.addChild(gameScene2);

    //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  gameScene.addChild(dungeon);

   //gameScene2.addChild(dungeon);





    //3. Create an optional alias called `id` for all the texture atlas
  //frame id textures.
  id = PIXI.loader.resources[treasHuntJs].textures;
  getContainers().id = id

    createArrowTextures()

  // регистрируем отрисовку по сокетному событию
  //   webSocketBridgeStart.listen(function(action, stream) {
  webSocketBridgeGroup.listen(function(action, stream) {
    //console.log("RESPONSE........:", action, stream);
    // console.log(JSON.parse(action.event.bi))
      //console.log("....!...")
      let data = JSON.parse(action.event.bi)
      console.log("!!!.......",data)


      // console.log(data["trains"]["a1"]["coord"]["x"] + " - " + data["trains"]["a1"]["coord"]["y"])
      // console.log(data["treassures"])
      gameState = data.modeOfGame

      // console.log("action.event.ku - "+ action.event.ku)
      // if(action.event.ku == "nocorect"){
      //     lastCrossX = 0
      //     getContainers().gameScene = getContainers().gameScene2
      // }else{
      //     getContainers().gameScene = gameScene
      // }
      getContainers().gameScene = gameScene

      getContainers().playGroundGl = data


      drawPlayGround(data)
       drawDepos(data)
      drawTressuresFirstTime(data)
      drawTrains(data)
      drawTrainsBesideSocketResponse(data)

  })

}







let lastCrossX=0;

//отрисовываем сетку дорог
function drawPlayGround(playGround){

    // console.log("getContainers().clicks " + getContainers().clicks)
    // getContainers().clicks++

    //отрисовывается 1 раз
    // if(lastCrossX!=0){
    if(getContainers().playGroundDrown){
        
        
        //console.log("уже отрисовывали");
        return;
    }
    getContainers().playGroundDrown = true

    //console.log("playGround");
    lastCrossX = 1
  // console.log(playGround);


  let crosses = playGround['crosses']
  let croscrossesNum = playGround['croscrossesNum']
  for(let i=0; i< croscrossesNum.length; i++){
    for(let j=0; j<croscrossesNum[i].length; j++) {
      let crosN = croscrossesNum[i][j]
      let cross = crosses[crosN]
        //console.log(cross);

        drawCross(cross, playGround['pathes'])
    }
  }

  //renderer.render(app);
}

function  drawCross(cross, pathes) {
    //console.log("drawCross");
  // рсуем линии только направо и вверх
   if(cross['dwPath']!=0){
    let path = pathes[cross['dwPath']]
      //console.log(path)
      drawPath(path)
  }

    if(cross['rightPath']!=0){
    let path = pathes[cross['rightPath']]
      //console.log(path)
      drawPath(path)
  }


}

function drawPath(path) {
    //console.log("drawPath");
    var graphics = new Graphics()
    graphics.lineStyle(5, 0xFF0000);

    graphics.moveTo(path["coordBeg"]["x"],path["coordBeg"]["y"]);


    graphics.lineTo(path["coordEnd"]["x"],path["coordEnd"]["y"]);
    graphics.endFill();
    getContainers().gameScene.addChild(graphics);


    //    временно цифру пути
      let style = new TextStyle({
            fontFamily: "Futura",
            fontSize: 22,
            fill: "white"
      });
      let textPic = new Text(path["numOfPath"], style);
      if(path["direction"] == "gor"){
          textPic.x = path["coordBeg"]["x"] + 45
          textPic.y = path["coordBeg"]["y"] + 5
      }else{
          textPic.x = path["coordBeg"]["x"] + 5
          textPic.y = path["coordBeg"]["y"] + 45
      }
      getContainers().gameScene.addChild(textPic);
}