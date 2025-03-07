from django.contrib import admin
from .models import *

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class AuthorAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

class BookAdmin(admin.ModelAdmin):
    def get_authors(self, obj):
        return ", ".join([author.name for author in obj.author.all()])
    get_authors.short_description = "Authors"

    list_display = ('id', 'title', 'get_authors', 'category')

class OrderBookInline(admin.TabularInline):
    model = OrderBook
    extra = 1

class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'customer', 'order_date')
    readonly_fields = ('order_date', 'total_amount')
    inlines = [OrderBookInline]


admin.site.register(CustomUser)
admin.site.register(Shipping)
admin.site.register(Customer)
admin.site.register(Review)
admin.site.register(Cart)
admin.site.register(Wishlist)
admin.site.register(OrderBook)
admin.site.register(Order, OrderAdmin)
admin.site.register(Book, BookAdmin)
admin.site.register(Author, AuthorAdmin)
admin.site.register(Category, CategoryAdmin)

