# Metrô junto ao cantIN

A rua superior, entre o cantIN e os primeiros quarteirões, dá lugar a uma linha de metrô em superfície: trilhos paralelos, dormentes e lastro de pedras. Um trem de dois carros ocupa a linha; apenas o carro rosa é o vagão feminino. A entrada do menu navega para esse vagão. O antigo lote passa a ser uma plataforma compacta com os elementos existentes.

Variantes individuais via imagegen: `metro-vagao-feminino-v03.png`, adaptando o vagão original sem escada fixa e com porta fechada; `metro-carro-frontal-v01.png`, carro azul com cabine. Referências explícitas: vagão original, cinema e árvore originais para preservar acabamento retrô-pop, contornos e escala.

Prompt do vagão: Same pink women's subway carriage, identical pink panels blue windows yellow coral trims cream segmented rounded roof and black cartoon outlines. Remove fixed outdoor staircase/boarding platform, separate rails and sleepers and all ground/glow. Close middle passenger door flush with carriage. Preserve wheels and undercarriage. Add small end couplers. Isolated single passenger subway car, no cab, long axis down to right +30 degrees, elevated isometric ground axes ±30°, upright verticals. Cinema and tree are style references. Transparent background; no text, people, station or track.

Prompt do carro frontal: One matching front metro motor carriage to connect in front of pink car. Same proportions, cream rounded roof, yellow/coral trim, cobalt blue panels, blue passenger windows, driving cab at right end with broad dark windshield, twin headlights, low rounded nose, small front coupler, undercarriage wheels. Long body down to right at +30 degrees; elevated isometric ground axes ±30°. Pink car design reference; cinema and tree polished retro-pop style references. Single isolated whole cab car, transparent background, no halo, glow, shadow, rails, platform, people, text or scenery.

Composição provisória e integração final conferidas no navegador. TypeScript e `git diff --check` passaram. Captura final: `docs/proofs/metro-cantin-v01.png`.

## Saída subterrânea

A ponta inicial dos trilhos foi conectada a uma rampa rebaixada, com paredes de contenção, abertura escura sob o solo e linhas de trilhos acompanhando a profundidade. Geometria de terreno em SVG mantém os eixos do mapa e as verticais, sem gerar uma nova construção. Captura conferida: `docs/proofs/metro-passagem-subterranea-v02.png`. TypeScript e `git diff --check` passaram.

Segunda passagem subterrânea: reutilização da rampa original com coordenadas invertidas no eixo lógico dos trilhos; a descida começa em x=1050 e entra no chão em x=1365. O batente terminal antigo foi retirado. Gradientes independentes para as duas rampas. Verificação visual: `proofs/metro-duas-passagens-v03.png`.

Suavização das duas passagens: bordas de terreno arredondadas e afuniladas, vegetação baixa nas laterais, reaproveitamento da textura de brita, sombra com transparência gradual, paredes e trilhos com descida curva e portal arqueado. Mantida a projeção isométrica e as coordenadas dos extremos. Inspeção no navegador em 75% e 50%, console e TypeScript sem erros. Registro: `proofs/metro-transicao-suave-v04.png`.
