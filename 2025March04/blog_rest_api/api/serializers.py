from rest_framework import serializers
from api.models import Blog, CustomUser, Category
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Blog
        fields = ['title', 'content', 'category', 'image']

    def create(self, validated_data):
        user_id = self.context.get('request').user.id
        author = CustomUser.objects.get(id=user_id)
        return Blog.objects.create(author=author, **validated_data)


class UserSignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = CustomUser
        fields = ['email', 'password']

    def create(self, validated_data):
        return CustomUser.objects.create_user(**validated_data)

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    password = serializers.CharField(max_length=100)

    def get_token(self, user):
        token = RefreshToken.for_user(user)
        return str(token.access_token)

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(request=self.context.get('request'), email=email, password=password)
        if user is None:
            raise serializers.ValidationError("Invalid credentials")
        attrs['user'] = user
        attrs['access_token'] =  self.get_token(user)
        return attrs

    
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name']

