# Otimização de tráfego — 13/10/2026

241 imagens PNG referenciadas pelo mapa foram convertidas para WebP lossless: 331.564.009 bytes → 189.620.520 bytes (42,81% menores). Dimensões, pixels visíveis e canal alfa comparados em todas as imagens. Originais preservados para geração/edição; manifesto de exclusão de deployment atualizado. Prévia HD e seus manifests não foram alterados.

`next.config.mjs` aplica Cache-Control public, max-age=86400, stale-while-revalidate=604800 em /images. Cache fresco no navegador por 24 horas, revalidação em segundo plano por até 7 dias. Não usamos immutable nos nomes existentes porque retratos podem ser substituídos no mesmo caminho.

Verificações: TypeScript, build webpack, resposta HTTP 200 image/webp e cabeçalho de cache; comparação exata de pixels/alpha das 237 imagens iniciais; quatro carros adicionais convertidos no mesmo modo lossless. Relatório: webp-conversion-report.json.

Painel Vercel: equipe 85,13 GB / 100 GB no intervalo Sep 13 10:00–Oct 13 10:00 (Last 30 Days); 84,97 GB outgoing, 161,42 MB incoming. Projeto Production em Last 12 hours: 30 GB outgoing. Ranking: ruinas-parede-pixacao-v01.png 309,75 MB, ruinas-arco-quebrado-v01.png 276,36 MB, ruinas-pedras-v01.png 235,84 MB, campinho-arquibancada-v02.png 234,42 MB, milharal-pamonhas-v01.png 227,27 MB. As cinco imagens foram convertidas.

Consumo transferido não pode ser apagado por limpeza de arquivos. A janela dos últimos 30 dias perde dados antigos conforme avança; não há data de zeragem única confirmada pelo painel. Cache CDN ainda conta tráfego ao servir ao visitante; cache no navegador evita transferências repetidas.
