from django.db import models
from django.contrib.auth.models import User
class Livro(models.Model):
    titulo = models.CharField(max_length=255)
    autor = models.CharField(max_length=255)
    quantidade = models.PositiveIntegerField(default=1)  # sem negativos
    descricao = models.TextField(blank=True)


    
class usuario(models.Model):
    Nome=models.CharField( max_length=50)
    Matricula=models.CharField(max_length=50)
    Senha=models.IntegerField()
    cargo=models.CharField(max_length=13)


    
class bibliotecario(models.Model):
    Nome=models.CharField( max_length=50)
    Senha=models.IntegerField()
    

class Emprestimo(models.Model):
    
    livro = models.ForeignKey(Livro, on_delete=models.CASCADE, related_name='emprestimos')
    

    usuario = models.ForeignKey(User, on_delete=models.CASCADE, related_name='emprestimos')
    

    data_emprestimo = models.DateTimeField(auto_now_add=True)
    data_devolucao = models.DateTimeField(null=True, blank=True) 
    
    status = models.CharField(
        max_length=20,
        choices=[('EMPRESTADO', 'Emprestado'), ('DEVOLVIDO', 'Devolvido')],
        default='EMPRESTADO'
    )

    def __str__(self):
        return f'{self.livro.titulo} - {self.usuario.username}'