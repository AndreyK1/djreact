// import { request } from "../utils"

import {FETCH_INCREASE_SINGLE_SUCCESS} from "./counterSingleActions";

export const SAVE_PLAYGROUNDS_LIST = "SAVE_PLAYGROUNDS_LIST"


export function listenPlaygrounsList() {
  return function (dispatch) {
       document.addEventListener('DOMContentLoaded', function() {
          console.log("--DOMContentLoaded")
          webSocketBridgeReact.listen(function(action, stream) {
              console.log("++++++++++!!!!!!!!componentDidMount webSocketBridgeReact:", action);
              // let playgr = action["event"]["value"]
              let playgr = JSON.parse(action.event.value)
              // console.log(playgr);
              dispatch({type: SAVE_PLAYGROUNDS_LIST, res: playgr})


          });
          setTimeout(()=> {webSocketBridgeReact.send({});}, 2000);
      });


    // let url = "/users/single_dot2"
    // dispatch({type: FETCH_INCREASE_SINGLE})
    // return request(
    //   url, {},
    //   (json) => { dispatch({type: FETCH_INCREASE_SINGLE_SUCCESS, res: json}) },
    //   (json) => { dispatch({type: FETCH_INCREASE_SINGLE_ERROR400, res: json}) },
    //   (res) => { dispatch({type: FETCH_INCREASE_SINGLE_ERROR500, res: res}) },
    //   (ex) => { dispatch({type: FETCH_INCREASE_SINGLE_FAILURE, error: ex}) },
    // )
  }
}