# Diesley Portfolio

Portfolio pessoal com integração ao Strava para exibir última atividade de corrida.

## 🚀 Tecnologias

- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Hospedagem**: Cloudflare Pages
- **API**: Strava API via Cloudflare Worker (proxy seguro)

## 📁 Estrutura do Projeto

```
diesley-portfolio/
├── assets/
│   └── images/          # Imagens e logos
├── cloudflare-worker/
│   ├── worker.js        # Worker proxy para Strava API
│   └── DEPLOY-GUIA.md   # Instruções de deploy do worker
├── scripts/
│   └── main.js          # JavaScript principal do site
├── styles/
│   └── index.css        # Estilos do site
├── index.html           # Página principal
├── .gitignore
└── README.md
```

## 🔧 Configuração

### 1. Cloudflare Worker (Strava API)

O projeto usa um Cloudflare Worker para proteger as credenciais da API do Strava. 

**Variáveis de Ambiente Necessárias no Worker:**
- `STRAVA_CLIENT_ID`
- `STRAVA_CLIENT_SECRET`
- `STRAVA_REFRESH_TOKEN`

Para instruções detalhadas de deploy do worker, consulte: [`cloudflare-worker/DEPLOY-GUIA.md`](cloudflare-worker/DEPLOY-GUIA.md)

### 2. Deploy no Cloudflare Pages

1. Conecte este repositório GitHub ao Cloudflare Pages
2. Configure o projeto com as seguintes opções:
   - **Framework preset**: None
   - **Build command**: (deixar vazio)
   - **Build output directory**: `/`
3. Deploy automático será acionado a cada push para a branch `main`

## 🌐 Site em Produção

Após o deploy, o site estará disponível em seu domínio Cloudflare Pages personalizado.

## 📝 Desenvolvimento Local

Para desenvolver localmente, basta abrir o `index.html` em um navegador ou usar um servidor local:

```bash
# Usando Python
python -m http.server 8000

# Usando Node.js (http-server)
npx http-server
```

## 🔄 Workflow de Atualização

1. Faça as alterações necessárias nos arquivos
2. Commit e push para o GitHub:
   ```bash
   git add .
   git commit -m "Descrição das mudanças"
   git push
   ```
3. Cloudflare Pages detecta automaticamente o push e faz o deploy

## 📄 Licença

Projeto pessoal - Todos os direitos reservados
