// alert("rfrfrefer")
//old

let type = "WebGL"
        if(!PIXI.utils.isWebGLSupported()){
          type = "canvas"
        }

        PIXI.utils.sayHello(type)


        //Create a Pixi Application
        let app = new PIXI.Application({
            width: 256,         // default: 800
            height: 256,        // default: 600
            antialias: true,    // default: false
            transparent: false, // default: false
            resolution: 1       // default: 1
          }
        );

        //Add the canvas that Pixi automatically created for you to the HTML document
        document.body.appendChild(app.view);

        app.renderer.view.style.position = "absolute";
        app.renderer.view.style.display = "block";
        app.renderer.autoResize = true;
        app.renderer.resize(window.innerWidth, window.innerHeight);


        // catImg = "{% static 'images/cat.png' %}"
        // catImg = "/static/images/cat.png"

        PIXI.loader
          .add(catImg)
          .load(setup);

        function setup() {
          let sprite = new PIXI.Sprite(
            PIXI.loader.resources[catImg].texture
          );
          app.stage.addChild(sprite);
        }