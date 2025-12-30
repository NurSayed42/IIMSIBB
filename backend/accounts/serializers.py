

# # serializers.py - FIXED VERSION
# from rest_framework import serializers
# from .models import CustomUser, Inspection, NewInspection
# from django.contrib.auth.password_validation import validate_password
# import json

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
#     # Add calculated fields as read-only - they won't be passed to create()
#     current_assets_subtotal = serializers.FloatField(read_only=True)
#     fixed_assets_subtotal = serializers.FloatField(read_only=True)
#     total_assets = serializers.FloatField(read_only=True)
#     current_liabilities_subtotal = serializers.FloatField(read_only=True)
#     total_liabilities = serializers.FloatField(read_only=True)
#     total_equity = serializers.FloatField(read_only=True)
#     grand_total = serializers.FloatField(read_only=True)
#     net_worth = serializers.FloatField(read_only=True)
#     submitted_at = serializers.DateTimeField(read_only=True)
    
#     class Meta:
#         model = Inspection
#         exclude = ('inspector',)
        
#     def create(self, validated_data):
#         # Remove calculated fields that aren't in the model
#         calculated_fields = [
#             'current_assets_subtotal', 'fixed_assets_subtotal', 'total_assets',
#             'current_liabilities_subtotal', 'total_liabilities', 'total_equity',
#             'grand_total', 'net_worth', 'submitted_at'
#         ]
        
#         # Filter out calculated fields
#         data = {k: v for k, v in validated_data.items() if k not in calculated_fields}
        
#         # Convert JSON fields to strings if they're lists/dicts
#         json_fields = [
#             'partners_directors', 'competitors', 'key_employees', 
#             'working_capital_items', 'checklist_items', 'location_points',
#             'site_photos', 'site_video', 'uploaded_documents'
#         ]
        
#         for field in json_fields:
#             if field in data and data[field] is not None:
#                 if isinstance(data[field], (list, dict)):
#                     data[field] = json.dumps(data[field])
        
#         # Automatically set the inspector from request user
#         data['inspector'] = self.context['request'].user
        
#         return super().create(data)

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
















# serializers.py - COMPLETE FIXED VERSION
from rest_framework import serializers
from .models import CustomUser, Inspection, NewInspection
from django.contrib.auth.password_validation import validate_password
import json

# New Inspection Serializer
class NewInspectionSerializer(serializers.ModelSerializer):
    assigned_inspector_name = serializers.CharField(source='assigned_inspector.user_name', read_only=True)
    
    class Meta:
        model = NewInspection
        fields = '__all__'
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
    
    def to_representation(self, instance):
        """Convert database representation to API response"""
        representation = super().to_representation(instance)
        
        # Parse JSON fields from database
        json_fields = [
            'partners_directors', 'competitors', 'key_employees',
            'working_capital_items', 'checklist_items', 'location_points',
            'site_photos', 'site_video', 'uploaded_documents'
        ]
        
        for field in json_fields:
            if field in representation and representation[field]:
                try:
                    if isinstance(representation[field], str):
                        representation[field] = json.loads(representation[field])
                except (json.JSONDecodeError, TypeError):
                    # If it's already a dict/list or invalid, keep as is
                    pass
        
        return representation

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
        fields = '__all__'
        read_only_fields = ('inspector', 'created_at', 'updated_at')
    
    def validate(self, data):
        """Global validation"""
        # Ensure status is correct
        if 'status' in data and data['status'].lower() == 'completed':
            data['status'] = 'Completed'  # Capitalize
        
        # Handle site_video field
        if 'site_video' in data and data['site_video'] is not None:
            if isinstance(data['site_video'], dict):
                # Convert dict to JSON string for TextField
                try:
                    data['site_video'] = json.dumps(data['site_video'])
                except (TypeError, ValueError) as e:
                    raise serializers.ValidationError({
                        'site_video': f'Could not serialize video data: {str(e)}'
                    })
        
        return data
    
    def validate_site_video(self, value):
        """Custom validation for site_video field"""
        if value is None:
            return value
        
        # Accept both string (JSON) and dict
        if isinstance(value, str):
            try:
                # Try to parse to validate it's valid JSON
                json.loads(value)
                return value
            except json.JSONDecodeError:
                raise serializers.ValidationError('site_video must be valid JSON string')
        elif isinstance(value, dict):
            # Convert dict to JSON string
            try:
                return json.dumps(value)
            except (TypeError, ValueError) as e:
                raise serializers.ValidationError(f'Could not serialize video data: {str(e)}')
        else:
            raise serializers.ValidationError('site_video must be either a dict or JSON string')
    
    def create(self, validated_data):
        # Ensure inspector is set
        validated_data['inspector'] = self.context['request'].user
        
        # Handle JSON fields
        json_fields = [
            'partners_directors', 'competitors', 'key_employees',
            'working_capital_items', 'checklist_items', 'location_points',
            'site_photos', 'uploaded_documents'
        ]
        
        for field in json_fields:
            if field in validated_data and validated_data[field] is not None:
                if isinstance(validated_data[field], (list, dict)):
                    validated_data[field] = json.dumps(validated_data[field])
        
        # site_video already handled in validate_site_video
        
        # Create the inspection
        inspection = Inspection.objects.create(**validated_data)
        return inspection
    
    def update(self, instance, validated_data):
        # Handle JSON fields during update
        json_fields = [
            'partners_directors', 'competitors', 'key_employees',
            'working_capital_items', 'checklist_items', 'location_points',
            'site_photos', 'site_video', 'uploaded_documents'
        ]
        
        for field in json_fields:
            if field in validated_data:
                value = validated_data[field]
                if value is None:
                    setattr(instance, field, None)
                elif isinstance(value, (list, dict)):
                    setattr(instance, field, json.dumps(value))
                else:
                    setattr(instance, field, value)
                validated_data.pop(field, None)
        
        # Update other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        
        instance.save()
        return instance

# ✅ NEW: Special serializer for video upload only
class InspectionVideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inspection
        fields = ['site_video']
    
    def validate_site_video(self, value):
        """Validate video data - limit size"""
        if value and isinstance(value, dict):
            # Check base64 data size (approx 1.33x of original)
            base64_data = value.get('base64_data', '')
            if len(base64_data) > 10000000:  # ~7.5MB video
                raise serializers.ValidationError(
                    'Video too large. Maximum 7MB video recommended.'
                )
        return value

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'user_name', 'email', 'employee_id', 'branch_name', 'role', 'is_active']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    
    class Meta:
        model = CustomUser
        fields = ['id', 'user_name', 'email', 'password', 'employee_id', 'branch_name', 'role']
    
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