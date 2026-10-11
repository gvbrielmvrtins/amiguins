# Armazenamento de deployments

Auditoria em 11/10/2026 no painel da equipe Zé (`ze-ead3`): Deployment Storage 9,52 GB / 10 GB, todo atribuído ao projeto `amiguins`. Functions Storage: 28,81 MB; Fast Data Transfer: 11,02 GB / 100 GB. O domínio personalizado não altera esses limites.

## Retenção aplicada

Com autorização do usuário, as quatro categorias do projeto foram alteradas de 30 dias para 1 dia e confirmadas após recarregar o painel. A Vercel preserva a produção com alias, os últimos três deployments e as últimas três produções Ready, além das demais exceções documentadas. A limpeza em segundo plano normalmente ocorre em até 48 horas; o consumo não precisa cair imediatamente.

## Publicações menores

`scripts/prepare-deployment-assets.mjs` roda antes do build. Somente em `VERCEL=1`, move as imagens históricas revisadas do manifesto para fora de `public`, dentro da cópia descartável do build. Não apaga os originais do Git ou da máquina do usuário. Builds locais não alteram as imagens.

São 54 imagens e 80,4 MB a menos por publicação, em relação a aproximadamente 389 MiB no diretório original. Arquivos novos permanecem incluídos por padrão. Se uma imagem histórica voltar a ser mencionada no código de app, components ou lib, será incluída automaticamente. Arquivos usados por caminhos construídos dinamicamente exigem retirar a imagem do manifesto antes de reutilizá-la.

Auditoria: `npm run assets:audit`. Foi testado em cópia isolada: preservação dos bytes, reativação de referência, permanência do Tiago atual e execução repetida.

As alterações do build só passam a valer depois de publicar o código. Não há cobrança de otimização de imagens: continua `images.unoptimized: true`.

Para novos personagens: evitar enviar variantes antigas para public; registrar versões descartadas no manifesto após revisar referências. Agrupar alterações em uma publicação reduz o número de cópias coexistindo dentro do período de retenção. Se o próprio deployment crescer muito ou houver muitas publicações diárias, será necessário rever o tamanho dos assets; esta medida não promete capacidade ilimitada.

Fontes: https://vercel.com/docs/deployment-retention e https://vercel.com/docs/deployment-storage/optimize.
