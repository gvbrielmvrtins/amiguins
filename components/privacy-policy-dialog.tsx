import type { RefObject } from 'react';
import { X } from 'lucide-react';

export default function PrivacyPolicyDialog({ dialogRef }: { dialogRef: RefObject<HTMLDialogElement | null> }) {
  return <dialog ref={dialogRef} className="game-dialog privacy-dialog" aria-labelledby="privacy-policy-title">
    <header className="privacy-dialog-header">
      <h2 id="privacy-policy-title" tabIndex={-1} autoFocus>Política de Privacidade <span>Mapa Oficial da amiguINlândia</span></h2>
      <button className="dialog-close" aria-label="Fechar política de privacidade" onClick={() => dialogRef.current?.close()}><X aria-hidden="true" /></button>
    </header>
    <div className="privacy-dialog-content">
      <p className="privacy-updated"><strong>Última atualização: 24 de outubro de 2026</strong></p>
      <p>O Mapa Oficial da amiguINlândia é uma iniciativa da comunidade <a href="https://amiguins.com" target="_blank" rel="noopener noreferrer">amiguINs</a> que reúne e representa seus integrantes de maneira interativa, com o objetivo de valorizar as conexões e o sentimento de pertencimento à comunidade.</p>
      <p>Esta política explica como os nomes são utilizados e como cada integrante pode solicitar alterações ou sua remoção.</p>

      <section aria-labelledby="privacy-information">
        <h3 id="privacy-information">1. Quais informações são utilizadas?</h3>
        <p>O Mapa utiliza exclusivamente nomes e sobrenomes dos integrantes da comunidade amiguINs, a partir das informações fornecidas em seus processos de inscrição e participação.</p>
        <p>Nenhum outro dado pessoal dos integrantes, como telefone, e-mail, endereço, documento ou localização geográfica, é exibido ou utilizado para compor suas representações no Mapa.</p>
        <p>Para a criação das ilustrações por inteligência artificial, fotos de perfil do LinkedIn são utilizadas apenas como referência visual, em um fluxo de trabalho privado e de acesso restrito. Essas fotos não são publicadas no Mapa nem disponibilizadas no repositório público do projeto. Após o uso, as cópias de trabalho são excluídas manualmente.</p>
      </section>

      <section aria-labelledby="privacy-visibility">
        <h3 id="privacy-visibility">2. Quem pode visualizar o Mapa?</h3>
        <p>O Mapa é público e pode ser acessado por qualquer pessoa, independentemente de fazer parte da comunidade amiguINs.</p>
        <p>Os nomes são exibidos exclusivamente para identificação e representação dos integrantes. Não são utilizados para fins comerciais ou publicitários, nem comercializados pela comunidade.</p>
      </section>

      <section aria-labelledby="privacy-removal">
        <h3 id="privacy-removal">3. Posso alterar ou remover meu nome?</h3>
        <p>Sim. Todos os integrantes têm o direito de solicitar, a qualquer momento:</p>
        <ul>
          <li><strong>Remoção completa:</strong> exclusão de seu nome e representação do Mapa.</li>
          <li><strong>Remoção do sobrenome:</strong> manutenção de sua representação utilizando apenas o primeiro nome ou outra identificação acordada.</li>
          <li><strong>Correção:</strong> ajuste de qualquer informação de identificação apresentada incorretamente.</li>
        </ul>
        <p>As solicitações são gratuitas, não precisam de justificativa e não afetam a participação nas demais atividades da comunidade.</p>
      </section>

      <section aria-labelledby="privacy-contact">
        <h3 id="privacy-contact">4. Como solicitar?</h3>
        <p>Basta enviar um e-mail para <a href="mailto:prefeitura@amiguins.com"><strong>prefeitura@amiguins.com</strong></a> ou entrar em contato diretamente com qualquer integrante da Prefeitura da amiguINlândia.</p>
        <p>A solicitação será encaminhada em tempo real à pessoa responsável pela manutenção do Mapa, para que a alteração seja realizada.</p>
        <p>Após uma remoção completa, a representação não será restaurada automaticamente. Uma eventual reinclusão dependerá de autorização da pessoa interessada e de uma nova inclusão manual.</p>
      </section>

      <section aria-labelledby="privacy-responsibility">
        <h3 id="privacy-responsibility">5. Quem é responsável pelo Mapa?</h3>
        <p>A Prefeitura da amiguINlândia, administração da comunidade amiguINs, é responsável pela manutenção do Mapa e pelo atendimento às solicitações relacionadas à utilização dos nomes.</p>
        <p>A edição das informações é restrita às pessoas autorizadas pela administração.</p>
      </section>

      <section aria-labelledby="privacy-protection">
        <h3 id="privacy-protection">6. Privacidade e proteção de dados</h3>
        <p>A comunidade amiguINs se compromete a respeitar os princípios e direitos previstos na Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), especialmente finalidade, transparência, necessidade e respeito aos direitos dos titulares.</p>
        <p>Dúvidas ou solicitações relativas ao tratamento de dados pessoais podem ser encaminhadas para <a href="mailto:prefeitura@amiguins.com"><strong>prefeitura@amiguins.com</strong></a>.</p>
        <p>Esta política poderá ser atualizada sempre que necessário e sua versão mais recente permanecerá disponível no Mapa.</p>
      </section>

      <p className="privacy-closing"><strong>A amiguINlândia é de todos nós. Como você deseja aparecer nela é uma escolha sua.</strong></p>
      <button className="dialog-primary" onClick={() => dialogRef.current?.close()}>Voltar ao mapa</button>
    </div>
  </dialog>;
}
