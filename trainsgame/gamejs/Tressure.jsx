import getContainers from "./storageTrains";

let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

class TressureContainer extends Container {

    constructor(treassK, treassure) {
      super()

        this.tressPic = new Sprite(getContainers().id["treasure.png"]);

        this.tressPic.x = 0;
        this.tressPic.y = 0;

        this.addChildAt(this.tressPic,0);
        // getContainers().gameScene.addChild(tressPic);
        // getContainers().tressPictures[treassK] = tressPic
        this.x = treassure["coord"]["x"];
        this.y = treassure["coord"]["y"];

      getContainers().tressContainers[treassK] = this
      this.addSelfToGameScene()
    }

    addSelfToGameScene(){
        getContainers().gameScene.addChild(this);
    }

}



export function drawTressuresFirstTime(playGround){

    let treassures = playGround['treassures']

    // let tressContainer
    if(Object.keys(getContainers().tressContainers).length !== 0){
        // console.log("----------------tressPictures is not empty----")
        return;
    }

    for(let treassK in treassures){
        let treassure = treassures[treassK]

        let tressContainer = new TressureContainer(treassK, treassure)
    }

}