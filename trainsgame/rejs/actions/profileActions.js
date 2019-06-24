import { request } from "../utils"


export const SHOW_MODAL_PROFILE = "SHOW_MODAL_PROFILE"


export function showModalProfile(isShow) {
    return function (dispatch) {
        // console.log("-------++++------------webSocketBridgeGroup add "+arena)
        // webSocketBridgeGroup.send(arena)
        // chosenArena = arena
        // $.cookie("chosenArena", chosenArena)
        dispatch({type: SHOW_MODAL_PROFILE, res: isShow})
    }
}
