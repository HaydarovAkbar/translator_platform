from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


class LoginApiView(TokenObtainPairView):
    """Login + Token returning with extra user info"""

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({'message': 'Username and password are required'}, status=400)

        user = authenticate(username=username, password=password)
        if user is not None:
            if not user.is_active:
                return Response({'message': 'User is inactive'}, status=403)

            refresh = RefreshToken.for_user(user)

            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'is_active': user.is_active,
                'full_name': f"{user.first_name} {user.last_name}",
                'is_staff': user.is_staff,
                'is_superuser': user.is_superuser,
                'uuid': str(user.uuid),
                'groups': [group.name for group in user.groups.all()],
                'permissions': [perm.codename for group in user.groups.all() for perm in group.permissions.all()]
            }, status=200)
        else:
            return Response({'message': 'Login or password is incorrect'}, status=401)


class LogoutApiView(APIView):
    """Foydalanuvchini logout qilish (refresh tokenni blacklistga yuboradi)"""
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh")

        if not refresh_token:
            return Response({"message": "Refresh token required"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response({"message": "Foydalanuvchi chiqdi"}, status=status.HTTP_205_RESET_CONTENT)

        except TokenError:
            return Response({"message": "Noto‘g‘ri yoki eskirgan token"}, status=status.HTTP_400_BAD_REQUEST)
