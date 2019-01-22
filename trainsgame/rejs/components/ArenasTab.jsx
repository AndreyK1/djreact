import React from "react"
import * as newarenaCreate from "../actions/newArenaActions";

export default class ArenasTab extends React.Component {

   joinGame = (arena_num) => {
    renderMainSceneGlobal();
       this.props.joinFunction("joiner")

     // alert("join " + arena)
       webSocketBridgeControl.send({"type":"join", "name":"1", "arena_num":arena_num })
        webSocketBridgeGroup.send(arena_num)
       chosenArena = arena_num
        $.cookie("chosenArena", chosenArena)

        this.props.dispatch(newarenaCreate.newarenaAddListeners());
  }
  render() {
    let {playgrounds} = this.props
    let plNodes = []
    let joinNodes = []
      // console.log("ArenasTab ", playgrounds)
    // playgrounds.forEach((item, index) => {
      for(let key in playgrounds){

          let players = "";
        for(let keyTrain in playgrounds[key].trains){
            // players += "+"+playgrounds[key].trains[keyTrain].number
            players += "+"+keyTrain
        }
          let node = (
          <div className="row">
              <div className="col-sm-12">
                  {key}  || кол-во игроков {Object.keys(playgrounds[key].trains).length} ||игроки {players}
                <button onClick={() => this.joinGame(key)}>join</button>
              </div>
          </div>
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