import asyncio
import json

# добавление канала в группу и рассылка по группам
import time

from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.layers import get_channel_layer

from trainsgame.models import PlayGroundList


class GroupConsumerReact(AsyncJsonWebsocketConsumer):

    GROUP = "react"
    STARTET = False

    async def connect(self,text_data=None):
        await self.accept()
        await self.channel_layer.group_add(self.GROUP, self.channel_name)
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
        asyncio.ensure_future(self.sendsArenas())



    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.GROUP, self.channel_name)
        print("--------------------------Removed "+self.channel_name+" channel to trains")

    async def sendsArenas(self):
        while True:

            await asyncio.sleep(3)
            playgrounds = PlayGroundList().PlayGrounds
            print("sendsArenas")
            channel_layer = get_channel_layer()

            serialized_obj = json.dumps(playgrounds, default=lambda x: x.__dict__)

            print("+++++++++++++++++++++++++++Try send at " + self.channel_name)

            await channel_layer.group_send(
                # channel_layer.group_send(
                #     "trains", {"type": "user.trains",
                str(self.GROUP), {"type": "user.react",
                                        "event": {"value": serialized_obj, "type": "arenas"},
                                        })

    # обработка каждого коннекта из канала
    async def user_react(self, event):
        await self.send_json(event)

