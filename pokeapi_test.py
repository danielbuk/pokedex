import requests
import json
from PIL import Image
import io
import os

class PokeAPI:
    """Classe para interagir com a API do PokeAPI"""
    
    def __init__(self):
        self.base_url = "https://pokeapi.co/api/v2"
    
    def buscar_pokemon(self, nome_ou_id):
        """
        Busca dados de um Pokémon por nome ou ID
        
        Args:
            nome_ou_id (str/int): Nome ou ID do Pokémon
            
        Returns:
            dict: Dados do Pokémon ou None se não encontrado
        """
        try:
            # Converter para string e usar minúsculas se for string
            if isinstance(nome_ou_id, str):
                pokemon_id = nome_ou_id.lower()
            else:
                pokemon_id = str(nome_ou_id)
            
            url = f"{self.base_url}/pokemon/{pokemon_id}"
            response = requests.get(url)
            
            if response.status_code == 200:
                return response.json()
            else:
                print(f"Erro ao buscar Pokémon: {response.status_code}")
                return None
                
        except requests.exceptions.RequestException as e:
            print(f"Erro na requisição: {e}")
            return None
    
    def exibir_informacoes_pokemon(self, dados_pokemon):
        """
        Exibe informações básicas do Pokémon
        
        Args:
            dados_pokemon (dict): Dados do Pokémon retornados pela API
        """
        if not dados_pokemon:
            print("Nenhum dado de Pokémon fornecido")
            return
        
        print(f"\n{'='*50}")
        print(f"POKÉMON: {dados_pokemon['name'].upper()}")
        print(f"{'='*50}")
        
        # Informações básicas
        print(f"ID: {dados_pokemon['id']}")
        print(f"Altura: {dados_pokemon['height'] / 10:.1f} m")
        print(f"Peso: {dados_pokemon['weight'] / 10:.1f} kg")
        print(f"Experiência Base: {dados_pokemon['base_experience']}")
        
        # Tipos
        tipos = [tipo['type']['name'] for tipo in dados_pokemon['types']]
        print(f"Tipos: {', '.join(tipos)}")
        
        # Habilidades
        print("\nHabilidades:")
        for habilidade in dados_pokemon['abilities']:
            status = " (Oculta)" if habilidade['is_hidden'] else ""
            print(f"  - {habilidade['ability']['name']}{status}")
        
        # Estatísticas
        print("\nEstatísticas Base:")
        for stat in dados_pokemon['stats']:
            nome_stat = stat['stat']['name'].replace('-', ' ').title()
            print(f"  {nome_stat}: {stat['base_stat']}")
        
        # Movimentos (apenas os primeiros 5)
        print(f"\nMovimentos (mostrando 5 de {len(dados_pokemon['moves'])}):")
        for i, move in enumerate(dados_pokemon['moves'][:5]):
            print(f"  - {move['move']['name']}")
        if len(dados_pokemon['moves']) > 5:
            print(f"  ... e mais {len(dados_pokemon['moves']) - 5} movimentos")
    
    def baixar_sprite(self, dados_pokemon, tipo='front_default', salvar=True):
        """
        Baixa e exibe o sprite do Pokémon
        
        Args:
            dados_pokemon (dict): Dados do Pokémon
            tipo (str): Tipo de sprite ('front_default', 'back_default', 'front_shiny', etc.)
            salvar (bool): Se deve salvar a imagem em arquivo
            
        Returns:
            PIL.Image: Imagem do sprite ou None se erro
        """
        if not dados_pokemon or 'sprites' not in dados_pokemon:
            print("Dados de Pokémon inválidos")
            return None
        
        sprite_url = dados_pokemon['sprites'].get(tipo)
        if not sprite_url:
            print(f"Sprite '{tipo}' não encontrado")
            return None
        
        try:
            # Baixar a imagem
            response = requests.get(sprite_url)
            if response.status_code == 200:
                # Abrir com PIL
                imagem = Image.open(io.BytesIO(response.content))
                
                # Salvar se solicitado
                if salvar:
                    nome_arquivo = f"{dados_pokemon['name']}_{tipo}.png"
                    imagem.save(nome_arquivo)
                    print(f"Sprite salvo como: {nome_arquivo}")
                
                return imagem
            else:
                print(f"Erro ao baixar sprite: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"Erro ao processar sprite: {e}")
            return None
    
    def exibir_sprite(self, dados_pokemon, tipo='front_default'):
        """
        Exibe o sprite do Pokémon (requer display gráfico)
        
        Args:
            dados_pokemon (dict): Dados do Pokémon
            tipo (str): Tipo de sprite a exibir
        """
        imagem = self.baixar_sprite(dados_pokemon, tipo, salvar=False)
        if imagem:
            print(f"\nExibindo sprite {tipo} do {dados_pokemon['name']}:")
            imagem.show()
        else:
            print("Não foi possível exibir o sprite")

def main():
    """Função principal para testar a API"""
    print("🔍 Testando a API do PokeAPI")
    print("=" * 50)
    
    # Criar instância da classe
    api = PokeAPI()
    
    # Testar com Pikachu
    print("Buscando dados do Pikachu...")
    pikachu = api.buscar_pokemon("pikachu")
    
    if pikachu:
        # Exibir informações
        api.exibir_informacoes_pokemon(pikachu)
        
        # Baixar sprites principais
        print(f"\n📸 Baixando sprites do {pikachu['name']}...")
        api.baixar_sprite(pikachu, 'front_default')
        api.baixar_sprite(pikachu, 'back_default')
        api.baixar_sprite(pikachu, 'front_shiny')
        
        print(f"\n✅ Teste concluído! Sprites salvos no diretório atual.")
        
    else:
        print("❌ Não foi possível buscar dados do Pikachu")

if __name__ == "__main__":
    main()
