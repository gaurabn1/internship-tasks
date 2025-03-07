from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import OrderBook, Order

@receiver(post_save, sender=OrderBook)
def update_order_total_amount(sender, instance, **kwargs):
    order = instance.order
    order.total_amount = sum(order_book.get_total_price() for order_book in order.order_books.all())
    order.save()
