import json

from django.contrib.auth.decorators import login_required
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.shortcuts import render, redirect

from django.contrib.auth import login, logout
# Create your views here.
from django.urls import reverse
# from django.core.urlresolvers import reverse
from django.views.decorators.csrf import csrf_protect, csrf_exempt

from trainsgame.constants import LOGIN_PATH, LOGIN_PAGE, BEGIN_GAME_PAGE
from trainsgame.models import PlayGround, SingletonRtcGroups
from django.http import JsonResponse

# fot test task from fintech
def solidityTestTask(request):
    return render(request, "SolidityTask.html")

# @login_required(login_url=LOGIN_PATH)
def beginOfGAme(request):
    playGround = PlayGround()

    return render(request, "TrainGame.html", {"dd": 3})

# @login_required(login_url=LOGIN_PATH)
def beginOfGAmeTest(request):
    playGround = PlayGround()

    return render(request, "TrainGameTest.html", {"dd": 3})

    # model = SingletonDot()
    # md2 = SingletonDot2()
    # md2.increase();
    # template_name = 'post_detail.html'
    # return render(request, "SingleDot.html", {"dd": 3, "sdot" : model["dot"], "ffff" : md2.doter })



def log_in(request):
    form = AuthenticationForm()
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect(reverse(BEGIN_GAME_PAGE))
        # print("------------form.get_user() " + str(form.get_user()))
        # return HttpResponseRedirect(reverse(BEGIN_GAME_PAGE, kwargs={"username": form.get_user()}))
        else:
            print(form.errors)
    return render(request, 'log_in.html', {'form': form})


def log_out(request):
    logout(request)
    return redirect(reverse(LOGIN_PAGE))


def sign_up(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect(LOGIN_PAGE)
        else:
            print(form.errors)
    return render(request, "sign_up.html", {"form": form})
    # return render(request, "TrainGame.html", {"dd": 3})


@csrf_exempt
def addToRtcGroup(request):
    # email = request.POST.get("email", "")
    # password = request.POST.get("password", "")

    obj = json.loads( request.body.decode('utf-8') )

    peer_group = obj["peer_group"]
    peer_id = obj["peer_id"]
    role = obj["role"]
    print("------------peer_group " + str(peer_group) + " peer_id " + str(peer_id) + " role " + str(role))
    groups = SingletonRtcGroups()
    # отключаем добавление клиентов (пока) оставляем только доб-е сервера, который затем возвращаем клиентам
    if(role == "server"):
        groups.addRtcToGroup(peer_group, peer_id, role)
    # md2.increase()

    # serialized_obj = json.dumps(groups.rtcGroups, default=lambda x: x.__dict__)

    # return JsonResponse({"addedToRtc" : groups.rtcGroups})
    return groups.returbJsonOfMe()