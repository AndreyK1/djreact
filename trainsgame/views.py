from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.shortcuts import render, redirect

from django.contrib.auth import login, logout
# Create your views here.
from django.urls import reverse
# from django.core.urlresolvers import reverse

from trainsgame.models import PlayGround


def beginOfGAme(request):
    playGround = PlayGround()

    return render(request, "TrainGame.html", {"dd": 3})

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
            return redirect(reverse('trains:beginOfGAme'))
        else:
            print(form.errors)
    return render(request, 'log_in.html', {'form': form})


def log_out(request):
    logout(request)
    return redirect(reverse('trains:log_in'))


def sign_up(request):
    form = UserCreationForm()
    if request.method == 'POST':
        form = UserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            return redirect('trains:log_in')
        else:
            print(form.errors)
    return render(request, "sign_up.html", {"form": form})
    # return render(request, "TrainGame.html", {"dd": 3})