import React from "react"
import * as newarenaCreate from "../actions/newArenaActions";
import * as webRtcActions from "../actions/webRtcActions";
import * as profileActions from "../actions/profileActions";

export default class ProfileModal extends React.Component {

  handleClose = () => {
     this.props.dispatch(profileActions.showModalProfile(false));
  }

  showBalance = () => {
     // this.props.dispatch(profileActions.showModalProfile(false));
     //  let wallet = '0x45e044ED9Bf130EafafA8095115Eda69FC3b0D20' ;
      let wallet = '0x45ca230b2684D10bE2F8a749CA2F60828A2576f4' ;
      let address = wallet ;
      let balance;
      if (address.length <= 3) {
            alert("Wallet address is incorrect") ;
            return 0 ;
       }

       let tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDecimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
        let tokenAddress = "0xab20a3630f943831a57c767ee94b90801b88787c"

       let TreasureContract = web3.eth.contract(tokenABI).at(tokenAddress)

        // web3.eth.getBalance(address, function(error, result){
        TreasureContract.balanceOf(address, function(error, result){
            console.log('yes') ;
            if(!error) {
                console.log("getBalance ", result)
                balance = result.toString(10) ;
                // setBalance(balance) ;
                let wei = balance
                   let eth = wei / 1000000000000000000 ;
                  // let eth = wei(wei, 'ether') ;
                  alert("eth" + eth)
                    $('.balance_positive').html(eth) ;
                  $.cookie("address", address);
            } else {
                alert('Some error happens. Please, try again.') ;
                console.error(error);
            }
        });

  }



  render() {
    let {profileRed, playground} = this.props

    let showHideClassName = profileRed.isModalProfileShow  ? "modal display-block" : "modal display-none";

    return (
       <div className={showHideClassName}>
          <section className="modal-main">
            <div>Name: {playground.userName}</div>
            <div>Count in BD: {playground.userCount}</div>
            <div>Count in TRC: </div>
            <button onClick={() => this.showBalance()}>showBalance</button>
            <br />
            <button onClick={() => this.handleClose()}>close</button>
          </section>


       </div>
    )
  }
}