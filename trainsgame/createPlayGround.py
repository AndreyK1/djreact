from trainsgame.models import PlayGround, Cross, Path


def createPlayGr():
    playGround = PlayGround()
    if(playGround.initialised):
        print("------playGround already initialised-------!!!!!")
        return;

    # crosses = []
    # размеры сетки игровой
    h=3
    w=3
    # длина пути Path между перекрестками (горризонтальная и вертикальная)
    lenghtGor = 150
    lenghtVer = 100

    crossesNum = [[0] * w for i in range(h)]

    num = 0
    numPass = 0
    for i in range(h):
        for j in range(w):
            num = num+1
            playGround.numOfCross = num
            print(" i = " + str(i) + " j = " + str(j))
            node = Cross()
            # node.coord = {i,j}


            if(i == 0):
                # nothing
                print("nothing")
            else:
                # добавление перекрестков
                node.upCross = crossesNum[i-1][j]
                crossBefore = playGround.crosses[crossesNum[i - 1][j]]
                crossBefore.dwCross = num

                # создание пути
                numPass = createPath(playGround, lenghtVer, numPass)

                node.upPath = numPass
                crossBefore.dwPath = numPass



            if (j == 0):
                # nothing
                print("nothing")
            else:
                # добавление перекрестков
                node.leftCross = crossesNum[i][j-1]
                crossBefore = playGround.crosses[crossesNum[i][j-1]]
                crossBefore.rightCross = num

                # создание пути
                numPass = createPath(playGround, lenghtGor, numPass)

                node.leftPath = numPass
                crossBefore.rightPath = numPass


            crossesNum[i][j]=num
            playGround.crosses[num]=node

    playGround.croscrossesNum = crossesNum
    playGround.initialised=True



def createPath(playGround, lengh, numP):
    # создание пути
    path = Path()
    path.lengtOfPx = lengh
    numPass = numP + 1
    path.numOfPath = numPass
    playGround.pathes[numPass] = path
    return numPass;