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