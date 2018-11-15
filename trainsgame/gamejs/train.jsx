import getContainers from "./storageTrains";

let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;


//отрисовываем тележки
// export function drawTrains(playGround, trainsContainers, tressPictures, gameScene, id){
export function drawTrains(playGround){
    // console.log("getContainers().clicks drawTrains " + getContainers().clicks)
    // getContainers().clicks++

    // playGroundGl = playGround
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

        let trainContainer;
        if(getContainers().trainsContainers[trainK] == null) {
              trainContainer = new Container();
              getContainers().gameScene.addChild(trainContainer);

                trainPic = new Sprite(getContainers().id["blob.png"]);
                trainPic.tint = 0xFFFFFF;
                // timerId = setTimeout(()=> {console.log("trainPic.tint"+trainPic.tint); trainPic.tint = 0xff0000; }, 2000)

            // textPic = new Text('This is a PixiJS text',{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
              let style = new TextStyle({
                fontFamily: "Futura",
                fontSize: 22,
                fill: "white"
              });
              textPic = new Text(train["number"], style);
              arrowPic = createArrowPic(0, -15, train["nextMove"])

              trainContainer.addChildAt(trainPic,0);
              trainContainer.addChildAt(textPic,1);
              trainContainer.addChildAt(arrowPic,2);

                trainPic.x = 0;
                trainPic.y = 0;
                textPic.x = 15;
                textPic.y = 15;
                arrowPic.x = 0;
                arrowPic.y = -15;
              getContainers().trainsContainers[trainK] = trainContainer
        }else{
            trainContainer = getContainers().trainsContainers[trainK]
            trainPic = trainContainer.getChildAt(0)
            textPic = trainContainer.getChildAt(1)
            arrowPic = trainContainer.getChildAt(2)
        }

        //console.log("numOfPath", path["numOfPath"], trainK, path["coordBeg"]["x"], path["coordBeg"]["y"])

        trainPic.nowMoving = train["nowMoving"]
        trainContainer.x = train["coord"]["x"];
        trainContainer.y = train["coord"]["y"];

        //проверяемвыбор пути
        // console.log("moveByChoise " +train["moveByChoise"])
        // trainPic.tint = 0xff0000;
        //console.log("moveByChoise true -" +train["moveByChoise"])
        if(train["moveByChoise"] === true){
            //console.log("moveByChoise true -" +train["moveByChoise"])
          trainPic.tint = 0x008000;
        }else if(train["moveByChoise"] === false){
            //console.log("moveByChoise false - " +train["moveByChoise"])
            trainPic.tint = 0xff0000;
        }
        setTimeout(()=> {
            // console.log("trainPic.tint"+trainPic.tint);
            trainPic.tint = 0xFFFFFF;
            }, 500)

        if(arrowPic.nextMove != train["nextMove"]){
            arrowPic.parent.removeChild(arrowPic)
            arrowPic = createArrowPic(0, -15, train["nextMove"])

            // moveByChoise
            trainContainer.addChildAt(arrowPic,2)
            //проверяемвыбор пути

        }

        //проверяем новые сокровища
        if(train["pickedTress"] != 0){
            if(!trainContainer.pickedTress){
            // if(!trainContainer.getChildAt(3)){
                console.log("---------pickedTress------------" + train["pickedTress"])
                let tressPic = getContainers().tressPictures[train["pickedTress"]]
                tressPic.x = 15
                tressPic.y = 0

                getContainers().gameScene.removeChild(tressPic)
                trainContainer.addChildAt(tressPic,3);
                trainContainer.pickedTress = train["pickedTress"]

            }
        }




        // console.log("trainPic", trainK, train['pathNum'],  trainPic.x, trainPic.y)
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
    //gameScene.addChild(arrow);
    return arrow;
}

let leftArrowTex, rightArrowTex, downArrowTex, upArrowTex
export function createArrowTextures(){
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

let timerId = false
//отрисовка поездов в промежутках м.д сокетными ответами - по инерции
export function drawTrainsBesideSocketResponse(playGround){
    //console.log("gameState "+ gameState)
    if(gameState != "play"){
        clearInterval(timerId)
        return;
    }
    if(timerId){
        return;
    }
    let sleepSec = playGround['sleepSec']
    let moveSize = playGround['moveSize']
    let moveInOnePeriod = moveSize/(sleepSec*1000/100)  //сколько пикселей за однут итерацию . кратно 10
     timerId = setInterval(()=> {timeoutDrawTrains(moveInOnePeriod, getContainers().trainsContainers)}, 100)
    //timeoutAlreadyRuns = true

}


function  timeoutDrawTrains(moveInOnePeriod, trainsContainers) {
    for (let trainK in trainsContainers) {
        let trainContainer = trainsContainers[trainK]
        let trainPic = trainContainer.getChildAt(0)
        // console.log("trainPic.nowMoving " + trainPic.nowMoving + "trainPic.nextX "+trainPic.nextX + " trainPic.nextY " +trainPic.nextY)
        //задаем направление движения между сокетными ответами
        //console.log("moveInOnePeriod " +  moveInOnePeriod)
        let move = moveInOnePeriod
        // let move = 2;
        if(trainPic.nowMoving == "up"){
            trainContainer.y -=move
        }else if(trainPic.nowMoving == "down"){
            trainContainer.y +=move
        }else if(trainPic.nowMoving == "left"){
            trainContainer.x -=move
        }else if(trainPic.nowMoving == "right"){
            trainContainer.x +=move
        }
        //console.log("trainContainer.x " + trainContainer.x + " trainContainer.y " + trainContainer.y)

    }
}



export default drawTrains