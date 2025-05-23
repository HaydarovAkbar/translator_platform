from rest_framework.routers import DefaultRouter
from .views import (
    ApplicationViewSet, ApplicationTargetViewSet,
    ApplicationResponseViewSet, OrganizationViewSet, DashboardStatsAPIView, ApplicationListAPIView,
    ApplicationCreateAPIView
)
from django.urls import path

router = DefaultRouter()
router.register('applications', ApplicationViewSet)
router.register('application-targets', ApplicationTargetViewSet)
router.register('application-responses', ApplicationResponseViewSet)
router.register('organizations', OrganizationViewSet)

urlpatterns = router.urls

urlpatterns += [
    path('documents/', ApplicationListAPIView.as_view(), name='application-list'),
    path('dashboard/stats/', DashboardStatsAPIView.as_view(), name='dashboard-stats'),
    path('documents/create/', ApplicationCreateAPIView.as_view(), name='application-create'),
]
