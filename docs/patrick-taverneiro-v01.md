# Patrick Canuto, taverneiro

Personagem jogável baseado na foto fornecida pelo usuário. Referência de desenho e proporções: Nathan Machado. Traços: cabelo castanho curto levantado, óculos retangulares, bigode fino e barba discreta no queixo. Roupa medieval com camisa creme, colete de couro, calças oliva e botas, estrela dourada de xerife no peito e controle de videogame na mão.

Sprite individual `characters/patrick-canuto-v01.png`, em transparência, integrado no mesmo tamanho e comportamento das outras pessoas. Posição lógica (2810, 120), diante da taverna e entre as mesas. O total de pessoas e o menu se atualizam automaticamente. Ajustada a ordem de profundidade da taverna para preservar o personagem à frente.

Patos decorativos reutilizam uma peça individual gerada com cinema e árvore originais como referências explícitas de estilo: pato-real de cabeça verde, bico amarelo, peito marrom e pés alaranjados, vista elevada em três quartos, fundo transparente e acabamento retrô-pop. Distribuição ao redor das mesas, sem interação de jogo.

Integração concluída com quatro patos (`modular/taverna-pato-v01.png`), alternando a orientação, sem sobreposição com poste, personagem ou mesas. Conferência visual em 125%, 150% e 200%; TypeScript, diff e console sem erros. Registro: `proofs/patrick-taverna-patos-v01.png`.

Patrick aproximado da porta, com ordem de renderização à frente da fachada. TypeScript sem erros; a conferência visual desta reposição foi bloqueada pela política de acesso do navegador.

Reposicionado conforme a marcação do usuário diante da porta: (2828, 130), mantendo o personagem à frente da fachada.
