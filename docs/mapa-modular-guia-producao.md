# Guia de produção do mapa modular Amiguins

Referência: [Mapa retro-pop — nova direção visual](mapa-retro-pop.md).

**Fluxo vigente para novos ambientes:** seguir a [estratégia de composição e renderização](mapa-estrategia-composicao.md), definida pelo usuário em 03/10/2026: prédio e elementos principais inéditos em baixa fidelidade, depois renderização um a um via imagegen, sempre com os primeiros elementos como referências visuais. Reutilizar diretamente as peças já existentes. Essa orientação e o acabamento das referências estabelecidas prevalecem sobre recomendações anteriores conflitantes.

## 1. Objetivo e precedência

Construir futuramente um cenário 2D composto por terreno vetorial, peças ilustradas individualmente por IA e letreiros definidos por código. Preservar os 20 destinos em uma única composição navegável, com espaço para personagens futuros.

Este documento especifica a produção; não gera imagens nem modifica o mapa atual. As regras numéricas abaixo são decisões de padronização propostas neste guia, não medidas extraídas das imagens de referência. 

Os nomes obrigatórios são **EspacIN ColoridIN** e **Torre MÍNstica**, conforme a correção explícita do usuário. Manter a grafia dos outros 18 nomes, inclusive capitalização interna, acentos e “Plaza hispanica” sem acrescentar acento. IDs de arquivos não substituem os nomes exibidos.

## 2. Linguagem visual

Retrô-pop editorial dos anos 1970: grandes áreas chapadas, curvas psicodélicas, formas orgânicas, padrões geométricos, margaridas grandes, estrelas de quatro pontas e sombras gráficas. Arquitetura inventiva e simplificada, com proporções levemente ingênuas. Cada destino deve ser reconhecido pela silhueta e por dois ou três motivos principais.

Evitar aparência de brinquedo 3D e arquitetura realista, aparência de jogo mobile genérico, renderização 3D, brilho, gradientes e excesso de microdecoração. Não produzir pessoas, animais, rostos, silhuetas humanas, partes do corpo ou robôs, inclusive nos cartazes. A ocupação de seis pessoas da Plaza hispanica é uma reserva espacial, não uma instrução para desenhá-las.

### Paleta de referência e cores naturais

| Cor | Código | Uso preferencial |
| --- | --- | --- |
| Azul | `#3774FA` | Água, arquitetura, plantas e padrões |
| Coral | `#F77B5D` | Arquitetura e massas de paisagem |
| Amarelo | `#FAD846` | Destaques, placas, plantas e padrões |
| Rosa | `#F889BA` | Arquitetura, plantas e massas orgânicas |
| Creme | `#FFFEF9` | Caminhos, respiro, placas e áreas claras |
| Preto | `#1C1C1C` | Contornos, textos e sombras sólidas |
| Cinza | `#D9D9D9` | Detalhes neutros pontuais |

A paleta original continua sendo a base da identidade visual, mas não é uma lista exclusiva de cores. Conforme orientação do usuário em 02/10/2026, elementos podem usar suas cores naturais quando isso ajudar a representá-los e harmonizar com o conjunto. Esta regra substitui as restrições anteriores a sete tintas e as proibições de verde, marrom ou outras cores naturais.

- Árvores, folhagens, arbustos e grama podem usar verdes naturais; troncos, madeira e dormentes podem usar marrons.
- Chão, terra, areia e pedras podem usar tons terrosos, areia, ocres e cinzas naturais. Flores e outros materiais também podem usar cores próprias quando fizer sentido.
- Escolher tons que conversem com azul, coral, amarelo, rosa e creme do projeto. Ajustar saturação, luminosidade e contraste para que os elementos naturais não disputem atenção com os destinos e não prejudiquem a leitura dos caminhos.
- Reutilizar uma família coerente de verdes e terrosos entre as peças. Não é necessário recolorir elementos naturais em azul, rosa ou amarelo; essas opções estilizadas continuam possíveis quando funcionarem na composição.
- Manter a linguagem retrô-pop, as formas simplificadas, os contornos e as sombras consistentes. Cor natural não exige textura fotográfica ou renderização realista.
- A bandeira de EspacIN ColoridIN continua podendo usar as cores-base como alusão inclusiva. O vinho e a videira do BINstrô podem ter cores naturais harmonizadas.

Os códigos acima são referências de identidade, não uma exigência de correspondência exata em cada pixel. Avaliar as peças no mapa pelo equilíbrio visual, reconhecimento dos materiais e consistência entre os elementos. Não quantizar todas as imagens às sete cores nem refazer uma peça somente por conter uma cor natural adequada. A orientação não exige recolorir automaticamente os arquivos já aprovados.

### Perspectiva isométrica — direção vigente em 02/10/2026

A prévia implementa a [base isométrica global](mapa-base-isometrica.md), compartilhada por terreno e pelos 20 destinos. Seguir suas regras de coordenadas e montagem nas próximas substituições.

A pedido do usuário, substituir a vista frontal oblíqua rasa por uma vista isométrica elevada, próxima à leitura espacial de `public/images/amiguins-town.png`. O mapa original serve como referência de câmera e volume; manter a linguagem e identidade dos novos espaços.

- Câmera ortográfica elevada aproximadamente 35°, com dois eixos de chão a +30° e -30° em relação à horizontal e verticais paralelas.
- Mostrar telhados, coberturas, balcões e assentos por cima, além de duas faces dos volumes. A fachada principal olha para baixo e à direita da tela; a lateral esquerda também aparece.
- Compartilhar a mesma orientação entre construções, trilhos, plataformas, bancos, livros e cartazes. Não gerar fachadas quase frontais com apenas uma pequena lateral.
- Redesenhar as superfícies nas imagens; não simular a mudança de câmera esticando ou inclinando um PNG frontal por CSS/SVG.
- Bases e pisos vetoriais acompanham os eixos isométricos. Círculos no chão aparecem como elipses com altura aproximada de 57,7% da largura. Caminhos continuam orgânicos e conectados, sem obrigar destinos a uma grade.
- A IA produz uma interpretação ilustrada, não um modelo geométrico exato: revisar alinhamento visual de cada peça no conjunto. Preservar a paleta flexível, os contornos, a iluminação e os materiais naturais harmonizados.

### Proporções e escala de trabalho

Adotar uma prancheta lógica horizontal de **3000 × 2000 unidades (3:2)**, independente da resolução dos arquivos e do tamanho da tela. Usar posições normalizadas na composição futura.

| Elemento | Faixa inicial na prancheta |
| --- | --- |
| Destino construído comum | 240–360 unidades de largura; 180–320 de altura |
| Destino alongado, como vagão ou mercado | 340–460 de largura |
| Torre MÍNstica | 150–210 de largura; 330–420 de altura |
| PracINha, incluindo área de circulação | 430–550 de diâmetro aparente |
| Copa de árvore ornamental | 65–120 de largura |
| Banco | 60–95 de largura |
| Caminho principal livre | 90–130 de largura |
| Reserva para personagem futuro | 35–50 de altura por figura |

Estas faixas orientam o primeiro layout; ajustar o conjunto antes da geração final. Reservar pelo menos 30% da área terrestre para caminhos, praças e respiro, sem contar o rio. Não encolher destinos até perder sua identidade para preencher um layout apertado. Manter pelo menos 24 unidades entre placas e silhuetas vizinhas.

### Contornos

- Silhuetas principais: **5 unidades** na prancheta lógica.
- Divisões internas importantes: **3 unidades**.
- Padrões e pequenos detalhes: **2 unidades**, evitando detalhes cuja leitura dependa de linhas menores.
- Preto da paleta, junções e terminações arredondadas. Pequena irregularidade desenhada é aceitável; não usar rabiscos ou múltiplos traços.
- Avaliar a espessura depois que a peça estiver no tamanho final do mapa. Arquivos gerados maiores precisam compensar a redução; não copiar o mesmo número de pixels de contorno para arquivos de escalas diferentes.

### Luz e sombras

Luz convencional vindo do alto à esquerda; todas as sombras deslocadas para baixo e para a direita, a aproximadamente 45° na tela. Sombras opacas em `#1C1C1C`, sem blur, transparência ou gradação.

Usar deslocamento de 8–14 unidades em construções comuns e 4–6 em objetos pequenos. A torre pode chegar a 18 unidades. A sombra é uma assinatura gráfica, não uma simulação física. Preferir sombra de contato separada da peça para controlar sobreposições; não duplicar uma sombra já incorporada à ilustração.

### Textura

Textura serigráfica muito discreta, subordinada às áreas chapadas: pequenos pontos opacos em uma tinta da paleta, cobrindo aproximadamente 1–2% das grandes superfícies. Não aplicar ruído multicolorido, sujeira intensa, transparência de grão ou textura sobre letras.

Produzir primeiro as peças limpas. Se necessário, aplicar uma textura comum na montagem para manter a mesma escala de grão. Ela deve ser quase imperceptível no enquadramento geral; não é obrigatória em objetos pequenos.

## 3. Composição e divisão em camadas

Organizar agrupamentos irregulares em torno da PracINha circular com fonte. Caminhos creme contínuos conectam os destinos do continente, sem linhas retas dominantes ou fileiras de prédios. PrefeINtura fica atrás da praça, no sentido superior da composição.

A Torre MÍNstica fica acima e um pouco à direita da fonte. O ponto aproximado de 57% da largura e 30% da altura é herdado da revisão da imagem anterior: serve como referência inicial, sujeito ao encaixe do layout modular. Não criar um 21º destino para o pavilhão que ela substitui.

Países africanos ocupa a ilha no canto inferior direito, além de uma faixa larga de água, sem ponte. Preservar pavilhão contemporâneo, pátio aberto e morro abstrato curvo rosa/coral; não usar pirâmide, bandeiras de países ainda não escolhidos ou imagens estereotipadas de safári.

| Ordem | Camada | Produção |
| --- | --- | --- |
| 1 | Fundo, terra, rio e ilha | SVG contínuo |
| 2 | Caminhos, pisos, padrões e pátios | SVG; máscaras limitam os padrões às superfícies |
| 3 | Paisagem e decoração ao fundo | Formas SVG e peças transparentes reutilizáveis |
| 4 | Sombras de contato | Formas separadas ou sombra já incluída, nunca ambas |
| 5 | Construções e objetos principais | Ilustrações individuais com transparência |
| 6 | Decoração à frente | Peças independentes, com ordem ajustada ao ponto de apoio |
| 7 | Letreiros | Texto HTML/SVG e placas vetoriais |
| 8 | Interações e realces | Código, sem integrar marcas de interface à arte |

As camadas 3–6 admitem ordenação local por profundidade para que árvores e bancos fiquem corretamente à frente ou atrás de edifícios. Placas devem permanecer livres de oclusão. Não incluir título geral, legenda ou números de inventário dentro do cenário.

## 4. Inventário dos 20 destinos

Cada linha representa **um destino único**, mesmo quando sua montagem contém várias peças. Gerar a construção principal separadamente do terreno; acessórios inseparáveis de sua identidade podem compartilhar o mesmo arquivo. Pisos, placas e decoração reutilizável ficam separados.

| Nº | ID estável | Nome final | Peça principal e motivos obrigatórios | Complementos separados |
| --- | --- | --- | --- | --- |
| 1 | vagao-feminino | Vagão feminINo | Vagão rosa, janelas arredondadas e porta aberta | Trilhos curtos e plataforma |
| 2 | livrinhoteca | LivrINhoteca | Livraria em forma de livro aberto | Livros e banco de leitura |
| 3 | prefeintura | PrefeINtura | Prédio cívico azul/creme, relógio e escadaria | Quadro de avisos abstratos |
| 4 | taverna-joguins | Taverna dos joguINs | Taverna com dado d20 reconhecível | Mesas com jogos de tabuleiro |
| 5 | pracinha | PracINha | Fonte escultural gráfica | Piso circular SVG, bancos e margaridas grandes |
| 6 | mercado-vagas | Mercado de vagas | Conjunto único de barracas listradas | Avisos, motivo de lupa e maleta |
| 7 | espacin-coloridin | EspacIN ColoridIN | Café inclusivo com cobertura ondulada e listrada | Bandeira na paleta, pequenos corações e mesas vazias |
| 8 | cineminha | CinemINha | Cinema coral, marquise amarela e pipoca gigante | Cartazes abstratos sem rostos |
| 9 | linkedin | LinkedIn | Café azul com balões de conversa conectados | Mesas compartilhadas e cartões vazios |
| 10 | jardim-secreto | Jardim secreto | Arco ondulado e plantas grandes envolvendo jardim | Lago pequeno SVG e banco |
| 11 | estudio-criativins | Estúdio criativINs | Estúdio com pincel gigante e paleta | Cavalete e pinturas abstratas |
| 12 | silicin-valley | SilicIN Valley | Conjunto tecnológico azul, garagem e motivo de chip | Detalhes geométricos; sem robôs |
| 13 | departamento-xerifins | Departamento dos xerifINs | Delegacia western simplificada, estrela e portas duplas | Placa vetorial com espaço para nome longo |
| 14 | inglish-pub | INglish pub | Pub com janelas quadriculadas e símbolo de caneca | Cabine telefônica coral |
| 15 | oficina-vendinhas | Oficina de vendinhas | Oficina aberta, símbolo de engrenagem e sacola | Ferramentas e caixas |
| 16 | torre-mistica | Torre MÍNstica | Torre estreita pontuda rosa/azul, lua e janela de estrela | Cristal, orbe e sombra gráfica |
| 17 | plaza-hispanica | Plaza hispanica | Arcos e palco vazio com instrumentos | Piso listrado SVG; espaço livre para seis figuras futuras |
| 18 | academia-marombins | Academia marombINs | Academia coral com haltere gigante | Equipamentos simplificados |
| 19 | binstro | BINstrô | Bistrô creme/coral | Mesas, garrafas de vinho, taças, queijo e videira com cores naturais harmonizadas |
| 20 | paises-africanos | Países africanos | Pavilhão cultural contemporâneo e pátio aberto | Ilha, caminhos e morro curvo rosa/coral; sem ponte |

## 5. Inventário compartilhado

Quantidades são de modelos ou arquivos-base, não de instâncias colocadas no mapa. Duplicar decoração com moderação; nunca duplicar um destino.

| Família | Conjunto inicial | Tratamento |
| --- | --- | --- |
| Terreno | 1 composição continental + 1 ilha + 1 sistema de água | SVG editável; evitar emendas de fundos rasterizados |
| Circulação | 1 rede de caminhos + pisos específicos da PracINha e Plaza hispanica | SVG contínuo |
| Padrões | 3 modelos: listras, quadriculado e ondas | SVG, com predominância das cores-base e complementos harmonizados |
| Árvores | 3 silhuetas com verdes naturais ou variações estilizadas harmonizadas | Peças transparentes; mesma escala de contorno |
| Arbustos e plantas | 3 agrupamentos, incluindo folhas grandes | Verdes naturais permitidos; reservar plantas especiais do Jardim secreto |
| Flores e ornamentos | 2 margaridas + 1 estrela de quatro pontas | SVG ou peças transparentes |
| Mobiliário | 2 bancos + 2 conjuntos de mesas vazias | Reutilizar sem ocupar os caminhos |
| Placas | 3 formatos vetoriais adaptáveis | 20 instâncias com os nomes canônicos |
| Textura | 1 padrão comum opcional | Pontos opacos discretos em tons coerentes com a superfície |

Acessórios exclusivos constam na tabela de destinos e não precisam virar uma biblioteca de variações. Personagens e animais estão fora deste inventário e serão tratados em uma etapa futura.

## 6. Especificação de entrega das peças

- Um arquivo principal por destino, ou pequeno conjunto quando a sobreposição exigir separação. Nunca gerar um bairro inteiro com fundo para depois tentar encaixar suas bordas.
- Originais PNG com canal alfa real, objeto completo e sem fundo quadriculado desenhado. Manter aproximadamente 8–12% de margem transparente em cada lado, incluindo toda a sombra quando incorporada.
- Sem letras geradas por IA: reservar faces simples para placas. Aplicar os 20 nomes posteriormente em HTML/SVG, com letras arredondadas de inspiração setentista, em preto sobre creme ou amarelo. Permitir duas linhas nos nomes longos, sem abreviar a grafia.
- Dimensionar a resolução conforme o maior tamanho de exibição: largura útil em pixels ≥ largura CSS no zoom inicial × zoom máximo × densidade de pixels pretendida. A margem transparente não conta como largura útil. Exemplo: uma peça de 180 px, com zoom 2× e densidade 2, precisa de pelo menos 720 px úteis de largura.
- Preservar originais; formatos otimizados para o navegador são derivados posteriores. Não prometer zoom infinito para peças rasterizadas.
- Registrar por peça: ID, arquivo, versão, dimensões, caixa ocupada sem margens, ponto de apoio no chão, largura pretendida na prancheta, posição normalizada, camada, presença de sombra, área sugerida de interação e observações de revisão.
- Ponto de apoio: centro da base que toca o chão, relativo ao arquivo completo. A posição do destino deve se referir a esse ponto, não ao centro da imagem ou de sua margem transparente.
- Convenção futura de nomes: `<id>-principal-v01.png`, `<id>-acessorio-v01.png` e `<id>-sombra-v01.png`, quando necessário. Este guia não cria esses arquivos.

## 7. Sequência de produção e critérios de revisão

1. Desenhar o layout vetorial com blocos provisórios dos 20 destinos. Conferir caminhos, ilha, respiro, tamanhos de placas e área reservada para figuras futuras.
2. Produzir três peças piloto: CinemINha, LivrINhoteca e árvore ornamental. Avaliar juntas no tamanho real do mapa, tanto no enquadramento geral quanto no zoom máximo planejado.
3. Ajustar as peças piloto até que compartilhem perspectiva, contorno, paleta e sombras. Usá-las como referências visuais nas gerações seguintes, junto com este guia; um prompt repetido sozinho não garante consistência.
4. Produzir os demais destinos em lotes de quatro ou cinco. Revisar cada lote integrado ao terreno antes de ampliar a produção.
5. Acrescentar acessórios e decoração compartilhada, inserir letreiros por código e corrigir sobreposições. Aplicar textura comum apenas se o conjunto se beneficiar dela.
6. Adaptar interações e validar desktop, toque, teclado, legibilidade e desempenho em uma etapa de implementação posterior.

Uma peça está pronta quando: sua silhueta identifica o destino; os motivos obrigatórios aparecem sem microdetalhe excessivo; a perspectiva e a sombra coincidem com os pilotos; a harmonia com a paleta-base e as cores naturais foi conferida; não há conteúdo proibido; a transparência é real; o objeto não está cortado; e o contorno tem o peso correto após a redução.

O cenário está pronto para integração quando apresenta exatamente 20 destinos únicos, todos com nomes canônicos legíveis, circulação desobstruída, reserva para personagens, ilha sem ponte e unidade visual no enquadramento geral. A checagem também deve ocorrer no zoom máximo, em que defeitos de recorte e resolução ficam visíveis.

## 8. Modelo de pedido para geração futura

> Gere somente a peça [ID / NOME], usando este guia e as peças piloto como referências visuais. Represente [MOTIVOS OBRIGATÓRIOS] na perspectiva isométrica elevada estabelecida, mostrando telhados e duas faces dos volumes, com contornos pretos e cores chapadas orientadas pela paleta-base, permitindo cores naturais harmonizadas para vegetação, grama, troncos, madeira, chão, terra, areia, pedras e outros materiais. Luz no alto à esquerda e sombra gráfica para baixo à direita. Objeto completo, fundo realmente transparente, margem de segurança e nenhuma letra: os letreiros serão aplicados por código. Sem pessoas, animais, rostos ou robôs. Não desenhe terreno, bairro ou decoração não solicitada. Entregue na resolução calculada para a escala e o zoom de uso; avalie a consistência na composição antes de considerar a peça concluída.

Este modelo orienta uma etapa futura. A única entrega desta etapa é o presente guia.
