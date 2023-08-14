# Generated by Django 4.2.4 on 2023-08-13 10:47

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('bookID', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.TextField(null=True)),
                ('authors', models.CharField(max_length=100, null=True)),
                ('average_rating', models.FloatField(blank=True, default=None, null=True, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(5)])),
                ('isbn13', models.PositiveBigIntegerField(unique=True)),
                ('language_code', models.CharField(max_length=10)),
                ('num_pages', models.IntegerField(blank=True, null=True)),
                ('ratings_count', models.IntegerField(blank=True, null=True)),
                ('text_reviews_count', models.IntegerField(blank=True, null=True)),
                ('publication_date', models.DateField()),
                ('publisher', models.CharField(max_length=255, null=True)),
                ('stock', models.IntegerField(default=0)),
                ('price_per_day', models.IntegerField(default=20)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254, unique=True, validators=[django.core.validators.EmailValidator()])),
                ('memberID', models.CharField(editable=False, max_length=20, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(default=django.utils.timezone.now)),
                ('end_date', models.DateField(null=True)),
                ('price_per_day', models.IntegerField()),
                ('book', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.book')),
                ('member', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.member')),
            ],
        ),
    ]
