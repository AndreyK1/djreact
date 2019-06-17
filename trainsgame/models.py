import random

import json

from django.conf import settings
from django.http import JsonResponse

# from trainsgame.createPlayGround import randomAddTrainToCross
from django.utils import timezone

from trainsgame.enums.ColorEnum import Colors

from django.db import models

# Create your models here.
from djangorest.models import singleton
from trainsgame.MovingMashine import MovingMashine


# python manage.py makemigrations trainsgame
# python manage.py migrate trainsgame

class Account(models.Model):

    # title = models.CharField(max_length=200)
    # owner = models.ForeignKey(User)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_date = models.DateTimeField(default=timezone.now)
    count = models.IntegerField(default=0)
    # text = models.TextField()
    real = models.BooleanField(default=False)
    isnew = models.BooleanField(default=True)

    def __str__(self):
        return str(self.count)




# test TODO dell
@singleton
class SingletonRtcGroups:
    rtcGroups = {}
    server = 0

    # def increase(self):
    #     self.doter = self.doter +1
    def addRtcToGroup(self, peer_group, peer_id, role):
        if peer_group not in self.rtcGroups.keys():
            self.rtcGroups[peer_group] = {}
            self.rtcGroups[peer_group]["clients"] = []
            self.rtcGroups[peer_group]["server"] = 0

        if(role == "server"):
            self.rtcGroups[peer_group]["server"] = peer_id

        if peer_id not in self.rtcGroups[peer_group]["clients"]:
            self.rtcGroups[peer_group]["clients"].append(peer_id)


    def returbJsonOfMe(self):
        return JsonResponse({"addedToRtc": self.rtcGroups})






@singleton
class SingleChannelObjTrains:
    # Объект (тестовый) в который мы сами будем объединять каналы (не через редис)
    # text = models.CharField(max_length=200, default="")
    # doter = models.IntegerField(default=0)

    channels = {}

    def addChannel(self, idn, channel):
        self.channels[idn] = channel

@singleton
class SingleChannelToArena:
    # Объект (тестовый) в который мы сами будем объединять каналы (не через редис)
    # text = models.CharField(max_length=200, default="")
    # doter = models.IntegerField(default=0)

    channelsAr = {}
    userNameChannel = {}
    arenasCh = {}


    def addChannelToArena(self, arena, channel, userName = None):
        print("addChannelToArena :   arena:" + arena + " channel:" + str(channel))
        self.channelsAr[channel.channel_name] = arena
        self.userNameChannel[userName] = channel.channel_name
        if arena not in self.arenasCh.keys():
            self.arenasCh[arena] = {}

        if channel.channel_name not in self.arenasCh[arena].keys():
            # channelInfo = {}
            # channelInfo[channel.channel_name] = channel
            self.arenasCh[arena][channel.channel_name] = channel

        self.printSerialized()


    def remChannelToArena(self, channel_name, user):
        if channel_name in self.channelsAr.keys():
            self.remChannelToArena1(self.channelsAr[channel_name], channel_name, user)

    def remChannelToArena1(self, arena, channel, user):
        print("remChannelToArena :   arena:" + arena + " channel:"+ channel)
        if channel in self.channelsAr:
            del self.channelsAr[channel]

        if self.arenasCh[arena] is None:
            self.arenasCh[arena] = {}

        # self.arenasCh[arena].remove(channel)
        if channel in self.arenasCh[arena]:
            del self.arenasCh[arena][channel]

        # del self.channelsAr[channel]

        if str(user) in self.userNameChannel:
            del self.userNameChannel[str(user)]


        self.printSerialized()

    def getArenaByChannel(self, channel):
        if channel in self.channelsAr.keys():
            arena = self.channelsAr[channel]
            return arena

        return None

    def changeArenaToChannel(self, oldChannel, newChannel):
        if oldChannel in self.channelsAr.keys():
            arena = self.channelsAr[oldChannel]
            del self.channelsAr[oldChannel]
            self.channelsAr[newChannel] = arena


    def getCntInArena(self, arena):
        if str(arena) not in self.arenasCh:
            return 0
        else:
            return len(self.arenasCh[str(arena)])


    def printSerialized(self):
        pass
        # serialized_obj = json.dumps(self.arenasCh, default=lambda x: x.__dict__)
        # print("serialized_obj SingleChannelToArena " + serialized_obj)

    def checkUserConnectionToAreasAndRestore(self, user, channel, arena):
        print("arena from sessions - " + str(arena))

        if user.is_authenticated == False:
            return 0

        # if user not in self.userNameChannel:
        #     return 0

        if int(arena) not in PlayGroundList().PlayGrounds.keys():
            return 0

        playGround = PlayGroundList().get(int(arena))
        if str(user) not in playGround.trains.keys():
            return 0

        print("returning arena to restore " + str(arena))

        # oldChannel = self.userNameChannel[user]
        # arena = self.getArenaByChannel(oldChannel)
        self.userNameChannel[user] = channel.channel_name
        # self.channelsAr[channel]
        # self.changeArenaToChannel(oldChannel, channel)
        self.addChannelToArena(str(arena), channel, user)
        return arena






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

        # найденные маршруты во всех итерациях
        self.allRoutes = []
        # найденные пути во всех итерациях (чтоб повторно не использоваьт)
        self.allPathesUsed = []


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

    def set(self, num, playGround):
        self.PlayGrounds[num] = playGround

    def delete(self, playGround):
        self.deleteByArena(playGround.arena)

    def deleteByArena(self, arenaNum):
        del self.PlayGrounds[arenaNum]
        print("Удалена Арена под номером " + str(arenaNum))



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
        self.exclude = 0 #исключить из путей

        self.lastPathTry = ""

    def setNextCrossToTrain(self, train, nextCrossNum):
        train.nextCross = nextCrossNum

    def checkDoesCrossHavePath(self):
        if (self.upPath == 0 and self.dwPath == 0 and self.leftPath == 0 and self.rightPath == 0):
            return False
        else:
            return True

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
        # print("makeMove train "+ str(self.number)+ " self.pathNum "+ str(self.pathNum))
        # serialized_obj = json.dumps(playGround, default=lambda x: x.__dict__)
        # print("serialized_obj " +serialized_obj)
        print( "self.coord " +str(self.coord["x"])+ " --- "+ str(self.coord["y"]))
        path = playGround.pathes[self.pathNum]

        if(path.direction == "gor"):
            if(self.nowMoving == "right"):
                self.coord["x"] += playGround.moveSize
            elif(self.nowMoving == "left"):
                self.coord["x"] -= playGround.moveSize
            else:
                raise Exception('path.direction error!' + str(self.nowMoving))

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
        # print("path.whereNowTrain " + str(path.whereNowTrain))
        # print("------------------------------------------")

        # проверяем на контакт с деньгами
        self.checkContactWithTressure(playGround)
        # проверяем на контакт с депо
        self.checkContactWithDepo(playGround)

        if(path.whereNowTrain >= path.lengtOfPx):
            # print("clear whereNowTrain" +str(path.whereNowTrain))
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
        maxAtemps = 10
        while(self.nowMoving==0 and tryAtempts<=10):
            if(tryAtempts == maxAtemps): #если выяснится, что при первоначальном запуске двигаться некуда
                self.randomAddTrainToCross(playGround, self.number)
                print("-tryAtempts randomAddTrainToCross- " + str(tryAtempts))
                tryAtempts = 0
                # self = playGround.trains[self.number]
            # randomAddTrainToCross(playGround, trainName, train = 0)
            # print("tryAtempts "+str(tryAtempts) + " self.nextMove "+str(self.nextMove))
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
            if(nextPath.existTrainId == 0 and nextPath.numOfPath != 0):
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

            if(tressures[tressK].color != self.color):
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

    # при создании пытаемся добавить себя на перекресток
    # рааставляем тележки на преркрестках(рандомно, только впервые), и выставляем nextMove
    def randomAddTrainToCross(self, playGround, trainName):
        # def randomAddTrainToCross(playGround, trainName, train=0):
        NotFoundCrossYet = True
        MaxTries = 100
        trys = 0
        while(NotFoundCrossYet):
            trys +=1
            if(trys > MaxTries ):
                raise Exception('To many tries randomAddTrainToCross!!!')
            # moving = {1:"up",2:"down",3:"left",4:"right"}
            moving = ["up", "down", "left", "right"]
            randCrossKey = random.choice(list(playGround.crosses.keys()))
            print("train - " + trainName+ " randCrossKey-"+str(randCrossKey))
            cross = playGround.crosses[randCrossKey]
            print("cross.train - " + str(cross.train) + " cross.exclude-" + str(cross.exclude)
                  + " cross.checkDoesCrossHavePath()-" + str(cross.checkDoesCrossHavePath()))
            if (cross.train == 0 and cross.exclude != 1):
                if cross.checkDoesCrossHavePath() == False:
                    continue
                playGround.crosses[randCrossKey].train = trainName

                # train = Train()
                self.number = trainName
                playGround.trains[trainName] = self
                self.lastCross = randCrossKey

                nextMove = random.choice(moving);
                self.nextMove = nextMove

                self.coord = {"x": playGround.crosses[randCrossKey].coord["x"],
                               "y": playGround.crosses[randCrossKey].coord["y"]}

                NotFoundCrossYet = False
            # else:
            #     NotFoundCrossYet = True




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