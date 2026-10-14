# Cloudflare Pages

## Pacote estático

`npm run build:pages` exporta o jogo para `out/`, com a origem R2 em `NEXT_PUBLIC_ASSET_ORIGIN` (padrão: `https://assets.amiguins.com`). O pacote inicial tem 173 arquivos e 3,8 MB. Não inclui ilustrações nem funções de servidor. Os originais e as ferramentas locais continuam no projeto.

Na produção, a página principal não consulta parâmetros da requisição: o modo experimental `?map=optimized` continua disponível somente no desenvolvimento. As páginas de prévia HD e snapshot continuam retornando 404 fora do desenvolvimento. O Analytics da Vercel só é incluído quando `VERCEL=1`.

Headers do Pages em `out/_headers`: HTML principal revalidado a cada acesso; arquivos versionados de `/_next/static/` com cache imutável de um ano. As imagens têm cache e CORS no R2.

## Configuração da hospedagem

- Plano Pages gratuito, sem Pages Functions.
- Build: `npm run build:pages`.
- Diretório de publicação: `out`.
- Node: `24.21.0`; pnpm: `12.3.4`, conforme o projeto.
- Produção: `main`.
- Domínio: `mapa.amiguins.com`, após verificar a prévia `pages.dev`.

O domínio permanece igual para preservar o progresso salvo no navegador (`amiguins-found-v1`). O editor local usa `amiguins-map-layout-v1` e continua disponível com `npm run dev`.

## Repositórios sincronizados

A instalação Git da Cloudflare usa o fork `zeheliasm-gif/amiguins`. Nesta máquina, `origin` mantém o endereço de leitura `gvbrielmvrtins/amiguins` e dois endereços de push: o original e o fork. `git push origin main` envia para ambos, sem force push. Confira as duas respostas de sucesso; se um envio falhar, repita o push após corrigir o acesso.

Essa configuração é local ao checkout. Em outra máquina, configure os dois destinos com `git remote set-url --add --push origin <URL>` para cada repositório. O fork foi atualizado por avanço direto, sem descartar commits.

Prévia manual de recuperação: https://amiguins-preview.pages.dev. Ela não recebe pushes automaticamente; a integração Git é configurada em um projeto separado.

## Novas imagens

Enviar a ilustração ao R2 e confirmar HTTP 200 antes do push. Usar `assetUrl()` nos componentes. Não criar proxy de imagens pela hospedagem. A cobrança e o alerta de gastos do R2 são independentes do Pages; o alerta está configurado para US$ 1 e não bloqueia o consumo.

## Recuperação

Antes de trocar o domínio, confirmar o deploy no Pages. O destino anterior é o CNAME `fc3eae11d46a7b08.vercel-dns-017.com`; a Vercel mantém o projeto e o histórico durante a migração. Restaurar esse destino só é útil se a Vercel estiver disponível (a conta recebeu aviso de suspensão por transferência acumulada).
