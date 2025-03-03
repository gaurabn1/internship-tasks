
from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name="index"),
    path('blogs/', blogs, name="blogs"),
    path('blog-detail/<int:id>/', blog_detail, name="blog_detail"),
    path('blog/<int:id>/delete/', blog_delete, name="blog_delete"),
    path('blog/<int:id>/edit/', blog_edit, name="blog_edit"),
    path('blog/create/', blog_create, name="blog_create"),
    path('login/', login_user, name="login_user"),
    path('signup/', signup_user, name="signup_user"),
    path('logout/', logout_user, name="logout_user"),
    path('activate/<int:id>/', activate, name="activate"),
]
