# Generated by Django 4.2.4 on 2023-08-14 06:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0004_alter_member_memberid'),
    ]

    operations = [
        migrations.AddField(
            model_name='transaction',
            name='total_amount',
            field=models.IntegerField(null=True),
        ),
    ]