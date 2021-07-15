# Author  - Bharath.K (bharatk7@in.ibm.com)
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import generics, status
from django.utils import timezone
from rest_framework import exceptions
from django.contrib.auth import (authenticate, login, logout, get_user_model)
from rest_framework.authtoken.models import Token
from collections import OrderedDict
from .authentications import token_expire_handler
from django.db.models import F, Q
from datetime import datetime
import dateutil.parser

User = get_user_model()


class userSerializer1(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username',)

    def to_representation(self, instance):
        return instance.username


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(write_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    username = serializers.CharField(max_length=255, read_only=True)
    token = serializers.CharField(max_length=255, read_only=True)

    def validate(self, data, **kwargs):
        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError(
                'Email address is required to log in.'
            )
        if password is None:
            raise serializers.ValidationError(
                'Password is required to log in.'
            )

        user = authenticate(username=email, password=password)
        if user is None:
            raise serializers.ValidationError(
                'Invalid credentials'
            )

        if not user.is_active:
            raise serializers.ValidationError(
                'This user has been deactivated.'
            )
        if user is not None:
            try:
                token = Token.objects.get(user=user or None)
            except:
                token = None
            if token is not None:
                if token_expire_handler(token):
                    token.delete()
                    token = Token.objects.create(user=user)
            else:
                token = Token.objects.create(user=user)
            update = {"token": token}
            data.update(update)
        return data


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'phone_number')
        extra_kwargs = {'password': {'write_only': True, 'min_length': 8}}

    def create(self, validated_data):
        username = validated_data['username']
        email = validated_data['email']
        phone_number = validated_data['phone_number']
        user_exists = User.objects.filter(username=username).exists()
        if user_exists:
            raise serializers.ValidationError('Username already taken')
        email_exists = User.objects.filter(email=email).exists()
        if email_exists:
            raise serializers.ValidationError('Email already registered')
        phone_exists = User.objects.filter(phone_number=phone_number).exists()
        if phone_exists:
            raise serializers.ValidationError(
                'Phone number already registered')
        user = User.objects.create(
            username=username,
            email=email,
            phone_number=phone_number)
        user.set_password(validated_data['password'])
        user.save()
        return user

    def to_representation(self, instance):
        response = {
            'status': 'success',
            'code': status.HTTP_200_OK,
            'message': 'User registered successfully',
            'data': [
                {'username': instance.username,
                 'email': instance.email
                 }
            ]}
        return response
