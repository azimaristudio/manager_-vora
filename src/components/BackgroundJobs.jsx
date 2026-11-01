import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileDown, RefreshCw } from 'lucide-react';

export default function BackgroundJobs() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    console.log('🔄 [BackgroundJobs] Lista de trabalhos em segundo plano atualizada.');
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <div className="w-full max-w-[1040px] mx-auto pb-20 select-none">
      {/* 1. Topo: Breadcrumb "Início > Background Trabalhos" */}
      <div className="w-full bg-[#f8f9fa] border border-slate-200/90 rounded-sm px-4 py-2.5 mb-7 flex items-center gap-2 text-xs text-slate-400">
        <Link
          to="/"
          className="text-[#0077b5] hover:underline font-normal cursor-pointer"
        >
          Início
        </Link>
        <span>&gt;</span>
        <span className="text-slate-400">Background Trabalhos</span>
      </div>

      {/* 2. Título e Descrição */}
      <div className="mb-5">
        <h1 className="text-[15px] font-bold text-slate-800 tracking-tight">
          Trabalhos em segundo plano
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Acompanhe e baixe suas exportações.
        </p>
      </div>

      {/* 3. Barra de Ações: Botão "Downloads" (esquerda) e "ATUALIZAR" (direita) */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <button
          type="button"
          className="px-4 py-2.5 bg-white hover:bg-slate-50 border border-slate-200 rounded-md shadow-2xs flex items-center gap-2 text-xs font-bold text-slate-800 transition-colors cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-slate-800 stroke-[2.2]" />
          <span>Downloads</span>
        </button>

        <button
          type="button"
          onClick={handleRefresh}
          className="px-3.5 py-2 bg-[#0077b5] hover:bg-[#006399] active:scale-[0.99] text-white text-[11px] font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 stroke-[2.5] ${
              isRefreshing ? 'animate-spin' : ''
            }`}
          />
          <span>ATUALIZAR</span>
        </button>
      </div>

      {/* 4. Contador "0 Tarefas" alinhado à direita acima da tabela */}
      <div className="flex justify-end mb-1.5">
        <span className="text-[11px] text-slate-400">0 Tarefas</span>
      </div>

      {/* 5. Tabela com Cabeçalho e Empty State */}
      <div className="w-full bg-white border border-slate-200 rounded-md overflow-hidden shadow-2xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-white text-xs font-bold text-slate-800">
              <th className="py-3 px-4 w-[32%]">Tarefa</th>
              <th className="py-3 px-4 w-[15%]">Usuário</th>
              <th className="py-3 px-4 w-[16%]">Data / hora</th>
              <th className="py-3 px-4 w-[15%]">Progresso</th>
              <th className="py-3 px-4 w-[12%]">Status</th>
              <th className="py-3 px-4 w-[10%] text-right">Ações</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={6} className="bg-[#fbfcfd] py-14 px-6 text-center">
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                  {/* Ícone de documento/download em caixa arredondada cinza */}
                  <div className="w-9 h-9 rounded-md bg-slate-200/75 text-slate-700 flex items-center justify-center mb-3">
                    <FileDown className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <p className="text-xs font-bold text-slate-700">
                    Nenhum trabalho em segundo plano ainda
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Quando você iniciar uma exportação, ela aparecerá aqui.
                  </p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

