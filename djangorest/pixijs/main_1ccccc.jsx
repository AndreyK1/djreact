//Aliases
let resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite


//Define any variables that are used in more than one function
let cat, state;

function gameLoop(delta){
  //Update the current game state:
  state(delta);
}

function play(delta) {

  //Move the cat 1 pixel to the right each frame
  cat.x += cat.vx;
  cat.y += cat.vy
}


export default function setupCatExp(appCat) {
  //Create the cat sprite
   cat = new Sprite(resources[catImg].texture);
  cat.x = 6;
  cat.y = 6;
  //cat.position.set(x, y)

  //   //Change the sprite's size
  // cat.width = 80;
  // cat.height = 120;

    //rotation
    cat.rotation = 0.3;
    cat.anchor.set(0.5, 0.5)
  appCat.stage.addChild(cat);

    keyboaedSetting();


  //Add the cat to the stage


      //Set the game state
  state = play;

    //Start the game loop by adding the `gameLoop` function to
  //Pixi's `ticker` and providing it with a `delta` argument.
  appCat.ticker.add(delta => gameLoop(delta));
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
    cat.vy = -5;
    cat.vx = 0;
  };
  up.release = () => {
    if (!down.isDown && cat.vx === 0) {
      cat.vy = 0;
    }
  };

  //Right
  right.press = () => {
    cat.vx = 5;
    cat.vy = 0;
  };
  right.release = () => {
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
    if (event.keyCode === key.code) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
    event.preventDefault();
  };

  //The `upHandler`
  key.upHandler = event => {
    if (event.keyCode === key.code) {
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





