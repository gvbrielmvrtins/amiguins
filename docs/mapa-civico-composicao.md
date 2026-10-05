# Composição dos quatro espaços cívicos

## Ampliação da PracINha

Terreno ampliado de 420 × 420 para 420 × 550 unidades (31% de área adicional), estendendo apenas a borda sul para conservar as ruas junto à prefeitura e à Plaza hispanica. Mantém aproximadamente 90 unidades até o terreno do BINstrô.

Novos elementos em baixa fidelidade: pergolado aberto com dois bancos e mesa coletiva, mesa de jogos com quatro assentos e pequeno palco com degrau. Áreas de piso e jardim delimitam a convivência, mantendo a fonte, o quiosque, o canteiro e os elementos existentes. Verificação visual no navegador e TypeScript sem erros.

Estudo em baixa fidelidade: PracINha, Torre MÍNstica, PrefeINtura e Plaza hispanica. Mantém os destinos e a projeção isométrica da vila, substituindo os blocos provisórios desses quatro espaços.

- PracINha: fonte central, quiosque, canteiro e área de encontro.
- PrefeINtura: prédio azul, pórtico com colunas, frontão, escadaria, bandeira e quadro de avisos.
- Torre MÍNstica: base, volume vertical rosa, cobertura pontuda azul, relógio e jardim lateral.
- Plaza hispanica: galeria de arcos, cobertura terracota, bandeirolas, fonte e mesas.

Árvores, postes, bancos, mesas e floreiras reutilizam o acervo renderizado. Terrenos com calçada creme e contorno na identidade existente; espaços livres preservados para circulação e personagens. Geometria nova permanece simplificada conforme solicitado; não houve geração de imagens nesta etapa.

Implementação: `components/civic-map-study.tsx` e `lib/civic-study.ts`. Conferência no navegador e TypeScript sem erros.

## Ajuste de implantação e ruas

Os quatro terrenos agora têm 420 × 420 unidades e centros distribuídos em intervalos de 510 unidades, deixando ruas de 90 unidades nos dois eixos. A torre foi alinhada à prefeitura; PracINha e Plaza hispanica formam a fileira seguinte. Ambientação acompanha cada deslocamento. O intervalo até os lotes ilustrados a oeste fica próximo de 105 unidades.

Taverna e jardim secreto foram afastados para manter aproximadamente 90–100 unidades livres junto ao conjunto reposicionado, com terreno da taverna de 360 × 360 unidades. Mantidas as escalas das construções e dos móveis. Validado visualmente e com `tsc --noEmit`.
