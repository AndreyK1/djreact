from django.db import models

# Create your models here.
from djangorest.models import singleton
from trainsgame.MovingMashine import MovingMashine


@singleton
class SingleChannelObjTrains:
    # Объект (тестовый) в который мы сами будем объединять каналы (не через редис)
    # text = models.CharField(max_length=200, default="")
    # doter = models.IntegerField(default=0)

    channels = {}

    def addChannel(self, idn, channel):
        self.channels[idn] = channel


@singleton
class Foo():

    x = 0
    y = 0
    crosses = []
    initialised = True

    def __init__(self):
        self.x = 1
        self.y = 2
        self.crosses = [7,8,9]
        self.initialised = False


@singleton
class PlayGround():

    def __init__(self):
        self.trains = {}
        # self.crosses = {"1":77,"2":88,"3":99}
        self.crosses = {}
        self.pathes = {}
        self.initialised = False
        self.croscrossesNum = []
        self.modeOfGame = "stop"
        self.started = False

        self.lastCross = {"x":0, "y":0} #координаты последенего отмеченного в путях перекрестка
        self.offSet = {"x":10, "y":10}  #первоначальные оординаты отступа путей на площадке

# перекресток и его координаты
class Cross:

    def __init__(self):
        # номер перекрестка
        self.numOfCross = 0
        self.coord = {"x":0, "y":0}

        self.upCross = 0
        self.dwCross = 0  # type: int
        self.leftCross = 0
        self.rightCross = 0

        self.upPath = 0
        self.dwPath = 0
        self.leftPath = 0
        self.rightPath = 0

        self.isbeasy = False
        self.train = 0

    def setNextCrossToTrain(self, train, nextCrossNum):
        train.nextCross = nextCrossNum


# поезд и его движение
class Train:
    def __init__(self):
        self.nextCross = 0
        self.lastCross = 0
        # вверхб низб левоб право
        self.nextMove = 0
        self.nowMoving = 0
        # путь по которому движется
        # self.movingPath = 0
        self.pathNum = 0
        self.coord = {"x":0, "y":0}
        self.number = 0

    def makeMove(self, playGround):
        print("makeMove train "+ self.number)
        print( "self.coord " +str(self.coord["x"])+ " --- "+ str(self.coord["y"]))
        path = playGround.pathes[self.pathNum]
        # pathDiffX = path.coordBeg["x"] - self.coord["x"]
        # if(pathDiffX==0):
        #     pathDiffX = path.coordEnd["x"] - self.coord["x"]
        #
        # pathDiffY = path.coordBeg["y"] - self.coord["y"]
        # if(pathDiffY==0):
        #     pathDiffY = path.coordEnd["y"] - self.coord["y"]

        moveSize = 5

        # if(path.direction == "gor"):
        #     if(path.coordEnd["x"] > path.coordBeg["x"]):
        #         self.coord["x"] += moveSize
        #     else:
        #         self.coord["x"] -= moveSize
        #
        # if(path.direction == "ver"):
        #     if(path.coordEnd["y"] > path.coordBeg["y"]):
        #         self.coord["y"] += moveSize
        #     else:
        #         self.coord["y"] -= moveSize

        if(path.direction == "gor"):
            if(self.nextMove == "right"):
                self.coord["x"] += moveSize
            elif(self.nextMove == "left"):
                self.coord["x"] -= moveSize
            else:
                raise Exception('path.direction error!')

        elif(path.direction == "ver"):
            if(self.nextMove == "down"):
                self.coord["y"] += moveSize
            elif(self.nextMove == "up"):
                self.coord["y"] -= moveSize
            else:
                raise Exception('path.direction error!')
        else:
            raise Exception('path.direction error!')


        # print("pathDiffX " + str(pathDiffX) + " --pathDiffY - " + str(pathDiffY))


        path.whereNowTrain += moveSize

        # if(pathDiffX != 0):
        #     if(pathDiffX < 0):
        #         self.coord["x"] -= moveSize
        #     else:
        #         self.coord["x"] += moveSize
        # elif(pathDiffY != 0):
        #     if (pathDiffY < 0):
        #         self.coord["y"] -= moveSize
        #     else:
        #         self.coord["y"] += moveSize

        print("self.coord " + str(self.coord["x"]) + " --- " + str(self.coord["y"]))
        print("path.whereNowTrain " + str(path.whereNowTrain))
        print("------------------------------------------")

        if(path.whereNowTrain >= path.lengtOfPx):
            print("clear whereNowTrain" +str(path.whereNowTrain))
            path.whereNowTrain = 0
            path.existTrainId = 0
            self.chhoseDirection(playGround)



    # выбираем свободное направление движения для тележки
    def chhoseDirection(self, playGround):
        print("chhoseDirection - " + str(self.number))
        # train = playGround.trains[trainName]
        # print("first move - " + self.nextMove)
        lastCross = playGround.crosses[self.lastCross]
        tryAtempts = 0
        while(self.nowMoving==0 and tryAtempts<6):
            tryAtempts = tryAtempts+1
            if(self.nextMove == "up"):
                nextPathNum = lastCross.upPath
                nextCrossNum = lastCross.upCross
            elif(self.nextMove == "down"):
                nextPathNum = lastCross.dwPath
                nextCrossNum = lastCross.dwCross
            elif(self.nextMove == "left"):
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
                nextPath.existTrainId = self.number
                self.nowMoving = self.nextMove
                self.pathNum = nextPath.numOfPath
                nextCross = lastCross.setNextCrossToTrain(self, nextCrossNum)
            else:
                self.nextMove = MovingMashine().nextMove(self.nextMove)
                print("next move - " + self.nextMove)






# путь
class Path:
    def __init__(self):
        # номер перекрестка
        self.existTrainId = 0
        self.lengtOfPx = 0
        self.whereNowTrain = 0

        # направление
        self.direction = 0

        self.numOfPath = 0

        self.type = 0
        self.coordBeg = {"x":0, "y":0}
        self.coordEnd = {"x": 0, "y":0}

        self.cross1 = 0;
        self.cross2 = 0;


    def fillCoord(self, crosses):
        self.coordBeg = {"x": crosses[self.cross1].coord["x"], "y": crosses[self.cross1].coord["y"]}
        self.coordEnd = {"x": crosses[self.cross2].coord["x"], "y": crosses[self.cross2].coord["y"]}



