import React from "react"



export default class ModalNewArena extends React.Component {
  render() {
    let {show, handleClose, children} = this.props

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
            {children}
            <button onClick={handleClose}>close</button>
          </section>
        </div>
    )
  }
}