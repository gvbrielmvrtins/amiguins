# Segurança e recuperação

## Publicação

Alterações de produção devem entrar por pull request no repositório de publicação `zeheliasm-gif/amiguins`. A verificação `Validar publicação` executa TypeScript, testes das proteções, auditoria de dependências, build estático e inspeção do pacote exportado. O workflow não recebe segredos, usa token somente de leitura e actions fixadas por commit. Não usar `pull_request_target` para executar código de contribuições.

A branch principal deve exigir essa verificação e impedir exclusão e force push, sem bypass. O fluxo permanece no Cloudflare Pages: a prévia valida a branch e o merge na `main` publica em `mapa.amiguins.com`. As regras administrativas do repositório original dependem de seu proprietário.

## CSP

O build calcula hashes dos scripts inline do Next e gera `Content-Security-Policy-Report-Only` no `_headers`. A política permite recursos locais e imagens do domínio R2, não permite scripts inline arbitrários e registra violações no console do navegador. Não bloqueia recursos enquanto estiver em observação. Não há coletor central de relatórios ou novo servidor. Validar mapa, carregamento e menus antes de promover a política para bloqueio. Os estilos inline continuam permitidos porque o mapa usa estilos e SVG dinâmicos.

## Imagens e backup

O backup deve ficar fora do checkout e dos dois repositórios. Para copiar os originais locais:

```sh
node scripts/backup-images.mjs create /caminho/externo/snapshot-novo
node scripts/backup-images.mjs verify /caminho/externo/snapshot-novo
node scripts/backup-images.mjs restore /caminho/externo/snapshot-novo /caminho/novo-para-teste
```

Cada arquivo possui tamanho e SHA-256 no manifesto. A restauração valida o conjunto antes de copiar, recusa destinos existentes, verifica novamente os arquivos restaurados e rejeita caminhos que escapem da pasta. Não inclui `.env`, credenciais nem `node_modules`.

Para uma cópia exata dos objetos públicos do R2, exportar a listagem completa do painel para um JSON privado com `complete: true` e `keys: ["images/..."]`, e executar:

```sh
node scripts/backup-r2-public.mjs /caminho/privado/inventario.json /caminho/externo/r2-snapshot-novo
node scripts/backup-images.mjs verify /caminho/externo/r2-snapshot-novo
```

Esse download usa somente HTTPS público, sem criar tokens ou conceder escrita. Para restaurar no R2, primeiro restaurar em uma pasta local nova, conferir o manifesto e enviar os objetos ao bucket mantendo as chaves. Não remover os objetos de produção como parte de um teste. Preservar também um `git bundle create <arquivo> --all` e verificar com `git bundle verify <arquivo>`. Guardar uma cópia do snapshot em outra máquina ou armazenamento privado protege contra perda deste computador.

## Credenciais e privacidade

Manter 2FA e recuperação sob controle do titular das contas, inclusive do provedor de login. Tokens de upload futuros devem se limitar ao bucket necessário e às operações indispensáveis; não criar tokens administrativos para simples upload. Não expor credenciais em variáveis `NEXT_PUBLIC_*`.

Nomes e ilustrações do mapa são públicos. Registrar autorização, fonte e condições de uso das imagens em um controle privado, não no GitHub. Fotos de referência e capturas de conversas ficam fora de `public` e fora do Git. Uma revisão técnica não comprova consentimento: o responsável precisa confirmar com as pessoas. Se for identificado conteúdo privado no histórico, preparar uma remoção coordenada dos dois repositórios e dos backups afetados; não reescrever histórico público ou revogar credenciais sem avaliar o impacto.
