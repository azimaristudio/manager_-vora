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
      <div className="w-full bg-[#161617] border border-white/10 rounded-sm px-4 py-2.5 mb-7 flex items-center gap-2 text-xs text-neutral-400">
        <Link
          to="/"
          className="text-[#E8AC51] hover:underline font-normal cursor-pointer"
        >
          Início
        </Link>
        <span>&gt;</span>
        <span className="text-neutral-400">Background Trabalhos</span>
      </div>

      {/* 2. Título e Descrição */}
      <div className="mb-5">
        <h1 className="text-[15px] font-bold text-white tracking-tight">
          Trabalhos em segundo plano
        </h1>
        <p className="text-xs text-neutral-400 mt-1">
          Acompanhe e baixe suas exportações.
        </p>
      </div>

      {/* 3. Barra de Ações: Botão "Downloads" (esquerda) e "ATUALIZAR" (direita) */}
      <div className="flex items-center justify-between gap-4 mb-2">
        <button
          type="button"
          className="px-4 py-2.5 bg-[#1c1c1e] hover:bg-[#1c1c1e] border border-white/10 rounded-md shadow-2xs flex items-center gap-2 text-xs font-bold text-white transition-colors cursor-pointer"
        >
          <FileDown className="w-4 h-4 text-white stroke-[2.2]" />
          <span>Downloads</span>
        </button>

        <button
          type="button"
          onClick={handleRefresh}
          className="px-3.5 py-2 bg-[#880E1B] hover:bg-[#a31121] active:scale-[0.99] text-white text-[11px] font-semibold uppercase tracking-wider rounded-sm shadow-2xs flex items-center gap-1.5 transition-all cursor-pointer"
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
        <span className="text-[11px] text-neutral-400">0 Tarefas</span>
      </div>

      {/* 5. Tabela com Cabeçalho e Empty State */}
      <div className="w-full bg-[#1c1c1e] border border-white/10 rounded-md overflow-hidden shadow-2xs">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-white/10 bg-[#1c1c1e] text-xs font-bold text-white">
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
              <td colSpan={6} className="bg-[#161617] py-14 px-6 text-center">
                <div className="flex flex-col items-center justify-center max-w-sm mx-auto">
                  {/* Ícone de documento/download em caixa arredondada cinza */}
                  <div className="w-9 h-9 rounded-md bg-[#1c1c1e] text-white flex items-center justify-center mb-3">
                    <FileDown className="w-4 h-4 stroke-[2.2]" />
                  </div>

                  <p className="text-xs font-bold text-white">
                    Nenhum trabalho em segundo plano ainda
                  </p>
                  <p className="text-[11px] text-neutral-400 mt-1">
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

