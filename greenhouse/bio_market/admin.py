# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.contrib import admin
from .models import item, topic, comment, donation, job
from django.contrib.auth.admin import UserAdmin

admin.site.site_header = 'BIO Market'
admin.site.register(item)
admin.site.register(topic)
admin.site.register(comment)
admin.site.register(donation)
admin.site.register(job)
