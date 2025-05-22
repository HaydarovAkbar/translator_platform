from rest_framework.routers import DefaultRouter
from .views import (
    ApplicationViewSet, ApplicationTargetViewSet,
    ApplicationResponseViewSet, OrganizationViewSet
)

router = DefaultRouter()
router.register('applications', ApplicationViewSet)
router.register('application-targets', ApplicationTargetViewSet)
router.register('application-responses', ApplicationResponseViewSet)
router.register('organizations', OrganizationViewSet)

urlpatterns = router.urls
