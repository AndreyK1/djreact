import random

from trainsgame.models import PlayGround, Cross, Path, Train


def createPlayGr():
    playGround = PlayGround()
    if(playGround.initialised):
        print("------playGround already initialised-------!!!!!")
        return;

    # crosses = []
    # размеры сетки игровой
    h=3
    w=3
    # длина пути Path между перекрестками (горризонтальная и вертикальная)
    lenghtGor = 150
    lenghtVer = 100

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
                playGround.lastCross["y"] += lenghtVer

            if (i == 0 and j == 0):
                playGround.lastCross["y"] = playGround.offSet["y"]


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
                numPass = createPath(playGround, lenghtGor, 0, numPass)

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
                numPass = createPath(playGround, 0, lenghtVer, numPass)

                node.upPath = numPass
                crossBefore.dwPath = numPass






            crossesNum[i][j]=num
            node.numOfCross = num
            playGround.crosses[num]=node

    playGround.croscrossesNum = crossesNum

    createTrains(playGround)

    playGround.initialised=True


def createPath(playGround, moveX, moveY, numP):
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

    path.createCoord(playGround, moveX, moveY)

    playGround.pathes[numPass] = path
    return numPass;

# создание тележек и добавление их на перекрестки
def createTrains(playGround):
    for train in playGround.trains:
        while randomAddTrainToCross(playGround, train) == False:
            print("try add train to cross "+ train)



def randomAddTrainToCross(playGround, trainName):
    print("train - "+ trainName)
    # moving = {1:"up",2:"down",3:"left",4:"right"}
    moving = ["up", "down","left","right"]
    randCrossKey = random.choice(list(playGround.crosses.keys()))
    if(playGround.crosses[randCrossKey].train == 0):
        playGround.crosses[randCrossKey].train = trainName

        train = Train()
        playGround.trains[trainName] = train
        train.lastCross = randCrossKey

        nextMove = random.choice(moving);
        train.nextMove = nextMove

        return True
    else:
        return False



