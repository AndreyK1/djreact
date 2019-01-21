// import { request } from "../utils"

import {FETCH_INCREASE_SINGLE_SUCCESS} from "./counterSingleActions";

export const SAVE_PLAYGROUND_DATA = "SAVE_PLAYGROUND_DATA"
export const NEW_DATE_PLAYGROUND = "NEW_DATE_PLAYGROUND"
export const SET_WHO_CLICKED = "SET_WHO_CLICKED"

export const SET_LISTENER_SENDED = "SET_LISTENER_SENDED"

export function setClicker(whoClicked) {
    return function (dispatch) {
        dispatch({type: SET_WHO_CLICKED, res: whoClicked})
    }
}

export function newarenaCreate() {
  return function (dispatch) {

    //console.log("---+11111newarenaCreate+--");

      webSocketBridgeControl.send({"type":"join", "name":"", "arena_num":0 })
      // webSocketBridgeControl.listen(function(action, stream) {
      //        console.log("controlGameConsumer:", action);
      //        if(action["type"] == "joined"){
      //             console.log("joined action[\"value\"] " +  action["value"])
      //        }
      //
      // });

      dispatch(newarenaAddListeners());


      // if(is_list_sended){
      //     return;
      // }
      //  document.addEventListener('DOMContentLoaded', function() {
      //     console.log("--DOMContentLoaded")
      //     webSocketBridgeConsGroupCustom.listen(function(action, stream) {
      //         console.log("++++++++++!!!!!!!!componentDidMount webSocketBridgeReact:", action);
      //         // let playgr = action["event"]["value"]
      //         let playgr = JSON.parse(action.event.value)
      //         // console.log(playgr);
      //         dispatch({type: SAVE_PLAYGROUNDS_LIST, res: playgr})
      //
      //
      //     });
      //
      //     setTimeout(()=> {
      //         // webSocketBridgeReact.send({});
      //         webSocketBridgeConsGroupCustom.send({"type":"startReact", "name":1, "whereMove":2, "arena_num":3})
      //         console.log("++++++++++webSocketBridgeReact  send send send send   :");
      //         dispatch({type: SET_LISTENER_SENDED, res: true})
      //     }, 2000);
      // });


  }

}

export function newarenaAddListeners() {
    console.log("newarenaAddListeners")
  return function (dispatch) {
      window.addEventListener("joinedI", (event) => {
        //console.log("event.details.arena", event)
        // alert(event.detail.arena)
          webSocketBridgeGroup.send(event.detail.arena)
          document.getElementById("player_name").value = event.detail.username
          chosenArena = event.detail.arena
          $.cookie("chosenArena", chosenArena)
          // document.getElementById("arena_num").value = event.detail.arena

          dispatch({type: SAVE_PLAYGROUND_DATA, res: event.detail})

             //           var name =   document.getElementById("player_name").value
             // var arena_num =   document.getElementById("arena_num").value
      })

      window.addEventListener("chanGeJoined", (event) => {
        console.log("chanGeJoined event.detail ", event.detail)

        // alert(event.detail.arena)
        dispatch({type: NEW_DATE_PLAYGROUND, res: event.detail})

          // dispatch({type: SAVE_PLAYGROUND_DATA, res: event.detail})

      })
  }
}
