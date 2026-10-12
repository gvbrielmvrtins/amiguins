# Floresta em duas camadas

A composição preserva as ilustrações originais em dois SVGs: `floresta-back-v01.svg` (105 árvores) e `floresta-front-v01.svg` (123 árvores). Arquivos em `public/images/modular/`, cerca de 4 MB juntos, com fontes WebP sem perda embutidas. Árvores fora do viewport não são incluídas.

A profundidade dos pés das árvores determina a separação em relação ao jardim. Ordem: floresta de trás, jardim, floresta da frente, Melissa e jacus. As duas imagens permanecem travadas e compartilham os ajustes de posição, escala e rotação da floresta. Os alvos continuam independentes.

Gerador: `node scripts/compose-forest.cjs`, usando Sharp no runtime local. Metadados: `lib/forest-composite.json`. TypeScript e conferência visual no navegador passaram. A prévia HD não foi regenerada; alteração ainda local, sem push.
