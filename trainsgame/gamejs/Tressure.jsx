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

        this.treassK = treassK
        this.tressPic = new Sprite(getContainers().id["treasure.png"]);

        this.tressPic.x = 0;
        this.tressPic.y = 0;
        this.tressPic.tint = treassure["color"]

        let style = new TextStyle({
                    fontFamily: "Futura",
                    fontWeight: "bold",
                    fontSize: 18,
                    fill: "black"
        });

        this.sum = treassure["sum"];
        this.textPic = new Text(treassure["sum"], style);
        this.textPic.x = 8;
        this.textPic.y = -8;

        this.addChildAt(this.tressPic,0);
        this.addChildAt(this.textPic,1);

        // getContainers().gameScene.addChild(tressPic);
        // getContainers().tressPictures[treassK] = tressPic
        this.x = treassure["coord"]["x"];
        this.y = treassure["coord"]["y"];

      getContainers().tressContainers[treassK] = this
      this.addSelfToGameScene()
    }

    moveSelfToDepo(containerDepo){
        this.x = containerDepo.pickedTress.length * 15
        this.y = 0
        containerDepo.containerOfTressuress.addChild(this)

        containerDepo.changeSum(this)
        // containerDepo.pickedTress.push(this.treassK)
    }

    addSelfToGameScene(){
        getContainers().gameScene.addChild(this);
    }

}



export function drawTressuresFirstTime(playGround){

    let treassures = playGround['treassures']

    // let tressContainer
    //TODO  change
    if(Object.keys(getContainers().tressContainers).length !== 0){
    // if(Object.keys(getContainers().depoContainers).length !== 0){ //если депо уже отрисованы то и сокровища тоже
        // console.log("----------------tressPictures is not empty----")
        return;
    }

    for(let treassK in treassures){
        let treassure = treassures[treassK]

        let tressContainer = new TressureContainer(treassK, treassure)
    }

}