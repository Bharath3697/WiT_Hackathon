# Author  - Bharath.K (bharatk7@in.ibm.com)
from rest_framework import permissions
from bio_market.models import item, topic, comment, donation, job
from rest_framework import serializers
from rest_framework.permissions import BasePermission, IsAuthenticated, SAFE_METHODS


class IsOwnerOrReadOnly(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if view.__class__.__name__ == "itemviewset":
            if request.method in SAFE_METHODS:
                return True
            return obj.user == request.user

        if view.__class__.__name__ == "donationviewset":
            if request.method in SAFE_METHODS:
                return True
            return obj.donation_user == request.user

        if view.__class__.__name__ == "jobviewset":
            if request.method in SAFE_METHODS:
                return True
            return obj.job_user == request.user

        if view.__class__.__name__ == "topicviewset":
            if request.method in SAFE_METHODS:
                return True
            return obj.topic_user == request.user

        if view.__class__.__name__ == "commentviewset":
            if request.method in SAFE_METHODS:
                return True
            return obj.comment_user == request.user

    def has_permission(self, request, view):

        if view.__class__.__name__ == "topicviewset":
            if request.method in SAFE_METHODS:
                return True
            if request.method == "POST":
                return True
            try:
                return (self.has_object_permission(request, view,
                                                   topic.objects.get(id=view.kwargs['pk'])))
            except Exception as e:
                raise serializers.ValidationError(e)

        if view.__class__.__name__ == "donationviewset":
            if request.method in SAFE_METHODS:
                return True
            if request.method == "POST":
                return True
            try:
                return (self.has_object_permission(request, view,
                                                   donation.objects.get(id=view.kwargs['pk'])))
            except Exception as e:
                raise serializers.ValidationError(e)

        if view.__class__.__name__ == "jobviewset":
            if request.method in SAFE_METHODS:
                return True
            if request.method == "POST":
                return True
            try:
                return (self.has_object_permission(request, view,
                                                   job.objects.get(id=view.kwargs['pk'])))
            except Exception as e:
                raise serializers.ValidationError(e)

        if view.__class__.__name__ == "commentviewset":
            if request.method in SAFE_METHODS:
                return True
            if request.method == "POST":
                return True
            try:
                return (self.has_object_permission(request, view,
                                                   comment.objects.get(id=view.kwargs['pk'])))
            except Exception as e:
                raise serializers.ValidationError(e)

        return bool(request.user and request.user.is_authenticated)
