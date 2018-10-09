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

class StartNotifConsumerWOR(AsyncJsonWebsocketConsumer):

    id = 1;

    async def connect(self):

        await self.accept()

        md2 = SingletonChannelObj()
        md2.increase()
        self.id = md2.doter
        md2.addChannel(self.id, self)

        print("Added "+self.channel_name+" channel to gossip")

    async def disconnect(self, code):
        md2 = SingletonChannelObj()
        md2.channels.pop(self.id)

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        print("Recieve-------------------------------------------")
        # print(text_data["text"])
        md2 = SingletonChannelObj()
        for k in md2.channels:
            print("key ", k)
            await md2.channels[k].send_json(md2.doter)
        try:
            await md2.channels[k].send_json(md2.doter)
        except:  # catch *all* exceptions
            e = sys.exc_info()[0]
            print("<p>Error: %s</p>" % e)