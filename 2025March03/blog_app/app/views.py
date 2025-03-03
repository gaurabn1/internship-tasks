from django.http import Http404
from django.shortcuts import render, redirect
from app.forms import BlogFormRaw, LoginForm, SignupForm
from app.models import Category, Blog, CustomUser
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages


from django.db import connection
from django.conf import settings
from django.core.files.storage import default_storage
import os

def activate(request, id):
    user = CustomUser.objects.get(id=id)
    user.is_active = True
    user.save()
    messages.success(request, 'Your account has been activated')
    return redirect('login_user')

@login_required
def index(request):
    return render(request, 'app/index.html')

def signup_user(request):
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            username = form.cleaned_data.get('username')
            user = CustomUser.objects.create_user(email=email, username=username, password=password)
            if user:
                return redirect('login_user')
    else:
        form = SignupForm()
        return render(request, 'app/signup.html', {'form': form})

def login_user(request):
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('email')
            password = form.cleaned_data.get('password')
            user = authenticate(request, email=email, password=password)
            if user is not None:
                login(request, user)
                return redirect('index')
            else:
                return render(request, 'app/login.html', {'form': form, 'error': 'Invalid email or password'})
    else:
        form = LoginForm()
        return render(request, 'app/login.html', {'form': form})

def logout_user(request):
    logout(request)
    return redirect('index')


# helper function to fetch data in dictionary
def dictfetchall(cursor):
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row)) for row in cursor.fetchall()
    ]

@login_required
def blogs(request):
    selected_category = request.GET.get('categories')
    cursor = connection.cursor()
    if selected_category:
        # blogs = Blog.objects.filter(category__name=selected_category)
        cursor.execute(f"SELECT * FROM app_blog WHERE category_id IN (SELECT id from app_category WHERE name ='{selected_category}')")
        blogs = dictfetchall(cursor)
    else:
        # blogs = Blog.objects.all()
        cursor.execute("SELECT * FROM app_blog")
        blogs = dictfetchall(cursor)

    for blog in blogs:
        if blog.get('image'):
            blog['image_url'] = settings.MEDIA_URL + blog['image']

    context = {
        'blogs' : blogs,
        'categories': Category.objects.all()
    }
    return render(request, 'app/blogs.html', context)

@login_required
def blog_detail(request, id):
    cursor = connection.cursor()
    try:
        # blog = Blog.objects.get(id=id)
        cursor.execute('SELECT * FROM app_blog WHERE id=%s', [id])
        blog = dictfetchall(cursor)[0]
    except Blog.DoesNotExist:
        raise Http404
    # categories = Category.objects.all()
    cursor.execute('SELECT * FROM app_category')
    categories = dictfetchall(cursor)
    return render(request, 'app/blog_detail.html', {'blog': blog, 'categories': categories})

@login_required
def blog_delete(request, id):
    cursor = connection.cursor()
    # try:
        # blog = Blog.objects.get(id=id, author=request.user)
    #     blog = cursor.execute('SELECT * FROM app_blog WHERE id = %s AND author=%s', [id, request.user])
    # except Blog.DoesNotExist:
    #     raise Http404
    # # blog.delete()
    cursor.execute('DELETE FROM app_blog WHERE id=%s AND author_id=%s', [id, request.user.id])
    return redirect('blogs')


def save_image(image):
    image_path = None
    if image:
        upload_path = os.path.join('blog_images/', image.name)
        image_path = default_storage.save(upload_path, image)
    return image_path

def blog_edit(request, id):
    cursor = connection.cursor()
    # blog = Blog.objects.get(id=id, author=request.user)
    cursor.execute("SELECT * FROM app_blog WHERE id=%s AND author_id=%s", [id, request.user.id])
    blog_list = dictfetchall(cursor)
    blog = blog_list[0]
    old_image = ''
    if blog['image']:
        old_image = blog['image'].split('/')[1]
    if request.method == 'POST':
        form = BlogFormRaw(request.POST, request.FILES)
        if form.is_valid():
            title = form.cleaned_data.get('title')
            content = form.cleaned_data.get('content')
            category = form.cleaned_data.get('category').id
            cursor.execute("UPDATE app_blog SET title=%s, content=%s, category_id=%s, updated_at=NOW() WHERE id=%s", [title, content, category, id])
            # print(form.cleaned_data.get('image'))
            # form_data = form.save(commit=False)
            # form_data.save()
            return redirect('blog_detail', id)
    else:
        category = Category.objects.get(id=blog['category_id'])
        form = BlogFormRaw(initial={
            'title': blog.get('title'),
            'content': blog['content'],
            'category': category,
        })
        return render(request, 'app/blog_edit.html', {'form': form, 'blog': blog, 'image_url': blog['image']})




@login_required
def blog_create(request):
    if request.method == 'POST':
        cursor = connection.cursor()
        form = BlogFormRaw(request.POST, request.FILES)
        if form.is_valid():
            title = form.cleaned_data.get('title')
            content = form.cleaned_data.get('content')
            category = form.cleaned_data.get('category').id
            image = form.cleaned_data.get('image')

            image_path = None
            if image:
                upload_path = os.path.join('blog_images/', image.name)
                image_path = default_storage.save(upload_path, image)


            cursor.execute('INSERT INTO app_blog (title, content, category_id, image, author_id, created_at, updated_at) VALUES (%s, %s, %s, %s, %s, NOW(), NOW())', [title, content, category, image_path, request.user.id])
            return redirect('blogs')
    else:
        form = BlogFormRaw()
    return render(request, 'app/blog_create.html', {'form': form})


# def blog_create(request):
#     if request.method == 'POST':
#         form = BlogForm(request.POST, request.FILES)
#         if form.is_valid():
#             form_data = form.save(commit=False)
#             form_data.author = request.user
#             print(form_data)
#             form_data.save()
#             return redirect('blogs')
#         return render(request, 'app/blog_create.html', {'form': form})
#     else:
#
#         form = BlogForm()
#         return render(request, 'app/blog_create.html', {'form': form})
