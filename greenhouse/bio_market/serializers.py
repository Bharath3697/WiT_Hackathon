# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.db.models import F
import json
from django.forms.models import model_to_dict
from rest_framework import serializers
from .models import item, topic, comment, donation, job
import random
from account.models import Account
from django.contrib.auth import get_user_model
from collections import OrderedDict
from rest_framework.exceptions import ValidationError
User = get_user_model()


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'phone_number', 'email')


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username', 'phone_number', 'email')
        read_only_fields = ('phone_number', 'email', 'id', 'username')


class ItemSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = item
        fields = ('user', 'id', 'item_name', 'location',
                  'quantity', 'amount', 'created_at', 'metric', 'op_type')
        depth = 2
        read_only_fields = ('user',)

    def to_internal_value(self, data):
        request = self.context.get('request', None)
        instance = super(ItemSerializer, self).to_internal_value(data)
        instance['user'] = User.objects.get(username=request.user)
        return instance


class DonationSerializer(serializers.ModelSerializer):
    donation_user = UserSerializer(read_only=True)

    class Meta:
        model = donation
        fields = ('donation_user', 'id', 'donation_item_name', 'donation_location',
                  'created_at')
        depth = 2
        read_only_fields = ('donation_user',)

    def to_internal_value(self, data):
        request = self.context.get('request', None)
        instance = super(DonationSerializer, self).to_internal_value(data)
        instance['donation_user'] = User.objects.get(
            username=request.user)
        return instance


class JobSerializer(serializers.ModelSerializer):
    job_user = UserSerializer(read_only=True)

    class Meta:
        model = job
        fields = ('job_user', 'id', 'looking_for', 'sector', 'job_location', 'res_comments',
                  'created_at')
        depth = 2
        read_only_fields = ('job_user',)

    def to_internal_value(self, data):
        request = self.context.get('request', None)
        instance = super(JobSerializer, self).to_internal_value(data)
        instance['job_user'] = User.objects.get(
            username=request.user)
        return instance


class UserSerializer1(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = ('id', 'username')
        read_only_fields = ('id', 'username')


class CommentSerializer(serializers.ModelSerializer):
    comment_user = UserSerializer1(read_only=True)

    class Meta:
        model = comment
        fields = ('id', 'topic', 'comment', 'date_created', "comment_user")

    def validate_topic(self, value):
        if self.instance and self.instance.topic != value:
            raise ValidationError("You cannot edit topic value")
        return value

    def to_internal_value(self, data):
        request = self.context.get('request', None)
        instance = super(CommentSerializer, self).to_internal_value(data)
        instance['comment_user'] = User.objects.get(username=request.user)
        return instance


class TopicSerializer(serializers.ModelSerializer):
    topic_user = UserSerializer1(read_only=True)

    class Meta:
        model = topic
        fields = ('id', 'topic', 'date_created', 'description', 'topic_user')
        depth = 2

    def to_internal_value(self, data):
        request = self.context.get('request', None)
        instance = super(TopicSerializer, self).to_internal_value(data)
        instance['topic_user'] = User.objects.get(username=request.user)
        return instance

    def to_representation(self, instance):
        ret = super(TopicSerializer, self).to_representation(instance)
        fields = tuple(x.name for x in comment._meta.get_fields()
                       if x.name not in ['topic'])
        comments = comment.objects.filter(
            topic=instance)
        comments1 = comments.values(
            *fields, comment_username=F("comment_user__username"))
        comments1 = list(comments1)
        ret["discussion"] = comments1
        return ret
