# Generated by Django 4.0.3 on 2022-12-07 00:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesperson',
            name='number',
            field=models.CharField(max_length=4),
        ),
    ]
