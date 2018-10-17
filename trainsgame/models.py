from django.db import models

# Create your models here.
from djangorest.models import singleton


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

    # initialised = False
    # crosses = []
    # trains = []
    def __init__(self):
        self.trains = []
        self.crosses = [77,88,99]
        self.initialised = False


# перекресток и его координаты
class Cross:
    # номер перекрестка
    numOfCross = 0
    # coord = {0,0}

    upCross = 0
    dwCross = 0  # type: int
    leftCross = 0
    rightCross = 0

    upPath = 0
    dwPath = 0
    leftPath = 0
    rightPath = 0

    def __init__(self):
        self.numOfCross = 0
        # self.coord = {0,0}

        self.upCross = 0
        self.dwCross = 0  # type: int
        self.leftCross = 0
        self.rightCross = 0

        self.upPath = 0
        self.dwPath = 0
        self.leftPath = 0
        self.rightPath = 0



# поезд и его движение
class Train:
    nextCross = 0
    lastCross = 0
    # вверхб низб левоб право
    nextMove = 0
    nowMoving = 0
    # путь по которому движется
    movingPath = 0


# путь
class Path:
    existTrainId = 0
    lengtOfPx = 0
    whereNowTrain = 0


