# Canteiro: sempre em construção

Terreno superior oeste com textura do milharal. Posições importadas de `amiguins-posicoes (6).json`. Implantação conferida primeiro com volumes simples, substituídos pelas ilustrações individuais. Integração: `components/construction-site.tsx`. Cinco elementos editáveis independentes: trator, trabalhador com pá, trabalhador com carrinho, materiais e placa. A placa usa texto SVG para manter a leitura correta.

## Assets e geração

Ferramenta integrada imagegen, fundo transparente preservado; margens transparentes aparadas com Sharp. Referências de estilo para todas as peças: `cineminha-isometrico-v01.png` e `rosa-arvore-isometrica-v01.png`. Trabalhadores também usam explicitamente `nathan-machado-v01.png` e `gabriel-martins-v02.png`.

Arquivos em `public/images/modular/`:

- `obra-trator-v01.png`
- `obra-trabalhador-pa-v01.png`
- `obra-trabalhador-carrinho-v01.png`
- `obra-materiais-v01.png`

## Prompts executados

### Trator

Use case: stylized-concept. Create ONE isolated yellow construction tractor, a small wheeled front loader with large black tires, yellow articulated bucket lowered toward bottom-right, blue glazed enclosed cab, detailed hydraulic arms and engine vents. Elevated isometric view, ground axes ±30°, verticals vertical, whole machine visible. Cinema and tree references are STYLE ONLY: same polished retro-pop game illustration, defined black outlines, controlled warm shadows, rich layered detail, saturated harmonious colors. No people, no ground platform, no text, no other objects. Actual transparent background. Modular asset for a construction site in the illustrated town.

### Trabalhador com pá

Use case: stylized-concept. One adult male construction worker digging with a shovel, bent slightly forward pressing the shovel blade into a tiny loose dirt mound. Yellow hard hat, orange reflective vest, blue work trousers, brown boots. Entire body and shovel visible, elevated three-quarter isometric game view facing down-right. Nathan and Gabriel are explicit CHARACTER STYLE references: defined black outlines, cartoon proportions, expressive eyes, controlled shading; create a different face, short beard. Cinema and tree establish retro-pop map finish. Actual transparent background, no ground platform, no text, no other people or machine. Single modular construction worker asset.

### Trabalhador com carrinho

Use case: stylized-concept. One adult male construction worker pushing a single green metal wheelbarrow loaded with rubble and red bricks, moving toward bottom-right. White hard hat, orange reflective vest, blue work trousers, brown boots. Dark brown skin, clean-shaven, expressive friendly face, two hands on handles, natural working pose. Entire body and wheelbarrow visible, elevated three-quarter isometric game view. Nathan and Gabriel explicit CHARACTER STYLE references: bold defined black outlines, cartoon proportions, expressive eyes, controlled shading; do not copy either face. Cinema and tree establish detailed retro-pop map finish. Actual transparent background, no ground platform, no text, no extra people or scenery. Single modular worker plus wheelbarrow asset.

### Materiais

Use case: stylized-concept. One compact modular construction materials pile: low neat stack of red hollow clay bricks on a wooden pallet, three beige cement sacks, short stack of wooden planks, small gravel heap and two orange-white traffic cones. No people. Elevated isometric view ground axes ±30°, whole pile visible. Cinema and tree STYLE references only: polished detailed retro-pop cartoon game, defined dark outlines, warm controlled shadows, vibrant harmonious map colors, layered materials. Actual transparent background, NO ground square or raised platform, no background scenery, no lettering, no watermark. Separate game prop for small active construction site.

Validação: TypeScript e conferência visual no localhost com zoom ampliado. Textura, asfalto e demais posições preservados.
