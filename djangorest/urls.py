from django.conf.urls import include, url
from .views import (
    UserViewSet,
    GroupViewSet,
    single_dot,
    single_dot2,
)
urlpatterns = [
	url(r'^$', UserViewSet.as_view(), name='us_list'),
    url(r'^single_dot/', single_dot, name='single_dot'),
    url(r'^single_dot2/', single_dot2, name='single_dot'),
]