


# # accounts/urls.py
# from django.urls import path, include
# from . import views

# from rest_framework.routers import DefaultRouter
# from .views import (
#     CustomTokenObtainView, UserListCreateView,AdminDashboardStatsView,
#     PasswordResetView, PasswordResetConfirmView,
#     create_branch_admin, list_branch_admins,
#     create_inspector, list_inspectors,
#     update_user, delete_user,
#     InspectionViewSet, branch_admin_stats,
#     create_new_inspection, list_new_inspections,
#     get_current_user,  # NEW IMPORT
#     admin_inspection_stats, admin_inspections_list, admin_inspection_detail  # NEW IMPORTS
# )

# router = DefaultRouter()
# router.register(r'inspections', InspectionViewSet, basename='inspection')

# urlpatterns = [
#     path('', include(router.urls)),
#     path('token/', CustomTokenObtainView.as_view(), name='token_obtain'),
#     path('users/', UserListCreateView.as_view(), name='users'),
#     path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
#     path('password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
#     path('branch-admin/create/', create_branch_admin),
#     path('branch-admin/list/', list_branch_admins),
#     path('inspector/create/', create_inspector),
#     path('inspector/list/', list_inspectors),
#     path('user/update/<int:user_id>/', update_user),
#     path('user/delete/<int:user_id>/', delete_user),
#     path('inspection/stats/', views.inspection_stats, name='inspection_stats'),
#     path('branch/inspection-stats/', branch_admin_stats, name='branch_admin_stats'),

#     # NEW URLs ADDED for inspector dashboard
#     path('inspections/stats/', views.InspectionViewSet.as_view({'get': 'stats'}), name='inspections-stats'),
#     path('inspections/by_status/', views.InspectionViewSet.as_view({'get': 'by_status'}), name='inspections-by-status'),
    
#     # NEW URLs for New Inspection
#     path('new-inspections/create/', create_new_inspection, name='create-new-inspection'),
#     path('new-inspections/list/', list_new_inspections, name='list-new-inspections'),
    
#     # NEW URL for current user
#     path('current-user/', get_current_user, name='current-user'),
    
#     # ✅ NEW URLs FOR ADMIN DASHBOARD (ADD THESE AT THE END)
#     path('api/admin/inspection-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),

#     path('api/admin/stats/', admin_inspection_stats, name='admin_inspection_stats'),
#     path('api/admin/inspections/', admin_inspections_list, name='admin_inspections_list'),
#     path('api/admin/inspections/<int:inspection_id>/', admin_inspection_detail, name='admin_inspection_detail'),
#     path('api/admin/analytics/', views.inspection_analytics, name='inspection_analytics'),
#     path('api/admin/inspectors/', views.admin_inspectors_list, name='admin_inspectors_list'),


# ]








# # accounts/urls.py - UPDATED VERSION
# from django.urls import path, include
# from . import views

# from rest_framework.routers import DefaultRouter
# from .views import (
#     CustomTokenObtainView, CustomLoginView, UserListCreateView, AdminDashboardStatsView,
#     PasswordResetView, PasswordResetConfirmView,
#     create_branch_admin, list_branch_admins,
#     create_inspector, list_inspectors,
#     update_user, delete_user,
#     InspectionViewSet, branch_admin_stats,
#     create_new_inspection, list_new_inspections,
#     get_current_user, user_signup,  # NEW IMPORT user_signup
#     admin_inspection_stats, admin_inspections_list, admin_inspection_detail,
#     admin_users_list, admin_update_user_role, admin_user_detail
    
# )

# router = DefaultRouter()
# router.register(r'inspections', InspectionViewSet, basename='inspection')

# urlpatterns = [
#     path('', include(router.urls)),
    
#     # Authentication URLs - UPDATED
#     path('token/', CustomTokenObtainView.as_view(), name='token_obtain'),
#     path('auth/login/', CustomLoginView.as_view(), name='custom_login'),  # NEW LOGIN
#     path('auth/signup/', user_signup, name='user_signup'),  # NEW SIGNUP
    
#     # User Management
#     path('users/', UserListCreateView.as_view(), name='users'),
#     path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
#     path('password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
#     # Role-based CRUD
#     path('branch-admin/create/', create_branch_admin),
#     path('branch-admin/list/', list_branch_admins),
#     path('inspector/create/', create_inspector),
#     path('inspector/list/', list_inspectors),
#     path('user/update/<int:user_id>/', update_user),
#     path('user/delete/<int:user_id>/', delete_user),
    
#     # Inspection Stats
#     path('inspection/stats/', views.inspection_stats, name='inspection_stats'),
#     path('branch/inspection-stats/', branch_admin_stats, name='branch_admin_stats'),

#     # Inspector Dashboard URLs
#     path('inspections/stats/', views.InspectionViewSet.as_view({'get': 'stats'}), name='inspections-stats'),
#     path('inspections/by_status/', views.InspectionViewSet.as_view({'get': 'by_status'}), name='inspections-by-status'),
    
#     # New Inspection URLs
#     path('new-inspections/create/', create_new_inspection, name='create-new-inspection'),
#     path('new-inspections/list/', list_new_inspections, name='list-new-inspections'),
    
#     # Current User URL
#     path('current-user/', get_current_user, name='current-user'),
    
#     # Admin Dashboard URLs
#     path('api/admin/inspection-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
#     path('api/admin/stats/', admin_inspection_stats, name='admin_inspection_stats'),
#     path('api/admin/inspections/', admin_inspections_list, name='admin_inspections_list'),
#     path('api/admin/inspections/<int:inspection_id>/', admin_inspection_detail, name='admin_inspection_detail'),
#     path('api/admin/analytics/', views.inspection_analytics, name='inspection_analytics'),
#     path('api/admin/inspectors/', views.admin_inspectors_list, name='admin_inspectors_list'),








#     # Admin User Management URLs
#     path('api/admin/users/', admin_users_list, name='admin_users_list'),
#     path('api/admin/users/<int:user_id>/', admin_user_detail, name='admin_user_detail'),
#     path('api/admin/users/<int:user_id>/update-role/', admin_update_user_role, name='admin_update_user_role'),
# ]



# # accounts/urls.py - COMPLETE FIXED VERSION
# from django.urls import path, include
# from . import views

# from rest_framework.routers import DefaultRouter
# from .views import (
#     CustomTokenObtainView, CustomLoginView, UserListCreateView, AdminDashboardStatsView,
#     PasswordResetView, PasswordResetConfirmView,
#     create_branch_admin, list_branch_admins,
#     create_inspector, list_inspectors,
#     update_user, delete_user,
#     InspectionViewSet, branch_admin_stats,
#     create_new_inspection, list_new_inspections,
#     get_current_user, user_signup,
#     admin_inspection_stats, admin_inspections_list, admin_inspection_detail,
#     admin_users_list, admin_update_user_role, admin_user_detail,
#     inspection_analytics, admin_inspectors_list
# )

# router = DefaultRouter()
# router.register(r'inspections', InspectionViewSet, basename='inspection')

# urlpatterns = [
#     path('', include(router.urls)),
    
#     # Authentication URLs
#     path('token/', CustomTokenObtainView.as_view(), name='token_obtain'),
#     path('auth/login/', CustomLoginView.as_view(), name='custom_login'),
#     path('auth/signup/', user_signup, name='user_signup'),
    
#     # User Management
#     path('users/', UserListCreateView.as_view(), name='users'),
#     path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
#     path('password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
#     # Role-based CRUD
#     path('branch-admin/create/', create_branch_admin),
#     path('branch-admin/list/', list_branch_admins),
#     path('inspector/create/', create_inspector),
#     path('inspector/list/', list_inspectors),
#     path('user/update/<int:user_id>/', update_user),
#     path('user/delete/<int:user_id>/', delete_user),
    
#     # Inspection Stats
#     path('inspection/stats/', views.inspection_stats, name='inspection_stats'),
#     path('branch/inspection-stats/', branch_admin_stats, name='branch_admin_stats'),

#     # Inspector Dashboard URLs
#     path('inspections/stats/', views.InspectionViewSet.as_view({'get': 'stats'}), name='inspections-stats'),
#     path('inspections/by_status/', views.InspectionViewSet.as_view({'get': 'by_status'}), name='inspections-by-status'),
    
#     # New Inspection URLs
#     path('new-inspections/create/', create_new_inspection, name='create-new-inspection'),
#     path('new-inspections/list/', list_new_inspections, name='list-new-inspections'),
    
#     # ✅ FIXED: Current User URL - CORRECT PATH
#     path('api/current-user/', get_current_user, name='current-user'),
    
#     # ✅ FIXED: Admin Dashboard URLs - CORRECT PATHS WITH API PREFIX
#     path('api/admin/inspection-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
#     path('api/admin/stats/', admin_inspection_stats, name='admin_inspection_stats'),
#     path('api/admin/inspections/', admin_inspections_list, name='admin_inspections_list'),
#     path('api/admin/inspections/<int:inspection_id>/', admin_inspection_detail, name='admin_inspection_detail'),
#     path('api/admin/analytics/', inspection_analytics, name='inspection_analytics'),
#     path('api/admin/inspectors/', admin_inspectors_list, name='admin_inspectors_list'),
    
#     # ✅ FIXED: Admin User Management URLs - CORRECT PATHS WITH API PREFIX
#     path('api/admin/users/', admin_users_list, name='admin_users_list'),
#     path('api/admin/users/<int:user_id>/', admin_user_detail, name='admin_user_detail'),
#     path('api/admin/users/<int:user_id>/update-role/', admin_update_user_role, name='admin_update_user_role'),
# ]






# accounts/urls.py - CORRECTED VERSION (Remove duplicate api/ prefix)
# from django.urls import path, include
# from . import views

# from rest_framework.routers import DefaultRouter
# from .views import (
#     CustomTokenObtainView, CustomLoginView, UserListCreateView, AdminDashboardStatsView,
#     PasswordResetView, PasswordResetConfirmView,
#     create_branch_admin, list_branch_admins,
#     create_inspector, list_inspectors,
#     update_user, delete_user,
#     InspectionViewSet, branch_admin_stats,
#     create_new_inspection, list_new_inspections,
#     get_current_user, user_signup,
#     admin_inspection_stats, admin_inspections_list, admin_inspection_detail,
#     admin_users_list, admin_update_user_role, admin_user_detail,
#     admin_update_user_status,
#     inspection_analytics, admin_inspectors_list,
#         branch_admin_users_list, branch_admin_user_detail,  # NEW IMPORTS
#         branch_admin_inspection_stats, branch_admin_inspections_list, 
#     branch_admin_inspection_detail,branch_admin_update_inspection_status,#new imports more
#     branch_admin_update_user_status,
#     get_inspection_universal, #new import
#     convert_to_full_inspection, #new import


# )

# router = DefaultRouter()
# router.register(r'inspections', InspectionViewSet, basename='inspection')

# urlpatterns = [
#     path('', include(router.urls)),
    
#     # Authentication URLs
#     path('token/', CustomTokenObtainView.as_view(), name='token_obtain'),
#     path('auth/login/', CustomLoginView.as_view(), name='custom_login'),
#     path('auth/signup/', user_signup, name='user_signup'),
    
#     # User Management
#     path('users/', UserListCreateView.as_view(), name='users'),
#     path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
#     path('password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
#     # Role-based CRUD
#     path('branch-admin/create/', create_branch_admin),
#     path('branch-admin/list/', list_branch_admins),
#     path('inspector/create/', create_inspector),
#     path('inspector/list/', list_inspectors),
#     path('user/update/<int:user_id>/', update_user),
#     path('user/delete/<int:user_id>/', delete_user),
    
#     # Inspection Stats
#     path('inspection/stats/', views.inspection_stats, name='inspection_stats'),
#     path('branch/inspection-stats/', branch_admin_stats, name='branch_admin_stats'),

#     # Inspector Dashboard URLs
#     path('inspections/stats/', views.InspectionViewSet.as_view({'get': 'stats'}), name='inspections-stats'),
#     path('inspections/by_status/', views.InspectionViewSet.as_view({'get': 'by_status'}), name='inspections-by-status'),
    
#     # New Inspection URLs
#     path('new-inspections/create/', create_new_inspection, name='create-new-inspection'),
#     path('new-inspections/list/', list_new_inspections, name='list-new-inspections'),
    
#     # ✅ CORRECTED: Current User URL - REMOVED DUPLICATE api/ PREFIX
#     path('current-user/', get_current_user, name='current-user'),
    
#     # ✅ CORRECTED: Admin Dashboard URLs - REMOVED DUPLICATE api/ PREFIX
#     path('admin/inspection-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
#     path('admin/stats/', admin_inspection_stats, name='admin_inspection_stats'),
#     path('admin/inspections/', admin_inspections_list, name='admin_inspections_list'),
#     path('admin/inspections/<int:inspection_id>/', admin_inspection_detail, name='admin_inspection_detail'),
#     path('admin/analytics/', inspection_analytics, name='inspection_analytics'),
#     path('admin/inspectors/', admin_inspectors_list, name='admin_inspectors_list'),
    
#     # ✅ CORRECTED: Admin User Management URLs - REMOVED DUPLICATE api/ PREFIX
#     path('admin/users/', admin_users_list, name='admin_users_list'),
#     path('admin/users/<int:user_id>/', admin_user_detail, name='admin_user_detail'),
#     path('admin/users/<int:user_id>/update-role/', admin_update_user_role, name='admin_update_user_role'),
#     path('branch-admin/users/', branch_admin_users_list, name='branch_admin_users_list'),
#     path('branch-admin/users/<int:user_id>/', branch_admin_user_detail, name='branch_admin_user_detail'),
#     # ✅ ADD THESE INSPECTOR ENDPOINTS
#     path('branch/inspectors/', views.list_inspectors, name='branch_inspectors'),
#     path('inspectors/', views.list_inspectors, name='all_inspectors'),

#     #new added for branch admin inspection stats
#     path('branch-admin/inspection-stats/', views.branch_admin_inspection_stats, name='branch_admin_inspection_stats'),
#     path('branch-admin/inspections/', views.branch_admin_inspections_list, name='branch_admin_inspections_list'),
#     path('branch-admin/inspections/<int:inspection_id>/', views.branch_admin_inspection_detail, name='branch_admin_inspection_detail'),
#     path('branch-admin/inspections/<int:inspection_id>/update-status/', views.branch_admin_update_inspection_status, name='branch_admin_update_inspection_status'),


#     path('branch-admin/users/<int:user_id>/update-status/', views.branch_admin_update_user_status, name='branch_admin_update_user_status'),


#     path('admin/users/<int:user_id>/update-status/', views.admin_update_user_status, name='admin-update-user-status'),


#     path('inspections/universal/<int:inspection_id>/', views.get_inspection_universal, name='inspection-universal'),

#     path('new-inspections/<int:inspection_id>/convert/', views.convert_to_full_inspection, name='convert-inspection'),

# ]

















# accounts/urls.py - CORRECTED VERSION
from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

from .views import (
    CustomTokenObtainView, CustomLoginView, UserListCreateView, AdminDashboardStatsView,
    PasswordResetView, PasswordResetConfirmView,
    create_branch_admin, list_branch_admins,
    create_inspector, list_inspectors,
    update_user, delete_user,
    InspectionViewSet, branch_admin_stats,
    create_new_inspection, list_new_inspections,
    get_current_user, user_signup,
    admin_inspection_stats, admin_inspections_list, admin_inspection_detail,
    admin_users_list, admin_update_user_role, admin_user_detail,
    admin_update_user_status,
    inspection_analytics, admin_inspectors_list,
    branch_admin_users_list, branch_admin_user_detail,
    branch_admin_inspection_stats, branch_admin_inspections_list, 
    branch_admin_inspection_detail, branch_admin_update_inspection_status,
    branch_admin_update_user_status,
    get_inspection_universal,
    convert_to_full_inspection,
    inspection_stats,  # ✅ যোগ করা হয়েছে
    update_new_inspection,  # ✅ যোগ করা হয়েছে
)

router = DefaultRouter()
router.register(r'inspections', InspectionViewSet, basename='inspection')

urlpatterns = [
    path('', include(router.urls)),
    
    # Authentication URLs
    path('token/', CustomTokenObtainView.as_view(), name='token_obtain'),
    path('auth/login/', CustomLoginView.as_view(), name='custom_login'),
    path('auth/signup/', user_signup, name='user_signup'),
    
    # User Management
    path('users/', UserListCreateView.as_view(), name='users'),
    path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
    path('password_reset_confirm/', PasswordResetConfirmView.as_view(), name='password_reset_confirm'),
    
    # Role-based CRUD
    path('branch-admin/create/', create_branch_admin),
    path('branch-admin/list/', list_branch_admins),
    path('inspector/create/', create_inspector),
    path('inspector/list/', list_inspectors),
    path('user/update/<int:user_id>/', update_user),
    path('user/delete/<int:user_id>/', delete_user),
    
    # Inspection Stats
    path('inspection/stats/', inspection_stats, name='inspection_stats'),  # ✅ views.inspection_stats থেকে inspection_stats তে পরিবর্তন
    path('branch/inspection-stats/', branch_admin_stats, name='branch_admin_stats'),

    # Inspector Dashboard URLs
    path('inspections/stats/', views.InspectionViewSet.as_view({'get': 'stats'}), name='inspections-stats'),
    path('inspections/by_status/', views.InspectionViewSet.as_view({'get': 'by_status'}), name='inspections-by-status'),
    
    # New Inspection URLs
    path('new-inspections/create/', create_new_inspection, name='create-new-inspection'),
    path('new-inspections/list/', list_new_inspections, name='list-new-inspections'),
    
    # Current User URL
    path('current-user/', get_current_user, name='current-user'),
    
    # Admin Dashboard URLs
    path('admin/inspection-stats/', AdminDashboardStatsView.as_view(), name='admin-dashboard-stats'),
    path('admin/stats/', admin_inspection_stats, name='admin_inspection_stats'),
    path('admin/inspections/', admin_inspections_list, name='admin_inspections_list'),
    path('admin/inspections/<int:inspection_id>/', admin_inspection_detail, name='admin_inspection_detail'),
    path('admin/analytics/', inspection_analytics, name='inspection_analytics'),
    path('admin/inspectors/', admin_inspectors_list, name='admin_inspectors_list'),
    
    # Admin User Management URLs
    path('admin/users/', admin_users_list, name='admin_users_list'),
    path('admin/users/<int:user_id>/', admin_user_detail, name='admin_user_detail'),
    path('admin/users/<int:user_id>/update-role/', admin_update_user_role, name='admin_update_user_role'),
    path('branch-admin/users/', branch_admin_users_list, name='branch_admin_users_list'),
    path('branch-admin/users/<int:user_id>/', branch_admin_user_detail, name='branch_admin_user_detail'),
    
    # Inspector Endpoints
    path('branch/inspectors/', list_inspectors, name='branch_inspectors'),
    path('inspectors/', list_inspectors, name='all_inspectors'),

    # Branch Admin Inspection Stats
    path('branch-admin/inspection-stats/', branch_admin_inspection_stats, name='branch_admin_inspection_stats'),
    path('branch-admin/inspections/', branch_admin_inspections_list, name='branch_admin_inspections_list'),
    path('branch-admin/inspections/<int:inspection_id>/', branch_admin_inspection_detail, name='branch_admin_inspection_detail'),
    path('branch-admin/inspections/<int:inspection_id>/update-status/', branch_admin_update_inspection_status, name='branch_admin_update_inspection_status'),

    # User Status Update URLs
    path('branch-admin/users/<int:user_id>/update-status/', branch_admin_update_user_status, name='branch_admin_update_user_status'),
    path('admin/users/<int:user_id>/update-status/', admin_update_user_status, name='admin-update-user-status'),

    # Universal Inspection
    path('inspections/universal/<int:inspection_id>/', get_inspection_universal, name='inspection-universal'),

    # Convert Inspection
    path('new-inspections/<int:inspection_id>/convert/', convert_to_full_inspection, name='convert-inspection'),
    
    # Update New Inspection
    path('new-inspections/<int:inspection_id>/', update_new_inspection, name='update-new-inspection'),
]