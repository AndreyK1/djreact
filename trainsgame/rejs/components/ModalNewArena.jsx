import React from "react"
import * as PropsTypes from "react/lib/ReactPropTypes";
import * as newarenaCreate from "../actions/newArenaActions";



export default class ModalNewArena extends React.Component {

  //     static propTypes = {
  //   dispatch: PropsTypes.func,
  // }

    onButtonClick = () => {
       console.log("onButtonClick onButtonClick onButtonClick ")
    this.props.dispatch(newarenaCreate.newarenaCreate());
  }
  render() {
    let {show, handleClose, children, createGame, dispatch, newarena} = this.props

    // let plNodes = []
      console.log("ModalNewArena ", show)
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
            <p> arena {newarena.arena}</p>
              <p> player {newarena.player}</p>
            {/*</div>*/}
            <button onClick={this.onButtonClick}>Create Arena</button>
            {children}
            <button onClick={handleClose}>close</button>
          </section>
        </div>
    )
  }
}