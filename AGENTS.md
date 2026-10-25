<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Composição e renderização de novas partes do mapa

Diretriz do usuário em 03/10/2026: seguir [a estratégia de composição](docs/mapa-estrategia-composicao.md) ao construir ou renderizar outros ambientes do mapa.

- Primeiro consultar os elementos existentes: reutilizar as ilustrações prontas quando se repetirem, sem recriar versões de baixa fidelidade nem gerar novamente.
- Para prédios e elementos principais inéditos: montar a composição em baixa fidelidade, acertando implantação, escala, isometria, circulação e espaço para personagens futuros.
- Depois renderizar cada elemento novo individualmente via imagegen, sempre usando os primeiros elementos do mapa como referências visuais explícitas. Manter a mesma identidade e nível de acabamento das construções e da árvore de referência.
- Integrar e conferir cada substituição no mapa antes de avançar; preservar os recuos e as áreas livres definidos na composição. Não tratar o modelo simplificado como acabamento final.
- A sequência de trabalho não exige aprovação intermediária adicional; respeitar o escopo e as instruções do pedido atual.
- Basear sempre as novas composições nas referências visuais do cenário já construído: escala, paleta, isometria e relação entre edificações e áreas livres. As demarcações de terrenos são guias flexíveis; preenchimentos podem incluir residências, comércios e parques sem criar destinos específicos da vila.

## Publicação do mapa

- As ilustrações de produção são carregadas diretamente de `https://assets.amiguins.com` (Cloudflare R2), por `lib/asset-url.ts`. Novas imagens e revisões precisam ser enviadas ao bucket `amiguins-images` antes de publicar código que as referencia. Preferir nomes com versão; invalidar cache se sobrescrever um arquivo existente.
- A versão para Cloudflare Pages é gerada com `npm run build:pages`: site estático em `out/`, sem funções de servidor. A pasta `out/images` é removida apenas do pacote gerado; os originais em `public/images` ficam preservados. Nunca enviar fotos de referência ou credenciais na publicação.
- `npm run dev` mantém o editor e as prévias locais. Preservar o domínio `mapa.amiguins.com` e as chaves existentes do localStorage para manter o progresso dos jogadores.

## Estilo dos personagens

Diretriz do usuário em 13/10/2026: usar também o novo Lula (`public/images/modular/lula-npc-v02.png`) como referência ideal de estilo nas próximas gerações e revisões, junto de Nathan e Gabriel. Priorizar suas formas cartoon simples, contornos pretos fortes, olhos expressivos e sombreamento controlado; preservar a identidade própria de cada pessoa.

Diretriz do usuário em 10/10/2026: novos personagens devem olhar diretamente para o usuário, com olhos voltados para a frente, evitando o olhar habitual para o alto à direita. Exceções apenas quando a ação ou orientação solicitada exigir outro olhar (por exemplo, fila voltada ao atendimento).

Diretriz do usuário em 09/10/2026: Nathan e Gabriel são as referências principais de estilo para personagens (`public/images/characters/nathan-machado-v01.png` e `gabriel-martins-v02.png`). Usá-los explicitamente nas gerações: contornos pretos definidos, proporções cartoon, olhos expressivos e sombreamento controlado. Usar a foto de cada pessoa como referência de identidade facial; não reutilizar o rosto de outro personagem. Preservar identidades ilustradas preexistentes quando solicitado pelo usuário.

Diretriz do usuário em 25/10/2026: Lula (`public/images/modular/lula-npc-v02.png`) é o modelo definitivo de estilo para personagens, não apenas inspiração. Nas revisões e novas gerações, priorizar suas proporções cartoon, olhos ovais simples, contornos pretos fortes e sombras em blocos; evitar modelagem facial realista, fios de cabelo detalhados e texturas excessivas. Preservar a identidade de cada pessoa.

Diretriz do usuário em 25/10/2026: gerar diretamente no estilo definitivo do Lula desde a PRIMEIRA geração. Incluir a ilustração do Lula como referência visual explícita e especificar suas formas simples, olhos ovais, contornos fortes e sombras em blocos antes de gerar. Não usar como fluxo padrão gerar uma versão detalhada para depois simplificá-la: isso desperdiça tempo e franquia. Revisões de estilo devem ser exceções, não uma etapa planejada.
