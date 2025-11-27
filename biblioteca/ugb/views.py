from django.shortcuts import render


def index_view(request):
    return render(request, 'index.html')

def login_view(request):
    return render(request, 'login.html')

def acervo_view(request):
    return render(request, 'acervo.html')

def detalhes_view(request):
    return render(request, 'detalhes.html')

# 🚨 Exemplo de lógica na sua View de Empréstimo 🚨
from django.shortcuts import get_object_or_404, redirect
from django.contrib import messages

def reservar_livro(request, livro_id):
    livro = get_object_or_404(Livro, id=livro_id)

 
    if livro.quantidade_estoque <= 0:
        messages.error(request, "Este livro está esgotado no momento e não pode ser reservado.")
        return redirect('lista_livros') 
    
  
    
    livro.quantidade_estoque -= 1
    livro.save()
    
    
    messages.success(request, f"O livro '{livro.titulo}' foi reservado com sucesso.")
    return redirect('meus_emprestimos')


from django.utils import timezone

def devolver_livro(request, emprestimo_id):
    emprestimo = get_object_or_404(Emprestimo, id=emprestimo_id, status='EMPRESTADO')
    

    emprestimo.data_devolucao = timezone.now()
    emprestimo.status = 'DEVOLVIDO'
    emprestimo.save()

    livro = emprestimo.livro
    livro.quantidade_estoque += 1
    livro.save()
    
    messages.success(request, f"O livro '{livro.titulo}' foi devolvido com sucesso.")
    return redirect('meus_emprestimos')



from django.contrib.auth.decorators import login_required

@login_required 
def reservar_livro(request):
    
    usuario_logado = request.user 
    

from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

def registrar_usuario(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login') 
    else:
        form = UserCreationForm()
    return render(request, 'registration/register.html', {'form': form})