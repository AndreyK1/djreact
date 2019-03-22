 import * as webRtcActions from "../actions/webRtcActions"
 import * as counterSingleActions from "../../../reactjs/actions/counterSingleActions";
 import {SET_PEER} from "../actions/webRtcActions";


const initialState = {
    isModalRtcShow: false,
    addedToRtc:{'addedToRtc' : 0},
    isSendingNow: false,
    peer: null,
    peer_id: 0,
    myPeerGroup: 1,
  // playgrounds: {},
}

export default function webRtc(state=initialState, action={}) {


  switch (action.type) {
  case webRtcActions.SHOW_MODAL_RTC:
    // console.log("reducer", action.res);
    return {...state, isModalRtcShow: action.res}
  case webRtcActions.SET_PEER:
    return {...state, peer: action.res}
  case webRtcActions.SET_PEER_ID:
    return {...state, peer_id: action.res}

  case webRtcActions.ADD_TO_RTC_GROUP:
    return {...state, isSendingNow: true}
  case webRtcActions.ADD_TO_RTC_GROUP_SUCCESS:
    return {...state, isSendingNow: false, addedToRtc: action.res}
  case webRtcActions.ADD_TO_RTC_GROUP_ERROR400:
  case webRtcActions.ADD_TO_RTC_GROUP_ERROR500:
  case webRtcActions.ADD_TO_RTC_GROUP_FAILURE:
    return {...state, isSendingNow: false}

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