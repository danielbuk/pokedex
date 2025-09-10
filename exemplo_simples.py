#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Exemplo simples de como usar a API Pokémon
"""

from pokeapi_test import PokeAPI

def exemplo_basico():
    """Exemplo básico de uso da API"""
    print("🎮 Exemplo Básico da API Pokémon")
    print("=" * 40)
    
    # Criar instância da API
    api = PokeAPI()
    
    # Lista de Pokémon para testar
    pokemons = ["pikachu", "charizard", "blastoise", "venusaur"]
    
    for nome in pokemons:
        print(f"\n🔍 Buscando {nome.title()}...")
        
        # Buscar dados
        pokemon = api.buscar_pokemon(nome)
        
        if pokemon:
            print(f"✅ {pokemon['name'].title()} encontrado!")
            print(f"   ID: {pokemon['id']}")
            print(f"   Tipos: {', '.join([t['type']['name'] for t in pokemon['types']])}")
            print(f"   HP: {pokemon['stats'][0]['base_stat']}")
            
            # Baixar sprite frontal
            api.baixar_sprite(pokemon, 'front_default')
        else:
            print(f"❌ {nome.title()} não encontrado!")

def exemplo_para_jogo():
    """Exemplo de como usar em um jogo"""
    print("\n🎯 Exemplo para Jogos")
    print("=" * 40)
    
    api = PokeAPI()
    
    # Simular seleção de Pokémon para batalha
    pokemon_jogador = api.buscar_pokemon("pikachu")
    pokemon_inimigo = api.buscar_pokemon("charmander")
    
    if pokemon_jogador and pokemon_inimigo:
        print(f"⚔️  Batalha: {pokemon_jogador['name'].title()} vs {pokemon_inimigo['name'].title()}")
        
        # Baixar sprites para o jogo
        print("📸 Baixando sprites para o jogo...")
        api.baixar_sprite(pokemon_jogador, 'back_default')  # Pokémon do jogador (de costas)
        api.baixar_sprite(pokemon_inimigo, 'front_default')  # Pokémon inimigo (de frente)
        
        print("✅ Sprites prontos para usar no jogo!")
        print("   - pikachu_back_default.png (jogador)")
        print("   - charmander_front_default.png (inimigo)")

if __name__ == "__main__":
    exemplo_basico()
    exemplo_para_jogo()
    
    print("\n🎉 Exemplos concluídos!")
    print("📚 Leia API_POKEMON_DOCS.md para mais detalhes")
