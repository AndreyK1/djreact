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
import ModalRTC from "../components/ModalRtcComp";
import * as newarenaCreate from "../actions/newArenaActions";
import * as webRtcActions from "../actions/webRtcActions";
import * as profileActions from "../actions/profileActions";
import ProfileModal from "../components/ProfileModal";


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
    webRtcRed: state.webRtcRed,
    profileRed: state.profileRed,
}))
@Radium
export default class App1Container extends React.Component{

    state = { showModNewArena: false };

  componentDidMount() {
    let {dispatch, playground} = this.props
      dispatch(listenPlaygrounsList.listenPlaygrounsList(playground.isIstenerSended))
    // console.log("window.userName" + window.userName)


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

  showModNewArenaFun= (whoClicked) =>{
     let {dispatch} = this.props
     //  dispatch(newarenaCreate.newarenaCreate())
     this.setState({ showModNewArena: true });
     dispatch(newarenaCreate.setClicker(whoClicked))


  }

  //  showModRtc= () =>{
  //    let {dispatch} = this.props
  //    dispatch(webRtcActions.showModalRtc(true))
  // }
   showModProfile= () =>{
     let {dispatch} = this.props
     dispatch(profileActions.showModalProfile(true))
  }



  hideModalNewArena= () =>{
    this.setState({ showModNewArena: false });
  }

  render() {
    // console.log("render");
    // console.log(this.props);
    let {countersSingle, playground, dispatch, newarena, webRtcRed, profileRed} = this.props

     let logActions = ""
     if(playground.userName == "unknown" || playground.userName == ""){
         logActions = <span><a href="/trains/log_in">log_in</a> |  <a href="/trains/sign_up">sign_up</a></span>
     }else{
         logActions = <a href="/trains/log_out">log_out</a>
     }

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
              <ProfileModal  dispatch={dispatch} userName={playground.userName} profileRed={profileRed} >
              </ProfileModal>
              <button type="button"  onClick={() => this.showModProfile()}>
                  Profile
              </button>
          </div>
          <div className="col-sm-12">
              <ModalNewArena show={this.state.showModNewArena} handleClose={this.hideModalNewArena} createGame={newarenaCreate.newarenaCreate} dispatch={dispatch} newarena = {newarena} webRtcRed={webRtcRed} userName={playground.userName} >
                  <p>Modal</p>
                  <p>Data</p>
                  {/*<button onClick={dispatch(createGame)}>Create Arena</button>*/}
              </ModalNewArena>
              <button type="button" onClick={() => this.showModNewArenaFun("creator")}>
                  create new Arena
              </button>
              <span>userName: {playground.userName} | count: {playground.userCount} | </span> {logActions}

          </div>
          <div className="col-sm-12">
              {/*<ModalRTC  dispatch={dispatch} webRtcRed={webRtcRed} userName={playground.userName} >*/}
                  {/*<p>ModalRTC</p>*/}
              {/*</ModalRTC>*/}
              {/*<button type="button"  onClick={() => this.showModRtc()}>*/}
              
                  {/*webRtc*/}
              {/*</button>*/}
          </div>
          <div className="col-sm-12">
            <ArenasTab playgrounds={playground.playgrounds} joinFunction={this.showModNewArenaFun} dispatch={dispatch} is_listener_exist={newarena.is_listener_exist}/>
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