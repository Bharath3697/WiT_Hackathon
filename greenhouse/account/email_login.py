# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.contrib.auth.backends import ModelBackend, UserModel
from django.db.models import Q
from django.core.exceptions import MultipleObjectsReturned
from django.contrib.auth import (authenticate, login, logout, get_user_model)

User = get_user_model()


class LoginBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        try:
            user = UserModel.objects.get(
                Q(username__iexact=username) | Q(email__iexact=username))
        except UserModel.DoesNotExist:
            UserModel().set_password(password)
        except MultipleObjectsReturned:
            return User.objects.filter(email=username).order_by('id').first()
        else:
            if user.check_password(password) and self.user_can_authenticate(user):
                return user

    def get_user(self, user_id):
        try:
            user = UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None

        return user if self.user_can_authenticate(user) else None
