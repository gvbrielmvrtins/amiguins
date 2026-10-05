<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

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
