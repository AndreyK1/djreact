import * as counterSingleActions from "../actions/counterSingleActions"

const initialState = {isLoadingRepos: false,
  playgrounds: {},
}

export default function github(state=initialState, action={}) {
  switch (action.type) {
  case counterSingleActions.FETCH_INCREASE_SINGLE:
    return {...state, isLoadingRepos: true}
  case counterSingleActions.FETCH_INCREASE_SINGLE_SUCCESS:
    return {...state, isLoadingRepos: false, clicksSingle: action.res}
  case counterSingleActions.FETCH_INCREASE_SINGLE_ERROR400:
  case counterSingleActions.FETCH_INCREASE_SINGLE_ERROR500:
  case counterSingleActions.FETCH_INCREASE_SINGLE_FAILURE:
    return {...state, isLoadingRepos: false}
  default:
    return state
  }
}