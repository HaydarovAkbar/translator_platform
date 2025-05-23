from rest_framework import serializers
from .models import Application, ApplicationTarget, ApplicationResponse
from account.models import User, Organization
import json


class OrganizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Organization
        fields = ['id', 'title', 'attr', 'phone_number', 'address']


class ApplicationTargetSerializer(serializers.ModelSerializer):
    organization = OrganizationSerializer(read_only=True)
    organization_id = serializers.PrimaryKeyRelatedField(
        queryset=Organization.objects.all(),
        source='organization',
        write_only=True
    )

    class Meta:
        model = ApplicationTarget
        fields = ['id', 'organization', 'organization_id', 'status', 'deadline', 'viewed_at', 'created_at']


class ApplicationSerializer(serializers.ModelSerializer):
    # created_by = serializers.StringRelatedField(read_only=True)
    # targets = ApplicationTargetSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'title', 'content', 'document', 'created_at', 'updated_at']  # created_by, targets

    def to_representation(self, instance):
        response = super(ApplicationSerializer, self).to_representation(instance)
        app_target = ApplicationTarget.objects.filter(application=instance.pk)
        response['deadline'] = app_target.last().deadline if app_target.last() else None
        return response


class ApplicationCreateSerializer(serializers.ModelSerializer):
    organizations = serializers.CharField(write_only=True)
    deadline = serializers.DateField(write_only=True)

    class Meta:
        model = Application
        fields = ['title', 'content', 'document', 'organizations', 'deadline']

    def validate_organizations(self, value):
        try:
            org_ids = json.loads(value)
            if not isinstance(org_ids, list):
                raise serializers.ValidationError("Tashkilotlar ro‘yxati noto‘g‘ri formatda.")
            for i in org_ids:
                if not isinstance(i, int):
                    raise serializers.ValidationError("Har bir tashkilot ID raqam bo‘lishi kerak.")
            return org_ids
        except Exception:
            raise serializers.ValidationError("Tashkilotlar JSON ko‘rinishda bo‘lishi kerak.")

    def create(self, validated_data):
        org_ids = validated_data.pop('organizations')
        deadline = validated_data.pop('deadline')
        user = self.context['request'].user
        application = Application.objects.create(created_by=user, **validated_data)

        for org_id in org_ids:
            ApplicationTarget.objects.create(
                application=application,
                organization_id=org_id,
                deadline=deadline
            )
        return application


class ApplicationResponseSerializer(serializers.ModelSerializer):
    responder = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ApplicationResponse
        fields = ['id', 'target', 'responder', 'comment', 'file', 'created_at']
