# Taverna contemporânea e café de apoio

Gerados com a ferramenta integrada imagegen; referências explícitas: `cineminha-isometrico-v01.png`, `rosa-arvore-isometrica-v01.png` e `plaza-arcada-v01.png`.

A taverna foi recomposta em volumes simples com cobertura plana, fachada comercial e terraço livre antes da renderização. A versão rústica v01 foi preservada no acervo e substituída pela v02. Mesas redondas com banquetas foram geradas individualmente; mesa comprida com bancos e banco de madeira reutilizam as peças prontas do parque. Dois conjuntos redondos, um comprido e um banco lateral mantêm acesso à porta e recuos. O café de apoio da anotação anterior foi finalizado individualmente.

Arquivos em `public/images/modular/`: `taverna-bar-contemporaneo-v02.png`, `taverna-mesa-redonda-v01.png`, `cafe-apoio-render-v01.png`. Integração: `lib/civic-rendered-assets.ts` e `components/east-district-study.tsx`. Escala uniforme e correção dos eixos de chão preservando verticais.

## Prompts executados

### Bar

Use case: stylized-concept. One isolated game-map asset on genuinely transparent background, entire object visible. Reference image 1 cinema: match worked dark contours, layered moldings, bright retro-pop colors and detailed illustration. Image 2 tree: match natural material finish and controlled shading. Image 3 Plaza hispanica: use its cream, cobalt blue, coral and gold-yellow trim and visual polish. Do not copy these subjects. Elevated orthographic isometry, ground axes ±30 degrees, verticals upright, upper-left light. No people, lettering, ground tile or scene. Subject: contemporary urban board-game THEMED BAR, compact single-storey rectangular building. FLAT roof with parapet, coral stucco facade, cream pilasters, layered yellow and cobalt blue cornices inspired by Plaza, large blue-framed glazed doors and shopfront windows with a glimpse of a modern illuminated bar counter and game shelves. Wide horizontal fascia decorated with oversized dice and playing-card suit pictograms, no words. Short modern blue-and-yellow fabric awnings above glazing, warm slim wall sconces. Broad facade facing lower-left and running down-right +30 degrees; side runs up-right -30 degrees. Modern convivial playful bar. No medieval/half-timber styling, NO pitched roof, NO chimney, NO rustic stonework. Building alone, no terrace furniture.

### Mesa

Use case: stylized-concept. One isolated game-map asset on genuinely transparent background, entire object visible. Reference image 1 cinema: match worked dark contours, layered moldings, bright retro-pop colors and detailed illustration. Image 2 tree: match natural material finish and controlled shading. Image 3 Plaza hispanica: use its cream, cobalt blue, coral and gold-yellow trim and visual polish. Do not copy these subjects. Elevated orthographic isometry, ground axes ±30 degrees, verticals upright, upper-left light. No people, lettering, ground tile or scene. Subject: ONE small contemporary themed pub terrace furniture set: round honey-brown wooden tabletop on dark cobalt metal pedestal, THREE compact stools with coral padded seats and blue steel legs spaced around it. Table has two small ceramic mugs and a neat pair of playing cards. Detailed readable joinery and metal trim. Low cafe height, not tall bar furniture. Elevated isometric view, feet on same ground plane. No surrounding environment, no rug, no floor. This is one modular furniture set only.

### Café

Use case: stylized-concept. One isolated game-map asset on genuinely transparent background, entire object visible. Reference image 1 cinema: match worked dark contours, layered moldings, bright retro-pop colors and detailed illustration. Image 2 tree: match natural material finish and controlled shading. Image 3 Plaza hispanica: use its cream, cobalt blue, coral and gold-yellow trim and visual polish. Do not copy these subjects. Elevated orthographic isometry, ground axes ±30 degrees, verticals upright, upper-left light. No people, lettering, ground tile or scene. Subject: ONE tiny contemporary neighborhood café kiosk building, rectangular one-storey compact coral stucco cube, flat roof with cream parapet, layered yellow/cobalt cornice, a wide golden-yellow fabric awning over blue glazed entrance and one display window with pastries and espresso machine. Small coffee cup pictogram above awning, no words. Broad facade facing lower-left, runs down-right +30 degrees; right side runs up-right -30 degrees. Detailed cozy local shop same architectural finish as cinema and plaza. Building only, no furniture, no people, no ground.

## Validação

Cada peça foi inspecionada e integrada antes da próxima geração. Conferência visual no localhost e `tsc --noEmit` concluídos. Captura: `taverna-contemporanea-preview.png`.

