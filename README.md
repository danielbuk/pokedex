# 🎮 Pokedex Flask - Sistema Completo

Uma Pokedex moderna e funcional construída com Flask, integrada com a PokeAPI oficial.

## ✨ Funcionalidades

- 🔍 **Busca de Pokémon** por nome ou ID
- 📱 **Interface moderna** com design Pokémon autêntico
- 🎨 **Cores oficiais** do Pokémon
- 📊 **API completa** para integração
- 🖼️ **Sprites oficiais** da PokeAPI
- 📋 **Lista completa** de todos os 1302 Pokémon
- 🚀 **100% funcional** e testado

## 🚀 Como Usar

### Instalação
```bash
# Clone o repositório
git clone https://github.com/danielbuk/pokedex.git
cd pokedex

# Instale as dependências
pip install -r requirements.txt
```

### Executar
```bash
# Inicie a Pokedex
python pokedex_final.py
```

### Acessar
- **URL**: http://localhost:5000
- **API**: http://localhost:5000/api/pokemon/[nome-ou-id]

## 📁 Estrutura do Projeto

```
pokedex/
├── pokedex_final.py          # Arquivo principal (USE ESTE!)
├── templates/
│   ├── simples.html          # Página inicial moderna
│   ├── pokemon_detail.html   # Detalhes do Pokémon
│   └── base.html            # Template base
├── static/
│   ├── css/style.css        # Estilos Pokémon
│   └── js/main.js           # JavaScript
├── requirements.txt         # Dependências
└── README.md               # Este arquivo
```

## 🔧 API Endpoints

- `GET /` - Página inicial
- `GET /api/pokemon/[nome-ou-id]` - Dados do Pokémon
- `GET /api/lista` - Lista de todos os Pokémon
- `GET /buscar?q=[nome]` - Busca por nome
- `GET /pokemon/[nome-ou-id]` - Página de detalhes

## 🎯 Exemplos de Uso

### Buscar Pokémon
```bash
# Via API
curl http://localhost:5000/api/pokemon/pikachu
curl http://localhost:5000/api/pokemon/25

# Via navegador
http://localhost:5000/pokemon/pikachu
http://localhost:5000/buscar?q=charizard
```

### Lista de Pokémon
```bash
# Todos os Pokémon
curl http://localhost:5000/api/lista

# Primeiros 10
curl http://localhost:5000/api/lista?limit=10
```

## 🛠️ Tecnologias

- **Flask** - Framework web
- **PokeAPI** - API oficial do Pokémon
- **HTML/CSS/JavaScript** - Frontend
- **Python** - Backend

## 📝 Notas Importantes

- ✅ **Use sempre**: `python pokedex_final.py`
- ✅ **Funciona 100%** sem erros
- ✅ **Integração completa** com PokeAPI
- ✅ **Design responsivo** e moderno

## 🎮 Screenshots

A Pokedex inclui:
- Interface moderna com cores oficiais do Pokémon
- Busca funcional por nome ou ID
- Exibição de sprites oficiais
- Dados completos de cada Pokémon
- API REST para integração

## 📞 Suporte

Se encontrar algum problema:
1. Verifique se está usando `pokedex_final.py`
2. Confirme que a porta 5000 está livre
3. Execute `python test_pokedex.py` para testar

---

**Pokémon é uma marca registrada da Nintendo. Este projeto é apenas para fins educacionais.**