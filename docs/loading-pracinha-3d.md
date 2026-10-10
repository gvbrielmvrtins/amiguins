# Pracinha 3D — prévia de loading

Rota isolada: `/loading-preview`, sem entrada na navegação do jogo. O progresso demonstrativo aparece como porcentagem em fonte Now de 92 px, sem barra.

A página principal usa a mesma tela com progresso real em `GameLoadingGate`: aguarda a montagem do mapa, o carregamento e a decodificação das URLs únicas de `img` e `image` (SVG), além das fontes. O jogo permanece montado atrás da tela, sem interação, permitindo que os tiles visíveis da versão otimizada carreguem. Depois de estabilizar os recursos e passar dois frames de renderização, a tela libera o jogo. Erros de imagem contam como recursos concluídos para não bloquear a navegação; o loading não reaparece ao explorar outras regiões do mapa.

## Referências e direção visual

- Referência principal: `public/images/modular/praca-central-circular-v01.png`, também usada no retrato da pracinha no menu do jogo.
- Página original: fundo creme, contornos escuros, cores fortes e ilustrações com sombras controladas. A praça combina piso bege e faixas salmão, coreto coral com molduras claras, ferragens azuis e vegetação de verde profundo a verde-amarelo.
- A composição conserva o coreto ao fundo, fonte escalonada no centro, quatro árvores em floreiras circulares, bancos de madeira, lanternas e canteiros na borda. Os lados não visíveis na referência são uma interpretação volumétrica para permitir o giro completo.

## Refinamento

O modelo procedural usa geometria real e gira no eixo Y a cada 18 segundos. Materiais toon com faixas de iluminação e cascas de contorno substituem o acabamento inicialmente muito claro. Copas mais largas e recortadas substituem as esferas facetadas; a fonte tem perfis torneados, bordas e reflexos na água. Coreto com molduras sobrepostas, canteiros curvos floridos e lixeiras azuis retomam detalhes da referência.

Não foram geradas imagens novas: este pedido refina a geometria 3D interativa. As peças do mapa original permanecem intactas. Geometrias estáticas são agrupadas por material para reduzir chamadas de desenho. A cena pausa em abas ocultas e respeita a preferência de movimento reduzido; recursos de GPU são liberados na desmontagem.
