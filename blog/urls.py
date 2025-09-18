from django.urls import path
from . import views

urlpatterns = [
    path('', views.index_view, name='index'),
    path('login/', views.login_view, name='login'),
    path('acervo/', views.acervo_view, name='acervo'),
    path('detalhes/', views.detalhes_view, name='detalhes'),
]