# Generated by Django 4.1.3 on 2023-04-25 19:23

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('thesearchable', '0006_profile'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='entry',
            name='downloadedUser',
        ),
        migrations.RemoveField(
            model_name='entry',
            name='viewedUsers',
        ),
        migrations.RemoveField(
            model_name='userinfo',
            name='ratedbooks',
        ),
        migrations.AddField(
            model_name='entry',
            name='submittedUser',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='submitteduser', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='entry',
            name='views',
            field=models.ManyToManyField(blank=True, related_name='views', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='userinfo',
            name='submittedentries',
            field=models.ManyToManyField(blank=True, related_name='submittedentries', to='thesearchable.entry'),
        ),
        migrations.AlterField(
            model_name='entry',
            name='entryClassification',
            field=models.ManyToManyField(blank=True, to='thesearchable.classification'),
        ),
        migrations.DeleteModel(
            name='Profile',
        ),
    ]
