 import * as webRtcActions from "../actions/webRtcActions"
 import * as counterSingleActions from "../../../reactjs/actions/counterSingleActions";
 import {SET_PEER} from "../actions/webRtcActions";
 import {ADD_GAIN_NODE} from "../actions/webRtcActions";
 import {DEL_GAIN_NODE} from "../actions/webRtcActions";
 import {CHANGE_PEER_GROUP_ID} from "../actions/webRtcActions";
 import {CHANGE_USERNAME_PEER_ID} from "../actions/webRtcActions";
 import {ADD_CONNECT_TO_CLIENT} from "../actions/webRtcActions";


const initialState = {
    isModalRtcShow: false,
    addedToRtc:{},
    isSendingNow: false,
    peer: null,
    peer_id: 0,
    myPeerServer: 0,
    myPeerGroup: 1,
    destination_participant: {},
    dictOfGains: {},
    rtcGroupConnections: []
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
  case webRtcActions.ADD_GAIN_NODE:
      let peer_id = action.call.peer
       let dictOfGains  = state.dictOfGains
        dictOfGains[peer_id] = {gainNode: action.gainNode, call: action.call, visualiser: action.visualiser, userName: "unknown", connectionOfClient: null}
        // gainNode - усилитель (Node), visualiser - анализатор (Node), call - вызов, connectionOfClient - connection
      console.log("dictOfGains", dictOfGains)

    return {...state, dictOfGains: dictOfGains}

  case webRtcActions.DEL_GAIN_NODE:
      let peer_id1 = action.call.peer
      let dictOfGains1  = state.dictOfGains
      delete dictOfGains1[peer_id1]
      return {...state, dictOfGains: dictOfGains1}

  case webRtcActions.CHANGE_PEER_GROUP_ID:
      return {...state, myPeerGroup: action.peer_group_id}

 case webRtcActions.CHANGE_USERNAME_PEER_ID:
        let dictOfGains2  = state.dictOfGains
        dictOfGains2[action.peer_id] = {...dictOfGains2[action.peer_id], userName: action.userName}
      return {...state, dictOfGains: dictOfGains2}

  case webRtcActions.ADD_CONNECT_TO_CLIENT:
        let dictOfGains3  = state.dictOfGains
        dictOfGains3[action.peer_id] = {...dictOfGains3[action.peer_id], connectionOfClient: action.connectionOfClient}
      return {...state, dictOfGains: dictOfGains3}


 case webRtcActions.CHANGE_RTC_GROUP_CONNECTIOS:
      return {...state, rtcGroupConnections: action.rtcGroupConnections}

  case webRtcActions.ADD_TO_RTC_GROUP:
    return {...state, isSendingNow: true}
  case webRtcActions.ADD_TO_RTC_GROUP_SUCCESS:
    console.log("addedToRtc", action.res["addedToRtc"])
      let myPeerServer = state.myPeerServer
      if(action.res["addedToRtc"][state.myPeerGroup] != undefined){
            myPeerServer = action.res["addedToRtc"][state.myPeerGroup]["server"]
      }
    return {...state, isSendingNow: false, addedToRtc: action.res["addedToRtc"], myPeerServer:myPeerServer}
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