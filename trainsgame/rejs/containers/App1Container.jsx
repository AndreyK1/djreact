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
import ArenasTab from "../components/ArenasTab";
import * as newarenaCreate from "../actions/newArenaActions";


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
    newarena: state.newarena,
}))
@Radium
export default class App1Container extends React.Component{

    state = { showModNewArena: false };

  componentDidMount() {
    let {dispatch, playground} = this.props
      dispatch(listenPlaygrounsList.listenPlaygrounsList(playground.isIstenerSended))

  }


  // handleClickIncreaseSingleton(){
  //   let {dispatch} = this.props;
  //   dispatch(counterSingleActions.increaseCounterSingletons())
  // }

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
     // let {dispatch} = this.props
     //  dispatch(newarenaCreate.newarenaCreate())
    this.setState({ showModNewArena: true });
  }

  hideModalNewArena= () =>{
    this.setState({ showModNewArena: false });
  }

  render() {
    console.log("render");
    console.log(this.props);
    let {countersSingle, playground, dispatch, newarena} = this.props


    // if (github.isLoadingRepos || github.repos === undefined) {
    //   return this.renderLoading()
    // }
    return (
      <div className="container">
        <div className="row">
          {/*<div className="col-sm-6">*/}
            {/*/!*<Headline>Sample App!</Headline>*!/*/}
            {/*<div style={[styles.button]} onClick={() => this.handleClickIncreaseSingleton()}>INCREASE Singleton</div>*/}
            {/*<p style={[styles.counter]} >{countersSingle.clicksSingle['ffff']}</p>*/}
          {/*</div>*/}

          <div className="col-sm-12">
              <ModalNewArena show={this.state.showModNewArena} handleClose={this.hideModalNewArena} createGame={newarenaCreate.newarenaCreate} dispatch={dispatch} newarena = {newarena.newarena} >
                  <p>Modal</p>
                  <p>Data</p>
                  {/*<button onClick={dispatch(createGame)}>Create Arena</button>*/}
              </ModalNewArena>
              <button type="button" onClick={this.showModalNewArena}>
                  create new Arena
              </button>
          </div>
          <div className="col-sm-12" id="gameCont">
            <ArenasTab playgrounds={playground.playgrounds} />
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
          {playground.playgrounds !== undefined &&
              <PlaygroundsList playgrounds={playground.playgrounds} />
          }
      </div>
    )
  }
}