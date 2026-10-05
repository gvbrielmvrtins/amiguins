# Jardim secreto e jardim ao norte

Estudo de composição solicitado, sem renderização imagegen nesta etapa. Elementos inéditos em SVG simples; peças prontas reutilizadas conforme a estratégia do mapa.

## Jardim secreto

Terreno 360×330 em (2740,250), substituindo bloco e marcação antiga. Entrada com arco de trepadeiras, sebes em três lados, ilhas de flores, relógio de sol e caminho com pedras. Reutilizados lago, carvalho, bétula e banco do parque. Passagens livres entre mobiliário e entrada; recuos para a taverna e o café.

## Jardim ao norte da região central

Terreno 440×230 em (1550,-30), substituindo reserva vazia. Pequena estufa, três canteiros de cultivo elevados, bancada de jardinagem com vasos e ferramenta, coletor de água e abrigo para insetos. Bétula e banco reutilizados. Corredor frontal e corredor transversal entre os canteiros preservados.

## Integração

Coordenadas em `lib/garden-study.ts`; volumes, terrenos e destino em `components/garden-study.tsx`. Objetos entram na ordenação global por profundidade em `components/modular-map.tsx`, com eixos de chão ±30° e verticais mantidas. Elementos sem nomes visíveis; títulos acessíveis mantidos. Conferência visual no localhost e TypeScript sem erros.

Capturas: `jardim-secreto-rascunho-preview.png` e `jardim-norte-rascunho-preview.png`.
