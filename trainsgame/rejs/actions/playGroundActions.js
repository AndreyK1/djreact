// import { request } from "../utils"

import {FETCH_INCREASE_SINGLE_SUCCESS} from "./counterSingleActions";

export const SAVE_PLAYGROUNDS_LIST = "SAVE_PLAYGROUNDS_LIST"
export const SET_LISTENER_SENDED = "SET_LISTENER_SENDED"

export function listenPlaygrounsList(is_list_sended) {
  return function (dispatch) {
      if(is_list_sended){
          return;
      }
       document.addEventListener('DOMContentLoaded', function() {
          //console.log("--DOMContentLoaded")
          webSocketBridgeConsGroupCustom.listen(function(action, stream) {
              console.log("++++++++++!!!!!!!!componentDidMount webSocketBridgeReact:", action);
              // let playgr = action["event"]["value"]
              let playgr = JSON.parse(action.event.value)
              // console.log(playgr);
              dispatch({type: SAVE_PLAYGROUNDS_LIST, res: playgr})

              //поверяем, если мы в процессе создания новой арены, то создаем листенер для нее
              let my_arenaEl = document.getElementById("my_arena")
              if(my_arenaEl) {
                  let event = new CustomEvent("chanGeJoined", {detail: playgr});
                  //console.log("chanGeJoined ");
                 window.dispatchEvent(event)
                  // let my_arena = my_arenaEl.value
                  // console.log("my_arena ", my_arena, playgr);
                  // console.log(playgr[my_arena]);
              }

          });

          setTimeout(()=> {
              // webSocketBridgeReact.send({});
              webSocketBridgeConsGroupCustom.send({"type":"startReact", "name":1, "whereMove":2, "arena_num":3})
              //console.log("++++++++++webSocketBridgeReact  send send send send   :");
              dispatch({type: SET_LISTENER_SENDED, res: true})
          }, 2000);
      });


  }
}