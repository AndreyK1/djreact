 import * as webRtcActions from "../actions/webRtcActions"


const initialState = {
    isModalRtcShow: false,
  // playgrounds: {},
}

export default function webRtc(state=initialState, action={}) {


  switch (action.type) {
  case webRtcActions.SHOW_MODAL_RTC:
    // console.log("reducer", action.res);
    return {...state, isModalRtcShow: action.res}
  // case playGroundActions.SET_LISTENER_SENDED:
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