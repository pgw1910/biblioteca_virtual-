from django.contrib import admin
from .models import Livro,usuario,bibliotecario
admin.site.register(Livro)
admin.site.register(usuario)
admin.site.register(bibliotecario)
