# Generated by Django 4.0.3 on 2022-12-07 20:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0005_alter_salesrecord_sale_price'),
    ]

    operations = [
        migrations.RenameField(
            model_name='salesrecord',
            old_name='customer',
            new_name='sales_customer',
        ),
    ]
