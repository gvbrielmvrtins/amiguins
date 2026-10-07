# Floresta na borda norte

O jardim cercado atrás da prefeitura e da torre foi substituído por uma floresta densa que continua além das bordas superior e direita do mapa. O terreno não possui cerca nem limite externo visível. A frente junto à vila segue um contorno orgânico, mantendo o corredor de circulação.

Composição reaproveita carvalho, pinheiro e bétula existentes (`parkRenderedAssets`), com variação de escala, posições desencontradas e ordenação por profundidade. Árvores fora do enquadramento também são mantidas na faixa necessária para suas copas alcançarem a borda, evitando espaços vazios. Não foram geradas novas ilustrações.

Implementação: `lib/north-forest.ts`, `components/garden-study.tsx`, integração na lista ordenada de `components/modular-map.tsx`. O jardim secreto permanece em seu lote.

Verificação: TypeScript, `git diff --check` e inspeção visual em 50% e 100%. Captura: `docs/proofs/floresta-norte-v01.png`.

## Continuidade até o calçadão

O espaço livre além dos últimos quarteirões foi preenchido até a margem interna do calçadão, usando a mesma curva costeira da praia. O interior segue denso e a faixa próxima ao passeio tem árvores menores, mais espaçadas, vegetação baixa reutilizada e faixas suaves de tonalidade no solo. A floresta e o chão continuam além da borda direita; calçadão e construções permanecem livres.

A geometria compartilhada da costa passou a expor pontos sem alterar seu traçado. Camada do solo florestal renderizada antes da praia para preservar o mosaico. TypeScript e `git diff --check` passaram. Conferência: `docs/proofs/floresta-calcadao-v02.png`.

## Transição do silicIN valley

Adicionada uma faixa orgânica de solo e vegetação baixa junto à lateral do campus, com gradação de cores claras para verdes da floresta e conexão com a faixa costeira. Mantidos os edifícios, robô, protótipos e passeio sem vegetação por cima. Conferência visual em 75%, TypeScript e `git diff --check` aprovados. Captura: `docs/proofs/silicin-floresta-calcadao-v03.png`.

## Calçadão sobre o terreno do campus

Removidas a moldura azul e a sombra retangular do terreno do silicIN valley. Sua superfície passa a ter contorno orgânico e bordas que se dissolvem no terreno vizinho. O trecho costeiro é renderizado depois dos terrenos, permitindo que o mosaico do calçadão e a areia passem por cima da antiga borda do lote, em continuidade com a praia. Edificações e objetos permanecem preservados. TypeScript e `git diff --check` passaram. Captura: `docs/proofs/silicin-calcadao-continuo-v04.png`.
