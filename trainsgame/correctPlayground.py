
def correctPlayGr(playGround):
    print("correctPlayGr")
    findExistingPathesBetweenDepos(playGround)


def findExistingPathesBetweenDepos(playGround):
    depoBeg = min(playGround.depos[1].cross, playGround.depos[2].cross)
    depoEnd = max(playGround.depos[1].cross, playGround.depos[2].cross)
    print("depoBeg - "+ str(depoBeg))
    print("depoEnd - "+ str(depoEnd))

    crosses = playGround.crosses
    pathes = playGround.pathes

    pathesArr = []
    crossesArr = []
    lastCross = depoBeg
    crossesArr.append(depoBeg)

    NotFoundEnd = True
    trie = 0
    while NotFoundEnd or trie<100:
        trie +=1
        chhosePath(crosses, crosses[lastCross], crossesArr, pathesArr, depoEnd)


def chhosePath(crosses, cross, crossesArr, pathesArr, depoEnd):

    print(" =chhosePath "+ str(cross.numOfCross))

    #проверяем, что это не конец
    if(depoEnd == cross.numOfCross):
        # нашли конечный путь
        print("----нашли конечный путь crosses------" + str(crossesArr))
        print("----нашли конечный путь pathes------" + str(pathesArr))
        NotFoundEnd = False
        return

    # nowPath =
    nextCross, nextPath = pathChooseMashine(cross, crossesArr, pathesArr)
    # cross.lastPathTry = nextTry
    # self.nextMove = MovingMashine().nextMove(self.nextMove)




    if(nextPath == 0):
        print("это тупик откатываемся на один путь назад")
        # это тупик откатываемся на один путь назад
        crossesArr.pop()
        nextCross = crossesArr[-1]
        pathesArr.pop()
        chhosePath(crosses, crosses[nextCross], crossesArr, pathesArr, depoEnd)


    # рекурсим вглубь
    print("рекурсим вглубь")
    crossesArr.append(nextCross)
    pathesArr.append(nextPath)
    chhosePath(crosses, crosses[nextCross], crossesArr, pathesArr, depoEnd)




def pathChooseMashine(cross, crossesArr, pathesArr):
        print(" ==pathChooseMashine " + str(cross.numOfCross)+ " cross.lastPathTry "+str(cross.lastPathTry))
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
            crossNext, pathNext = pathChooseMashine(cross, crossesArr, pathesArr)

        elif crossNext in crossesArr:
           print(" 2error crossNext " + str(crossNext) + " pathNext " + str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
           crossNext, pathNext = pathChooseMashine(cross, crossesArr, pathesArr)


        elif pathNext in pathesArr:
            print(" 3error crossNext " + str(crossNext) + " pathNext " + str(pathNext)+ " cross.lastPathTry "+str(cross.lastPathTry))
            crossNext, pathNext = pathChooseMashine(cross, crossesArr, pathesArr)

        # else:
        #     print("  return " + str(crossNext) + " pathNext " + str(pathNext))


        return crossNext, pathNext