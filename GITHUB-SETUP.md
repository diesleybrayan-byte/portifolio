# Guia: Conectar ao GitHub e Cloudflare Pages

## ✅ Concluído até agora

- Repositório Git inicializado ✓
- Arquivos de backup removidos ✓
- `.gitignore` criado ✓
- `README.md` criado ✓
- Commit inicial feito (16 arquivos) ✓

## 📋 Próximos Passos

### Opção 1: Usando GitHub CLI (gh) - Mais Rápido

Se você tem o GitHub CLI instalado, execute:

```bash
cd /Users/diesley/.gemini/antigravity/scratch/diesley-portfolio

# Criar repositório e fazer push automaticamente
gh repo create diesley-portfolio --public --source=. --remote=origin --push
```

### Opção 2: Manualmente pelo GitHub.com

1. **Criar repositório no GitHub**:
   - Acesse: https://github.com/new
   - Nome do repositório: `diesley-portfolio`
   - Descrição: "Portfolio pessoal com integração Strava"
   - Visibilidade: Public ou Private (sua escolha)
   - **NÃO** marque "Initialize with README" (já temos um!)
   - Clique em "Create repository"

2. **Conectar e fazer push**:
   
   Copie a URL do repositório criado (será algo como: `https://github.com/SEU-USUARIO/diesley-portfolio.git`)
   
   Depois execute os comandos abaixo (substitua a URL):

   ```bash
   cd /Users/diesley/.gemini/antigravity/scratch/diesley-portfolio
   
   # Adicionar o remote do GitHub
   git remote add origin https://github.com/SEU-USUARIO/diesley-portfolio.git
   
   # Fazer push inicial
   git push -u origin main
   ```

### 3. Configurar Cloudflare Pages

Após o código estar no GitHub:

1. **Conectar ao Cloudflare Pages**:
   - Acesse: https://dash.cloudflare.com
   - Vá em "Workers & Pages" → "Create Application" → "Pages" → "Connect to Git"
   - Autorize o GitHub a conectar com Cloudflare
   - Selecione o repositório `diesley-portfolio`

2. **Configurar Build**:
   - **Project name**: diesley-portfolio (ou outro nome)
   - **Production branch**: main
   - **Framework preset**: None
   - **Build command**: (deixe vazio)
   - **Build output directory**: `/`
   - Clique em "Save and Deploy"

3. **Resultado**:
   - Seu site será publicado em: `https://diesley-portfolio.pages.dev`
   - Toda vez que você fizer `git push`, o site será atualizado automaticamente! 🎉

### 4. Workflow de Atualizações Futuras

Agora que está tudo configurado, para fazer atualizações:

```bash
cd /Users/diesley/.gemini/antigravity/scratch/diesley-portfolio

# Fazer suas alterações nos arquivos...

# Adicionar e commitar
git add .
git commit -m "Descrição do que mudou"

# Enviar para GitHub
git push

# ✨ Cloudflare Pages faz deploy automático!
```

---

## 🔒 Importante: Cloudflare Worker

Não esqueça que o **Cloudflare Worker** (para Strava API) precisa estar configurado separadamente:

- O código está em: `cloudflare-worker/worker.js`
- Instruções de deploy: `cloudflare-worker/DEPLOY-GUIA.md`
- Variáveis de ambiente necessárias no Worker (não no Pages):
  - `STRAVA_CLIENT_ID`
  - `STRAVA_CLIENT_SECRET`
  - `STRAVA_REFRESH_TOKEN`

O Worker e o Pages são projetos separados no Cloudflare!
