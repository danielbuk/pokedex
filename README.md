# 🎮 Pokémon API - Documentação Simples

Uma documentação limpa e simples para usar a PokeAPI e criar jogos Pokémon.

## 📚 O que você encontra aqui

- **API PokeAPI**: Classe pronta para buscar dados de Pokémon
- **Download de Sprites**: Baixe sprites oficiais automaticamente
- **Documentação Completa**: Como usar tudo passo a passo
- **Exemplos Práticos**: Código pronto para usar

## 🚀 Começar Agora

1. **Instale as dependências**:
```bash
pip install requests pillow
```

2. **Teste a API**:
```bash
python pokeapi_test.py
```

3. **Leia a documentação**:
```bash
# Abra o arquivo API_POKEMON_DOCS.md
```

## 📁 Arquivos

- `pokeapi_test.py` - Classe principal da API
- `API_POKEMON_DOCS.md` - Documentação completa
- `requirements.txt` - Dependências necessárias

## 🎯 Para que usar

- ✅ Criar jogos Pokémon
- ✅ Buscar dados oficiais
- ✅ Baixar sprites automaticamente
- ✅ Acessar estatísticas reais
- ✅ Usar em projetos educacionais

## 🔧 Exemplo Rápido

```python
from pokeapi_test import PokeAPI

api = PokeAPI()
pikachu = api.buscar_pokemon("pikachu")
api.baixar_sprite(pikachu, 'front_default')
```

---

**🎮 Pronto para criar seu jogo Pokémon!**