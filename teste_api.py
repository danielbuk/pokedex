#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Teste simples da API da Pokedex
"""

import requests
import time

def testar_api():
    """Testa a API da Pokedex"""
    print("🎮 Testando API da Pokedex...")
    print("=" * 40)
    
    # Aguardar servidor iniciar
    time.sleep(2)
    
    try:
        # Testar API do Pikachu
        print("🔍 Testando API do Pikachu...")
        response = requests.get('http://localhost:5000/api/pokemon/25', timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Pikachu encontrado!")
            print(f"   Nome: {data.get('nome', 'N/A')}")
            print(f"   ID: {data.get('id', 'N/A')}")
            print(f"   Tipos: {', '.join(data.get('tipos', []))}")
            print(f"   Altura: {data.get('altura', 'N/A')}m")
            print(f"   Peso: {data.get('peso', 'N/A')}kg")
        else:
            print(f"❌ Erro: {response.status_code}")
            
        # Testar API do Charizard
        print("\n🔍 Testando API do Charizard...")
        response = requests.get('http://localhost:5000/api/pokemon/6', timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Charizard encontrado!")
            print(f"   Nome: {data.get('nome', 'N/A')}")
            print(f"   Tipos: {', '.join(data.get('tipos', []))}")
        else:
            print(f"❌ Erro: {response.status_code}")
            
        # Testar lista de Pokémon
        print("\n🔍 Testando lista de Pokémon...")
        response = requests.get('http://localhost:5000/api/lista?limit=5', timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Lista carregada!")
            print(f"   Total de Pokémon: {data.get('count', 'N/A')}")
            print(f"   Primeiros 5:")
            for pokemon in data.get('results', [])[:5]:
                print(f"     - {pokemon.get('nome', 'N/A')} (ID: {pokemon.get('id', 'N/A')})")
        else:
            print(f"❌ Erro: {response.status_code}")
            
        print("\n🎉 API funcionando perfeitamente!")
        print("📱 Acesse: http://localhost:5000")
        
    except requests.exceptions.ConnectionError:
        print("❌ Servidor não está rodando!")
        print("Execute: python pokedex_final.py")
    except Exception as e:
        print(f"❌ Erro: {e}")

if __name__ == "__main__":
    testar_api()
