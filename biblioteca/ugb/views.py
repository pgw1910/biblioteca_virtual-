from django.shortcuts import render


def index_view(request):
    return render(request, 'index.html')

def login_view(request):
    return render(request, 'login.html')

def acervo_view(request):
    return render(request, 'acervo.html')

def detalhes_view(request):
    return render(request, 'detalhes.html')

