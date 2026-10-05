# Base isométrica global — 02/10/2026

A prévia modular agora compartilha uma projeção global de chão. As quatro peças aprovadas (Vagão feminINo, CinemINha, Mercado de vagas e LivrINhoteca) orientam a câmera e a montagem. O mapa original e a interface de comparação permanecem disponíveis.

## Sistema de coordenadas

`lib/map-projection.ts` centraliza a conversão da planta lógica para o SVG de 3000 × 2000:

- telaX = 1080 + (plantaX − plantaY) × 0,5196152423;
- telaY = 220 + (plantaX + plantaY) × 0,3;
- eixos do chão a ±30°, sem pontos de fuga;
- construções verticais, com escala uniforme de 0,75 sobre as dimensões cadastradas.

Terreno, caminhos contínuos, acessos, praças e padrões usam a mesma matriz. Praças circulares na planta tornam-se elipses na tela; o quadriculado é projetado apenas uma vez. A distribuição orgânica foi preservada, assim como os espaços livres para personagens e a ilha de Países africanos sem ponte.

## Construções e profundidade

Os 20 destinos são desenhados do fundo para a frente pela soma das coordenadas da planta. Os 16 blocos provisórios agora têm topo e duas faces seguindo os eixos de 30°. Nomes permanecem legíveis nesses marcadores provisórios.

As quatro ilustrações recebem uma correção de projeção própria antes da translação e escala de implantação. A análise das arestas revelou que os PNGs eram oblíquos: suas fachadas tinham inclinação aproximada entre −19° e −22°, enquanto as laterais variavam entre 26° e 45°. Isso destoava dos eixos de ±30° do chão e dos blocos provisórios.

`pilotProjections`, em `lib/map-pilot-assets.ts`, registra as inclinações medidas nas fachadas, laterais e trilhos. `uprightProjection`, em `lib/map-projection.ts`, leva essas duas direções a ±30° com uma matriz de área preservada: `x′ = a·x`, `y′ = b·x + d·y`, `a·d = 1`. Paredes verticais continuam verticais, e o ponto de apoio permanece fixo. A correção ocorre na renderização SVG, sem alterar os PNGs originais. Não aplicar a matriz do chão à imagem inteira: isso projetaria também as paredes como se fossem piso.

As entradas e os pontos de pavimento ligados às construções usam a mesma correção. Seus pontos de apoio descontam as margens transparentes. Acessórios independentes mantêm sua montagem existente. Não há placas externas, nomes nas fachadas ou bases brancas adicionais sob as quatro peças. Sombras incorporadas nos PNGs não são duplicadas; blocos usam sombra curta para baixo e à direita. A correção alinha as direções dominantes; pequenas irregularidades internas do desenho à mão permanecem.

## Próximas substituições

### Recuos das quatro construções prontas

As escalas foram reduzidas em 32–35% após a correção de perspectiva. Os pontos de implantação foram reposicionados dentro dos lotes existentes, deixando chão visível ao redor e circulação entre os quatro terrenos. Vagão e mercado usam cerca de 65% da escala anterior; cinema e biblioteca, cerca de 68%. Os acessórios agora têm posições próprias no chão, com apoio pelo centro inferior e tamanho compatível com os edifícios. As coordenadas dos destinos acompanham a implantação para preservar a ordenação de profundidade. Não foi necessário ampliar os terrenos.

1. Manter o ID e o ponto de implantação do destino em `lib/modular-map.ts`.
2. Produzir uma peça com câmera elevada, eixos de 30°, verticais retas e iluminação superior esquerda, usando as quatro peças como referências.
3. Cadastrar tamanho original, ponto de apoio e escala uniforme, seguindo `lib/map-pilot-assets.ts`.
4. Trocar o bloco pela ilustração e conferir encaixe, acessos, margem para personagens e sobreposições no zoom de 100% e ampliado.
5. Alterar localmente o chão apenas quando o uso do espaço exigir. Não redefinir a câmera por seção.

A paleta retrô-pop e a permissão de cores naturais harmonizadas continuam vigentes. As imagens geradas são interpretações ilustradas da câmera; a base vetorial usa a projeção matemática comum.
