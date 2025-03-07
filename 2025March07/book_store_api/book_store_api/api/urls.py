from django.urls import path
from .auth import RegisterView, LoginView
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
# Authors
router.register('authors', AuthorView, basename='authors')
router.register('orders', OrderView, basename="orders")
router.register('wishlists', WishlistView, basename="wishlists")
router.register('users', UserView, basename="users")

urlpatterns = [
    # Auth
    path('signup/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),

    # Category
    path('categories/', CategoryListCreateView.as_view(), name='categories'),
    path('categories/<int:id>/', CategoryUpdateDeleteView.as_view(), name='categories_detail'),

    # Book
    path('books/', BookListCreateView.as_view(), name='books'),
    path('books/<int:id>/', BookRetrieveUpdateDeleteView.as_view(), name="book_detail"),

    # Customer
    path('customers/create/', create_customer, name="create_customer"),
    path('customers/', get_customers, name="get_customers"),
    path('customers/<int:id>/', get_customer, name="get_customer"),
    path('customers/<int:id>/update/', update_customer, name="update_customer"),
    path('customers/<int:id>/delete/', delete_customer, name="delete_customer"),

    # Review
    path('reviews/', ReviewListCreateView.as_view(), name="reviews"),
    path('reviews/<int:id>/', ReviewRetrieveUpdateDeleteView.as_view(), name="review_detail"),

    # Cart
    path('carts/', CartListCreateView.as_view(), name="carts"),
    path('carts/<int:id>/', CartRetrieveUpdateDeleteView.as_view(), name="cart_detail"),

    # Shipping
    path('shippings/', ShippingListCreateView.as_view(), name="shippings"),
    path('shippings/<int:id>/', ShippingRetrieveUpdateDeleteView.as_view(), name="shipping_detail"),
] + router.urls
