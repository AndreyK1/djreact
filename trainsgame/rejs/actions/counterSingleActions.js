import { request } from "../utils"

export const FETCH_INCREASE_SINGLE = "FETCH_INCREASE_SINGLE"
export const FETCH_INCREASE_SINGLE_SUCCESS = "FETCH_INCREASE_SINGLE_SUCCESS"
export const FETCH_INCREASE_SINGLE_ERROR400 = "FETCH_INCREASE_SINGLE_ERROR400"
export const FETCH_INCREASE_SINGLE_ERROR500 = "FETCH_INCREASE_SINGLE_ERROR500"
export const FETCH_INCREASE_SINGLE_FAILURE = "FETCH_INCREASE_SINGLE_FAILURE"

export function increaseCounterSingletons() {
  return function (dispatch) {
    let url = "/users/single_dot2"
    dispatch({type: FETCH_INCREASE_SINGLE})
    return request(
      url, {},
      (json) => { dispatch({type: FETCH_INCREASE_SINGLE_SUCCESS, res: json}) },
      (json) => { dispatch({type: FETCH_INCREASE_SINGLE_ERROR400, res: json}) },
      (res) => { dispatch({type: FETCH_INCREASE_SINGLE_ERROR500, res: res}) },
      (ex) => { dispatch({type: FETCH_INCREASE_SINGLE_FAILURE, error: ex}) },
    )
  }
}