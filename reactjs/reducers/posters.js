import * as postersAction from "../actions/postersAction"

const initialState = {isLoadingRepos: false,
  posters: undefined,
}

export default function github(state=initialState, action={}) {
  switch (action.type) {
  case postersAction.FETCH_POSTERS:
    return {...state, isLoadingRepos: true}
  case postersAction.FETCH_POSTERS_SUCCESS:
    return {...state, isLoadingRepos: false, posters: action.res}
  case postersAction.FETCH_POSTERS_ERROR400:
  case postersAction.FETCH_POSTERS_ERROR500:
  case postersAction.FETCH_POSTERS_FAILURE:
    return {...state, isLoadingRepos: false}
  default:
    return state
  }
}