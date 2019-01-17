import * as newArenaActions from "../actions/newArenaActions"

const initialState = {
    // isIstenerSended: false,
  newarena: { arena: 0 , player: "", number: 0, trains: ""},
}

export default function playgroud(state=initialState, action={}) {

    let newarena = state.newarena

  switch (action.type) {
  case newArenaActions.SAVE_PLAYGROUND_DATA:
    //console.log("SAVE_PLAYGROUND_DATA", action.res);
    // let newarena = state.newarena
      newarena["arena"] = action.res.arena
      newarena["player"] = action.res.username
    return {...state, newarena: newarena}
  case newArenaActions.NEW_DATE_PLAYGROUND:
     //console.log("NEW_DATE_PLAYGROUND", action.res);
     if(!state.newarena.arena) {
         //console.log("!state.newarena.arena")
         return state
     }
     if(!action.res[state.newarena.arena]) {
         //console.log("!action.res[state.newarena.arena]")
         return state
     }

      if(action.res[state.newarena.arena]["trains"].size ==state.newarena.number) {
          //console.log("ction.res[state.newarena.arena][\"trains\"].size")
          return state
      }

      //console.log("меняем", Object.keys(action.res[state.newarena.arena]["trains"]).length);

      newarena["number"] = Object.keys(action.res[state.newarena.arena]["trains"]).length
      newarena["trains"] = "";
      for(let keyTrain in action.res[state.newarena.arena]["trains"]){
            // players += "+"+playgrounds[key].trains[keyTrain].number
            newarena["trains"] += "| "+keyTrain
       }
     return {...state, newarena: newarena}


  // case playGroundActions.FETCH_INCREASE_SINGLE_SUCCESS:
  //   return {...state, isLoadingRepos: false, clicksSingle: action.res}
  // case playGroundActions.FETCH_INCREASE_SINGLE_ERROR400:
  // case playGroundActions.FETCH_INCREASE_SINGLE_ERROR500:
  // case playGroundActions.FETCH_INCREASE_SINGLE_FAILURE:
  //   return {...state, isLoadingRepos: false}
  default:
    return state
  }
}