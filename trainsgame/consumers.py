import asyncio
import json
import time

import django
from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer, JsonWebsocketConsumer
from channels.layers import get_channel_layer

# первичный коннект, и обработка каждого коннекта из канала
# from django.core import serializers

from trainsgame.createPlayGround import createPlayGr, fillTrainsPositions, fillPathes, changeTrainDirection
from trainsgame.makeMovings import makeFirstMovings
from trainsgame.models import PlayGround, Foo, Cross, Train, PlayGroundList


class FirstConnectConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self,text_data=None):
        await self.accept()
        # await self.channel_layer.group_add("trains", self.channel_name)
        # print("----------------------Added " +self.channel_name+" channel to trains")


    async def receive(self,text_data=None):
        text_data = text_data.replace("\"", "")
        await self.channel_layer.group_add(str(text_data), self.channel_name)
        print("----------------------Added " +self.channel_name+" channel to trains")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("trains", self.channel_name)
        print("--------------------------Removed "+self.channel_name+" channel to trains")

    # обработка каждого коннекта из канала
    async def user_trains(self, event):
        await self.send_json(event)
        print("+++++++++++++++++++++++++++Got message 1111 " +event["text"]["bi"] + event["text"]["ku"]+ " at " + self.channel_name)


# надо сделать шедулер, который будет каждую секунду отправлять в канал расположение объектов
class StartGameConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()
        # createPlayGr()


    def receive(self, text_data=None, bytes_data=None, **kwargs):

            text_data = text_data.replace("\"", "")

            playGround = PlayGroundList().get(int(text_data))
            playGround.sleepSec = 1
            playGround.moveSize = 20
            playGround.lenghtGor = 8*playGround.moveSize
            playGround.lenghtVer = 5 * playGround.moveSize

            createPlayGr(playGround)

            # playGroundList = PlayGroundList()
            #
            # playGround = playGroundList.get(1)


            # playGround = PlayGround()


            # text_data = "play"


            print("-text_data-"+text_data)

            if(playGround.started):
                return ;
            else:
                makeFirstMovings(playGround)
                playGround.started = True

            channel_layer = get_channel_layer()
            i = 0;
            # while i < 10:
            print("-playGround.modeOfGame-" + playGround.modeOfGame)

            while playGround.modeOfGame == "play":
                i = i + 1;
                print("-i-" + str(i) + playGround.modeOfGame)

                fillTrainsPositions(playGround)

                # asyncio.sleep(1)
                time.sleep(playGround.sleepSec)

                serialized_obj = json.dumps(playGround, default=lambda x: x.__dict__)

                print("+++++++++++++++++++++++++++Try send fffffff "+text_data+" at " + self.channel_name)

                async_to_sync(channel_layer.group_send)(
                # channel_layer.group_send(
                #     "trains", {"type": "user.trains",
                    str(playGround.arena), {"type": "user.trains",
                               "event": {"bi":serialized_obj, "ku": "dsfsdf"},
                                "text": {"bi":text_data, "ku": str(i)}
                           })

            playGround.started = False

    # def user_trains(self, event):
    #     print("+++++++++++++++++++++++++++Got message 333 " + event + " at " + self.channel_name)
    #     self.send_json(event)

    def disconnect(self, close_code):
        # await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed")
            # async_to_sync(channel_layer.group_send)(
            #     "gossip", {"type": "user.gossip",
            #                "event": "New User",
            #                "username": text_data})





class ControlGameConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.accept()


    # def receive(self, text_data=None, bytes_data=None, **kwargs):
    def receive_json(self, content):

            # self.channel_layer.group_add("trains", self.channel_name)
            # self.channel_layer.group_add("trains", self.channel_name)
            # print("----------------------Added " +self.channel_name+" channel to trains")

            print("ControlGameConsumer")

            # text_data = "play"
            # text_data = text_data.replace("\"", "")
            # json = django.utils.simplejson.loads(text_data)

            # print("-text_data-"+content)
            print("-text_data.type-" + content["type"])

            arena_num = int(content["arena_num"])

            # playGroundList = PlayGroundList()
            #
            # playGround = playGroundList.get(1)
            playGround = PlayGroundList().get(arena_num)

            # если управление игрой join/play/stop
            if (content["type"] == "join"):
                # self.channel_layer.group_add(str(arena_num), self.channel_name)
                # print("----------------------Added " +self.channel_name+" channel to trains")
                name = content["name"]
                # train = Train()
                playGround.trains[name] = name

            if (content["type"] == "play"):
                playGround.modeOfGame = "play"
            elif (content["type"] == "stop"):
                playGround.modeOfGame = "stop"

            # если управление телегой moveTrainChange
            if (content["type"] == "moveTrainChange"):
                whereMove = content["whereMove"]
                name = content["name"]
                changeTrainDirection(playGround, whereMove, name)

            # очишаем все PlayGrounds
            # TODO сделать очистку конкретных площадок
            if (content["type"] == "clear"):
                PlayGroundList().PlayGrounds = {}


    def disconnect(self, close_code):
        # await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed")