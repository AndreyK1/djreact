// import { request } from "../utils"

//import {FETCH_INCREASE_SINGLE_SUCCESS} from "./counterSingleActions";
//import {SAVE_PLAYGROUNDS_LIST} from "./playGroundActions";


export const SHOW_MODAL_RTC = "SHOW_MODAL_RTC"


// export function arenaAddListeners(arena) {
//     return function (dispatch) {
//         console.log("-------++++------------webSocketBridgeGroup add "+arena)
//         webSocketBridgeGroup.send(arena)
//         chosenArena = arena
//         $.cookie("chosenArena", chosenArena)
//     }
// }


export function showModalRtc(isShow) {
    return function (dispatch) {
        // console.log("-------++++------------webSocketBridgeGroup add "+arena)
        // webSocketBridgeGroup.send(arena)
        // chosenArena = arena
        // $.cookie("chosenArena", chosenArena)
        dispatch({type: SHOW_MODAL_RTC, res: isShow})
    }
}