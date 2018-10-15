from asgiref.sync import async_to_sync
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer
from channels.layers import get_channel_layer


class FirstConnectConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self):
        await self.accept()
        await self.channel_layer.group_add("trains", self.channel_name)
        print("----------------------Added " +self.channel_name+" channel to trains")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard("trains", self.channel_name)
        print("--------------------------Removed "+self.channel_name+" channel to trains")

    async def user_trains(self, event):
        await self.send_json(event)
        print("+++++++++++++++++++++++++++Got message " +event+ " at " +self.channel_name)


class StartGameConsumer(WebsocketConsumer):

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
                "trains", {"type": "user.trains",
                           "event": "New User",
                           "text": text_data})

    def user_trains(self, event):
        print("+++++++++++++++++++++++++++Got message " + event + " at " + self.channel_name)
        self.send_json(event)

    def disconnect(self, close_code):
        # await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed")
            # async_to_sync(channel_layer.group_send)(
            #     "gossip", {"type": "user.gossip",
            #                "event": "New User",
            #                "username": text_data})