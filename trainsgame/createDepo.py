from trainsgame.enums.TeamEnum import Teams
from trainsgame.models import Depo


def createDepo(playGround):
    # создаем два депо на разных концах площадки
    crosses = playGround.crosses
    maxCrossKey = getMaxCros(playGround)
    minCrossKey = getMinCros(playGround)

    depo1Team = Depo()
    depo1Team.coord = crosses[maxCrossKey].coord
    depo1Team.cross = maxCrossKey
    depo1Team.team = Teams.ONE.value

    depo2Team = Depo()
    depo2Team.coord = crosses[minCrossKey].coord
    depo2Team.cross = minCrossKey
    depo2Team.team = Teams.TWO.value

    playGround.depos[1] = depo1Team
    playGround.depos[2] = depo2Team


def getMaxCros(playGround):
    maxCrossKey = max(playGround.crosses, key=int);
    numCross = maxCrossKey
    needContinue = True
    while (needContinue):
        cross = playGround.crosses[numCross]

        if cross.exclude != 1 and checkDoesCrossHavePath(cross):
            needContinue = False
        else:
            numCross -= 1

    return numCross


def getMinCros(playGround):
    minCrossKey = min(playGround.crosses, key=int);
    numCross = minCrossKey
    needContinue = True
    while (needContinue):
        cross = playGround.crosses[numCross]

        if cross.exclude != 1 and checkDoesCrossHavePath(cross):
            needContinue = False
        else:
            numCross += 1

    return numCross


def checkDoesCrossHavePath(cross):
    if (cross.upPath == 0 and cross.dwPath == 0 and cross.leftPath == 0 and cross.rightPath == 0):
        return False
    else:return True