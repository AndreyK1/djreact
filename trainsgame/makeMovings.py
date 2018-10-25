import random

from trainsgame.MovingMashine import MovingMashine
from trainsgame.models import PlayGround, Train, Cross, Path


def makeFirstMovings():
    playGround = PlayGround()

    if (playGround.started):
        return;

    keysTrain = list(playGround.trains.keys())

    # рандомно перемещиваем
    random.shuffle(keysTrain)

    for trainName in keysTrain:
        print("r-"+trainName)
        # train = playGround.trains[key]
        # Train()
        # Cross()
        # Path()
        # выбираем направление движения
        chhoseDirectionForTrain(trainName, playGround)


# выбираем свободное направление движения для тележки
def chhoseDirectionForTrain(trainName, playGround):
    train = playGround.trains[trainName]
    print("first move - " + train.nextMove)
    lastCross = playGround.crosses[train.lastCross]
    tryAtempts = 0
    while(train.nowMoving==0 and tryAtempts<6):
        tryAtempts = tryAtempts+1
        if(train.nextMove == "up"):
            nextPathNum = lastCross.upPath
            nextCrossNum = lastCross.upCross
        elif(train.nextMove == "down"):
            nextPathNum = lastCross.dwPath
            nextCrossNum = lastCross.dwCross
        elif(train.nextMove == "left"):
            nextPathNum = lastCross.leftPath
            nextCrossNum = lastCross.leftCross
        else:
            nextPathNum = lastCross.rightPath
            nextCrossNum = lastCross.rightCross



        print("nextPathNum - "+str(nextPathNum))

        nextPath = Path()
        if(nextPathNum == 0):
            nextPath.existTrainId = "no"
        else:
            nextPath = playGround.pathes[nextPathNum]


        if(nextPath.existTrainId == 0):
            nextPath.existTrainId = trainName
            train.nowMoving = train.nextMove
            train.pathNum = nextPath.numOfPath
            nextCross = lastCross.setNextCrossToTrain(train, nextCrossNum)
        else:
            train.nextMove = MovingMashine().nextMove(train.nextMove)
            print("next move - " + train.nextMove)



