import React, { useState } from 'react';
import { Globe, Flag } from 'lucide-react';

const MOCK_ON_STAY_CONTRACTS = [
  {
    id: 'contract-sophia',
    officeBrand: 'ÉVORA',
    talentName: 'sophia évora',
    subtitle: 'WITHOUT MOTHER AGENCY',
    endDate: '30 Nov, 26',
  },
];

export default function ContractsDropdown() {
  const [activeTab, setActiveTab] = useState('permanencia'); // 'permanencia' | 'internacional'

  return (
    <div
      className="absolute -right-16 sm:right-0 top-full mt-2.5 w-[calc(100vw-1.5rem)] max-w-[340px] sm:max-w-none sm:w-[430px] bg-[#1c1c1e] border border-white/10 rounded-xs shadow-xl z-50 text-white select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Seta superior apontando para o ícone da pasta */}
      <div className="absolute -top-1.5 right-6 w-3 h-3 bg-[#880E1B] rotate-45" />

      {/* 1. Cabeçalho "Contratos" + Ícone de Globo à direita */}
      <div className="relative bg-[#880E1B] text-white px-3.5 py-2 flex items-center justify-between rounded-t-xs">
        <span className="text-xs font-medium tracking-wide">Contratos</span>
        <button
          type="button"
          title="Visão Global de Contratos"
          className="text-white/90 hover:text-[#E8AC51] transition-colors cursor-pointer"
        >
          <Globe className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 2. Abas Lado a Lado: "Permanência (1)" e "Internacional (0)" */}
      <div className="grid grid-cols-2 border-b border-white/10 text-xs">
        <button
          type="button"
          onClick={() => setActiveTab('permanencia')}
          className={`py-2.5 px-3 flex items-center justify-center gap-2 transition-colors cursor-pointer ${
            activeTab === 'permanencia'
              ? 'bg-[#1c1c1e] text-[#E8AC51] font-medium'
              : 'bg-[#161617] text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-[#880E1B] text-white flex items-center justify-center shrink-0">
            <Flag className="w-2.5 h-2.5 fill-white" />
          </span>
          <span>Permanência (1)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('internacional')}
          className={`py-2.5 px-3 flex items-center justify-center gap-2 border-l border-white/10 transition-colors cursor-pointer ${
            activeTab === 'internacional'
              ? 'bg-[#1c1c1e] text-[#E8AC51] font-medium'
              : 'bg-[#161617] text-neutral-400 hover:text-white'
          }`}
        >
          <span className="w-5 h-5 rounded-full bg-[#880E1B] text-white flex items-center justify-center shrink-0">
            <Globe className="w-2.5 h-2.5" />
          </span>
          <span>Internacional (0)</span>
        </button>
      </div>

      {/* 3. Lista Simulada de Contratos */}
      <div className="p-2 bg-[#1c1c1e]">
        {activeTab === 'permanencia' ? (
          <div className="divide-y divide-white/10">
            {MOCK_ON_STAY_CONTRACTS.map((item) => (
              <div
                key={item.id}
                className="p-2.5 bg-[#161617] hover:bg-[#161617]/80 border border-white/10 rounded-xs flex items-center justify-between gap-3 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Mini Logo ÉVORA */}
                  <div className="w-9 h-9 bg-[#1c1c1e] border border-white/10 rounded-[2px] flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="text-[7px] font-serif font-bold tracking-wider text-[#E8AC51]">
                      {item.officeBrand}
                    </span>
                  </div>

                  {/* Nome e Subtítulo */}
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate leading-tight">
                      {item.talentName}
                    </p>
                    <p className="text-[9px] text-neutral-400 uppercase tracking-wide mt-0.5 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {/* Data de Fim de Contrato alinhada à direita */}
                <div className="text-[10px] text-neutral-400 shrink-0 text-right self-end pb-0.5">
                  <span>Fim de contrato: </span>
                  <strong className="font-semibold text-[#E8AC51]">
                    {item.endDate}
                  </strong>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-6 text-center text-xs text-neutral-400">
            Nenhum contrato internacional ativo no momento.
          </div>
        )}
      </div>
    </div>
  );
}

