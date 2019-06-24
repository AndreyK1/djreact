 import * as webRtcActions from "../actions/webRtcActions"
 import * as profileActions from "../actions/profileActions";


const initialState = {
    isModalProfileShow: false

}

export default function profileR(state=initialState, action={}) {


  switch (action.type) {
  case profileActions.SHOW_MODAL_PROFILE:
    // console.log("reducer", action.res);
    return {...state, isModalProfileShow: action.res}
  default:
    return state
  }
}