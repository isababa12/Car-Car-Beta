# Generated by Django 4.0.3 on 2022-12-07 20:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0004_alter_salescustomer_address'),
    ]

    operations = [
        migrations.AlterField(
            model_name='salesrecord',
            name='sale_price',
            field=models.PositiveIntegerField(),
        ),
    ]
