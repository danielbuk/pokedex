#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pokedex Flask - Uma Pokedex moderna e interativa
"""

from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests
import json
from PIL import Image
import io
import os
import base64
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'pokedex_secret_key_2024'

class PokeAPI:
    """Classe para interagir com a API do PokeAPI"""
    
    def __init__(self):
        self.base_url = "https://pokeapi.co/api/v2"
        self.cache = {}
        self.sprite_cache = {}
    
    def buscar_pokemon(self, nome_ou_id):
        """Busca dados de um Pokémon por nome ou ID"""
        key = str(nome_ou_id).lower()
        
        # Verificar cache
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
            print(f"Erro ao buscar Pokémon: {e}")
            return None
    
    def buscar_lista_pokemon(self, limite=151, offset=0):
        """Busca lista de Pokémon"""
        try:
            url = f"{self.base_url}/pokemon?limit={limite}&offset={offset}"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            print(f"Erro ao buscar lista: {e}")
            return None
    
    def buscar_tipos(self):
        """Busca todos os tipos de Pokémon"""
        try:
            url = f"{self.base_url}/type"
            response = requests.get(url, timeout=10)
            
            if response.status_code == 200:
                return response.json()
            return None
        except Exception as e:
            print(f"Erro ao buscar tipos: {e}")
            return None
    
    def processar_dados_pokemon(self, dados):
        """Processa dados do Pokémon para exibição"""
        if not dados:
            return None
        
        # Processar tipos
        tipos = [tipo['type']['name'] for tipo in dados['types']]
        
        # Processar estatísticas
        stats = {}
        for stat in dados['stats']:
            nome_stat = stat['stat']['name'].replace('-', '_')
            stats[nome_stat] = stat['base_stat']
        
        # Processar habilidades
        habilidades = []
        for habilidade in dados['abilities']:
            habilidades.append({
                'nome': habilidade['ability']['name'],
                'oculta': habilidade['is_hidden']
            })
        
        # Processar movimentos (apenas os primeiros 10)
        movimentos = []
        for move in dados['moves'][:10]:
            movimentos.append(move['move']['name'])
        
        # URLs dos sprites
        sprites = dados.get('sprites', {})
        
        return {
            'id': dados['id'],
            'nome': dados['name'].title(),
            'altura': dados['height'] / 10,  # Converter para metros
            'peso': dados['weight'] / 10,    # Converter para kg
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

# Instância global da API
poke_api = PokeAPI()

@app.route('/')
def index():
    """Página principal da Pokedex"""
    return render_template('index.html')

@app.route('/pokemon/<nome_ou_id>')
def pokemon_detail(nome_ou_id):
    """Página de detalhes do Pokémon"""
    dados = poke_api.buscar_pokemon(nome_ou_id)
    
    if not dados:
        return render_template('error.html', 
                             mensagem=f"Pokémon '{nome_ou_id}' não encontrado!")
    
    pokemon = poke_api.processar_dados_pokemon(dados)
    return render_template('pokemon_detail.html', pokemon=pokemon)

@app.route('/buscar')
def buscar():
    """Busca Pokémon por nome ou ID"""
    query = request.args.get('q', '').strip()
    
    if not query:
        return redirect(url_for('index'))
    
    # Tentar buscar como ID primeiro
    if query.isdigit():
        pokemon = poke_api.buscar_pokemon(int(query))
    else:
        pokemon = poke_api.buscar_pokemon(query)
    
    if pokemon:
        return redirect(url_for('pokemon_detail', nome_ou_id=query))
    else:
        return render_template('error.html', 
                             mensagem=f"Pokémon '{query}' não encontrado!")

@app.route('/api/pokemon/<nome_ou_id>')
def api_pokemon(nome_ou_id):
    """API endpoint para dados do Pokémon"""
    dados = poke_api.buscar_pokemon(nome_ou_id)
    
    if not dados:
        return jsonify({'erro': 'Pokémon não encontrado'}), 404
    
    pokemon = poke_api.processar_dados_pokemon(dados)
    return jsonify(pokemon)

@app.route('/api/lista')
def api_lista():
    """API endpoint para lista de Pokémon"""
    limite = request.args.get('limit', 151, type=int)
    offset = request.args.get('offset', 0, type=int)
    
    dados = poke_api.buscar_lista_pokemon(limite, offset)
    
    if not dados:
        return jsonify({'erro': 'Erro ao buscar lista'}), 500
    
    # Processar lista
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

@app.route('/tipos')
def tipos():
    """Página de tipos de Pokémon"""
    dados_tipos = poke_api.buscar_tipos()
    
    if not dados_tipos:
        return render_template('error.html', 
                             mensagem="Erro ao carregar tipos de Pokémon!")
    
    tipos = []
    for tipo in dados_tipos['results']:
        tipos.append({
            'nome': tipo['name'].title(),
            'url': tipo['url']
        })
    
    return render_template('tipos.html', tipos=tipos)

@app.route('/sobre')
def sobre():
    """Página sobre a Pokedex"""
    return render_template('sobre.html')

@app.errorhandler(404)
def not_found(error):
    """Página de erro 404"""
    return render_template('error.html', 
                         mensagem="Página não encontrada!"), 404

@app.errorhandler(500)
def internal_error(error):
    """Página de erro 500"""
    return render_template('error.html', 
                         mensagem="Erro interno do servidor!"), 500

if __name__ == '__main__':
    # Criar diretórios necessários
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    print("🎮 Iniciando Pokedex Flask...")
    print("📱 Acesse: http://localhost:5000")
    
    # Configurar para não usar .env automaticamente
    import os
    os.environ['FLASK_ENV'] = 'development'
    os.environ['FLASK_DEBUG'] = 'True'
    
    app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
