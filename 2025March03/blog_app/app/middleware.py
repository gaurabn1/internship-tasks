from app.models import CustomUser
from django.shortcuts import redirect
from django.contrib import messages
from django.core.mail import send_mail

class UserActiveCheckMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        path = request.path
        current_site = request.get_host()
        protocol = request.scheme

        if request.method == 'GET' and path == '/login/':
            return self.get_response(request)

        if request.method == 'POST':
            email = request.POST.get('email')
            if email:
                user = CustomUser.objects.filter(email=email).first()
                if user and not user.is_active:
                    user_id = user.id
                    messages.error(request, 'Your account is not active. Please check your email for activation.')
                    subject = 'Account Activation'
                    message = f'Your account is not active. Please click the link below to activate your account: {protocol}://{current_site}/activate/{user_id}/'
                    from_email = 'sg3541679@gmail.com'
                    recepient_list = [f'{email}']
                    send_mail(subject, message, from_email, recepient_list)
                    return redirect('login_user')
        return self.get_response(request)
