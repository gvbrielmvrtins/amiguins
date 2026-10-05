# Padrão de paisagismo dos quatro terrenos piloto

Para novas seções, seguir a [estratégia de composição e renderização](mapa-estrategia-composicao.md): baixa fidelidade apenas para peças inéditas, refinamento individual via imagegen e reutilização direta do acervo existente.

Escopo: Vagão feminINo, CinemINha, LivrINhoteca, Mercado de vagas e as duas passagens entre eles. Os outros terrenos, as reservas de expansão e a ilha não recebem ornamentos nesta etapa.

## Linguagem visual

- Contornos escuros, cores chapadas azul/coral/rosa/amarelo e sombras curtas.
- Verde e madeira naturais harmonizados com a paleta existente.
- Calçada creme com espessura aparente, quinas arredondadas e uma faixa colorida por destino.
- Mobiliário em projeção de ±30°, com verticais preservadas. Árvores reutilizam a ilustração já aprovada no projeto.
- A posição no chão determina a ordem de desenho junto com os edifícios, evitando árvores e móveis desenhados por cima de tudo.

## Composição por uso

- **Vagão:** relógio de estação, árvore e floreira. O banco de espera foi removido a pedido do usuário. Embarque e escada permanecem livres.
- **Cinema:** carrinho de pipoca, cartaz existente, árvore, floreira e dois balizadores que sugerem o espaço de fila sem fechá-lo. O banco foi removido a pedido do usuário.
- **Biblioteca:** mesa de leitura com livro e dois assentos, banco existente, árvore, floreira e livros decorativos.
- **Mercado de vagas:** mural com cartões sem texto, mesa para conversas com dois assentos, árvore e floreira. Área diante dos balcões livre para atendimento.
- **Ruas internas:** piso claro com juntas discretas e iluminação nas bordas. A faixa central de circulação não recebe mobiliário.

## Espaço para personagens

Concentrar elementos permanentes nas faixas laterais e no fundo dos lotes. Não preencher o vazio diante das portas com enfeites. Mesas mantêm assentos vazios; o cinema reserva espaço para fila e o mercado, para conversas e atendimento. As passagens têm uma faixa central de 49 unidades lógicas livre de postes. Árvores usam copa pequena em relação ao edifício para não esconder sua identidade.

## Implementação reutilizável

`lib/pilot-landscape.ts` centraliza lotes, cores e posições dos ornamentos. `components/pilot-landscape-prop.tsx` contém os móveis e volumes em isometria. `components/pink-map-study.tsx` desenha pisos, jardins e ruas. `components/modular-map.tsx` intercala ornamentos e edifícios pela profundidade.

Para ampliar o padrão, cadastrar um novo lote com sua cor de contorno, reservar primeiro as entradas e áreas de personagens, escolher poucos móveis associados ao uso e só então inserir árvores e pequenos detalhes. Não copiar automaticamente a densidade de objetos para terrenos menores.
