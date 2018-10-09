from django.db import models

# Create your models here.
from djangorest.models import singleton


@singleton
class SingletonDotObj:
    # text = models.CharField(max_length=200, default="")
    # doter = models.IntegerField(default=0)

    doter = 4
    text = ''

    def settext(self, text):
        self.text = text

    def increase(self):
        self.doter +=1


@singleton
class SingletonChannelObj:
    # Объект (тестовый) в который мы сами будем объединять каналы (не через редис)
    # text = models.CharField(max_length=200, default="")
    # doter = models.IntegerField(default=0)

    doter = 4
    text = ''
    channels = {}

    def settext(self, text):
        self.text = text

    def increase(self):
        self.doter +=1

    def addChannel(self, idn, channel):
        self.channels[idn] = channel