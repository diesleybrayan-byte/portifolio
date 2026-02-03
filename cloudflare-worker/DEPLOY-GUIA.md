# 🚀 Guia de Deploy - Cloudflare Worker para Strava

## Passo 1: Criar o Worker

1. Acesse [dash.cloudflare.com](https://dash.cloudflare.com)
2. No menu lateral, clique em **Workers & Pages**
3. Clique em **Create Application**
4. Clique em **Create Worker**
5. Dê um nome, por exemplo: `strava-api`
6. Clique em **Deploy**

---

## Passo 2: Adicionar o Código

1. Após criar, clique em **Edit Code** (ou "Quick Edit")
2. **Delete todo o código** que aparece
3. **Cole o código** do arquivo `worker.js` desta pasta
4. Clique em **Save and Deploy**

---

## Passo 3: Configurar Variáveis de Ambiente (IMPORTANTE!)

1. Volte para a página do Worker
2. Clique na aba **Settings**
3. Clique em **Variables**
4. Em **Environment Variables**, clique em **Add variable** 3 vezes:

| Nome da Variável | Valor |
|-----------------|-------|
| `STRAVA_CLIENT_ID` | `199704` |
| `STRAVA_CLIENT_SECRET` | `6466eee9175a60790e74db122440d333359cf840` |
| `STRAVA_REFRESH_TOKEN` | `1961b2e6bf1e28e2605c77a3adb87a3c022c673d` |

5. Marque cada uma como **Encrypt** (cadeado) para maior segurança
6. Clique em **Save and Deploy**

---

## Passo 4: Testar o Worker

1. Copie a URL do seu Worker (algo como `https://strava-api.SEU-USUARIO.workers.dev`)
2. Abra essa URL no navegador
3. Deve aparecer um JSON com sua última atividade!

---

## Passo 5: Atualizar seu Site

Depois de confirmar que funciona, você precisa atualizar o arquivo `main.js` do seu site.

Substitua a função `initStravaWidget()` por esta versão:

```javascript
function initStravaWidget() {
    // URL do seu Cloudflare Worker
    const workerUrl = 'https://strava-api.SEU-USUARIO.workers.dev';
    
    const widget = document.getElementById('strava-widget');
    if (!widget) return;
    
    fetch(workerUrl)
        .then(res => res.json())
        .then(data => {
            if (data.error) {
                showStravaError(widget, data.error);
            } else {
                updateStravaWidget(data, widget);
            }
        })
        .catch(e => {
            console.error("Erro ao buscar Strava:", e);
            showStravaError(widget, 'Erro de conexão');
        });
}
```

**IMPORTANTE**: Substitua `SEU-USUARIO` pela sua conta do Cloudflare!

---

## ✅ Pronto!

Agora suas credenciais estão seguras no Cloudflare e seu site só faz uma chamada simples ao Worker.

### Benefícios:
- 🔒 Credenciais protegidas (não aparecem no código do site)
- ⚡ Mais rápido (o Worker faz cache)
- 🌍 Funciona globalmente (edge computing)
- 💰 Gratuito (100.000 requests/dia)
