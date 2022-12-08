# Generated by Django 4.0.3 on 2022-12-07 23:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sales_rest', '0007_automobilevo_import_href'),
    ]

    operations = [
        migrations.AddField(
            model_name='automobilevo',
            name='color',
            field=models.CharField(max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='status',
            field=models.CharField(choices=[('sold', 'sold'), ('available', 'available')], default='available', max_length=100),
        ),
        migrations.AddField(
            model_name='automobilevo',
            name='year',
            field=models.PositiveSmallIntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='salesrecord',
            name='automobile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.automobilevo'),
        ),
        migrations.AlterField(
            model_name='salesrecord',
            name='sales_customer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.salescustomer'),
        ),
        migrations.AlterField(
            model_name='salesrecord',
            name='sales_person',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sales', to='sales_rest.salesperson'),
        ),
    ]