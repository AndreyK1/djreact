import { request } from "../utils"

// export const INCREASE = "INCREASE"
export const FETCH_POSTERS = "FETCH_POSTERS"
export const FETCH_POSTERS_SUCCESS = "FETCH_POSTERS_SUCCESS"
export const FETCH_POSTERS_ERROR400 = "FETCH_POSTERS_ERROR400"
export const FETCH_POSTERS_ERROR500 = "FETCH_POSTERS_ERROR500"
export const FETCH_POSTERS_FAILURE = "FETCH_POSTERS_FAILURE"
export function fetchPosters() {
  return function (dispatch) {
    let url = "/users"
    dispatch({type: FETCH_POSTERS})
    return request(
      url, {},
      (json) => { dispatch({type: FETCH_POSTERS_SUCCESS, res: json}) },
      (json) => { dispatch({type: FETCH_POSTERS_ERROR400, res: json}) },
      (res) => { dispatch({type: FETCH_POSTERS_ERROR500, res: res}) },
      (ex) => { dispatch({type: FETCH_POSTERS_FAILURE, error: ex}) },
    )
  }
}