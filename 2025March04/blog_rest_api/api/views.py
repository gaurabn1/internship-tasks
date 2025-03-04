from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework import viewsets
from rest_framework.pagination import LimitOffsetPagination
from django_filters.rest_framework import DjangoFilterBackend
from api.serializers import BlogSerializer, UserSignupSerializer, LoginSerializer, CategorySerializer
from api.models import Blog, CustomUser, Category

###### ModelViewSet #################
class BlogViewSet(viewsets.ModelViewSet):
    queryset = Blog.objects.all()
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['author', 'category', 'title']
    pagination_class = LimitOffsetPagination


class SignupView(generics.CreateAPIView):
    serializer_class = UserSignupSerializer
    queryset = CustomUser.objects.all()

class LoginView(generics.CreateAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        access_token = serializer.validated_data['access_token']
        return Response({'message': 'Login successful', 'email': user.email, 'access_token': access_token}, status=status.HTTP_201_CREATED)


# ModelViewSet
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    # permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['name']
