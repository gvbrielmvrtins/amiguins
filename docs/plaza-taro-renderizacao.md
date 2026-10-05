# Plaza Hispánica e espaço de tarô — renderização

Ferramenta: imagegen integrada, com fundo transparente. Referências explícitas: cinema original e árvore original, usados como estilo e acabamento.

Arquivos finais em `public/images/modular/`:
- `plaza-arcada-v01.png`: substitui a galeria provisória; fonte, árvores, mesas e postes reutilizados.
- `plaza-letreiro-rbd-v01.png`: letreiro com o texto solicitado, "show do rbd 28/10".
- `torre-taro-render-v01.png`: substitui a cobertura, mesa e assentos provisórios ao lado da torre; preserva o terreno e a circulação.

Cada peça foi integrada e conferida no navegador antes da seguinte. TypeScript: `tsc --noEmit` passou.

## Prompts executados

### Arcada
Use case: stylized-concept. Create one transparent modular isometric game building: a long low Hispanic plaza arcade pavilion with FOUR open rounded arches on its long facade, warm cream stucco, blue shaded arch interiors, ornate yellow and blue trim, red terracotta pitched tile roof and small colorful festive bunting. Front long facade extends down-right at +30 degrees, short right wall extends up-right at -30 degrees, true elevated isometry, upright verticals. Match the provided original cinema (architecture reference) and tree (finish/reference) retro-pop illustration precisely: dark fine contours, layered cornices, controlled highlights/shadows, richly finished readable detail. Whole building isolated, no ground plane, no people, no lettering, no fountain or trees. Wide building, minimal transparent margin. These images are style references only, not objects to reproduce.

### Letreiro
Use case: stylized-concept. One isolated freestanding event notice sign for a Hispanic plaza in an isometric game. Provided cinema and tree are explicit STYLE references only: retro-pop hand-drawn dark contours, detailed layered trim, blue/coral/yellow/cream colors and controlled shadows. A broad cream rectangular sign face with elegant blue frame, yellow cornice, two short ornate blue supporting legs. Readable exact lettering in dark blue, three lines: "show do rbd" and "28/10". Preserve lowercase phrase exactly. Front face almost facing viewer, slight isometric slope down-right, vertical supports upright. Whole sign and feet, transparent background, no people, no ground, no additional text or logos. High detail consistent with original map.

### Tarô
Use case: stylized-concept. Render one isolated small open tarot-reading gazebo as a transparent modular isometric game prop. Cinema image is explicit architectural STYLE reference and original tree image is material/finish reference; match dark detailed contours and controlled highlights, retro-pop illustration. Elevated true isometry ground axes ±30°, vertical posts upright. Small rectangular open pavilion with four slim golden wooden posts, purple pyramidal fabric canopy with gold piping, little hanging moon/star ornaments. Under the high open canopy a small wooden table draped in deep purple cloth, THREE distinct cream tarot cards laid out with simple sun/moon motifs, and TWO wooden chairs with purple cushions on opposite sides. Keep tabletop visible, no curtains enclosing sides. Whole canopy, chairs and feet fully visible. No people, no lettering, no ground tile/pad, no other buildings, transparent background. Detailed finish consistent with existing map. Compact silhouette occupying a footprint about 125x160 ground units, canopy tall enough to see table and chairs.

