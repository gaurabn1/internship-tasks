from django.urls import path
from rest_framework.routers import DefaultRouter
from api.views import SignupView, LoginView, BlogViewSet, CategoryViewSet

router = DefaultRouter()
router.register('blogs', BlogViewSet, basename='blog')
router.register('categories', CategoryViewSet, basename='category')

urlpatterns = [
    # Authentication
    path('signup/', SignupView.as_view(), name="signup"),
    path('login/', LoginView.as_view(), name="login"),

] + router.urls
