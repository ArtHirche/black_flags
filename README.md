# 🏴‍☠️ Black Flags - Battle Bot

Sistema de RPG e Batalha automatizado para Discord, com temática de pirataria, focado na comunidade do servidor.

## 📝 Descrição do Projeto
O bot permite que usuários colecionem personagens (membros da Staff/Comunidade), batalhem entre si, ganhem moedas e desbloqueiem skins exclusivas que alteram visual e mecânicas de combate.

## 🛠️ Stack Tecnológica
- **Linguagem:** TypeScript / Node.js
- **Biblioteca:** [discord.js](https://discord.js.org/)
- **Banco de Dados:** PostgreSQL (Persistência de inventário e status)
- **Processamento de Imagem:** Canvas API (Geração dinâmica de cards de batalha)

## 🗂️ Estrutura de Pastas (Arquitetura)
```text
src/
├── commands/      # Comandos slash (batalha, perfil, loja)
├── engine/        # Lógica de cálculo de dano e RNG
├── database/      # Conexão e Queries (PostgreSQL)
├── graphics/      # Renderização de cards com Canvas
├── utils/         # Helpers e formatadores
└── index.ts       # Ponto de entrada do Bot
```

## 🚀 Como Iniciar
1. **Pré-requisitos:**
- Node.js v18+ instalado.
- Instância de PostgreSQL rodando.
- Token do Bot no Discord Developer Portal.

2. **Configuração: Crie um arquivo .env na raiz:**
```Code snipped
DISCORD_TOKEN=seu_token_aqui
CLIENT_ID=id_do_bot
DATABASE_URL=postgres://user:pass@localhost:5432/db_name
```

3. **Execução:**
```bash
npm install
npm run dev
```

## ⚔️ Regras de Negócio (Contexto para Agentes de IA)
- Personagem Base: Atributos padrão (Vida: 100, Atk: 10, Def: 5).
- Skins: Atuam como modificadores. A skin "Alemão CLT" altera o nome do ataque para "Planilha Assassina" e adiciona +5 de Defesa.
- Sistema de Turnos: As batalhas são resolvidas via RNG ponderado pelos atributos dos cards.

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](/LICENSE) para detalhes.