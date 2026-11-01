import React, { useState } from 'react';
import { Search } from 'lucide-react';

/**
 * Barra de pesquisa extra específica de Bounced Emails posicionada acima do breadcrumb
 * (Fiel à Imagem 26 `26_webmail_bounced_emails.png`)
 */
export function BouncedEmailsTopBar() {
  const [emailQuery, setEmailQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('🔍 [BouncedEmails] Pesquisa por Email:', emailQuery);
  };

  return (
    <div className="mb-6 border border-slate-200 rounded-xs overflow-hidden shadow-2xs select-none">
      {/* Linha Superior Cinza: Input "Pesquisa por Email" + Botão "PESQUISA" + Cabeçalhos "Hora (UTC)" e "Razão" */}
      <form
        onSubmit={handleSearch}
        className="bg-[#f4f5f7] px-3 py-2 flex flex-wrap items-center gap-6 border-b border-slate-200"
      >
        <div className="flex items-center">
          <div className="flex items-center bg-white border border-slate-200 rounded-l-xs overflow-hidden w-64 sm:w-80">
            <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-200 text-slate-500">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={emailQuery}
              onChange={(e) => setEmailQuery(e.target.value)}
              placeholder="Pesquisa por Email"
              className="w-full px-2.5 py-1 text-xs text-slate-700 placeholder:text-slate-400 outline-none"
            />
          </div>

          <button
            type="submit"
            className="px-3.5 py-1.5 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase rounded-r-xs transition-colors cursor-pointer"
          >
            PESQUISA
          </button>
        </div>

        <div className="flex items-center gap-24 text-[11px] font-bold text-slate-800">
          <span>Hora (UTC)</span>
          <span>Razão</span>
        </div>
      </form>

      {/* Linha Inferior Branca (Estado Vazio fiel à Imagem 26) */}
      <div className="bg-white h-7" />
    </div>
  );
}

export default function BouncedEmails() {
  return (
    <div className="py-4 text-xs text-slate-400 select-none">
      {/* Na Imagem 26, a área à direita da sidebar em Bounced emails permanece limpa pois os resultados ficam na tabela superior */}
    </div>
  );
}

