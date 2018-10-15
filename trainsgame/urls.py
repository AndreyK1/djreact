from django.conf.urls import include, url
from .views import (
    beginOfGAme,
)

urlpatterns = [
	# url(r'^$', UserViewSet.as_view(), name='us_list'),
    # url(r'^trains/', beginOfGAme, name='beginOfGAme'),
    url(r'^$', beginOfGAme, name='beginOfGAme'),
]