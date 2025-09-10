#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pokedex Flask - Versão Final sem problemas de .env
"""

import os
import sys

# Desabilitar carregamento automático de .env
os.environ['FLASK_SKIP_DOTENV'] = '1'

from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests
import json

# Criar app Flask
app = Flask(__name__)
app.secret_key = 'pokedex_secret_key_2024'

class PokeAPI:
    """API do Pokémon"""
    
    def __init__(self):
        self.base_url = "https://pokeapi.co/api/v2"
        self.cache = {}
    
    def buscar_pokemon(self, nome_ou_id):
        """Busca Pokémon"""
        key = str(nome_ou_id).lower()
        
        if key in self.cache:
            return self.cache[key]
        
        try:
            url = f"{self.base_url}/pokemon/{key}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                self.cache[key] = data
                return data
            return None
        except Exception as e:
            print(f"Erro: {e}")
            return None
    
    def processar_dados_pokemon(self, dados):
        """Processa dados"""
        if not dados:
            return None
        
        tipos = [tipo['type']['name'] for tipo in dados['types']]
        
        stats = {}
        for stat in dados['stats']:
            nome_stat = stat['stat']['name'].replace('-', '_')
            stats[nome_stat] = stat['base_stat']
        
        habilidades = []
        for habilidade in dados['abilities']:
            habilidades.append({
                'nome': habilidade['ability']['name'],
                'oculta': habilidade['is_hidden']
            })
        
        movimentos = []
        for move in dados['moves'][:10]:
            movimentos.append(move['move']['name'])
        
        sprites = dados.get('sprites', {})
        
        return {
            'id': dados['id'],
            'nome': dados['name'].title(),
            'altura': dados['height'] / 10,
            'peso': dados['weight'] / 10,
            'tipos': tipos,
            'stats': stats,
            'habilidades': habilidades,
            'movimentos': movimentos,
            'sprites': {
                'front_default': sprites.get('front_default'),
                'back_default': sprites.get('back_default'),
                'front_shiny': sprites.get('front_shiny'),
                'back_shiny': sprites.get('back_shiny'),
                'official_artwork': sprites.get('other', {}).get('official-artwork', {}).get('front_default')
            },
            'base_experience': dados.get('base_experience', 0)
        }

# Instância da API
poke_api = PokeAPI()

@app.route('/')
def index():
    """Página inicial"""
    return render_template('simples.html')

@app.route('/home')
def home():
    """Página inicial original"""
    return render_template('index.html')

@app.route('/tipos')
def tipos():
    """Página de tipos"""
    return "Página de tipos em desenvolvimento"

@app.route('/sobre')
def sobre():
    """Página sobre"""
    return "Página sobre em desenvolvimento"

@app.route('/pokemon/<nome_ou_id>')
def pokemon_detail(nome_ou_id):
    """Detalhes do Pokémon"""
    dados = poke_api.buscar_pokemon(nome_ou_id)
    
    if not dados:
        return f"Pokémon '{nome_ou_id}' não encontrado!", 404
    
    pokemon = poke_api.processar_dados_pokemon(dados)
    return render_template('pokemon_detail.html', pokemon=pokemon)

@app.route('/buscar')
def buscar():
    """Busca"""
    query = request.args.get('q', '').strip()
    
    if not query:
        return redirect(url_for('index'))
    
    if query.isdigit():
        pokemon = poke_api.buscar_pokemon(int(query))
    else:
        pokemon = poke_api.buscar_pokemon(query)
    
    if pokemon:
        return redirect(url_for('pokemon_detail', nome_ou_id=query))
    else:
        return f"Pokémon '{query}' não encontrado!", 404

@app.route('/api/pokemon/<nome_ou_id>')
def api_pokemon(nome_ou_id):
    """API endpoint"""
    dados = poke_api.buscar_pokemon(nome_ou_id)
    
    if not dados:
        return jsonify({'erro': 'Pokémon não encontrado'}), 404
    
    pokemon = poke_api.processar_dados_pokemon(dados)
    return jsonify(pokemon)

@app.route('/api/lista')
def api_lista():
    """API lista"""
    limite = request.args.get('limit', 20, type=int)
    offset = request.args.get('offset', 0, type=int)
    
    try:
        url = f"{poke_api.base_url}/pokemon?limit={limite}&offset={offset}"
        response = requests.get(url, timeout=10)
        
        if response.status_code == 200:
            dados = response.json()
            
            pokemons = []
            for item in dados['results']:
                pokemon_id = item['url'].split('/')[-2]
                pokemons.append({
                    'id': int(pokemon_id),
                    'nome': item['name'].title(),
                    'url': item['url']
                })
            
            return jsonify({
                'count': dados['count'],
                'results': pokemons
            })
        else:
            return jsonify({'erro': 'Erro ao buscar lista'}), 500
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == '__main__':
    # Criar diretórios
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    print("🎮 POKEDEX FLASK")
    print("=" * 50)
    print("📱 Acesse: http://localhost:5000")
    print("🛑 Para parar: Ctrl+C")
    print("=" * 50)
    
    try:
        # Usar run_simple para evitar problemas com .env
        from werkzeug.serving import run_simple
        run_simple('127.0.0.1', 5000, app, use_reloader=False, use_debugger=True)
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado!")
        print("👋 Obrigado por usar a Pokedex!")
