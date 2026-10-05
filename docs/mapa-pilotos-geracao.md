# Peças piloto — CinemINha e LivrINhoteca

> **Perspectiva atualizada em 02/10/2026:** as imagens frontais foram substituídas por versões isométricas. Descrições e prompts antigos abaixo são históricos; seguir a seção de perspectiva do guia e [o registro da atualização](mapa-isometria.md).


> **Regra vigente (02/10/2026):** a paleta original é uma referência flexível; cores naturais harmonizadas são permitidas em vegetação, grama, madeira, chão e demais materiais. Os prompts abaixo são registros históricos do que foi executado: suas exigências de sete cores, ausência de verde/marrom e correção de cores naturais estão revogadas e não devem ser reutilizadas. Para novas gerações, seguir o [guia atualizado](mapa-modular-guia-producao.md). Não é necessário corrigir uma peça só por usar uma cor natural adequada.


Produzidas com a skill imagegen e a ferramenta integrada `image_gen`, em cinco chamadas separadas. Os arquivos PNG originais, com transparência, estão em `public/images/modular/`. Não houve edição raster por script.

## Entregas e integração

| Peça | Arquivo | Dimensões |
| --- | --- | --- |
| CinemINha com pipoca no telhado | cineminha-principal-v01.png | 1416 × 1111 |
| LivrINhoteca em forma de livro aberto | livrinhoteca-principal-v01.png | 1448 × 1086 |
| Expositor de cartaz abstrato | cineminha-cartaz-v01.png | 1100 × 1430 |
| Banco de leitura | livrinhoteca-banco-v01.png | 1578 × 997 |
| Pilha de livros | livrinhoteca-livros-v01.png | 1387 × 1134 |

Todos os arquivos foram verificados como RGBA com alfa de 0 a 255 e silhuetas visíveis completas. A margem gerada varia entre peças; os retângulos SVG mantêm os arquivos completos, sem recorte. Não há textos, pessoas ou animais nas imagens. A pipoca faz parte da arquitetura do cinema; cartaz, banco e livros permanecem independentes. Não foram reintroduzidas estrelas decorativas.

`lib/map-pilot-assets.ts` registra arquivos, retângulos de exibição e posições dos letreiros. Os nomes são textos SVG sobre as placas vazias. Os pontos de apoio e as larguras úteis das construções seguem a prévia; os acessórios ocupam os espaços laterais. Os outros 18 destinos e o modo Mapa atual são preservados.

## Avaliação dos pilotos

As peças compartilham contornos escuros e linguagem frontal oblíqua. A geração introduziu pequenas variações tonais e sombreamento, portanto estes pilotos não constituem uma entrega de paleta rigorosamente quantizada às sete tintas. Revisar a harmonia cromática do conjunto e a orientação da profundidade nas próximas peças; correspondência exata às sete tintas não é mais um critério de aprovação. O estilo e a escala podem ser avaliados agora no conjunto da prévia, com zoom.

## Prompts finais utilizados

### cinema

```text
Use case: illustration-story. Create ONE isolated transparent PNG game-map asset: a sculptural small CINEMA building, NO TEXT whatsoever. 1970s retro-pop editorial flat screenprint graphic style. Coral facade, yellow broad completely blank marquee for lettering added later by code, blue double entrance doors, pink curved architectural accent, oversized stylized popcorn bucket motif integrated on roof. Simple confident silhouette, not realistic or cute 3D. Shallow oblique perspective, mostly frontal facade, verticals parallel, depth recedes up-right at 25 degrees, roof depth about 20% of facade width. Bold uniform near-black outlines about 1.7% of object width, inner lines 1%. Only exact flat colors #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9. Opaque flat faces, no gradients or texture. Light upper left, short crisp opaque black offset shadow down-right. Full object and shadow centered, genuinely transparent background, 12% safety margin on every edge. Building useful silhouette about 280 wide by 220 tall map units. No ground tile, street, people, animals, faces, letters, numerals, logos, stars or floating decorations. Posters will be a separate asset, do not include standalone props. Generate high resolution.
```

### library

```text
Use case: illustration-story. Generate ONE NEW standalone map asset. The previous cinema image is a STYLE REFERENCE ONLY for outline weight and palette. Subject: a small bookshop whose building is shaped like a GIANT OPEN BOOK, cream open pages forming two broad facade wings, yellow book covers, coral and blue details, small central blue entrance, and a wide EMPTY cream sign panel above entrance. Clearly a building, not just a book. Match retro-pop 1970s graphic editorial language but STRICTLY FLAT solid inks with NO modeled shading, NO gradients, NO glossy surfaces. Mostly frontal facade, parallel verticals, shallow depth recedes UP-RIGHT at 25 degrees, rooftop depth 20% of width. Black outlines proportional to reference. Palette ONLY #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9. Short solid near-black offset shadow to lower right, light convention upper left. Full building centered with 12% transparent safe margins, transparent background, useful silhouette 280 wide by 210 high map units. NO text, letters, numbers, people, animals, faces, stars, surrounding scenery or ground platform. Do not include bench or loose books; those are separate assets. No cinema or popcorn.
```

### poster

```text
Use case: illustration-story. Generate ONE isolated cinema ornament asset: a freestanding squat A-frame movie poster display with a coral and yellow frame, a cream poster containing only a bold abstract blue circle and pink wavy ribbon, no lettering. Previous two images are STYLE REFERENCES ONLY; match their bold black outlines, simplified 1970s retro-pop graphic construction and shallow frontal oblique perspective receding up-right 25 degrees. This is a small map prop, not a building. Solid flat inks ONLY #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9. No gradients, texture, stars, people, animals, faces, letters or numerals. Short solid black shadow lower-right; full object including feet and shadow within 12% transparent margins. True transparent background, no ground tile, no surroundings. Intended map footprint roughly 65 wide x 85 tall.
```

### bench

```text
Use case: illustration-story. ONE isolated small reading BENCH ornament for bookshop in a modular map. Previous three images are visual style references only. Empty simple bench with yellow rounded slatted back and seat, coral supports and near-black feet. Same bold black outline retro-pop 1970s editorial style. Mostly frontal, shallow oblique view with seat depth receding UP-RIGHT about 25 degrees. Simple two or three slats, clear silhouette. Flat solid inks from #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9 only. NO gradients, modeled shading, texture, text, letters, people, animals, faces, stars, books or scenery. Complete bench and short solid black lower-right shadow, transparent background, centered with 12% safe margins. Intended map size 95 wide by 60 high units. Match building line weight after scaling, avoid excessive fine detail.
```

### books

```text
Use case: illustration-story. ONE isolated small ornament: a neat stack of three closed BOOKS for a bookshop map location, blue coral and pink covers with cream page blocks, top yellow bookmark. Previous four images are STYLE REFERENCES ONLY. Bold near-black outlines and simple retro-pop 1970s graphic forms, same shallow oblique frontal view with depth receding UP-RIGHT 25 degrees. Only flat solid inks #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C #D9D9D9. Clean uniform fills, NO gradients, texture, modeled shading, writing, letters, numerals, people, animals, faces, stars, buildings, bench or scenery. Entire stack and small opaque black lower-right shadow centered with 12% transparent safety margins. Genuine transparent background. Intended footprint 55 wide by 45 high map units, simple strong silhouette readable when small.
```

