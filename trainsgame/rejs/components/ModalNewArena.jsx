import React from "react"
import * as PropsTypes from "react/lib/ReactPropTypes";
import * as newarenaCreate from "../actions/newArenaActions";



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

  peerJsSend = (peer) => {
       let another_peers_id =  document.getElementById("rempeerid").value
       var conn = peer.connect(another_peers_id);
        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function(){
          // here you have conn.id
          conn.send('hi!');
        });
  }

   peerJsConnect = (peer) => {
      setTimeout(()=>{
           document.getElementById("mypeerid").value =  peer.id
       },3000)

        peer.on('connection', function(conn) {
          conn.on('data', function(data){
            // Will print 'hi!'
            console.log("rrrrrrrrrrrrrrrrrr" + data);
          });
        });



          navigator.getUserMedia =  ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
          let video = document.getElementById("myvideo")


       // navigator.getUserMedia({video: true, audio: true}, function(stream) {
       //        video.src = URL.createObjectURL(stream);
       //        video.play();
       //
       //    }, function(err) {
       //      console.log('Failed to get stream', err);
       //    })


        peer.on('call', function(call) {

          navigator.getUserMedia({video: false, audio: true}, function(stream) {

              window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
               let audioCtx = new AudioContext();
               let source = audioCtx.createMediaStreamSource(stream);
              let synthDelay = new DelayNode(audioCtx, {
                  delayTime: 1.5,
                  maxDelayTime: 2,
                });


              // let merger = audioCtx.createChannelMerger();
              // source.connect(merger, 0, 0)


               source.connect(synthDelay);
                // synthDelay.connect(remsource
                //       synthDelay.connect(remsource);

                  // synthDelay.connect(merger, 0, 0)


                // mysource.connect(synthDelay);
                // synthDelay.connect(remsource);



                 // merger.connect(audioCtx.destination);
                let destination_participant1 = audioCtx.createMediaStreamDestination();
                source.connect(destination_participant1)
              synthDelay.connect(destination_participant1)

              // merger.connect( destination_participant1 );

            call.answer(destination_participant1.stream);
            call.on('stream', function(remotestream){
              // video.src = URL.createObjectURL(remotestream);
                video.srcObject = remotestream
              video.play();
            })
          }, function(err) {
            console.log('Failed to get stream', err);
          })
       });
   }

     videoconnect = (peer) => {

       // this.audoiExamples()

    let video = document.getElementById("myvideo")
    let localvar = peer;
    let fname = document.getElementById("rempeerid").value;

    // let n = <any>navigator;

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia );

    navigator.getUserMedia({video: false, audio: true}, function(stream) {
      let call = localvar.call(fname, stream);
      call.on('stream', function(remotestream) {
        // video.src = URL.createObjectURL(remotestream);


        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        let audioCtx = new AudioContext();
        let mysource = audioCtx.createMediaStreamSource(stream);
        let remsource = audioCtx.createMediaStreamSource(remotestream);

        let synthDelay = new DelayNode(audioCtx, {
          delayTime: 1.5,
          maxDelayTime: 2,
        });

         let merger = audioCtx.createChannelMerger();
        mysource.connect(merger, 0, 0)
          remsource.connect(merger, 0, 0)
        // mysource.connect(synthDelay);
        // synthDelay.connect(remsource);



        merger.connect(audioCtx.destination);



        video.srcObject = remotestream
        video.play();



      })
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }


  audoiExamples = () => {
    let video = document.getElementById("myvideo")



    // let n = <any>navigator;
    console.log(this)
    let objGlob = this

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia );

    navigator.getUserMedia({video: false, audio: true}, function(stream) {
        // Web Audio - create context
        window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        let audioCtx = new AudioContext();
        let source = audioCtx.createMediaStreamSource(stream);
        // Create a biquadfilter
        // let biquadFilter = audioCtx.createBiquadFilter();
        // biquadFilter.type = "lowshelf";
        // biquadFilter.frequency.value = 1000;
        // biquadFilter.gain.value = 10;


        // let synthDelay = audioCtx.createDelay(55.0);
        let synthDelay = new DelayNode(audioCtx, {
          delayTime: 1.5,
          maxDelayTime: 2,
        });

        // connect the AudioBufferSourceNode to the gainNode
        // and the gainNode to the destination, so we can play the
        // music and adjust the volume using the mouse cursor
        // source.connect(biquadFilter);
        // biquadFilter.connect(audioCtx.destination);

        source.connect(synthDelay);

         objGlob.mystreasm  = synthDelay

        objGlob.mystreasm.connect(audioCtx.destination);

        // this.mystreasm = stream
         // video.srcObject = this.mystrerasm


    }, function(err){
      console.log('Failed to get stream', err);
    })
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


       let peer = new Peer({
          config: {'iceServers': [
            { urls: 'stun:stun.l.google.com:19302' }
            // ,{ url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo', username: 'homeo' }
          ]} /* Sample servers, please use appropriate ones */
        });



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
                  My Id: <input id="mypeerid" /> Rem Id: <input id="rempeerid" />
                  <button onClick={() => this.peerJsConnect(peer)}>peerJsConnect</button>
                  <button onClick={() => this.peerJsSend(peer)}>peerJsSend</button>
                  <button onClick={() => this.videoconnect(peer)}>videoconnect</button>
                  <video id="myvideo" ></video>
                  <br/>
                  <br/>

                  <button onClick={() => this.audoiExamples()}>audoiExamples</button>
                </div>;
        } else {
          buttons = "";
        }

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
            {/*<button onClick={this.createArena}>Create Arena</button>*/}
            {/*<button onClick={this.startGame}>startGame</button>*/}
            {buttons}
            {children}
            <button onClick={handleClose}>close</button>
              <div id="gameCont">
              </div>

          </section>
        </div>
    )
  }
}