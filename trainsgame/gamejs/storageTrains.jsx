

let allContainers = {
  clicks: 797,
    // depoContainers : {},
    // playGroundGl: 0,
    // trainsContainers : {},
    // tressContainers: {},
    // gameScene : 0,
    // gameScene2 : 0,
    // id : 0,
    // playGroundDrown: false,

    cleanPlayGround: function () {
        this.playGroundDrown = false;
        this.playGroundGl = 0;
        this.depoContainers = {};
        this.trainsContainers = {};
        this.tressContainers = {};
        this.gameScene = 0;
        this.id = 0


        console.log(webSocketBridgeGroup)
        console.log(webSocketBridgeGroup["socket"])
        if(webSocketBridgeGroup["socket"] != null){
            console.log("---webSocketBridgeGroup  REMOVEEEEEE")
            webSocketBridgeGroup.send("remove")
        }
        // webSocketBridgeGroup.send("remove")
    }




}

allContainers.cleanPlayGround();


// export default function counters(state=initialState, action={}) {
//   switch (action.type) {
//   case sampleActions.INCREASE:
//     return {...state, clicks: state.clicks + 1}
//   default:
//     return state
//   }
// }


export default function getContainers(){
    return allContainers
}