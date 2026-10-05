# Composição de preenchimento — 03/10/2026

Estudo em baixa fidelidade nas três áreas anotadas ao redor do núcleo ilustrado. As reservas anteriores foram substituídas por terrenos ajustados à composição, sem adicionar destinos à lista da vila.

- Norte: duas edificações residenciais (uma com comércio térreo), uma loja baixa e passeio frontal com floreira, árvores e mesa.
- Oeste: sobrado residencial entre dois pequenos comércios, com intervalos para vegetação e encontro.
- Canto noroeste: parque com pequeno lago provisório, árvores, floreira, mesa e caminho conectado ao passeio.

Referências: composição existente de vagão, biblioteca, cinema e mercado; mesmas cores coral, rosa, amarelo, azul e creme, eixos de chão a ±30° e paredes verticais. Árvores e mobiliário reutilizam diretamente as ilustrações existentes. Os novos prédios e o lago são modelos provisórios para verificar implantação antes de renderizar individualmente via imagegen em uma próxima etapa.

Cadastro: `lib/map-filler.ts`. Volumes e pisos: `components/map-filler-study.tsx`. Todos os elementos verticais participam da ordenação por profundidade do mapa. Mantidos os recuos e a circulação livre entre os quatro lotes ilustrados e os preenchimentos.

Validação: TypeScript sem erros e conferência visual no navegador das faixas norte e oeste e do parque.

## Correções do estudo

As três fachadas da faixa oeste agora abrem para leste, com portas, janelas e toldos na face voltada ao passeio; a implantação permanece igual. A floreira da loja foi afastada da entrada. No parque, substituídas as árvores em vasos por três variantes novas de baixa fidelidade: copa ampla, árvore esguia de tronco claro e conífera, todas enraizadas no solo. Criados banco de madeira com encosto e mesa de piquenique com assentos integrados, também provisórios. Os cinco elementos novos entram na ordenação por profundidade.
