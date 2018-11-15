//Aliases
import {drawTrains, createArrowTextures, drawTrainsBesideSocketResponse} from "./train";
import {drawDepos} from "./depo";
import getContainers from "./storageTrains";
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



let gameScene, dungeon, id, treasure

let leftArrowTex, rightArrowTex, downArrowTex, upArrowTex
// let greenCube, redCube

export default function setupTrainsScene(app) {

   // getContainers()
//     let playGroundGl
// let trainsContainers= {}
// let tressPictures = {}
// let depoPictures = {}



    //console.log("setupTrainsScene");
    //Make the game scene and add it to the stage
  gameScene = new Container();
  getContainers().gameScene = gameScene
  app.stage.addChild(gameScene);

    //1. Access the `TextureCache` directly
  let dungeonTexture = TextureCache["dungeon.png"];
  dungeon = new Sprite(dungeonTexture);
  gameScene.addChild(dungeon);

    //3. Create an optional alias called `id` for all the texture atlas
  //frame id textures.
  id = PIXI.loader.resources[treasHuntJs].textures;
  getContainers().id = id

    createArrowTextures()

  // регистрируем отрисовку по сокетному событию
  webSocketBridge.listen(function(action, stream) {
    //console.log("RESPONSE........:", action, stream);
    // console.log(JSON.parse(action.event.bi))
      let data = JSON.parse(action.event.bi)
      console.log(".......",data)
      // console.log(data["trains"]["a1"]["coord"]["x"] + " - " + data["trains"]["a1"]["coord"]["y"])
      console.log(data["treassures"])
      gameState = data.modeOfGame

      getContainers().playGroundGl = data

      drawPlayGround(data)
      // drawDepos(data, getContainers().depoPictures, getContainers().gameScene, getContainers().trainsContainers, getContainers().id)
      drawDepos(data)
      drawTressuresFirstTime(data)
      drawTrains(data)
      // drawTrains(data, getContainers().trainsContainers, getContainers().tressPictures, getContainers().gameScene, getContainers().id)



      // drawTrainsBesideSocketResponse(data, getContainers().trainsContainers)
      drawTrainsBesideSocketResponse(data)

  })

}

//
// let playGroundGl
// let trainsContainers= {}
// let tressPictures = {}
// let depoPictures = {}




function drawTressuresFirstTime(playGround){

    let treassures = playGround['treassures']

    let tressPic
    // if(tressPictures[] != null) {
    if(Object.keys(getContainers().tressPictures).length !== 0){
        // console.log("----------------tressPictures is not empty----")
        return;
    }
    for(let treassK in treassures){
        let treassure = treassures[treassK]
        tressPic = new Sprite(id["treasure.png"]);

        tressPic.x = treassure["coord"]["x"];
        tressPic.y = treassure["coord"]["y"];

        getContainers().gameScene.addChild(tressPic);
        getContainers().tressPictures[treassK] = tressPic
    }

}



let lastCrossX=0;

//отрисовываем сетку дорог
function drawPlayGround(playGround){

    // console.log("getContainers().clicks " + getContainers().clicks)
    // getContainers().clicks++

    //отрисовывается 1 раз
    if(lastCrossX!=0){
        return;
    }
    console.log("playGround");
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
    gameScene.addChild(graphics);
}