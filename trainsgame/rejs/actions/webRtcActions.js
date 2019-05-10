// import { request } from "../utils"

//import {FETCH_INCREASE_SINGLE_SUCCESS} from "./counterSingleActions";
//import {SAVE_PLAYGROUNDS_LIST} from "./playGroundActions";




// import {request} from "../../../reactjs/utils";
import { request } from "../utils"
// import {
//     FETCH_INCREASE_SINGLE,
//     FETCH_INCREASE_SINGLE_ERROR400, FETCH_INCREASE_SINGLE_ERROR500, FETCH_INCREASE_SINGLE_FAILURE,
//     FETCH_INCREASE_SINGLE_SUCCESS
// } from "../../../reactjs/actions/counterSingleActions";

export const SHOW_MODAL_RTC = "SHOW_MODAL_RTC"
export const SET_PEER = "SET_PEER"
export const SET_PEER_ID = "SET_PEER_ID"


export function showModalRtc(isShow) {
    return function (dispatch) {
        // console.log("-------++++------------webSocketBridgeGroup add "+arena)
        // webSocketBridgeGroup.send(arena)
        // chosenArena = arena
        // $.cookie("chosenArena", chosenArena)
        dispatch({type: SHOW_MODAL_RTC, res: isShow})
    }
}

export function setPeer(peer) {
    return function (dispatch) {
        dispatch({type: SET_PEER, res: peer})
    }
}

export function setPeerId(peer_id) {
    return function (dispatch) {
        dispatch({type: SET_PEER_ID, res: peer_id})
    }
}


export const ADD_TO_RTC_GROUP = "ADD_TO_RTC_GROUP"
export const ADD_TO_RTC_GROUP_SUCCESS = "ADD_TO_RTC_GROUP_SUCCESS"
export const ADD_TO_RTC_GROUP_ERROR400 = "ADD_TO_RTC_GROUP_ERROR400"
export const ADD_TO_RTC_GROUP_ERROR500 = "ADD_TO_RTC_GROUP_ERROR500"
export const ADD_TO_RTC_GROUP_FAILURE = "ADD_TO_RTC_GROUP_FAILURE"

export function addToRtcGroup(peer_id, myPeerGroup, role) {
  return function (dispatch) {
    let url = "/trains/addToRtcGroup/"
    dispatch({type: ADD_TO_RTC_GROUP})

        let options ={ body:JSON.stringify({
        // Validation data coming from a form usually
        peer_group: myPeerGroup,
        peer_id: peer_id,
        role: role
    }) }
    return request(
      url, options,
      (json) => { dispatch({type: ADD_TO_RTC_GROUP_SUCCESS, res: json}) },
      (json) => { dispatch({type: ADD_TO_RTC_GROUP_ERROR400, res: json}) }, //ERROR400
      (res) => { dispatch({type: ADD_TO_RTC_GROUP_ERROR500, res: res}) },  //ERROR500
      (ex) => { dispatch({type: ADD_TO_RTC_GROUP_FAILURE, error: ex}) },
    )
  }
}

export const ADD_GAIN_NODE = "ADD_GAIN_NODE"
export const DEL_GAIN_NODE = "DEL_GAIN_NODE"

export function addGainNode(call, gainNode, visualiser){
    return function (dispatch) {
        dispatch({type: ADD_GAIN_NODE, call: call, gainNode: gainNode, visualiser: visualiser})
    }
}

export function delGainNode(call){
    return function (dispatch) {
        dispatch({type: DEL_GAIN_NODE, call: call})
    }
}