import json
import asyncio

from channels.consumer import AsyncConsumer
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer

from django.core import serializers
from rest_framework.renderers import JSONRenderer

from notifier.models import SingletonDotObj
from notifier.serializers import SingleSerializer

from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


class EchoConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        await self.send({
            "type": "websocket.accept"
        })

    async def websocket_receive(self, event):
        # Echo the same received payload

        await self.send({
            "type": "websocket.send",
            "text": event["text"]
        })

# https://blog.heroku.com/in_deep_with_django_channels_the_future_of_real_time_apps_in_django

class PixiConsumer(AsyncConsumer):
    async def websocket_connect(self, event):
        await self.send({
            "type": "websocket.accept"
        })
        # await self.channel_layer.group_add("gossip", self.channel_name)
        # async_to_sync(self.channel_layer.group_add)("chat", self.channel_name)

    async def websocket_receive(self, event):
        # Echo the same received payload
        await self.send({
            "type": "websocket.send",
            "text": getJson(event)
            # getJson(event)
        })


def getJson(event):
    md2 = SingletonDotObj()
    md2.settext(event["text"]);
    md2.increase();
    # json_data = serializers.serialize('json', [md2])
    serializer = SingleSerializer(md2)
    # print("serializer ", serializer)
    print("serializer.data ", serializer.data)
    # return JSONRenderer().render(serializer.data)
    return json.dumps(serializer.data)


class TickTockConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        i=0;
        while i<10:
            i = i+1;
            await asyncio.sleep(1)
            await self.send_json("tick")
            await asyncio.sleep(1)
            await self.send_json(".....tock")


class NoseyConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("gossip", self.channel_name)
        print("----------------------Added " +self.channel_name+" channel to gossip")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed "+self.channel_name+" channel to gossip")

    async def user_gossip(self, event):
        await self.send_json(event)
        print("+++++++++++++++++++++++++++Got message " +event+ " at " +self.channel_name)


# class StartNotifConsumer(AsyncJsonWebsocketConsumer):
class StartNotifConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()
        # channel_layer = get_channel_layer()
        # async_to_sync(channel_layer.group_send)(
        #     "gossip", {"type": "user.gossip",
        #                "event": "New User",
        #                "username": "1"})

    def receive(self, text_data=None, bytes_data=None, **kwargs):
            print("+++++++++++++++++++++++++++Got fffffff "+text_data+" at " + self.channel_name)
            channel_layer = get_channel_layer()
            async_to_sync(channel_layer.group_send)(
                "gossip", {"type": "user.gossip",
                           "event": "New User",
                           "text": text_data})

    def user_gossip(self, event):
        print("+++++++++++++++++++++++++++Got message " + event + " at " + self.channel_name)
        self.send_json(event)

    def disconnect(self, close_code):
        # await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed")
            # async_to_sync(channel_layer.group_send)(
            #     "gossip", {"type": "user.gossip",
            #                "event": "New User",
            #                "username": text_data})