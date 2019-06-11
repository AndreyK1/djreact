import * as newArenaActions from "../actions/newArenaActions"
import {SET_WHO_CLICKED} from "../actions/newArenaActions";

const initialState = {
    // isIstenerSended: false,
  newarena: { arena: 0 , player: "", number: 0, trains: ""},
  whoClicked: "",
  is_listener_exist: false
}

export default function playgroud(state=initialState, action={}) {

    let newarena = state.newarena

  switch (action.type) {
  case newArenaActions.SAVE_PLAYGROUND_DATA:
    //console.log("SAVE_PLAYGROUND_DATA", action.res);
    // let newarena = state.newarena
      newarena["arena"] = action.res.arena
      newarena["player"] = action.res.username
      // newarena["userCount"] = action.res.userCount

    return {...state, newarena: newarena}

   case newArenaActions.CHANGE_GROUP_ARENA_LISTENER_EXIST:
    return {...state, is_listener_exist: action.res}

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
  case newArenaActions.SET_WHO_CLICKED:
     return {...state, whoClicked: action.res}

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