# Planta de terrenos da vila

A estrutura de lotes foi estendida aos vinte destinos da prévia modular. As quatro construções ilustradas e seus lotes do bloco rosa foram preservados. Os demais módulos ficam centralizados pela projeção de sua base no chão, não pela posição do letreiro ou do telhado.

Os terrenos variam entre retângulos de cantos arredondados, elipses e contornos orgânicos. PracINha e Plaza hispanica têm terrenos circulares, projetados pela mesma transformação isométrica do chão. Nesta revisão, os lotes são independentes.

Amarelo identifica os terrenos/calçadas; azul claro identifica o espaço contínuo de circulação ao redor dos lotes; verde identifica reservas de vegetação. Os caminhos anteriores que atravessavam os módulos foram retirados. Esta é uma planta de estudo: acabamento de pavimentação, meios-fios e paisagismo continuam para etapas posteriores.

EspacIN ColoridIN, Estúdio criativINs e os dois módulos seguintes a oeste foram recuados para abrir passagem junto ao bloco rosa. Países africanos foi centralizado no interior da ilha, que continua separada por água e sem ponte. As reservas de expansão e o enquadramento sem água excedente foram mantidos. O mapa atual permanece disponível para comparação.

## Revisão atual — etapa 1: terrenos e espaços livres

Esta revisão substitui a representação azul da circulação descrita acima. O fundo creme representa espaço ainda não destinado: não é uma rua pronta. A rede viária será desenhada somente na etapa 2.

- Os vinte destinos e as quatro ilustrações foram preservados, assim como a PracINha circular e a ilha sem ponte.
- LinkedIn e SilicIN Valley compartilham um terreno alongado com extremidades arredondadas, acompanhando as duas bases. Os demais lotes mantêm suas formas e posições.
- Reservas verdes definidas ao norte do centro, oeste, leste e entre o centro e o setor sul.
- Reservas bege com contorno tracejado indicam expansão para futuras construções, incluindo as áreas livres ao norte e oeste do bloco rosa.
- Dois largos em amarelo suave criam áreas abertas entre prefeitura/taverna e junto ao conjunto de tecnologia.
- Os intervalos restantes ficam livres para projetar conexões ao redor dos lotes. Não foram acrescentados acessos, texturas, meios-fios nem novas ilustrações.

Validação: TypeScript sem erros e inspeção visual no localhost. Etapa 1 entregue para revisão; etapas 2–4 pendentes.

## Etapa 2 — rede de ruas

Ruas em creme com contorno simples agora se distinguem do fundo cinza quente (espaço ainda livre). A rede reúne circuito principal, conexões do bloco rosa, setor leste e ligações central e sudoeste. Os cruzamentos recebem preenchimento contínuo. A ilha tem passeio em circuito próprio, sem ponte.

O traçado usa as coordenadas do chão e a mesma transformação isométrica dos terrenos. O gerador `scripts/generate-study-roads.py` desvia das áreas de exclusão dos lotes e reservas; `lib/map-study-roads.ts` guarda os caminhos resultantes. A largura é constante, 40 unidades do plano no continente e 24 na ilha. As construções, lotes e reservas da etapa 1 foram mantidos. Calçadas detalhadas e acabamento continuam pendentes para as próximas etapas.

### Correção de largura e cobertura do sudoeste

As ruas continentais passaram de 40 para 64 unidades (+60%), com contorno de 68 e áreas de exclusão recalculadas. A remoção automática de ramais foi retirada porque apagava ruas inteiras do sudoeste. Foram incluídas conexões para Departamento dos xerifINs, Estúdio criativINs, EspacIN ColoridIN, INglish pub, Oficina de vendinhas e BINstrô.

Para permitir a passagem, Departamento, pub, oficina e bistrô foram espaçados no eixo sul; o terreno continental foi estendido nessa borda e a reserva de expansão sul acompanhou a mudança. A faixa verde oeste foi estreitada. As quatro ilustrações e os vinte destinos foram preservados. O passeio insular permanece independente, com sua largura própria.

### Revisão das curvas e junções

A geração agora encadeia cada rua a partir dos cruzamentos, evitando cortar uma curva em vários trechos. Segmentos idênticos são eliminados e ramais residuais de até 140 unidades são removidos sem apagar as ligações longas do setor sul. As transições usam curvas mais amplas; a passagem junto à Plaza hispanica usa arco circular SVG.

O perímetro real do continente passou a participar do cálculo: o eixo das ruas mantém pelo menos 70 unidades de distância da costa antes da suavização. A PrefeINtura foi deslocada 60 unidades no eixo do terreno para liberar a conexão entre o cruzamento do mercado e a rua posterior. A rua da ilha de Países africanos foi removida, conforme solicitado.

Mantidas a largura de 64 unidades, a baixa fidelidade e as construções. Conferência visual realizada no localhost, incluindo prefeitura, Plaza e ilha; TypeScript sem erros.
