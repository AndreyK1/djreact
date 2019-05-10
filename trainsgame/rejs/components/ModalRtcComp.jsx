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


       //конектимся к серверу самого peer js
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

   addGainNode = (call, gainNode, visualiser) => {
    this.props.dispatch(webRtcActions.addGainNode(call, gainNode, visualiser));
  }

  delGainNode = (call) => {
    this.props.dispatch(webRtcActions.delGainNode(call));
  }


  gainNodeVolumechange = (peer_id, action) => {
    let {webRtcRed} = this.props

      let dictOfGains = webRtcRed.dictOfGains
      let val = 0;
      if(action == "+"){
          val = +0.25
      }else if(action == "-"){
          val = -0.25
      }else{
          alert("error action in gainNodeVolumechange")
          return;
      }

      let gainNode = dictOfGains[peer_id]["gainNode"]

       let currGain = gainNode.gain.value;
      currGain = currGain + val;
       console.log("currGain, peer_id00", currGain, peer_id)
      gainNode.gain.setValueAtTime(currGain, audioCtx.currentTime + 1);
  }

  closeConnectToClient = (peer_id) => {
       let {webRtcRed} = this.props
      let dictOfGains = webRtcRed.dictOfGains
      let call = dictOfGains[peer_id]["call"]
      call.close()

    }



  peerJsSend = () => {
      let {webRtcRed} = this.props
      let peer = webRtcRed.peer;
       // let another_peers_id =  document.getElementById("rempeerid").value
      let another_peers_id =  webRtcRed.myPeerServer

      //отправка текстовых сообщений серверу
      var conn = peer.connect(another_peers_id);
        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function(){
          // here you have conn.id
          conn.send('hi!');
        });
  }

  peerJsListenAsServer = () => {
      let {webRtcRed} = this.props
      let objParent = this
      let peer = webRtcRed.peer;

      //addAsRtcGroupServer  - Добавляем себя как сервер группы
      this.props.dispatch(webRtcActions.addToRtcGroup(webRtcRed.peer_id, webRtcRed.myPeerGroup, "server"));


        // устанавливаем листенер (режим сервера) текстовых сообщений
        peer.on('connection', function(conn) {
          conn.on('data', function(data){
            // Will print 'hi!'
            console.log("rrrrrrrrrrrrrrrrrr" + data);
          });
        });

        // устанавливаем листенер (режим сервера) звонков
        peer.on('call', function(call) {
            console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-SERVER---------from:"+ call.peer)
            console.log("----------+++NEW CALL++++----------------from: "+ call.peer)
            objParent.makeanswer(call)

       });
   }

   //отвечаем на звонок
    makeanswer = (call) => {
       let {webRtcRed} = this.props
        let objParent = this

       navigator.getUserMedia =  ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
         navigator.getUserMedia({video: false, audio: true}, function(stream) {
             console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-SERVER-2")

             console.log("getUserMedia stream : ", stream)

               let mysource = audioCtx.createMediaStreamSource(stream);

      //TODO включить звук от вервера обязательно потом
                       mysource.connect(destination_participant1)

            call.answer(destination_participant1.stream);

            call.on('stream', function(remotestream){
                console.log("!!!!!!!!!!!1---------!!!!!!!!!!! PHASE-SERVER-3")

                console.log("remotestream", remotestream)
                    let video = document.getElementById("myvideo")


                //преобразование сигнала из webRTC в web Audio
                let audio = new Audio();
                audio.srcObject = remotestream;
                audio.onloadedmetadata = function() {
                  let remsource = audioCtx.createMediaStreamSource(audio.srcObject);
                    let gainNode = audioCtx.createGain();
                    gainNode.gain.value = 0.5;

                    remsource.connect(gainNode)


                    let visualiser = objParent.visualiseStreamForCall(gainNode)

                    objParent.addGainNode(call, gainNode, visualiser)

                    visualiser.connect(destination_participant1)
                    visualiser.connect(server_participant)

                    video.srcObject =server_participant.stream
                    video.play();
                }

            })

            call.on('close', function() {
                 alert('closed connection with client22: '+ call.peer)
                objParent.delGainNode(call)

            })
            call.on('error', function(err) {
                alert('error connection with client22: '+ call.peer)
                console.log('error connection with client22', err);
            })
          }, function(err) {
            console.log('Failed to get stream', err);
          })
   }

   visualiseStreamForCall = (source) => {
       console.log("!!!!!!!!!1visualiseStream source ",source )
        let analyser = audioCtx.createAnalyser();
        source.connect(analyser);

        analyser.fftSize = 256;
        // analyser.fftSize = 2048;
        let bufferLength = analyser.frequencyBinCount;
        console.log("bufferLength ",bufferLength )
       return analyser;

   }


   visualiseStream = (source) => {
       console.log("!!!!!!!!!1visualiseStream source ",source )
        let analyser = audioCtx.createAnalyser();
        source.connect(analyser);

        analyser.fftSize = 256;
        // analyser.fftSize = 2048;
        let bufferLength = analyser.frequencyBinCount;
        console.log("bufferLength ",bufferLength )



       setInterval(function() {
           let dataArray = new Uint8Array(bufferLength);
           let dataArrayF = new Float32Array(bufferLength);
           analyser.getFloatTimeDomainData(dataArrayF);
                        // console.log("getByteFrequencyData ",dataArrayF )

           let max = Math.max(-Math.min.apply(Math,dataArrayF), Math.max.apply(Math, dataArrayF))
           console.log("max ",max )

        }, 500);
   }



    closeConnectToServer = () => {
         let {webRtcRed} = this.props


        console.log("callConnectionOfClient", callConnectionOfClient)
       let connections = callConnectionOfClient.connections[webRtcRed.myPeerServer]
        console.log("connections", connections)
        let conn = connections.pop()
        conn.close()

    }

   connectToServer = () => {
      let {webRtcRed} = this.props
      let peer = webRtcRed.peer;
       // this.audoiExamples()

    let video = document.getElementById("myvideo")
    let localvar = peer;
    callConnectionOfClient = peer

    //let server_id = document.getElementById("rempeerid").value;
    let server_id = webRtcRed.myPeerServer;
    if(server_id == 0){
        alert("server_id = 0")
        return;
    }
    // let n = <any>navigator;

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia );

    navigator.getUserMedia({video: false, audio: true}, function(stream) {
      let call = localvar.call(server_id, stream);
      call.on('stream', function(remotestream) {
        console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-CLENT - 1")
        // let remsource = audioCtx.createMediaStreamSource(remotestream);

         video.srcObject = remotestream
        video.play();
      })

        call.on('close', function() {
            alert('closed connection by server: '+ call.peer)
        })
        call.on('error', function(err) {
            alert('error connection with server: '+ call.peer)
            console.log('error connection with server', err);
        })

    }, function(err){
      console.log('Failed to get stream', err);
    })
  }


  addToRtcGroup = () => {
       let {webRtcRed} = this.props

      this.props.dispatch(webRtcActions.addToRtcGroup(webRtcRed.peer_id, webRtcRed.myPeerGroup, "client"));
  }


  audoiExamples = () => {
    console.log(this)
    let objGlob = this

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia );
    //alert("outside")
    navigator.getUserMedia({video: false, audio: true}, function(stream) {

        let audioTracks = stream.getAudioTracks()
        console.log("audioTracks ", audioTracks)
        console.log("getUserMedia stream", stream)

        let source = audioCtx.createMediaStreamSource(stream);

        objGlob.visualiseStream(source)
        let synthDelay = new DelayNode(audioCtx, {
          delayTime: 1.5,
          maxDelayTime: 2,
        });

        console.log("source", source)
        source.connect(synthDelay);
        console.log("synthDelay", synthDelay)

         var destination_particip = audioCtx.createMediaStreamDestination();
         synthDelay.connect(destination_particip)
        console.log("destination_particip stream", destination_particip.stream)
                        let merger = audioCtx.createChannelMerger();
                synthDelay.connect(merger, 0, 0)
                source.connect(merger, 0, 0)
               console.log("merger stream", destination_particip.stream)

                merger.connect(audioCtx.destination);
    }, function(err){
      console.log('Failed to get stream', err);
    })
  }

  render() {
    let {webRtcRed, children} = this.props

    let rtcGroupsNodes = []
       let mygroups =  []
      let myServer = 0
      if(webRtcRed.addedToRtc[webRtcRed.myPeerGroup]){
          mygroups = webRtcRed.addedToRtc[webRtcRed.myPeerGroup]["clients"]
      }

      for (let index = 0; index < mygroups.length; ++index){
        let node = (
          <span>{mygroups[index]} | </span>
        )
        rtcGroupsNodes.push(node)
    }



    //отрисовка регулировок громкости
    let rtcGainsNodes = []
    let dictOfGains =   webRtcRed.dictOfGains
      console.log("dictOfGains--render--", dictOfGains)
    for (let key in dictOfGains){

        let nodeGain = (
            <span>{key} : <button onClick={() => this.gainNodeVolumechange(key, "+")} >+</button> <button onClick={() => this.gainNodeVolumechange(key, "-")} >-</button>
                Volume:<span id={key}>0</span> <button onClick={() => this.closeConnectToClient(key)} >X</button> | </span>
        )
        // <div>{index} : <button>+</button><button>-</button> | </div>
        rtcGainsNodes.push(nodeGain)
    }


    if (window.intervalOfVolumes !== null) {
        console.log("intervalOfVolumes ", window.intervalOfVolumes)
        clearInterval(window.intervalOfVolumes)
    }


    window.intervalOfVolumes = setInterval(function() {
        for (let key in dictOfGains){
           let analyser = dictOfGains[key]["visualiser"]
            let bufferLength = analyser.frequencyBinCount;
           let dataArrayF = new Float32Array(bufferLength);
           analyser.getFloatTimeDomainData(dataArrayF);
                        // console.log("getByteFrequencyData ",dataArrayF )

           let max = Math.max(-Math.min.apply(Math,dataArrayF), Math.max.apply(Math, dataArrayF))
            max = max*100
           console.log("max key ", key,max )
            document.getElementById(key).innerHTML =  max.toFixed(4)




        }

       }, 500);




    let showHideClassName = webRtcRed.isModalRtcShow ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
          <section className="modal-main">
             {/*<div className="col-sm-12" id="gameCont">*/}

             <p> isModalRtcShow: {webRtcRed.isModalRtcShow}</p>


              My Id: <input id="mypeerid" /> Rem Id: <input id="rempeerid" />
              My group: <input id="mypeergroup" value={webRtcRed.myPeerGroup} />
              <br/>
              <button onClick={() => this.peerJsListenAsServer()}>peerJsListenAsServer</button>
              <button onClick={() => this.peerJsSend()}>peerJsSend</button>
              <button onClick={() => this.connectToServer()}>connectToServer</button>
              <br/>
              <button onClick={() => this.closeConnectToServer()}>closeConnectToServer</button>
              <canvas id="canvas_id"></canvas>



            <br/><br/>
              {/*<p >addedToRtc : {webRtcRed.addedToRtc["addedToRtc"]}</p>*/}
              {/*<p>server: {myServer}</p>*/}
              <p>server : {webRtcRed.myPeerServer}</p>
              <p>{rtcGroupsNodes}</p>
              <p >addedToRtc : {webRtcRed.addedToRtc["addedToRtc"]}</p>
              <button onClick={() => this.addToRtcGroup()}>addToRtcGroup</button>
                                <br/>
                  <br/>

                  <button onClick={() => this.audoiExamples()}>audoiExamples</button>

              <video id="myvideo" ></video>

            {children}
            <button onClick={() => this.handleClose()}>close</button>
              <div>{rtcGainsNodes}</div>


              {/*<button id="targetAtTimePlus">+++</button><button id="targetAtTimeMinus">---</button>*/}

          </section>
        </div>
    )
  }
}