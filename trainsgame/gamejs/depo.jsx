let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle,
    Graphics = PIXI.Graphics,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

export function drawDepos(playGround, depoPictures, gameScene, trainsContainers, id){
    // if(Object.keys(depoPictures).length !== 0){
    //     // console.log("----------------tressPictures is not empty----")
    //     return;
    // }
    let depos = playGround['depos']


    for(let depoK in depos){
        let depoPic
        let depo = depos[depoK]

        if(depoPictures[depoK] == null) {
            depoPic = new Sprite(id["door.png"]);

            depoPic.x = depo["coord"]["x"];
            depoPic.y = depo["coord"]["y"];
            depoPic.pickedTress = []

            gameScene.addChild(depoPic);
            depoPictures[depoK] = depoPic
        }else{
            depoPic = depoPictures[depoK]
            console.log("depo[\"tressures\"]", depo["tressures"])
            depo["tressures"].forEach(
                function checkIfAlreadyDrawn(value) {
                    //console.log("depo value ", value, depoPic.pickedTress, depoPic.pickedTress.indexOf(value))
                    if(depoPic.pickedTress.indexOf(value)<0){
                        // let tressPic = tressPictures[train["pickedTress"]]
                        //console.log("picked",playGround['treassures'][value]["picked"])
                        let trainContainer = trainsContainers[playGround['treassures'][value]["picked"]]
                        //console.log("--trainContainer",trainContainer)
                        let tressPic  = trainContainer.getChildAt(3)

                        trainContainer.removeChild(tressPic)
                        //console.log("--tressPic",tressPic)

                        gameScene.addChild(tressPic)
                        tressPic.x = depoPic.x + 10 + depoPic.pickedTress.length*15
                        tressPic.y = depoPic.y + 25

                        depoPic.pickedTress.push(value)
                        trainContainer.pickedTress = 0
                    }
                }
            );

        }
    }
}