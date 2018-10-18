import asyncio
import json
import time

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
from channels.layers import get_channel_layer

# первичный коннект, и обработка каждого коннекта из канала
# from django.core import serializers

from trainsgame.createPlayGround import createPlayGr
from trainsgame.models import PlayGround, Foo, Cross


class FirstConnectConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("trains", self.channel_name)
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
        createPlayGr()


    def receive(self, text_data=None, bytes_data=None, **kwargs):
            playGround = PlayGround()
            # rows = len(playGround.crosses)
            # col = len(playGround.crosses[1])

            # serialized_obj = serializers.serialize('json', [playGround, ])
            # cross = Cross()
            # cross2 = Cross()
            # cross.rightCross = cross2
            #
            # foo = PlayGround()
            # foo.crosses["1"] = cross

            channel_layer = get_channel_layer()
            i = 0;
            while i < 10:
                i = i + 1;
                # asyncio.sleep(1)
                time.sleep(1)

                serialized_obj = json.dumps(playGround, default=lambda x: x.__dict__)

                print("+++++++++++++++++++++++++++Got fffffff "+text_data+" at " + self.channel_name)

                async_to_sync(channel_layer.group_send)(
                # channel_layer.group_send(
                    "trains", {"type": "user.trains",
                               "event": {"bi":serialized_obj, "ku": "dsfsdf"},
                                "text": {"bi":text_data, "ku": "fdgfdg"}
                           })

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



