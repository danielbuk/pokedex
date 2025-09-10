# 🎮 Pokedex Flask - A sua Pokedex Digital

Uma Pokedex moderna e interativa criada com Flask, usando as cores oficiais do Pokémon e dados da PokeAPI.

## ✨ Características

- **🎨 Design Oficial**: Cores e estilo baseados nos jogos Pokémon
- **📱 100% Responsivo**: Funciona perfeitamente em qualquer dispositivo
- **🔍 Busca Inteligente**: Encontre qualquer Pokémon por nome, ID ou tipo
- **📊 Estatísticas Detalhadas**: Veja todas as stats, habilidades e movimentos
- **🖼️ Sprites Oficiais**: Imagens oficiais de todos os Pokémon
- **⚡ Performance**: Carregamento rápido com cache inteligente
- **🌐 API REST**: Endpoints para integração com outros projetos

## 🚀 Como Executar

### 1. Instalar Dependências
```bash
pip install -r requirements.txt
```

### 2. Executar a Pokedex
```bash
python app.py
```

### 3. Acessar
Abra seu navegador em: **http://localhost:5000**

## 📁 Estrutura do Projeto

```
pokedex/
├── app.py                 # Aplicação Flask principal
├── config.py             # Configurações
├── templates/            # Templates HTML
│   ├── base.html         # Template base
│   ├── index.html        # Página inicial
│   ├── pokemon_detail.html # Detalhes do Pokémon
│   ├── tipos.html        # Página de tipos
│   ├── sobre.html        # Página sobre
│   └── error.html        # Página de erro
├── static/               # Arquivos estáticos
│   ├── css/
│   │   └── style.css     # Estilos com cores do Pokémon
│   ├── js/
│   │   └── main.js       # JavaScript principal
│   └── images/           # Imagens e sprites
└── requirements.txt      # Dependências Python
```

## 🎯 Funcionalidades

### 🏠 Página Inicial
- Pokémon em destaque
- Grid com todos os Pokémon
- Filtros por nome e tipo
- Estatísticas da Pokedex

### 🔍 Busca
- Busca por nome ou ID
- Filtros em tempo real
- Resultados instantâneos

### 📊 Detalhes do Pokémon
- Informações completas
- Estatísticas com barras animadas
- Sprites (normal, shiny, artwork)
- Habilidades e movimentos
- Navegação entre Pokémon

### 🏷️ Tipos
- Lista de todos os tipos
- Tabela de efetividade
- Dicas de batalha

## 🎨 Design

### Cores Oficiais do Pokémon
- **Amarelo**: `#FFCB05` (cor principal)
- **Azul**: `#3B82F6` (cor secundária)
- **Vermelho**: `#EF4444` (destaque)
- **Fundo**: Gradientes escuros modernos

### Tipografia
- **Títulos**: Fredoka One (estilo Pokémon)
- **Texto**: Roboto (legibilidade)

### Responsividade
- **Desktop**: Layout em grid
- **Tablet**: Adaptação automática
- **Mobile**: Interface otimizada

## 🔧 API Endpoints

### Páginas
- `GET /` - Página inicial
- `GET /pokemon/<id>` - Detalhes do Pokémon
- `GET /buscar?q=<termo>` - Busca
- `GET /tipos` - Página de tipos
- `GET /sobre` - Página sobre

### API REST
- `GET /api/pokemon/<id>` - Dados do Pokémon (JSON)
- `GET /api/lista?limit=20&offset=0` - Lista de Pokémon (JSON)

## 🛠️ Tecnologias

- **Backend**: Python 3.8+, Flask 3.0
- **Frontend**: HTML5, CSS3, JavaScript ES6+
- **Framework CSS**: Bootstrap 5
- **Ícones**: Font Awesome 6
- **Fontes**: Google Fonts
- **API**: PokeAPI (dados oficiais)

## 📱 Recursos Mobile

- Interface touch-friendly
- Navegação por gestos
- Carregamento otimizado
- Cache inteligente

## 🎮 Recursos Interativos

- Animações suaves
- Efeitos hover
- Loading states
- Notificações
- Compartilhamento social

## 🔒 Segurança

- Validação de entrada
- Sanitização de dados
- Headers de segurança
- Rate limiting (em produção)

## 📈 Performance

- Cache de dados da API
- Lazy loading de imagens
- Compressão de assets
- Otimização de queries

## 🚀 Deploy

### Desenvolvimento
```bash
python app.py
```

### Produção
```bash
export FLASK_ENV=production
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto é para fins educacionais e de entretenimento.
Pokémon é uma marca registrada da Nintendo.

## 🙏 Créditos

- **PokeAPI**: Dados oficiais dos Pokémon
- **Nintendo/Game Freak**: Criadores do Pokémon
- **Bootstrap**: Framework CSS
- **Font Awesome**: Ícones

---

**🎮 Divirta-se explorando a Pokedex!**
