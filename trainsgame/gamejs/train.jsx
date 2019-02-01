import getContainers from "./storageTrains";
import React from "react";
import {drawTeamSign} from "./team";

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
    // let pathes = playGround['pathes']
    for(let trainK in trains){
        let train = trains[trainK]
        // let path = pathes[train['pathNum']]

        //рисуем тележку
        let trainContainer;
        if(getContainers().trainsContainers[trainK] == null) {
              trainContainer = new TrainContainer(trainK, train);

        }else{
            trainContainer = getContainers().trainsContainers[trainK]
        }

        trainContainer.makeMove(train)
    }


}


class TrainContainer extends Container {

    constructor(trainK, train) {
      super()

      this.trainPic = new Sprite(getContainers().id["blob.png"]);
      // this.trainPic.tint = 0xFFFFFF;
      this.trainPic.tint = train["color"];

      let style = new TextStyle({
                fontFamily: "Futura",
                fontSize: 22,
                fill: "white"
      });
      this.textPic = new Text(train["number"], style);
      this.arrowPic = createArrowPic(0, -15, train["nextMove"])

      this.addChildAt(this.trainPic,0);
      this.addChildAt(this.textPic,1);
      this.addChildAt(this.arrowPic,2);

      this.trainPic.x = 0;
      this.trainPic.y = 0;
      this.textPic.x = 15;
      this.textPic.y = 15;
      this.arrowPic.x = 0;
      this.arrowPic.y = -15;

      // let comColor = "white"
      // if(train["command"] == 1) {
      //     comColor = "red"
      // }else if(train["command"] == 2){
      //     comColor = "blue"
      // }
      //
      // let style1 = new TextStyle({
      //           fontFamily: "Futura",
      //           fontSize: 20,
      //           fontWeight: "bold",
      //           fill: comColor
      // });
      // this.textComand = new Text(train["command"], style1);
      this.textComand = drawTeamSign(train["command"])
      this.textComand.x = -7;
      this.textComand.y = 0;

      this.addChildAt(this.textComand,3);


      getContainers().trainsContainers[trainK] = this
      this.addSelfToGameScene()
    }

    makeMove(train){
        this.trainPic.nowMoving = train["nowMoving"]
        this.x = train["coord"]["x"];
        this.y = train["coord"]["y"];

        //проверяемвыбор пути
        setTimeout(()=> {
            // console.log("trainPic.tint"+trainPic.tint);
            // this.trainPic.tint = 0xFFFFFF;
                this.arrowPic.tint = 0xFFFFFF;

            }, 500)

        if(this.arrowPic.nextMove != train["nextMove"]){
            this.arrowPic.parent.removeChild(this.arrowPic)
            this.arrowPic = createArrowPic(0, -15, train["nextMove"])

            // moveByChoise
            this.addChildAt(this.arrowPic,2)
            //проверяемвыбор пути
        }

        if(train["moveByChoise"] === true){
            // console.log("moveByChoise true -" +train["moveByChoise"])
          this.arrowPic.tint = 0x008000;
        }else if(train["moveByChoise"] === false){
            // console.log("moveByChoise false - " +train["moveByChoise"])
            // alert("fdgdfgd")
            // this.arrowPic.tint = 0xFF0000;
            this.arrowPic.tint = 0xFF0000;
        }

        //проверяем новые сокровища
        this.checkAndAddTreessToSelf(train)
    }

    //проверяем новые сокровища и добавление контейнера сокровишь в свой контейнер
    checkAndAddTreessToSelf(train){
         if(train["pickedTress"] != 0){
            if(!this.pickedTress){
                let tressCont = getContainers().tressContainers[train["pickedTress"]]
                tressCont.x = 15
                tressCont.y = 0

                getContainers().gameScene.removeChild(tressCont)
                this.addChildAt(tressCont,4);
                this.pickedTress = train["pickedTress"]
            }
        }
    }

    moveTressToDepo(containerDepo){
        let tressPic = this.getTressureContainer()

        this.removeChild(tressPic)
        this.pickedTress = 0
        // tressPic.x = containerDepo.pickedTress.length * 15
        // tressPic.y = 0

        tressPic.moveSelfToDepo(containerDepo)

        // containerDepo.containerOfTressuress.addChild(tressCont)
        // containerDepo.changeSum(tressCont)

    }

    getTressureContainer(){
        try {
            return this.getChildAt(4)
        }catch (e) {
            return undefined
        }
    }

    timeoutDrawTrain(moveInOnePeriod){
        // console.log("trainPic.nowMoving " + trainPic.nowMoving + "trainPic.nextX "+trainPic.nextX + " trainPic.nextY " +trainPic.nextY)
        //задаем направление движения между сокетными ответами

        let move = moveInOnePeriod
        // let move = 2;
        if(this.trainPic.nowMoving == "up"){
            this.y -=move
        }else if(this.trainPic.nowMoving == "down"){
            this.y +=move
        }else if(this.trainPic.nowMoving == "left"){
            this.x -=move
        }else if(this.trainPic.nowMoving == "right"){
            this.x +=move
        }
    }

    addSelfToGameScene(){
        getContainers().gameScene.addChild(this);
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
     timerId = setInterval(()=> {timeoutDrawTrains(moveInOnePeriod)}, 100)
}


function  timeoutDrawTrains(moveInOnePeriod) {
    for (let trainK in getContainers().trainsContainers) {
        let trainContainer = getContainers().trainsContainers[trainK]
        trainContainer.timeoutDrawTrain(moveInOnePeriod)
    }
}



export default drawTrains