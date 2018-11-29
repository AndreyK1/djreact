# # найденные маршруты во всех итерациях
# allRoutes= []
# # найденные пути во всех итерациях (чтоб повторно не использоваьт)
# allPathesUsed= []
import sys


def correctPlayGr(playGround):
    sys.setrecursionlimit(10000)
    print("correctPlayGr")
    findExistingPathesBetweenDepos(playGround)


def findExistingPathesBetweenDepos(playGround):
    depoBeg = min(playGround.depos[1].cross, playGround.depos[2].cross)
    depoEnd = max(playGround.depos[1].cross, playGround.depos[2].cross)
    print("depoBeg - "+ str(depoBeg))
    print("depoEnd - "+ str(depoEnd))

    crosses = playGround.crosses
    pathes = playGround.pathes

    # # найденные маршруты во всех итерациях
    # allRoutes= []

    # найденный маршрут в этой итерации
    pathesArr = []
    crossesArr = []
    lastCross = depoBeg
    crossesArr.append(depoBeg)

    NotFoundEnd = True
    trie = 0
    while NotFoundEnd or trie<100:
        trie +=1
        res = chhosePath(playGround, playGround.crosses[lastCross], crossesArr, pathesArr, depoEnd)
        if res == "found":
            # нашли конечный путь
            print("----нашли конечный путь crosses------" + str(crossesArr))
            print("----нашли конечный путь pathes------" + str(pathesArr))
            # NotFoundEnd = False
            playGround.allRoutes.append({"crosses": crossesArr, "pathes": pathesArr})

            # global allPathesUsed
            allPathesUsedNew = playGround.allPathesUsed + pathesArr
            playGround.allPathesUsed = allPathesUsedNew
            crossesArr = []
            crossesArr.append(depoBeg)
            pathesArr = []
            print("----нашли конечный путь allRoutes------" + str(playGround.allRoutes))
            print("----нашли конечный путь allPathesUsed------" + str(playGround.allPathesUsed))
            # очищаем все перекрестки
            for cross1 in playGround.crosses:
                playGround.crosses[cross1].lastPathTry = ""

        if res == "finish":

            break



def chhosePath(playGround, cross, crossesArr, pathesArr, depoEnd):

    print(" =chhosePath to cross "+ str(cross.numOfCross) + " depoEnd "+ str(depoEnd))

    #проверяем, что это не конец
    if(depoEnd == cross.numOfCross):
        # # нашли конечный путь
        return "found"


    # nowPath =g
    nextCross, nextPath = pathChooseMashine(playGround, cross, crossesArr, pathesArr)
    # cross.lastPathTry = nextTry
    # self.nextMove = MovingMashine().nextMove(self.nextMove)




    if(nextPath == 0):
        print("это тупик откатываемся на один путь назад")
        # это тупик откатываемся на один путь назад
        if(len(crossesArr) < 2):
            print("++++++откатываться больше некуда. Завершаем поиск!!!+++++++")
            print("----нашли конечный путь allRoutes------" + str(playGround.allRoutes))
            print("----нашли конечный путь allPathesUsed------" + str(playGround.allPathesUsed))
            return "finish"
        last = crossesArr.pop()
        playGround.crosses[last].lastPathTry = ""
        nextCross = crossesArr[-1]
        pathesArr.pop()
        res = chhosePath(playGround, playGround.crosses[nextCross], crossesArr, pathesArr, depoEnd)
        if res == "found":
            return "found"
        if res == "finish":
            return "finish"


    # рекурсим вглубь
    print("рекурсим вглубь")
    crossesArr.append(nextCross)
    pathesArr.append(nextPath)
    res = chhosePath(playGround, playGround.crosses[nextCross], crossesArr, pathesArr, depoEnd)
    if res =="found":
        return "found"
    if res == "finish":
        return "finish"




def pathChooseMashine(playGround, cross, crossesArr, pathesArr):
        print(" ==pathChooseMashine " + str(cross.numOfCross)+ " last cross.lastPathTry "+str(cross.lastPathTry))
        last = cross.lastPathTry

        crossNext = 0
        pathNext = 0
        if(last == ""):
            cross.lastPathTry = "right"
            crossNext = cross.rightCross
            pathNext = cross.rightPath
            # if(cross.rightPath!=0):
            #     cross.lastPathTry = "right"

                # return cross.rightPath, pathNext

        if(last == "right"):
            cross.lastPathTry = "down"
            crossNext = cross.dwCross
            pathNext = cross.dwPath

        if(last == "down"):
            cross.lastPathTry = "left"
            crossNext = cross.leftCross
            pathNext = cross.leftPath

        if(last == "left"):
            cross.lastPathTry = "up"
            crossNext = cross.upCross
            pathNext = cross.upPath

        if(last == "up"):
            print("made all circle - last == up")
            return 0 , 0




        # проверяем, что этих значений у нас еще нет (не повторяем путь)
        if (pathNext == 0  or  crossNext == 0):
            print(" 1error crossNext " + str(crossNext)+ " pathNext "+str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
            crossNext, pathNext = pathChooseMashine(playGround, cross, crossesArr, pathesArr)

        elif crossNext in crossesArr:
           print(" 2error crossNext " + str(crossNext) + " pathNext " + str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
           print("crossesArr " +str(crossesArr))
           crossNext, pathNext = pathChooseMashine(playGround, cross, crossesArr, pathesArr)


        elif pathNext in pathesArr:
            print(" 3error crossNext " + str(crossNext) + " pathNext " + str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
            print("pathesArr " + str(pathesArr))
            crossNext, pathNext = pathChooseMashine(playGround, cross, crossesArr, pathesArr)

        elif pathNext in playGround.allPathesUsed:
            print(" 4error crossNext " + str(crossNext) + " pathNext " + str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
            print("playGround.allPathesUsed " + str(playGround.allPathesUsed))
            crossNext, pathNext = pathChooseMashine(playGround, cross, crossesArr, pathesArr)


        # else:
        #     print("  return " + str(crossNext) + " pathNext " + str(pathNext))

        print(" choosen crossNext " + str(crossNext) + " pathNext " +str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
        return crossNext, pathNext