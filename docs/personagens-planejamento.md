# Pessoas encontradas no mapa

Diretriz de 05/10/2026. Produzir uma pessoa por vez a partir da descrição do usuário, utilizando a skill imagegen e a ferramenta integrada. Primeira entrega: versão visual de Gabriel Martins para avaliação. A integração no mapa é a etapa seguinte à definição desta aparência.

## Fluxo de produção

1. Registrar ficha: nome, tom de pele, cabelo, barba, traços do rosto, roupa, acessórios e pose. Distinguir características informadas de escolhas visuais provisórias.
2. Consultar o acervo e usar explicitamente o cinema isométrico e a árvore original como referências de acabamento, câmera, contornos e iluminação. Depois de definida a primeira pessoa, usá-la também como referência de proporções para as demais.
3. Gerar individualmente o personagem inteiro em PNG transparente, em vista isométrica elevada, com rosto legível e margem em torno da silhueta. Manter as características reconhecíveis quando reduzidas; evitar detalhes excessivamente pequenos.
4. Avaliar rosto, cabelo, roupa, acessório, anatomia das mãos e pés, perspectiva e harmonia com o cenário. Ajustar a imagem usando a versão anterior como referência de identidade, salvando versões sem sobrescrever.
5. Preparar a integração: registrar arquivo, dimensões, limites úteis do alfa, âncora entre os pés, orientação e escala. Partir da reserva de 35–50 unidades de altura do guia, calibrando a escala com portas, bancos e outras pessoas.
6. Posicionar a pessoa em área de circulação reservada, ordenar pela profundidade dos pés e conferir oclusões, transparência, contraste, escala e sombra no navegador. Reutilizar o sprite quando a pose se repetir.
7. Acrescentar outras poses ou direções apenas quando necessárias. Para encontros interativos, definir separadamente área clicável, nome acessível e conteúdo do encontro; não inventar biografia ou diálogos a partir da aparência.

## Padrão visual

- Ilustração retrô-pop, contornos escuros trabalhados, volumes legíveis, sombras e realces controlados; mesmo acabamento do cinema e da árvore.
- Câmera ortográfica elevada aproximadamente 35°, chão com eixos a ±30°, verticais preservadas. Pose inicial em três quartos voltada para baixo e à direita.
- Pele e cabelo em cores naturais; roupa harmonizada com a paleta do cenário. Luz superior esquerda.
- Proporções adultas estilizadas com leve aumento da cabeça para leitura facial; conferir a proposta visual antes de adotá-la como padrão definitivo.
- Fundo realmente transparente, sem cenário ou placa de identificação incorporada. Evitar sombra duplicada na integração.

As restrições antigas a pessoas nos prompts de arquitetura não se aplicam a esta etapa, solicitada expressamente pelo usuário. A estratégia de composição de ambientes continua vigente; esta etapa define o fluxo específico de personagens.

## Gabriel Martins — v01

Características fornecidas: pessoa branca; camisa de botão, bermuda e chinelo; cabelo enrolado de comprimento médio; barba totalmente preenchida e não muito grande; olhos grandes, nariz arredondado e boca perceptível; segurando um balde de pipoca.

Escolhas provisórias para avaliação: cabelo e barba castanho-escuros, camisa azul de manga curta, bermuda coral, expressão acolhedora e balde com listras coral e creme segurado com as duas mãos. Sem foto de referência, a aparência é uma interpretação da descrição.

Referências explícitas: `public/images/modular/cineminha-isometrico-v01.png` e `public/images/modular/rosa-arvore-isometrica-v01.png`.

Entrega prevista: `public/images/characters/gabriel-martins-v01.png`. Prompt executado em `docs/gabriel-martins-v01-prompt.txt`. Método: ferramenta integrada imagegen, sem fallback CLI.

### Integração na porta do cinema

Integrado em 05/10/2026, a pedido do usuário, em `components/pink-map-district.tsx`. PNG original de 1024 × 1536, exibido em retângulo de 30 × 45 unidades locais, posição (18, -54) relativa à âncora do cinema, antes da escala global de 0,75. Pés apoiados junto à soleira, considerando a margem transparente. Renderizado após o prédio e fora da correção de perspectiva arquitetônica, preservando as proporções do personagem. Sem sombra adicional nem interação própria. Posição e escala conferidas no navegador.

### Personagem encontrável e novo posicionamento

Atualização de 05/10/2026: Gabriel passou para o canto direito do lote do cinema, no ponto de chão (415, 570). Cadastro compartilhado em `lib/map-characters.ts`; renderização independente do cinema, com ordenação por profundidade em `components/modular-map.tsx`. Integra a categoria Pessoas, o progresso total (21 itens), as dicas e o reinício. Clique validado no navegador: incremento de uma descoberta e indicação Pessoas 1/1, preservando os espaços já encontrados. Botões de instruções, reinício e dica exibem apenas ícones com nomes acessíveis. TypeScript sem erros. Evidência: `docs/proofs/gabriel-encontravel-v01.png`.
