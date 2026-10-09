# Barreiras e semáforos editáveis

Quatro elementos independentes em `components/editable-traffic-props.tsx`, no terreno livre abaixo do canteiro: uma barreira e um semáforo para cada eixo isométrico. IDs: `traffic-barrier-rising`, `traffic-barrier-falling`, `traffic-light-rising`, `traffic-light-falling`. Cada orientação pode ser movida, duplicada, girada e redimensionada. As orientações opostas reutilizam os mesmos assets através de transformação horizontal no SVG, preservando as verticais.

Assets gerados via imagegen integrado, transparência preservada e margens aparadas com Sharp:

- `public/images/modular/barreira-transito-v01.png`
- `public/images/modular/semaforo-v01.png`

Referências explícitas: cinema e árvore originais; semáforo também usa o poste detalhado original.

## Prompts executados

### Barreira

Use case: stylized-concept. Create ONE freestanding road closure barricade for an isometric illustrated town. Long sturdy orange-and-white diagonally striped horizontal board on two dark metal A-frame supports, two small amber reflectors atop ends, heavy feet. The board's long axis runs from LOWER LEFT to UPPER RIGHT in the image, slope minus30 degrees, matching one isometric street axis. Entire object visible. Elevated isometric view, vertical posts remain vertical. Cinema/tree are explicit STYLE ONLY references: polished detailed retro-pop cartoon, defined black contours, layered materials, controlled highlights and shadows, harmonious map colors. Actual transparent background; no ground platform, people, text, signs, watermark or extra barricades. One modular prop only.

### Semáforo

Use case: stylized-concept. ONE freestanding city traffic light on a slender dark blue metal pole and small sturdy metal foot. Classic vertical dark charcoal housing with THREE lenses in correct order: red at top, amber middle, green bottom. Red is lit, amber and green visible unlit. Small sun visors above lenses. Elevated isometric view; front face turned toward LOWER RIGHT, its horizontal edges follow the diagonal from UPPER LEFT to LOWER RIGHT (+30 degrees), vertical pole remains vertical. Whole pole and small foot visible. Cinema, tree and lamp are explicit STYLE ONLY references: detailed polished retro-pop cartoon game, defined black contours, harmonious colors, controlled shading and layered metal details. Actual transparent background, no ground platform, no people, roads, lettering, watermarks or additional lights. One modular street prop only.

Validação: conferência de implantação antes da renderização, inspeção dos assets, conferência visual no localhost com zoom ampliado e TypeScript.
