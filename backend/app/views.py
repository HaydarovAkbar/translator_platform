from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Application, ApplicationTarget, ApplicationResponse
from .serializers import (
    ApplicationSerializer, ApplicationCreateSerializer,
    ApplicationTargetSerializer, OrganizationSerializer, ApplicationResponseSerializer
)

from rest_framework.views import APIView
from django.db.models import Count
from django.utils import timezone
from datetime import timedelta
from account.models import Organization, User
from rest_framework.permissions import IsAuthenticated


class ApplicationViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Application.objects.all().select_related('created_by')
    serializer_class = ApplicationSerializer

    def get_serializer_class(self):
        if self.action == 'create':
            return ApplicationCreateSerializer
        return ApplicationSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ApplicationTargetViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ApplicationTarget.objects.select_related('application', 'organization')
    serializer_class = ApplicationTargetSerializer


class ApplicationResponseViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ApplicationResponse.objects.select_related('target', 'responder')
    serializer_class = ApplicationResponseSerializer

    def perform_create(self, serializer):
        serializer.save(responder=self.request.user)


class OrganizationViewSet(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


class DashboardStatsAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        total_apps = Application.objects.count()

        status_counts = (
            ApplicationTarget.objects
            .values('status')
            .annotate(count=Count('id'))
        )

        today = timezone.now().date()
        week_ago = today - timedelta(days=6)

        login_activity = (
            User.objects.filter(last_login__date__gte=week_ago)
            .extra(select={'day': "DATE(last_login)"})
            .values('day')
            .annotate(count=Count('id'))
            .order_by('day')
        )

        return Response({
            "total_applications": total_apps,
            "status_distribution": list(status_counts),
            "login_activity": list(login_activity),
        })
