//Aliases
let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;


let gameScene, dungeon, id, treasure

let leftArrowTex, rightArrowTex, downArrowTex, upArrowTex

export default function setupTrainsScene(app) {
    console.log("setupTrainsScene");
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

    createArrowTextures()
    let leftArrow = new Sprite(leftArrowTex);
    let rightArrow = new Sprite(rightArrowTex);
    let downArrow = new Sprite(downArrowTex);
    let upArrow = new Sprite(upArrowTex);
    gameScene.addChild(leftArrow);
    rightArrow.x = 0
    rightArrow.y = 20
    gameScene.addChild(rightArrow);
    downArrow.x = 0
    downArrow.y = 40
    gameScene.addChild(downArrow);
    upArrow.x = 0
    upArrow.y = 60
    gameScene.addChild(upArrow);

    // let leftArrow2 = new Sprite(leftTextureArrows);
    // leftArrow2.x = 0
    // leftArrow2.y = 30
    // // gameScene.addChild(leftArrow2);

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

function createArrowTextures(){
      //create arrows texture
    let mySpriteSheetImage =  PIXI.BaseTexture.fromImage(arrows);
    let leftRectangle = new Rectangle(3, 22, 15, 10);
    let rightRectangle = new Rectangle(20, 22, 15, 10);
    let downRectangle = new Rectangle(40, 21, 10, 15);
    let upRectangle = new Rectangle(53, 21, 10, 15);

    leftArrowTex = new PIXI.Texture(mySpriteSheetImage, leftRectangle);
    rightArrowTex = new PIXI.Texture(mySpriteSheetImage, rightRectangle);
    downArrowTex = new PIXI.Texture(mySpriteSheetImage, downRectangle);
    upArrowTex = new PIXI.Texture(mySpriteSheetImage, upRectangle);
}

let trainsSprites = {};
let trainsTexts = {};
let trainsArrows = {};
//отрисовываем тележки
function drawTrains(playGround){
    console.log("drawTrains");
    let trains = playGround['trains']
    let pathes = playGround['pathes']
    for(let trainK in trains){
        let train = trains[trainK]
        let path = pathes[train['pathNum']]

        //рисуем тележку
        let trainPic;
        let textPic;
        let arrowPic;
        if(trainsSprites[trainK] == null) {
            trainPic = new Sprite(id["blob.png"]);
            // textPic = new Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
              let style = new TextStyle({
                fontFamily: "Futura",
                fontSize: 22,
                fill: "white"
              });
              textPic = new Text(train["number"], style);
              textPic.x = 120;
              textPic.y = 120
              arrowPic = createArrowPic(120, 120, train["nextMove"])
              gameScene.addChild(trainPic);
              gameScene.addChild(textPic);
              gameScene.addChild(arrowPic);
        }else{
            trainPic = trainsSprites[trainK]
            textPic = trainsTexts[trainK]
            arrowPic = trainsArrows[trainK]
        }

        console.log("numOfPath", path["numOfPath"], trainK, path["coordBeg"]["x"], path["coordBeg"]["y"])
        trainPic.x = train["coord"]["x"];
        trainPic.y = train["coord"]["y"];
        textPic.x = train["coord"]["x"]+15;
        textPic.y = train["coord"]["y"]+15;
        arrowPic.x = train["coord"]["x"];
        arrowPic.y = train["coord"]["y"]-15;
        if(arrowPic.nextMove != train["nextMove"]){
            arrowPic.parent.removeChild(arrowPic)
            arrowPic = createArrowPic(train["coord"]["x"], train["coord"]["y"]-15, train["nextMove"])
        }
        console.log("trainPic", trainK, train['pathNum'],  trainPic.x, trainPic.y)
        // gameScene.addChild(trainPic);
        trainsSprites[trainK] = trainPic
        trainsTexts[trainK] = textPic
        trainsArrows[trainK] = arrowPic


       // renderer.render(stage);
    }


}

function createArrowPic(posX, posY, trainNextMove){
    let arrow;
    if(trainNextMove == "left"){
      arrow = new Sprite(leftArrowTex);
    }else if(trainNextMove == "right"){
        arrow = new Sprite(rightArrowTex);
    }else if(trainNextMove == "up"){
        arrow = new Sprite(upArrowTex);
    }else if(trainNextMove == "down"){
        arrow = new Sprite(downArrowTex);
    }
    arrow.nextMove = trainNextMove
    // let leftArrow = new Sprite(leftArrowTex);
    arrow.x = posX
    arrow.y = posY
    gameScene.addChild(arrow);
    return arrow;
}

let lastCrossX=0;

//отрисовываем сетку дорог
function drawPlayGround(playGround){

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
    console.log("drawCross");
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
    console.log("drawPath");
    var graphics = new Graphics()
    graphics.lineStyle(5, 0xFF0000);

    graphics.moveTo(path["coordBeg"]["x"],path["coordBeg"]["y"]);


    graphics.lineTo(path["coordEnd"]["x"],path["coordEnd"]["y"]);
    graphics.endFill();
    gameScene.addChild(graphics);
}