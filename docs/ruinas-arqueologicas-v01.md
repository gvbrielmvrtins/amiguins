# Ruínas arqueológicas

Implantação no terreno oeste inferior marcado pelo usuário, com volumes provisórios conferidos antes da renderização. Integração em `components/archaeological-ruins.tsx`, com parede, arco e duas pilhas de pedras editáveis separadamente. A segunda pilha reutiliza a ilustração de pedras.

Assets em `public/images/modular/`, gerados via imagegen integrado, transparência preservada e margens aparadas com Sharp:

- `ruinas-parede-pixacao-v01.png`
- `ruinas-arco-quebrado-v01.png`
- `ruinas-pedras-v01.png`

Referências de estilo explícitas: cinema e árvore originais. A parede usa a figurinha fornecida (`Captura de Tela 2026-10-09 às 14.16.14.png`) como referência de conteúdo. Texto completo e emblema azul/vermelho reproduzidos como pintura desgastada diretamente na alvenaria.

## Prompts executados

### Parede

Create one isolated standing ruined wall of an ancient archaeological civilization for an isometric cartoon town. A broad pale sandstone masonry wall, jagged broken top, thick chipped blocks, cracks, sparse moss, a few fallen stones at its foot. The large visible FRONT wall runs from lower-left toward upper-right along minus30-degree ground axis, verticals remain vertical. On the surviving pale plaster face, reproduce reference image1 VERY FAITHFULLY as recognizable hand-sprayed graffiti directly on the old masonry. Exact black uppercase text at left in these lines: 'A MAIOR' / 'FACÇÃO' / 'CRIMINOSA' / 'DO MUNDO,' / 'DE TODOS' / 'OS TEMPOS.'. At right the same large rounded arch-shaped mascot/logo split vertically BLUE LEFT and CORAL RED RIGHT, its small white face at the upper middle, over the recognizable angular grey silver starburst forms with faded pale pink painted backing. Preserve the reference's arrangement, text and distinctive blue/red silhouette so viewers recognize that sticker. But this is PAINT directly on wall, NOT a pasted sticker: no rectangular sticker border, subtle overspray, weathering and cracks visible through paint, a few paint drips, irregular faded edges, keep text and mascot legible. Cinema and tree are explicit STYLE references only: detailed polished retro-pop illustrated map, worked dark outlines and controlled shadows, natural stone colors. Entire wall uncropped, actual transparent background, no ground platform, people, other structures or scenery. Not photorealistic.

### Arco

Create ONE isolated ruined ancient sandstone doorway arch, only partially surviving after collapse. Two short chunky stone uprights, broken incomplete arch above with missing keystone and jagged ends, small surviving segment of side wall, a few fallen carved masonry blocks around its foot, faint ancient geometric carvings, sparse moss between cracks. No graffiti or writing on this piece. Elevated isometric game view matching referenced standing ruin wall, same pale warm sandstone and detailed retro-pop map style, defined dark worked outlines, controlled shading, vertical masonry remains vertical. Cinema and tree are explicit STYLE references; reference1 establishes matching archaeological stone material. Entire fragment uncropped, actual transparent background, no ground tile or platform, no people, no trees, no complete building or additional ruins.

### Pedras

ONE small isolated pile of archaeological rubble: scattered chipped pale warm sandstone masonry blocks, one toppled short broken carved column drum, a few angular fragments and tiny stones, sparse moss, irregular low silhouette. Same ancient stone material as reference1 broken arch. Cinema and tree explicit STYLE references for detailed polished retro-pop cartoon map, worked dark outlines and controlled shadows. Elevated isometric ground axes ±30°, entire pile uncropped. Actual transparent background, no ground platform, no writing, no people, no standing walls or arch. Compact modular prop, natural asymmetrical scattering, not photorealistic.

Validação: TypeScript, inspeção de cada asset e conferência ampliada no localhost.
