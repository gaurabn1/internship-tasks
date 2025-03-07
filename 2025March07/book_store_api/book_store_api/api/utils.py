from rest_framework_simplejwt.tokens import RefreshToken

def get_token(user):
    tokens = RefreshToken.for_user(user)
    if tokens:
        return {
            'refresh': str(tokens),
            'access': str(tokens.access_token)
        }
    else:
        return None
