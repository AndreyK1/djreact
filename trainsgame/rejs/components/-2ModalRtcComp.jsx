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




          let video = document.getElementById("myvideo")


       // navigator.getUserMedia({video: true, audio: true}, function(stream) {
       //        video.src = URL.createObjectURL(stream);
       //        video.play();
       //
       //    }, function(err) {
       //      console.log('Failed to get stream', err);
       //    })



        // устанавливаем листенер (режим сервера) звонков
        peer.on('call', function(call) {
            console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-SERVER-1")
            console.log("----------+++NEW CALL++++----------------from: "+ call.peer)

            console.log("call", call)
            console.log("this", objParent)
            objParent.makeanswer(call)

       });
   }

   //отвечаем на звонок
    makeanswer = (call) => {
       let parObj = this
       navigator.getUserMedia =  ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia );
         navigator.getUserMedia({video: false, audio: true}, function(stream) {
             console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-SERVER-2")

             console.log("getUserMedia stream : ", stream)

               // window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
               // let audioCtx = new window.AudioContext();
               let mysource = audioCtx.createMediaStreamSource(stream);

                 // merger.connect(audioCtx.destination);
         // let destination_participant1 = audioCtx.createMediaStreamDestination();
                mysource.connect(destination_participant1)
       // synthDelay.connect(destination_participant1)
              console.log("destination_participant1", destination_participant1)

              // merger.connect( destination_participant1 );

             //сам ответ на звонок
            call.answer(destination_participant1.stream);

            call.on('stream', function(remotestream){
                console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-SERVER-3")
              console.log("---------------------------call.on(stream'---------------------- ")
                console.log("remotestream", remotestream)
              // video.src = URL.createObjectURL(remotestream);

                // let iddd = remotestream["id"]
                //
                // remotestream["id"] = "{"+iddd+"}"

                console.log("remotestream", remotestream)
                    let video = document.getElementById("myvideo")

                let audio = new Audio();
                audio.srcObject = remotestream;
                audio.onloadedmetadata = function() {
                  let remsource = audioCtx.createMediaStreamSource(audio.srcObject);
                //  audio.play();
                 // audio.muted = true;
                  //source.connect(gainNode);
                  //gainNode.connect(ctx.destination);
                    remsource.connect(destination_participant1)
                    remsource.connect(server_participant)
                    video.srcObject =server_participant.stream
                    video.play();
                }

      //           let remsource = audioCtx.createMediaStreamSource(remotestream);



                // remsource.connect(script)
     //           remsource.connect(destination_participant1)
    //            remsource.connect(server_participant)

                  //  parObj.visualiseStream(remsource)
                //remsource.connect(audioCtx.destination);

//remsource.connect(audioCtx.destination);



      //          console.log("remsource", remsource)
                // remsource.connect(destination_participant1)




       //         remsource.connect(merger_server_participant, 0, 0)
               // source.connect(merger_server_participant, 0, 0)
                //merger.connect(audioCtx.destination);


                //remsource.connect(server_participant)

                console.log("destination_participant1", destination_participant1)
                console.log("merger_server_participant", merger_server_participant)

                // let merger = audioCtx.createChannelMerger();
                // merger_server_participant.connect(audioCtx.destination);

                //destination_server

                //выводим себе, серверу на микрофон TODO change on destination_server

                //video.srcObject = destination_participant1.stream
                 console.log("server_participant.stream", server_participant.stream)

         //       remsource.connect(audioCtx.destination);

      //      remsource.connect(audioCtx.destination);
      //           video.srcObject =server_participant.stream
              //  remsource.connect(audioCtx.destination);
               // video.controls = true;
              //video.play();





            })
          }, function(err) {
            console.log('Failed to get stream', err);
          })
   }


   visualiseStream = (source) => {
       console.log("!!!!!!!!!1visualiseStream source ",source )
        let analyser = audioCtx.createAnalyser();
        source.connect(analyser);

        analyser.fftSize = 256;
        let bufferLength = analyser.frequencyBinCount;
        console.log("bufferLength ",bufferLength )



       setInterval(function() {
             let dataArray = new Uint8Array(bufferLength);
            analyser.getByteTimeDomainData(dataArray);
            console.log("getByteTimeDomainData ",dataArray )
           analyser.getByteFrequencyData(dataArray);
            console.log("getByteFrequencyData ",dataArray )
        }, 500);


       //  let canvas = document.getElementById("canvas_id")
       // let canvasCtx = canvas.getContext('2d');
       //  canvasCtx.lineWidth = 2;
       //  let WIDTH = 1200
       // let HEIGHT = 1200
       //  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
       // this.draw(WIDTH, HEIGHT, analyser, canvasCtx, dataArray, bufferLength)



   }

   draw = (WIDTH, HEIGHT, analyser, canvasCtx, dataArray, bufferLength) => {

            console.log("!!!!!!!!!draw analyser canvasCtx ",WIDTH, HEIGHT, analyser,  canvasCtx)
       console.log("dataArray bufferLength ",dataArray,  bufferLength)
          let drawVisual = requestAnimationFrame(()=>this.draw(WIDTH, HEIGHT, analyser, canvasCtx, dataArray, bufferLength));

          analyser.getByteFrequencyData(dataArray);

          canvasCtx.fillStyle = 'rgb(0, 0, 0)';
          canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

          let barWidth = (WIDTH / bufferLength) * 2.5;
          let barHeight;
          let x = 0;

          for(let i = 0; i < bufferLength; i++) {
            barHeight = dataArray[i];

            canvasCtx.fillStyle = 'rgb(' + (barHeight+100) + ',50,50)';
            canvasCtx.fillRect(x,HEIGHT-barHeight/2,barWidth,barHeight/2);

            x += barWidth + 1;
          }
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
        // video.src = URL.createObjectURL(remotestream);
        console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-CLENT - 1")

        // window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        // let audioCtx = new AudioContext();
        //let mysource = audioCtx.createMediaStreamSource(stream);
        let remsource = audioCtx.createMediaStreamSource(remotestream);
        //
        // let synthDelay = new DelayNode(audioCtx, {
        //   delayTime: 1.5,
        //   maxDelayTime: 2,
        // });
        //
        //  let merger = audioCtx.createChannelMerger();
        // mysource.connect(merger, 0, 0)
        //   remsource.connect(merger, 0, 0)
            // mysource.connect(synthDelay);
            // synthDelay.connect(remsource);



        // merger.connect(audioCtx.destination);
      //    remsource.connect(audioCtx.destination);
//


         video.srcObject = remotestream
        video.play();
      })

        call.on('close', function() {
            alert('closed connection by client: '+ call.peer)
        })
        call.on('error', function(err) {
            alert('error connection with client: '+ call.peer)
            console.log('error connection with client', err);
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




    // let n = <any>navigator;
    console.log(this)
    let objGlob = this

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia );
    //alert("outside")
    navigator.getUserMedia({video: false, audio: true}, function(stream) {

        let audioTracks = stream.getAudioTracks()
        console.log("audioTracks ", audioTracks)

       // alert("inside")
        // Web Audio - create context
        // window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
        // let audioCtx = new AudioContext();


        console.log("getUserMedia stream", stream)

        let source = audioCtx.createMediaStreamSource(stream);

        objGlob.visualiseStream(source)
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

        console.log("source", source)
        source.connect(synthDelay);
        console.log("synthDelay", synthDelay)

         var destination_particip = audioCtx.createMediaStreamDestination();
         synthDelay.connect(destination_particip)



        console.log("destination_particip stream", destination_particip.stream)


        // merger.connect(audioCtx.destination);

        //
        //  objGlob.mystreasm  = synthDelay
        //
        // objGlob.mystreasm.connect(audioCtx.destination);

                        let merger = audioCtx.createChannelMerger();
                synthDelay.connect(merger, 0, 0)
                source.connect(merger, 0, 0)
               console.log("merger stream", destination_particip.stream)

                merger.connect(audioCtx.destination);



                //  synthDelay.connect(audioCtx.destination);
        // source.connect(audioCtx.destination);


        // this.mystreasm = stream
         // video.srcObject = this.mystrerasm


    }, function(err){
      console.log('Failed to get stream', err);
    })
  }

  render() {
    let {webRtcRed, children} = this.props

    let rtcGroupsNodes = []
      //console.log("rtcGroups ", webRtcRed.addedToRtc)
     // let mygroups = webRtcRed.addedToRtc[webRtcRed.myPeerGroup]
       let mygroups =  []
      let myServer = 0
      if(webRtcRed.addedToRtc[webRtcRed.myPeerGroup]){
          mygroups = webRtcRed.addedToRtc[webRtcRed.myPeerGroup]["clients"]
       //   myServer = webRtcRed.addedToRtc[webRtcRed.myPeerGroup]["server"]
      }
      //console.log("myrtcGroups ", mygroups)
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

          </section>
        </div>
    )
  }
}