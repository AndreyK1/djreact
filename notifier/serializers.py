from rest_framework import serializers

from notifier.models import SingletonDotObj


class SingleSerializer(serializers.Serializer):
    # class Meta:
    #     model = SingletonDotObj
    #     fields = ('doter', 'text')
    doter = serializers.IntegerField()
    text = serializers.CharField(max_length=200)