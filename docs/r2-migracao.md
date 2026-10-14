# Migração de imagens para R2

Preparação local: componentes usam assetUrl para imagens; NEXT_PUBLIC_ASSET_ORIGIN vazio mantém arquivos locais. Configurar origem HTTPS do domínio do bucket quando upload/cache/CORS estiverem verificados. Não usar rewrite na Vercel: navegador acessa Cloudflare diretamente. Não expor credenciais em NEXT_PUBLIC.

Exportação: node scripts/prepare-r2-assets.mjs. Exporta imagens não arquivadas para /tmp/amiguins-r2-assets; prévia HD excluída. Originais e projeto permanecem no Git; nenhum arquivo remoto deve ser removido nesta etapa.

## Estado em 14/10/2026

- R2 ativado pelo usuário; bucket `amiguins-images`, classe Standard.
- 712 arquivos, 237.434.657 bytes, enviados mantendo chaves `images/...`. Três falhas do último lote foram reenviadas com sucesso.
- CORS: GET/HEAD para `https://mapa.amiguins.com`, `https://amiguins.vercel.app` e `http://localhost:3000`.
- Oito registros DNS da Hostinger conferidos e preservados na Cloudflare. Site principal e `www` continuam no Framer; `mapa` continua na Vercel; MX, SPF, DMARC e verificação Google preservados. Esses destinos estão em DNS only.
- Nameservers alterados na Hostinger para `dee.ns.cloudflare.com` e `owen.ns.cloudflare.com`; consulta pública já confirmou a mudança. Não havia DS/DNSSEC ativo.
- TypeScript passou; build com Webpack passou. Turbopack encontrou restrição local ao abrir uma porta durante processamento de CSS.

- `assets.amiguins.com` conectado ao bucket, TLS mínimo 1.2, acesso público habilitado; `r2.dev` permanece desabilitado.
- Regra `amiguins-images-cache`: elegível para cache em `https://assets.amiguins.com/images/*`, Edge TTL e Browser TTL de 86400 segundos. HTTP confirmou MISS seguido de HIT e CORS correto.
- Todos os 712 arquivos passaram na comparação de status HTTP 200 e Content-Length com os originais locais. Teste local confirmou carregamento via R2 e navegação do menu até personagem encontrado, sem erros de console.
- Vercel: configuração pública `NEXT_PUBLIC_ASSET_ORIGIN=https://assets.amiguins.com` cadastrada para Production. Requer publicação deste código para entrar em vigor. Nenhuma credencial foi criada ou gravada no projeto.

## Publicação e manutenção

Somente definir `NEXT_PUBLIC_ASSET_ORIGIN=https://assets.amiguins.com` e fazer novo build depois de validar upload, HTTPS, CORS e cache. A variável é incorporada ao JavaScript durante o build. Não usar proxy/rewrite pela Vercel, pois manteria o consumo de transferência nela.

Novas ilustrações precisam ser enviadas ao bucket antes da publicação do código que as usa. Preferir nomes com versão; quando sobrescrever um arquivo existente, atualizar ou invalidar seu cache. Para voltar à origem local, remover a variável e publicar novo build. Os arquivos locais continuam preservados.

Alertas de orçamento avisam sobre gastos, não bloqueiam o consumo. Monitoramento antes do fim da franquia gratuita ainda não foi configurado.
