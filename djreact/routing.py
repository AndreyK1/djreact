from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from notifier.consumers import EchoConsumer, PixiConsumer, TickTockConsumer, StartNotifConsumer, NoseyConsumer
from notifier.consumersWORed import StartNotifConsumerWOR

from trainsgame.consumers import FirstConnectConsumer, StartGameConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        # тестовые
        path("ws/", EchoConsumer),
        path("pixiConsumer/", PixiConsumer),
        path("tickTockConsumer/", TickTockConsumer),
        path("notificationsStart/", StartNotifConsumer),
        path("notifications/", NoseyConsumer),
        path("notificationsWORedis/", StartNotifConsumerWOR),

        # trains
        path("trainsFirstConnectToGame/", FirstConnectConsumer),
        path("startGameConsumer/", StartGameConsumer),
    ])
})