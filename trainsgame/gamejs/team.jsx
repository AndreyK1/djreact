let Text = PIXI.Text,
    TextStyle = PIXI.TextStyle;


export function drawTeamSign(team){
      let comColor = "white"
      if(team == 1) {
          comColor = "red"
      }else if(team == 2){
          comColor = "blue"
      }

      let style1 = new TextStyle({
                fontFamily: "Futura",
                fontSize: 20,
                fontWeight: "bold",
                fill: comColor
      });
      let textComand = new Text(team, style1);
      return textComand;
}