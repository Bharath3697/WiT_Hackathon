# Generated by Django 3.1 on 2021-06-17 23:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bio_market', '0006_job_job_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='job_location',
            field=models.CharField(max_length=300),
        ),
    ]
