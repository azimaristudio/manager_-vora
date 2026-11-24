import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  ChevronDown,
  CheckSquare,
  Square,
  CheckCircle2,
  X,
  SlidersHorizontal,
} from 'lucide-react';
import Header from './Header';
import FilterSidebar from './FilterSidebar';
import CompoMakeModal from './CompoMakeModal';
import { TalentCardSkeleton, TableRowSkeleton } from './ui/Skeleton';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const TALENT_QUICK_LINKS = [
  { group: 1, items: ['Info', 'Agenda', 'Atividades', 'Contratos', 'Vôos'] },
  { group: 2, items: ['Compo', 'Book', 'Snaps', 'Video'] },
  { group: 3, items: ['Docs'] },
];

const INITIAL_MOCK_TALENTS = [
  {
    id: 'talent-sophia-evora',
    stageName: 'sophia évora',
    fullName: 'sophia egito',
    initial: 'S',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    status: 'Ativo',
    coverUrl: null,
  },
];

export default function AppLayout({
  onOpenAddTalent,
  hideSidebar = false,
  hideSubHeader = false,
  customTalents,
  isLoading: externalLoading,
  children,
}) {
  const navigate = useNavigate();
  const [activeLetter, setActiveLetter] = useState('ALL'); // 'ALL' ou A-Z
  const [viewMode, setViewMode] = useState('CARDS'); // 'CARDS' | 'LIST'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [isCompoMakeOpen, setIsCompoMakeOpen] = useState(false);
  const [compoToast, setCompoToast] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [localLoading, setLocalLoading] = useState(!children);

  const isLoading = externalLoading ?? localLoading;

  useEffect(() => {
    if (children) return;
    const timer = setTimeout(() => {
      setLocalLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, [children]);

  const talentsList = customTalents || INITIAL_MOCK_TALENTS;

  const filteredTalents = talentsList.filter((t) => {
    const matchesLetter = activeLetter === 'ALL' || t.initial === activeLetter;
    const matchesSearch =
      !searchQuery.trim() ||
      t.stageName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.fullName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  const toggleSelectTalent = (id) => {
    setSelectedTalents((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAllTalents = () => {
    if (selectedTalents.length === filteredTalents.length) {
      setSelectedTalents([]);
    } else {
      setSelectedTalents(filteredTalents.map((t) => t.id));
    }
  };

  const handleAddTalentClick = () => {
    if (onOpenAddTalent) {
      onOpenAddTalent();
    } else {
      navigate('/talentos/novo');
    }
  };

  return (
    <div className="min-h-screen bg-[#161617] text-white flex flex-col font-sans">
      {/* 1. CABEÇALHO SUPERIOR (Header.jsx com Link para "/" no logótipo Pose Manager) */}
      <Header
        onOpenCompoMake={() => setIsCompoMakeOpen(true)}
        onToggleMobileFilters={
          !hideSidebar ? () => setIsMobileFilterOpen((prev) => !prev) : undefined
        }
      />

      {/* 2. SUB-CABEÇALHO PADRÃO (Breadcrumbs "Início > Talentos" + Busca Global) */}
      {!hideSubHeader && (
        <div className="w-full border-b border-white/10 bg-[#161617]">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#161617] border-x border-white/10">
            {/* Breadcrumb com Link "Início" apontando para "/" */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Link
                  to="/"
                  className="text-[#E8AC51] hover:underline cursor-pointer"
                >
                  Início
                </Link>
                <span>&gt;</span>
                <span className="text-neutral-400">Talentos</span>
              </div>

              {!hideSidebar && (
                <button
                  type="button"
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="md:hidden inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] font-semibold text-[#E8AC51] cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>FILTROS</span>
                </button>
              )}
            </div>

            {/* Barra de Busca "Buscar Talento" + Botão "+" (Agregar Talento) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-[#1c1c1e] border border-white/10 rounded-xs overflow-hidden focus-within:border-[#880E1B] transition-colors w-full sm:w-64">
                <span className="px-2.5 py-1.5 bg-[#161617] border-r border-white/10 text-neutral-400">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar Talento"
                  className="w-full px-2.5 py-1 text-xs text-white placeholder:text-neutral-400 bg-transparent outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleAddTalentClick}
                title="Agregar Novo Talento"
                className="px-2.5 py-1.5 bg-[#880E1B] hover:bg-[#a31121] text-white rounded-xs shadow-2xs transition-colors flex items-center justify-center cursor-pointer shrink-0"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Drawer Mobile para a Sidebar de Filtros (visível apenas em telas < md) */}
      {!hideSidebar && isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden bg-black/70 backdrop-blur-xs flex"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="w-72 max-w-[85vw] bg-[#161617] border-r border-white/10 h-full p-4 overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-[#E8AC51]">
                Filtros de Talentos
              </span>
              <button
                type="button"
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-neutral-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <FilterSidebar />
          </div>
        </div>
      )}

      {/* 3. CORPO PRINCIPAL */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto p-4 md:px-8 md:py-5 flex flex-col md:flex-row items-start gap-5">
        {!hideSidebar && (
          <div className="hidden md:block shrink-0">
            <FilterSidebar />
          </div>
        )}

        <section className="flex-1 w-full min-w-0">
          {children ? (
            children
          ) : (
            <>
              {/* Barra Alfabética (MOSTRAR TUDO + A..Z + SELECIONAR TUDO + AÇÕES) */}
              <div className="bg-[#1c1c1e] border border-white/10 rounded-xs p-1 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveLetter('ALL')}
                    className={`px-2.5 py-1 rounded-xs text-[11px] font-semibold uppercase flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeLetter === 'ALL'
                        ? 'bg-[#880E1B] hover:bg-[#a31121] text-white'
                        : 'text-neutral-400 hover:bg-[#161617] hover:text-white'
                    }`}
                  >
                    <span>MOSTRAR TUDO</span>
                    <span className="px-1 py-0.2 bg-[#161617] text-[#E8AC51] rounded-xs text-[10px] font-bold">
                      {talentsList.length}
                    </span>
                  </button>

                  {/* Letras A - Z */}
                  <div className="flex flex-wrap items-center ml-1">
                    {ALPHABET.map((letter) => {
                      const isCurrent = activeLetter === letter;
                      const hasTalentWithLetter = talentsList.some(
                        (t) => t.initial === letter
                      );
                      return (
                        <button
                          key={letter}
                          type="button"
                          onClick={() => setActiveLetter(letter)}
                          className={`w-6 h-6 text-[11px] font-medium rounded-xs flex items-center justify-center transition-colors cursor-pointer ${
                            isCurrent
                              ? 'bg-[#880E1B] text-white font-bold'
                              : hasTalentWithLetter
                              ? 'bg-[#161617] text-[#E8AC51] font-semibold hover:bg-[#880E1B]/40'
                              : 'text-neutral-400 hover:text-white hover:bg-[#161617]'
                          }`}
                        >
                          {letter}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Botões Direita: SELECIONAR TUDO e AÇÕES */}
                <div className="flex items-center gap-1.5 ml-auto">
                  <button
                    type="button"
                    onClick={toggleSelectAllTalents}
                    className="px-2.5 py-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-medium uppercase rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {selectedTalents.length === filteredTalents.length &&
                    filteredTalents.length > 0 ? (
                      <CheckSquare className="w-3.5 h-3.5" />
                    ) : (
                      <Square className="w-3.5 h-3.5" />
                    )}
                    <span>SELECIONAR TUDO</span>
                  </button>

                  <button
                    type="button"
                    className="px-2.5 py-1 bg-[#E8AC51] hover:bg-[#E8AC51]/90 text-[#161617] text-[11px] font-semibold uppercase rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>AÇÕES</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Linha de Controle de Visualização (CARTÕES / LISTA) e Contador de Selecionados */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white mr-1">
                    Visualização:
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('CARDS')}
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer ${
                      viewMode === 'CARDS'
                        ? 'bg-[#880E1B] hover:bg-[#a31121] text-white'
                        : 'bg-[#1c1c1e] text-neutral-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    CARTÕES
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('LIST')}
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer ${
                      viewMode === 'LIST'
                        ? 'bg-[#880E1B] hover:bg-[#a31121] text-white'
                        : 'bg-[#1c1c1e] text-neutral-400 border border-white/10 hover:text-white'
                    }`}
                  >
                    LISTA
                  </button>
                </div>

                <div className="text-xs font-bold text-white">
                  Talentos Selecionados: {selectedTalents.length}
                </div>
              </div>

              {/* Grid / Lista de Talentos */}
              <div className="mt-6">
                {isLoading ? (
                  viewMode === 'CARDS' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                      {[0, 1, 2, 3].map((i) => (
                        <TalentCardSkeleton key={i} />
                      ))}
                    </div>
                  ) : (
                    <div className="border border-white/10 rounded-xs overflow-x-auto whitespace-nowrap">
                      <table className="w-full min-w-[540px] text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#1c1c1e] text-neutral-400 border-b border-white/10">
                            <th className="py-2.5 px-3">Talento</th>
                            <th className="py-2.5 px-3">Unidade</th>
                            <th className="py-2.5 px-3">Categoria</th>
                            <th className="py-2.5 px-3">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <TableRowSkeleton columns={4} rows={4} />
                        </tbody>
                      </table>
                    </div>
                  )
                ) : filteredTalents.length === 0 ? (
                  <div className="py-16 text-center text-sm text-neutral-400 animate-content-fade transition-opacity duration-300">
                    Nenhum resultado encontrado para o filtro selecionado.
                  </div>
                ) : viewMode === 'CARDS' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 animate-content-fade transition-opacity duration-300">
                    {filteredTalents.map((talent) => {
                      const isSelected = selectedTalents.includes(talent.id);
                      return (
                        <div
                          key={talent.id}
                          onClick={() => toggleSelectTalent(talent.id)}
                          className={`group relative rounded-sm p-3 transition-all cursor-pointer border ${
                            isSelected
                              ? 'border-[#880E1B] bg-[#1c1c1e] shadow-sm'
                              : 'border-transparent hover:border-white/10 hover:bg-[#1c1c1e]/60'
                          }`}
                        >
                          <div className="text-center mb-3">
                            <h3 className="text-sm font-bold text-[#E8AC51] group-hover:underline leading-tight">
                              {talent.stageName}
                            </h3>
                            <p className="text-[11px] text-[#E8AC51]/75 leading-tight mt-0.5">
                              {talent.fullName}
                            </p>
                          </div>

                          <div className="flex items-center justify-center gap-4">
                            <div className="w-28 h-36 bg-[#1c1c1e] border border-white/10 rounded-xs flex flex-col items-center justify-center overflow-hidden shadow-2xs">
                              {talent.coverUrl ? (
                                <img
                                  src={talent.coverUrl}
                                  alt={talent.stageName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center p-2">
                                  <span className="text-base font-serif tracking-widest text-white font-semibold leading-none">
                                    {talent.officeName}
                                  </span>
                                  <span className="text-[7px] tracking-[0.35em] text-neutral-400 mt-1 uppercase">
                                    {talent.officeSubtitle}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div
                              className="flex flex-col text-[11px] text-neutral-400 leading-[1.35]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {TALENT_QUICK_LINKS.map((section, idx) => (
                                <div
                                  key={section.group}
                                  className={
                                    idx > 0
                                      ? 'mt-1.5 pt-1.5 border-t border-white/10'
                                      : ''
                                  }
                                >
                                  {section.items.map((linkLabel) => (
                                    <a
                                      key={linkLabel}
                                      href={`#${linkLabel.toLowerCase()}`}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        if (linkLabel === 'Compo') {
                                          navigate('/compomake', {
                                            state: {
                                              talent: { name: talent.stageName },
                                            },
                                          });
                                        }
                                      }}
                                      className="block hover:text-[#E8AC51] transition-colors"
                                    >
                                      {linkLabel}
                                    </a>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="border border-white/10 rounded-xs overflow-x-auto whitespace-nowrap animate-content-fade transition-opacity duration-300">
                    <table className="w-full min-w-[540px] text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#1c1c1e] text-neutral-400 border-b border-white/10">
                          <th className="py-2.5 px-3">Talento</th>
                          <th className="py-2.5 px-3">Unidade</th>
                          <th className="py-2.5 px-3">Categoria</th>
                          <th className="py-2.5 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredTalents.map((talent) => (
                          <tr
                            key={talent.id}
                            className="border-b border-white/10 hover:bg-[#1c1c1e]"
                          >
                            <td className="py-2.5 px-3 font-semibold text-[#E8AC51]">
                              {talent.stageName}{' '}
                              <span className="font-normal text-neutral-400">
                                ({talent.fullName})
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-white">ÉVORA MODELS</td>
                            <td className="py-2.5 px-3 text-white">{talent.category}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 bg-[#E8AC51] text-[#161617] rounded-full text-[11px] font-semibold">
                                {talent.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </>
          )}
        </section>
      </main>

      {/* Toast Visual quando o CompoMake cria um composite */}
      {compoToast && (
        <div className="fixed top-20 right-6 z-50 max-w-md bg-[#1c1c1e] text-white px-4 py-3.5 rounded-md shadow-2xl border border-white/10 border-l-4 border-l-[#E8AC51] flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#E8AC51] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-white">{compoToast.title}</p>
            <p className="text-neutral-400 mt-0.5 leading-relaxed">
              {compoToast.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCompoToast(null)}
            className="text-neutral-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Modal CompoMake acionado pelo 1º ícone do cabeçalho */}
      <CompoMakeModal
        isOpen={isCompoMakeOpen}
        onClose={() => setIsCompoMakeOpen(false)}
        customTalents={talentsList}
        onCreateSuccess={(payload) => {
          setCompoToast({
            title: 'CompoMake: Abrindo Editor!',
            subtitle: `Talento: ${payload.talent.name} • Desenho: ${payload.designTemplate}`,
          });
          setTimeout(() => setCompoToast(null), 5000);
        }}
      />
    </div>
  );
}
