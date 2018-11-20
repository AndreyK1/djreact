import math
import random

from trainsgame.createDepo import createDepo
from trainsgame.createTreasurres import createTreasurres
from trainsgame.enums.TeamEnum import Teams
from trainsgame.models import PlayGround, Cross, Path, Train, PlayGroundList


def createPlayGr(playGround):
    # playGroundList = PlayGroundList()
    #
    # playGround = playGroundList.get(1)

    # playGround = PlayGround()
    if(playGround.initialised):
        print("------playGround already initialised-------!!!!!")
        return;

    # crosses = []
    # размеры сетки игровой
    h=3
    w=3
    # длина пути Path между перекрестками (горризонтальная и вертикальная)
    # lenghtGor = 160
    # lenghtVer = 100

    crossesNum = [[0] * w for i in range(h)]

    num = 0
    numPass = 0

    # lastCrossX = 0; lastCrossY = 0; #координаты последенего отмеченного в путях перекрестка
    # offSetX = 20;     offSetY = 10; #первоначальные оординаты отступа путей на площадке
    for i in range(h):
        # для координат путей
        playGround.lastCross["x"] = playGround.offSet["x"]
        for j in range(w):



            num = num+1
            playGround.numOfCross = num
            print(" i = " + str(i) + " j = " + str(j))
            node = Cross()
            # node.coord = {i,j}


            # для координат путей
            if (j == 0):
                playGround.lastCross["y"] += playGround.lenghtVer
            else:
                playGround.lastCross["x"] += playGround.lenghtGor

            if (i == 0 and j == 0):
                playGround.lastCross["y"] = playGround.offSet["y"]

            node.coord = {"x": playGround.lastCross["x"], "y": playGround.lastCross["y"]}


            # горизонтальное отклонение вправо
            if (j == 0):
                # nothing
                print("nothing")
            else:
                # добавление перекрестков
                node.leftCross = crossesNum[i][j-1]
                crossBefore = playGround.crosses[crossesNum[i][j-1]]
                crossBefore.rightCross = num

                # создание пути
                numPass = createPath(playGround, playGround.lenghtGor, 0, numPass, num, crossesNum[i][j-1])

                node.leftPath = numPass
                crossBefore.rightPath = numPass



            # вертикальное отклонение вверх
            if(i == 0):
                # nothing
                print("nothing")
            else:
                # добавление перекрестков
                node.upCross = crossesNum[i-1][j]
                crossBefore = playGround.crosses[crossesNum[i - 1][j]]
                crossBefore.dwCross = num

                # создание пути
                numPass = createPath(playGround, 0, playGround.lenghtVer, numPass, num, crossesNum[i - 1][j])

                node.upPath = numPass
                crossBefore.dwPath = numPass






            crossesNum[i][j]=num
            node.numOfCross = num
            playGround.crosses[num]=node


    playGround.croscrossesNum = crossesNum

    createTrains(playGround)

    fillPathes(playGround)

    createTreasurres(playGround)

    createDepo(playGround)

    playGround.initialised=True


def createPath(playGround, moveX, moveY, numP, numberOfCross, numberOfCrossBefore):
    # создание пути
    path = Path()
    if(moveX !=0):
        path.lengtOfPx = moveX
        path.direction = "gor"
    elif(moveY !=0):
        path.lengtOfPx = moveY
        path.direction = "ver"
    else:
        return

    numPass = numP + 1
    path.numOfPath = numPass

    path.cross1 = numberOfCrossBefore
    path.cross2 = numberOfCross

    # path.createCoord(playGround, moveX, moveY, numberOfCross, numberOfCrossBefore)

    playGround.pathes[numPass] = path
    return numPass;

# заполняем пути координатами
def fillPathes(playGround):
    for path in playGround.pathes:
        playGround.pathes[path].fillCoord(playGround.crosses)



# создание тележек и добавление их на перекрестки
def createTrains(playGround):

    # расставляем на перектестках
    for train in playGround.trains:
        while randomAddTrainToCross(playGround, train) == False:
            print("try add train to cross "+ train)

    # присваиваем к разным командам
    keysTrain = list(playGround.trains.keys())
    # рандомно перемещиваем
    random.shuffle(keysTrain)
    halfSize = math.ceil(len(keysTrain)/2)
    print("--------halfSize-----" + str(halfSize))
    k = 0
    for trainName in keysTrain:
        # print("r-"+trainName)
        train = playGround.trains[trainName]
        k +=1
        if(k > halfSize):
            train.command = Teams.TWO.value
        else:
            train.command = Teams.ONE.value


# рааставляем тележки на преркрестках(рандомно, только впервые), и выставляем nextMove
def randomAddTrainToCross(playGround, trainName):
    print("train - "+ trainName)
    # moving = {1:"up",2:"down",3:"left",4:"right"}
    moving = ["up", "down","left","right"]
    randCrossKey = random.choice(list(playGround.crosses.keys()))
    if(playGround.crosses[randCrossKey].train == 0):
        playGround.crosses[randCrossKey].train = trainName

        train = Train()
        train.number = trainName
        playGround.trains[trainName] = train
        train.lastCross = randCrossKey

        nextMove = random.choice(moving);
        train.nextMove = nextMove

        train.coord = {"x":playGround.crosses[randCrossKey].coord["x"], "y": playGround.crosses[randCrossKey].coord["y"]}

        return True
    else:
        return False


# заполняем положения тележек
def fillTrainsPositions(playGround):
    for train in playGround.trains:
        print("train --- "+train)
        playGround.trains[train].makeMove(playGround)

def changeTrainDirection(playGround, whereMove, name):
    for train in playGround.trains:
        if(train==name):
            print("train changeTrainDirection --- "+train)
            playGround.trains[train].nextMove = whereMove


