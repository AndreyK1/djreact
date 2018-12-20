import asyncio
import json

# добавление канала в группу и рассылка по группам
import time

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
from channels.layers import get_channel_layer

# from channels import Group


from trainsgame.models import PlayGroundList


# https://django-channels-presence.readthedocs.io/en/latest/

class GroupConsumerReact(AsyncJsonWebsocketConsumer):

    GROUP = "react"
    STARTET = False
    CONNECTED = 0

    async def connect(self,text_data=None):
        GroupConsumerReact.CONNECTED +=1
        await self.accept()
        await self.channel_layer.group_add(GroupConsumerReact.GROUP, self.channel_name)
        print("--------Added " +self.channel_name+" channel to react")

        # if self.STARTET != False:
        #     return

        # self.STARTET = True
        #
        # while True:
        #     asyncio.sleep(5)
        #     playgrounds = PlayGroundList().PlayGrounds
        #     print("connect connect connect")
        #     # time.sleep(5)
        #     await self.sendsArenas(playgrounds)


    async def receive(self, text_data=None):
        # if self.STARTET != False:
        #     return

        # self.STARTET = True

        # while True:
        # await asyncio.sleep(15)
        # playgrounds = PlayGroundList().PlayGrounds
        print("connect connect connect")
        # time.sleep(5)
        # await self.sendsArenas(playgrounds)

        # asyncio.ensure_future(self.sendsArenas())

        # asyncio.run(self.sendsArenas())

        # loop = asyncio.get_event_loop()
        # loop.run_until_complete(asyncio.wait(self.sendsArenas()))

        # self.sendsArenas()


    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(GroupConsumerReact.GROUP, self.channel_name)
        GroupConsumerReact.CONNECTED -=1
        print("--------------------------Removed "+self.channel_name+" channel to react")


    #
    # async def sendsArenas(self):
    #     channel_layer = get_channel_layer()
    #     # old_group = Group('old_friends')
    #     # ch_group_list = channel_layer.group_channels(self.GROUP)
    #
    #     if GroupConsumerReact.STARTET == True:
    #         return
    #
    #     GroupConsumerReact.STARTET = True
    #
    #     while GroupConsumerReact.CONNECTED>0:
    #
    #         await asyncio.sleep(3)
    #         playgrounds = PlayGroundList().PlayGrounds
    #         print("sendsArenas self.CONNECTED " + str(GroupConsumerReact.CONNECTED))
    #         # channel_layer = get_channel_layer()
    #
    #         serialized_obj = json.dumps(playgrounds, default=lambda x: x.__dict__)
    #
    #         print("+++++++++++++++++++++++++++Try send at " + self.channel_name)
    #
    #         await channel_layer.group_send(
    #             # channel_layer.group_send(
    #             #     "trains", {"type": "user.trains",
    #             str(GroupConsumerReact.GROUP), {"type": "user.react",
    #                                     "event": {"value": serialized_obj, "type": "arenas"},
    #                                     })
    #
    #     GroupConsumerReact.STARTET = False



    # обработка каждого коннекта из канала
    async def user_react(self, event):
        await self.send_json(event)
        # print("dcadsdssad")



# надо сделать шедулер, который будет каждую секунду отправлять в канал расположение объектов
class ReactStartConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()

    def receive(self, text_data=None, bytes_data=None, **kwargs):
        # if (content["type"] == "startReact"):
            # asyncio.ensure_future(self.startReactLoop())
            # self.startReactLoop()
            # loop = asyncio.get_event_loop()
            # loop.run_until_complete(asyncio.wait(self.startReactLoop()))
            # loop = asyncio.new_event_loop()
            # asyncio.set_event_loop(loop)
            # sync_to_async(asyncio.as_completed)(self.startReactLoop())
        self.startReactLoop()
        print("here-------------")
            # fut = asyncio.run_coroutine_threadsafe(self.startReactLoop())

    def disconnect(self, close_code):
        pass

    def startReactLoop(self):
        channel_layer = get_channel_layer()
        # old_group = Group('old_friends')
        # ch_group_list = channel_layer.group_channels(self.GROUP)

        if GroupConsumerReact.STARTET == True:
            return

        GroupConsumerReact.STARTET = True

        while GroupConsumerReact.CONNECTED > 0:
            time.sleep(3)
            playgrounds = PlayGroundList().PlayGrounds
            print("sendsArenas self.CONNECTED " + str(GroupConsumerReact.CONNECTED) + " GROUP" + str(GroupConsumerReact.GROUP))
            # channel_layer = get_channel_layer()

            serialized_obj = json.dumps(playgrounds, default=lambda x: x.__dict__)
            print("serialized_obj " + serialized_obj)

            # print("+++++++++++++++++++++++++++Try send at " + self.channel_name)

            async_to_sync(channel_layer.group_send)(
                # channel_layer.group_send(
                #     "trains", {"type": "user.trains",
                str(GroupConsumerReact.GROUP), {"type": "user.react",
                                                "event": {"value": serialized_obj, "type": "arenas"},
                                                })

        GroupConsumerReact.STARTET = False