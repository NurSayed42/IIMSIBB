

# # serializers.py
# from rest_framework import serializers
# from .models import CustomUser, Inspection, NewInspection
# from django.contrib.auth.password_validation import validate_password

# # New Inspection Serializer
# class NewInspectionSerializer(serializers.ModelSerializer):
#     assigned_inspector_name = serializers.CharField(source='assigned_inspector.user_name', read_only=True)
    
#     class Meta:
#         model = NewInspection
#         fields = [
#             'id',
#             'project',
#             'client_name',
#             'industry_name', 
#             'phone_number',
#             'assigned_inspector',
#             'branch_name',
#             'status',
#             'created_at',
#             'updated_at',
#             'assigned_inspector_name'
#         ]
#         read_only_fields = ['id', 'created_at', 'updated_at']

#     def validate_assigned_inspector(self, value):
#         # Check if the assigned user is actually an inspector
#         if value.role != 'inspector':
#             raise serializers.ValidationError("The assigned user must be an inspector.")
#         return value

# class InspectionSerializer(serializers.ModelSerializer):
#     inspector_name = serializers.CharField(source='inspector.username', read_only=True)
#     inspector_id = serializers.IntegerField(source='inspector.id', read_only=True)
#     location_summary = serializers.SerializerMethodField()
#     first_location = serializers.SerializerMethodField()
#     last_location = serializers.SerializerMethodField()
    
#     class Meta:
#         model = Inspection
#         fields = '__all__'
#         read_only_fields = ('inspector', 'created_at', 'updated_at')
    
#     def get_location_summary(self, obj):
#         return obj.get_location_summary()
    
#     def get_first_location(self, obj):
#         return obj.get_first_location()
    
#     def get_last_location(self, obj):
#         return obj.get_last_location()

# class InspectionCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Inspection
#         exclude = ('inspector',)
        
#     def create(self, validated_data):
#         # Automatically set the inspector from request user
#         validated_data['inspector'] = self.context['request'].user
#         return super().create(validated_data)

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CustomUser
#         fields = ['id','user_name','email','employee_id','branch_name','role','is_active']

# class UserCreateSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
#     class Meta:
#         model = CustomUser
#         fields = ['id','user_name','email','password','employee_id','branch_name','role']

#     def create(self, validated_data):
#         password = validated_data.pop('password')
#         user = CustomUser(**validated_data)
#         user.set_password(password)
#         user.save()
#         return user

# class PasswordResetSerializer(serializers.Serializer):
#     email = serializers.EmailField()

# class PasswordResetConfirmSerializer(serializers.Serializer):
#     uid = serializers.CharField()
#     token = serializers.CharField()
#     new_password = serializers.CharField()



# serializers.py - FIXED VERSION
from rest_framework import serializers
from .models import CustomUser, Inspection, NewInspection
from django.contrib.auth.password_validation import validate_password
import json

# New Inspection Serializer
class NewInspectionSerializer(serializers.ModelSerializer):
    assigned_inspector_name = serializers.CharField(source='assigned_inspector.user_name', read_only=True)
    
    class Meta:
        model = NewInspection
        fields = [
            'id',
            'project',
            'client_name',
            'industry_name', 
            'phone_number',
            'assigned_inspector',
            'branch_name',
            'status',
            'created_at',
            'updated_at',
            'assigned_inspector_name'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_assigned_inspector(self, value):
        # Check if the assigned user is actually an inspector
        if value.role != 'inspector':
            raise serializers.ValidationError("The assigned user must be an inspector.")
        return value

class InspectionSerializer(serializers.ModelSerializer):
    inspector_name = serializers.CharField(source='inspector.username', read_only=True)
    inspector_id = serializers.IntegerField(source='inspector.id', read_only=True)
    location_summary = serializers.SerializerMethodField()
    first_location = serializers.SerializerMethodField()
    last_location = serializers.SerializerMethodField()
    
    class Meta:
        model = Inspection
        fields = '__all__'
        read_only_fields = ('inspector', 'created_at', 'updated_at')
    
    def get_location_summary(self, obj):
        return obj.get_location_summary()
    
    def get_first_location(self, obj):
        return obj.get_first_location()
    
    def get_last_location(self, obj):
        return obj.get_last_location()

class InspectionCreateSerializer(serializers.ModelSerializer):
    # Add calculated fields as read-only - they won't be passed to create()
    current_assets_subtotal = serializers.FloatField(read_only=True)
    fixed_assets_subtotal = serializers.FloatField(read_only=True)
    total_assets = serializers.FloatField(read_only=True)
    current_liabilities_subtotal = serializers.FloatField(read_only=True)
    total_liabilities = serializers.FloatField(read_only=True)
    total_equity = serializers.FloatField(read_only=True)
    grand_total = serializers.FloatField(read_only=True)
    net_worth = serializers.FloatField(read_only=True)
    submitted_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Inspection
        exclude = ('inspector',)
        
    def create(self, validated_data):
        # Remove calculated fields that aren't in the model
        calculated_fields = [
            'current_assets_subtotal', 'fixed_assets_subtotal', 'total_assets',
            'current_liabilities_subtotal', 'total_liabilities', 'total_equity',
            'grand_total', 'net_worth', 'submitted_at'
        ]
        
        # Filter out calculated fields
        data = {k: v for k, v in validated_data.items() if k not in calculated_fields}
        
        # Convert JSON fields to strings if they're lists/dicts
        json_fields = [
            'partners_directors', 'competitors', 'key_employees', 
            'working_capital_items', 'checklist_items', 'location_points',
            'site_photos', 'site_video', 'uploaded_documents'
        ]
        
        for field in json_fields:
            if field in data and data[field] is not None:
                if isinstance(data[field], (list, dict)):
                    data[field] = json.dumps(data[field])
        
        # Automatically set the inspector from request user
        data['inspector'] = self.context['request'].user
        
        return super().create(data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id','user_name','email','employee_id','branch_name','role','is_active']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    class Meta:
        model = CustomUser
        fields = ['id','user_name','email','password','employee_id','branch_name','role']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField()