import getContainers from "./storageTrains";
import {drawTeamSign} from "./team";

let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;


class DepoContainer extends Container {

     constructor(depoK, depo) {
         super()
        console.log("DepoContainer constructor")
        this.depoPic = new Sprite(getContainers().id["door.png"]);
        this.depoPic.x = 0;
        this.depoPic.y = 0;
        this.x = depo["coord"]["x"];
        this.y = depo["coord"]["y"];
        this.addChildAt(this.depoPic,0);

        this.pickedTress = []
        this.containerOfTressuress = new Container();
        this.containerOfTressuress.x = 10
        this.containerOfTressuress.y = 25
         this.addChildAt(this.containerOfTressuress,1);

        this.textComand = drawTeamSign(depo["team"])
      this.textComand.x = -7;
      this.textComand.y = 0;
      this.addChildAt(this.textComand,2);


      let style1 = new TextStyle({
            fontFamily: "Futura",
            fontSize: 20,
            fontWeight: "bold",
            fill: "green"
      });
      this.textSum = new Text(depo["sum"], style1);
      this.textSum.x = 0;
      this.textSum.y = 10;
      this.addChildAt(this.textSum,3);

        getContainers().depoContainers[depoK] = this
        this.addSelfToGameScene()
     }

     //проверяем все ли сокровища прищедщие с бэка, уже присоединены к депо
     checkIfAllTressAlreadyDrawn(tressures) {
         for (var i in tressures) {
             let tressK = tressures[i]
            console.log("depo tressK ", tressK, this.pickedTress, this.pickedTress.indexOf(tressK))
            if(this.pickedTress.indexOf(tressK)<0) {
                let trainNum =  getContainers().playGroundGl['treassures'][tressK]["picked"]
                let trainContainer = getContainers().trainsContainers[trainNum]

                if (trainContainer === undefined) {
                    console.log("trainContainer === undefined --------!!!!!!!!!!!!!!!!!!")
                    //значит мы просматриваем игру, и сокровище отрисовано все еще на арене
                    let tressCont = getContainers().tressContainers[train["pickedTress"]]
                    getContainers().gameScene.removeChild(tressCont)

                    tressCont.moveSelfToDepo(this)
                    this.pickedTress.push(tressK)
                }else{
                    //если сокровиit e ntkt;rb
                     trainContainer.moveTressToDepo(this)
                    this.pickedTress.push(tressK)
                }
                // trainContainer.moveTressToDepo(this)
                // this.pickedTress.push(tressK)

            }
        }
    }

    changeSum(tressPic){
         this.textSum.text = parseInt(this.textSum.text) + parseInt(tressPic.sum)
    }

     addSelfToGameScene(){
        getContainers().gameScene.addChild(this);
    }
}

// export function drawDepos(playGround, depoPictures, gameScene, trainsContainers, id){
export function drawDepos(playGround){

    let depos = playGround['depos']

    for(let depoK in depos){
        let depo = depos[depoK]
        let depoContainer

        if(getContainers().depoContainers[depoK] == null) {
            depoContainer = new DepoContainer(depoK, depo)
        }else{
            depoContainer = getContainers().depoContainers[depoK]
            // console.log("depo[\"tressures\"]", depo["tressures"])
            // depoContainer.checkIfAllTressAlreadyDrawn(depo["tressures"])
        }

        //если мы вдруг перерисовываем депо, надо проверить есть ли у нас уже в депо сокровища
        depoContainer.checkIfAllTressAlreadyDrawn(depo["tressures"])
    }
}