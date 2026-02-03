/**
 * Cloudflare Worker - Strava API Proxy
 * Este worker protege suas credenciais do Strava
 * 
 * INSTRUÇÕES DE DEPLOY:
 * 1. Acesse https://dash.cloudflare.com
 * 2. Vá em Workers & Pages > Create Application > Create Worker
 * 3. Cole este código no editor
 * 4. Configure as variáveis de ambiente (Settings > Variables)
 */

// As credenciais ficam nas variáveis de ambiente do Cloudflare (seguro!)
// Você vai configurar isso no painel do Cloudflare

export default {
    async fetch(request, env) {
        // Configurar CORS para permitir seu site
        const corsHeaders = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type',
        };

        // Handle preflight requests
        if (request.method === 'OPTIONS') {
            return new Response(null, { headers: corsHeaders });
        }

        try {
            // 1. Obter novo access token usando refresh token
            const tokenResponse = await fetch('https://www.strava.com/oauth/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    client_id: env.STRAVA_CLIENT_ID,
                    client_secret: env.STRAVA_CLIENT_SECRET,
                    refresh_token: env.STRAVA_REFRESH_TOKEN,
                    grant_type: 'refresh_token',
                }),
            });

            const tokenData = await tokenResponse.json();

            if (!tokenData.access_token) {
                return new Response(JSON.stringify({ error: 'Token inválido' }), {
                    status: 401,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // 2. Buscar última atividade
            const activitiesResponse = await fetch(
                `https://www.strava.com/api/v3/athlete/activities?per_page=1&access_token=${tokenData.access_token}`
            );

            const activities = await activitiesResponse.json();

            if (activities.length === 0) {
                return new Response(JSON.stringify({ error: 'Sem atividades' }), {
                    status: 404,
                    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                });
            }

            // 3. Retornar apenas os dados necessários (mais seguro)
            const activity = activities[0];
            const safeData = {
                name: activity.name,
                distance: activity.distance,
                moving_time: activity.moving_time,
                start_date: activity.start_date,
                type: activity.type,
            };

            return new Response(JSON.stringify(safeData), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });

        } catch (error) {
            return new Response(JSON.stringify({ error: 'Erro no servidor' }), {
                status: 500,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            });
        }
    },
};
