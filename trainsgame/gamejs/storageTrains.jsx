

let allContainers = {
  clicks: 797,
    // depoPictures : {},
    depoContainers : {},
    playGroundGl: 0,
    trainsContainers : {},
    tressContainers: {},
    // tressPictures : {},
    gameScene : 0,
    gameScene2 : 0,
    id : 0


}

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