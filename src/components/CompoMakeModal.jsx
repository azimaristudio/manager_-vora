import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, User, Check, Search } from 'lucide-react';

/**
 * Array mocado de talentos para simular o filtro de busca visual no CompoMake
 */
export const MOCK_COMPOMAKE_TALENTS = [
  { id: 't1', name: 'Sophia Évora', category: 'Modelo • Évora Models' },
  { id: 't2', name: 'Amber Rodrigues', category: 'Modelo • Kids & Teens' },
  { id: 't3', name: 'Helena Valente', category: 'Modelo / Atriz • Fashion' },
  { id: 't4', name: 'Lucas Montenegro', category: 'Ator / Modelo • Comercial' },
  { id: 't5', name: 'Valentina Costa', category: 'Celebridade • Évora Models' },
  { id: 't6', name: 'Gabriel Albuquerque', category: 'Modelo • Internacional' },
];

/**
 * Array estático de opções de desenhos/templates do CompoMake
 */
export const MOCK_COMPOMAKE_DESIGNS = [
  'Compomake Trial',
  'Template Padrão',
  'Évora Classic (5 Fotos)',
  'Editorial High Fashion (3 Fotos)',
  'Polaroid / Snap Card (4 Fotos)',
];

export default function CompoMakeModal({
  isOpen,
  onClose,
  onCreateSuccess,
  initialTalentName = '',
  customTalents = [],
}) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(initialTalentName);
  const [selectedTalent, setSelectedTalent] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(MOCK_COMPOMAKE_DESIGNS[0]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Sincroniza quando o modal abre
  useEffect(() => {
    if (isOpen) {
      setSearchQuery(initialTalentName || '');
      setSelectedTalent(
        initialTalentName ? { id: 'init', name: initialTalentName } : null
      );
      setSelectedDesign(MOCK_COMPOMAKE_DESIGNS[0]);
      setShowSuggestions(false);
    }
  }, [isOpen, initialTalentName]);

  if (!isOpen) return null;

  // Combina talentos mocados padrão com eventuais talentos criados na sessão
  const allTalents = [
    ...customTalents
      .filter((t) => t.stageName)
      .map((t) => ({
        id: t.id,
        name: t.stageName,
        category: `${t.category || 'Modelo'} • ${t.status || 'Ativo'}`,
      })),
    ...MOCK_COMPOMAKE_TALENTS.filter(
      (mock) =>
        !customTalents.some(
          (c) => c.stageName?.toLowerCase() === mock.name.toLowerCase()
        )
    ),
  ];

  // Filtro visual simples pelo nome do talento
  const filteredTalents = allTalents.filter((talent) =>
    talent.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  const handleSelectTalent = (talent) => {
    setSelectedTalent(talent);
    setSearchQuery(talent.name);
    setShowSuggestions(false);
  };

  const handleCreate = (e) => {
    e.preventDefault();

    const payload = {
      talent: selectedTalent || {
        id: 'custom',
        name: searchQuery.trim() || 'sophia évora',
      },
      designTemplate: selectedDesign,
      timestamp: new Date().toISOString(),
    };

    console.log('🎨 [CompoMake] Redirecionando para /compomake:', payload);

    if (onCreateSuccess) {
      onCreateSuccess(payload);
    }

    onClose();
    navigate('/compomake', { state: payload });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] flex items-center justify-center p-4 select-none animate-in fade-in duration-150"
      onClick={onClose}
    >
      {/* Caixa do Modal Flutuando Centralizada */}
      <div
        className="bg-white rounded-sm shadow-2xl w-full max-w-[500px] border border-slate-200 overflow-visible relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 1. CABEÇALHO DO MODAL */}
        <div className="relative px-6 pt-5 pb-3 flex items-center justify-center">
          <div className="flex items-baseline gap-2">
            <h2 className="text-[22px] font-normal text-slate-700 tracking-tight">
              CompoMake
            </h2>
            <a
              href="#tutorial-compomake"
              onClick={(e) => {
                e.preventDefault();
                console.log('📖 [CompoMake] Link de TUTORIAL acionado.');
              }}
              className="text-[10px] font-semibold text-[#5bc0de] hover:text-[#0077b5] uppercase tracking-wider transition-colors"
            >
              TUTORIAL
            </a>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar modal CompoMake"
            className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-xs transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.2]" />
          </button>
        </div>

        {/* 2. CORPO DO MODAL (Layout em Duas Colunas fiel à imagem 09_comomake.png) */}
        <form onSubmit={handleCreate} className="px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
            {/* Coluna Esquerda: Grande Caixa Azul com Ícone de Perfil + Grid 2x2 */}
            <div className="sm:col-span-5 flex justify-center">
              <div className="w-44 h-32 bg-[#0077b5] rounded-md p-3.5 flex items-center justify-between gap-2.5 shadow-sm">
                {/* Bloco Branco Esquerdo: Silhueta de Perfil */}
                <div className="w-1/2 h-full bg-white rounded-xs flex flex-col items-center justify-end overflow-hidden pt-2">
                  <User className="w-14 h-14 text-[#0077b5] fill-[#0077b5] translate-y-1.5" />
                </div>

                {/* Bloco Direito: Grid 2x2 de Fotos do Composite */}
                <div className="w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-1.5">
                  <div className="bg-white rounded-[2px]" />
                  <div className="bg-white rounded-[2px]" />
                  <div className="bg-white rounded-[2px]" />
                  <div className="bg-white rounded-[2px]" />
                </div>
              </div>
            </div>

            {/* Coluna Direita: Inputs "Selecione um talento" e "Selecionar um desenho" */}
            <div className="sm:col-span-7 space-y-3.5">
              {/* Campo 1: Selecione um talento (com filtro de busca visual) */}
              <div className="relative">
                <label className="block text-[13px] font-normal text-slate-600 mb-1.5">
                  Selecione um talento
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onFocus={() => setShowSuggestions(true)}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setSelectedTalent(null);
                      setShowSuggestions(true);
                    }}
                    placeholder="Pesquisar Talento..."
                    className="w-full pl-3 pr-8 py-1.5 text-xs text-slate-700 placeholder:text-slate-400 bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none transition-colors"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                {/* Dropdown de resultados filtrados do array mocado */}
                {showSuggestions && (
                  <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white border border-slate-200 rounded-xs shadow-lg max-h-40 overflow-y-auto divide-y divide-slate-100">
                    {filteredTalents.length > 0 ? (
                      filteredTalents.map((talent) => {
                        const isSelected = selectedTalent?.id === talent.id;
                        return (
                          <button
                            key={talent.id}
                            type="button"
                            onClick={() => handleSelectTalent(talent)}
                            className="w-full px-3 py-2 text-left hover:bg-sky-50 flex items-center justify-between transition-colors cursor-pointer"
                          >
                            <div>
                              <p className="text-xs font-semibold text-slate-700 capitalize">
                                {talent.name}
                              </p>
                              <p className="text-[10px] text-slate-400">
                                {talent.category}
                              </p>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-[#0077b5]" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-3 py-2 text-[11px] text-slate-400">
                        Nenhum talento encontrado para &ldquo;{searchQuery}&rdquo;
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Campo 2: Selecionar um desenho */}
              <div>
                <label className="block text-[13px] font-normal text-slate-600 mb-1.5">
                  Selecionar um desenho
                </label>
                <select
                  value={selectedDesign}
                  onChange={(e) => setSelectedDesign(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none cursor-pointer"
                >
                  {MOCK_COMPOMAKE_DESIGNS.map((designName) => (
                    <option key={designName} value={designName}>
                      {designName}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 3. RODAPÉ DO MODAL: Botões FECHAR (cinza) e CRIAR (azul) */}
          <div className="mt-6 pt-3 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-[#e6e6e6] hover:bg-slate-300 text-slate-600 text-[11px] font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
            >
              FECHAR
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-[#5bc0de] hover:bg-[#31b0d5] active:scale-[0.99] text-white text-[11px] font-semibold uppercase tracking-wider rounded-xs shadow-2xs transition-all cursor-pointer"
            >
              CRIAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

