import React from "react"
import * as PropsTypes from "react/lib/ReactPropTypes";
import * as newarenaCreate from "../actions/newArenaActions";



export default class ModalNewArena extends React.Component {

  //     static propTypes = {
  //   dispatch: PropsTypes.func,
  // }

   createArena = () => {
       // console.log("onButtonClick onButtonClick onButtonClick ")
    this.props.dispatch(newarenaCreate.newarenaCreate());
  }

  startGame = () => {
      // console.log("startGame startGame startGame ")
       webSocketBridgeStart.send(this.props.newarena.newarena.arena)
  }
  render() {
    let {show, handleClose, children, createGame, dispatch, newarena} = this.props

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



    return (
        <div className={showHideClassName}>
          <section className="modal-main">
             {/*<div className="col-sm-12" id="gameCont">*/}

             <p> whoClicked: {newarena.whoClicked}</p>
             <p id="my_arena"> arena: {newarena.newarena.arena}</p>
              <p> you: {newarena.newarena.player}</p>
              <p> number: {newarena.newarena.number}</p>
              <p> players: {newarena.newarena.trains}</p>


            {/*</div>*/}
            <button onClick={this.createArena}>Create Arena</button>
            <button onClick={this.startGame}>startGame</button>
            {children}
            <button onClick={handleClose}>close</button>

          </section>
        </div>
    )
  }
}