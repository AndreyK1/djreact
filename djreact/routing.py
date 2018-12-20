from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from notifier.consumers import EchoConsumer, PixiConsumer, TickTockConsumer, StartNotifConsumer, NoseyConsumer
from notifier.consumersWORed import StartNotifConsumerWOR

from trainsgame.consumers import StartGameConsumer, ControlGameConsumer, GroupConsumer
from trainsgame.consumersGroupCustom import StartConsGroupCustom
from trainsgame.consumersReact import GroupConsumerReact, ReactStartConsumer

application = ProtocolTypeRouter({
    "websocket":AuthMiddlewareStack(

        URLRouter([
            # тестовые
            path("ws/", EchoConsumer),
            path("pixiConsumer/", PixiConsumer),
            path("tickTockConsumer/", TickTockConsumer),
            path("notificationsStart/", StartNotifConsumer),
            path("notifications/", NoseyConsumer),
            path("notificationsWORedis/", StartNotifConsumerWOR),

            # trains
            path("trainsGroupConsumer/", GroupConsumer),
            path("startGameConsumer/", StartGameConsumer),
            path("controlGameConsumer/", ControlGameConsumer),
            path("groupConsumerReact/", GroupConsumerReact),
            path("reactStartConsumer/", ReactStartConsumer),

            path("startConsGroupCustom/", StartConsGroupCustom),






        ])
    )
})