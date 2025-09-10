# 📚 Documentação da API Pokémon

## 🎯 Como usar a PokeAPI para buscar dados e sprites

### 📋 Pré-requisitos
```bash
pip install requests pillow
```

### 🚀 Uso Básico

```python
from pokeapi_test import PokeAPI

# Criar instância da API
api = PokeAPI()

# Buscar Pokémon por nome ou ID
pokemon = api.buscar_pokemon("pikachu")  # ou api.buscar_pokemon(25)
```

### 📊 Dados Disponíveis

Cada Pokémon retorna um dicionário com:
- **ID**: Número do Pokémon
- **Nome**: Nome do Pokémon
- **Altura**: Altura em metros
- **Peso**: Peso em kg
- **Tipos**: Lista de tipos (fire, water, etc.)
- **Habilidades**: Lista de habilidades
- **Estatísticas**: HP, Attack, Defense, etc.
- **Movimentos**: Lista de todos os movimentos
- **Sprites**: URLs para diferentes imagens

### 🖼️ Baixar Sprites

```python
# Baixar sprite frontal padrão
api.baixar_sprite(pokemon, 'front_default')

# Baixar sprite traseiro
api.baixar_sprite(pokemon, 'back_default')

# Baixar sprite shiny
api.baixar_sprite(pokemon, 'front_shiny')

# Baixar artwork oficial
api.baixar_sprite(pokemon, 'other.official-artwork.front_default')
```

### 🎨 Tipos de Sprites Disponíveis

- `front_default` - Sprite frontal normal
- `back_default` - Sprite traseiro normal
- `front_shiny` - Sprite frontal shiny
- `back_shiny` - Sprite traseiro shiny
- `other.official-artwork.front_default` - Arte oficial

### 📝 Exemplo Completo

```python
from pokeapi_test import PokeAPI

# Inicializar API
api = PokeAPI()

# Buscar Pikachu
pikachu = api.buscar_pokemon("pikachu")

if pikachu:
    # Mostrar informações
    api.exibir_informacoes_pokemon(pikachu)
    
    # Baixar sprites
    api.baixar_sprite(pikachu, 'front_default')
    api.baixar_sprite(pikachu, 'back_default')
    api.baixar_sprite(pikachu, 'front_shiny')
```

### 🔧 Métodos Disponíveis

#### `buscar_pokemon(nome_ou_id)`
- Busca dados de um Pokémon
- Aceita nome (string) ou ID (int)
- Retorna dicionário com dados ou None

#### `exibir_informacoes_pokemon(dados_pokemon)`
- Exibe informações formatadas no console
- Mostra stats, tipos, habilidades, etc.

#### `baixar_sprite(dados_pokemon, tipo, salvar=True)`
- Baixa sprite do Pokémon
- Salva arquivo se `salvar=True`
- Retorna objeto PIL.Image

#### `exibir_sprite(dados_pokemon, tipo)`
- Exibe sprite em janela gráfica
- Requer display gráfico

### 🎮 Para Jogos

Use esta API para:
- ✅ Buscar dados de qualquer Pokémon
- ✅ Baixar sprites para seu jogo
- ✅ Obter estatísticas reais
- ✅ Acessar movimentos autênticos
- ✅ Usar tipos e efetividades

### 🚨 Limitações

- API pública (sem rate limit rigoroso)
- Requer conexão com internet
- Sprites são de 96x96 pixels
- Dados em inglês

### 💡 Dicas

1. **Cache**: Salve os dados localmente para evitar requisições repetidas
2. **Sprites**: Baixe todos os sprites que precisar de uma vez
3. **Erro**: Sempre verifique se `buscar_pokemon()` retornou dados válidos
4. **Performance**: Use IDs numéricos quando possível (mais rápido)

---

**🎯 Pronto para criar seu jogo Pokémon!**
