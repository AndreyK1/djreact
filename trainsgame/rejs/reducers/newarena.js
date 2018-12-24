import * as newArenaActions from "../actions/newArenaActions"

const initialState = {
    // isIstenerSended: false,
  newarena: {},
}

export default function playgroud(state=initialState, action={}) {



  switch (action.type) {
  case newArenaActions.SAVE_PLAYGROUNDS_LIST:
    console.log("reducer", action.res);
    return {...state, playgrounds: action.res}
  // case newArenaActions.SET_LISTENER_SENDED:
  //    console.log("SET_LISTENER_SENDED", action.res);
  //   return {...state, isIstenerSended: action.res}
  //   return {...state, isLoadingRepos: true}
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