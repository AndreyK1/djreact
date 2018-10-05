from django.shortcuts import render
from django.views.generic import ListView, DetailView
from . models import Poster


def post_list(request):
    model = Poster
    # template_name = 'post_detail.html'
    return render(request, "post_detail.html", {})
