# Montagem do módulo rosa

Estado vigente em 02/10/2026. Abrange Vagão feminINo, LivrINhoteca, CinemINha e Mercado de vagas.

As quatro peças e seus acessórios usam os PNGs isométricos registrados em [mapa-isometria.md](mapa-isometria.md). Seus pontos de apoio, tamanhos originais e escalas estão em `lib/map-pilot-assets.ts`.

A montagem segue a [base isométrica global](mapa-base-isometrica.md). As posições são coordenadas da planta, convertidas por `lib/map-projection.ts`; imagens recebem escala uniforme, sem deformação. Os destinos são ordenados junto aos demais blocos pela profundidade no mapa. Os acessórios acompanham a posição de sua construção.

Por solicitação do usuário, não exibir nomes nas fachadas, placas externas ou bases brancas sob essas quatro ilustrações. Os nomes continuam na lista lateral e nos rótulos acessíveis. Não duplicar as sombras incorporadas nos PNGs.

Os outros 16 destinos usam blocos isométricos provisórios até receberem ilustrações próprias. Preservar a câmera global em cada substituição.

O entorno das quatro peças agora tem piso, ruas, canteiros, árvores, jardineiras e postes. Ver [cenário do bloco rosa](mapa-cenario-rosa.md) para assets, montagem e prompts.
