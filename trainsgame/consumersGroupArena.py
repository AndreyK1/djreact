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
from trainsgame.models import PlayGroundList, SingleChannelToArena


class StartConsGroupArena(AsyncJsonWebsocketConsumer):

    # id = 1;

    async def connect(self):

        await self.accept()

    async def disconnect(self, code):


        arena = SingleChannelToArena().getArenaByChannel(self.channel_name)
        if arena != None:
            SingleChannelToArena().remChannelToArena(self.channel_name)
            # await self.channel_layer.group_discard(arena, self.channel_name)
            print("--------------------------Removed " + self.channel_name + " channel from arena " + arena)
        # md2 = SingletonChannelObj()
        # md2.channels.pop(self.id)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        print("Recieve--------StartConsGroupArena-----------------------------------")

        # await self.send_json({"event": {"bi": "fsdfsd", "ku": "vxcvcxv"}
        #                         })


        text_data = text_data.replace("\"", "")
        print("text_data "+str(text_data))

        if text_data =="restore":
            # если это попытка востановить конекшен
            if "arena" in self.scope["session"]:
                arena = SingleChannelToArena().checkUserConnectionToAreas(self.scope["user"], self, self.scope["session"]["arena"])
                if arena != 0 and str(arena) != "":
                    print("restore adding self.channel_name to arena " + str(self.channel_name) + str(arena))
                    # await self.channel_layer.group_add(str(arena), self.channel_name)
                    return
        else:
            # await self.channel_layer.group_add(str(text_data), self.channel_name)
            SingleChannelToArena().addChannelToArena(str(text_data), self, self.scope["user"])
            self.scope["session"]["arena"] = str(text_data)
            self.scope["session"].save()
            print("----------------------Added " + self.channel_name + " channel to arena " + str(text_data))

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
        # asyncio.ensure_future(self.sendsArenas())


    async def sendsArenas(self):
        pass
        # channel_layer = get_channel_layer()
        # old_group = Group('old_friends')
        # ch_group_list = channel_layer.group_channels(self.GROUP)

        # if GroupConsumerReact.STARTET == True:
        #     return
        #
        # GroupConsumerReact.STARTET = True
        #
        # md2 = SingletonChannelObj()
        #
        # # while GroupConsumerReact.CONNECTED>0:
        # while   len(md2.channels) > 0:
        #
        #     await asyncio.sleep(3)
        #     playgrounds = PlayGroundList().PlayGrounds
        #     print("sendsArenas self.CONNECTED " + str(GroupConsumerReact.CONNECTED))
        #     # channel_layer = get_channel_layer()
        #
        #     serialized_obj = json.dumps(playgrounds, default=lambda x: x.__dict__)
        #
        #     print("+++++++++++++++++++++++++++Try send at " + self.channel_name)
        #
        #     # await channel_layer.group_send(
        #     #     # channel_layer.group_send(
        #     #     #     "trains", {"type": "user.trains",
        #     #     str(GroupConsumerReact.GROUP), {"type": "user.react",
        #     #                             "event": {"value": serialized_obj, "type": "arenas"},
        #     #                             })
        #     for k in md2.channels:
        #         print("key ", k)
        #         await md2.channels[k].send_json({"type": "user.react",
        #                                 "event": {"value": serialized_obj, "type": "arenas"},
        #                                 })
        #
        #
        #
        # GroupConsumerReact.STARTET = False