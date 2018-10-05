from django.contrib.auth.models import User, Group
from  poster.models  import Poster
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from .serializers import PosterSerializer, GroupSerializer
from django.http import JsonResponse


from django.shortcuts import render
from . models import SingletonDot, SingletonDot2


class UserViewSet(ListAPIView):
    """
    API endpoint that allows users to be viewed or edited.
    """
    # queryset = User.objects.all().order_by('-date_joined')
    queryset = Poster.objects.all()
    serializer_class = PosterSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

def single_dot(request):
    model = SingletonDot()
    md2 = SingletonDot2()
    md2.increase();
    # template_name = 'post_detail.html'
    return render(request, "SingleDot.html", {"dd": 3, "sdot" : model["dot"], "ffff" : md2.doter })

# class SingleDot2(APIView):
#     md2 = SingletonDot2()
#     md2.increase()
#     def get(self, request):
#         return JsonResponse({"ffff" : md2.doter})

def single_dot2(request):
    md2 = SingletonDot2()
    md2.increase()
    return JsonResponse({"ffff" : md2.doter})