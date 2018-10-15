from django.shortcuts import render

# Create your views here.
from trainsgame.models import PlayGround


def beginOfGAme(request):
    playGround = PlayGround()

    return render(request, "TrainGame.html", {"dd": 3})

    # model = SingletonDot()
    # md2 = SingletonDot2()
    # md2.increase();
    # template_name = 'post_detail.html'
    # return render(request, "SingleDot.html", {"dd": 3, "sdot" : model["dot"], "ffff" : md2.doter })
