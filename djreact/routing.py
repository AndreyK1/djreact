from channels.routing import ProtocolTypeRouter, URLRouter
from django.urls import path
from notifier.consumers import EchoConsumer, PixiConsumer, TickTockConsumer, StartNotifConsumer, NoseyConsumer

application = ProtocolTypeRouter({
    "websocket": URLRouter([
        path("ws/", EchoConsumer),
        path("pixiConsumer/", PixiConsumer),
        path("tickTockConsumer/", TickTockConsumer),
        path("notificationsStart/", StartNotifConsumer),
        path("notifications/", NoseyConsumer),

    ])
})