# Generated by Django 4.0.3 on 2022-12-08 22:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0011_automobilevo_model'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='manufacturer',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
