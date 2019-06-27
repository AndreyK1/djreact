import React from "react"
import * as newarenaCreate from "../actions/newArenaActions";
import * as webRtcActions from "../actions/webRtcActions";
import * as profileActions from "../actions/profileActions";

export default class ProfileModal extends React.Component {

   componentDidMount() {
        let tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDecimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
        let tokenAddress = "0xab20a3630f943831a57c767ee94b90801b88787c"

        let wallet = '0x45ca230b2684D10bE2F8a749CA2F60828A2576f4' ;


        window.web31 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/metamask'));
        window.TreasureContractNew1 = new window.web31.eth.Contract(tokenABI, tokenAddress, {from: wallet});
        // window.web3 = web3
        // window.TreasureContractOld = window.TreasureContractNew1;



       //  let web3 = new Web3(new Web3.providers.HttpProvider('https://rinkeby.infura.io/metamask'));
       //
       // window.TreasureContractOld = web3.eth.contract(tokenABI).at(tokenAddress)

        //        window.TreasureContractNew = new web3.eth.Contract(tokenABI, tokenAddress);
        // console.log(" TreasureContractNew oooo11",  TreasureContractNew)
   }

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

       // let tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDecimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
       //  let tokenAddress = "0xab20a3630f943831a57c767ee94b90801b88787c"
       //
       // let TreasureContract = web3.eth.contract(tokenABI).at(tokenAddress)

         window.TreasureContractNew1.methods.balanceOf(address).call().then(function(result){
            // if(!error) {
                console.log("getBalance ", result)
                balance = result.toString(10) ;
                // setBalance(balance) ;
                let wei = balance
                   let eth = wei / 1000000000000000000 ;
                  // let eth = wei(wei, 'ether') ;
                  alert("eth" + eth)
                    $('.balance_positive').html(eth) ;
                  $.cookie("address", address);
            // } else {
            //     alert('Some error happens. Please, try again.') ;
            //     console.error(error);
            // }
        });
      //old
      //   window.TreasureContractOld.balanceOf(address, function(error, result){
      //       console.log('yes') ;
      //       if(!error) {
      //           console.log("getBalance ", result)
      //           balance = result.toString(10) ;
      //           // setBalance(balance) ;
      //           let wei = balance
      //              let eth = wei / 1000000000000000000 ;
      //             // let eth = wei(wei, 'ether') ;
      //             alert("eth" + eth)
      //               $('.balance_positive').html(eth) ;
      //             $.cookie("address", address);
      //       } else {
      //           alert('Some error happens. Please, try again.') ;
      //           console.error(error);
      //       }
      //   });

  }

  showCoinName = () => {
       console.log(" window.TreasureContract",  window.TreasureContractOld)
      //    let tokenABI = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_value","type":"uint256"}],"name":"burnFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getDecimalKoef","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"},{"name":"_extraData","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"initialSupply","type":"uint256"},{"name":"tokenName","type":"string"},{"name":"tokenSymbol","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"}]
      //   let tokenAddress = "0xab20a3630f943831a57c767ee94b90801b88787c"
      //
      //
      // let TreasureContra = new web3.eth.Contract(tokenABI, tokenAddress);
         console.log(" window.TreasureContractNew1 1111234",  window.TreasureContractNew1)
       window.TreasureContractNew1.methods.name().call().then(console.log);
      //old working
      // window.TreasureContractOld.name(function(error, result){
      //           console.log("name ", result)
      //           let name = result.toString(10) ;
      //           alert(name)
      // })
  }



  transfer = () => {
      // calculate ERC20 token amount
      // let value = amount.times(web3.toBigNumber(10).pow(decimals));
      //   // call transfer function

      let toAddress = "0xc62A97B240644C5a5a8A99c0F9Eb4aa74a754dE1"

      let tokenAddress = "0xab20a3630f943831a57c767ee94b90801b88787c"

      let wallet = '0x45ca230b2684D10bE2F8a749CA2F60828A2576f4' ;

      // window.TreasureContract.transfer(toAddress, 190000000, (error, txHash) => {
      //     // it returns tx hash because sending tx
      //     console.log(txHash);
      // });


      let privateKey = Buffer.from('1C7A3993B45DFFE6403004AF68AEE24BBA8C6D5C5F31CDDA0B271D27364C4A67', 'hex')

        // 1e18 === 1 HST
        let amount = window.web31.utils.toHex(199e18)

        window.web31.eth.getTransactionCount(wallet)
          .then((count) => {
            let rawTransaction = {
              'from': wallet,
              'gasPrice': window.web31.utils.toHex(20 * 1e9),
              'gasLimit': window.web31.utils.toHex(210000),
              'to': tokenAddress,
              'value': 0x0,
              'data': window.TreasureContractNew1.methods.transfer(toAddress, amount).encodeABI(),
              'nonce': window.web31.utils.toHex(count)
            }
            let transaction = new ethereumjs.Tx(rawTransaction)
            transaction.sign(privateKey)
            window.web31.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex'))
              .on('transactionHash', console.log)
          })


      // var data = contract.transfer.getData("0x2...", 10000, {from: "0x9..."});
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
            <button onClick={() => this.showCoinName()}>showCoinName</button>
            <br />
            <button onClick={() => this.transfer()}>transfer</button>
            <br />
            <button onClick={() => this.handleClose()}>close</button>
          </section>


       </div>
    )
  }
}