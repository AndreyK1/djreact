//Aliases
let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite,
    Container = PIXI.Container,
    Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;


//Define any variables that are used in more than one function
let cat, hedgehog, tiger, state, idAn, animals, box, message;

function gameLoop(delta){
  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Move the cat 1 pixel to the right each frame
   //cat.vx = 1
    cat.x += cat.vx;
  cat.y += cat.vy;
 // console.log(cat.x, cat.y);

   //check for a collision between the cat and the box
  if (hitTestRectangle(cat, box)) {
    //if there's a collision, change the message text
    //and tint the box red
    message.text = "hit!";
    box.tint = 0x223300;
    //box.beginFill(0x33FF99);
  } else {
    //if there's no collision, reset the message
    //text and the box's color
    message.text = "No collision...";
    box.tint = 0xccff99;
    //box.beginFill(0xCCFF99);
  }


}


export default function setupCatExp(appCat) {
  //Create the cat sprite
   //cat = new Sprite(resources[catImg].texture);
  //   cat = new Sprite(
  //   resources[animalsJs].textures["tiger.png"]
  // );

    //Create the box
    box = new PIXI.Graphics();
    box.beginFill(0xCCFF99);
   // box.drawRect(0, 0, 64, 64);
    box.drawCircle(50, 50, 50);
    box.endFill();
    box.x = 120;
    box.y = 96;
    appCat.stage.addChild(box);

    //Create the text sprite
    let style = new TextStyle({
      fontFamily: "sans-serif",
      fontSize: 18,
      fill: "white",
    });

    message = new Text("No collision...", style);
    message.position.set(8, 8);
    appCat.stage.addChild(message);

     idAn = PIXI.loader.resources[animalsJs].textures;
     cat = new Sprite(idAn["cat.png"]);
    cat.position.set(16, 16);

    //The hedgehog
    hedgehog = new Sprite(idAn["hedgehog.png"]);
    hedgehog.position.set(32, 32);

    //The tiger
    tiger = new Sprite(idAn["tiger.png"]);
    tiger.position.set(64, 64);

    animals = new Container();
    //animals.addChild(cat);
    animals.addChild(hedgehog);
    animals.addChild(tiger);
    animals.x = 15;

 // cat.position.set(16, 16);


  cat.x = 6;
  cat.y = 6;
  cat.vx = 0;
  cat.vy = 0;
  //cat.position.set(x, y)

  //   //Change the sprite's size
  // cat.width = 80;
  // cat.height = 120;

    // //rotation
    // cat.rotation = 0.3;
    // cat.anchor.set(0.5, 0.5)





  //Add the cat to the stage
    appCat.stage.addChild(cat);
  appCat.stage.addChild(animals);

    keyboaedSetting();

      //Set the game state
  state = play;

    //Start the game loop by adding the `gameLoop` function to
  //Pixi's `ticker` and providing it with a `delta` argument.
  appCat.ticker.add(delta => gameLoop(delta));
}

function keyboard(keyCode) {
  console.log(keyCode);
  let key = {};
  key.code = keyCode;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = event => {
    //console.log("downHandler");
    if (event.keyCode === key.code) {
      //console.log(key);
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    //console.log("upHandler");
    if (event.keyCode === key.code) {
     // console.log(key);
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
    event.preventDefault();
  };

  //Attach event listeners
  window.addEventListener(
    "keydown", key.downHandler.bind(key), false
  );
  window.addEventListener(
    "keyup", key.upHandler.bind(key), false
  );
  return key;
}

function keyboaedSetting(){
  //Capture the keyboard arrow keys
  let left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  //Left arrow key `press` method
  left.press = () => {
    //Change the cat's velocity when the key is pressed
    cat.vx = -5;
    cat.vy = 0;
  };

  //Left arrow key `release` method
  left.release = () => {
    //If the left arrow has been released, and the right arrow isn't down,
    //and the cat isn't moving vertically:
    //Stop the cat
    if (!right.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Up
  up.press = () => {
    console.log("cat gl pos - " + cat.parent.toGlobal(cat.position).x + " cat loc pos - "+ cat.position.x);
    //distance beetween
    console.log("distance - " +tiger.toLocal(cat.position, hedgehog).x)
    console.log("Up press");
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = () => {
     console.log("up release");
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Right
  right.press = () => {
    console.log("right press");
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = () => {
    console.log("up release");
    if (!left.isDown && cat.vy === 0) {
      cat.vx = 0;
    }
  };

  //Down
  down.press = () => {
    cat.vy = 5;
    cat.vx = 0;
  };
  down.release = () => {
    if (!up.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };
}


//The `hitTestRectangle` function
function hitTestRectangle(r1, r2) {
  //Define the variables we'll need to calculate
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  //hit will determine whether there's a collision
  hit = false;
  //Find the center points of each sprite
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;
  //Find the half-widths and half-heights of each sprite
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  //Calculate the distance vector between the sprites
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  //Figure out the combined half-widths and half-heights
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  //Check for a collision on the x axis
  if (Math.abs(vx) < combinedHalfWidths) {
    //A collision might be occuring. Check for a collision on the y axis
    if (Math.abs(vy) < combinedHalfHeights) {
      //There's definitely a collision happening
      hit = true;
    } else {
      //There's no collision on the y axis
      hit = false;
    }
  } else {
    //There's no collision on the x axis
    hit = false;
  }
  //`hit` will be either `true` or `false`
  return hit;
};





















// function gameLoop(delta){
//
//   //Update the cat's velocity
//   cat.vx = 1;
//   cat.vy = 1;
//
//   //Apply the velocity values to the cat's
//   //position to make it move
//   cat.x += cat.vx;
//   cat.y += cat.vy;
// }
//
//
//
//
//
// export default function setupCatExp(appCat) {
//   //Create the cat sprite
//    cat = new Sprite(resources[catImg].texture);
//   cat.x = 6;
//   cat.y = 6;
//   //cat.position.set(x, y)
//
//   //   //Change the sprite's size
//   // cat.width = 80;
//   // cat.height = 120;
//
//     //rotation
//     cat.rotation = 0.3;
//     cat.anchor.set(0.5, 0.5)
//
//   //Add the cat to the stage
//   appCat.stage.addChild(cat);
//
//     //Start the game loop by adding the `gameLoop` function to
//   //Pixi's `ticker` and providing it with a `delta` argument.
//   appCat.ticker.add(delta => gameLoop(delta));
// }





