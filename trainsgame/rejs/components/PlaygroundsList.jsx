import React from "react"

export default class PlaygroundsList extends React.Component {
  render() {
    let {playgrounds} = this.props
    let plNodes = []
      console.log("PlaygroundsList ", playgrounds)
    // playgrounds.forEach((item, index) => {
      for(let key in playgrounds){
        let node = (
          <div className="row"><div className="col-sm-12">{key}  || кол-во игроков {Object.keys(playgrounds[key].trains).length}</div></div>
        )
        plNodes.push(node)
    }

    return (
        <div>{plNodes}</div>
    )
  }
}