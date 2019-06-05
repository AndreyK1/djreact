//сначала конектится к бэе серверу ртсСервером(создаем) (с определенной группой). Затем клиент с такой же группой забирает с бэк сервера
// Id ртс сервера требуемой группы и конектится к нему (сначала запрашиваем кто сервер addToRtcGroup,  затем коннектимся connectToServer). При конекте сначала передаем ртсСерверу наше имя, затем уже конектимся вызовом
//
//(сейчас отключено добавление клиентов в группу (клиентов будет собирать чисто js часть, потом может вернуть стоит))
// ртс сервер собирает все конекты к себе и создает соединение звезда между ними и собой

import React from "react"
//import * as newarenaCreate from "../actions/newArenaActions";
import * as webRtcActions from "../actions/webRtcActions";
import * as listenPlaygrounsList from "../actions/playGroundActions";
//import * as PropsTypes from "react/lib/ReactPropTypes";
//import * as newarenaCreate from "../actions/newArenaActions";

const styles = {
  video: {
      display: "none",
  }
}

export default class ModalRTC extends React.Component {

   componentDidMount() {
    let {dispatch, playground, webRtcRed} = this.props
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
      document.getElementById("mypeerid").innerText =  id
      console.log('My peer ID is: ' + id);
      dispatch(webRtcActions.setPeerId(id))
    });


    // устанавливаем листенер (режим сервера) текстовых сообщений
    peer.on('connection', function(conn) {
      conn.on('data', function(data){
        // Will print 'hi!'
        console.log("rrrrrrrrrrrrrrrrrr conn.peer:" + conn.peer, data);
        // console.log('connection', conn)

        //если в сообщении (серверу)прилетело имя юзера-клиента, то прикрепляем его к конекшену
        if(data["userName"]){
            console.log('webRtcRed.dictOfGains', webRtcRed.dictOfGains)
            let dictOfGain = webRtcRed.dictOfGains[conn.peer]
            console.log("dictOfGain", dictOfGain)
            if(dictOfGain){
                // dictOfGain["userName"] = data["userName"]
                dispatch(webRtcActions.addUserNameToConn(conn.peer, data["userName"]));
            }
        }

        //если в сообщении (клиенту)прилетает от сервера весь список клиентов
        if(data["rtcGroup"]){
            console.log('webRtcRed.dictOfGains', webRtcRed.dictOfGains)
                console.log("data[\"rtcGroup\"] " +data["rtcGroup"])

                dispatch(webRtcActions.addRtcGroupConn(JSON.parse(data["rtcGroup"])));
        }


      });
    });


    //если я сервер (ртс), то рассылаю всем участникам состав группы
    if (window.intervalORtsBroadcast !== null) {
        console.log("intervalORtsBroadcast ", window.intervalORtsBroadcast)
        clearInterval(window.intervalORtsBroadcast)
    }
    let dictOfGains =   webRtcRed.dictOfGains
    console.log("dictOfGains--intervalORtsBroadcast--", dictOfGains)
     window.intervalORtsBroadcast = setInterval(function() {
         let aarayOfNames = []
         for (let key in dictOfGains){
             aarayOfNames.push(dictOfGains[key]["userName"])
         }
        for (let key in dictOfGains){
            //connectionOfClientsToServer
            var conn;
            if(dictOfGains[key]["connectionOfClient"]){
                // conn = connectionOfClientsToServer[key];
                conn = dictOfGains[key]["connectionOfClient"];
                console.log("conn exist send ", aarayOfNames)
                conn.send({"rtcGroup": JSON.stringify(aarayOfNames)});
            }else{
                 conn = peer.connect(key);
                 //connectionOfClientsToServer[key] = conn
                // on open will be launch when you successfully connect to PeerServer
                conn.on('open', function(){
                  // here you have conn.id
                    console.log("conn created send ", aarayOfNames)
                  conn.send({"rtcGroup": JSON.stringify(aarayOfNames)});
                });
                dispatch(webRtcActions.addConnectionToClient(key, conn));
            }


        }

      }, 3000);


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

  changeMyPeergroup = (el) => {
    this.props.dispatch(webRtcActions.changeMyPeergroup(el.target.value));
  }


  gainNodeVolumechange = (peer_id, action) => {
    let {webRtcRed} = this.props

      let dictOfGains = webRtcRed.dictOfGains
      let gainNode = dictOfGains[peer_id]["gainNode"]
      let currGain
      if(gainNode.gain.tvalue){
          currGain = parseFloat(gainNode.gain.tvalue);
      }else{
          currGain = parseFloat(gainNode.gain.value);
      }


     console.log("currGain", currGain)
    let step = 0.25
      let val = 0;
      if(action == "+"){
          // if(val >= step)
          //    val = 1
          // else
          //   val = +step
          currGain = currGain +0.25
      }else if(action == "-"){
          // if(val <= step)
          //    val = 0
          // else
          //   val = -step
          currGain = currGain -0.25
      }else{
          alert("error action in gainNodeVolumechange")
          return;
      }




      // currGain = currGain + val;
       console.log("currGain, peer_id00", currGain, peer_id)
      gainNode.gain.tvalue = currGain
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
      let {webRtcRed, dispatch} = this.props
      let objParent = this
      let peer = webRtcRed.peer;

      //addAsRtcGroupServer  - Добавляем себя как сервер группы
      this.props.dispatch(webRtcActions.addToRtcGroup(webRtcRed.peer_id, webRtcRed.myPeerGroup, "server"));




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



       // setInterval(function() {
       //     let dataArray = new Uint8Array(bufferLength);
       //     let dataArrayF = new Float32Array(bufferLength);
       //     analyser.getFloatTimeDomainData(dataArrayF);
       //                  // console.log("getByteFrequencyData ",dataArrayF )
       //
       //     let max = Math.max(-Math.min.apply(Math,dataArrayF), Math.max.apply(Math, dataArrayF))
       //     console.log("max ",max )
       //
       //  }, 500);
   }



    closeConnectToServer = () => {
         let {webRtcRed} = this.props


        // console.log("callConnectionOfClient11", callConnectionOfClient)
       let connections = webRtcRed.peer.connections[webRtcRed.myPeerServer]
        console.log("connections1222", connections)
        for(let i=0; i<connections.length; i++){
            let conn = connections[i]
            conn.close()
        }
        //let conn = connections.pop()
        //conn.close()

    }

   connectToServer = () => {
      let {webRtcRed, userName, dispatch} = this.props
      let peer = webRtcRed.peer;
       // this.audoiExamples()
       let mainObj = this

    let video = document.getElementById("myvideo")
    let localvar = peer;
    // callConnectionOfClient = peer



    //let server_id = document.getElementById("rempeerid").value;
    let server_id = webRtcRed.myPeerServer;
    if(server_id == 0){
        alert("server_id = 0")
        return;
    }
    // let n = <any>navigator;

    navigator.getUserMedia = ( navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia  || navigator.msGetUserMedia );





     //звонок
    navigator.getUserMedia({video: false, audio: true}, function(stream) {
      let callConn = localvar.call(server_id, stream);
      callConn.on('stream', function(remotestream) {
        console.log("!!!!!!!!!!!---------!!!!!!!!!!! PHASE-CLENT - 1")
        // let remsource = audioCtx.createMediaStreamSource(remotestream);

         video.srcObject = remotestream
        video.play();


             //отправка текстового сообщения серверу, кто я
          let connText = localvar.connect(server_id);
            // on open will be launch when you successfully connect to PeerServer
            connText.on('open', function(){
                document.getElementById("conn_state").innerText = "connected"
                document.getElementById("conn_state").style.color = "green"
              // here you have conn.id
              connText.send({"userName": userName});
            });
          // console.log("call 99999", call)
          // call.pc.send({"userName": userName});

      })

        callConn.on('close', function() {
            alert('closed connection by server: '+ callConn.peer)
            document.getElementById("conn_state").innerText = "disconnected"
            document.getElementById("conn_state").style.color = "red"
            //очищаем список клиентов
            // document.getElementById("rtc_clients_list").innerText = ""
            dispatch(webRtcActions.addRtcGroupConn([]));

            // callConn = localvar.call(server_id, stream);
            if(document.getElementById("is_need_reconect").checked){
                mainObj.connectToServer();
            }

        })
        callConn.on('error', function(err) {
            alert('error connection with server: '+ callConn.peer)
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



    //отрисовка регулировок громкости на сервере
    let rtcGainsNodes = []
    let dictOfGains =   webRtcRed.dictOfGains
      console.log("dictOfGains--render--", dictOfGains)
    for (let key in dictOfGains){

        let nodeGain = (
            <span>{key} : {dictOfGains[key]["userName"]} <button onClick={() => this.gainNodeVolumechange(key, "+")} >+</button> <button onClick={() => this.gainNodeVolumechange(key, "-")} >-</button>
                Volume:<span id={key}>0</span> <button onClick={() => this.closeConnectToClient(key)} >X</button> | </span>
        )
        // <div>{index} : <button>+</button><button>-</button> | </div>
        rtcGainsNodes.push(nodeGain)
    }

     //отрисовка ртс группы на клиенте
    let rtcGroupConnectionsNodes = []
    let rtcGroupConnections =   webRtcRed.rtcGroupConnections
    for (let i=0; i< rtcGroupConnections.length; i++){
        rtcGroupConnectionsNodes.push(<span> {rtcGroupConnections[i]} | </span>)
    }

    if (window.intervalOfVolumes !== null) {
        console.log("intervalOfVolumes ", window.intervalOfVolumes)
        clearInterval(window.intervalOfVolumes)
    }
    window.intervalOfVolumes = setInterval(function() {
        //console.log("----dictOfGains", dictOfGains)
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

             {/*<p> isModalRtcShow: {webRtcRed.isModalRtcShow}</p>*/}


              {/*My Id: <input id="mypeerid" /> Rem Id: <input id="rempeerid" />*/}
              {/*My group: {webRtcRed.myPeerGroup} | <input id="mypeergroup_id" onChange={(el) => this.changeMyPeergroup(el)} />*/}
              My Id: <span id="mypeerid" ></span> | My group: {webRtcRed.myPeerGroup}
              <br/>
              <button onClick={() => this.peerJsListenAsServer()}>peerJsListenAsServer</button>
              {/*<button onClick={() => this.peerJsSend()}>peerJsSend</button>*/}
              <button onClick={() => this.connectToServer()}>connectToServer</button>
              reconnect<input type="checkbox" id="is_need_reconect"  /><span id="conn_state"></span>
              <br/>
              <button onClick={() => this.closeConnectToServer()}>closeConnectToServer</button>
              {/*<canvas id="canvas_id"></canvas>*/}
              <br/>
              {/*<p >addedToRtc : {webRtcRed.addedToRtc["addedToRtc"]}</p>*/}
              {/*<p>server: {myServer}</p>*/}
              <p>server : {webRtcRed.myPeerServer}</p>
              <p>{rtcGroupsNodes}</p>
              <p >addedToRtc : {webRtcRed.addedToRtc["addedToRtc"]}</p>
              <button onClick={() => this.addToRtcGroup()}>addToRtcGroup</button>
              <br/>
              <button onClick={() => this.audoiExamples()}>audoiExamples</button>

              <audio id="myvideo" style={[styles.video]}></audio>
               <div>{rtcGainsNodes}</div>

              <div>В канале: {rtcGroupConnectionsNodes}</div>

            {/*{children}*/}
            <button onClick={() => this.handleClose()}>close</button>



              {/*<button id="targetAtTimePlus">+++</button><button id="targetAtTimeMinus">---</button>*/}

          </section>
        </div>
    )
  }
}