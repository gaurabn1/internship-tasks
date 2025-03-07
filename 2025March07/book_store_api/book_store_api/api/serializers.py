from rest_framework import serializers
from rest_framework.fields import MinValueValidator, MaxValueValidator
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *

class CustomUserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    class Meta:
        model = CustomUser
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = CustomUser.objects.filter(email=data['email']).first()
        if user is None:
            raise serializers.ValidationError('User not found')
        if not user.check_password(data['password']):
            raise serializers.ValidationError('Incorrect password')
        return user

class AuthorSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(read_only=True)
    birth_date = serializers.DateField(input_formats=['%Y-%m-%d'])
    class Meta:
        model = Author
        fields = ['id', 'name', 'bio', 'birth_date']

class CategorySerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    description = serializers.CharField(write_only=True)

    def create(self, validated_data):
        return Category.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        return instance
    

class BookSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    isbn = serializers.CharField(max_length=13)
    title = serializers.CharField(max_length=100)
    author = serializers.PrimaryKeyRelatedField(queryset=Author.objects.all(), many=True)
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    price = serializers.DecimalField(max_digits=10, decimal_places=2)
    description = serializers.CharField()
    cover_image = serializers.ImageField()
    published_date = serializers.DateField()

    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['category'] = instance.category.name
        return data

    def create(self, validated_data):
        authors = validated_data.pop('author')
        category = validated_data.pop('category')
        book = Book.objects.create(**validated_data, category=category)
        book.author.set(authors) 
        book.save()
        return book


    def update(self, instance, validated_data):
        instance.isbn = validated_data.get('isbn', instance.isbn)
        instance.title = validated_data.get('title', instance.title)
        instance.category = validated_data.get('category', instance.category)
        instance.price = validated_data.get('price', instance.price)
        instance.description = validated_data.get('description', instance.description)
        instance.cover_image = validated_data.get('cover_image', instance.cover_image)
        instance.published_date = validated_data.get('published_date', instance.published_date)
        instance.author.set(validated_data.get('author', instance.author))
        instance.save()
        return instance

class OrderBookSerializer(serializers.Serializer):
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    quantity = serializers.IntegerField(validators=[MinValueValidator(1)])

    def create(self, validated_data):
        return OrderBook.objects.create(**validated_data)

class OrderSerializer(serializers.Serializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    order_books = OrderBookSerializer(many=True)

    def create(self, validated_data):
        order_books_data = validated_data.pop('order_books')
        order = Order.objects.create(**validated_data)
        for order_book_data in order_books_data:
            order_book_data['order'] = order
            OrderBook.objects.create(**order_book_data)
        return order

class CustomerSerializer(serializers.Serializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    address = serializers.CharField()
    phone_number = serializers.CharField(max_length=20)
    
    def create(self, validated_data):
        return Customer.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.user = validated_data.get('user', instance.user)
        instance.address = validated_data.get('address', instance.address)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.save()
        return instance

class ReviewSerializer(serializers.Serializer):
    book = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all())
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    rating = serializers.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(5)])
    comment = serializers.CharField()
    
    def create(self, validated_data):
        return Review.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.book = validated_data.get('book', instance.book)
        instance.customer = validated_data.get('customer', instance.customer)
        instance.rating = validated_data.get('rating', instance.rating)
        instance.comment = validated_data.get('comment', instance.comment)
        instance.save()
        return instance

class CartSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    books = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), many=True)

    def create(self, validated_data):
        books = validated_data.pop('books')
        cart =  Cart.objects.create(**validated_data)
        cart.books.set(books)
        cart.save()
        return cart

    def update(self, instance, validated_data):
        instance.customer = validated_data.get('customer', instance.customer)
        instance.books.set(validated_data.get('books', instance.books))
        instance.save()
        return instance

class ShippingSerializer(serializers.Serializer):
    order = serializers.PrimaryKeyRelatedField(queryset=Order.objects.all())
    shipping_address = serializers.CharField(max_length=255)

    def create(self, validated_data):
        return Shipping.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.order = validated_data.get('order', instance.order)
        instance.shipping_address = validated_data.get('shipping_address', instance.shipping_address)
        instance.save()
        return instance

class WishlistSerializer(serializers.Serializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=Customer.objects.all())
    books = serializers.PrimaryKeyRelatedField(queryset=Book.objects.all(), many=True)

    def create(self, validated_data):
        books = validated_data.pop('books')
        wishlist = Wishlist.objects.create(**validated_data)
        wishlist.books.set(books)
        wishlist.save()
        return wishlist

    def update(self, instance, validated_data):
        instance.customer = validated_data.get('customer', instance.customer)
        instance.books.set(validated_data.get('books', instance.books))
        instance.save()
        return instance
