#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script simples para iniciar a Pokedex
"""

import os
import sys

# Configurar variáveis de ambiente antes de importar Flask
os.environ['FLASK_ENV'] = 'development'
os.environ['FLASK_DEBUG'] = 'True'

# Importar após configurar as variáveis
from app import app

def main():
    """Função principal"""
    print("🎮 Iniciando Pokedex Flask...")
    print("=" * 50)
    print("📱 Acesse: http://localhost:5000")
    print("🛑 Para parar: Ctrl+C")
    print("=" * 50)
    
    try:
        app.run(debug=True, host='0.0.0.0', port=5000, use_reloader=False)
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado!")
        print("👋 Obrigado por usar a Pokedex!")

if __name__ == "__main__":
    main()
