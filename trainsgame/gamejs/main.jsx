// import setupHunter from './hunter';
import setupTrainsScene from './trainsPlayground';
import getContainers from "./storageTrains";

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

let stageWidth=550;

//Create a Pixi Application
let appTrain;
// let playGroundDrown=false;

function renderMainScene() {

    // playGroundDrown = false
    getContainers().cleanPlayGround()

    appTrain = new Application({
        width: stageWidth,
        height: 550,
        antialias: true,
        transparent: false,
        resolution: 1
      }
    );

    //Add the canvas that Pixi automatically created for you to the HTML document
    // document.body.appendChild(appTrain.view);
    document.getElementById("gameCont").innerText = ""
    document.getElementById("gameCont").appendChild(appTrain.view);

    let tresH = loader.resources[treasHuntJs]
    console.log("treasHuntJs ", tresH)
    // let lastCrossX=0;
    if(tresH){
       //console.log("setupTrainsSceneWrap ")
      setupTrainsSceneWrap()
    }else{
        //console.log("loader ")
     loader
      .add([
          {url: treasHuntJs, onComplete: console.log("finish treasHuntJs")},
          {url: arrows, onComplete: console.log("finish arrows")}
          ])
          .on("progress", loadProgressHandler)
        .load(setupTrainsSceneWrap);
    }


}


renderMainSceneGlobal = renderMainScene

// renderMainScene();

function setupTrainsSceneWrap(){
    setupTrainsScene(appTrain)
}

function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}
