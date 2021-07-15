# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.shortcuts import render
from .serializer import LoginSerializer, RegisterSerializer
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.authtoken.models import Token
from rest_framework import exceptions
from rest_framework import serializers
from rest_framework.decorators import api_view
from django.contrib.auth import (authenticate, login, logout, get_user_model)


class LoginAPIView(APIView):
    serializer_class = LoginSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        context = {"request": request}
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data["email"]
            password = serializer.validated_data["password"]
            if request.user.is_authenticated:
                return Response({"message": "You are already logged in"}, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(
                username=email, password=password)
            login(request, user)
            token = serializer.validated_data['token']
            return Response({'user': user.username, 'Token': str(token)}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateUserviewset(viewsets.ModelViewSet):
    queryset = get_user_model().objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def list(self, request, *args, **kwargs):
        return Response({"message": "User registration"})


@api_view(('POST',))
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response({"success": "Successfully logged out."},
                        status=status.HTTP_200_OK)
    except (AttributeError):
        return Response({"error: Unable to logout"}, status=status.HTTP_400_BAD_REQUEST)
