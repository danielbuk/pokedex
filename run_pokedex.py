#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para executar a Pokedex Flask
"""

import os
import sys
import webbrowser
import time
import threading
from app import app

def open_browser():
    """Abre o navegador após 2 segundos"""
    time.sleep(2)
    webbrowser.open('http://localhost:5000')

def main():
    """Função principal"""
    print("🎮 Iniciando Pokedex Flask...")
    print("=" * 50)
    
    # Verificar se as dependências estão instaladas
    try:
        import flask
        import requests
        from PIL import Image
        print("✅ Todas as dependências estão instaladas!")
    except ImportError as e:
        print(f"❌ Dependência não encontrada: {e}")
        print("Execute: pip install -r requirements.txt")
        return
    
    # Criar diretórios necessários
    os.makedirs('static/images', exist_ok=True)
    os.makedirs('templates', exist_ok=True)
    
    print("📁 Estrutura de diretórios verificada!")
    print("🌐 Iniciando servidor...")
    print("📱 A Pokedex será aberta automaticamente no navegador!")
    print("🛑 Para parar o servidor, pressione Ctrl+C")
    print("=" * 50)
    
    # Abrir navegador em thread separada
    browser_thread = threading.Thread(target=open_browser)
    browser_thread.daemon = True
    browser_thread.start()
    
    try:
        # Configurar variáveis de ambiente
        os.environ['FLASK_ENV'] = 'development'
        os.environ['FLASK_DEBUG'] = 'True'
        
        # Executar aplicação
        app.run(
            debug=True,
            host='0.0.0.0',
            port=5000,
            use_reloader=False  # Evitar duplicação de threads
        )
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado pelo usuário!")
        print("👋 Obrigado por usar a Pokedex!")

if __name__ == "__main__":
    main()
