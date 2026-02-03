# 🚀 Guia: Integração Cloudflare Pages

## ✅ Status Atual

Seu projeto já está no GitHub! 🎉
- **Repositório**: https://github.com/diesleybrayan-byte/portifolio
- **Branch principal**: `main`
- **Arquivos enviados**: 16 arquivos (incluindo assets, scripts, styles, worker)

---

## 📋 Próximo Passo: Conectar ao Cloudflare Pages

### 1. Acessar Cloudflare Dashboard

1. Acesse: **https://dash.cloudflare.com**
2. Faça login na sua conta Cloudflare

### 2. Criar Projeto no Pages

1. No menu lateral, clique em **"Workers & Pages"**
2. Clique no botão **"Create Application"**
3. Selecione a aba **"Pages"**
4. Clique em **"Connect to Git"**

### 3. Conectar GitHub

1. Se for a primeira vez:
   - Clique em **"Connect GitHub"**
   - Autorize o Cloudflare a acessar sua conta GitHub
   - Selecione quais repositórios o Cloudflare pode acessar (escolha "All repositories" ou selecione apenas `portifolio`)

2. Após autorizar:
   - Você verá uma lista dos seus repositórios
   - Selecione **`diesleybrayan-byte/portifolio`**
   - Clique em **"Begin setup"**

### 4. Configurar Build

Na tela de configuração, preencha:

| Campo | Valor |
|-------|-------|
| **Project name** | `diesley-portfolio` (ou outro nome de sua preferência) |
| **Production branch** | `main` |
| **Framework preset** | `None` |
| **Build command** | _(deixe vazio)_ |
| **Build output directory** | `/` |

**Importante**: Como é um site HTML/CSS/JS estático, não precisamos de build!

### 5. Deploy Inicial

1. Revise as configurações
2. Clique em **"Save and Deploy"**
3. Aguarde o primeiro deploy (geralmente leva 1-2 minutos)
4. Após concluir, você receberá uma URL tipo: `https://diesley-portfolio.pages.dev`

### 6. Configurar Domínio Personalizado (Opcional)

Se você quiser usar um domínio personalizado:

1. Na página do projeto, vá em **"Custom domains"**
2. Clique em **"Set up a custom domain"**
3. Digite seu domínio e siga as instruções

---

## 🔄 Deploy Automático Configurado!

A partir de agora, **toda vez que você fizer push para o GitHub**, o Cloudflare Pages vai:

1. 🔍 Detectar automaticamente o push
2. 🚀 Fazer deploy da nova versão
3. ✅ Atualizar o site em poucos segundos

### Workflow de Atualização:

```bash
# 1. Fazer alterações nos arquivos do projeto
cd /Users/diesley/.gemini/antigravity/scratch/diesley-portfolio

# 2. Commitar as mudanças
git add .
git commit -m "Descrição do que mudou"

# 3. Enviar para GitHub
git push

# 4. ✨ Cloudflare faz deploy automático!
# Acompanhe em: https://dash.cloudflare.com > Workers & Pages > seu-projeto
```

---

## ⚠️ Lembrete: Cloudflare Worker (Strava API)

**Importante**: O Cloudflare Worker para a Strava API é um projeto **separado** do Pages!

### Você precisa ter dois projetos no Cloudflare:

1. **Cloudflare Pages** (site estático)
   - Acabamos de configurar
   - Deploy automático via GitHub
   - URL: `https://diesley-portfolio.pages.dev`

2. **Cloudflare Worker** (proxy Strava API)
   - Código está em: `cloudflare-worker/worker.js`
   - Instruções: `cloudflare-worker/DEPLOY-GUIA.md`
   - Precisa ser deployado separadamente
   - Requer variáveis de ambiente:
     - `STRAVA_CLIENT_ID`
     - `STRAVA_CLIENT_SECRET`
     - `STRAVA_REFRESH_TOKEN`

### Para o Worker funcionar:

1. Vá em **Workers & Pages** > **Create Application** > **Create Worker**
2. Cole o código de `cloudflare-worker/worker.js`
3. Configure as variáveis de ambiente em **Settings** > **Variables**
4. Deploy do worker
5. Atualize o JavaScript do seu site (`scripts/main.js`) com a URL do worker

---

## 🎉 Pronto!

Após conectar o Cloudflare Pages, você terá:

✅ Código versionado no GitHub  
✅ Deploy automático configurado  
✅ Site publicado e acessível  
✅ Workflow simplificado: commit → push → deploy automático

**Qualquer dúvida, consulte a documentação do Cloudflare Pages:**
https://developers.cloudflare.com/pages/
