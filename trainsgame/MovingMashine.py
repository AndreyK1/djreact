

class MovingMashine:

    moving = ["up", "down", "left", "right"]

    def nextMove(self, lastMove):
        nextmove = ""
        if(lastMove == "up"):
            nextmove = "right"
        elif(lastMove == "right"):
            nextmove = "down"
        elif(lastMove == "down"):
            nextmove = "left"
        else:
            nextmove = "up"

        return nextmove