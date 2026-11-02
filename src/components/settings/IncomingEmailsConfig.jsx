import React from 'react';

export default function IncomingEmailsConfig() {
  return (
    <div className="pt-2">
      {/* Cabeçalho: Título 'Emails de Entrada' + linha horizontal fina */}
      <div className="pb-2.5 mb-8 border-b border-slate-200/90">
        <h2 className="text-[19px] font-normal text-slate-600">
          Emails de Entrada
        </h2>
      </div>

      {/* Empty State centralizado (Imagem 91) */}
      <div className="py-6 text-center">
        <p className="text-xs text-slate-500 font-normal">
          Este recurso não é mais suportado
        </p>
      </div>
    </div>
  );
}

