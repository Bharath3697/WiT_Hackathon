# Generated by Django 3.1 on 2021-06-14 21:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('bio_market', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='donation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('donation_item_name', models.CharField(max_length=50)),
                ('donation_location', models.CharField(max_length=300)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('donation_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='donation_users', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
    ]