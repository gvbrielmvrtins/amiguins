# Atualização isométrica — 02/10/2026

## Direção e entrega

As quatro construções e os três acessórios foram redesenhados pela ferramenta integrada `image_gen`, com a skill imagegen. Cada chamada usou a peça anterior como alvo e `public/images/amiguins-town.png` como referência de câmera. As versões anteriores permanecem preservadas.

A nova vista mostra telhados e duas faces, com câmera elevada e orientação isométrica comum. São ilustrações raster interpretadas pela IA, não projeções CAD exatas. Continuam sem textos nas fachadas, personagens, animais ou estrelas; a paleta admite cores naturais harmonizadas.

## Arquivos finais

Todos em `public/images/modular/`:

- `cineminha-isometrico-v01.png`
- `livrinhoteca-isometrico-v01.png`
- `vagao-feminino-isometrico-v01.png`
- `mercado-vagas-isometrico-v01.png`
- `cineminha-cartaz-isometrico-v01.png`
- `livrinhoteca-banco-isometrico-v01.png`
- `livrinhoteca-livros-isometrico-v01.png`

PNG RGBA, com canal alfa verificado. O vagão teve uma segunda passagem de remoção de fundo; amostras da região de halo externo têm alfa zero e não devem aparecer na composição do navegador. Não houve edição raster por script.

## Integração inicial (histórico)

**Atualização posterior:** a [base isométrica global](mapa-base-isometrica.md) substitui esta montagem inicial. As bases brancas e placas externas foram removidas a pedido do usuário; os 16 blocos também usam isometria.

- Atualizados arquivos e proporções dos acessórios e pontos de apoio das construções em `lib/map-pilot-assets.ts`.
- As bases do módulo rosa agora têm formato losangular, com profundidade próxima a 57,7% da largura.
- LivrINhoteca desceu 40 unidades para acomodar o novo telhado sem sair do terreno; placas externas foram reposicionadas. Não há texto sobre as fachadas.
- Praças vetoriais foram achatadas para a projeção do chão; o quadriculado usa os dois eixos isométricos.
- Caminhos orgânicos, 20 destinos, interface e ilha sem ponte preservados. Os 16 blocos provisórios continuam como marcadores de composição, até receberem suas próprias peças isométricas.

Validação: TypeScript e build de produção passaram. A conferência visual final da página ficou indisponível porque o navegador integrado retornou timeout em duas tentativas de acesso; conferir o conjunto no localhost. Os arquivos gerados foram inspecionados visualmente antes da integração.

## Prompts executados

### cinema

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. Keep cinema coral body, yellow blank marquee, blue entrance doors and rooftop popcorn. Show a broad visible roof behind the popcorn; short sidewall, not a tall tower.
```

### library

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. Keep bookshop giant open-book roof motif, yellow book covers, cream pages, blue doors. Roof formed by the open book must be visible FROM ABOVE. Compact building with readable open-book silhouette.
```

### wagon

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. Keep pink community railway wagon, rounded blue windows, open door, short rails and platform. Orient long carriage diagonal from lower-left to upper-right, broad curved roof clearly visible from above, end face on left. Natural brown railway sleepers permitted. All integrated details follow same isometric grid.
```

### market

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. Keep two adjoining striped stalls, blank notices, magnifying glass and briefcase emblems. Counters and awning top surfaces clearly visible from above. Front counters run diagonal from lower-left to upper-right, left sidewalls visible. Preserve one cohesive market asset.
```

### poster

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. This is a SMALL PROP, no building. A-frame poster board, keep abstract circle and ribbon without text. Redraw tilted poster plane and feet in elevated isometric view, broad top edges visible.
```

### bench

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. This is a SMALL PROP, no building. Empty bench, clearly visible yellow seat surface from above, backrest and slats diagonal lower-left to upper-right, coral legs, two ground axes at 30 degrees.
```

### books

```text
Edit the FIRST image, preserving the identity and design of its object, but REDRAW it in a TRUE ELEVATED ISOMETRIC VIEW. The SECOND image is the existing village, use ONLY its elevated camera angle and spatial orientation, not its people, text or setting. Orthographic isometric projection, camera elevation 35 degrees, ground-plane axes slope +30 and -30 degrees, verticals vertical. Clearly visible broad roof/top surface and two wall faces; no frontal elevation, no vanishing points. Front entrance face toward bottom-right of screen, left side wall toward bottom-left. Preserve crisp illustrated black outlines, flat retro-pop colors and simple graphic shading; light upper-left, short shadow lower-right. Core blue coral yellow pink cream palette, harmonious natural material colors permitted. ONE isolated complete object on TRUE transparent background, 12% clear safety margins all sides, no ground island or environment. NO words letters numbers people animals faces stars. Blank sign panels. Do not just skew the old image: reconstruct geometry and surfaces from above. This is a SMALL PROP, no building. Three stacked books with blue coral pink covers, cream pages and bookmark. Top blue cover is a clear isometric parallelogram, ground edges at plus/minus 30 degrees.
```

### Limpeza de fundo do vagão

```text
Precise background-extraction edit. Preserve this exact isometric railway wagon, rails, steps, colors, angle and design. REMOVE ALL blurred brown/gray glow and background surrounding it. Outside the crisp object silhouette must be completely transparent alpha=0, including gaps between rails. NO atmospheric halo, no gradient backdrop, no soft shadow. Keep only a short hard-edged contact shadow if necessary. Fit the entire wagon and all rails inside the canvas with 10% transparent margin; no cropping. No text.
```

