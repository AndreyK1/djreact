import React from "react"
import Radium from "radium"

import { connect } from "react-redux"

// import * as counterActions from "../actions/counterActions"
// import * as githubActions from "../actions/githubActions"
import * as counterSingleActions from "../actions/counterSingleActions"
// import * as postersAction from "../actions/postersAction"
// import Headline from "../components/Headline"
// import GithubRepos from "../components/GithubRepos"
// import PostersList from "../components/PostersList"

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
    countersSingle: state.countersSingle,
}))
@Radium
export default class App1Container extends React.Component{
  componentDidMount() {
    let {dispatch, github} = this.props

      document.addEventListener('DOMContentLoaded', function() {
          console.log("--DOMContentLoaded")
          webSocketBridgeReact.listen(function(action, stream) {
              console.log("++++++++++!!!!!!!!componentDidMount webSocketBridgeReact:", action);

          });
          setTimeout(()=> {webSocketBridgeReact.send({});}, 2000);
      });

    // if (!github.isLoadingRepos && github.repos === undefined) {
    //   dispatch(githubActions.fetchRepos())
    // }
  }
  // handleClick() {
  //       console.log("handleClick11");
  //       console.log(this.props);
  //   let {dispatch} = this.props;
  //
  //   dispatch(counterActions.increaseCounter())
  // }

  handleClickIncreaseSingleton(){
    let {dispatch} = this.props;
    dispatch(counterSingleActions.increaseCounterSingletons())
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
    let {countersSingle} = this.props
    // if (github.isLoadingRepos || github.repos === undefined) {
    //   return this.renderLoading()
    // }
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            {/*<Headline>Sample App!</Headline>*/}
            <div style={[styles.button]} onClick={() => this.handleClickIncreaseSingleton()}>INCREASE Singleton</div>
            <p style={[styles.counter]} >{countersSingle.clicksSingle['ffff']}</p>
          </div>
          <div className="col-sm-3">
            войти
          </div>
           <div className="col-sm-3">
            счет
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            в игре| сбор
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            -------------
          </div>
        </div>
      </div>
    )
  }
}