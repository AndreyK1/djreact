"""djreact URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.conf.urls import include, url
from django.urls import path
from notifier.views import HomeView
# from ../../poster import views

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    # url(r'^post/', views.BlogDetailView.as_view(), name='post_detail'),
    url(r'^poster/', include(("poster.urls", "poster"), namespace='posts')),
    url(r'^users/', include(("djangorest.urls", "djangorest"), namespace='users')),
    path('notif/', HomeView.as_view()),
    path('trains/', include(("trainsgame.urls", "djangorest"), namespace='trains')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

# urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# urlpatterns = [
#     url(r'^admin/', admin.site.urls),
#     url(r'^view2/',
#         generic.TemplateView.as_view(template_name='view2.html')),
#     url(r'^$',
#         generic.TemplateView.as_view(template_name='view1.html')),
# ]