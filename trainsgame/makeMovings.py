import random

def makeFirstMovings(playGround):

    if (playGround.started):
        return;

    keysTrain = list(playGround.trains.keys())

    # рандомно перемещиваем
    random.shuffle(keysTrain)

    for trainName in keysTrain:
        print("r-"+trainName)
        # выбираем направление движения
        train = playGround.trains[trainName]
        train.chhoseDirection(playGround)




