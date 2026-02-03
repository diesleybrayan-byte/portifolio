# Configuração do Painel Administrativo

Este guia explica como configurar e usar o painel administrativo do seu portfólio.

## 🎯 O que é?

Um painel visual em `/admin` onde você pode editar:
- ✏️ Estatísticas (tempos, corridas, ranking)
- 🖼️ Fotos da galeria
- 📝 Textos sobre você  
- 💰 Cotas de patrocínio

**Sem precisar mexer em código!**

## 🔧 Configuração Inicial (Uma única vez)

### 1. Habilitar Identity no Cloudflare

1. Acesse [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Vá em **Workers & Pages** → Seu projeto
3. Clique em **Settings** → **Functions**
4. Role até **Environment Variables**
5. Adicione:
   - **Nome**: `GITHUB_TOKEN`
   - **Valor**: [Token do GitHub com acesso ao repositório]

### 2. Criar GitHub OAuth App

1. Vá em [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Clique em **New OAuth App**
3. Preencha:
   - **Application name**: `Diesley Portfolio Admin`
   - **Homepage URL**: `https://seu-site.pages.dev`
   - **Authorization callback URL**: `https://seu-site.pages.dev/admin/`
4. Após criar, copie:
   - **Client ID**
   - **Client Secret**

### 3. Configurar no Cloudflare

Volte ao Cloudflare e adicione mais variáveis:
- `OAUTH_CLIENT_ID`: [seu Client ID]
- `OAUTH_CLIENT_SECRET`: [seu Client Secret]

### 4. Deploy

Faça push das mudanças e aguarde o deploy.

## 📝 Como Usar o Painel

### Acessar o Admin

1. Vá para `https://seu-site.pages.dev/admin`
2. Clique em **Login with GitHub**
3. Autorize a aplicação

### Editar Conteúdo

1. No painel, escolha o que quer editar:
   - **Estatísticas**: Seus recordes e números
   - **Galeria de Fotos**: Trocar fotos dos 4 quadrados
   - **Sobre Mim**: Textos da seção sobre
   - **Patrocínio**: Valores e descrições das cotas

2. Faça as mudanças desejadas

3. Clique em **Publish** ou **Publicar**

4. Aguarde ~1 minuto para o deploy automático

5. Recarregue seu site e veja as mudanças!

## 🖼️ Como Trocar Fotos da Galeria

1. Acesse **Galeria de Fotos**
2. Escolha qual box quer editar (Box 1, 2, 3 ou 4)
3. Para cada foto:
   - Clique em **Choose an image** ou **Escolher uma imagem**
   - Selecione do seu computador ou escolha uma já existente
4. Clique em **Save** e depois **Publish**

## ⚙️ Editando Estatísticas

1. Acesse **Estatísticas**
2. Edite os campos:
   - Melhor 5K (formato: "17:31")
   - Melhor 10K (formato: "37:40")
   - Total de Corridas (número)
   - Ranking Strava Local (ex: "#8 Local")
   - Meses de Treino (número)
3. Salve e publique

## 🚨 Problemas Comuns

**Erro ao fazer login**
- Verifique se configurou o OAuth App corretamente
- Confirme que as variáveis de ambiente estão no Cloudflare

**Mudanças não aparecem**
- Aguarde 1-2 minutos para o deploy
- Limpe o cache do navegador (Ctrl+F5)
- Verifique se clicou em "Publish"

**Foto não aparece**
- Formatos aceitos: JPG, PNG, WEBP
- Tamanho recomendado: até 2MB

## 📞 Suporte

Se tiver problemas, verifique:
1. Console do navegador (F12)
2. GitHub Actions (se o commit foi feito)
3. Deploy do Cloudflare (se está funcionando)
