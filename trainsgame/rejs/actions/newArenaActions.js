// import { request } from "../utils"

import {FETCH_INCREASE_SINGLE_SUCCESS} from "./counterSingleActions";

export const SAVE_PLAYGROUND_DATA = "SAVE_PLAYGROUND_DATA"
export const SET_LISTENER_SENDED = "SET_LISTENER_SENDED"

export function newarenaCreate() {
  return function (dispatch) {

    console.log("---+11111newarenaCreate+--");

      webSocketBridgeControl.send({"type":"join", "name":"", "arena_num":0 })
      // webSocketBridgeControl.listen(function(action, stream) {
      //        console.log("controlGameConsumer:", action);
      //        if(action["type"] == "joined"){
      //             console.log("joined action[\"value\"] " +  action["value"])
      //        }
      //
      // });
      window.addEventListener("joined", (event) => {
        console.log("event.details.arena", event)
        // alert(event.detail.arena)
          webSocketBridgeGroup.send(event.detail.arena)
          document.getElementById("player_name").value = event.detail.username
          document.getElementById("arena_num").value = event.detail.arena

          dispatch({type: SAVE_PLAYGROUND_DATA, res: event.detail})

             //           var name =   document.getElementById("player_name").value
             // var arena_num =   document.getElementById("arena_num").value
      })



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