# Generated by Django 4.0.3 on 2022-12-07 23:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0008_automobilevo_color_automobilevo_status_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='automobilevo',
            name='status',
        ),
    ]