from django.shortcuts import render


def index_view(request):
    return render(request, 'blog/index.html')

def login_view(request):
    return render(request, 'blog/login.html')

def acervo_view(request):
    return render(request, 'blog/acervo.html')

def detalhes_view(request):
    return render(request, 'blog/detalhes.html')