# Reconstrução individual dos ornamentos — 03/10/2026

Os modelos simples em SVG de poste, carrinho de pipoca e floreira foram substituídos por três PNGs RGBA produzidos separadamente com a ferramenta integrada image_gen (skill imagegen). Referências de estilo: cinema e árvore existentes. A árvore foi preservada.

## Análise e integração

As peças anteriores tinham poucas faces e detalhes, contrastando com os contornos, molduras e sombras ilustradas dos prédios. O poste recebeu pedestal com painéis, parafusos, anéis, articulação e luminária modelada. O carrinho recebeu rodas com raios, puxador, toldo listrado, vitrine, panela e pipocas individuais. A floreira recebeu borda e rodapé moldados, terra, folhagem em camadas e flores com pétalas. As imagens são aplicadas sem deformação, com âncoras de contato próprias e sem duplicar sombras. O carrinho foi levemente afastado da lateral do cinema para melhorar a leitura. Demais posições, árvore, calçadas e áreas livres preservadas.

Arquivos em `public/images/modular/`:
- `poste-detalhado-v01.png`
- `pipoca-detalhada-v01.png`
- `floreira-detalhada-v01.png`

Integração em `components/pilot-landscape-prop.tsx`.

## Prompts executados

### lamp

```text
Use case: illustration-story. Create ONE isolated game-map prop on genuine transparent background, matching the supplied cinema and tree STYLE REFERENCES. These are references only, do not include buildings or trees in the output. Match their polished hand-inked retro-pop illustration: confident dark outlines, rounded dimensional edges, crisp layered color shapes, restrained material highlights and shadow facets, rich readable construction details. Not a minimalist SVG icon, not photorealistic, not glossy 3D. Elevated orthographic isometric view, ground axes +30/-30 degrees, verticals vertical, visible top and two sides. Light upper left, very short hard contact shadow lower right, no glow or backdrop. Palette blue #3774FA coral #F77B5D yellow #FAD846 pink #F889BA warm cream and near-black, natural material tones allowed. Complete object with 12% transparent margins. No text, letters, logos, people, faces or stars. Subject: a slender retro neighborhood STREET LAMP. Cobalt blue cast-metal upright column with thick outlined beveled stepped pedestal, visible mounting bolts, collar rings and narrow cream highlight; gracefully curved swan-neck arm extending right, substantial coral dome shade with a yellow rim, cream inset bulb/lens visible underneath. Add tasteful articulated joints and panel seams, avoid ornate Victorian scrolls. A small practical street furnishing subordinate to the buildings. Tall portrait silhouette, one lamp only, generous transparent space.
```

### popcorn

```text
Use case: illustration-story. Create ONE isolated game-map prop on genuine transparent background, matching the supplied cinema and tree STYLE REFERENCES. These are references only, do not include buildings or trees in the output. Match their polished hand-inked retro-pop illustration: confident dark outlines, rounded dimensional edges, crisp layered color shapes, restrained material highlights and shadow facets, rich readable construction details. Not a minimalist SVG icon, not photorealistic, not glossy 3D. Elevated orthographic isometric view, ground axes +30/-30 degrees, verticals vertical, visible top and two sides. Light upper left, very short hard contact shadow lower right, no glow or backdrop. Palette blue #3774FA coral #F77B5D yellow #FAD846 pink #F889BA warm cream and near-black, natural material tones allowed. Complete object with 12% transparent margins. No text, letters, logos, people, faces or stars. Subject: ONE charming compact vintage POPCORN CART matching the cinema architecture, coral rounded cabinet with inset cream trim and narrow blue side panels, two substantial blue spoked wheels with cream hubs, a small supporting foot and curved push handle, glass upper showcase filled with individually drawn warm cream popcorn kernels, thin dark frame and subtle pale-blue glass reflections, a small metal kettle inside, striped coral-and-cream shallow canopy with yellow cornice and small scalloped trim. Broad visible top and front face running uphill to the right at 30 degrees; side recedes uphill left. Layered construction, rivets, wheel axles and cabinet panel seams clearly drawn but readable at map scale. No lettering or signage. ONE entire wheeled cart only, no floor tile. Keep canvas exterior strictly alpha zero with NO aura, NO blur, NO atmospheric halo.
```

### planter

```text
Use case: illustration-story. Create ONE isolated game-map prop on genuine transparent background, matching the supplied cinema and tree STYLE REFERENCES. These are references only, do not include buildings or trees in the output. Match their polished hand-inked retro-pop illustration: confident dark outlines, rounded dimensional edges, crisp layered color shapes, restrained material highlights and shadow facets, rich readable construction details. Not a minimalist SVG icon, not photorealistic, not glossy 3D. Elevated orthographic isometric view, ground axes +30/-30 degrees, verticals vertical, visible top and two sides. Light upper left, very short hard contact shadow lower right, no glow or backdrop. Palette blue #3774FA coral #F77B5D yellow #FAD846 pink #F889BA warm cream and near-black, natural material tones allowed. Complete object with 12% transparent margins. No text, letters, logos, people, faces or stars. Subject: ONE compact rectangular raised FLOWER PLANTER for this village. Thick coral masonry container with softened beveled corners, cream inset rim, visible dark soil, subtle base plinth and hand-inked seam details. Lush but low layered green foliage, varied broad leaves and slender stems, a few yellow daisies and pink flowers with individually drawn petals and warm centers. Botanical shapes, highlights and deep-green shadow facets MUST match the plant foliage around the base of the tree reference. Keep foliage below the height of the container plus one container height. Wide horizontal silhouette, long box edges run down-right at +30 degrees, short sides up-right -30 degrees, broad soil surface seen from above. No tree, no bench, no pavement. Crisp silhouette, exterior strictly alpha zero, NO colored halo or glow or blur.
```

