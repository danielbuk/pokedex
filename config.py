#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Configurações da Pokedex Flask
"""

import os
from datetime import timedelta

class Config:
    """Configurações base"""
    
    # Configurações básicas
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'pokedex_secret_key_2024'
    
    # Configurações da API
    POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2'
    POKEAPI_TIMEOUT = 10
    POKEAPI_CACHE_SIZE = 100
    
    # Configurações de cache
    CACHE_TYPE = 'simple'
    CACHE_DEFAULT_TIMEOUT = 300  # 5 minutos
    
    # Configurações de sessão
    PERMANENT_SESSION_LIFETIME = timedelta(hours=24)
    
    # Configurações de upload
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    UPLOAD_FOLDER = 'static/uploads'
    
    # Configurações de paginação
    POKEMON_PER_PAGE = 20
    MAX_POKEMON_PER_PAGE = 100
    
    # Configurações de desenvolvimento
    DEBUG = True
    TESTING = False
    
    # Configurações de logging
    LOG_LEVEL = 'INFO'
    LOG_FILE = 'pokedex.log'

class DevelopmentConfig(Config):
    """Configurações de desenvolvimento"""
    DEBUG = True
    TESTING = False

class ProductionConfig(Config):
    """Configurações de produção"""
    DEBUG = False
    TESTING = False
    
    # Configurações de segurança para produção
    SESSION_COOKIE_SECURE = True
    SESSION_COOKIE_HTTPONLY = True
    SESSION_COOKIE_SAMESITE = 'Lax'

class TestingConfig(Config):
    """Configurações de teste"""
    TESTING = True
    DEBUG = True
    
    # Desabilitar cache em testes
    CACHE_TYPE = 'null'

# Configuração por ambiente
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'testing': TestingConfig,
    'default': DevelopmentConfig
}
