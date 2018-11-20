from trainsgame.enums.TeamEnum import Teams
from trainsgame.models import Depo


def createDepo(playGround):
    # создаем два депо на разных концах площадки
    crosses = playGround.crosses
    maxCrossKey = max(crosses, key=int)
    minCrossKey = min(crosses, key=int)

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

