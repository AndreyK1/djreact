import React from "react"
import Radium from "radium"

import { connect } from "react-redux"

// import * as counterActions from "../actions/counterActions"
// import * as githubActions from "../actions/githubActions"
import * as counterSingleActions from "../actions/counterSingleActions"
import * as listenPlaygrounsList from "../actions/playGroundActions";
// import GithubRepos from "../../../reactjs/components/GithubRepos";
import PlaygroundsList from "../components/PlaygroundsList";
import ModalNewArena from "../components/ModalNewArena";


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
    playground: state.playground,
}))
@Radium
export default class App1Container extends React.Component{

    state = { showModNewArena: false };

  componentDidMount() {
    let {dispatch, playground} = this.props
      dispatch(listenPlaygrounsList.listenPlaygrounsList())

  }


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

  showModalNewArena= () =>{
    this.setState({ showModNewArena: true });
  }

  hideModalNewArena= () =>{
    this.setState({ showModNewArena: false });
  }

  render() {
    console.log("render");
    console.log(this.props);
    let {countersSingle, playground} = this.props


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
              <ModalNewArena show={this.state.showModNewArena} handleClose={this.hideModalNewArena}>
                  <p>Modal</p>
                  <p>Data</p>
              </ModalNewArena>
              <button type="button" onClick={this.showModalNewArena}>
                  openModNewArena
              </button>
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
          {playground.playgrounds !== undefined &&
              <PlaygroundsList playgrounds={playground.playgrounds} />
          }
      </div>
    )
  }
}