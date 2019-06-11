import * as playGroundActions from "../actions/playGroundActions"

const initialState = {
    isIstenerSended: false,
  playgrounds: {},
  userName: "unknown1",
  userCount: 0,
}

export default function playgroud(state=initialState, action={}) {



  switch (action.type) {
  case playGroundActions.SAVE_PLAYGROUNDS_LIST:
    // console.log("reducer", action.res);
    return {...state, playgrounds: action.res, userName: action.userName, userCount: action.userCount}

  case playGroundActions.SET_LISTENER_SENDED:
     console.log("SET_LISTENER_SENDED", action.res);
    return {...state, isIstenerSended: action.res}
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