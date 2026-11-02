import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  ChevronDown,
  CheckSquare,
  Square,
  CheckCircle2,
  X,
} from 'lucide-react';
import Header from './Header';
import FilterSidebar from './FilterSidebar';
import CompoMakeModal from './CompoMakeModal';

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
  children,
}) {
  const navigate = useNavigate();
  const [activeLetter, setActiveLetter] = useState('ALL'); // 'ALL' ou A-Z
  const [viewMode, setViewMode] = useState('CARDS'); // 'CARDS' | 'LIST'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTalents, setSelectedTalents] = useState([]);
  const [isCompoMakeOpen, setIsCompoMakeOpen] = useState(false);
  const [compoToast, setCompoToast] = useState(null);

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
    <div className="min-h-screen bg-white text-slate-700 flex flex-col font-sans">
      {/* 1. CABEÇALHO SUPERIOR (Header.jsx com Link para "/" no logótipo Évora Models) */}
      <Header onOpenCompoMake={() => setIsCompoMakeOpen(true)} />

      {/* 2. SUB-CABEÇALHO PADRÃO (Breadcrumbs "Início > Talentos" + Busca Global) */}
      {!hideSubHeader && (
        <div className="w-full border-b border-slate-200 bg-white">
          <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#f8f9fa] border-x border-slate-100">
            {/* Breadcrumb com Link "Início" apontando para "/" */}
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Link
                to="/"
                className="text-[#0077b5] hover:underline cursor-pointer"
              >
                Início
              </Link>
              <span>&gt;</span>
              <span className="text-slate-500">Talentos</span>
            </div>

            {/* Barra de Busca "Buscar Talento" + Botão "+" (Agregar Talento) */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white border border-slate-200 rounded-xs overflow-hidden focus-within:border-[#0077b5] transition-colors w-full sm:w-64">
                <span className="px-2.5 py-1.5 bg-slate-100 border-r border-slate-200 text-slate-500">
                  <Search className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar Talento"
                  className="w-full px-2.5 py-1 text-xs text-slate-700 placeholder:text-slate-400 outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handleAddTalentClick}
                title="Agregar Novo Talento"
                className="px-2.5 py-1.5 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs shadow-2xs transition-colors flex items-center justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. CORPO PRINCIPAL */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-5 flex flex-col lg:flex-row items-start gap-5">
        {!hideSidebar && <FilterSidebar />}

        <section className="flex-1 w-full min-w-0">
          {children ? (
            children
          ) : (
            <>
              {/* Barra Alfabética (MOSTRAR TUDO + A..Z + SELECIONAR TUDO + AÇÕES) */}
              <div className="bg-[#e9ecef] border border-slate-200 rounded-xs p-1 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-0.5">
                  <button
                    type="button"
                    onClick={() => setActiveLetter('ALL')}
                    className={`px-2.5 py-1 rounded-xs text-[11px] font-semibold uppercase flex items-center gap-1.5 transition-colors cursor-pointer ${
                      activeLetter === 'ALL'
                        ? 'bg-[#0077b5] text-white'
                        : 'text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    <span>MOSTRAR TUDO</span>
                    <span className="px-1 py-0.2 bg-white text-[#0077b5] rounded-xs text-[10px] font-bold">
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
                              ? 'bg-[#0077b5] text-white font-bold'
                              : hasTalentWithLetter
                              ? 'bg-white/90 text-slate-700 font-semibold hover:bg-white'
                              : 'text-slate-400 hover:text-slate-700 hover:bg-slate-200/60'
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
                    className="px-2.5 py-1 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-medium uppercase rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
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
                    className="px-2.5 py-1 bg-[#5bc0de] hover:bg-[#31b0d5] text-white text-[11px] font-medium uppercase rounded-xs flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>AÇÕES</span>
                    <ChevronDown className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Linha de Controle de Visualização (CARTÕES / LISTA) e Contador de Selecionados */}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-700 mr-1">
                    Visualização:
                  </span>
                  <button
                    type="button"
                    onClick={() => setViewMode('CARDS')}
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer ${
                      viewMode === 'CARDS'
                        ? 'bg-[#0077b5] text-white'
                        : 'bg-slate-500 text-white/90 hover:bg-slate-600'
                    }`}
                  >
                    CARTÕES
                  </button>
                  <button
                    type="button"
                    onClick={() => setViewMode('LIST')}
                    className={`px-2.5 py-1 text-[11px] font-semibold uppercase rounded-xs transition-colors cursor-pointer ${
                      viewMode === 'LIST'
                        ? 'bg-[#0077b5] text-white'
                        : 'bg-slate-500 text-white/90 hover:bg-slate-600'
                    }`}
                  >
                    LISTA
                  </button>
                </div>

                <div className="text-xs font-bold text-slate-700">
                  Talentos Selecionados: {selectedTalents.length}
                </div>
              </div>

              {/* Grid / Lista de Talentos */}
              <div className="mt-6">
                {filteredTalents.length === 0 ? (
                  <div className="py-16 text-center text-sm text-slate-400">
                    Nenhum resultado encontrado para o filtro selecionado.
                  </div>
                ) : viewMode === 'CARDS' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredTalents.map((talent) => {
                      const isSelected = selectedTalents.includes(talent.id);
                      return (
                        <div
                          key={talent.id}
                          onClick={() => toggleSelectTalent(talent.id)}
                          className={`group relative rounded-sm p-3 transition-all cursor-pointer border ${
                            isSelected
                              ? 'border-[#0077b5] bg-sky-50/20 shadow-sm'
                              : 'border-transparent hover:border-slate-200 hover:bg-slate-50/50'
                          }`}
                        >
                          <div className="text-center mb-3">
                            <h3 className="text-sm font-bold text-[#0077b5] group-hover:underline leading-tight">
                              {talent.stageName}
                            </h3>
                            <p className="text-[11px] text-[#0077b5]/75 leading-tight mt-0.5">
                              {talent.fullName}
                            </p>
                          </div>

                          <div className="flex items-center justify-center gap-4">
                            <div className="w-28 h-36 bg-white border border-slate-100 rounded-xs flex flex-col items-center justify-center overflow-hidden shadow-2xs">
                              {talent.coverUrl ? (
                                <img
                                  src={talent.coverUrl}
                                  alt={talent.stageName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <div className="flex flex-col items-center justify-center p-2">
                                  <span className="text-base font-serif tracking-widest text-slate-900 font-semibold leading-none">
                                    {talent.officeName}
                                  </span>
                                  <span className="text-[7px] tracking-[0.35em] text-slate-500 mt-1 uppercase">
                                    {talent.officeSubtitle}
                                  </span>
                                </div>
                              )}
                            </div>

                            <div
                              className="flex flex-col text-[11px] text-slate-400 leading-[1.35]"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {TALENT_QUICK_LINKS.map((section, idx) => (
                                <div
                                  key={section.group}
                                  className={
                                    idx > 0
                                      ? 'mt-1.5 pt-1.5 border-t border-slate-200/80'
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
                                      className="block hover:text-[#0077b5] transition-colors"
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
                  <div className="border border-slate-200 rounded-xs overflow-hidden">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100 text-slate-600 border-b border-slate-200">
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
                            className="border-b border-slate-100 hover:bg-slate-50"
                          >
                            <td className="py-2.5 px-3 font-semibold text-[#0077b5]">
                              {talent.stageName}{' '}
                              <span className="font-normal text-slate-400">
                                ({talent.fullName})
                              </span>
                            </td>
                            <td className="py-2.5 px-3">ÉVORA MODELS</td>
                            <td className="py-2.5 px-3">{talent.category}</td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[11px] font-medium">
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
        <div className="fixed top-20 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3.5 rounded-md shadow-2xl border-l-4 border-[#5bc0de] flex items-start gap-3 animate-in fade-in slide-in-from-top-3 duration-200">
          <CheckCircle2 className="w-5 h-5 text-[#5bc0de] shrink-0 mt-0.5" />
          <div className="flex-1 text-xs">
            <p className="font-bold text-white">{compoToast.title}</p>
            <p className="text-slate-300 mt-0.5 leading-relaxed">
              {compoToast.subtitle}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCompoToast(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
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
