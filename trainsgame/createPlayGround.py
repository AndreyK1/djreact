from trainsgame.models import PlayGround, Cross


def createPlayGr():
    playGround = PlayGround()
    if(playGround.initialised):
        return;

    # crosses = []
    # размеры сетки игровой
    h=3
    w=3

    crosses = [[0] * w for i in range(h)]

    for i in range(h):
        for j in range(w):
            print(" i = " + str(i) + " j = " + str(j))
            node = Cross()
            node.coord = {i,j}
            # crosses[i] = []

            if(i == 0):
                # nothing
                print("nothing")
            else:
                node.upCross = crosses[i-1][j]
                crosses[i - 1][j].dwCross = node

            if (j == 0):
                # nothing
                print("nothing")
            else:
                node.leftCross = crosses[i][j-1]
                crosses[i][j-1].rightCross = node

            crosses[i][j]=node

    playGround.crosses = crosses