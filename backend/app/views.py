from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Application, ApplicationTarget, ApplicationResponse
from .serializers import (
    ApplicationSerializer, ApplicationCreateSerializer,
    ApplicationTargetSerializer, OrganizationSerializer, ApplicationResponseSerializer
)
from account.models import Organization
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
