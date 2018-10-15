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
class PlayGround:
    crosses = {}
    trains = {}


# перекресток и его координаты
class Cross:
    # номер перекрестка
    numOfCross = 0
    coord = {0,0}

    upCross = 0
    dwCross = 0
    leftCross = 0
    rightCross = 0

    upPath = 0
    dwPath = 0
    leftPath = 0
    rightPath = 0


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


