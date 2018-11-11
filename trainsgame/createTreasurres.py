import random

from trainsgame.models import Tressure


def createTreasurres(playGround):
    pathes = playGround.pathes
    tressCount = len(pathes)

    numTress = 0
    numbOfPointsOnPath = int(round(pathes[1].lengtOfPx/playGround.moveSize))
    print("numbOfPointsOnPath - " + str(numbOfPointsOnPath))
    for pathNum in playGround.pathes:
        numTress +=1
        path = pathes[pathNum]
        tressure = Tressure()
        if (path.direction == "gor"):
            # self.coord["x"] += playGround.moveSize
            tressure.coord = {"x": int(path.coordBeg["x"]) + random.randint(2, numbOfPointsOnPath-3)*playGround.moveSize, "y": path.coordBeg["y"]}
            random.randint(1, 101)
        elif (path.direction == "ver"):
            tressure.coord = {"x": path.coordBeg["x"],
                              "y": int(path.coordBeg["y"]) + random.randint(2, numbOfPointsOnPath - 3)*playGround.moveSize}
        else:
            raise Exception('path.direction error!')

        playGround.treassures[numTress] = tressure
