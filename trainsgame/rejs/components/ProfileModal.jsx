import React from "react"
import * as newarenaCreate from "../actions/newArenaActions";
import * as webRtcActions from "../actions/webRtcActions";
import * as profileActions from "../actions/profileActions";

export default class ProfileModal extends React.Component {

  handleClose = () => {
     this.props.dispatch(profileActions.showModalProfile(false));
  }

  render() {
    let {profileRed} = this.props

    let showHideClassName = profileRed.isModalProfileShow  ? "modal display-block" : "modal display-none";

    return (
       <div className={showHideClassName}>
          <section className="modal-main">
            <div>Name: </div>
            <div>Count in BD: </div>
            <div>Count in TRC: </div>
            <button onClick={() => this.handleClose()}>close</button>
          </section>
       </div>
    )
  }
}