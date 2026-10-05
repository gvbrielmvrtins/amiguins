# Estratégia de composição e renderização do mapa

Diretriz estabelecida pelo usuário em 03/10/2026 para as próximas solicitações de construção ou renderização de ambientes. Complementa o guia de produção e prevalece sobre orientações antigas que contrariem esta sequência ou a identidade das peças já estabelecidas.

**Prédio e elementos principais em baixa fidelidade → renderização individual via imagegen → integração e conferência no mapa.**

## 1. Consultar e reutilizar o acervo

Antes de criar um objeto, consultar `public/images/modular/` e os cadastros em `lib/map-pilot-assets.ts`, `lib/pilot-landscape.ts` e `components/pilot-landscape-prop.tsx`.

Se o elemento já existe e vai se repetir, reutilizar diretamente sua ilustração, ajustando somente escala uniforme e posição quando necessário. Não refazer o modelo simplificado nem chamar imagegen para produzir outra cópia. Gerar uma variante apenas quando o pedido ou uma diferença real de função e desenho exigir.

## 2. Compor os elementos inéditos em baixa fidelidade

Representar primeiro o prédio e os elementos principais novos com volumes simples em código/SVG. Essa etapa resolve a organização espacial, não o acabamento visual:

- Definir terreno, ponto de apoio, orientação e escala de cada peça.
- Manter os eixos isométricos do mapa, paredes verticais e ordenação por profundidade.
- Distribuir elementos característicos do uso de cada ambiente.
- Manter construções dentro dos lotes, recuos visíveis, portas acessíveis e ruas livres.
- Reservar espaço para personagens, filas, encontros e pessoas sentadas no futuro.
- Misturar os modelos provisórios com as peças prontas reutilizadas para avaliar a composição real.

Conferir o arranjo no navegador e corrigir encaixes antes de investir na renderização. Não expandir o trabalho para áreas fora do escopo solicitado. Não é necessário pedir aprovação intermediária por padrão.

## 3. Renderizar uma peça por vez via imagegen

Aplicar a skill imagegen e usar a ferramenta integrada. Fazer uma chamada específica por elemento novo, com atenção ao seu material, construção, contorno, volume e detalhes. Inspecionar cada resultado antes de seguir para a próxima peça. Não gerar o ambiente inteiro como uma imagem única para substituir os objetos modulares.

Sempre fornecer os primeiros elementos como referências visuais explícitas, identificando-os no prompt como referências de estilo, não como objetos a reproduzir. Referências fundamentais:

- `public/images/modular/cineminha-isometrico-v01.png`: arquitetura, contornos, molduras, cores e acabamento.
- `public/images/modular/rosa-arvore-isometrica-v01.png`: vegetação, folhas, materiais naturais e nível de detalhamento.
- Conforme o contexto, complementar com a biblioteca, o vagão ou o mercado originais em suas versões isométricas.
- Para móveis e ornamentos, acrescentar peças detalhadas existentes, como `poste-detalhado-v01.png`, `pipoca-detalhada-v01.png` e `floreira-detalhada-v01.png`, sem abandonar as referências fundamentais.

Manter uma identidade comum: ilustração retrô-pop com contornos escuros trabalhados, volumes legíveis, peças e molduras sobrepostas, sombras e realces controlados, paleta do mapa e cores naturais harmonizadas. O detalhamento deve acompanhar as construções e a árvore, evitando o aspecto de ícone geométrico simplificado. Conferir a leitura no tamanho de uso, não apenas na imagem ampliada.

Solicitar vista isométrica elevada com eixos de chão a ±30°, verticais preservadas, iluminação consistente, objeto inteiro e fundo transparente. Não adicionar pessoas, textos ou elementos alheios ao pedido. O refinamento deve respeitar a função e a silhueta planejadas na composição.

## 4. Substituir e validar individualmente

Salvar cada arquivo final no projeto com nome descritivo e versionado. Substituir o modelo provisório pela imagem, preservando o ponto de apoio e a área ocupada planejada. Ajustar a âncora considerando as margens transparentes; não duplicar sombras incorporadas.

Verificar transparência, proporções, alinhamento, nível de acabamento e sobreposições no navegador. Se a silhueta exigir ajuste de escala ou posição, preservar os recuos, entradas e reservas para personagens. Corrigir a peça que destoar antes de considerar o ambiente concluído.

Registrar arquivos, referências e prompts executados na documentação da etapa. Executar as verificações de código adequadas à integração. Modelos de baixa fidelidade só permanecem como entrega quando o pedido for especificamente um estudo de composição ou quando a limitação estiver explicitada.

## Exemplo de aplicação

Ao montar um novo café, reutilizar árvores, floreiras, postes e mesas já existentes. Criar apenas o prédio e os objetos inéditos em baixa fidelidade; acertar o lote e os acessos; renderizar o café e cada objeto novo separadamente com as referências fundamentais; integrar e conferir o conjunto. Não regenerar os elementos reutilizados.

## Referência permanente da composição

Diretriz de 03/10/2026: usar sempre a composição já construída como referência visual de implantação, escala, orientação, paleta e relação entre volumes e espaços livres. As demarcações são guias flexíveis. Áreas de preenchimento podem receber residências, comércios cotidianos e parques, sem criar novos destinos nomeados da vila.
