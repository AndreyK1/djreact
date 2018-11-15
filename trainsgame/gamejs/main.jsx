import setupCatExp from './main_1';
import setupHunter from './hunter';
import setupTrainsScene from './trainsPlayground';

//Aliases
let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Rectangle = PIXI.Rectangle,
    TextureCache = PIXI.utils.TextureCache;

let stageWidth=700;

//Create a Pixi Application
let appTrain = new Application({
    width: stageWidth,
    height: 700,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(appTrain.view);

//load an image and run the `setup` function when it's done
// loader
//   .add([
//       {url: treasHuntJs, onComplete: setupTrainsSceneWrap}
//       ])
//       .on("progress", loadProgressHandler)
//     .load(() => console.log("finish"));

loader
  .add([
      {url: treasHuntJs, onComplete: console.log("finish treasHuntJs")},
      {url: arrows, onComplete: console.log("finish arrows")}
      ])
      .on("progress", loadProgressHandler)
    .load(setupTrainsSceneWrap);


function setupTrainsSceneWrap(){
    //setupCat()
    setupTrainsScene(appTrain)
}


// ------------------------------------------------------------
//     --------------------------------------



//Create a Pixi Application
let appCat = new Application({
    width: stageWidth,
    height: 256,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);


let appCatExp = new Application({
    width: 700,
    height: 700,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);


//Create a Pixi Application
let app = new Application({
    width: 512,
    height: 512,
    antialias: true,
    transparent: false,
    resolution: 1
  }
);

//Add the canvas that Pixi automatically created for you to the HTML document
document.body.appendChild(app.view);
document.body.appendChild(appCat.view);
document.body.appendChild(appCatExp.view);


//load an image and run the `setup` function when it's done
// loader
//   .add([
//      // {url: catImg, onComplete: setupCat},
//      //  {url: catImg, onComplete: setupCatExpWrap},
//       {url: animalsJs, onComplete: setupCatExpWrap},
//       {url: tileset, onComplete: setupTi},
//       // {url: treasHuntJs, onComplete: setupAtlas}
//       {url: treasHuntJs, onComplete: setupHunterWrap}
//       ])
//       .on("progress", loadProgressHandler)
//     .load(() => console.log("finish"));

function setupCatExpWrap(){
    //setupCat()
    setupCatExp(appCatExp)
}

function setupHunterWrap(){
    //setupCat()
    setupHunter(app)
}

//atlas
//let id = PIXI.loader.resources[treasHuntJs].textures;

//Define variables that might be used in more
//than one function
// let dungeon, explorer, treasure, id, door;

// function setupAtlas() {
//
//   //There are 3 ways to make sprites from textures atlas frames
//
//   //1. Access the `TextureCache` directly
//   let dungeonTexture = TextureCache["dungeon.png"];
//   dungeon = new Sprite(dungeonTexture);
//   app.stage.addChild(dungeon);
//
//   //2. Access the texture using through the loader's `resources`:
//   explorer = new Sprite(
//     resources[treasHuntJs].textures["explorer.png"]
//   );
//   explorer.x = 68;
//
//   //Center the explorer vertically
//   explorer.y = app.stage.height / 2 - explorer.height / 2;
//   app.stage.addChild(explorer);
//
//   //3. Create an optional alias called `id` for all the texture atlas
//   //frame id textures.
//   id = PIXI.loader.resources[treasHuntJs].textures;
//
//
//
//   //Make the treasure box using the alias
//   treasure = new Sprite(id["treasure.png"]);
//
//   //Position the treasure next to the right edge of the canvas
//   treasure.x = app.stage.width - treasure.width - 48;
//   treasure.y = app.stage.height / 2 - treasure.height / 2;
//   app.stage.addChild(treasure);
//
//   //Make the exit door
//   door = new Sprite(id["door.png"]);
//   door.position.set(32, 0);
//   app.stage.addChild(door);
//
//
//   //Make the blobs
//   let numberOfBlobs = 6,
//       spacing = 48,
//       xOffset = 150;
//   //Make as many blobs as there are `numberOfBlobs`
//   for (let i = 0; i < numberOfBlobs; i++) {
//     //Make a blob
//     let blob = new Sprite(id["blob.png"]);
//     //Space each blob horizontally according to the `spacing` value.
//     //`xOffset` determines the point from the left of the screen
//     //at which the first blob should be added.
//     let x = spacing * i + xOffset;
//     //Give the blob a random y position
//     //(`randomInt` is a custom function - see below)
//     let y = randomInt(0, app.stage.height - blob.height);
//     //Set the blob's position
//     blob.x = x;
//     blob.y = y;
//     //Add the blob sprite to the stage
//     app.stage.addChild(blob);
//   }
//
//
// }


// function randomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

//tileset
// loader
//   .add(tileset)
//   .load(setupTi);

//This `setup` function will run when the image has loaded
let cat
function setupCat() {

  //Create the cat sprite
   cat = new Sprite(resources[catImg].texture);
  cat.x = 96;
  cat.y = 96;
  //cat.position.set(x, y)

  //   //Change the sprite's size
  // cat.width = 80;
  // cat.height = 120;

    //rotation
    cat.rotation = 0.9;
    cat.anchor.set(0.5, 0.5)

  //Add the cat to the stage
  appCat.stage.addChild(cat);

    //Start the game loop by adding the `gameLoop` function to
  //Pixi's `ticker` and providing it with a `delta` argument.
  appCat.ticker.add(delta => gameLoop(delta));
}

function gameLoop(delta){
    // console.log(cat.x, appCat.stage.width, delta)
    // console.log(delta)
    if( cat.x >  stageWidth ){
        cat.x = 0;
    }
  //Move the cat 1 pixel
  cat.x += 1 + delta;

    // 2-й способ это без  You don't have to use Pixi's ticker
    //requestAnimationFrame(gameLoop);
}



function setupTi() {
    console.log(TextureCache)
  //Create the `tileset` sprite from the texture
  let texture = TextureCache[tileset];


  //  let texture = resources[tileset].texture;



  console.log(texture)

  //Create a rectangle object that defines the position and
  //size of the sub-image you want to extract from the texture
  //(`Rectangle` is an alias for `PIXI.Rectangle`)
  let rectangle = new Rectangle(96, 64, 32, 32);

  //Tell the texture to use that rectangular section
  texture.frame = rectangle;

  //Create the sprite from the texture
  let rocket = new Sprite(texture);

  //Position the rocket sprite on the canvas
  rocket.x = 32;
  rocket.y = 32;

  //Add the rocket to the stage
  appCat.stage.addChild(rocket);

  //Render the stage
  renderer.render(stage);
}


function loadProgressHandler(loader, resource) {

  //Display the file `url` currently being loaded
  console.log("loading: " + resource.url);

  //Display the percentage of files currently loaded
  console.log("progress: " + loader.progress + "%");

  //If you gave your files names as the first argument
  //of the `add` method, you can access them like this
  //console.log("loading: " + resource.name);
}

//
//     let texture = PIXI.Texture.fromImage[tileset];
//   //  PIXI.Texture.addTextureToCache(texture, 'texture');
//
//   console.log(texture)
// let sprite1 = new PIXI.Sprite(texture);
//   app.stage.addChild(sprite1);