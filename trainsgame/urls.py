from django.conf.urls import include, url
from .views import (
    beginOfGAme,
    log_in, log_out, sign_up)

urlpatterns = [
	# url(r'^$', UserViewSet.as_view(), name='us_list'),
    # url(r'^trains/', beginOfGAme, name='beginOfGAme'),
    url(r'^$', beginOfGAme, name='beginOfGAme'),
    url(r'^log_in/$', log_in, name='log_in'),
    url(r'^log_out/$', log_out, name='log_out'),
    url(r'^sign_up/$', sign_up, name='sign_up'),
]