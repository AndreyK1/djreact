from django.contrib import admin
from django.conf.urls import include, url
# from ../../poster import views

from .views import (
	post_list,
)
urlpatterns = [
	url(r'^$', post_list, name='list'),
]