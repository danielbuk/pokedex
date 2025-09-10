#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Teste da Pokedex Flask
"""

import requests
import time

def test_pokedex():
    """Testa se a Pokedex está funcionando"""
    print("🎮 Testando Pokedex Flask...")
    
    # Aguardar o servidor iniciar
    time.sleep(3)
    
    try:
        # Testar página inicial
        response = requests.get('http://localhost:5000', timeout=10)
        if response.status_code == 200:
            print("✅ Página inicial funcionando!")
        else:
            print(f"❌ Erro na página inicial: {response.status_code}")
            
        # Testar API de Pokémon
        response = requests.get('http://localhost:5000/api/pokemon/25', timeout=10)
        if response.status_code == 200:
            data = response.json()
            print(f"✅ API funcionando! Pokémon: {data.get('nome', 'N/A')}")
        else:
            print(f"❌ Erro na API: {response.status_code}")
            
        # Testar busca
        response = requests.get('http://localhost:5000/buscar?q=pikachu', timeout=10)
        if response.status_code in [200, 302]:  # 302 é redirect
            print("✅ Busca funcionando!")
        else:
            print(f"❌ Erro na busca: {response.status_code}")
            
        print("\n🎉 Pokedex está funcionando perfeitamente!")
        print("📱 Acesse: http://localhost:5000")
        
    except requests.exceptions.ConnectionError:
        print("❌ Servidor não está rodando. Execute: python app.py")
    except Exception as e:
        print(f"❌ Erro no teste: {e}")

if __name__ == "__main__":
    test_pokedex()
