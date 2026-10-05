# Cenário do bloco rosa — 02/10/2026

Implementação restrita ao entorno de Vagão feminINo, CinemINha, Mercado de vagas e LivrINhoteca. As quatro construções aprovadas foram preservadas, sem letreiros adicionais nem bases brancas. Os demais destinos continuam provisórios.

## Composição

- Piso rosa com paginação discreta, canteiros verdes e pequenos desenhos circulares no chão.
- Ruas de pedestres com faixa central creme e bordas em tons de areia, seguindo os eixos e as curvas existentes. Travessias gráficas junto às conexões internas.
- Trilhos com dormentes no entorno do vagão.
- Quatro árvores, três jardineiras com banco e quatro postes retrô, além dos acessórios anteriores.
- Área de descanso junto ao mercado e vegetação nas bordas, preservando circulação e espaços para futuros personagens.

`components/pink-map-scenery.tsx` contém piso, ruas e cadastro dos ornamentos. O chão recebe a matriz global de `lib/map-projection.ts`. Árvores, jardineiras e postes usam pontos de apoio na mesma planta, mas permanecem verticais, sem aplicar a matriz do chão às imagens. Os elementos novos participam da ordenação por profundidade junto aos destinos. São decorativos e não interceptam cliques.

## Assets

Gerados pela ferramenta integrada `image_gen`, com a skill imagegen; sem CLI. Referência de câmera e estilo: `public/images/modular/livrinhoteca-isometrico-v01.png`.

- `public/images/modular/rosa-arvore-isometrica-v01.png` — RGBA, 1448 × 1086.
- `public/images/modular/rosa-jardineira-banco-isometrica-v01.png` — RGBA, 1536 × 1024.

Arquivos copiados para o projeto sem edição raster por script. Canal alfa conferido. A jardineira recebeu uma passagem adicional de extração de fundo. Verificação do conjunto no localhost, TypeScript e build de produção.

## Prompts executados

### Árvore

Use case: illustration-story. Generate a NEW isolated environment prop for the same isometric village as reference image 1 (STYLE AND CAMERA REFERENCE ONLY, do not reproduce the building). One beautiful medium-height leafy street tree with rounded sculptural clusters of natural sage and forest green foliage, warm brown branching trunk, small low coral circular planter with grass and a few yellow daisies. True transparent background, complete object, 12% clear margins. Isometric elevated 35-degree camera, ground axes ±30 degrees, vertical trunk vertical, planter top visibly elliptical. Match reference bold clean dark outlines, retro-pop illustrated flat surfaces, restrained shading, light upper left short shadow lower right. Colors harmonize with #3774FA #F77B5D #FAD846 #F889BA #FFFEF9 #1C1C1C. No text letters numbers signage stars people animals faces. No white backdrop, no large ground tile. Deliver a single tree prop, not a sheet.

### Jardineira e banco

Use case: illustration-story. Generate ONE new isolated streetscape prop using image 1 ONLY as style and camera reference. A low elongated retro-pop coral planter box containing lush natural sage/forest green shrubs with a few cream daisies and yellow centers, next to an attached small warm wood slatted sitting bench on dark legs. Compact garden seating ornament for a bookshop/cinema pedestrian district, not a building. Isometric elevated camera 35 degrees, ground axes ±30 degrees, long edge runs lower-left to upper-right, show top and two faces. Match clean bold black contours, simplified illustrated shapes and restrained shading of reference. Warm brown wood natural greens, pink/coral accent, cream flowers, no photorealism. Upper-left lighting, short shadow toward lower right. Complete object with true transparent background and 12% clear margin all sides. NO people animals faces letters numbers words signage stars or large ground island. Single connected prop, not a sprite sheet.

### Refinamento da transparência

Precise background extraction edit. Preserve the planter, foliage, flowers and wooden bench exactly. REMOVE ALL diffuse colored glow and background halo around the object. Outside the crisp object silhouette must have alpha ZERO. Keep only a tiny tight contact shadow directly underneath the feet, no ambient glow. True transparent cutout, no black white or colored background. Full object, margins, same style and camera. Do not change geometry or add anything.

## Correção do piso e da circulação

Removido o xadrez provisório do mercado. O piso rosa agora cobre integralmente seu recorte depois da camada de vias antigas, eliminando acessos brancos residuais. As vias locais foram reconstruídas com segmentos paralelos aos dois eixos da planta, projetados uma única vez pela matriz global. Pavimento em tom de areia com juntas discretas substitui as faixas brancas curvas; somente as conexões no limite acompanham as vias externas. Os PNGs permanecem sem deformação; por serem ilustrações geradas, seus ângulos têm pequenas variações em relação à projeção vetorial exata.

## Acabamento liso — referência do mapa original

A pedido do usuário, foram retiradas as malhas de ladrilhos do chão e dos caminhos, as travessias listradas e os desenhos geométricos do piso. O bloco rosa usa agora chão areia claro liso, circulação creme contínua e calçadas com borda discreta, inspirados no mapa original. Canteiros, árvores, bancos e trilhos permanecem. Esta direção substitui os acabamentos quadriculados e paginados descritos anteriormente.

## Circulação orientada às fachadas

As quatro ilustrações foram preservadas. As calçadas agora partem de pontos medidos nas fachadas dos PNGs, convertidos da imagem para a planta com a escala e o ponto de apoio de cada construção. Cinema e biblioteca recebem acesso nas portas; vagão na escada; mercado na frente dos balcões. Passeios acompanham a inclinação real das fachadas e se conectam entre si e às vias externas. Removida a extensão vetorial de trilhos que não acompanhava a orientação do vagão. Postes e jardineiras foram deslocados para liberar a circulação.

## Plataforma do vagão

A plataforma usa um polígono com bordas longitudinais paralelas ao vetor dos trilhos na imagem (980, -400), convertido para a planta sem deformar o PNG. A escada desemboca na superfície; duas conexões curvas ligam a plataforma aos passeios. O meio-fio tem aberturas nesses acessos. Esta etapa concentra a correção no vagão, preservando as demais construções. Conferência visual no navegador ampliado e TypeScript sem erros.


## Refinamento dos demais acessos

Cinema, biblioteca e mercado recebem agora superfícies de calçada poligonais, paralelas às fachadas amostradas nas imagens, substituindo as linhas grossas e os pequenos ramais nas portas. As conexões desembocam nessas superfícies contínuas. Canteiros alongados seguem a mesma direção local, com grama de textura esparsa; vegetação e bancos adicionais aproveitam as margens do bairro. O piso de circulação permanece liso e os PNGs das construções não foram alterados.
