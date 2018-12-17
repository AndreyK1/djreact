import React from "react"

export default class ArenasTab extends React.Component {
  render() {
    let {playgrounds} = this.props
    let plNodes = []
    let joinNodes = []
      console.log("ArenasTab ", playgrounds)
    // playgrounds.forEach((item, index) => {
      for(let key in playgrounds){
        let node = (
          <div className="row"><div className="col-sm-12">{key}  || длина {Object.keys(playgrounds[key].trains).length}</div></div>
        )
        if(playgrounds[key].started){
            plNodes.push(node)
        }else{
            joinNodes.push(node)
        }
    }

    return (
     <div>
         <ul className="nav nav-tabs" id="myTab">
              <li className="active"><a href="#play" data-toggle="tab">Играют {plNodes.length}</a></li>
              <li><a href="#join" data-toggle="tab">Собираются {joinNodes.length}</a></li>
          </ul>
          <div className="tab-content">
              <div className="tab-pane active" id="play">
                  <div>{plNodes}</div>
              </div>
              <div className="tab-pane" id="join">
                  <div>{joinNodes}</div>
              </div>

          </div>
      </div>
    )
  }
}