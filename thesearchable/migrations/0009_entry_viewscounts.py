# Generated by Django 4.1.3 on 2023-04-25 19:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('thesearchable', '0008_entry_favouriteusers'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='viewsCounts',
            field=models.IntegerField(default=0),
        ),
    ]
