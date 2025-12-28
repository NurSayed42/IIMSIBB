
# # # views.py
# # from rest_framework.views import APIView
# # from django.http import JsonResponse
# # from .models import Inspection, NewInspection
# # from django.contrib.auth.decorators import login_required

# # from django.views.decorators.csrf import csrf_exempt
# # from django.utils.decorators import method_decorator
# # import json
# # from rest_framework import viewsets, status
# # from rest_framework.decorators import action
# # from rest_framework.response import Response
# # from rest_framework.permissions import IsAuthenticated
# # from django_filters.rest_framework import DjangoFilterBackend
# # from .models import Inspection, NewInspection
# # from .serializers import InspectionSerializer, InspectionCreateSerializer, NewInspectionSerializer
# # from rest_framework.response import Response
# # from rest_framework import status, generics
# # from .auth_serializers import CustomTokenObtainSerializer
# # from .serializers import UserCreateSerializer, UserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
# # from .models import CustomUser
# # from django.contrib.auth.tokens import default_token_generator
# # from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# # from django.utils.encoding import force_bytes, force_str
# # from django.core.mail import send_mail
# # from django.conf import settings
# # from rest_framework.permissions import IsAuthenticated
# # from rest_framework.decorators import api_view, permission_classes
# # from rest_framework.permissions import IsAuthenticated
# # from django.contrib.auth.models import User
# # from django.db.models import Count, Q
# # from django.db.models.functions import TruncMonth
# # from django.utils import timezone
# # from datetime import timedelta


# # # JWT Login
# # class CustomTokenObtainView(APIView):
# #     permission_classes = []
# #     def post(self, request):
# #         ser = CustomTokenObtainSerializer(data=request.data)
# #         ser.is_valid(raise_exception=True)
# #         return Response(ser.validated_data)

# # # List/Create users (super admin can create branch admins/inspectors)
# # class UserListCreateView(generics.ListCreateAPIView):
# #     queryset = CustomUser.objects.all()
# #     serializer_class = UserCreateSerializer
# #     permission_classes = [IsAuthenticated]

# # # Forgot password
# # class PasswordResetView(APIView):
# #     permission_classes = []
# #     def post(self, request):
# #         ser = PasswordResetSerializer(data=request.data)
# #         ser.is_valid(raise_exception=True)
# #         email = ser.validated_data['email']
# #         try:
# #             user = CustomUser.objects.get(email=email)
# #         except CustomUser.DoesNotExist:
# #             return Response({'detail': 'If that email exists, a reset link was sent.'})
# #         uid = urlsafe_base64_encode(force_bytes(user.pk))
# #         token = default_token_generator.make_token(user)
# #         reset_url = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
# #         send_mail(
# #             subject='InvestTracker Password Reset',
# #             message=f'Click here to reset your password:\n\n{reset_url}',
# #             from_email=settings.DEFAULT_FROM_EMAIL,
# #             recipient_list=[user.email],
# #         )
# #         return Response({'detail': 'If that email exists, a reset link was sent.'})

# # # Confirm password reset
# # class PasswordResetConfirmView(APIView):
# #     permission_classes = []
# #     def post(self, request):
# #         ser = PasswordResetConfirmSerializer(data=request.data)
# #         ser.is_valid(raise_exception=True)
# #         uid = ser.validated_data['uid']
# #         token = ser.validated_data['token']
# #         new_password = ser.validated_data['new_password']
# #         try:
# #             uid_decoded = force_str(urlsafe_base64_decode(uid))
# #             user = CustomUser.objects.get(pk=uid_decoded)
# #         except Exception:
# #             return Response({'detail':'Invalid uid'}, status=status.HTTP_400_BAD_REQUEST)
# #         if not default_token_generator.check_token(user, token):
# #             return Response({'detail':'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
# #         user.set_password(new_password)
# #         user.save()
# #         return Response({'detail':'Password reset successful'})

# # # -------------------- Role-based CRUD --------------------

# # # Admin creates Branch Admin
# # @api_view(['POST'])
# # def create_branch_admin(request):
# #     data = request.data
# #     data['role'] = 'branch_admin'
# #     serializer = UserCreateSerializer(data=data)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response(serializer.data)
# #     return Response(serializer.errors, status=400)

# # # Admin lists Branch Admins
# # @api_view(['GET'])
# # def list_branch_admins(request):
# #     admins = CustomUser.objects.filter(role='branch_admin')
# #     serializer = UserSerializer(admins, many=True)
# #     return Response(serializer.data)

# # # Branch Admin creates Inspector
# # @api_view(['POST'])
# # def create_inspector(request):
# #     data = request.data
# #     data['role'] = 'inspector'
# #     serializer = UserCreateSerializer(data=data)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response(serializer.data)
# #     return Response(serializer.errors, status=400)

# # # Branch Admin lists Inspectors in his branch
# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def list_inspectors(request):
# #     # logged-in user থেকে branch_name নাও
# #     branch_name = request.user.branch_name

# #     # শুধু ওই branch এর inspectors filter করো
# #     inspectors = CustomUser.objects.filter(role='inspector', branch_name=branch_name)
# #     serializer = UserSerializer(inspectors, many=True)
# #     return Response(serializer.data)

# # # Update user (Branch Admin / Admin)
# # @api_view(['PUT'])
# # def update_user(request, user_id):
# #     try:
# #         user = CustomUser.objects.get(id=user_id)
# #     except CustomUser.DoesNotExist:
# #         return Response({"error":"User not found"}, status=404)
# #     serializer = UserCreateSerializer(user, data=request.data, partial=True)
# #     if serializer.is_valid():
# #         serializer.save()
# #         return Response(serializer.data)
# #     return Response(serializer.errors, status=400)

# # # Delete user (Branch Admin / Admin)
# # @api_view(['DELETE'])
# # def delete_user(request, user_id):
# #     try:
# #         user = CustomUser.objects.get(id=user_id)
# #     except CustomUser.DoesNotExist:
# #         return Response({"error": "User not found"}, status=404)
# #     user.delete()
# #     return Response({"message": "User deleted successfully"})

# # # -------------------- New Inspection Views --------------------

# # @api_view(['POST'])
# # @permission_classes([IsAuthenticated])
# # def create_new_inspection(request):
# #     """
# #     Create a new inspection (for branch admin/admin)
# #     """
# #     try:
# #         # Add debug print to see incoming data
# #         print("📨 Received new inspection creation request:")
# #         print(f"📤 Request data: {request.data}")
# #         print(f"👤 User: {request.user}")
# #         print(f"🎯 User role: {request.user.role}")

# #         # Check if user has permission to create inspections
# #         if request.user.role not in ['admin', 'branch_admin']:
# #             return Response(
# #                 {"error": "You don't have permission to create inspections."},
# #                 status=status.HTTP_403_FORBIDDEN
# #             )

# #         serializer = NewInspectionSerializer(data=request.data)
        
# #         if serializer.is_valid():
# #             print("✅ Serializer is valid")
# #             inspection = serializer.save()
            
# #             # Return the created inspection data
# #             response_serializer = NewInspectionSerializer(inspection)
# #             print(f"✅ New Inspection created successfully: {inspection.id}")
            
# #             return Response(response_serializer.data, status=status.HTTP_201_CREATED)
# #         else:
# #             print("❌ Serializer errors:", serializer.errors)
# #             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
# #     except Exception as e:
# #         print(f"🚨 Error in create_new_inspection: {str(e)}")
# #         return Response(
# #             {"error": f"An error occurred: {str(e)}"},
# #             status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #         )

# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def list_new_inspections(request):
# #     """
# #     List all new inspections (for branch admin/admin and inspectors)
# #     """
# #     try:
# #         # Allow both admin/branch_admin AND inspectors to view
# #         if request.user.role not in ['admin', 'branch_admin', 'inspector']:
# #             return Response(
# #                 {"error": "You don't have permission to view inspections."},
# #                 status=status.HTTP_403_FORBIDDEN
# #             )

# #         # For branch admin, only show inspections from their branch
# #         if request.user.role == 'branch_admin':
# #             inspections = NewInspection.objects.filter(branch_name=request.user.branch_name)
# #         elif request.user.role == 'inspector':
# #             # For inspector, show only inspections assigned to them
# #             inspections = NewInspection.objects.filter(assigned_inspector=request.user)
# #         else:
# #             # For super admin, show all inspections
# #             inspections = NewInspection.objects.all()
        
# #         inspections = inspections.order_by('-created_at')
# #         serializer = NewInspectionSerializer(inspections, many=True)
        
# #         return Response(serializer.data, status=status.HTTP_200_OK)
        
# #     except Exception as e:
# #         print(f"🚨 Error in list_new_inspections: {str(e)}")
# #         return Response(
# #             {"error": f"An error occurred: {str(e)}"},
# #             status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #         )

# # # NEW: Get current user information
# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def get_current_user(request):
# #     """
# #     Get current user information
# #     """
# #     try:
# #         user = request.user
# #         serializer = UserSerializer(user)
# #         return Response(serializer.data, status=status.HTTP_200_OK)
# #     except Exception as e:
# #         return Response(
# #             {"error": f"An error occurred: {str(e)}"},
# #             status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #         )

# # # Inspection ViewSet - EXISTING CODE (NO CHANGES)
# # class InspectionViewSet(viewsets.ModelViewSet):
# #     permission_classes = [IsAuthenticated]
# #     filter_backends = [DjangoFilterBackend]
# #     filterset_fields = ['investment_category', 'status', 'legal_status']
    
# #     def get_queryset(self):
# #         # Users can only see their own inspections
# #         return Inspection.objects.filter(inspector=self.request.user)
    
# #     def get_serializer_class(self):
# #         if self.action == 'create':
# #             return InspectionCreateSerializer
# #         return InspectionSerializer
    
# #     def perform_create(self, serializer):
# #         serializer.save(inspector=self.request.user)
    
# #     @action(detail=False, methods=['get'])
# #     def inspector_wise(self, request):
# #         # Get inspections grouped by inspector
# #         inspectors = CustomUser.objects.filter(
# #             inspections__isnull=False
# #         ).annotate(
# #             total_inspections=Count('inspections')
# #         ).values('id', 'user_name', 'email', 'total_inspections')
        
# #         return Response(inspectors)
    
# #     # NEW METHOD ADDED: Get inspection statistics for current inspector
# #     @action(detail=False, methods=['get'])
# #     def stats(self, request):
# #         """
# #         Get inspection statistics for the logged-in inspector
# #         """
# #         user = request.user
        
# #         try:
# #             # Get total inspections for this inspector
# #             total = Inspection.objects.filter(inspector=user).count()
            
# #             # Get counts by status
# #             pending = Inspection.objects.filter(
# #                 inspector=user, 
# #                 status='Pending'
# #             ).count()
            
# #             in_progress = Inspection.objects.filter(
# #                 inspector=user, 
# #                 status='In Progress'
# #             ).count()
            
# #             completed = Inspection.objects.filter(
# #                 inspector=user, 
# #                 status='Completed'
# #             ).count()
            
# #             approved = Inspection.objects.filter(
# #                 inspector=user, 
# #                 status='Approved'
# #             ).count()
            
# #             rejected = Inspection.objects.filter(
# #                 inspector=user, 
# #                 status='Rejected'
# #             ).count()
            
# #             stats_data = {
# #                 'total': total,
# #                 'pending': pending,
# #                 'in_progress': in_progress,
# #                 'completed': completed,
# #                 'approved': approved,
# #                 'rejected': rejected,
# #             }
            
# #             return Response(stats_data, status=status.HTTP_200_OK)
            
# #         except Exception as e:
# #             return Response(
# #                 {'error': str(e)}, 
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )
    
# #     # NEW METHOD ADDED: Get inspections by status with filtering
# #     @action(detail=False, methods=['get'])
# #     def by_status(self, request):
# #         """
# #         Get inspections filtered by status for the logged-in inspector
# #         """
# #         user = request.user
# #         status_param = request.query_params.get('status', 'all')
        
# #         try:
# #             queryset = Inspection.objects.filter(inspector=user)
            
# #             # Filter by status if provided and not 'all'
# #             if status_param and status_param != 'all':
# #                 queryset = queryset.filter(status=status_param)
            
# #             # Order by latest first
# #             queryset = queryset.order_by('-created_at')
            
# #             # Serialize the data
# #             serializer = InspectionSerializer(queryset, many=True)
            
# #             return Response(serializer.data, status=status.HTTP_200_OK)
            
# #         except Exception as e:
# #             return Response(
# #                 {'error': str(e)}, 
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )
    
# #     # NEW METHOD ADDED: Update inspection status
# #     @action(detail=True, methods=['patch', 'put'])
# #     def update_status(self, request, pk=None):
# #         """
# #         Update inspection status
# #         """
# #         try:
# #             inspection = self.get_object()
# #             new_status = request.data.get('status')
            
# #             if not new_status:
# #                 return Response(
# #                     {'error': 'Status is required'}, 
# #                     status=status.HTTP_400_BAD_REQUEST
# #                 )
            
# #             # Validate status choice
# #             valid_statuses = dict(Inspection.STATUS_CHOICES).keys()
# #             if new_status not in valid_statuses:
# #                 return Response(
# #                     {'error': f'Invalid status. Must be one of: {list(valid_statuses)}'}, 
# #                     status=status.HTTP_400_BAD_REQUEST
# #                 )
            
# #             inspection.status = new_status
# #             inspection.save()
            
# #             serializer = self.get_serializer(inspection)
# #             return Response(serializer.data, status=status.HTTP_200_OK)
            
# #         except Inspection.DoesNotExist:
# #             return Response(
# #                 {'error': 'Inspection not found'}, 
# #                 status=status.HTTP_404_NOT_FOUND
# #             )
# #         except Exception as e:
# #             return Response(
# #                 {'error': str(e)}, 
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )

# # ############get number in admin dashboard

# # def inspection_stats(request):
# #     """Return inspection statistics for dashboard"""
# #     data = {
# #         "all": Inspection.objects.count(),
# #         "pending": Inspection.objects.filter(status="Pending").count(),
# #         "approved": Inspection.objects.filter(status="Approved").count(),
# #         "rejected": Inspection.objects.filter(status="Rejected").count(),
# #     }
# #     return JsonResponse(data)


# # @api_view(['GET'])
# # def branch_admin_stats(request):
# #     branch_name = request.GET.get('branch_name', '')  # read branch_name from query param
# #     if not branch_name:
# #         return Response({"error": "Branch name is required"}, status=400)
    
# #     inspections = Inspection.objects.filter(branch_name=branch_name)
    
# #     stats = {
# #         "all": inspections.count(),
# #         "pending": inspections.filter(status="Pending").count(),
# #         "approved": inspections.filter(status="Approved").count(),
# #         "rejected": inspections.filter(status="Rejected").count(),
# #     }
# #     return Response(stats)

# # @api_view(['GET'])
# # def admin_inspection_stats(request):
# #     """Get inspection statistics specifically for admin dashboard"""
# #     try:
# #         # Get total counts by status
# #         stats = {
# #             "all": Inspection.objects.count(),
# #             "pending": Inspection.objects.filter(status="Pending").count(),
# #             "approved": Inspection.objects.filter(status="Approved").count(),
# #             "rejected": Inspection.objects.filter(status="Rejected").count(),
# #         }
        
# #         return Response(stats)
        
# #     except Exception as e:
# #         return Response(
# #             {'error': str(e)},
# #             status=500
# #         )

# # @api_view(['GET'])
# # def admin_inspections_list(request):
# #     """Get inspections list for admin with filtering"""
# #     try:
# #         status = request.GET.get('status', 'all')
        
# #         inspections = Inspection.objects.all()
        
# #         if status != 'all':
# #             inspections = inspections.filter(status=status)
        
# #         # Serialize the data
# #         inspections_data = []
# #         for inspection in inspections:
# #             inspections_data.append({
# #                 'id': inspection.id,
# #                 'client_name': inspection.client_name,
# #                 'industry_name': inspection.industry_name,
# #                 'branch_name': inspection.branch_name,
# #                 'status': inspection.status,
# #                 'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
# #                 'created_at': inspection.created_at,
# #                 'updated_at': inspection.updated_at
# #             })
        
# #         return Response(inspections_data)
        
# #     except Exception as e:
# #         return Response(
# #             {'error': str(e)},
# #             status=500
# #         )
# # # views.py - admin_inspection_detail function
# # # views.py - admin_inspection_detail function সম্পূর্ণভাবে replace করুন
# # @api_view(['GET'])
# # def admin_inspection_detail(request, inspection_id):
# #     """Get detailed inspection information for admin"""
# #     try:
# #         inspection = Inspection.objects.get(id=inspection_id)
        
# #         # Helper function to parse JSON fields
# #         def parse_json_field(field_data, field_name):
# #             print(f"🔄 Parsing {field_name}: {field_data}")
            
# #             if not field_data:
# #                 return []
                
# #             if isinstance(field_data, str):
# #                 try:
# #                     parsed_data = json.loads(field_data)
# #                     print(f"✅ Successfully parsed {field_name}: {parsed_data}")
# #                     return parsed_data
# #                 except json.JSONDecodeError as e:
# #                     print(f"❌ JSON parse error for {field_name}: {e}")
# #                     # If it's a string but not valid JSON, treat it as a single item
# #                     return [field_data]
# #             elif isinstance(field_data, list):
# #                 print(f"✅ {field_name} is already a list: {field_data}")
# #                 return field_data
# #             else:
# #                 print(f"⚠️ Unknown format for {field_name}: {type(field_data)}")
# #                 return []

# #         # Parse media fields
# #         site_photos = parse_json_field(inspection.site_photos, 'site_photos')
# #         site_video = parse_json_field(inspection.site_video, 'site_video')
# #         uploaded_documents = parse_json_field(inspection.uploaded_documents, 'uploaded_documents')

# #         print(f"📊 Final parsed data:")
# #         print(f"Photos: {site_photos}")
# #         print(f"Videos: {site_video}")
# #         print(f"Documents: {uploaded_documents}")

# #         # Serialize all inspection data
# #         inspection_data = {
# #             'id': inspection.id,
# #             'client_name': inspection.client_name,
# #             'industry_name': inspection.industry_name,
# #             'branch_name': inspection.branch_name,
# #             'status': inspection.status,
# #             'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
# #             'created_at': inspection.created_at,
# #             'updated_at': inspection.updated_at,
            
# #             # Client Information
# #             'group_name': inspection.group_name,
# #             'nature_of_business': inspection.nature_of_business,
# #             'legal_status': inspection.legal_status,
# #             'date_of_establishment': inspection.date_of_establishment,
# #             'office_address': inspection.office_address,
# #             'showroom_address': inspection.showroom_address,
# #             'factory_address': inspection.factory_address,
# #             'phone_number': inspection.phone_number,
# #             'account_number': inspection.account_number,
# #             'account_id': inspection.account_id,
# #             'tin_number': inspection.tin_number,
# #             'date_of_opening': inspection.date_of_opening,
# #             'vat_reg_number': inspection.vat_reg_number,
# #             'first_investment_date': inspection.first_investment_date,
# #             'sector_code': inspection.sector_code,
# #             'trade_license': inspection.trade_license,
# #             'economic_purpose_code': inspection.economic_purpose_code,
# #             'investment_category': inspection.investment_category,
            
# #             # Owner Information
# #             'owner_name': inspection.owner_name,
# #             'owner_age': inspection.owner_age,
# #             'father_name': inspection.father_name,
# #             'mother_name': inspection.mother_name,
# #             'spouse_name': inspection.spouse_name,
# #             'academic_qualification': inspection.academic_qualification,
# #             'children_info': inspection.children_info,
# #             'business_successor': inspection.business_successor,
# #             'residential_address': inspection.residential_address,
# #             'permanent_address': inspection.permanent_address,
            
# #             # Business Information
# #             'market_situation': inspection.market_situation,
# #             'client_position': inspection.client_position,
# #             'business_reputation': inspection.business_reputation,
# #             'production_type': inspection.production_type,
# #             'product_name': inspection.product_name,
# #             'production_capacity': inspection.production_capacity,
# #             'actual_production': inspection.actual_production,
# #             'profitability_observation': inspection.profitability_observation,
            
# #             # Labor Force
# #             'male_officer': inspection.male_officer,
# #             'female_officer': inspection.female_officer,
# #             'skilled_officer': inspection.skilled_officer,
# #             'unskilled_officer': inspection.unskilled_officer,
# #             'male_worker': inspection.male_worker,
# #             'female_worker': inspection.female_worker,
# #             'skilled_worker': inspection.skilled_worker,
# #             'unskilled_worker': inspection.unskilled_worker,
            
# #             # Financial Information
# #             'cash_balance': inspection.cash_balance,
# #             'stock_trade_finished': inspection.stock_trade_finished,
# #             'stock_trade_financial': inspection.stock_trade_financial,
# #             'accounts_receivable': inspection.accounts_receivable,
# #             'advance_deposit': inspection.advance_deposit,
# #             'other_current_assets': inspection.other_current_assets,
# #             'land_building': inspection.land_building,
# #             'plant_machinery': inspection.plant_machinery,
# #             'other_assets': inspection.other_assets,
# #             'ibbl_investment': inspection.ibbl_investment,
# #             'other_banks_investment': inspection.other_banks_investment,
# #             'borrowing_sources': inspection.borrowing_sources,
# #             'accounts_payable': inspection.accounts_payable,
# #             'other_current_liabilities': inspection.other_current_liabilities,
# #             'long_term_liabilities': inspection.long_term_liabilities,
# #             'other_non_current_liabilities': inspection.other_non_current_liabilities,
# #             'paid_up_capital': inspection.paid_up_capital,
# #             'retained_earning': inspection.retained_earning,
# #             'resources': inspection.resources,
            
# #             # Media fields with proper parsing
# #             'site_photos': site_photos,
# #             'site_video': site_video,
# #             'uploaded_documents': uploaded_documents,
# #         }
        
# #         return Response(inspection_data)
        
# #     except Inspection.DoesNotExist:
# #         return Response(
# #             {'error': 'Inspection not found'},
# #             status=404
# #         )
# #     except Exception as e:
# #         print(f"🚨 Error in admin_inspection_detail: {str(e)}")
# #         return Response(
# #             {'error': str(e)},
# #             status=500
# #         )

# # # ✅ NEW COMPREHENSIVE ADMIN DASHBOARD STATS VIEW
# # # views.py - শুধু AdminDashboardStatsView class টি replace করুন
# # class AdminDashboardStatsView(APIView):
# #     permission_classes = [IsAuthenticated]
    
# #     def get(self, request):
# #         try:
# #             # Check if user is admin
# #             if request.user.role != 'admin':
# #                 return Response(
# #                     {'error': 'You do not have permission to access this data'},
# #                     status=status.HTTP_403_FORBIDDEN
# #                 )

# #             # Basic counts
# #             all_inspections = Inspection.objects.all()
# #             stats = {
# #                 'all': all_inspections.count(),
# #                 'pending': all_inspections.filter(status='Pending').count(),
# #                 'inProgress': all_inspections.filter(status='In Progress').count(),
# #                 'completed': all_inspections.filter(status='Completed').count(),
# #                 'approved': all_inspections.filter(status='Approved').count(),
# #                 'rejected': all_inspections.filter(status='Rejected').count(),
# #             }
            
# #             # Status distribution for chart
# #             status_distribution = []
# #             status_choices = ['Pending', 'In Progress', 'Completed', 'Approved', 'Rejected']
# #             colors = ['bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500']
            
# #             for status, color in zip(status_choices, colors):
# #                 count = all_inspections.filter(status=status).count()
# #                 status_distribution.append({
# #                     'status': status,
# #                     'count': count,
# #                     'color': color
# #                 })
            
# #             stats['statusDistribution'] = status_distribution
            
# #             # ✅ FIXED: Branch-wise distribution - Group by branch and count
# #             branch_wise = []
# #             # Get branch-wise counts using aggregation
# #             branch_counts = Inspection.objects.filter(
# #                 branch_name__isnull=False
# #             ).exclude(
# #                 branch_name=''
# #             ).values('branch_name').annotate(
# #                 count=Count('id')
# #             ).order_by('-count')
            
# #             branch_colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-red-600', 'bg-indigo-600', 'bg-pink-600']
            
# #             for i, branch_data in enumerate(branch_counts):
# #                 branch_wise.append({
# #                     'branch': branch_data['branch_name'],
# #                     'count': branch_data['count'],
# #                     'color': branch_colors[i % len(branch_colors)]
# #                 })
            
# #             # If no branch data, use default branches with actual counts
# #             if not branch_wise:
# #                 default_branches = ['Dhaka Main', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi']
# #                 for i, branch in enumerate(default_branches):
# #                     count = all_inspections.filter(branch_name=branch).count()
# #                     branch_wise.append({
# #                         'branch': branch,
# #                         'count': count,
# #                         'color': branch_colors[i % len(branch_colors)]
# #                     })
            
# #             stats['branchWise'] = branch_wise
            
# #             # Monthly trend (last 6 months)
# #             monthly_trend = []
# #             current_date = timezone.now()
            
# #             for i in range(5, -1, -1):
# #                 # Calculate month start and end
# #                 month_date = current_date - timedelta(days=30*i)
# #                 month_name = month_date.strftime('%b')
                
# #                 # Get start of month
# #                 month_start = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
                
# #                 # Get end of month
# #                 if i == 0:
# #                     month_end = current_date
# #                 else:
# #                     next_month = month_start + timedelta(days=32)
# #                     month_end = next_month.replace(day=1) - timedelta(days=1)
# #                     month_end = month_end.replace(hour=23, minute=59, second=59, microsecond=999999)
                
# #                 count = all_inspections.filter(
# #                     created_at__gte=month_start,
# #                     created_at__lte=month_end
# #                 ).count()
                
# #                 monthly_trend.append({
# #                     'month': month_name,
# #                     'inspections': count
# #                 })
            
# #             stats['monthlyTrend'] = monthly_trend
            
# #             return Response(stats)
            
# #         except Exception as e:
# #             print(f"Error in AdminDashboardStatsView: {str(e)}")
# #             return Response(
# #                 {'error': str(e)},
# #                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #             )

# # @api_view(['GET'])
# # def inspection_analytics(request):
# #     """Get comprehensive inspection analytics data for admin dashboard"""
# #     try:
# #         # Status distribution
# #         status_distribution = Inspection.objects.values('status').annotate(
# #             count=Count('id')
# #         ).order_by('status')
        
# #         # Branch-wise distribution (only branches with inspections)
# #         branch_distribution = Inspection.objects.filter(
# #             branch_name__isnull=False
# #         ).exclude(
# #             branch_name=''
# #         ).values('branch_name').annotate(
# #             count=Count('id')
# #         ).order_by('-count')
        
# #         # Monthly trend (last 6 months)
# #         six_months_ago = timezone.now() - timedelta(days=180)
# #         monthly_trend = Inspection.objects.filter(
# #             created_at__gte=six_months_ago
# #         ).annotate(
# #             month=TruncMonth('created_at')
# #         ).values('month').annotate(
# #             count=Count('id')
# #         ).order_by('month')
        
# #         # Industry-wise distribution
# #         industry_distribution = Inspection.objects.filter(
# #             industry_name__isnull=False
# #         ).exclude(
# #             industry_name=''
# #         ).values('industry_name').annotate(
# #             count=Count('id')
# #         ).order_by('-count')[:10]  # Top 10 industries
        
# #         # Calculate performance metrics
# #         total_inspections = Inspection.objects.count()
# #         approved_count = Inspection.objects.filter(status='Approved').count()
# #         pending_count = Inspection.objects.filter(status='Pending').count()
# #         rejected_count = Inspection.objects.filter(status='Rejected').count()
# #         in_progress_count = Inspection.objects.filter(status='In Progress').count()
# #         completed_count = Inspection.objects.filter(status='Completed').count()
        
# #         approval_rate = (approved_count / total_inspections * 100) if total_inspections > 0 else 0
# #         pending_rate = (pending_count / total_inspections * 100) if total_inspections > 0 else 0
        
# #         # Monthly average (last 6 months)
# #         avg_per_month = total_inspections / 6 if total_inspections > 0 else 0
        
# #         analytics_data = {
# #             'status_distribution': list(status_distribution),
# #             'branch_distribution': list(branch_distribution),
# #             'monthly_trend': list(monthly_trend),
# #             'industry_distribution': list(industry_distribution),
# #             'quick_stats': {
# #                 'approval_rate': round(approval_rate, 1),
# #                 'pending_rate': round(pending_rate, 1),
# #                 'total_inspections': total_inspections,
# #                 'avg_per_month': round(avg_per_month, 1),
# #                 'approved_count': approved_count,
# #                 'pending_count': pending_count,
# #                 'rejected_count': rejected_count,
# #                 'in_progress_count': in_progress_count,
# #                 'completed_count': completed_count,
# #             }
# #         }
        
# #         return Response(analytics_data)
        
# #     except Exception as e:
# #         print(f"Error in inspection_analytics: {str(e)}")
# #         return Response(
# #             {'error': str(e)},
# #             status=500
# #         )
    

# # # views.py - নিচের অংশে যোগ করুন
# # @api_view(['GET'])
# # @permission_classes([IsAuthenticated])
# # def admin_inspectors_list(request):
# #     """Get all inspectors for admin"""
# #     try:
# #         if request.user.role != 'admin':
# #             return Response(
# #                 {'error': 'You do not have permission to access this data'},
# #                 status=status.HTTP_403_FORBIDDEN
# #             )
        
# #         inspectors = CustomUser.objects.filter(role='inspector').order_by('user_name')
# #         serializer = UserSerializer(inspectors, many=True)
# #         return Response(serializer.data)
        
# #     except Exception as e:
# #         return Response(
# #             {'error': str(e)},
# #             status=status.HTTP_500_INTERNAL_SERVER_ERROR
# #         )



# # views.py - Updated with Base64 handling
# from rest_framework.views import APIView
# from django.http import JsonResponse
# from .models import Inspection, NewInspection
# from django.contrib.auth.decorators import login_required


# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# import json
# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend
# from .models import Inspection, NewInspection
# from .serializers import InspectionSerializer, InspectionCreateSerializer, NewInspectionSerializer
# from rest_framework.response import Response
# from rest_framework import status, generics
# from .auth_serializers import CustomTokenObtainSerializer
# from .serializers import UserCreateSerializer, UserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
# from .models import CustomUser
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import send_mail
# from django.conf import settings
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import User
# from django.db.models import Count, Q
# from django.db.models.functions import TruncMonth
# from django.utils import timezone
# from datetime import timedelta
# import base64
# import binascii




# # JWT Login
# class CustomTokenObtainView(APIView):
#     permission_classes = []
#     def post(self, request):
#         ser = CustomTokenObtainSerializer(data=request.data)
#         ser.is_valid(raise_exception=True)
#         return Response(ser.validated_data)


# # List/Create users (super admin can create branch admins/inspectors)
# class UserListCreateView(generics.ListCreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserCreateSerializer
#     permission_classes = [IsAuthenticated]


# # Forgot password
# class PasswordResetView(APIView):
#     permission_classes = []
#     def post(self, request):
#         ser = PasswordResetSerializer(data=request.data)
#         ser.is_valid(raise_exception=True)
#         email = ser.validated_data['email']
#         try:
#             user = CustomUser.objects.get(email=email)
#         except CustomUser.DoesNotExist:
#             return Response({'detail': 'If that email exists, a reset link was sent.'})
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = default_token_generator.make_token(user)
#         reset_url = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
#         send_mail(
#             subject='InvestTracker Password Reset',
#             message=f'Click here to reset your password:\n\n{reset_url}',
#             from_email=settings.DEFAULT_FROM_EMAIL,
#             recipient_list=[user.email],
#         )
#         return Response({'detail': 'If that email exists, a reset link was sent.'})


# # Confirm password reset
# class PasswordResetConfirmView(APIView):
#     permission_classes = []
#     def post(self, request):
#         ser = PasswordResetConfirmSerializer(data=request.data)
#         ser.is_valid(raise_exception=True)
#         uid = ser.validated_data['uid']
#         token = ser.validated_data['token']
#         new_password = ser.validated_data['new_password']
#         try:
#             uid_decoded = force_str(urlsafe_base64_decode(uid))
#             user = CustomUser.objects.get(pk=uid_decoded)
#         except Exception:
#             return Response({'detail':'Invalid uid'}, status=status.HTTP_400_BAD_REQUEST)
#         if not default_token_generator.check_token(user, token):
#             return Response({'detail':'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
#         user.set_password(new_password)
#         user.save()
#         return Response({'detail':'Password reset successful'})


# # -------------------- Role-based CRUD --------------------


# # Admin creates Branch Admin
# @api_view(['POST'])
# def create_branch_admin(request):
#     data = request.data
#     data['role'] = 'branch_admin'
#     serializer = UserCreateSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)


# # Admin lists Branch Admins
# @api_view(['GET'])
# def list_branch_admins(request):
#     admins = CustomUser.objects.filter(role='branch_admin')
#     serializer = UserSerializer(admins, many=True)
#     return Response(serializer.data)


# # Branch Admin creates Inspector
# @api_view(['POST'])
# def create_inspector(request):
#     data = request.data
#     data['role'] = 'inspector'
#     serializer = UserCreateSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)


# # Branch Admin lists Inspectors in his branch
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_inspectors(request):
#     # logged-in user থেকে branch_name নাও
#     branch_name = request.user.branch_name


#     # শুধু ওই branch এর inspectors filter করো
#     inspectors = CustomUser.objects.filter(role='inspector', branch_name=branch_name)
#     serializer = UserSerializer(inspectors, many=True)
#     return Response(serializer.data)


# # Update user (Branch Admin / Admin)
# @api_view(['PUT'])
# def update_user(request, user_id):
#     try:
#         user = CustomUser.objects.get(id=user_id)
#     except CustomUser.DoesNotExist:
#         return Response({"error":"User not found"}, status=404)
#     serializer = UserCreateSerializer(user, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)


# # Delete user (Branch Admin / Admin)
# @api_view(['DELETE'])
# def delete_user(request, user_id):
#     try:
#         user = CustomUser.objects.get(id=user_id)
#     except CustomUser.DoesNotExist:
#         return Response({"error": "User not found"}, status=404)
#     user.delete()
#     return Response({"message": "User deleted successfully"})


# # -------------------- New Inspection Views --------------------


# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_new_inspection(request):
#     """
#     Create a new inspection (for branch admin/admin)
#     """
#     try:
#         # Add debug print to see incoming data
#         print("📨 Received new inspection creation request:")
#         print(f"📤 Request data: {request.data}")
#         print(f"👤 User: {request.user}")
#         print(f"🎯 User role: {request.user.role}")


#         # Check if user has permission to create inspections
#         if request.user.role not in ['admin', 'branch_admin']:
#             return Response(
#                 {"error": "You don't have permission to create inspections."},
#                 status=status.HTTP_403_FORBIDDEN
#             )


#         serializer = NewInspectionSerializer(data=request.data)
       
#         if serializer.is_valid():
#             print("✅ Serializer is valid")
#             inspection = serializer.save()
           
#             # Return the created inspection data
#             response_serializer = NewInspectionSerializer(inspection)
#             print(f"✅ New Inspection created successfully: {inspection.id}")
           
#             return Response(response_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print("❌ Serializer errors:", serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
#     except Exception as e:
#         print(f"🚨 Error in create_new_inspection: {str(e)}")
#         return Response(
#             {"error": f"An error occurred: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_new_inspections(request):
#     """
#     List all new inspections (for branch admin/admin and inspectors)
#     """
#     try:
#         # Allow both admin/branch_admin AND inspectors to view
#         if request.user.role not in ['admin', 'branch_admin', 'inspector']:
#             return Response(
#                 {"error": "You don't have permission to view inspections."},
#                 status=status.HTTP_403_FORBIDDEN
#             )


#         # For branch admin, only show inspections from their branch
#         if request.user.role == 'branch_admin':
#             inspections = NewInspection.objects.filter(branch_name=request.user.branch_name)
#         elif request.user.role == 'inspector':
#             # For inspector, show only inspections assigned to them
#             inspections = NewInspection.objects.filter(assigned_inspector=request.user)
#         else:
#             # For super admin, show all inspections
#             inspections = NewInspection.objects.all()
       
#         inspections = inspections.order_by('-created_at')
#         serializer = NewInspectionSerializer(inspections, many=True)
       
#         return Response(serializer.data, status=status.HTTP_200_OK)
       
#     except Exception as e:
#         print(f"🚨 Error in list_new_inspections: {str(e)}")
#         return Response(
#             {"error": f"An error occurred: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )


# # NEW: Get current user information
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_current_user(request):
#     """
#     Get current user information
#     """
#     try:
#         user = request.user
#         serializer = UserSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response(
#             {"error": f"An error occurred: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )


# # Inspection ViewSet - UPDATED FOR BASE64 MEDIA HANDLING
# class InspectionViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['investment_category', 'status', 'legal_status']
   
#     def get_queryset(self):
#         # Users can only see their own inspections
#         return Inspection.objects.filter(inspector=self.request.user)
   
#     def get_serializer_class(self):
#         if self.action == 'create':
#             return InspectionCreateSerializer
#         return InspectionSerializer
   
#     def perform_create(self, serializer):
#         # Handle base64 media data before saving
#         data = self.request.data
       
#         # Process site_photos base64 data
#         site_photos_data = data.get('site_photos', [])
#         if site_photos_data:
#             processed_photos = []
#             for photo_data in site_photos_data:
#                 if isinstance(photo_data, dict) and 'base64_data' in photo_data:
#                     # Keep base64 data as is for storage
#                     processed_photos.append(photo_data)
#             data['site_photos'] = processed_photos
       
#         # Process site_video base64 data
#         site_video_data = data.get('site_video')
#         if site_video_data and isinstance(site_video_data, dict) and 'base64_data' in site_video_data:
#             # Keep base64 data as is for storage
#             data['site_video'] = site_video_data
       
#         # Process uploaded_documents base64 data
#         uploaded_docs_data = data.get('uploaded_documents', [])
#         if uploaded_docs_data:
#             processed_docs = []
#             for doc_data in uploaded_docs_data:
#                 if isinstance(doc_data, dict) and 'base64_data' in doc_data:
#                     # Keep base64 data as is for storage
#                     processed_docs.append(doc_data)
#             data['uploaded_documents'] = processed_docs
       
#         serializer.save(inspector=self.request.user)
   
#     @action(detail=False, methods=['get'])
#     def inspector_wise(self, request):
#         # Get inspections grouped by inspector
#         inspectors = CustomUser.objects.filter(
#             inspections__isnull=False
#         ).annotate(
#             total_inspections=Count('inspections')
#         ).values('id', 'user_name', 'email', 'total_inspections')
       
#         return Response(inspectors)
   
#     # NEW METHOD ADDED: Get inspection statistics for current inspector
#     @action(detail=False, methods=['get'])
#     def stats(self, request):
#         """
#         Get inspection statistics for the logged-in inspector
#         """
#         user = request.user
       
#         try:
#             # Get total inspections for this inspector
#             total = Inspection.objects.filter(inspector=user).count()
           
#             # Get counts by status
#             pending = Inspection.objects.filter(
#                 inspector=user,
#                 status='Pending'
#             ).count()
           
#             in_progress = Inspection.objects.filter(
#                 inspector=user,
#                 status='In Progress'
#             ).count()
           
#             completed = Inspection.objects.filter(
#                 inspector=user,
#                 status='Completed'
#             ).count()
           
#             approved = Inspection.objects.filter(
#                 inspector=user,
#                 status='Approved'
#             ).count()
           
#             rejected = Inspection.objects.filter(
#                 inspector=user,
#                 status='Rejected'
#             ).count()
           
#             stats_data = {
#                 'total': total,
#                 'pending': pending,
#                 'in_progress': in_progress,
#                 'completed': completed,
#                 'approved': approved,
#                 'rejected': rejected,
#             }
           
#             return Response(stats_data, status=status.HTTP_200_OK)
           
#         except Exception as e:
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
   
#     # NEW METHOD ADDED: Get inspections by status with filtering
#     @action(detail=False, methods=['get'])
#     def by_status(self, request):
#         """
#         Get inspections filtered by status for the logged-in inspector
#         """
#         user = request.user
#         status_param = request.query_params.get('status', 'all')
       
#         try:
#             queryset = Inspection.objects.filter(inspector=user)
           
#             # Filter by status if provided and not 'all'
#             if status_param and status_param != 'all':
#                 queryset = queryset.filter(status=status_param)
           
#             # Order by latest first
#             queryset = queryset.order_by('-created_at')
           
#             # Serialize the data
#             serializer = InspectionSerializer(queryset, many=True)
           
#             return Response(serializer.data, status=status.HTTP_200_OK)
           
#         except Exception as e:
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
   
#     # NEW METHOD ADDED: Update inspection status
#     @action(detail=True, methods=['patch', 'put'])
#     def update_status(self, request, pk=None):
#         """
#         Update inspection status
#         """
#         try:
#             inspection = self.get_object()
#             new_status = request.data.get('status')
           
#             if not new_status:
#                 return Response(
#                     {'error': 'Status is required'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
           
#             # Validate status choice
#             valid_statuses = dict(Inspection.STATUS_CHOICES).keys()
#             if new_status not in valid_statuses:
#                 return Response(
#                     {'error': f'Invalid status. Must be one of: {list(valid_statuses)}'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
           
#             inspection.status = new_status
#             inspection.save()
           
#             serializer = self.get_serializer(inspection)
#             return Response(serializer.data, status=status.HTTP_200_OK)
           
#         except Inspection.DoesNotExist:
#             return Response(
#                 {'error': 'Inspection not found'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


# ############get number in admin dashboard


# def inspection_stats(request):
#     """Return inspection statistics for dashboard"""
#     data = {
#         "all": Inspection.objects.count(),
#         "pending": Inspection.objects.filter(status="Pending").count(),
#         "approved": Inspection.objects.filter(status="Approved").count(),
#         "rejected": Inspection.objects.filter(status="Rejected").count(),
#     }
#     return JsonResponse(data)




# @api_view(['GET'])
# def branch_admin_stats(request):
#     branch_name = request.GET.get('branch_name', '')  # read branch_name from query param
#     if not branch_name:
#         return Response({"error": "Branch name is required"}, status=400)
   
#     inspections = Inspection.objects.filter(branch_name=branch_name)
   
#     stats = {
#         "all": inspections.count(),
#         "pending": inspections.filter(status="Pending").count(),
#         "approved": inspections.filter(status="Approved").count(),
#         "rejected": inspections.filter(status="Rejected").count(),
#     }
#     return Response(stats)


# @api_view(['GET'])
# def admin_inspection_stats(request):
#     """Get inspection statistics specifically for admin dashboard"""
#     try:
#         # Get total counts by status
#         stats = {
#             "all": Inspection.objects.count(),
#             "pending": Inspection.objects.filter(status="Pending").count(),
#             "approved": Inspection.objects.filter(status="Approved").count(),
#             "rejected": Inspection.objects.filter(status="Rejected").count(),
#         }
       
#         return Response(stats)
       
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=500
#         )


# @api_view(['GET'])
# def admin_inspections_list(request):
#     """Get inspections list for admin with filtering"""
#     try:
#         status = request.GET.get('status', 'all')
       
#         inspections = Inspection.objects.all()
       
#         if status != 'all':
#             inspections = inspections.filter(status=status)
       
#         # Serialize the data
#         inspections_data = []
#         for inspection in inspections:
#             inspections_data.append({
#                 'id': inspection.id,
#                 'client_name': inspection.client_name,
#                 'industry_name': inspection.industry_name,
#                 'branch_name': inspection.branch_name,
#                 'status': inspection.status,
#                 'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
#                 'created_at': inspection.created_at,
#                 'updated_at': inspection.updated_at
#             })
       
#         return Response(inspections_data)
       
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=500
#         )


# # views.py - admin_inspection_detail function সম্পূর্ণভাবে replace করুন
# @api_view(['GET'])
# def admin_inspection_detail(request, inspection_id):
#     """Get detailed inspection information for admin"""
#     try:
#         inspection = Inspection.objects.get(id=inspection_id)
       
#         # Helper function to parse JSON fields
#         def parse_json_field(field_data, field_name):
#             print(f"🔄 Parsing {field_name}: {field_data}")
           
#             if not field_data:
#                 return []
               
#             if isinstance(field_data, str):
#                 try:
#                     parsed_data = json.loads(field_data)
#                     print(f"✅ Successfully parsed {field_name}: {parsed_data}")
#                     return parsed_data
#                 except json.JSONDecodeError as e:
#                     print(f"❌ JSON parse error for {field_name}: {e}")
#                     # If it's a string but not valid JSON, treat it as a single item
#                     return [field_data]
#             elif isinstance(field_data, list):
#                 print(f"✅ {field_name} is already a list: {field_data}")
#                 return field_data
#             else:
#                 print(f"⚠️ Unknown format for {field_name}: {type(field_data)}")
#                 return []


#         # Parse media fields
#         site_photos = parse_json_field(inspection.site_photos, 'site_photos')
#         site_video = parse_json_field(inspection.site_video, 'site_video')
#         uploaded_documents = parse_json_field(inspection.uploaded_documents, 'uploaded_documents')


#         print(f"📊 Final parsed data:")
#         print(f"Photos: {len(site_photos)} items")
#         print(f"Videos: {len(site_video) if isinstance(site_video, list) else 1 if site_video else 0} items")
#         print(f"Documents: {len(uploaded_documents)} items")


#         # Serialize all inspection data
#         inspection_data = {
#             'id': inspection.id,
#             'client_name': inspection.client_name,
#             'industry_name': inspection.industry_name,
#             'branch_name': inspection.branch_name,
#             'status': inspection.status,
#             'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
#             'created_at': inspection.created_at,
#             'updated_at': inspection.updated_at,
           
#             # Client Information
#             'group_name': inspection.group_name,
#             'nature_of_business': inspection.nature_of_business,
#             'legal_status': inspection.legal_status,
#             'date_of_establishment': inspection.date_of_establishment,
#             'office_address': inspection.office_address,
#             'showroom_address': inspection.showroom_address,
#             'factory_address': inspection.factory_address,
#             'phone_number': inspection.phone_number,
#             'account_number': inspection.account_number,
#             'account_id': inspection.account_id,
#             'tin_number': inspection.tin_number,
#             'date_of_opening': inspection.date_of_opening,
#             'vat_reg_number': inspection.vat_reg_number,
#             'first_investment_date': inspection.first_investment_date,
#             'sector_code': inspection.sector_code,
#             'trade_license': inspection.trade_license,
#             'economic_purpose_code': inspection.economic_purpose_code,
#             'investment_category': inspection.investment_category,
           
#             # Owner Information
#             'owner_name': inspection.owner_name,
#             'owner_age': inspection.owner_age,
#             'father_name': inspection.father_name,
#             'mother_name': inspection.mother_name,
#             'spouse_name': inspection.spouse_name,
#             'academic_qualification': inspection.academic_qualification,
#             'children_info': inspection.children_info,
#             'business_successor': inspection.business_successor,
#             'residential_address': inspection.residential_address,
#             'permanent_address': inspection.permanent_address,
           
#             # Business Information
#             'market_situation': inspection.market_situation,
#             'client_position': inspection.client_position,
#             'business_reputation': inspection.business_reputation,
#             'production_type': inspection.production_type,
#             'product_name': inspection.product_name,
#             'production_capacity': inspection.production_capacity,
#             'actual_production': inspection.actual_production,
#             'profitability_observation': inspection.profitability_observation,
           
#             # Labor Force
#             'male_officer': inspection.male_officer,
#             'female_officer': inspection.female_officer,
#             'skilled_officer': inspection.skilled_officer,
#             'unskilled_officer': inspection.unskilled_officer,
#             'male_worker': inspection.male_worker,
#             'female_worker': inspection.female_worker,
#             'skilled_worker': inspection.skilled_worker,
#             'unskilled_worker': inspection.unskilled_worker,
           
#             # Financial Information
#             'cash_balance': inspection.cash_balance,
#             'stock_trade_finished': inspection.stock_trade_finished,
#             'stock_trade_financial': inspection.stock_trade_financial,
#             'accounts_receivable': inspection.accounts_receivable,
#             'advance_deposit': inspection.advance_deposit,
#             'other_current_assets': inspection.other_current_assets,
#             'land_building': inspection.land_building,
#             'plant_machinery': inspection.plant_machinery,
#             'other_assets': inspection.other_assets,
#             'ibbl_investment': inspection.ibbl_investment,
#             'other_banks_investment': inspection.other_banks_investment,
#             'borrowing_sources': inspection.borrowing_sources,
#             'accounts_payable': inspection.accounts_payable,
#             'other_current_liabilities': inspection.other_current_liabilities,
#             'long_term_liabilities': inspection.long_term_liabilities,
#             'other_non_current_liabilities': inspection.other_non_current_liabilities,
#             'paid_up_capital': inspection.paid_up_capital,
#             'retained_earning': inspection.retained_earning,
#             'resources': inspection.resources,
           
#             # Media fields with proper parsing - BASE64 DATA INCLUDED
#             'site_photos': site_photos,
#             'site_video': site_video,
#             'uploaded_documents': uploaded_documents,
#         }
       
#         return Response(inspection_data)
       
#     except Inspection.DoesNotExist:
#         return Response(
#             {'error': 'Inspection not found'},
#             status=404
#         )
#     except Exception as e:
#         print(f"🚨 Error in admin_inspection_detail: {str(e)}")
#         return Response(
#             {'error': str(e)},
#             status=500
#         )


# # ✅ NEW COMPREHENSIVE ADMIN DASHBOARD STATS VIEW
# class AdminDashboardStatsView(APIView):
#     permission_classes = [IsAuthenticated]
   
#     def get(self, request):
#         try:
#             # Check if user is admin
#             if request.user.role != 'admin':
#                 return Response(
#                     {'error': 'You do not have permission to access this data'},
#                     status=status.HTTP_403_FORBIDDEN
#                 )


#             # Basic counts
#             all_inspections = Inspection.objects.all()
#             stats = {
#                 'all': all_inspections.count(),
#                 'pending': all_inspections.filter(status='Pending').count(),
#                 'inProgress': all_inspections.filter(status='In Progress').count(),
#                 'completed': all_inspections.filter(status='Completed').count(),
#                 'approved': all_inspections.filter(status='Approved').count(),
#                 'rejected': all_inspections.filter(status='Rejected').count(),
#             }
           
#             # Status distribution for chart
#             status_distribution = []
#             status_choices = ['Pending', 'In Progress', 'Completed', 'Approved', 'Rejected']
#             colors = ['bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500']
           
#             for status, color in zip(status_choices, colors):
#                 count = all_inspections.filter(status=status).count()
#                 status_distribution.append({
#                     'status': status,
#                     'count': count,
#                     'color': color
#                 })
           
#             stats['statusDistribution'] = status_distribution
           
#             # ✅ FIXED: Branch-wise distribution - Group by branch and count
#             branch_wise = []
#             # Get branch-wise counts using aggregation
#             branch_counts = Inspection.objects.filter(
#                 branch_name__isnull=False
#             ).exclude(
#                 branch_name=''
#             ).values('branch_name').annotate(
#                 count=Count('id')
#             ).order_by('-count')
           
#             branch_colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-red-600', 'bg-indigo-600', 'bg-pink-600']
           
#             for i, branch_data in enumerate(branch_counts):
#                 branch_wise.append({
#                     'branch': branch_data['branch_name'],
#                     'count': branch_data['count'],
#                     'color': branch_colors[i % len(branch_colors)]
#                 })
           
#             # If no branch data, use default branches with actual counts
#             if not branch_wise:
#                 default_branches = ['Dhaka Main', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi']
#                 for i, branch in enumerate(default_branches):
#                     count = all_inspections.filter(branch_name=branch).count()
#                     branch_wise.append({
#                         'branch': branch,
#                         'count': count,
#                         'color': branch_colors[i % len(branch_colors)]
#                     })
           
#             stats['branchWise'] = branch_wise
           
#             # Monthly trend (last 6 months)
#             monthly_trend = []
#             current_date = timezone.now()
           
#             for i in range(5, -1, -1):
#                 # Calculate month start and end
#                 month_date = current_date - timedelta(days=30*i)
#                 month_name = month_date.strftime('%b')
               
#                 # Get start of month
#                 month_start = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
               
#                 # Get end of month
#                 if i == 0:
#                     month_end = current_date
#                 else:
#                     next_month = month_start + timedelta(days=32)
#                     month_end = next_month.replace(day=1) - timedelta(days=1)
#                     month_end = month_end.replace(hour=23, minute=59, second=59, microsecond=999999)
               
#                 count = all_inspections.filter(
#                     created_at__gte=month_start,
#                     created_at__lte=month_end
#                 ).count()
               
#                 monthly_trend.append({
#                     'month': month_name,
#                     'inspections': count
#                 })
           
#             stats['monthlyTrend'] = monthly_trend
           
#             return Response(stats)
           
#         except Exception as e:
#             print(f"Error in AdminDashboardStatsView: {str(e)}")
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )


# @api_view(['GET'])
# def inspection_analytics(request):
#     """Get comprehensive inspection analytics data for admin dashboard"""
#     try:
#         # Status distribution
#         status_distribution = Inspection.objects.values('status').annotate(
#             count=Count('id')
#         ).order_by('status')
       
#         # Branch-wise distribution (only branches with inspections)
#         branch_distribution = Inspection.objects.filter(
#             branch_name__isnull=False
#         ).exclude(
#             branch_name=''
#         ).values('branch_name').annotate(
#             count=Count('id')
#         ).order_by('-count')
       
#         # Monthly trend (last 6 months)
#         six_months_ago = timezone.now() - timedelta(days=180)
#         monthly_trend = Inspection.objects.filter(
#             created_at__gte=six_months_ago
#         ).annotate(
#             month=TruncMonth('created_at')
#         ).values('month').annotate(
#             count=Count('id')
#         ).order_by('month')
       
#         # Industry-wise distribution
#         industry_distribution = Inspection.objects.filter(
#             industry_name__isnull=False
#         ).exclude(
#             industry_name=''
#         ).values('industry_name').annotate(
#             count=Count('id')
#         ).order_by('-count')[:10]  # Top 10 industries
       
#         # Calculate performance metrics
#         total_inspections = Inspection.objects.count()
#         approved_count = Inspection.objects.filter(status='Approved').count()
#         pending_count = Inspection.objects.filter(status='Pending').count()
#         rejected_count = Inspection.objects.filter(status='Rejected').count()
#         in_progress_count = Inspection.objects.filter(status='In Progress').count()
#         completed_count = Inspection.objects.filter(status='Completed').count()
       
#         approval_rate = (approved_count / total_inspections * 100) if total_inspections > 0 else 0
#         pending_rate = (pending_count / total_inspections * 100) if total_inspections > 0 else 0
       
#         # Monthly average (last 6 months)
#         avg_per_month = total_inspections / 6 if total_inspections > 0 else 0
       
#         analytics_data = {
#             'status_distribution': list(status_distribution),
#             'branch_distribution': list(branch_distribution),
#             'monthly_trend': list(monthly_trend),
#             'industry_distribution': list(industry_distribution),
#             'quick_stats': {
#                 'approval_rate': round(approval_rate, 1),
#                 'pending_rate': round(pending_rate, 1),
#                 'total_inspections': total_inspections,
#                 'avg_per_month': round(avg_per_month, 1),
#                 'approved_count': approved_count,
#                 'pending_count': pending_count,
#                 'rejected_count': rejected_count,
#                 'in_progress_count': in_progress_count,
#                 'completed_count': completed_count,
#             }
#         }
       
#         return Response(analytics_data)
       
#     except Exception as e:
#         print(f"Error in inspection_analytics: {str(e)}")
#         return Response(
#             {'error': str(e)},
#             status=500
#         )
   


# # views.py - নিচের অংশে যোগ করুন
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def admin_inspectors_list(request):
#     """Get all inspectors for admin"""
#     try:
#         if request.user.role != 'admin':
#             return Response(
#                 {'error': 'You do not have permission to access this data'},
#                 status=status.HTTP_403_FORBIDDEN
#             )
       
#         inspectors = CustomUser.objects.filter(role='inspector').order_by('user_name')
#         serializer = UserSerializer(inspectors, many=True)
#         return Response(serializer.data)
       
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )


# # NEW: Utility function to handle base64 media data
# def handle_base64_media_data(data):
#     """
#     Process base64 media data before saving to database
#     """
#     try:
#         # Process site_photos
#         if 'site_photos' in data and isinstance(data['site_photos'], list):
#             for photo in data['site_photos']:
#                 if isinstance(photo, dict) and 'base64_data' in photo:
#                     # Validate base64 data
#                     base64_data = photo['base64_data']
#                     try:
#                         # Try to decode to validate
#                         base64.b64decode(base64_data, validate=True)
#                         print(f"✅ Valid base64 photo data: {len(base64_data)} characters")
#                     except (binascii.Error, ValueError) as e:
#                         print(f"❌ Invalid base64 data in photo: {e}")
#                         # Remove invalid base64 data
#                         photo.pop('base64_data', None)
       
#         # Process site_video
#         if 'site_video' in data and isinstance(data['site_video'], dict):
#             video = data['site_video']
#             if 'base64_data' in video:
#                 base64_data = video['base64_data']
#                 try:
#                     base64.b64decode(base64_data, validate=True)
#                     print(f"✅ Valid base64 video data: {len(base64_data)} characters")
#                 except (binascii.Error, ValueError) as e:
#                     print(f"❌ Invalid base64 data in video: {e}")
#                     video.pop('base64_data', None)
       
#         # Process uploaded_documents
#         if 'uploaded_documents' in data and isinstance(data['uploaded_documents'], list):
#             for doc in data['uploaded_documents']:
#                 if isinstance(doc, dict) and 'base64_data' in doc:
#                     base64_data = doc['base64_data']
#                     try:
#                         base64.b64decode(base64_data, validate=True)
#                         print(f"✅ Valid base64 document data: {len(base64_data)} characters")
#                     except (binascii.Error, ValueError) as e:
#                         print(f"❌ Invalid base64 data in document: {e}")
#                         doc.pop('base64_data', None)
       
#         return data
       
#     except Exception as e:
#         print(f"🚨 Error in handle_base64_media_data: {e}")
#         return data


# # NEW: API to get media file by ID
# @api_view(['GET'])
# def get_media_file(request, inspection_id, media_type, file_index):
#     """
#     Get specific media file (photo/video/document) by index
#     """
#     try:
#         inspection = Inspection.objects.get(id=inspection_id)
       
#         if media_type == 'photo':
#             media_list = inspection.site_photos
#             if isinstance(media_list, str):
#                 media_list = json.loads(media_list)
           
#             if isinstance(media_list, list) and len(media_list) > file_index:
#                 media_data = media_list[file_index]
#                 if 'base64_data' in media_data:
#                     return Response({
#                         'file_name': media_data.get('file_name', f'photo_{file_index}.jpg'),
#                         'file_type': media_data.get('file_type', 'image/jpeg'),
#                         'base64_data': media_data['base64_data'],
#                         'description': media_data.get('description', '')
#                     })
       
#         elif media_type == 'video':
#             media_data = inspection.site_video
#             if isinstance(media_data, str):
#                 media_data = json.loads(media_data)
           
#             if isinstance(media_data, dict) and 'base64_data' in media_data:
#                 return Response({
#                     'file_name': media_data.get('file_name', 'site_video.mp4'),
#                     'file_type': media_data.get('file_type', 'video/mp4'),
#                     'base64_data': media_data['base64_data'],
#                     'description': media_data.get('description', '')
#                 })
       
#         elif media_type == 'document':
#             media_list = inspection.uploaded_documents
#             if isinstance(media_list, str):
#                 media_list = json.loads(media_list)
           
#             if isinstance(media_list, list) and len(media_list) > file_index:
#                 media_data = media_list[file_index]
#                 if 'base64_data' in media_data:
#                     return Response({
#                         'file_name': media_data.get('file_name', f'document_{file_index}'),
#                         'file_type': media_data.get('file_type', 'application/octet-stream'),
#                         'base64_data': media_data['base64_data'],
#                         'description': media_data.get('description', '')
#                     })
       
#         return Response({'error': 'Media file not found'}, status=404)
       
#     except Inspection.DoesNotExist:
#         return Response({'error': 'Inspection not found'}, status=404)
#     except Exception as e:
#         return Response({'error': str(e)}, status=500)















# views.py - COMPLETE FIXED VERSION

# from rest_framework.views import APIView
# from django.http import JsonResponse
# from .models import Inspection, NewInspection
# from django.contrib.auth.decorators import login_required
# from django.views.decorators.csrf import csrf_exempt
# from django.utils.decorators import method_decorator
# import json
# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from django_filters.rest_framework import DjangoFilterBackend
# from .models import Inspection, NewInspection
# from .serializers import InspectionSerializer, InspectionCreateSerializer, NewInspectionSerializer
# from rest_framework.response import Response
# from rest_framework import status, generics
# from .auth_serializers import CustomTokenObtainSerializer
# from .serializers import UserCreateSerializer, UserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
# from .models import CustomUser
# from django.contrib.auth.tokens import default_token_generator
# from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
# from django.utils.encoding import force_bytes, force_str
# from django.core.mail import send_mail
# from django.conf import settings
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import IsAuthenticated
# from django.contrib.auth.models import User
# from django.db.models import Count, Q
# from django.db.models.functions import TruncMonth
# from django.utils import timezone
# from datetime import timedelta
# import base64
# import binascii

# # JWT Login
# class CustomTokenObtainView(APIView):
#     permission_classes = []
#     def post(self, request):
#         ser = CustomTokenObtainSerializer(data=request.data)
#         ser.is_valid(raise_exception=True)
#         return Response(ser.validated_data)

# # List/Create users (super admin can create branch admins/inspectors)
# class UserListCreateView(generics.ListCreateAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserCreateSerializer
#     permission_classes = [IsAuthenticated]

# # Forgot password
# class PasswordResetView(APIView):
#     permission_classes = []
#     def post(self, request):
#         ser = PasswordResetSerializer(data=request.data)
#         ser.is_valid(raise_exception=True)
#         email = ser.validated_data['email']
#         try:
#             user = CustomUser.objects.get(email=email)
#         except CustomUser.DoesNotExist:
#             return Response({'detail': 'If that email exists, a reset link was sent.'})
#         uid = urlsafe_base64_encode(force_bytes(user.pk))
#         token = default_token_generator.make_token(user)
#         reset_url = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
#         send_mail(
#             subject='InvestTracker Password Reset',
#             message=f'Click here to reset your password:\n\n{reset_url}',
#             from_email=settings.DEFAULT_FROM_EMAIL,
#             recipient_list=[user.email],
#         )
#         return Response({'detail': 'If that email exists, a reset link was sent.'})

# # Confirm password reset
# class PasswordResetConfirmView(APIView):
#     permission_classes = []
#     def post(self, request):
#         ser = PasswordResetConfirmSerializer(data=request.data)
#         ser.is_valid(raise_exception=True)
#         uid = ser.validated_data['uid']
#         token = ser.validated_data['token']
#         new_password = ser.validated_data['new_password']
#         try:
#             uid_decoded = force_str(urlsafe_base64_decode(uid))
#             user = CustomUser.objects.get(pk=uid_decoded)
#         except Exception:
#             return Response({'detail':'Invalid uid'}, status=status.HTTP_400_BAD_REQUEST)
#         if not default_token_generator.check_token(user, token):
#             return Response({'detail':'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
#         user.set_password(new_password)
#         user.save()
#         return Response({'detail':'Password reset successful'})

# # -------------------- Role-based CRUD --------------------

# # Admin creates Branch Admin
# @api_view(['POST'])
# def create_branch_admin(request):
#     data = request.data
#     data['role'] = 'branch_admin'
#     serializer = UserCreateSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)

# # Admin lists Branch Admins
# @api_view(['GET'])
# def list_branch_admins(request):
#     admins = CustomUser.objects.filter(role='branch_admin')
#     serializer = UserSerializer(admins, many=True)
#     return Response(serializer.data)

# # Branch Admin creates Inspector
# @api_view(['POST'])
# def create_inspector(request):
#     data = request.data
#     data['role'] = 'inspector'
#     serializer = UserCreateSerializer(data=data)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)

# # Branch Admin lists Inspectors in his branch
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_inspectors(request):
#     # logged-in user থেকে branch_name নাও
#     branch_name = request.user.branch_name

#     # শুধু ওই branch এর inspectors filter করো
#     inspectors = CustomUser.objects.filter(role='inspector', branch_name=branch_name)
#     serializer = UserSerializer(inspectors, many=True)
#     return Response(serializer.data)

# # Update user (Branch Admin / Admin)
# @api_view(['PUT'])
# def update_user(request, user_id):
#     try:
#         user = CustomUser.objects.get(id=user_id)
#     except CustomUser.DoesNotExist:
#         return Response({"error":"User not found"}, status=404)
#     serializer = UserCreateSerializer(user, data=request.data, partial=True)
#     if serializer.is_valid():
#         serializer.save()
#         return Response(serializer.data)
#     return Response(serializer.errors, status=400)

# # Delete user (Branch Admin / Admin)
# @api_view(['DELETE'])
# def delete_user(request, user_id):
#     try:
#         user = CustomUser.objects.get(id=user_id)
#     except CustomUser.DoesNotExist:
#         return Response({"error": "User not found"}, status=404)
#     user.delete()
#     return Response({"message": "User deleted successfully"})

# # -------------------- New Inspection Views --------------------

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def create_new_inspection(request):
#     """
#     Create a new inspection (for branch admin/admin)
#     """
#     try:
#         # Add debug print to see incoming data
#         print("📨 Received new inspection creation request:")
#         print(f"📤 Request data: {request.data}")
#         print(f"👤 User: {request.user}")
#         print(f"🎯 User role: {request.user.role}")

#         # Check if user has permission to create inspections
#         if request.user.role not in ['admin', 'branch_admin']:
#             return Response(
#                 {"error": "You don't have permission to create inspections."},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         serializer = NewInspectionSerializer(data=request.data)
       
#         if serializer.is_valid():
#             print("✅ Serializer is valid")
#             inspection = serializer.save()
           
#             # Return the created inspection data
#             response_serializer = NewInspectionSerializer(inspection)
#             print(f"✅ New Inspection created successfully: {inspection.id}")
           
#             return Response(response_serializer.data, status=status.HTTP_201_CREATED)
#         else:
#             print("❌ Serializer errors:", serializer.errors)
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
#     except Exception as e:
#         print(f"🚨 Error in create_new_inspection: {str(e)}")
#         return Response(
#             {"error": f"An error occurred: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def list_new_inspections(request):
#     """
#     List all new inspections (for branch admin/admin and inspectors)
#     """
#     try:
#         # Allow both admin/branch_admin AND inspectors to view
#         if request.user.role not in ['admin', 'branch_admin', 'inspector']:
#             return Response(
#                 {"error": "You don't have permission to view inspections."},
#                 status=status.HTTP_403_FORBIDDEN
#             )

#         # For branch admin, only show inspections from their branch
#         if request.user.role == 'branch_admin':
#             inspections = NewInspection.objects.filter(branch_name=request.user.branch_name)
#         elif request.user.role == 'inspector':
#             # For inspector, show only inspections assigned to them
#             inspections = NewInspection.objects.filter(assigned_inspector=request.user)
#         else:
#             # For super admin, show all inspections
#             inspections = NewInspection.objects.all()
       
#         inspections = inspections.order_by('-created_at')
#         serializer = NewInspectionSerializer(inspections, many=True)
       
#         return Response(serializer.data, status=status.HTTP_200_OK)
       
#     except Exception as e:
#         print(f"🚨 Error in list_new_inspections: {str(e)}")
#         return Response(
#             {"error": f"An error occurred: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

# # NEW: Get current user information
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def get_current_user(request):
#     """
#     Get current user information
#     """
#     try:
#         user = request.user
#         serializer = UserSerializer(user)
#         return Response(serializer.data, status=status.HTTP_200_OK)
#     except Exception as e:
#         return Response(
#             {"error": f"An error occurred: {str(e)}"},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

# # -------------------- MAIN INSPECTION VIEWSET (FIXED) --------------------

# class InspectionViewSet(viewsets.ModelViewSet):
#     permission_classes = [IsAuthenticated]
#     filter_backends = [DjangoFilterBackend]
#     filterset_fields = ['investment_category', 'status', 'legal_status']
   
#     def get_queryset(self):
#         # IMPORTANT: Users can only see their own inspections
#         print(f"🔍 Getting inspections for user: {self.request.user.username} (ID: {self.request.user.id})")
#         user_inspections = Inspection.objects.filter(inspector=self.request.user)
#         print(f"📊 Found {user_inspections.count()} inspections for user {self.request.user.username}")
#         return user_inspections
   
#     def get_serializer_class(self):
#         if self.action == 'create':
#             return InspectionCreateSerializer
#         return InspectionSerializer
   
#     def perform_create(self, serializer):
#         # Handle base64 media data before saving
#         data = self.request.data
       
#         # Process site_photos base64 data
#         site_photos_data = data.get('site_photos', [])
#         if site_photos_data:
#             processed_photos = []
#             for photo_data in site_photos_data:
#                 if isinstance(photo_data, dict) and 'base64_data' in photo_data:
#                     # Keep base64 data as is for storage
#                     processed_photos.append(photo_data)
#             data['site_photos'] = processed_photos
       
#         # Process site_video base64 data
#         site_video_data = data.get('site_video')
#         if site_video_data and isinstance(site_video_data, dict) and 'base64_data' in site_video_data:
#             # Keep base64 data as is for storage
#             data['site_video'] = site_video_data
       
#         # Process uploaded_documents base64 data
#         uploaded_docs_data = data.get('uploaded_documents', [])
#         if uploaded_docs_data:
#             processed_docs = []
#             for doc_data in uploaded_docs_data:
#                 if isinstance(doc_data, dict) and 'base64_data' in doc_data:
#                     # Keep base64 data as is for storage
#                     processed_docs.append(doc_data)
#             data['uploaded_documents'] = processed_docs
       
#         print(f"✅ Saving inspection for user: {self.request.user.username}")
#         serializer.save(inspector=self.request.user)
   
#     @action(detail=False, methods=['get'])
#     def inspector_wise(self, request):
#         # Get inspections grouped by inspector
#         inspectors = CustomUser.objects.filter(
#             inspections__isnull=False
#         ).annotate(
#             total_inspections=Count('inspections')
#         ).values('id', 'user_name', 'email', 'total_inspections')
       
#         return Response(inspectors)
   
#     # FIXED: Get inspection statistics for current inspector
#     @action(detail=False, methods=['get'])
#     def stats(self, request):
#         """
#         Get inspection statistics for the logged-in inspector
#         """
#         user = request.user
       
#         try:
#             # Get total inspections for this inspector
#             user_inspections = Inspection.objects.filter(inspector=user)
#             total = user_inspections.count()
           
#             print(f"📊 Calculating stats for user: {user.username}")
#             print(f"📈 Total inspections: {total}")
           
#             # Get counts by status
#             pending = user_inspections.filter(status='Pending').count()
#             in_progress = user_inspections.filter(status='In Progress').count()
#             completed = user_inspections.filter(status='Completed').count()
#             approved = user_inspections.filter(status='Approved').count()
#             rejected = user_inspections.filter(status='Rejected').count()
           
#             stats_data = {
#                 'total': total,
#                 'pending': pending,
#                 'in_progress': in_progress,
#                 'completed': completed,
#                 'approved': approved,
#                 'rejected': rejected,
#             }
           
#             print(f"✅ Stats for user {user.username}: {stats_data}")
           
#             return Response(stats_data, status=status.HTTP_200_OK)
           
#         except Exception as e:
#             print(f"🚨 Error in stats: {str(e)}")
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
   
#     # FIXED: Get inspections by status with filtering - ONLY CURRENT USER'S INSPECTIONS
#     @action(detail=False, methods=['get'])
#     def by_status(self, request):
#         """
#         Get inspections filtered by status for the logged-in inspector
#         """
#         user = request.user
#         status_param = request.query_params.get('status', 'all')
       
#         try:
#             # শুধুমাত্র current user-এর inspections
#             queryset = Inspection.objects.filter(inspector=user)
           
#             print(f"🔍 Filtering inspections for user: {user.username}")
#             print(f"📊 Total inspections for user: {queryset.count()}")
           
#             # Filter by status if provided and not 'all'
#             if status_param and status_param != 'all':
#                 queryset = queryset.filter(status=status_param)
#                 print(f"🎯 Filtered by status '{status_param}': {queryset.count()} inspections")
           
#             # Order by latest first
#             queryset = queryset.order_by('-created_at')
           
#             # Serialize the data
#             serializer = InspectionSerializer(queryset, many=True)
           
#             print(f"✅ Returning {len(serializer.data)} inspections for user {user.username}")
           
#             return Response(serializer.data, status=status.HTTP_200_OK)
           
#         except Exception as e:
#             print(f"🚨 Error in by_status: {str(e)}")
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )
   
#     # FIXED: Update inspection status
#     @action(detail=True, methods=['patch', 'put'])
#     def update_status(self, request, pk=None):
#         """
#         Update inspection status
#         """
#         try:
#             inspection = self.get_object()
#             new_status = request.data.get('status')
           
#             if not new_status:
#                 return Response(
#                     {'error': 'Status is required'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
           
#             # Validate status choice
#             valid_statuses = dict(Inspection.STATUS_CHOICES).keys()
#             if new_status not in valid_statuses:
#                 return Response(
#                     {'error': f'Invalid status. Must be one of: {list(valid_statuses)}'},
#                     status=status.HTTP_400_BAD_REQUEST
#                 )
           
#             inspection.status = new_status
#             inspection.save()
           
#             serializer = self.get_serializer(inspection)
#             return Response(serializer.data, status=status.HTTP_200_OK)
           
#         except Inspection.DoesNotExist:
#             return Response(
#                 {'error': 'Inspection not found'},
#                 status=status.HTTP_404_NOT_FOUND
#             )
#         except Exception as e:
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# # -------------------- ADMIN DASHBOARD VIEWS --------------------

# def inspection_stats(request):
#     """Return inspection statistics for dashboard"""
#     data = {
#         "all": Inspection.objects.count(),
#         "pending": Inspection.objects.filter(status="Pending").count(),
#         "approved": Inspection.objects.filter(status="Approved").count(),
#         "rejected": Inspection.objects.filter(status="Rejected").count(),
#     }
#     return JsonResponse(data)

# @api_view(['GET'])
# def branch_admin_stats(request):
#     branch_name = request.GET.get('branch_name', '')  # read branch_name from query param
#     if not branch_name:
#         return Response({"error": "Branch name is required"}, status=400)
   
#     inspections = Inspection.objects.filter(branch_name=branch_name)
   
#     stats = {
#         "all": inspections.count(),
#         "pending": inspections.filter(status="Pending").count(),
#         "approved": inspections.filter(status="Approved").count(),
#         "rejected": inspections.filter(status="Rejected").count(),
#     }
#     return Response(stats)

# @api_view(['GET'])
# def admin_inspection_stats(request):
#     """Get inspection statistics specifically for admin dashboard"""
#     try:
#         # Get total counts by status
#         stats = {
#             "all": Inspection.objects.count(),
#             "pending": Inspection.objects.filter(status="Pending").count(),
#             "approved": Inspection.objects.filter(status="Approved").count(),
#             "rejected": Inspection.objects.filter(status="Rejected").count(),
#         }
       
#         return Response(stats)
       
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=500
#         )

# @api_view(['GET'])
# def admin_inspections_list(request):
#     """Get inspections list for admin with filtering"""
#     try:
#         status = request.GET.get('status', 'all')
       
#         inspections = Inspection.objects.all()
       
#         if status != 'all':
#             inspections = inspections.filter(status=status)
       
#         # Serialize the data
#         inspections_data = []
#         for inspection in inspections:
#             inspections_data.append({
#                 'id': inspection.id,
#                 'client_name': inspection.client_name,
#                 'industry_name': inspection.industry_name,
#                 'branch_name': inspection.branch_name,
#                 'status': inspection.status,
#                 'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
#                 'created_at': inspection.created_at,
#                 'updated_at': inspection.updated_at
#             })
       
#         return Response(inspections_data)
       
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=500
#         )

# # FIXED: admin_inspection_detail function
# @api_view(['GET'])
# def admin_inspection_detail(request, inspection_id):
#     """Get detailed inspection information for admin"""
#     try:
#         inspection = Inspection.objects.get(id=inspection_id)
       
#         # Helper function to parse JSON fields
#         def parse_json_field(field_data, field_name):
#             print(f"🔄 Parsing {field_name}: {field_data}")
           
#             if not field_data:
#                 return []
               
#             if isinstance(field_data, str):
#                 try:
#                     parsed_data = json.loads(field_data)
#                     print(f"✅ Successfully parsed {field_name}: {parsed_data}")
#                     return parsed_data
#                 except json.JSONDecodeError as e:
#                     print(f"❌ JSON parse error for {field_name}: {e}")
#                     # If it's a string but not valid JSON, treat it as a single item
#                     return [field_data]
#             elif isinstance(field_data, list):
#                 print(f"✅ {field_name} is already a list: {field_data}")
#                 return field_data
#             else:
#                 print(f"⚠️ Unknown format for {field_name}: {type(field_data)}")
#                 return []

#         # Parse media fields
#         site_photos = parse_json_field(inspection.site_photos, 'site_photos')
#         site_video = parse_json_field(inspection.site_video, 'site_video')
#         uploaded_documents = parse_json_field(inspection.uploaded_documents, 'uploaded_documents')

#         print(f"📊 Final parsed data:")
#         print(f"Photos: {len(site_photos)} items")
#         print(f"Videos: {len(site_video) if isinstance(site_video, list) else 1 if site_video else 0} items")
#         print(f"Documents: {len(uploaded_documents)} items")

#         # Serialize all inspection data
#         inspection_data = {
#             'id': inspection.id,
#             'client_name': inspection.client_name,
#             'industry_name': inspection.industry_name,
#             'branch_name': inspection.branch_name,
#             'status': inspection.status,
#             'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
#             'created_at': inspection.created_at,
#             'updated_at': inspection.updated_at,
           
#             # Client Information
#             'group_name': inspection.group_name,
#             'nature_of_business': inspection.nature_of_business,
#             'legal_status': inspection.legal_status,
#             'date_of_establishment': inspection.date_of_establishment,
#             'office_address': inspection.office_address,
#             'showroom_address': inspection.showroom_address,
#             'factory_address': inspection.factory_address,
#             'phone_number': inspection.phone_number,
#             'account_number': inspection.account_number,
#             'account_id': inspection.account_id,
#             'tin_number': inspection.tin_number,
#             'date_of_opening': inspection.date_of_opening,
#             'vat_reg_number': inspection.vat_reg_number,
#             'first_investment_date': inspection.first_investment_date,
#             'sector_code': inspection.sector_code,
#             'trade_license': inspection.trade_license,
#             'economic_purpose_code': inspection.economic_purpose_code,
#             'investment_category': inspection.investment_category,
           
#             # Owner Information
#             'owner_name': inspection.owner_name,
#             'owner_age': inspection.owner_age,
#             'father_name': inspection.father_name,
#             'mother_name': inspection.mother_name,
#             'spouse_name': inspection.spouse_name,
#             'academic_qualification': inspection.academic_qualification,
#             'children_info': inspection.children_info,
#             'business_successor': inspection.business_successor,
#             'residential_address': inspection.residential_address,
#             'permanent_address': inspection.permanent_address,
           
#             # Business Information
#             'market_situation': inspection.market_situation,
#             'client_position': inspection.client_position,
#             'business_reputation': inspection.business_reputation,
#             'production_type': inspection.production_type,
#             'product_name': inspection.product_name,
#             'production_capacity': inspection.production_capacity,
#             'actual_production': inspection.actual_production,
#             'profitability_observation': inspection.profitability_observation,
           
#             # Labor Force
#             'male_officer': inspection.male_officer,
#             'female_officer': inspection.female_officer,
#             'skilled_officer': inspection.skilled_officer,
#             'unskilled_officer': inspection.unskilled_officer,
#             'male_worker': inspection.male_worker,
#             'female_worker': inspection.female_worker,
#             'skilled_worker': inspection.skilled_worker,
#             'unskilled_worker': inspection.unskilled_worker,
           
#             # Financial Information
#             'cash_balance': inspection.cash_balance,
#             'stock_trade_finished': inspection.stock_trade_finished,
#             'stock_trade_financial': inspection.stock_trade_financial,
#             'accounts_receivable': inspection.accounts_receivable,
#             'advance_deposit': inspection.advance_deposit,
#             'other_current_assets': inspection.other_current_assets,
#             'land_building': inspection.land_building,
#             'plant_machinery': inspection.plant_machinery,
#             'other_assets': inspection.other_assets,
#             'ibbl_investment': inspection.ibbl_investment,
#             'other_banks_investment': inspection.other_banks_investment,
#             'borrowing_sources': inspection.borrowing_sources,
#             'accounts_payable': inspection.accounts_payable,
#             'other_current_liabilities': inspection.other_current_liabilities,
#             'long_term_liabilities': inspection.long_term_liabilities,
#             'other_non_current_liabilities': inspection.other_non_current_liabilities,
#             'paid_up_capital': inspection.paid_up_capital,
#             'retained_earning': inspection.retained_earning,
#             'resources': inspection.resources,
           
#             # Media fields with proper parsing - BASE64 DATA INCLUDED
#             'site_photos': site_photos,
#             'site_video': site_video,
#             'uploaded_documents': uploaded_documents,
#         }
       
#         return Response(inspection_data)
       
#     except Inspection.DoesNotExist:
#         return Response(
#             {'error': 'Inspection not found'},
#             status=404
#         )
#     except Exception as e:
#         print(f"🚨 Error in admin_inspection_detail: {str(e)}")
#         return Response(
#             {'error': str(e)},
#             status=500
#         )

# # ✅ NEW COMPREHENSIVE ADMIN DASHBOARD STATS VIEW
# class AdminDashboardStatsView(APIView):
#     permission_classes = [IsAuthenticated]
   
#     def get(self, request):
#         try:
#             # Check if user is admin
#             if request.user.role != 'admin':
#                 return Response(
#                     {'error': 'You do not have permission to access this data'},
#                     status=status.HTTP_403_FORBIDDEN
#                 )

#             # Basic counts
#             all_inspections = Inspection.objects.all()
#             stats = {
#                 'all': all_inspections.count(),
#                 'pending': all_inspections.filter(status='Pending').count(),
#                 'inProgress': all_inspections.filter(status='In Progress').count(),
#                 'completed': all_inspections.filter(status='Completed').count(),
#                 'approved': all_inspections.filter(status='Approved').count(),
#                 'rejected': all_inspections.filter(status='Rejected').count(),
#             }
           
#             # Status distribution for chart
#             status_distribution = []
#             status_choices = ['Pending', 'In Progress', 'Completed', 'Approved', 'Rejected']
#             colors = ['bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500']
           
#             for status, color in zip(status_choices, colors):
#                 count = all_inspections.filter(status=status).count()
#                 status_distribution.append({
#                     'status': status,
#                     'count': count,
#                     'color': color
#                 })
           
#             stats['statusDistribution'] = status_distribution
           
#             # ✅ FIXED: Branch-wise distribution - Group by branch and count
#             branch_wise = []
#             # Get branch-wise counts using aggregation
#             branch_counts = Inspection.objects.filter(
#                 branch_name__isnull=False
#             ).exclude(
#                 branch_name=''
#             ).values('branch_name').annotate(
#                 count=Count('id')
#             ).order_by('-count')
           
#             branch_colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-red-600', 'bg-indigo-600', 'bg-pink-600']
           
#             for i, branch_data in enumerate(branch_counts):
#                 branch_wise.append({
#                     'branch': branch_data['branch_name'],
#                     'count': branch_data['count'],
#                     'color': branch_colors[i % len(branch_colors)]
#                 })
           
#             # If no branch data, use default branches with actual counts
#             if not branch_wise:
#                 default_branches = ['Dhaka Main', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi']
#                 for i, branch in enumerate(default_branches):
#                     count = all_inspections.filter(branch_name=branch).count()
#                     branch_wise.append({
#                         'branch': branch,
#                         'count': count,
#                         'color': branch_colors[i % len(branch_colors)]
#                     })
           
#             stats['branchWise'] = branch_wise
           
#             # Monthly trend (last 6 months)
#             monthly_trend = []
#             current_date = timezone.now()
           
#             for i in range(5, -1, -1):
#                 # Calculate month start and end
#                 month_date = current_date - timedelta(days=30*i)
#                 month_name = month_date.strftime('%b')
               
#                 # Get start of month
#                 month_start = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
               
#                 # Get end of month
#                 if i == 0:
#                     month_end = current_date
#                 else:
#                     next_month = month_start + timedelta(days=32)
#                     month_end = next_month.replace(day=1) - timedelta(days=1)
#                     month_end = month_end.replace(hour=23, minute=59, second=59, microsecond=999999)
               
#                 count = all_inspections.filter(
#                     created_at__gte=month_start,
#                     created_at__lte=month_end
#                 ).count()
               
#                 monthly_trend.append({
#                     'month': month_name,
#                     'inspections': count
#                 })
           
#             stats['monthlyTrend'] = monthly_trend
           
#             return Response(stats)
           
#         except Exception as e:
#             print(f"Error in AdminDashboardStatsView: {str(e)}")
#             return Response(
#                 {'error': str(e)},
#                 status=status.HTTP_500_INTERNAL_SERVER_ERROR
#             )

# @api_view(['GET'])
# def inspection_analytics(request):
#     """Get comprehensive inspection analytics data for admin dashboard"""
#     try:
#         # Status distribution
#         status_distribution = Inspection.objects.values('status').annotate(
#             count=Count('id')
#         ).order_by('status')
       
#         # Branch-wise distribution (only branches with inspections)
#         branch_distribution = Inspection.objects.filter(
#             branch_name__isnull=False
#         ).exclude(
#             branch_name=''
#         ).values('branch_name').annotate(
#             count=Count('id')
#         ).order_by('-count')
       
#         # Monthly trend (last 6 months)
#         six_months_ago = timezone.now() - timedelta(days=180)
#         monthly_trend = Inspection.objects.filter(
#             created_at__gte=six_months_ago
#         ).annotate(
#             month=TruncMonth('created_at')
#         ).values('month').annotate(
#             count=Count('id')
#         ).order_by('month')
       
#         # Industry-wise distribution
#         industry_distribution = Inspection.objects.filter(
#             industry_name__isnull=False
#         ).exclude(
#             industry_name=''
#         ).values('industry_name').annotate(
#             count=Count('id')
#         ).order_by('-count')[:10]  # Top 10 industries
       
#         # Calculate performance metrics
#         total_inspections = Inspection.objects.count()
#         approved_count = Inspection.objects.filter(status='Approved').count()
#         pending_count = Inspection.objects.filter(status='Pending').count()
#         rejected_count = Inspection.objects.filter(status='Rejected').count()
#         in_progress_count = Inspection.objects.filter(status='In Progress').count()
#         completed_count = Inspection.objects.filter(status='Completed').count()
       
#         approval_rate = (approved_count / total_inspections * 100) if total_inspections > 0 else 0
#         pending_rate = (pending_count / total_inspections * 100) if total_inspections > 0 else 0
       
#         # Monthly average (last 6 months)
#         avg_per_month = total_inspections / 6 if total_inspections > 0 else 0
       
#         analytics_data = {
#             'status_distribution': list(status_distribution),
#             'branch_distribution': list(branch_distribution),
#             'monthly_trend': list(monthly_trend),
#             'industry_distribution': list(industry_distribution),
#             'quick_stats': {
#                 'approval_rate': round(approval_rate, 1),
#                 'pending_rate': round(pending_rate, 1),
#                 'total_inspections': total_inspections,
#                 'avg_per_month': round(avg_per_month, 1),
#                 'approved_count': approved_count,
#                 'pending_count': pending_count,
#                 'rejected_count': rejected_count,
#                 'in_progress_count': in_progress_count,
#                 'completed_count': completed_count,
#             }
#         }
       
#         return Response(analytics_data)
       
#     except Exception as e:
#         print(f"Error in inspection_analytics: {str(e)}")
#         return Response(
#             {'error': str(e)},
#             status=500
#         )

# # views.py - নিচের অংশে যোগ করুন
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def admin_inspectors_list(request):
#     """Get all inspectors for admin"""
#     try:
#         if request.user.role != 'admin':
#             return Response(
#                 {'error': 'You do not have permission to access this data'},
#                 status=status.HTTP_403_FORBIDDEN
#             )
       
#         inspectors = CustomUser.objects.filter(role='inspector').order_by('user_name')
#         serializer = UserSerializer(inspectors, many=True)
#         return Response(serializer.data)
       
#     except Exception as e:
#         return Response(
#             {'error': str(e)},
#             status=status.HTTP_500_INTERNAL_SERVER_ERROR
#         )

# # NEW: Utility function to handle base64 media data
# def handle_base64_media_data(data):
#     """
#     Process base64 media data before saving to database
#     """
#     try:
#         # Process site_photos
#         if 'site_photos' in data and isinstance(data['site_photos'], list):
#             for photo in data['site_photos']:
#                 if isinstance(photo, dict) and 'base64_data' in photo:
#                     # Validate base64 data
#                     base64_data = photo['base64_data']
#                     try:
#                         # Try to decode to validate
#                         base64.b64decode(base64_data, validate=True)
#                         print(f"✅ Valid base64 photo data: {len(base64_data)} characters")
#                     except (binascii.Error, ValueError) as e:
#                         print(f"❌ Invalid base64 data in photo: {e}")
#                         # Remove invalid base64 data
#                         photo.pop('base64_data', None)
       
#         # Process site_video
#         if 'site_video' in data and isinstance(data['site_video'], dict):
#             video = data['site_video']
#             if 'base64_data' in video:
#                 base64_data = video['base64_data']
#                 try:
#                     base64.b64decode(base64_data, validate=True)
#                     print(f"✅ Valid base64 video data: {len(base64_data)} characters")
#                 except (binascii.Error, ValueError) as e:
#                     print(f"❌ Invalid base64 data in video: {e}")
#                     video.pop('base64_data', None)
       
#         # Process uploaded_documents
#         if 'uploaded_documents' in data and isinstance(data['uploaded_documents'], list):
#             for doc in data['uploaded_documents']:
#                 if isinstance(doc, dict) and 'base64_data' in doc:
#                     base64_data = doc['base64_data']
#                     try:
#                         base64.b64decode(base64_data, validate=True)
#                         print(f"✅ Valid base64 document data: {len(base64_data)} characters")
#                     except (binascii.Error, ValueError) as e:
#                         print(f"❌ Invalid base64 data in document: {e}")
#                         doc.pop('base64_data', None)
       
#         return data
       
#     except Exception as e:
#         print(f"🚨 Error in handle_base64_media_data: {e}")
#         return data

# # NEW: API to get media file by ID
# @api_view(['GET'])
# def get_media_file(request, inspection_id, media_type, file_index):
#     """
#     Get specific media file (photo/video/document) by index
#     """
#     try:
#         inspection = Inspection.objects.get(id=inspection_id)
       
#         if media_type == 'photo':
#             media_list = inspection.site_photos
#             if isinstance(media_list, str):
#                 media_list = json.loads(media_list)
           
#             if isinstance(media_list, list) and len(media_list) > file_index:
#                 media_data = media_list[file_index]
#                 if 'base64_data' in media_data:
#                     return Response({
#                         'file_name': media_data.get('file_name', f'photo_{file_index}.jpg'),
#                         'file_type': media_data.get('file_type', 'image/jpeg'),
#                         'base64_data': media_data['base64_data'],
#                         'description': media_data.get('description', '')
#                     })
       
#         elif media_type == 'video':
#             media_data = inspection.site_video
#             if isinstance(media_data, str):
#                 media_data = json.loads(media_data)
           
#             if isinstance(media_data, dict) and 'base64_data' in media_data:
#                 return Response({
#                     'file_name': media_data.get('file_name', 'site_video.mp4'),
#                     'file_type': media_data.get('file_type', 'video/mp4'),
#                     'base64_data': media_data['base64_data'],
#                     'description': media_data.get('description', '')
#                 })
       
#         elif media_type == 'document':
#             media_list = inspection.uploaded_documents
#             if isinstance(media_list, str):
#                 media_list = json.loads(media_list)
           
#             if isinstance(media_list, list) and len(media_list) > file_index:
#                 media_data = media_list[file_index]
#                 if 'base64_data' in media_data:
#                     return Response({
#                         'file_name': media_data.get('file_name', f'document_{file_index}'),
#                         'file_type': media_data.get('file_type', 'application/octet-stream'),
#                         'base64_data': media_data['base64_data'],
#                         'description': media_data.get('description', '')
#                     })
       
#         return Response({'error': 'Media file not found'}, status=404)
       
#     except Inspection.DoesNotExist:
#         return Response({'error': 'Inspection not found'}, status=404)
#     except Exception as e:
#         return Response({'error': str(e)}, status=500)
    



 # views.py - COMPLETE UPDATED VERSION
from rest_framework.views import APIView
from django.http import JsonResponse
from .models import Inspection, NewInspection
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import json
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from .models import Inspection, NewInspection
from .serializers import InspectionSerializer, InspectionCreateSerializer, NewInspectionSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from .auth_serializers import CustomTokenObtainSerializer
from .serializers import UserCreateSerializer, UserSerializer, PasswordResetSerializer, PasswordResetConfirmSerializer
from .models import CustomUser
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.utils.encoding import force_bytes, force_str
from django.core.mail import send_mail
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.db.models import Count, Q
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
import base64
import binascii
from rest_framework_simplejwt.tokens import RefreshToken  # IMPORT ADDED

# ==================== AUTHENTICATION APIs ====================

# JWT Login (Keep for backward compatibility)
class CustomTokenObtainView(APIView):
    permission_classes = []
    def post(self, request):
        ser = CustomTokenObtainSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        return Response(ser.validated_data)

# NEW: User Signup API
@api_view(['POST'])
@permission_classes([])  # No authentication required for signup
def user_signup(request):
    """
    User signup with default inspector role
    """
    try:
        print("🟢 SIGNUP REQUEST RECEIVED")
        print(f"📦 Request data: {request.data}")
        print(f"📦 Data type: {type(request.data)}")
        data = request.data.copy()
        
        # Set default role as inspector
        data['role'] = 'inspector'
        
        # Validate required fields
        required_fields = ['user_name', 'email', 'employee_id', 'branch_name', 'password']
        for field in required_fields:
            if not data.get(field):
                return Response(
                    {'error': f'{field} is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        # Check if email already exists
        if CustomUser.objects.filter(email=data['email']).exists():
            return Response(
                {'error': 'Email already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if employee_id already exists
        if CustomUser.objects.filter(employee_id=data['employee_id']).exists():
            return Response(
                {'error': 'Employee ID already exists'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = UserCreateSerializer(data=data)
        if serializer.is_valid():
            user = serializer.save()
            
            # Return success response
            return Response({
                'success': True,
                'message': 'User registered successfully as Inspector',
                'user': {
                    'id': user.id,
                    'user_name': user.user_name,
                    'email': user.email,
                    'employee_id': user.employee_id,
                    'branch_name': user.branch_name,
                    'role': user.role
                }
            }, status=status.HTTP_201_CREATED)
        else:
            return Response(
                {'error': serializer.errors},
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except Exception as e:
        return Response(
            {'error': f'Registration failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# NEW: Updated Login API for new credential system
class CustomLoginView(APIView):
    permission_classes = []
    
    def post(self, request):
        try:
            # Get login credentials
            employee_id = request.data.get('employee_id')
            branch_name = request.data.get('branch_name')
            password = request.data.get('password')
            
            # Validate required fields
            if not employee_id or not branch_name or not password:
                return Response(
                    {'error': 'Employee ID, Branch Code and Password are required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Find user by employee_id and branch_name
            try:
                user = CustomUser.objects.get(
                    employee_id=employee_id, 
                    branch_name=branch_name
                )
            except CustomUser.DoesNotExist:
                return Response(
                    {'error': 'Invalid Employee ID or Branch Code'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check password
            if not user.check_password(password):
                return Response(
                    {'error': 'Invalid password'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Check if user is active
            if not user.is_active:
                return Response(
                    {'error': 'Your account is deactivated. Please contact administrator.'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Generate tokens
            refresh = RefreshToken.for_user(user)
            
            user_data = {
                'id': user.id,
                'user_name': user.user_name,
                'email': user.email,
                'employee_id': user.employee_id,
                'branch_name': user.branch_name,
                'role': user.role,
            }
            
            return Response({
                'success': True,
                'message': 'Login successful',
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data
            })
            
        except Exception as e:
            print(f"🚨 Login error: {str(e)}")
            return Response(
                {'error': f'Login failed: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# ==================== USER MANAGEMENT ====================

# List/Create users (super admin can create branch admins/inspectors)
class UserListCreateView(generics.ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserCreateSerializer
    permission_classes = [IsAuthenticated]

# Forgot password
class PasswordResetView(APIView):
    permission_classes = []
    def post(self, request):
        ser = PasswordResetSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        email = ser.validated_data['email']
        try:
            user = CustomUser.objects.get(email=email)
        except CustomUser.DoesNotExist:
            return Response({'detail': 'If that email exists, a reset link was sent.'})
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_url = f"{settings.FRONTEND_URL}/reset-password?uid={uid}&token={token}"
        send_mail(
            subject='InvestTracker Password Reset',
            message=f'Click here to reset your password:\n\n{reset_url}',
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )
        return Response({'detail': 'If that email exists, a reset link was sent.'})

# Confirm password reset
class PasswordResetConfirmView(APIView):
    permission_classes = []
    def post(self, request):
        ser = PasswordResetConfirmSerializer(data=request.data)
        ser.is_valid(raise_exception=True)
        uid = ser.validated_data['uid']
        token = ser.validated_data['token']
        new_password = ser.validated_data['new_password']
        try:
            uid_decoded = force_str(urlsafe_base64_decode(uid))
            user = CustomUser.objects.get(pk=uid_decoded)
        except Exception:
            return Response({'detail':'Invalid uid'}, status=status.HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, token):
            return Response({'detail':'Invalid or expired token'}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({'detail':'Password reset successful'})

# ==================== ROLE-BASED CRUD ====================

# Admin creates Branch Admin
@api_view(['POST'])
def create_branch_admin(request):
    data = request.data
    data['role'] = 'branch_admin'
    serializer = UserCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Admin lists Branch Admins
@api_view(['GET'])
def list_branch_admins(request):
    admins = CustomUser.objects.filter(role='branch_admin')
    serializer = UserSerializer(admins, many=True)
    return Response(serializer.data)

# Branch Admin creates Inspector
@api_view(['POST'])
def create_inspector(request):
    data = request.data
    data['role'] = 'inspector'
    serializer = UserCreateSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Branch Admin lists Inspectors in his branch
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_inspectors(request):
    # logged-in user থেকে branch_name নাও
    branch_name = request.user.branch_name

    # শুধু ওই branch এর inspectors filter করো
    inspectors = CustomUser.objects.filter(role='inspector', branch_name=branch_name)
    serializer = UserSerializer(inspectors, many=True)
    return Response(serializer.data)

# Update user (Branch Admin / Admin)
@api_view(['PUT'])
def update_user(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({"error":"User not found"}, status=404)
    serializer = UserCreateSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)

# Delete user (Branch Admin / Admin)
@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        user = CustomUser.objects.get(id=user_id)
    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=404)
    user.delete()
    return Response({"message": "User deleted successfully"})

# ==================== NEW INSPECTION VIEWS ====================

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_new_inspection(request):
    """
    Create a new inspection (for branch admin/admin)
    """
    try:
        # Add debug print to see incoming data
        print("📨 Received new inspection creation request:")
        print(f"📤 Request data: {request.data}")
        print(f"👤 User: {request.user}")
        print(f"🎯 User role: {request.user.role}")

        # Check if user has permission to create inspections
        if request.user.role not in ['inspector','admin', 'branch_admin']:
            return Response(
                {"error": "You don't have permission to create inspections."},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = NewInspectionSerializer(data=request.data)
       
        if serializer.is_valid():
            print("✅ Serializer is valid")
            inspection = serializer.save()
           
            # Return the created inspection data
            response_serializer = NewInspectionSerializer(inspection)
            print(f"✅ New Inspection created successfully: {inspection.id}")
           
            return Response(response_serializer.data, status=status.HTTP_201_CREATED)
        else:
            print("❌ Serializer errors:", serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
           
    except Exception as e:
        print(f"🚨 Error in create_new_inspection: {str(e)}")
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_new_inspections(request):
    """
    List all new inspections (for branch admin/admin and inspectors)
    """
    try:
        # Allow both admin/branch_admin AND inspectors to view
        if request.user.role not in ['admin', 'branch_admin', 'inspector']:
            return Response(
                {"error": "You don't have permission to view inspections."},
                status=status.HTTP_403_FORBIDDEN
            )

        # For branch admin, only show inspections from their branch
        if request.user.role == 'branch_admin':
            inspections = NewInspection.objects.filter(branch_name=request.user.branch_name)
        elif request.user.role == 'inspector':
            # For inspector, show only inspections assigned to them
            inspections = NewInspection.objects.filter(assigned_inspector=request.user)
        else:
            # For super admin, show all inspections
            inspections = NewInspection.objects.all()
       
        inspections = inspections.order_by('-created_at')
        serializer = NewInspectionSerializer(inspections, many=True)
   ########################3    

        if len(serializer.data) > 0:
            for i, insp in enumerate(serializer.data[:3]):
                print(f"📋 Inspection {i+1}: Client: {insp['client_name']}, Inspector: {insp['assigned_inspector']}, Branch: {insp['branch_name']}")
        return Response(serializer.data, status=status.HTTP_200_OK)
##########################
    except Exception as e:
        print(f"🚨 Error in list_new_inspections: {str(e)}")
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# NEW: Get current user information
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    """
    Get current user information
    """
    try:
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(
            {"error": f"An error occurred: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# ==================== MAIN INSPECTION VIEWSET ====================

class InspectionViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['investment_category', 'status', 'legal_status']
   
    def get_queryset(self):
        # IMPORTANT: Users can only see their own inspections
        print(f"🔍 Getting inspections for user: {self.request.user.username} (ID: {self.request.user.id})")
        user_inspections = Inspection.objects.filter(inspector=self.request.user)
        print(f"📊 Found {user_inspections.count()} inspections for user {self.request.user.username}")
        return user_inspections
   
    def get_serializer_class(self):
        if self.action == 'create':
            return InspectionCreateSerializer
        return InspectionSerializer
   
    def perform_create(self, serializer):
        # Handle base64 media data before saving
        data = self.request.data
       
        # Process site_photos base64 data
        site_photos_data = data.get('site_photos', [])
        if site_photos_data:
            processed_photos = []
            for photo_data in site_photos_data:
                if isinstance(photo_data, dict) and 'base64_data' in photo_data:
                    # Keep base64 data as is for storage
                    processed_photos.append(photo_data)
            data['site_photos'] = processed_photos
       
        # Process site_video base64 data
        site_video_data = data.get('site_video')
        if site_video_data and isinstance(site_video_data, dict) and 'base64_data' in site_video_data:
            # Keep base64 data as is for storage
            data['site_video'] = site_video_data
       
        # Process uploaded_documents base64 data
        uploaded_docs_data = data.get('uploaded_documents', [])
        if uploaded_docs_data:
            processed_docs = []
            for doc_data in uploaded_docs_data:
                if isinstance(doc_data, dict) and 'base64_data' in doc_data:
                    # Keep base64 data as is for storage
                    processed_docs.append(doc_data)
            data['uploaded_documents'] = processed_docs
       
        print(f"✅ Saving inspection for user: {self.request.user.username}")
        serializer.save(inspector=self.request.user)
   
    @action(detail=False, methods=['get'])
    def inspector_wise(self, request):
        # Get inspections grouped by inspector
        inspectors = CustomUser.objects.filter(
            inspections__isnull=False
        ).annotate(
            total_inspections=Count('inspections')
        ).values('id', 'user_name', 'email', 'total_inspections')
       
        return Response(inspectors)
   
    # FIXED: Get inspection statistics for current inspector
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get inspection statistics for the logged-in inspector
        """
        user = request.user
       
        try:
            # Get total inspections for this inspector
            user_inspections = Inspection.objects.filter(inspector=user)
            total = user_inspections.count()
           
            print(f"📊 Calculating stats for user: {user.username}")
            print(f"📈 Total inspections: {total}")
           
            # Get counts by status
            pending = user_inspections.filter(status='Pending').count()
            in_progress = user_inspections.filter(status='In Progress').count()
            completed = user_inspections.filter(status='Completed').count()
            approved = user_inspections.filter(status='Approved').count()
            rejected = user_inspections.filter(status='Rejected').count()
           
            stats_data = {
                'total': total,
                'pending': pending,
                'in_progress': in_progress,
                'completed': completed,
                'approved': approved,
                'rejected': rejected,
            }
           
            print(f"✅ Stats for user {user.username}: {stats_data}")
           
            return Response(stats_data, status=status.HTTP_200_OK)
           
        except Exception as e:
            print(f"🚨 Error in stats: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
   
    # FIXED: Get inspections by status with filtering - ONLY CURRENT USER'S INSPECTIONS
    @action(detail=False, methods=['get'])
    def by_status(self, request):
        """
        Get inspections filtered by status for the logged-in inspector
        """
        user = request.user
        status_param = request.query_params.get('status', 'all')
       
        try:
            # শুধুমাত্র current user-এর inspections
            queryset = Inspection.objects.filter(inspector=user)
           
            print(f"🔍 Filtering inspections for user: {user.username}")
            print(f"📊 Total inspections for user: {queryset.count()}")
           
            # Filter by status if provided and not 'all'
            if status_param and status_param != 'all':
                queryset = queryset.filter(status=status_param)
                print(f"🎯 Filtered by status '{status_param}': {queryset.count()} inspections")
           
            # Order by latest first
            queryset = queryset.order_by('-created_at')
           
            # Serialize the data
            serializer = InspectionSerializer(queryset, many=True)
           
            print(f"✅ Returning {len(serializer.data)} inspections for user {user.username}")
           
            return Response(serializer.data, status=status.HTTP_200_OK)
           
        except Exception as e:
            print(f"🚨 Error in by_status: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
   
    # FIXED: Update inspection status
    @action(detail=True, methods=['patch', 'put'])
    def update_status(self, request, pk=None):
        """
        Update inspection status
        """
        try:
            inspection = self.get_object()
            new_status = request.data.get('status')
           
            if not new_status:
                return Response(
                    {'error': 'Status is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
           
            # Validate status choice
            valid_statuses = dict(Inspection.STATUS_CHOICES).keys()
            if new_status not in valid_statuses:
                return Response(
                    {'error': f'Invalid status. Must be one of: {list(valid_statuses)}'},
                    status=status.HTTP_400_BAD_REQUEST
                )
           
            inspection.status = new_status
            inspection.save()
           
            serializer = self.get_serializer(inspection)
            return Response(serializer.data, status=status.HTTP_200_OK)
           
        except Inspection.DoesNotExist:
            return Response(
                {'error': 'Inspection not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

# ==================== ADMIN DASHBOARD VIEWS ====================

def inspection_stats(request):
    """Return inspection statistics for dashboard"""
    data = {
        "all": Inspection.objects.count(),
        "pending": Inspection.objects.filter(status="Pending").count(),
        "approved": Inspection.objects.filter(status="Approved").count(),
        "rejected": Inspection.objects.filter(status="Rejected").count(),
    }
    return JsonResponse(data)

@api_view(['GET'])
def branch_admin_stats(request):
    branch_name = request.GET.get('branch_name', '')  # read branch_name from query param
    if not branch_name:
        return Response({"error": "Branch name is required"}, status=400)
   
    inspections = Inspection.objects.filter(branch_name=branch_name)
   
    stats = {
        "all": inspections.count(),
        "pending": inspections.filter(status="Pending").count(),
        "approved": inspections.filter(status="Approved").count(),
        "rejected": inspections.filter(status="Rejected").count(),
    }
    return Response(stats)

@api_view(['GET'])
def admin_inspection_stats(request):
    """Get inspection statistics specifically for admin dashboard"""
    try:
        # Get total counts by status
        stats = {
            "all": Inspection.objects.count(),
            "pending": Inspection.objects.filter(status="Pending").count(),
            "approved": Inspection.objects.filter(status="Approved").count(),
            "rejected": Inspection.objects.filter(status="Rejected").count(),
        }
       
        return Response(stats)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=500
        )

@api_view(['GET'])
def admin_inspections_list(request):
    """Get inspections list for admin with filtering"""
    try:
        status = request.GET.get('status', 'all')
       
        inspections = Inspection.objects.all()
       
        if status != 'all':
            inspections = inspections.filter(status=status)
       
        # Serialize the data
        inspections_data = []
        for inspection in inspections:
            inspections_data.append({
                'id': inspection.id,
                'client_name': inspection.client_name,
                'industry_name': inspection.industry_name,
                'branch_name': inspection.branch_name,
                'status': inspection.status,
                'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
                'created_at': inspection.created_at,
                'updated_at': inspection.updated_at
            })
       
        return Response(inspections_data)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=500
        )

# FIXED: admin_inspection_detail function
@api_view(['GET'])
def admin_inspection_detail(request, inspection_id):
    """Get detailed inspection information for admin"""
    try:
        inspection = Inspection.objects.get(id=inspection_id)
       
        # Helper function to parse JSON fields
        def parse_json_field(field_data, field_name):
            print(f"🔄 Parsing {field_name}: {field_data}")
           
            if not field_data:
                return []
               
            if isinstance(field_data, str):
                try:
                    parsed_data = json.loads(field_data)
                    print(f"✅ Successfully parsed {field_name}: {parsed_data}")
                    return parsed_data
                except json.JSONDecodeError as e:
                    print(f"❌ JSON parse error for {field_name}: {e}")
                    # If it's a string but not valid JSON, treat it as a single item
                    return [field_data]
            elif isinstance(field_data, list):
                print(f"✅ {field_name} is already a list: {field_data}")
                return field_data
            else:
                print(f"⚠️ Unknown format for {field_name}: {type(field_data)}")
                return []

        # Parse media fields
        site_photos = parse_json_field(inspection.site_photos, 'site_photos')
        site_video = parse_json_field(inspection.site_video, 'site_video')
        uploaded_documents = parse_json_field(inspection.uploaded_documents, 'uploaded_documents')

        print(f"📊 Final parsed data:")
        print(f"Photos: {len(site_photos)} items")
        print(f"Videos: {len(site_video) if isinstance(site_video, list) else 1 if site_video else 0} items")
        print(f"Documents: {len(uploaded_documents)} items")

        # Serialize all inspection data
        inspection_data = {
            'id': inspection.id,
            'client_name': inspection.client_name,
            'industry_name': inspection.industry_name,
            'branch_name': inspection.branch_name,
            'status': inspection.status,
            'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
            'created_at': inspection.created_at,
            'updated_at': inspection.updated_at,
           
            # Client Information
            'group_name': inspection.group_name,
            'nature_of_business': inspection.nature_of_business,
            'legal_status': inspection.legal_status,
            'date_of_establishment': inspection.date_of_establishment,
            'office_address': inspection.office_address,
            'showroom_address': inspection.showroom_address,
            'factory_address': inspection.factory_address,
            'phone_number': inspection.phone_number,
            'account_number': inspection.account_number,
            'account_id': inspection.account_id,
            'tin_number': inspection.tin_number,
            'date_of_opening': inspection.date_of_opening,
            'vat_reg_number': inspection.vat_reg_number,
            'first_investment_date': inspection.first_investment_date,
            'sector_code': inspection.sector_code,
            'trade_license': inspection.trade_license,
            'economic_purpose_code': inspection.economic_purpose_code,
            'investment_category': inspection.investment_category,
           
            # Owner Information
            'owner_name': inspection.owner_name,
            'owner_age': inspection.owner_age,
            'father_name': inspection.father_name,
            'mother_name': inspection.mother_name,
            'spouse_name': inspection.spouse_name,
            'academic_qualification': inspection.academic_qualification,
            'children_info': inspection.children_info,
            'business_successor': inspection.business_successor,
            'residential_address': inspection.residential_address,
            'permanent_address': inspection.permanent_address,
           
            # Business Information
            'market_situation': inspection.market_situation,
            'client_position': inspection.client_position,
            'business_reputation': inspection.business_reputation,
            'production_type': inspection.production_type,
            'product_name': inspection.product_name,
            'production_capacity': inspection.production_capacity,
            'actual_production': inspection.actual_production,
            'profitability_observation': inspection.profitability_observation,
           
            # Labor Force
            'male_officer': inspection.male_officer,
            'female_officer': inspection.female_officer,
            'skilled_officer': inspection.skilled_officer,
            'unskilled_officer': inspection.unskilled_officer,
            'male_worker': inspection.male_worker,
            'female_worker': inspection.female_worker,
            'skilled_worker': inspection.skilled_worker,
            'unskilled_worker': inspection.unskilled_worker,
           
            # Financial Information
            'cash_balance': inspection.cash_balance,
            'stock_trade_finished': inspection.stock_trade_finished,
            'stock_trade_financial': inspection.stock_trade_financial,
            'accounts_receivable': inspection.accounts_receivable,
            'advance_deposit': inspection.advance_deposit,
            'other_current_assets': inspection.other_current_assets,
            'land_building': inspection.land_building,
            'plant_machinery': inspection.plant_machinery,
            'other_assets': inspection.other_assets,
            'ibbl_investment': inspection.ibbl_investment,
            'other_banks_investment': inspection.other_banks_investment,
            'borrowing_sources': inspection.borrowing_sources,
            'accounts_payable': inspection.accounts_payable,
            'other_current_liabilities': inspection.other_current_liabilities,
            'long_term_liabilities': inspection.long_term_liabilities,
            'other_non_current_liabilities': inspection.other_non_current_liabilities,
            'paid_up_capital': inspection.paid_up_capital,
            'retained_earning': inspection.retained_earning,
            'resources': inspection.resources,
           
            # Media fields with proper parsing - BASE64 DATA INCLUDED
            'site_photos': site_photos,
            'site_video': site_video,
            'uploaded_documents': uploaded_documents,
        }
       
        return Response(inspection_data)
       
    except Inspection.DoesNotExist:
        return Response(
            {'error': 'Inspection not found'},
            status=404
        )
    except Exception as e:
        print(f"🚨 Error in admin_inspection_detail: {str(e)}")
        return Response(
            {'error': str(e)},
            status=500
        )

# ✅ NEW COMPREHENSIVE ADMIN DASHBOARD STATS VIEW
class AdminDashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]
   
    def get(self, request):
        try:
            # Check if user is admin
            if request.user.role != 'admin':
                return Response(
                    {'error': 'You do not have permission to access this data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Basic counts
            all_inspections = Inspection.objects.all()
            stats = {
                'all': all_inspections.count(),
                'pending': all_inspections.filter(status='Pending').count(),
                'inProgress': all_inspections.filter(status='In Progress').count(),
                'completed': all_inspections.filter(status='Completed').count(),
                'approved': all_inspections.filter(status='Approved').count(),
                'rejected': all_inspections.filter(status='Rejected').count(),
            }
           
            # Status distribution for chart
            status_distribution = []
            status_choices = ['Pending', 'In Progress', 'Completed', 'Approved', 'Rejected']
            colors = ['bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500']
           
            for status, color in zip(status_choices, colors):
                count = all_inspections.filter(status=status).count()
                status_distribution.append({
                    'status': status,
                    'count': count,
                    'color': color
                })
           
            stats['statusDistribution'] = status_distribution
           
            # ✅ FIXED: Branch-wise distribution - Group by branch and count
            branch_wise = []
            # Get branch-wise counts using aggregation
            branch_counts = Inspection.objects.filter(
                branch_name__isnull=False
            ).exclude(
                branch_name=''
            ).values('branch_name').annotate(
                count=Count('id')
            ).order_by('-count')
           
            branch_colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-red-600', 'bg-indigo-600', 'bg-pink-600']
           
            for i, branch_data in enumerate(branch_counts):
                branch_wise.append({
                    'branch': branch_data['branch_name'],
                    'count': branch_data['count'],
                    'color': branch_colors[i % len(branch_colors)]
                })
           
            # If no branch data, use default branches with actual counts
            if not branch_wise:
                default_branches = ['Dhaka Main', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi']
                for i, branch in enumerate(default_branches):
                    count = all_inspections.filter(branch_name=branch).count()
                    branch_wise.append({
                        'branch': branch,
                        'count': count,
                        'color': branch_colors[i % len(branch_colors)]
                    })
           
            stats['branchWise'] = branch_wise
           
            # Monthly trend (last 6 months)
            monthly_trend = []
            current_date = timezone.now()
           
            for i in range(5, -1, -1):
                # Calculate month start and end
                month_date = current_date - timedelta(days=30*i)
                month_name = month_date.strftime('%b')
               
                # Get start of month
                month_start = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
               
                # Get end of month
                if i == 0:
                    month_end = current_date
                else:
                    next_month = month_start + timedelta(days=32)
                    month_end = next_month.replace(day=1) - timedelta(days=1)
                    month_end = month_end.replace(hour=23, minute=59, second=59, microsecond=999999)
               
                count = all_inspections.filter(
                    created_at__gte=month_start,
                    created_at__lte=month_end
                ).count()
               
                monthly_trend.append({
                    'month': month_name,
                    'inspections': count
                })
           
            stats['monthlyTrend'] = monthly_trend
           
            return Response(stats)
           
        except Exception as e:
            print(f"Error in AdminDashboardStatsView: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@api_view(['GET'])
def inspection_analytics(request):
    """Get comprehensive inspection analytics data for admin dashboard"""
    try:
        # Status distribution
        status_distribution = Inspection.objects.values('status').annotate(
            count=Count('id')
        ).order_by('status')
       
        # Branch-wise distribution (only branches with inspections)
        branch_distribution = Inspection.objects.filter(
            branch_name__isnull=False
        ).exclude(
            branch_name=''
        ).values('branch_name').annotate(
            count=Count('id')
        ).order_by('-count')
       
        # Monthly trend (last 6 months)
        six_months_ago = timezone.now() - timedelta(days=180)
        monthly_trend = Inspection.objects.filter(
            created_at__gte=six_months_ago
        ).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            count=Count('id')
        ).order_by('month')
       
        # Industry-wise distribution
        industry_distribution = Inspection.objects.filter(
            industry_name__isnull=False
        ).exclude(
            industry_name=''
        ).values('industry_name').annotate(
            count=Count('id')
        ).order_by('-count')[:10]  # Top 10 industries
       
        # Calculate performance metrics
        total_inspections = Inspection.objects.count()
        approved_count = Inspection.objects.filter(status='Approved').count()
        pending_count = Inspection.objects.filter(status='Pending').count()
        rejected_count = Inspection.objects.filter(status='Rejected').count()
        in_progress_count = Inspection.objects.filter(status='In Progress').count()
        completed_count = Inspection.objects.filter(status='Completed').count()
       
        approval_rate = (approved_count / total_inspections * 100) if total_inspections > 0 else 0
        pending_rate = (pending_count / total_inspections * 100) if total_inspections > 0 else 0
       
        # Monthly average (last 6 months)
        avg_per_month = total_inspections / 6 if total_inspections > 0 else 0
       
        analytics_data = {
            'status_distribution': list(status_distribution),
            'branch_distribution': list(branch_distribution),
            'monthly_trend': list(monthly_trend),
            'industry_distribution': list(industry_distribution),
            'quick_stats': {
                'approval_rate': round(approval_rate, 1),
                'pending_rate': round(pending_rate, 1),
                'total_inspections': total_inspections,
                'avg_per_month': round(avg_per_month, 1),
                'approved_count': approved_count,
                'pending_count': pending_count,
                'rejected_count': rejected_count,
                'in_progress_count': in_progress_count,
                'completed_count': completed_count,
            }
        }
       
        return Response(analytics_data)
       
    except Exception as e:
        print(f"Error in inspection_analytics: {str(e)}")
        return Response(
            {'error': str(e)},
            status=500
        )

# Admin inspectors list
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_inspectors_list(request):
    """Get all inspectors for admin"""
    try:
        if request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )
       
        inspectors = CustomUser.objects.filter(role='inspector').order_by('user_name')
        serializer = UserSerializer(inspectors, many=True)
        return Response(serializer.data)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# NEW: Utility function to handle base64 media data
def handle_base64_media_data(data):
    """
    Process base64 media data before saving to database
    """
    try:
        # Process site_photos
        if 'site_photos' in data and isinstance(data['site_photos'], list):
            for photo in data['site_photos']:
                if isinstance(photo, dict) and 'base64_data' in photo:
                    # Validate base64 data
                    base64_data = photo['base64_data']
                    try:
                        # Try to decode to validate
                        base64.b64decode(base64_data, validate=True)
                        print(f"✅ Valid base64 photo data: {len(base64_data)} characters")
                    except (binascii.Error, ValueError) as e:
                        print(f"❌ Invalid base64 data in photo: {e}")
                        # Remove invalid base64 data
                        photo.pop('base64_data', None)
       
        # Process site_video
        if 'site_video' in data and isinstance(data['site_video'], dict):
            video = data['site_video']
            if 'base64_data' in video:
                base64_data = video['base64_data']
                try:
                    base64.b64decode(base64_data, validate=True)
                    print(f"✅ Valid base64 video data: {len(base64_data)} characters")
                except (binascii.Error, ValueError) as e:
                    print(f"❌ Invalid base64 data in video: {e}")
                    video.pop('base64_data', None)
       
        # Process uploaded_documents
        if 'uploaded_documents' in data and isinstance(data['uploaded_documents'], list):
            for doc in data['uploaded_documents']:
                if isinstance(doc, dict) and 'base64_data' in doc:
                    base64_data = doc['base64_data']
                    try:
                        base64.b64decode(base64_data, validate=True)
                        print(f"✅ Valid base64 document data: {len(base64_data)} characters")
                    except (binascii.Error, ValueError) as e:
                        print(f"❌ Invalid base64 data in document: {e}")
                        doc.pop('base64_data', None)
       
        return data
       
    except Exception as e:
        print(f"🚨 Error in handle_base64_media_data: {e}")
        return data

# NEW: API to get media file by ID
@api_view(['GET'])
def get_media_file(request, inspection_id, media_type, file_index):
    """
    Get specific media file (photo/video/document) by index
    """
    try:
        inspection = Inspection.objects.get(id=inspection_id)
       
        if media_type == 'photo':
            media_list = inspection.site_photos
            if isinstance(media_list, str):
                media_list = json.loads(media_list)
           
            if isinstance(media_list, list) and len(media_list) > file_index:
                media_data = media_list[file_index]
                if 'base64_data' in media_data:
                    return Response({
                        'file_name': media_data.get('file_name', f'photo_{file_index}.jpg'),
                        'file_type': media_data.get('file_type', 'image/jpeg'),
                        'base64_data': media_data['base64_data'],
                        'description': media_data.get('description', '')
                    })
       
        elif media_type == 'video':
            media_data = inspection.site_video
            if isinstance(media_data, str):
                media_data = json.loads(media_data)
           
            if isinstance(media_data, dict) and 'base64_data' in media_data:
                return Response({
                    'file_name': media_data.get('file_name', 'site_video.mp4'),
                    'file_type': media_data.get('file_type', 'video/mp4'),
                    'base64_data': media_data['base64_data'],
                    'description': media_data.get('description', '')
                })
       
        elif media_type == 'document':
            media_list = inspection.uploaded_documents
            if isinstance(media_list, str):
                media_list = json.loads(media_list)
           
            if isinstance(media_list, list) and len(media_list) > file_index:
                media_data = media_list[file_index]
                if 'base64_data' in media_data:
                    return Response({
                        'file_name': media_data.get('file_name', f'document_{file_index}'),
                        'file_type': media_data.get('file_type', 'application/octet-stream'),
                        'base64_data': media_data['base64_data'],
                        'description': media_data.get('description', '')
                    })
       
        return Response({'error': 'Media file not found'}, status=404)
       
    except Inspection.DoesNotExist:
        return Response({'error': 'Inspection not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)
    

######################################

# views.py - User Management APIs for Admin

## views.py - User Management APIs for Admin

# Get all users for admin
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_users_list(request):
    """Get all users for admin management"""
    try:
        # Check if user is admin
        if request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )

        users = CustomUser.objects.all().order_by('-date_joined')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Update user role - ADMIN ONLY
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def admin_update_user_role(request, user_id):
    """Update user role (admin only)"""
    try:
        # Check if user is admin
        if request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to perform this action'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent admin from modifying themselves
        if user.id == request.user.id:
            return Response(
                {'error': 'You cannot modify your own role'},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_role = request.data.get('role')
        
        # Validate role
        valid_roles = ['admin', 'branch_admin', 'inspector']
        if new_role not in valid_roles:
            return Response(
                {'error': f'Invalid role. Must be one of: {", ".join(valid_roles)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update user role
        user.role = new_role
        user.save()

        # Return updated user data
        serializer = UserSerializer(user)
        return Response({
            'success': True,
            'message': f'User role updated to {new_role}',
            'user': serializer.data
        })
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Update user active status - ADMIN ONLY
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def admin_update_user_status(request, user_id):
    """Update user active status (admin only)"""
    try:
        # Check if user is admin
        if request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to perform this action'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Prevent admin from deactivating themselves
        if user.id == request.user.id:
            return Response(
                {'error': 'You cannot deactivate yourself'},
                status=status.HTTP_400_BAD_REQUEST
            )

        new_status = request.data.get('is_active')
        if new_status is None:
            return Response(
                {'error': 'is_active field is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update user status
        user.is_active = bool(new_status)
        user.save()

        # Return updated user data
        serializer = UserSerializer(user)
        return Response({
            'success': True,
            'message': f'User status updated to {"Active" if user.is_active else "Inactive"}',
            'user': serializer.data
        })
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Get user details for admin
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_user_detail(request, user_id):
    """Get detailed user information for admin"""
    try:
        # Check if user is admin
        if request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = UserSerializer(user)
        return Response(serializer.data)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
###############################
# views.py - Branch Admin User Management APIs
# views.py - BRANCH ADMIN USER MANAGEMENT APIs

# Branch Admin Users List - UPDATED
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def branch_admin_users_list(request):
    """Get all users for branch admin's branch only - UPDATED"""
    try:
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Get branch admin's branch name
        branch_name = request.user.branch_name
        if not branch_name:
            return Response(
                {'error': 'Branch admin does not have a branch assigned'},
                status=status.HTTP_400_BAD_REQUEST
            )

        print(f"🔍 [BRANCH ADMIN USERS] Fetching users for branch: {branch_name}")

        # Get only users from the same branch (excluding super admin)
        users = CustomUser.objects.filter(
            branch_name=branch_name
        ).exclude(
            role='admin'  # Exclude admin users
        ).order_by('-date_joined')
        
        # Serialize data with limited fields
        users_data = []
        for user in users:
            users_data.append({
                'id': user.id,
                'user_name': user.user_name,
                'email': user.email,
                'employee_id': user.employee_id,
                'branch_name': user.branch_name,
                'role': user.role,
                'is_active': user.is_active,
                'date_joined': user.date_joined,
                'last_login': user.last_login
            })

        print(f"✅ [BRANCH ADMIN USERS] Returning {len(users_data)} users")
        return Response(users_data)
       
    except Exception as e:
        print(f"❌ Error in branch_admin_users_list: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# Branch Admin Update User Status - NEW FUNCTION
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def branch_admin_update_user_status(request, user_id):
    """Update user active status (branch admin only)"""
    try:
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            return Response(
                {'error': 'You do not have permission to perform this action'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if the target user is in the same branch
        if user.branch_name != request.user.branch_name:
            return Response(
                {'error': 'You can only manage users from your own branch'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if trying to modify an admin user
        if user.role == 'admin':
            return Response(
                {'error': 'You cannot modify admin users'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Check if trying to modify self
        if user.id == request.user.id:
            return Response(
                {'error': 'You cannot modify your own status'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get new status from request
        new_status = request.data.get('is_active')
        if new_status is None:
            return Response(
                {'error': 'is_active field is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update user status
        user.is_active = bool(new_status)
        user.save()

        # Return updated user data
        return Response({
            'success': True,
            'message': f'User status updated to {"Active" if user.is_active else "Inactive"}',
            'user': {
                'id': user.id,
                'user_name': user.user_name,
                'email': user.email,
                'role': user.role,
                'is_active': user.is_active
            }
        })
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# REMOVE OR DISABLE THE ROLE UPDATE FUNCTION FOR BRANCH ADMIN
# Branch admin should NOT be able to change roles

# Branch Admin User Detail - UPDATED
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def branch_admin_user_detail(request, user_id):
    """Get detailed user information for branch admin - READ ONLY"""
    try:
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )

        try:
            user = CustomUser.objects.get(id=user_id)
        except CustomUser.DoesNotExist:
            return Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check if the target user is in the same branch
        if user.branch_name != request.user.branch_name:
            return Response(
                {'error': 'You can only view users from your own branch'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Return limited user data (read-only)
        user_data = {
            'id': user.id,
            'user_name': user.user_name,
            'email': user.email,
            'employee_id': user.employee_id,
            'branch_name': user.branch_name,
            'role': user.role,
            'is_active': user.is_active,
            'date_joined': user.date_joined,
            'last_login': user.last_login
        }

        return Response(user_data)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )









#######################################
# # views.py - UPDATED BRANCH ADMIN INSPECTION APIs
# views.py - COMPLETE UPDATED BRANCH ADMIN APIs

# Branch Admin Inspection Statistics - UPDATED FOR C# views.py - FINAL FIXED VERSION

# views.py - NUCLEAR FIXED VERSION

# Branch Admin Inspection Statistics - NUCLEAR FIX
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def branch_admin_inspection_stats(request):
    """Get inspection statistics - NUCLEAR FIX"""
    try:
        if request.user.role != 'branch_admin':
            return Response({'error': 'Permission denied'}, status=403)

        branch_name = request.user.branch_name
        if not branch_name:
            return Response({'error': 'No branch assigned'}, status=400)

        print(f"🎯 [NUCLEAR STATS] Calculating for: {branch_name}")

        # ✅ USE ONLY NEWINSPECTION MODEL
        inspections = NewInspection.objects.filter(branch_name=branch_name)
        
        stats = {
            'all': inspections.count(),
            'pending': inspections.filter(status='pending').count(),
            'inProgress': inspections.filter(status='in_progress').count(),
            'completed': inspections.filter(status='completed').count(),
            'approved': inspections.filter(status='approved').count(),
            'rejected': inspections.filter(status='rejected').count(),
        }

        print(f"✅ [NUCLEAR STATS] Final: {stats}")
        return Response(stats)
       
    except Exception as e:
        print(f"❌ [NUCLEAR STATS] Error: {str(e)}")
        return Response({
            'all': 0, 'pending': 0, 'inProgress': 0, 
            'completed': 0, 'approved': 0, 'rejected': 0
        }, status=200)  # Still return default stats

# Branch Admin Inspections List - NUCLEAR FIX  
# views.py - BRANCH ADMIN INSPECTIONS LIST (STRICTLY BRANCH SPECIFIC)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def branch_admin_inspections_list(request):
    """Get inspections list for branch admin's branch ONLY"""
    try:
        print(f"🔍 [BACKEND BRANCH FILTER] Request from: {request.user.user_name}, Branch: {request.user.branch_name}")
        
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            return Response(
                {'error': 'Permission denied'}, 
                status=status.HTTP_403_FORBIDDEN
            )

        branch_name = request.user.branch_name
        if not branch_name:
            return Response(
                {'error': 'No branch assigned'}, 
                status=status.HTTP_400_BAD_REQUEST
            )

        print(f"🔍 [BACKEND BRANCH FILTER] Fetching for branch: {branch_name}")

        # STRICT FILTER: Only inspections from this specific branch
        inspections = Inspection.objects.filter(branch_name=branch_name)
        
        print(f"🔍 [BACKEND BRANCH FILTER] Found {inspections.count()} inspections")

        status_param = request.GET.get('status', 'all')
        if status_param != 'all':
            inspections = inspections.filter(status=status_param)
            print(f"🔍 [BACKEND BRANCH FILTER] After status filter: {inspections.count()}")

        # Serialize data
        inspections_data = []
        for inspection in inspections:
            # Double verification
            if inspection.branch_name != branch_name:
                print(f"🚨 [BACKEND BRANCH FILTER] SECURITY BREACH: Inspection {inspection.id} has wrong branch")
                continue
                
            inspections_data.append({
                'id': inspection.id,
                'client_name': inspection.client_name,
                'industry_name': inspection.industry_name,
                'branch_name': inspection.branch_name,
                'status': inspection.status,
                'inspector': inspection.inspector.username if inspection.inspector else 'Unassigned',
                'project': getattr(inspection, 'project', 'N/A'),
                'phone_number': getattr(inspection, 'phone_number', 'N/A'),
                'created_at': inspection.created_at,
                'updated_at': inspection.updated_at
            })

        print(f"✅ [BACKEND BRANCH FILTER] Returning {len(inspections_data)} inspections")
        return Response(inspections_data)
       
    except Exception as e:
        print(f"❌ [BACKEND BRANCH FILTER] Error: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Branch Admin Inspection Detail - FIXED
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def branch_admin_inspection_detail(request, inspection_id):
    """Get detailed inspection information for branch admin - BRANCH SPECIFIC"""
    try:
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )

        branch_name = request.user.branch_name
        if not branch_name:
            return Response(
                {'error': 'Branch admin does not have a branch assigned'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get inspection and verify it belongs to the branch admin's branch
        try:
            inspection = Inspection.objects.get(id=inspection_id, branch_name=branch_name)
        except Inspection.DoesNotExist:
            return Response(
                {'error': 'Inspection not found or does not belong to your branch'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Use the same parsing logic as admin_inspection_detail
        def parse_json_field(field_data, field_name):
            if not field_data:
                return []
               
            if isinstance(field_data, str):
                try:
                    parsed_data = json.loads(field_data)
                    return parsed_data
                except json.JSONDecodeError:
                    return [field_data]
            elif isinstance(field_data, list):
                return field_data
            else:
                return []

        # Parse media fields
        site_photos = parse_json_field(inspection.site_photos, 'site_photos')
        site_video = parse_json_field(inspection.site_video, 'site_video')
        uploaded_documents = parse_json_field(inspection.uploaded_documents, 'uploaded_documents')

        # Serialize all inspection data
        inspection_data = {
            'id': inspection.id,
            'client_name': inspection.client_name,
            'industry_name': inspection.industry_name,
            'branch_name': inspection.branch_name,
            'status': inspection.status,
            'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
            'created_at': inspection.created_at,
            'updated_at': inspection.updated_at,
           
            # Client Information
            'group_name': inspection.group_name,
            'nature_of_business': inspection.nature_of_business,
            'legal_status': inspection.legal_status,
            'date_of_establishment': inspection.date_of_establishment,
            'office_address': inspection.office_address,
            'showroom_address': inspection.showroom_address,
            'factory_address': inspection.factory_address,
            'phone_number': inspection.phone_number,
            'account_number': inspection.account_number,
            'account_id': inspection.account_id,
            'tin_number': inspection.tin_number,
            'date_of_opening': inspection.date_of_opening,
            'vat_reg_number': inspection.vat_reg_number,
            'first_investment_date': inspection.first_investment_date,
            'sector_code': inspection.sector_code,
            'trade_license': inspection.trade_license,
            'economic_purpose_code': inspection.economic_purpose_code,
            'investment_category': inspection.investment_category,
           
            # Owner Information
            'owner_name': inspection.owner_name,
            'owner_age': inspection.owner_age,
            'father_name': inspection.father_name,
            'mother_name': inspection.mother_name,
            'spouse_name': inspection.spouse_name,
            'academic_qualification': inspection.academic_qualification,
            'children_info': inspection.children_info,
            'business_successor': inspection.business_successor,
            'residential_address': inspection.residential_address,
            'permanent_address': inspection.permanent_address,
           
            # Business Information
            'market_situation': inspection.market_situation,
            'client_position': inspection.client_position,
            'business_reputation': inspection.business_reputation,
            'production_type': inspection.production_type,
            'product_name': inspection.product_name,
            'production_capacity': inspection.production_capacity,
            'actual_production': inspection.actual_production,
            'profitability_observation': inspection.profitability_observation,
           
            # Labor Force
            'male_officer': inspection.male_officer,
            'female_officer': inspection.female_officer,
            'skilled_officer': inspection.skilled_officer,
            'unskilled_officer': inspection.unskilled_officer,
            'male_worker': inspection.male_worker,
            'female_worker': inspection.female_worker,
            'skilled_worker': inspection.skilled_worker,
            'unskilled_worker': inspection.unskilled_worker,
           
            # Financial Information
            'cash_balance': inspection.cash_balance,
            'stock_trade_finished': inspection.stock_trade_finished,
            'stock_trade_financial': inspection.stock_trade_financial,
            'accounts_receivable': inspection.accounts_receivable,
            'advance_deposit': inspection.advance_deposit,
            'other_current_assets': inspection.other_current_assets,
            'land_building': inspection.land_building,
            'plant_machinery': inspection.plant_machinery,
            'other_assets': inspection.other_assets,
            'ibbl_investment': inspection.ibbl_investment,
            'other_banks_investment': inspection.other_banks_investment,
            'borrowing_sources': inspection.borrowing_sources,
            'accounts_payable': inspection.accounts_payable,
            'other_current_liabilities': inspection.other_current_liabilities,
            'long_term_liabilities': inspection.long_term_liabilities,
            'other_non_current_liabilities': inspection.other_non_current_liabilities,
            'paid_up_capital': inspection.paid_up_capital,
            'retained_earning': inspection.retained_earning,
            'resources': inspection.resources,
           
            # Media fields with proper parsing
            'site_photos': site_photos,
            'site_video': site_video,
            'uploaded_documents': uploaded_documents,
        }

        print(f"🔍 Branch Admin Inspection Detail for {branch_name}: {inspection_id}")
        return Response(inspection_data)
       
    except Exception as e:
        print(f"❌ Error in branch_admin_inspection_detail: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# ==================== BRANCH ADMIN INSPECTION STATUS UPDATE ====================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def branch_admin_inspections_list(request):
    """Get inspections list for branch admin's branch ONLY - STRICTLY BRANCH SPECIFIC"""
    try:
        print(f"🔍 [BRANCH FILTER] Request from user: {request.user.user_name}, Role: {request.user.role}")
        
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            print(f"❌ [BRANCH FILTER] User is not branch admin, role: {request.user.role}")
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )

        branch_name = request.user.branch_name
        if not branch_name:
            print("❌ [BRANCH FILTER] Branch admin has no branch assigned")
            return Response(
                {'error': 'Branch admin does not have a branch assigned'},
                status=status.HTTP_400_BAD_REQUEST
            )

        print(f"🔍 [BRANCH FILTER] Fetching inspections for branch: {branch_name}")

        # STRICT FILTER: Only inspections from this specific branch
        inspections = Inspection.objects.filter(branch_name=branch_name)
        
        print(f"🔍 [BRANCH FILTER] Raw query: SELECT * FROM inspections WHERE branch_name = '{branch_name}'")
        print(f"🔍 [BRANCH FILTER] Found {inspections.count()} inspections for branch {branch_name}")

        # Debug: Show what we're actually filtering
        if inspections.count() > 0:
            for i, insp in enumerate(inspections[:3]):  # Show first 3
                print(f"🔍 [BRANCH FILTER] Inspection {i+1}: ID={insp.id}, Client={insp.client_name}, Branch={insp.branch_name}, Inspector={insp.inspector.username if insp.inspector else 'N/A'}")
        else:
            print("🔍 [BRANCH FILTER] No inspections found for this branch")
            # Check if there are any inspections in other branches
            other_branches = Inspection.objects.exclude(branch_name=branch_name).values_list('branch_name', flat=True).distinct()
            print(f"🔍 [BRANCH FILTER] Inspections exist in other branches: {list(other_branches)}")

        status_param = request.GET.get('status', 'all')
       
        if status_param != 'all':
            inspections = inspections.filter(status=status_param)
            print(f"🔍 [BRANCH FILTER] After status filter '{status_param}': {inspections.count()} inspections")

        # Serialize the data - ONLY BRANCH SPECIFIC
        inspections_data = []
        for inspection in inspections:
            # Double-check branch match (safety check)
            if inspection.branch_name != branch_name:
                print(f"⚠️ [BRANCH FILTER] WARNING: Inspection {inspection.id} has branch {inspection.branch_name} but expected {branch_name}")
                continue  # Skip if branch doesn't match
            
            inspections_data.append({
                'id': inspection.id,
                'client_name': inspection.client_name,
                'industry_name': inspection.industry_name,
                'branch_name': inspection.branch_name,
                'status': inspection.status,
                'inspector': inspection.inspector.username if inspection.inspector else 'N/A',
                'created_at': inspection.created_at,
                'updated_at': inspection.updated_at
            })

        print(f"✅ [BRANCH FILTER] Returning {len(inspections_data)} inspections ONLY from branch {branch_name}")
        return Response(inspections_data)
       
    except Exception as e:
        print(f"❌ [BRANCH FILTER] Error: {str(e)}")
        import traceback
        print(f"❌ [BRANCH FILTER] Traceback: {traceback.format_exc()}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    













# ==================== BRANCH ADMIN INSPECTION STATUS UPDATE ====================

# views.py - ADD THIS FUNCTION

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
def branch_admin_update_inspection_status(request, inspection_id):
    """
    Update inspection status (for branch admin)
    """
    try:
        print(f"🔧 [BACKEND STATUS UPDATE] Request from: {request.user.user_name}")
        
        # Check if user is branch admin
        if request.user.role != 'branch_admin':
            return Response(
                {'error': 'You do not have permission to perform this action'},
                status=status.HTTP_403_FORBIDDEN
            )

        branch_name = request.user.branch_name
        if not branch_name:
            return Response(
                {'error': 'Branch admin does not have a branch assigned'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Get inspection and verify it belongs to the branch admin's branch
        try:
            inspection = Inspection.objects.get(id=inspection_id, branch_name=branch_name)
        except Inspection.DoesNotExist:
            return Response(
                {'error': 'Inspection not found or does not belong to your branch'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Get new status from request
        new_status = request.data.get('status')
        if not new_status:
            return Response(
                {'error': 'Status is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validate status choice
        valid_statuses = dict(Inspection.STATUS_CHOICES).keys()
        if new_status not in valid_statuses:
            return Response(
                {'error': f'Invalid status. Must be one of: {list(valid_statuses)}'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update inspection status
        old_status = inspection.status
        inspection.status = new_status
        inspection.save()

        print(f"✅ [BACKEND STATUS UPDATE] Status changed: {old_status} -> {new_status}")

        # Return success response
        return Response({
            'success': True,
            'message': f'Inspection status updated from {old_status} to {new_status}',
            'inspection': {
                'id': inspection.id,
                'client_name': inspection.client_name,
                'status': inspection.status,
                'branch_name': inspection.branch_name
            }
        }, status=status.HTTP_200_OK)
       
    except Exception as e:
        print(f"❌ [BACKEND STATUS UPDATE] Error: {str(e)}")
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    




















# accounts/views.py - এই function টি যোগ করুন

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_inspection_universal(request, inspection_id):
    """
    Get inspection from either Inspection or NewInspection model
    Universal search that works for both models
    """
    try:
        print(f"🔍 [UNIVERSAL SEARCH] Looking for inspection ID: {inspection_id}")
        print(f"👤 User: {request.user}, Role: {request.user.role}")
        
        # Try NewInspection first (যেখানে ID 38 আছে)
        try:
            inspection = NewInspection.objects.get(id=inspection_id)
            print(f"✅ Found in NewInspection: {inspection.client_name}")
            
            # Serialize NewInspection data
            inspection_data = {
                'id': inspection.id,
                'client_name': inspection.client_name,
                'industry_name': inspection.industry_name,
                'phone_number': inspection.phone_number,
                'branch_name': inspection.branch_name,
                'project': inspection.project,
                'assigned_inspector': inspection.assigned_inspector.id if inspection.assigned_inspector else None,
                'status': inspection.status,
                'created_at': inspection.created_at,
                'is_new_inspection': True  # Flag to identify it's from NewInspection
            }
            
            return Response(inspection_data)
            
        except NewInspection.DoesNotExist:
            print(f"❌ Not found in NewInspection: {inspection_id}")
            pass
        
        # Try regular Inspection model
        try:
            inspection = Inspection.objects.get(id=inspection_id)
            print(f"✅ Found in Inspection: {inspection.client_name}")
            
            # Check permission - inspector can only access their own inspections
            if request.user.role == 'inspector' and inspection.inspector != request.user:
                return Response(
                    {'error': 'You can only access your own inspections'},
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Use existing serializer for Inspection
            serializer = InspectionSerializer(inspection)
            data = serializer.data
            data['is_new_inspection'] = False  # Flag to identify it's from Inspection
            
            return Response(data)
            
        except Inspection.DoesNotExist:
            print(f"❌ Not found in Inspection: {inspection_id}")
            pass
        
        # If not found in either model
        print(f"🚨 Inspection {inspection_id} not found in any model")
        return Response(
            {'error': f'Inspection {inspection_id} not found'},
            status=status.HTTP_404_NOT_FOUND
        )
        
    except Exception as e:
        print(f"🚨 Error in universal search: {str(e)}")
        return Response(
            {'error': f'Search failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    





# # accounts/views.py - ADD THIS FUNCTION

# @api_view(['POST'])
# @permission_classes([IsAuthenticated])
# def convert_to_full_inspection(request, inspection_id):
#     """
#     Convert a NewInspection to a full Inspection
#     """
#     try:
#         # Get the NewInspection
#         new_inspection = NewInspection.objects.get(id=inspection_id)
        
#         # Create a full Inspection from NewInspection data
#         inspection_data = {
#             'client_name': new_inspection.client_name,
#             'industry_name': new_inspection.industry_name,
#             'branch_name': new_inspection.branch_name,
#             'phone_number': new_inspection.phone_number,
#             'status': new_inspection.status,
#             'inspector': new_inspection.assigned_inspector,
#             # Add other fields as needed
#         }
        
#         serializer = InspectionSerializer(data=inspection_data)
#         if serializer.is_valid():
#             full_inspection = serializer.save()
            
#             # Optionally delete the NewInspection
#             # new_inspection.delete()
            
#             # Or just mark it as converted
#             new_inspection.status = 'converted'
#             new_inspection.save()
            
#             return Response({
#                 'success': True,
#                 'message': 'Inspection converted successfully',
#                 'inspection': InspectionSerializer(full_inspection).data
#             })
#         else:
#             return Response(serializer.errors, status=400)
            
#     except NewInspection.DoesNotExist:
#         return Response({'error': 'NewInspection not found'}, status=404)
#     except Exception as e:
#         return Response({'error': str(e)}, status=500)
    




# views.py - convert_to_full_inspection function টি replace করুন

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def convert_to_full_inspection(request, inspection_id):
    """
    Convert a NewInspection to a full Inspection
    """
    try:
        print(f"🔄 [CONVERT INSPECTION] Converting ID: {inspection_id}")
        print(f"📦 Request data keys: {request.data.keys()}")
        
        # Get the NewInspection
        try:
            new_inspection = NewInspection.objects.get(id=inspection_id)
        except NewInspection.DoesNotExist:
            return Response(
                {'error': 'NewInspection not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check permissions
        if request.user.role == 'inspector' and new_inspection.assigned_inspector != request.user:
            return Response(
                {'error': 'You can only convert inspections assigned to you'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Prepare data for full inspection
        inspection_data = request.data.copy()
        
        # 🔥 IMPORTANT: Set required fields
        inspection_data['inspector'] = new_inspection.assigned_inspector.id if new_inspection.assigned_inspector else request.user.id
        inspection_data['branch_name'] = new_inspection.branch_name
        inspection_data['status'] = 'completed'  # Set status to completed
        
        # Copy essential fields from NewInspection
        if not inspection_data.get('client_name'):
            inspection_data['client_name'] = new_inspection.client_name
        if not inspection_data.get('industry_name'):
            inspection_data['industry_name'] = new_inspection.industry_name
        if not inspection_data.get('phone_number'):
            inspection_data['phone_number'] = new_inspection.phone_number
        if not inspection_data.get('project'):
            inspection_data['project'] = new_inspection.project

        print(f"✅ [CONVERT INSPECTION] Prepared data for conversion")
        print(f"🔑 Inspector ID: {inspection_data.get('inspector')}")
        print(f"🏢 Branch: {inspection_data.get('branch_name')}")
        print(f"📊 Status: {inspection_data.get('status')}")

        # Use InspectionCreateSerializer for creation
        serializer = InspectionCreateSerializer(
            data=inspection_data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            full_inspection = serializer.save()
            
            # Mark NewInspection as converted
            new_inspection.status = 'converted'
            new_inspection.save()
            
            print(f"✅ [CONVERT INSPECTION] Successfully converted to full inspection ID: {full_inspection.id}")
            
            return Response({
                'success': True,
                'message': 'Inspection converted successfully',
                'inspection_id': full_inspection.id,
                'data': InspectionSerializer(full_inspection).data
            }, status=status.HTTP_201_CREATED)
        else:
            print(f"❌ [CONVERT INSPECTION] Serializer errors: {serializer.errors}")
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except Exception as e:
        print(f"🚨 [CONVERT INSPECTION] Error: {str(e)}")
        return Response(
            {'error': f'Conversion failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )




















        



# accounts/views.py - ADD THIS VIEW

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def convert_new_to_full_inspection(request, new_inspection_id):
    """
    Convert a NewInspection to a full Inspection with complete data
    """
    try:
        print(f"🔄 Converting NewInspection {new_inspection_id} to full Inspection")
        
        # Get the NewInspection
        try:
            new_inspection = NewInspection.objects.get(id=new_inspection_id)
        except NewInspection.DoesNotExist:
            return Response(
                {'error': 'NewInspection not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check permissions
        if request.user.role == 'inspector' and new_inspection.assigned_inspector != request.user:
            return Response(
                {'error': 'You can only convert inspections assigned to you'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Combine NewInspection data with submitted data
        inspection_data = request.data.copy()
        
        # Preserve key fields from NewInspection
        inspection_data.update({
            'client_name': new_inspection.client_name,
            'industry_name': new_inspection.industry_name,
            'branch_name': new_inspection.branch_name,
            'phone_number': new_inspection.phone_number,
            'project': new_inspection.project,
            'inspector': new_inspection.assigned_inspector.id if new_inspection.assigned_inspector else request.user.id,
            'status': 'completed'  # Set status to completed
        })

        print(f"📦 Creating full inspection from NewInspection {new_inspection_id}")
        
        # Use InspectionSerializer to create the full inspection
        serializer = InspectionSerializer(data=inspection_data)
        if serializer.is_valid():
            full_inspection = serializer.save()
            
            # Mark NewInspection as converted (optional: you can delete it instead)
            new_inspection.status = 'converted'
            new_inspection.save()
            
            print(f"✅ Successfully converted NewInspection {new_inspection_id} to Inspection {full_inspection.id}")
            
            return Response({
                'success': True,
                'message': 'Inspection successfully converted and saved',
                'inspection_id': full_inspection.id,
                'data': InspectionSerializer(full_inspection).data
            }, status=status.HTTP_201_CREATED)
        else:
            print(f"❌ Serializer errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        print(f"🚨 Error in conversion: {str(e)}")
        return Response(
            {'error': f'Conversion failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
    













# views.py - এই function টি যোগ করুন

@api_view(['PATCH', 'PUT'])
@permission_classes([IsAuthenticated])
def update_new_inspection(request, inspection_id):
    """
    Update a NewInspection
    """
    try:
        print(f"🔄 [UPDATE NEW INSPECTION] ID: {inspection_id}")
        print(f"📦 Request data: {request.data}")
        
        # Get the NewInspection
        try:
            new_inspection = NewInspection.objects.get(id=inspection_id)
        except NewInspection.DoesNotExist:
            return Response(
                {'error': 'NewInspection not found'},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check permissions
        if request.user.role == 'inspector' and new_inspection.assigned_inspector != request.user:
            return Response(
                {'error': 'You can only update inspections assigned to you'},
                status=status.HTTP_403_FORBIDDEN
            )

        # Update only allowed fields
        allowed_fields = [
            'client_name', 'industry_name', 'phone_number', 
            'branch_name', 'project', 'status', 'assigned_inspector'
        ]
        
        # Filter data to only include allowed fields
        update_data = {k: v for k, v in request.data.items() if k in allowed_fields}
        
        print(f"✅ [UPDATE NEW INSPECTION] Allowed update data: {update_data}")
        
        serializer = NewInspectionSerializer(
            new_inspection, 
            data=update_data, 
            partial=True
        )
        
        if serializer.is_valid():
            updated_inspection = serializer.save()
            print(f"✅ [UPDATE NEW INSPECTION] Updated successfully: {updated_inspection.id}")
            
            return Response({
                'success': True,
                'message': 'NewInspection updated successfully',
                'data': NewInspectionSerializer(updated_inspection).data
            }, status=status.HTTP_200_OK)
        else:
            print(f"❌ [UPDATE NEW INSPECTION] Validation errors: {serializer.errors}")
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
            
    except Exception as e:
        print(f"🚨 [UPDATE NEW INSPECTION] Error: {str(e)}")
        return Response(
            {'error': f'Update failed: {str(e)}'},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

















#####################################################
################
######
# FIXED: admin_inspection_detail function
# FIXED: admin_inspection_detail function - COMPLETE VERSION
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_inspection_detail(request, inspection_id):
    """Get detailed inspection information for admin - FIXED VERSION"""
    try:
        inspection = Inspection.objects.get(id=inspection_id)
        
        print(f"🔍 Fetching inspection details for ID: {inspection_id}")
        print(f"📊 Inspection found: {inspection.client_name}")
       
        # Helper function to parse JSON fields
        def parse_json_field(field_data, field_name):
            print(f"🔄 Parsing {field_name}: {type(field_data)}")
           
            if not field_data:
                print(f"⚠️ {field_name} is empty")
                return [] if 'list' in field_name.lower() else {}
               
            if isinstance(field_data, (list, dict)):
                print(f"✅ {field_name} is already {type(field_data)}")
                return field_data
            
            if isinstance(field_data, str):
                try:
                    parsed_data = json.loads(field_data)
                    print(f"✅ Successfully parsed {field_name} from string to {type(parsed_data)}")
                    return parsed_data
                except json.JSONDecodeError as e:
                    print(f"❌ JSON parse error for {field_name}: {e}")
                    print(f"📄 Raw data: {field_data[:100]}...")
                    # If it's a string but not valid JSON, return as is
                    return field_data
            else:
                print(f"⚠️ Unknown format for {field_name}: {type(field_data)}")
                return field_data

        # Parse all JSON fields with proper error handling
        location_points = parse_json_field(inspection.location_points, 'location_points')
        partners_directors = parse_json_field(inspection.partners_directors, 'partners_directors')
        competitors = parse_json_field(inspection.competitors, 'competitors')
        key_employees = parse_json_field(inspection.key_employees, 'key_employees')
        working_capital_items = parse_json_field(inspection.working_capital_items, 'working_capital_items')
        checklist_items = parse_json_field(inspection.checklist_items, 'checklist_items')
        site_photos = parse_json_field(inspection.site_photos, 'site_photos')
        site_video = parse_json_field(inspection.site_video, 'site_video')
        uploaded_documents = parse_json_field(inspection.uploaded_documents, 'uploaded_documents')

        print(f"📊 Final parsed data summary:")
        print(f"📍 Location Points: {len(location_points) if isinstance(location_points, list) else 'N/A'}")
        print(f"👥 Partners/Directors: {len(partners_directors) if isinstance(partners_directors, list) else 'N/A'}")
        print(f"🏢 Competitors: {len(competitors) if isinstance(competitors, list) else 'N/A'}")
        print(f"💼 Key Employees: {len(key_employees) if isinstance(key_employees, list) else 'N/A'}")
        print(f"💰 Working Capital Items: {len(working_capital_items) if isinstance(working_capital_items, list) else 'N/A'}")
        print(f"✅ Checklist Items: {len(checklist_items) if isinstance(checklist_items, dict) else 'N/A'}")
        print(f"📸 Site Photos: {len(site_photos) if isinstance(site_photos, list) else 'N/A'}")
        print(f"🎥 Site Video: {type(site_video)}")
        print(f"📄 Uploaded Documents: {len(uploaded_documents) if isinstance(uploaded_documents, list) else 'N/A'}")

        # Get inspector information
        inspector_info = None
        if inspection.inspector:
            inspector_info = {
                'id': inspection.inspector.id,
                'username': inspection.inspector.username,
                'user_name': inspection.inspector.user_name,
                'email': inspection.inspector.email,
                'role': inspection.inspector.role,
                'branch_name': inspection.inspector.branch_name
            }

        # Serialize all inspection data
        inspection_data = {
            'id': inspection.id,
            'client_name': inspection.client_name,
            'industry_name': inspection.industry_name,
            'branch_name': inspection.branch_name,
            'status': inspection.status,
            'inspector': inspector_info,
            'inspector_name': inspection.inspector.username if inspection.inspector else 'N/A',
            'created_at': inspection.created_at,
            'updated_at': inspection.updated_at,
           
            # Location Tracking Data
            'location_points': location_points,
            'location_start_time': inspection.location_start_time,
            'location_end_time': inspection.location_end_time,
            'total_location_points': inspection.total_location_points,
           
            # Section A: Company's Client's Information
            'group_name': inspection.group_name,
            'nature_of_business': inspection.nature_of_business,
            'legal_status': inspection.legal_status,
            'date_of_establishment': inspection.date_of_establishment,
            'office_address': inspection.office_address,
            'showroom_address': inspection.showroom_address,
            'factory_address': inspection.factory_address,
            'phone_number': inspection.phone_number,
            'account_number': inspection.account_number,
            'account_id': inspection.account_id,
            'tin_number': inspection.tin_number,
            'date_of_opening': inspection.date_of_opening,
            'vat_reg_number': inspection.vat_reg_number,
            'first_investment_date': inspection.first_investment_date,
            'sector_code': inspection.sector_code,
            'trade_license': inspection.trade_license,
            'economic_purpose_code': inspection.economic_purpose_code,
            'investment_category': inspection.investment_category,
           
            # Section B: Owner Information
            'owner_name': inspection.owner_name,
            'owner_age': inspection.owner_age,
            'father_name': inspection.father_name,
            'mother_name': inspection.mother_name,
            'spouse_name': inspection.spouse_name,
            'academic_qualification': inspection.academic_qualification,
            'children_info': inspection.children_info,
            'business_successor': inspection.business_successor,
            'residential_address': inspection.residential_address,
            'permanent_address': inspection.permanent_address,
           
            # Section C: Partners/Directors
            'partners_directors': partners_directors,
           
            # Section D: Purpose
            'purpose_investment': inspection.purpose_investment,
            'purpose_bank_guarantee': inspection.purpose_bank_guarantee,
            'period_investment': inspection.period_investment,
           
            # Section E: Proposed Facilities
            'facility_type': inspection.facility_type,
            'existing_limit': inspection.existing_limit,
            'applied_limit': inspection.applied_limit,
            'recommended_limit': inspection.recommended_limit,
            'bank_percentage': inspection.bank_percentage,
            'client_percentage': inspection.client_percentage,
           
            # Section F: Present Outstanding
            'outstanding_type': inspection.outstanding_type,
            'limit_amount': inspection.limit_amount,
            'net_outstanding': inspection.net_outstanding,
            'gross_outstanding': inspection.gross_outstanding,
           
            # Section G: Business Analysis
            'market_situation': inspection.market_situation,
            'client_position': inspection.client_position,
            'competitors': competitors,
            'business_reputation': inspection.business_reputation,
            'production_type': inspection.production_type,
            'product_name': inspection.product_name,
            'production_capacity': inspection.production_capacity,
            'actual_production': inspection.actual_production,
            'profitability_observation': inspection.profitability_observation,
           
            # Labor Force
            'male_officer': inspection.male_officer,
            'female_officer': inspection.female_officer,
            'skilled_officer': inspection.skilled_officer,
            'unskilled_officer': inspection.unskilled_officer,
            'male_worker': inspection.male_worker,
            'female_worker': inspection.female_worker,
            'skilled_worker': inspection.skilled_worker,
            'unskilled_worker': inspection.unskilled_worker,
           
            # Key Employees
            'key_employees': key_employees,
           
            # Section H: Property & Assets
            'cash_balance': inspection.cash_balance,
            'stock_trade_finished': inspection.stock_trade_finished,
            'stock_trade_financial': inspection.stock_trade_financial,
            'accounts_receivable': inspection.accounts_receivable,
            'advance_deposit': inspection.advance_deposit,
            'other_current_assets': inspection.other_current_assets,
            'land_building': inspection.land_building,
            'plant_machinery': inspection.plant_machinery,
            'other_assets': inspection.other_assets,
            'ibbl_investment': inspection.ibbl_investment,
            'other_banks_investment': inspection.other_banks_investment,
            'borrowing_sources': inspection.borrowing_sources,
            'accounts_payable': inspection.accounts_payable,
            'other_current_liabilities': inspection.other_current_liabilities,
            'long_term_liabilities': inspection.long_term_liabilities,
            'other_non_current_liabilities': inspection.other_non_current_liabilities,
            'paid_up_capital': inspection.paid_up_capital,
            'retained_earning': inspection.retained_earning,
            'resources': inspection.resources,
           
            # Section I: Working Capital Assessment
            'working_capital_items': working_capital_items,
           
            # Section J: Godown Particulars
            'godown_location': inspection.godown_location,
            'godown_capacity': inspection.godown_capacity,
            'godown_space': inspection.godown_space,
            'godown_nature': inspection.godown_nature,
            'godown_owner': inspection.godown_owner,
            'distance_from_branch': inspection.distance_from_branch,
            'items_to_store': inspection.items_to_store,
            'warehouse_license': inspection.warehouse_license,
            'godown_guard': inspection.godown_guard,
            'damp_proof': inspection.damp_proof,
            'easy_access': inspection.easy_access,
            'letter_disclaimer': inspection.letter_disclaimer,
            'insurance_policy': inspection.insurance_policy,
            'godown_hired': inspection.godown_hired,
           
            # Section K: Checklist
            'checklist_items': checklist_items,
           
            # Section L: Site Photos & Video
            'site_photos': site_photos,
            'site_video': site_video,
           
            # Section M: Documents Upload
            'uploaded_documents': uploaded_documents,
        }
       
        print(f"✅ Successfully prepared inspection data for web")
        return Response(inspection_data)
       
    except Inspection.DoesNotExist:
        print(f"❌ Inspection not found: {inspection_id}")
        return Response(
            {'error': 'Inspection not found'},
            status=404
        )
    except Exception as e:
        print(f"🚨 Error in admin_inspection_detail: {str(e)}")
        import traceback
        print(f"🔍 Stack trace: {traceback.format_exc()}")
        return Response(
            {'error': f'Internal server error: {str(e)}'},
            status=500
        )
# ✅ NEW COMPREHENSIVE ADMIN DASHBOARD STATS VIEW
class AdminDashboardStatsView(APIView):
    permission_classes = [IsAuthenticated]
   
    def get(self, request):
        try:
            # Check if user is admin
            if request.user.role != 'admin':
                return Response(
                    {'error': 'You do not have permission to access this data'},
                    status=status.HTTP_403_FORBIDDEN
                )

            # Basic counts
            all_inspections = Inspection.objects.all()
            stats = {
                'all': all_inspections.count(),
                'pending': all_inspections.filter(status='Pending').count(),
                'inProgress': all_inspections.filter(status='In Progress').count(),
                'completed': all_inspections.filter(status='Completed').count(),
                'approved': all_inspections.filter(status='Approved').count(),
                'rejected': all_inspections.filter(status='Rejected').count(),
            }
           
            # Status distribution for chart
            status_distribution = []
            status_choices = ['Pending', 'In Progress', 'Completed', 'Approved', 'Rejected']
            colors = ['bg-yellow-500', 'bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-red-500']
           
            for status, color in zip(status_choices, colors):
                count = all_inspections.filter(status=status).count()
                status_distribution.append({
                    'status': status,
                    'count': count,
                    'color': color
                })
           
            stats['statusDistribution'] = status_distribution
           
            # ✅ FIXED: Branch-wise distribution - Group by branch and count
            branch_wise = []
            # Get branch-wise counts using aggregation
            branch_counts = Inspection.objects.filter(
                branch_name__isnull=False
            ).exclude(
                branch_name=''
            ).values('branch_name').annotate(
                count=Count('id')
            ).order_by('-count')
           
            branch_colors = ['bg-blue-600', 'bg-green-600', 'bg-purple-600', 'bg-orange-600', 'bg-red-600', 'bg-indigo-600', 'bg-pink-600']
           
            for i, branch_data in enumerate(branch_counts):
                branch_wise.append({
                    'branch': branch_data['branch_name'],
                    'count': branch_data['count'],
                    'color': branch_colors[i % len(branch_colors)]
                })
           
            # If no branch data, use default branches with actual counts
            if not branch_wise:
                default_branches = ['Dhaka Main', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi']
                for i, branch in enumerate(default_branches):
                    count = all_inspections.filter(branch_name=branch).count()
                    branch_wise.append({
                        'branch': branch,
                        'count': count,
                        'color': branch_colors[i % len(branch_colors)]
                    })
           
            stats['branchWise'] = branch_wise
           
            # Monthly trend (last 6 months)
            monthly_trend = []
            current_date = timezone.now()
           
            for i in range(5, -1, -1):
                # Calculate month start and end
                month_date = current_date - timedelta(days=30*i)
                month_name = month_date.strftime('%b')
               
                # Get start of month
                month_start = month_date.replace(day=1, hour=0, minute=0, second=0, microsecond=0)
               
                # Get end of month
                if i == 0:
                    month_end = current_date
                else:
                    next_month = month_start + timedelta(days=32)
                    month_end = next_month.replace(day=1) - timedelta(days=1)
                    month_end = month_end.replace(hour=23, minute=59, second=59, microsecond=999999)
               
                count = all_inspections.filter(
                    created_at__gte=month_start,
                    created_at__lte=month_end
                ).count()
               
                monthly_trend.append({
                    'month': month_name,
                    'inspections': count
                })
           
            stats['monthlyTrend'] = monthly_trend
           
            return Response(stats)
           
        except Exception as e:
            print(f"Error in AdminDashboardStatsView: {str(e)}")
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

@api_view(['GET'])
def inspection_analytics(request):
    """Get comprehensive inspection analytics data for admin dashboard"""
    try:
        # Status distribution
        status_distribution = Inspection.objects.values('status').annotate(
            count=Count('id')
        ).order_by('status')
       
        # Branch-wise distribution (only branches with inspections)
        branch_distribution = Inspection.objects.filter(
            branch_name__isnull=False
        ).exclude(
            branch_name=''
        ).values('branch_name').annotate(
            count=Count('id')
        ).order_by('-count')
       
        # Monthly trend (last 6 months)
        six_months_ago = timezone.now() - timedelta(days=180)
        monthly_trend = Inspection.objects.filter(
            created_at__gte=six_months_ago
        ).annotate(
            month=TruncMonth('created_at')
        ).values('month').annotate(
            count=Count('id')
        ).order_by('month')
       
        # Industry-wise distribution
        industry_distribution = Inspection.objects.filter(
            industry_name__isnull=False
        ).exclude(
            industry_name=''
        ).values('industry_name').annotate(
            count=Count('id')
        ).order_by('-count')[:10]  # Top 10 industries
       
        # Calculate performance metrics
        total_inspections = Inspection.objects.count()
        approved_count = Inspection.objects.filter(status='Approved').count()
        pending_count = Inspection.objects.filter(status='Pending').count()
        rejected_count = Inspection.objects.filter(status='Rejected').count()
        in_progress_count = Inspection.objects.filter(status='In Progress').count()
        completed_count = Inspection.objects.filter(status='Completed').count()
       
        approval_rate = (approved_count / total_inspections * 100) if total_inspections > 0 else 0
        pending_rate = (pending_count / total_inspections * 100) if total_inspections > 0 else 0
       
        # Monthly average (last 6 months)
        avg_per_month = total_inspections / 6 if total_inspections > 0 else 0
       
        analytics_data = {
            'status_distribution': list(status_distribution),
            'branch_distribution': list(branch_distribution),
            'monthly_trend': list(monthly_trend),
            'industry_distribution': list(industry_distribution),
            'quick_stats': {
                'approval_rate': round(approval_rate, 1),
                'pending_rate': round(pending_rate, 1),
                'total_inspections': total_inspections,
                'avg_per_month': round(avg_per_month, 1),
                'approved_count': approved_count,
                'pending_count': pending_count,
                'rejected_count': rejected_count,
                'in_progress_count': in_progress_count,
                'completed_count': completed_count,
            }
        }
       
        return Response(analytics_data)
       
    except Exception as e:
        print(f"Error in inspection_analytics: {str(e)}")
        return Response(
            {'error': str(e)},
            status=500
        )

# views.py - নিচের অংশে যোগ করুন
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_inspectors_list(request):
    """Get all inspectors for admin"""
    try:
        if request.user.role != 'admin':
            return Response(
                {'error': 'You do not have permission to access this data'},
                status=status.HTTP_403_FORBIDDEN
            )
       
        inspectors = CustomUser.objects.filter(role='inspector').order_by('user_name')
        serializer = UserSerializer(inspectors, many=True)
        return Response(serializer.data)
       
    except Exception as e:
        return Response(
            {'error': str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

# NEW: Utility function to handle base64 media data
def handle_base64_media_data(data):
    """
    Process base64 media data before saving to database
    """
    try:
        # Process site_photos
        if 'site_photos' in data and isinstance(data['site_photos'], list):
            for photo in data['site_photos']:
                if isinstance(photo, dict) and 'base64_data' in photo:
                    # Validate base64 data
                    base64_data = photo['base64_data']
                    try:
                        # Try to decode to validate
                        base64.b64decode(base64_data, validate=True)
                        print(f"✅ Valid base64 photo data: {len(base64_data)} characters")
                    except (binascii.Error, ValueError) as e:
                        print(f"❌ Invalid base64 data in photo: {e}")
                        # Remove invalid base64 data
                        photo.pop('base64_data', None)
       
        # Process site_video
        if 'site_video' in data and isinstance(data['site_video'], dict):
            video = data['site_video']
            if 'base64_data' in video:
                base64_data = video['base64_data']
                try:
                    base64.b64decode(base64_data, validate=True)
                    print(f"✅ Valid base64 video data: {len(base64_data)} characters")
                except (binascii.Error, ValueError) as e:
                    print(f"❌ Invalid base64 data in video: {e}")
                    video.pop('base64_data', None)
       
        # Process uploaded_documents
        if 'uploaded_documents' in data and isinstance(data['uploaded_documents'], list):
            for doc in data['uploaded_documents']:
                if isinstance(doc, dict) and 'base64_data' in doc:
                    base64_data = doc['base64_data']
                    try:
                        base64.b64decode(base64_data, validate=True)
                        print(f"✅ Valid base64 document data: {len(base64_data)} characters")
                    except (binascii.Error, ValueError) as e:
                        print(f"❌ Invalid base64 data in document: {e}")
                        doc.pop('base64_data', None)
       
        return data
       
    except Exception as e:
        print(f"🚨 Error in handle_base64_media_data: {e}")
        return data

# NEW: API to get media file by ID
@api_view(['GET'])
def get_media_file(request, inspection_id, media_type, file_index):
    """
    Get specific media file (photo/video/document) by index
    """
    try:
        inspection = Inspection.objects.get(id=inspection_id)
       
        if media_type == 'photo':
            media_list = inspection.site_photos
            if isinstance(media_list, str):
                media_list = json.loads(media_list)
           
            if isinstance(media_list, list) and len(media_list) > file_index:
                media_data = media_list[file_index]
                if 'base64_data' in media_data:
                    return Response({
                        'file_name': media_data.get('file_name', f'photo_{file_index}.jpg'),
                        'file_type': media_data.get('file_type', 'image/jpeg'),
                        'base64_data': media_data['base64_data'],
                        'description': media_data.get('description', '')
                    })
       
        elif media_type == 'video':
            media_data = inspection.site_video
            if isinstance(media_data, str):
                media_data = json.loads(media_data)
           
            if isinstance(media_data, dict) and 'base64_data' in media_data:
                return Response({
                    'file_name': media_data.get('file_name', 'site_video.mp4'),
                    'file_type': media_data.get('file_type', 'video/mp4'),
                    'base64_data': media_data['base64_data'],
                    'description': media_data.get('description', '')
                })
       
        elif media_type == 'document':
            media_list = inspection.uploaded_documents
            if isinstance(media_list, str):
                media_list = json.loads(media_list)
           
            if isinstance(media_list, list) and len(media_list) > file_index:
                media_data = media_list[file_index]
                if 'base64_data' in media_data:
                    return Response({
                        'file_name': media_data.get('file_name', f'document_{file_index}'),
                        'file_type': media_data.get('file_type', 'application/octet-stream'),
                        'base64_data': media_data['base64_data'],
                        'description': media_data.get('description', '')
                    })
       
        return Response({'error': 'Media file not found'}, status=404)
       
    except Inspection.DoesNotExist:
        return Response({'error': 'Inspection not found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)