# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from phonenumber_field.modelfields import PhoneNumberField
from django.db.models.signals import post_save
from django.dispatch import receiver


class AccountManager(BaseUserManager):
    def create_user(self, email, username, phone_number, password=None):
        if not email:
            raise ValueError("Email is required")
        if not username:
            raise ValueError("Username is required")
        if not phone_number:
            raise ValueError("Phone number is required")

        user = self.model(email=self.normalize_email(
            email), username=username, phone_number=phone_number)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, phone_number, password):
        user = self.create_user(email=self.normalize_email(
            email), username=username, phone_number=phone_number, password=password,)
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class Account(AbstractBaseUser):
    phone_number = PhoneNumberField(blank=False, unique=True, null=False)
    email = models.EmailField(verbose_name="email", max_length=60, unique=True)
    username = models.CharField(max_length=30, unique=True)
    date_joined = models.DateField(
        verbose_name="date joined", auto_now_add=True)
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_number']

    objects = AccountManager()

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True


class wallet(models.Model):
    wallet_user = models.ForeignKey(
        Account, on_delete=models.CASCADE, related_name='wallet_user')
    coins = models.IntegerField(blank=False, null=False, default=0)


@receiver(post_save, sender=Account)
def create_wallet(sender, instance, created, **kwargs):
    try:
        if created:
            wallet.objects.create(wallet_user=instance)
    except:
        pass
