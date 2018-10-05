from django.contrib.auth.models import User, Group
from  poster.models  import Poster
from rest_framework import serializers


class PosterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poster
        fields = ('title', 'text')


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('url', 'name')