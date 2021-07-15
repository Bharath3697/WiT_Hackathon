# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.contrib import admin
from .models import Account, wallet
admin.site.register(Account)
admin.site.register(wallet)
