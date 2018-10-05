import React from "react"
import Radium from "radium"

import { connect } from "react-redux"

import * as counterActions from "../actions/counterActions"
import * as githubActions from "../actions/githubActions"
import * as counterSingleActions from "../actions/counterSingleActions"
import * as postersAction from "../actions/postersAction"
import Headline from "../components/Headline"
import GithubRepos from "../components/GithubRepos"
import PostersList from "../components/PostersList"

const styles = {
  button: {
    cursor: "pointer",
  },
  counter: {
    color: "blue",
    fontSize: "20px",
  }
}

@connect(state => ({
  counters: state.counters,
  github: state.github,
    posters: state.posters,
    countersSingle: state.countersSingle,
}))
@Radium
export default class App1Container extends React.Component{
  componentDidMount() {
    let {dispatch, github} = this.props
    if (!github.isLoadingRepos && github.repos === undefined) {
      dispatch(githubActions.fetchRepos())
    }
  }
  handleClick() {
        console.log("handleClick11");
        console.log(this.props);
    let {dispatch} = this.props;

    dispatch(counterActions.increaseCounter())
  }

  handleClickIncreaseSingleton(){
    let {dispatch} = this.props;
    dispatch(counterSingleActions.increaseCounterSingletons())
  }

    handleClickShowPosters() {
      let {dispatch, posters} = this.props
      //if (!posters.isLoadingRepos && posters.repos === undefined) {
        dispatch(postersAction.fetchPosters())
     // }
  }


  renderLoading() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            Loading...
          </div>
        </div>
      </div>
    )
  }

  render() {
    console.log("render");
    console.log(this.props);
    let {counters, github, posters, countersSingle} = this.props
    if (github.isLoadingRepos || github.repos === undefined) {
      return this.renderLoading()
    }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <Headline>Sample App!</Headline>
            <div style={[styles.button]} onClick={() => this.handleClickShowPosters()}>Show posters</div>
            <div style={[styles.button]} onClick={() => this.handleClick()}>INCREASE</div>
            <p style={[styles.counter]} >{counters.clicks}</p>
            <div style={[styles.button]} onClick={() => this.handleClickIncreaseSingleton()}>INCREASE Singleton</div>
            <p style={[styles.counter]} >{countersSingle.clicksSingle['ffff']}</p>
            <p>{process.env.BASE_API_URL}</p>
             {posters.posters !== undefined &&
              <PostersList posters={posters.posters} />
            }
            {github.repos !== undefined &&
              <GithubRepos repos={github.repos} />
            }

          </div>
        </div>
      </div>
    )
  }
}