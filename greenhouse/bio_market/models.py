# Author  - Bharath.K (bharatk7@in.ibm.com)
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField
from account.models import Account
from django.contrib.auth import get_user_model
User = get_user_model()

metrics = (
    ('Kg', 'Kilogram'),
    ('Q', 'Quintal '),
    ('T', 'Metric Ton')
)

operation = (
    ('S', 'Sell'),
    ('P', 'Purchase'),
)


class item(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='users')
    item_name = models.CharField(max_length=50, blank=False)
    location = models.CharField(max_length=300, blank=False)
    quantity = models.IntegerField(blank=False)
    amount = models.IntegerField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    metric = models.CharField(max_length=20, choices=metrics)
    op_type = models.CharField(max_length=20, choices=operation)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.item_name


class donation(models.Model):
    donation_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='donation_users')
    donation_item_name = models.CharField(max_length=50, blank=False)
    donation_location = models.CharField(max_length=300, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.item_name


class job(models.Model):
    job_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='job_user')
    looking_for = models.CharField(max_length=10, blank=False)
    sector = models.CharField(max_length=20, blank=False)
    job_location = models.CharField(
        max_length=300, blank=False)
    res_comments = models.CharField(max_length=300, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.looking_for


class topic(models.Model):
    topic_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='topic_users')
    topic = models.CharField(max_length=300)
    description = models.CharField(max_length=2000, blank=True)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    class Meta:
        ordering = ['-date_created']

    def __str__(self):
        return str(self.topic)


class comment(models.Model):
    comment_user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='comment_users')
    topic = models.ForeignKey(topic, blank=True, on_delete=models.CASCADE)
    comment = models.CharField(max_length=2000)
    date_created = models.DateTimeField(auto_now_add=True, null=True)

    def __str__(self):
        return str(self.comment)
