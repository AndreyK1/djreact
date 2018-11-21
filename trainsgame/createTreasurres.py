import random

from trainsgame.models import Tressure


def createTreasurres(playGround):
    pathes = playGround.pathes
    tressCount = len(pathes)

    numTress = 0
    numCol = 0
    numbOfPointsOnPathGor = int(round(playGround.lenghtGor/playGround.moveSize))
    numbOfPointsOnPathVer= int(round(playGround.lenghtVer / playGround.moveSize))
    print("numbOfPointsOnPath - " + str(numbOfPointsOnPathGor))
    for counter, pathNum in enumerate(playGround.pathes):
        numTress +=1


        path = pathes[pathNum]
        tressure = Tressure()

        if(numCol >= len(playGround.colors)):
            numCol=0

        tressure.color =  playGround.colors[numCol]
        numCol+=1


        tressure.putSelfOnPath(path, playGround, numbOfPointsOnPathGor, numbOfPointsOnPathVer, numTress)

        # if (path.direction == "gor"):
        #     # self.coord["x"] += playGround.moveSize
        #     tressure.coord = {"x": int(path.coordBeg["x"]) + random.randint(2, numbOfPointsOnPathGor-3)*playGround.moveSize, "y": path.coordBeg["y"]}
        #     random.randint(1, 101)
        # elif (path.direction == "ver"):
        #     tressure.coord = {"x": path.coordBeg["x"],
        #                       "y": int(path.coordBeg["y"]) + random.randint(2, numbOfPointsOnPathVer - 3)*playGround.moveSize}
        # else:
        #     raise Exception('path.direction error!')
        #
        # playGround.treassures[numTress] = tressure
