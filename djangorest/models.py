from django.db import models

# Create your models here.
class SingletonDot:
    __single = {"dot": 1 }
    def __new__(self):
        if SingletonDot.__single:
            return SingletonDot.__single
        SingletonDot.__single = {"dot": 2 }

def singleton(cls):
    instances = {}
    def getinstance():
        if cls not in instances:
            instances[cls] = cls()
        return instances[cls]
    return getinstance

@singleton
class SingletonDot2:
    doter = 4

    def increase(self):
        self.doter = self.doter +1
