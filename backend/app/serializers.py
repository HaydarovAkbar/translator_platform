from rest_framework import serializers
from .models import Application, ApplicationTarget, ApplicationResponse
from account.models import User, Organization


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
    created_by = serializers.StringRelatedField(read_only=True)
    targets = ApplicationTargetSerializer(many=True, read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'title', 'content', 'document', 'created_by', 'created_at', 'updated_at', 'targets']


class ApplicationCreateSerializer(serializers.ModelSerializer):
    target_ids = serializers.ListField(
        child=serializers.PrimaryKeyRelatedField(queryset=Organization.objects.all()),
        write_only=True
    )

    class Meta:
        model = Application
        fields = ['title', 'content', 'document', 'target_ids']

    def create(self, validated_data):
        target_orgs = validated_data.pop('target_ids')
        application = Application.objects.create(**validated_data)
        for org in target_orgs:
            ApplicationTarget.objects.create(application=application, organization=org)
        return application


class ApplicationResponseSerializer(serializers.ModelSerializer):
    responder = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = ApplicationResponse
        fields = ['id', 'target', 'responder', 'comment', 'file', 'created_at']
