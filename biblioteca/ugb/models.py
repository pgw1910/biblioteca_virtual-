from django.db import models


class livros (models.Model):
    Autor=models.CharField( max_length=50)
    Titulo=models.CharField(max_length=50)
    Publicao=models.IntegerField()
    Categoria=models.CharField(max_length=50)
    def __str__(self):
        return self.Titulo
    
class usuario(models.Model):
    Nome=models.CharField( max_length=50)
    Matricula=models.CharField(max_length=50)
    Senha=models.IntegerField()
    cargo=models.CharField(max_length=13)


    
class bibliotecario(models.Model):
    Nome=models.CharField( max_length=50)
    Senha=models.IntegerField()
    




