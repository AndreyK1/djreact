import random
from trainsgame.enums.ColorEnum import Colors

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


# @singleton
class PlayGround():

    def __init__(self):
        self.arena = 0
        self.trains = {}
        # self.crosses = {"1":77,"2":88,"3":99}
        self.crosses = {}
        self.pathes = {}
        self.treassures = {}
        self.depos = {}
        self.initialised = False
        self.croscrossesNum = []
        self.modeOfGame = "stop"
        self.started = False
        self.sleepSec = 0  #секунд между перемещ тележки
        self.moveSize = 0 #перемещ тележки
        # длина пути Path между перекрестками (горризонтальная и вертикальная)
        self.lenghtGor = 0 #длина гориз путей
        self.lenghtVer = 0 #длина вертик путей
        self.listOfcolors = []


        self.lastCross = {"x":0, "y":0} #координаты последенего отмеченного в путях перекрестка
        self.offSet = {"x":10, "y":10}  #первоначальные оординаты отступа путей на площадке


@singleton
class PlayGroundList():

    def __init__(self):
        self.PlayGrounds = {}

    def get(self, num):
        # if self.PlayGrounds[num]:
        if num in self.PlayGrounds:
            return self.PlayGrounds[num]
        else:
            playGround = PlayGround()
            playGround.arena = num
            self.PlayGrounds[num] = playGround
            return self.PlayGrounds[num]



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
        self.moveByChoise = 0 #сменили путь туда куда выбрали, или пришлось
        self.pickedTress = 0
        self.command = 0
        self.color = 0

    def makeMove(self, playGround):
        self.moveByChoise = 0
        print("makeMove train "+ self.number)
        print( "self.coord " +str(self.coord["x"])+ " --- "+ str(self.coord["y"]))
        path = playGround.pathes[self.pathNum]

        if(path.direction == "gor"):
            if(self.nowMoving == "right"):
                self.coord["x"] += playGround.moveSize
            elif(self.nowMoving == "left"):
                self.coord["x"] -= playGround.moveSize
            else:
                raise Exception('path.direction error!' + self.nowMoving)

        elif(path.direction == "ver"):
            if(self.nowMoving == "down"):
                self.coord["y"] += playGround.moveSize
            elif(self.nowMoving == "up"):
                self.coord["y"] -= playGround.moveSize
            else:
                raise Exception('path.direction error!' + self.nowMoving)
        else:
            raise Exception('path.direction error!')

        path.whereNowTrain += playGround.moveSize


        print("self.coord " + str(self.coord["x"]) + " --- " + str(self.coord["y"]))
        print("path.whereNowTrain " + str(path.whereNowTrain))
        print("------------------------------------------")

        # проверяем на контакт с деньгами
        self.checkContactWithTressure(playGround)
        # проверяем на контакт с депо
        self.checkContactWithDepo(playGround)

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

        # выбираем перекресток, если запуск то это нынешний, если нет то новый
        changeCross = 0
        if(self.nextCross!=0):
            changeCross = playGround.crosses[self.nextCross]
        else:
            changeCross = playGround.crosses[self.lastCross]
        tryAtempts = 0
        # сбрасываем
        self.nowMoving = 0
        while(self.nowMoving==0 and tryAtempts<6):
            print("tryAtempts "+str(tryAtempts) + " self.nextMove "+str(self.nextMove))
            tryAtempts = tryAtempts+1
            nextPathNum = 0
            nextCrossNum = 0
            if(self.nextMove == "up"):
                nextPathNum = changeCross.upPath
                nextCrossNum = changeCross.upCross
            elif(self.nextMove == "down"):
                nextPathNum = changeCross.dwPath
                nextCrossNum = changeCross.dwCross
            elif(self.nextMove == "left"):
                nextPathNum = changeCross.leftPath
                nextCrossNum = changeCross.leftCross
            else:
                nextPathNum = changeCross.rightPath
                nextCrossNum = changeCross.rightCross


            print("nextPathNum - "+str(nextPathNum))

            nextPath = Path()
            if(nextPathNum == 0):
                nextPath.existTrainId = "no"
            else:
                nextPath = playGround.pathes[nextPathNum]

            print("nextPath.existTrainId - " + str(nextPath.existTrainId))
            if(nextPath.existTrainId == 0):
                nextPath.existTrainId = self.number
                self.nowMoving = self.nextMove
                self.pathNum = nextPath.numOfPath
                self.nextCross = nextCrossNum
                if(tryAtempts ==1):
                    self.moveByChoise = True
                else:
                    self.moveByChoise = False

                if(self.nextCross==0):
                    print("--self.nextCross==0--")
                    # nextcross = lastCross.setNextCrossToTrain(self, nextCrossNum)
                    # self.nextCross = changeCross.numOfCross
                else:
                    self.lastCross = changeCross.numOfCross
                    # ищем новый перекресток для self.nextCross = changeCross.numOfCross


                # self.nextCross = nextCross.setNextCrossToTrain(self, nextCrossNum)


            else:
                self.nextMove = MovingMashine().nextMove(self.nextMove)
                print("next move - " + self.nextMove)

    # проверяем на контакт с деньгами
    def checkContactWithTressure(self, playGround):
        if(self.pickedTress != 0):
            return   #сейчас можно брать только одно сокровище

        tressures = playGround.treassures

        for tressK in tressures:
            if(tressures[tressK].collected != 0 or tressures[tressK].picked != 0):
                continue

            if(self.coord["x"] == tressures[tressK].coord["x"] and self.coord["y"] == tressures[tressK].coord["y"]):
                tressures[tressK].picked = self.number
                self.pickedTress = tressK

    # проверяем на контакт с депо
    def checkContactWithDepo(self, playGround):
        if(self.pickedTress == 0):
            return

        depos = playGround.depos
        for depoK in depos:
            if(self.coord["x"] == depos[depoK].coord["x"] and self.coord["y"] == depos[depoK].coord["y"]):
                #  проверить принадлежность команде депо
                if(self.command == depos[depoK].team):
                    print("----------------append to depo ------------------"+ str(depoK) + " --- " +str(self.pickedTress))
                    depos[depoK].tressures.append(self.pickedTress)
                    playGround.treassures[self.pickedTress].collected = 1
                    # playGround.treassures[self.pickedTress].picked = 0
                    depos[depoK].sum += int(playGround.treassures[self.pickedTress].sum)
                    self.pickedTress = 0



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



# бабло
class Tressure:
    def __init__(self):
        # номер перекрестка
        self.color = 0
        self.sum = 0
        self.picked = 0
        self.collected = 0
        self.coord  = {"x":0, "y":0}

    def putSelfOnPath(self, path, playGround, numbOfPointsOnPathGor, numbOfPointsOnPathVer, numTress):
        self.sum = random.randint(1, 30)

        if (path.direction == "gor"):
            # self.coord["x"] += playGround.moveSize
            self.coord = {"x": int(path.coordBeg["x"]) + random.randint(2, numbOfPointsOnPathGor-3)*playGround.moveSize, "y": path.coordBeg["y"]}
            # random.randint(1, 101)
        elif (path.direction == "ver"):
            self.coord = {"x": path.coordBeg["x"],
                              "y": int(path.coordBeg["y"]) + random.randint(2, numbOfPointsOnPathVer - 3)*playGround.moveSize}
        else:
            raise Exception('path.direction error!')

        playGround.treassures[numTress] = self



# депо куда сокровища тащить
class Depo:
    def __init__(self):
        # номер перекрестка
        self.team = 0
        self.coord  = {"x":0, "y":0}
        self.cross = 0
        self.sum = 0
        self.tressures = []