import React from "react"
//import * as newarenaCreate from "../actions/newArenaActions";
import * as webRtcActions from "../actions/webRtcActions";
import * as listenPlaygrounsList from "../actions/playGroundActions";
//import * as PropsTypes from "react/lib/ReactPropTypes";
//import * as newarenaCreate from "../actions/newArenaActions";



export default class ModalRTC extends React.Component {

   componentDidMount() {
    let {dispatch, playground} = this.props
      // dispatch(listenPlaygrounsList.listenPlaygrounsList(playground.isIstenerSended))

    let peer = new Peer({
      config: {'iceServers': [
        { urls: 'stun:stun.l.google.com:19302' }
        // ,{ url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo', username: 'homeo' }
      ]} /* Sample servers, please use appropriate ones */
    });
    dispatch(webRtcActions.setPeer(peer))

    peer.on('open', function(id) {
      document.getElementById("mypeerid").value =  id
      console.log('My peer ID is: ' + id);
      dispatch(webRtcActions.setPeerId(id))
    });


  }

  handleClose = () => {
    this.props.dispatch(webRtcActions.showModalRtc(false));
  }


  peerJsSend = () => {
      let {webRtcRed} = this.props
      let peer = webRtcRed.peer;
       let another_peers_id =  document.getElementById("rempeerid").value
       var conn = peer.connect(another_peers_id);
        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function(){
          // here you have conn.id
          conn.send('hi!');
        });
  }

  peerJsListen = () => {
      let {webRtcRed} = this.props
      let peer = webRtcRed.peer;
      // peer.on('open', function(id) {
      //     document.getElementById("mypeerid").value =  id
      //     console.log('My peer ID is: ' + id);
      //  });
      // setTimeout(()=>{
      //      document.getElementById("mypeerid").value =  peer.id
      //  },1000)


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

   videoconnect = () => {
      let {webRtcRed} = this.props
      let peer = webRtcRed.peer;
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


  addToRtcGroup = () => {
       let {webRtcRed} = this.props

      this.props.dispatch(webRtcActions.addToRtcGroup(webRtcRed.peer_id, webRtcRed.myPeerGroup));
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
    let {webRtcRed, children} = this.props

    let rtcGroupsNodes = []
      console.log("rtcGroups ", webRtcRed.addedToRtc)
     // let mygroups = webRtcRed.addedToRtc[webRtcRed.myPeerGroup]
       let mygroups =  []
      if(webRtcRed.addedToRtc[webRtcRed.myPeerGroup]){
          mygroups = webRtcRed.addedToRtc[webRtcRed.myPeerGroup]
      }else{
          mygroups =  []
      }
      console.log("myrtcGroups ", mygroups)
    // playgrounds.forEach((item, index) => {
      //for(let key in webRtcRed.addedToRtc[webRtcRed.myPeerGroup]){

      for (let index = 0; index < mygroups.length; ++index){
        let node = (
          <span>{mygroups[index]} | </span>
        )
        rtcGroupsNodes.push(node)
    }

    let showHideClassName = webRtcRed.isModalRtcShow ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
          <section className="modal-main">
             {/*<div className="col-sm-12" id="gameCont">*/}

             <p> isModalRtcShow: {webRtcRed.isModalRtcShow}</p>


              My Id: <input id="mypeerid" /> Rem Id: <input id="rempeerid" />
              My group: <input id="mypeergroup" value={webRtcRed.myPeerGroup} />
              <br/>
              <button onClick={() => this.peerJsListen()}>peerJsListen</button>
              <button onClick={() => this.peerJsSend()}>peerJsSend</button>
              <button onClick={() => this.videoconnect()}>videoconnect</button>

            <br/><br/>
              {/*<p >addedToRtc : {webRtcRed.addedToRtc["addedToRtc"]}</p>*/}
            <p>{rtcGroupsNodes}</p>
              <p >addedToRtc : {webRtcRed.addedToRtc["addedToRtc"]}</p>
              <button onClick={() => this.addToRtcGroup()}>addToRtcGroup</button>
                                <br/>
                  <br/>

                  <button onClick={() => this.audoiExamples()}>audoiExamples</button>

              <video id="myvideo" ></video>

            {children}
            <button onClick={() => this.handleClose()}>close</button>

          </section>
        </div>
    )
  }
}