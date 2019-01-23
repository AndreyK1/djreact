import asyncio
import json
import time

import django
from asgiref.sync import async_to_sync, sync_to_async
from channels.generic.websocket import AsyncJsonWebsocketConsumer, WebsocketConsumer, JsonWebsocketConsumer
from channels.layers import get_channel_layer

# первичный коннект, и обработка каждого коннекта из канала
# from django.core import serializers
from trainsgame.constants import LOGIN_PATH
from trainsgame.consumersReact import GroupConsumerReact
from trainsgame.correctPlayground import correctPlayGr
from trainsgame.createPlayGround import createPlayGr, fillTrainsPositions, fillPathes, changeTrainDirection, \
    createTrains, initPlayGround
from trainsgame.createTreasurres import createTreasurres
from trainsgame.makeMovings import makeFirstMovings
from trainsgame.models import PlayGround, Foo, Cross, Train, PlayGroundList, SingleChannelToArena


# добавление канала в группу и рассылка по группам
# TODO delete old
class GroupConsumer(AsyncJsonWebsocketConsumer):

    async def connect(self,text_data=None):
        await self.accept()
        # await self.channel_layer.group_add("trains", self.channel_name)
        # print("----------------------Added " +self.channel_name+" channel to trains")
        # если пользователь конгектился ранее, то возобновляем коннект






    async def receive(self,text_data=None):
        # self.user = self.scope["user"]
        # if self.user.is_authenticated == False:
        #     print("self.user.is_authenticated == False")
            # self.close("404")
            # self.send_json({"type": "user.trains",
            #                         "event": {"bi": 1, "ku": 2},
            #                         "text": {"bi": 3, "ku": 4     }})

        # await self.send_json({"type": "user.trains",
        #                         "event": {"bi": 1, "ku": 2},
        #                         "text": {"bi": 3, "ku": 4     }})


        text_data = text_data.replace("\"", "")
        print("text_data "+str(text_data))

        if text_data =="restore":
            # если это попытка востановить конекшен
            if "arena" in self.scope["session"]:
                arena = SingleChannelToArena().checkUserConnectionToAreas(self.scope["user"], self, self.scope["session"]["arena"])
                if arena != 0 and str(arena) != "":
                    print("restore adding self.channel_name to arena " + str(self.channel_name) + str(arena))
                    await self.channel_layer.group_add(str(arena), self.channel_name)
                    return
        else:
            await self.channel_layer.group_add(str(text_data), self.channel_name)
            SingleChannelToArena().addChannelToArena(str(text_data), self, self.scope["user"])
            self.scope["session"]["arena"] = str(text_data)
            self.scope["session"].save()
            print("----------------------Added " + self.channel_name + " channel to arena " + str(text_data))



    async def disconnect(self, close_code):
        # await self.channel_layer.group_discard("trains", self.channel_name)
        # await self.channel_layer.group_discard("trains", self.channel_name)
        print("---disconect " + self.channel_name)

        arena = SingleChannelToArena().getArenaByChannel(self.channel_name)
        if arena != None:
            SingleChannelToArena().remChannelToArena(self.channel_name)
            await self.channel_layer.group_discard(arena, self.channel_name)
            print("--------------------------Removed " + self.channel_name + " channel from arena " + arena)
            # await self.channel_layer.group_discard(arena, self.channel_name)


        # SingleChannelToArena().remChannelToArena(self.channel_name)


        # serialized_obj = json.dumps(SingleChannelToArena().arenasCh, default=lambda x: x.__dict__)
        # print("serialized_obj SingleChannelToArena " + serialized_obj)





    # обработка каждого коннекта из канала
    async def user_trains(self, event):
        await self.send_json(event)
        print("+++++++++++++++++++++++++++Got message 1111 " +event["text"]["bi"] + event["text"]["ku"]+ " at " + self.channel_name)


# надо сделать шедулер, который будет каждую секунду отправлять в канал расположение объектов
class StartGameConsumer(WebsocketConsumer):

    def connect(self):
        self.accept()
        self.user = self.scope["user"]
        print("self.user - "+ str(self.user))
        print("self.user.is_authenticated - " + str(self.user.is_authenticated))
        # createPlayGr()


    def receive(self, text_data=None, bytes_data=None, **kwargs):

            text_data = text_data.replace("\"", "")

            playGround = PlayGroundList().get(int(text_data))

            playGround.modeOfGame = "play"

            playGround = initPlayGround(playGround)


            # playGround.sleepSec = 1
            # playGround.moveSize = 20
            # playGround.lenghtGor = 8*playGround.moveSize
            # playGround.lenghtVer = 5 * playGround.moveSize
            #
            createPlayGr(playGround)

            # playGroundList = PlayGroundList()
            #
            # playGround = playGroundList.get(1)
            # playGround = PlayGroundList().get(int(text_data))

            # playGround = PlayGround()


            # text_data = "play"


            print("-text_data-"+text_data)

            # певоначально показываем
            # self.cust_sendTosChannel(playGround, text_data, "nocorect")

            correctPlayGr(playGround, int(text_data))
            playGround = PlayGroundList().get(int(text_data))

            # певоначально показываем
            # self.cust_sendTosChannel(playGround, text_data)

            createTrains(playGround)
            createTreasurres(playGround)
            playGround.initialised = True
            # self.cust_sendTosChannel(playGround, text_data)



            if(playGround.started):
                return ;
            else:
                makeFirstMovings(playGround)
                playGround.started = True

            # channel_layer = get_channel_layer()
            i = 0;
            # while i < 10:
            print("-playGround.modeOfGame-" + playGround.modeOfGame)

            # запускаем игру
            while playGround.modeOfGame == "play":


                cnt_in_arena = SingleChannelToArena().getCntInArena(playGround.arena)
                if cnt_in_arena < 1:
                    print("No more players in arena "+ str(playGround.arena) + " deleting the arena")
                    PlayGroundList().delete(playGround)
                    break
                print("cnt_in_arena of arena " + str(playGround.arena) + " cnt " + str(cnt_in_arena))
                i = i + 1;
                print("-i-" + str(i) + playGround.modeOfGame)

                fillTrainsPositions(playGround)



                # asyncio.sleep(1)
                time.sleep(playGround.sleepSec)

                self.cust_sendTosChannel(playGround, text_data)

                # serialized_obj = json.dumps(playGround, default=lambda x: x.__dict__)
                #
                # print("+++++++++++++++++++++++++++Try send fffffff "+text_data+" at " + self.channel_name)

                # async_to_sync(channel_layer.group_send)(
                # # channel_layer.group_send(
                # #     "trains", {"type": "user.trains",
                #     str(playGround.arena), {"type": "user.trains",
                #                "event": {"bi":serialized_obj, "ku": "dsfsdf"},
                #                 "text": {"bi":text_data, "ku": str(i)}
                #            })

            playGround.started = False

    # def user_trains(self, event):
    #     print("+++++++++++++++++++++++++++Got message 333 " + event + " at " + self.channel_name)
    #     self.send_json(event)

    def disconnect(self, close_code):
        # await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed StartGameConsumer " + self.channel_name)
            # async_to_sync(channel_layer.group_send)(
            #     "gossip", {"type": "user.gossip",
            #                "event": "New User",
            #                "username": text_data})


    def cust_sendTosChannel(self, playGround, text_data, info=""):
        channel_layer = get_channel_layer()

        serialized_obj = json.dumps(playGround, default=lambda x: x.__dict__)

        print("+++++++++++++++++++++++++++Try send fffffff " + text_data + " at " + self.channel_name)

        # async_to_sync(channel_layer.group_send)(
        #     # channel_layer.group_send(
        #     #     "trains", {"type": "user.trains",
        #     str(playGround.arena), {"type": "user.trains",
        #                             "event": {"bi": serialized_obj, "ku": info},
        #                             "text": {"bi": text_data, "ku": info}
        #                             })

        for key, channel in SingleChannelToArena().arenasCh[str(playGround.arena)].items():

            # channel.send_json({"type": "user.trains",
            #                         "event": {"bi": serialized_obj, "ku": i   nfo},
            #                         "text": {"bi": text_data, "ku": info}
            #                         })
            async_to_sync(self.send_to_channel)(channel, serialized_obj, info, text_data)
            # asyncio.ensure_future(self.send_to_channel(channel, serialized_obj, info, text_data))

    async def send_to_channel(self, channel, serialized_obj, info, text_data):
        await channel.send_json({"event": {"bi": serialized_obj, "ku": info}
                                })




class ControlGameConsumer(JsonWebsocketConsumer):

    def connect(self):
        self.accept()


    # def receive(self, text_data=None, bytes_data=None, **kwargs):
    def receive_json(self, content):
            print("receive_json");




            self.user = self.scope["user"]
            print("self.user - " + str(self.user))
            print("self.user.is_authenticated - " + str(self.user.is_authenticated))

            if self.user.is_authenticated == False:
                print("self.user.is_authenticated == False")
                self.send_json({"type": "redirect",
                                "value": LOGIN_PATH})
                return

            # self.send_json({"type": "redirect",
            #                 "value": "/trains/log_in/"})

            # self.channel_layer.group_add("trains", self.channel_name)
            # self.channel_layer.group_add("trains", self.channel_name)
            # print("----------------------Added " +self.channel_name+" channel to trains")

            print("ControlGameConsumer")

            # text_data = "play"
            # text_data = text_data.replace("\"", "")
            # json = django.utils.simplejson.loads(text_data)

            # print("-text_data-"+content)
            print("-text_data.type-" + content["type"] + " | arena_num " + str(content["arena_num"]) +" | name " + content["name"])


            arena_num = int(content["arena_num"])
            if(arena_num == 0):
                if(len(PlayGroundList().PlayGrounds) == 0):
                    arena_num = 1;
                else:
                    arena_num = max(PlayGroundList().PlayGrounds, key=int) + 1
                print("arena_num - max - " + str(arena_num))
            # playGroundList = PlayGroundList()
            #
            # playGround = playGroundList.get(1)
            playGround = PlayGroundList().get(arena_num)

            name = content["name"]
            # if name == "":
            name = str(self.user)
            print("name  - " + name)


            # если управление игрой join/play/stop
            if (content["type"] == "join"):
                # self.channel_layer.group_add(str(arena_num), self.channel_name)
                # print("----------------------Added " +self.channel_name+" channel to trains")
                # name = content["name"]
                # train = Train()
                playGround.trains[name] = name
                self.send_json({"type": "joined",
                                "value": arena_num,
                                "username": name})

            if (content["type"] == "play"):
                playGround.modeOfGame = "play"
            elif (content["type"] == "stop"):
                playGround.modeOfGame = "stop"

            # если управление телегой moveTrainChange
            if (content["type"] == "moveTrainChange"):
                whereMove = content["whereMove"]
                # name = content["name"]

                changeTrainDirection(playGround, whereMove, name)

            # очишаем все PlayGrounds
            # TODO удалить потом
            if (content["type"] == "clear"):
                PlayGroundList().PlayGrounds = {}

            # очишаем конкретную площадоку
            if (content["type"] == "clearThisArena"):
                PlayGroundList().deleteByArena(arena_num)


    def disconnect(self, close_code):
        # await self.channel_layer.group_discard("gossip", self.channel_name)
        print("--------------------------Removed ControlGameConsumer " + self.channel_name)