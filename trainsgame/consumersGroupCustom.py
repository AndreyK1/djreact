# Консьюмеры (тестовые), которые используют не редис, а синглтон модель с каналами
import json
import asyncio
import sys

from channels.consumer import AsyncConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer

from django.core import serializers
from rest_framework.renderers import JSONRenderer

from notifier.models import SingletonChannelObj
from notifier.serializers import SingleSerializer

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer

from trainsgame.consumersReact import GroupConsumerReact
from trainsgame.models import PlayGroundList


class StartConsGroupCustom(AsyncJsonWebsocketConsumer):

    id = 1;

    async def connect(self):

        await self.accept()

        md2 = SingletonChannelObj()
        md2.increase()
        self.id = md2.doter
        md2.addChannel(self.id, self)

        print("Added "+self.channel_name+" channel to GroupCustom react")

    async def disconnect(self, code):
        md2 = SingletonChannelObj()
        md2.channels.pop(self.id)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        print("Recieve-------------------------------------------")
        # print(text_data["text"])
        # md2 = SingletonChannelObj()
        #
        # for k in md2.channels:
        #     print("key ", k)
        #     await md2.channels[k].send_json(md2.doter)
        # try:
        #     await md2.channels[k].send_json(md2.doter)
        # except:  # catch *all* exceptions
        #     e = sys.exc_info()[0]
        #     print("<p>Error: %s</p>" % e)
        asyncio.ensure_future(self.sendsArenas())


    async def sendsArenas(self):
        channel_layer = get_channel_layer()
        # old_group = Group('old_friends')
        # ch_group_list = channel_layer.group_channels(self.GROUP)

        if GroupConsumerReact.STARTET == True:
            return

        GroupConsumerReact.STARTET = True

        md2 = SingletonChannelObj()

        # while GroupConsumerReact.CONNECTED>0:
        while   len(md2.channels) > 0:

            await asyncio.sleep(3)
            playgrounds = PlayGroundList().PlayGrounds
            print("sendsArenas self.CONNECTED " + str(GroupConsumerReact.CONNECTED))
            # channel_layer = get_channel_layer()

            serialized_obj = json.dumps(playgrounds, default=lambda x: x.__dict__)

            print("+++++++++++++++++++++++++++Try send at " + self.channel_name)

            # await channel_layer.group_send(
            #     # channel_layer.group_send(
            #     #     "trains", {"type": "user.trains",
            #     str(GroupConsumerReact.GROUP), {"type": "user.react",
            #                             "event": {"value": serialized_obj, "type": "arenas"},
            #                             })
            for k in md2.channels:
                print("key ", k)
                userName = md2.channels[k].scope["user"].username;
                await md2.channels[k].send_json({"type": "user.react",
                                        # "event": {"value": serialized_obj, "type": "arenas"},
                                        "event": {"value": serialized_obj, "type": "arenas", "userName": userName},
                                        })



        GroupConsumerReact.STARTET = False