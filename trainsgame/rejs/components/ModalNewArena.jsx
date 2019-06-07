import React from "react"
import * as PropsTypes from "react/lib/ReactPropTypes";
import * as newarenaCreate from "../actions/newArenaActions";
import ModalRTC from "./ModalRtcComp";
import * as webRtcActions from "../actions/webRtcActions";


// const styles = {
//   outerFloat: {
//       position: "relative",
//   },
//    innerFloat: {
//       float: "left",
//       width: "45%",
//   }
// }

export default class ModalNewArena extends React.Component {

  //     static propTypes = {
  //   dispatch: PropsTypes.func,
  // }
    mystreasm = null;

   createArena = () => {
    renderMainSceneGlobal();
       // console.log("onButtonClick onButtonClick onButtonClick ")
    this.props.dispatch(newarenaCreate.newarenaCreate(this.props.newarena.is_listener_exist));
  }

  startGame = () => {
      // console.log("startGame startGame startGame ")
       webSocketBridgeStart.send(this.props.newarena.newarena.arena)
  }

  stopGame = () => {
      // console.log("startGame startGame startGame ")
        webSocketBridgeControl.send({"type":"stop", "name":"", "arena_num":chosenArena })
  }

  clearThisArena = () => {
        webSocketBridgeControl.send({"type":"clearThisArena", "name":"", "arena_num":chosenArena })
  }


  showModRtc= () =>{
     let {dispatch} = this.props
     dispatch(webRtcActions.showModalRtc(true))
  }


  render() {
    let {show, handleClose, children, createGame, dispatch, newarena, webRtcRed, userName} = this.props

    // let plNodes = []
    //   console.log("ModalNewArena ", show)
    // playgrounds.forEach((item, index) => {
    //   for(let key in playgrounds){
    //     let node = (
    //       <div className="row"><div className="col-sm-12">{key}  || длина {Object.keys(playgrounds[key].trains).length}</div></div>
    //     )
    //     plNodes.push(node)
    // }
      let showHideClassName = show ? "modal display-block" : "modal display-none";






        let buttons;

        if (newarena.whoClicked == "creator") {
          buttons =
              <div>
                  {/*{newarena.newarena.arena == 0 &&*/}
                    {/*<button onClick={this.createArena}>Create Arena</button>*/}
                  {/*}*/}
                  <button onClick={this.createArena}>Create Arena</button>
                  {newarena.newarena.arena > 0 &&
                    <button onClick={this.startGame}>startGame</button>
                  }
                  <button onClick={this.stopGame}>stopGame</button>
                  <br/>
                  <button onClick={this.clearThisArena}>clearThisGame</button>
                  <br/>


                </div>;
        } else {
          buttons = "";
        }

    return (
        <div className={showHideClassName}>
          <section className="modal-main">
            <div className="outer-float">
                  <div className="inner-float">
                     {/*<div className="col-sm-12" id="gameCont">*/}

                     <p> whoClicked: {newarena.whoClicked}</p>
                     <p id="my_arena"> arena: {newarena.newarena.arena}</p>
                      <p> you: {newarena.newarena.player}</p>
                      <p> number: {newarena.newarena.number}</p>
                      <p> players: {newarena.newarena.trains}</p>


                    {/*</div>*/}
                    {/*<button onClick={this.createArena}>Create Arena</button>*/}
                    {/*<button onClick={this.startGame}>startGame</button>*/}
                    {buttons}
                    {children}
                    <button onClick={handleClose}>close</button>
               </div>
               <div className="inner-float">
                     <ModalRTC  dispatch={dispatch} webRtcRed={webRtcRed} userName={userName} >
                          <p>ModalRTC</p>
                      </ModalRTC>

                      <button type="button" onClick={() => this.showModRtc()}>
                          webRtc
                      </button>
               </div>
               <div className="clear-both">
               </div>
               <div id="gameCont">
               </div>
          </div>
          </section>
        </div>
    )
  }
}