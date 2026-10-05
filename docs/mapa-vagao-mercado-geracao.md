# Vagão feminINo e Mercado de vagas

> **Perspectiva atualizada em 02/10/2026:** as imagens frontais foram substituídas por versões isométricas. Descrições e prompts antigos abaixo são históricos; seguir a seção de perspectiva do guia e [o registro da atualização](mapa-isometria.md).


> **Regra vigente (02/10/2026):** a paleta original é uma referência flexível; cores naturais harmonizadas são permitidas em vegetação, grama, madeira, chão e demais materiais. Os prompts abaixo são registros históricos do que foi executado: suas exigências de sete cores, ausência de verde/marrom e correção de cores naturais estão revogadas e não devem ser reutilizadas. Para novas gerações, seguir o [guia atualizado](mapa-modular-guia-producao.md). Não é necessário corrigir uma peça só por usar uma cor natural adequada.


Gerados separadamente pela ferramenta integrada image_gen, usando CinemINha como referência visual. Integrados à prévia, sem títulos nas fachadas, pessoas, animais ou estrelas. A identificação permanece na lista lateral e nos nomes acessíveis.

Arquivos finais:
- `public/images/modular/vagao-feminino-principal-v02.png` (1683 × 935): vagão rosa, porta aberta, plataforma e trilhos integrados. A v01 foi preservada; v02 corrige dormentes marrons para cinza.
- `public/images/modular/mercado-vagas-principal-v01.png` (1681 × 936): duas barracas listradas com avisos vazios e emblemas de lupa e maleta integrados.

Ambos são PNG RGBA com transparência verificada. Mantêm pequenas variações tonais do gerador; não são imagens quantizadas exatamente às sete tintas. Retângulos e escala em `lib/map-pilot-assets.ts`, com aproximadamente 360 unidades de largura útil. Conferidos no navegador sem sobrepor outros destinos. TypeScript passou.

## Prompts utilizados

### Vagão
```text
Use case: illustration-story. Create ONE transparent map asset: a pink railway carriage repurposed as a community venue, rounded blue windows, one visibly OPEN doorway with dark empty interior, playful curved roof, yellow/coral accents. Include short rails and a minimal narrow boarding platform with two steps as integrated supporting details. NO locomotive. Reference image is STYLE ONLY: match bold black outlines and retro-pop 1970s editorial simplicity, not its cinema subject. Shallow oblique mostly frontal side view, verticals parallel, slight depth receding up-right 25 degrees. Full elongated silhouette width:height about 1.8:1, intended map footprint 360 by 200 units. Only #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9, flat opaque colors, no gradients or realistic shading. Short hard black shadow lower-right. Genuinely transparent background, full object including rails, platform and shadow, generous 12% margin on ALL edges. No text, lettering, numbers, logos, people, animals, faces, stars, ground tile or surrounding scenery. Empty plain panel may remain but do not add a title.
```

### Correção do vagão
```text
Edit this wagon asset only: recolor ALL brown railway sleepers to solid gray #D9D9D9 with near-black #1C1C1C outlines. Preserve the wagon design, open door, all other colors and shapes. Increase transparent margins so entire object and shadow have at least 10% clear space around every edge, especially the right edge. Keep genuinely transparent background. No text or new objects. No brown anywhere.
```

### Mercado
```text
Use case: illustration-story. Generate ONE isolated transparent modular-map asset: a small JOB OPPORTUNITIES MARKET composed of two adjoining open stalls forming one cohesive destination, striped coral/cream and yellow/pink awnings, blue and coral counters, one bold magnifying-glass emblem and one briefcase emblem, small noticeboard with blank cream cards attached to stall. No food or merchandise. Reference cinema is STYLE ONLY: match bold near-black outlines, playful simplified retro-pop 1970s architecture. Shallow oblique predominantly frontal view, parallel verticals and depth receding up-right 25 degrees. Intended elongated silhouette 360 wide by 200 tall map units. Strict palette #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9; use no brown, green or additional colors. Flat solid inks, no gradients, glossy 3D or texture. Short opaque black shadow lower-right. Entire stalls, poles and shadows visible, centered with 12% TRANSPARENT margin every side. Actual transparent background. No text, letters, numerals, titles, logos, people, animals, faces, stars, street, ground tile, or unrelated scenery. Cards must be blank with no scribbles. Integrated noticeboard and symbols are architectural ornaments.
```

