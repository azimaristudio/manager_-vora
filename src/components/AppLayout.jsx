import React, { useState } from 'react';
import {
  Search,
  Plus,
  Folder,
  Flag,
  Hourglass,
  LifeBuoy,
  UserCircle2,
  ChevronDown,
  CheckSquare,
  Square,
  Contact,
  LogOut,
} from 'lucide-react';
import FilterSidebar from './FilterSidebar';

const NAV_ITEMS = [
  'Talentos',
  'Contatos',
  'Webmail',
  'Projetos',
  'Calendário',
  'Pacotes',
  'Estatísticas',
  'Contabilidade',
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const TALENT_QUICK_LINKS = [
  { group: 1, items: ['Info', 'Agenda', 'Atividades', 'Contratos', 'Vôos'] },
  { group: 2, items: ['Compo', 'Book', 'Snaps', 'Video'] },
  { group: 3, items: ['Docs'] },
];

const MOCK_TALENTS = [
  {
    id: 'talent-sophia-evora',
    stageName: 'sophia évora',
    fullName: 'sophia egito',
    initial: 'S',
    officeName: 'ÉVORA',
    officeSubtitle: 'MODELS',
    category: 'Modelo',
    status: 'Ativo',
  },
];

export default function AppLayout({ onLogout, children }) {
  const [activeNav, setActiveNav] = useState('Talentos');
  const [activeLetter, setActiveLetter] = useState('ALL'); // 'ALL' ou A-Z
  const [viewMode, setViewMode] = useState('CARDS'); // 'CARDS' | 'LIST'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTalents, setSelectedTalents] = useState([]);

  const filteredTalents = MOCK_TALENTS.filter((t) => {
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

  return (
    <div className="min-h-screen bg-white text-slate-700 flex flex-col font-sans">
      {/* 1. CABEÇALHO SUPERIOR (Menu Principal + Ícones de Notificação/Conta) */}
      <header className="w-full bg-white border-b border-slate-200 px-4 lg:px-8 h-16 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Logo MF ManagerFashion */}
          <a
            href="#top"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-1.5 shrink-0"
          >
            <span className="bg-[#0077b5] text-white font-extrabold text-sm px-1.5 py-1 rounded-xs tracking-tighter leading-none">
              MF
            </span>
            <span className="text-[#0077b5] font-normal text-lg tracking-tight">
              Manager<span className="font-semibold">Fashion</span>
            </span>
          </a>

          {/* Navegação Principal */}
          <nav className="hidden xl:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = activeNav === item;
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setActiveNav(item)}
                  className={`px-3 py-1.5 rounded-xs text-[13px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#0077b5] text-white font-medium shadow-2xs'
                      : 'text-[#0077b5] hover:bg-sky-50 font-normal'
                  }`}
                >
                  {item}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Ícones de Status, Tarefas em Segundo Plano e Perfil */}
        <div className="flex items-center gap-3 sm:gap-4 text-[#0077b5]">
          <button
            type="button"
            title="Painel Rápido"
            className="p-1.5 hover:bg-sky-50 rounded-xs transition-colors cursor-pointer"
          >
            <Contact className="w-6 h-6 stroke-[1.75]" />
          </button>

          {/* Pastas / Pacotes (Badge 1) */}
          <button
            type="button"
            title="Seleções / Pastas Ativas"
            className="relative flex items-center hover:bg-sky-50 p-1.5 rounded-xs transition-colors cursor-pointer"
          >
            <Folder className="w-5 h-5 fill-[#0077b5] text-[#0077b5]" />
            <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-xs leading-tight">
              1
            </span>
          </button>

          {/* Tarefas (Badge 0) */}
          <button
            type="button"
            title="Tarefas"
            className="relative flex items-center hover:bg-sky-50 p-1.5 rounded-xs transition-colors cursor-pointer"
          >
            <Flag className="w-5 h-5 fill-[#0077b5] text-[#0077b5]" />
            <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-xs leading-tight">
              0
            </span>
          </button>

          {/* Trabalhos em Segundo Plano (Badge 0) */}
          <button
            type="button"
            title="Trabalhos em segundo plano"
            className="relative flex items-center hover:bg-sky-50 p-1.5 rounded-xs transition-colors cursor-pointer"
          >
            <Hourglass className="w-5 h-5 text-[#0077b5]" />
            <span className="ml-0.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-bold rounded-xs leading-tight">
              0
            </span>
          </button>

          {/* Suporte */}
          <button
            type="button"
            title="Suporte e Tutoriais"
            className="p-1.5 hover:bg-sky-50 rounded-xs transition-colors cursor-pointer"
          >
            <LifeBuoy className="w-5 h-5" />
          </button>

          {/* Menu do Usuário / Sair */}
          <div className="flex items-center gap-1 pl-1 border-l border-slate-200">
            <button
              type="button"
              onClick={onLogout}
              title="Sair / Voltar para a tela de Login"
              className="flex items-center gap-1 text-[#0077b5] hover:text-[#005a8c] p-1 rounded-xs transition-colors cursor-pointer"
            >
              <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
            {onLogout && (
              <button
                type="button"
                onClick={onLogout}
                title="Voltar para Login"
                className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 hover:text-red-600 px-2 py-1 rounded hover:bg-red-50 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. SUB-CABEÇALHO (Breadcrumbs + Busca Global de Talento + Botão Adicionar) */}
      <div className="w-full border-b border-slate-200 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 lg:px-8 py-2.5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#f8f9fa] border-x border-slate-100">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="text-[#0077b5] hover:underline cursor-pointer">
              Início
            </span>
            <span>&gt;</span>
            <span className="text-slate-500">{activeNav}</span>
          </div>

          {/* Barra de Busca "Buscar Talento" + Botão "+" */}
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
              title="Adicionar Novo Talento"
              className="px-2.5 py-1.5 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs shadow-2xs transition-colors flex items-center justify-center cursor-pointer"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. CORPO PRINCIPAL (Sidebar de Filtros à Esquerda + Listagem à Direita) */}
      <main className="flex-1 max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-5 flex flex-col lg:flex-row items-start gap-5">
        {/* Barra Lateral de Filtros alimentada pelo JSON tipado */}
        <FilterSidebar />

        {/* Área Principal de Conteúdo à Direita */}
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
                      {MOCK_TALENTS.length}
                    </span>
                  </button>

                  {/* Letras A - Z */}
                  <div className="flex flex-wrap items-center ml-1">
                    {ALPHABET.map((letter) => {
                      const isCurrent = activeLetter === letter;
                      const hasTalentWithLetter = letter === 'S';
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

              {/* Grid / Lista de Talentos (Fiel à imagem 02_talentos.png) */}
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
                          {/* Cabeçalho do Card: Nome Artístico e Nome Civil */}
                          <div className="text-center mb-3">
                            <h3 className="text-sm font-bold text-[#0077b5] group-hover:underline leading-tight">
                              {talent.stageName}
                            </h3>
                            <p className="text-[11px] text-[#0077b5]/75 leading-tight mt-0.5">
                              {talent.fullName}
                            </p>
                          </div>

                          {/* Corpo do Card: Thumbnail ÉVORA MODELS + Menu Rápido Lateral */}
                          <div className="flex items-center justify-center gap-4">
                            {/* Quadro da Foto / Logo da Agência */}
                            <div className="w-28 h-36 bg-white border border-slate-100 rounded-xs flex flex-col items-center justify-center p-2 shadow-2xs">
                              <span className="text-base font-serif tracking-widest text-slate-900 font-semibold leading-none">
                                {talent.officeName}
                              </span>
                              <span className="text-[7px] tracking-[0.35em] text-slate-500 mt-1 uppercase">
                                {talent.officeSubtitle}
                              </span>
                            </div>

                            {/* Menu Vertical de Ações do Talento */}
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
                                      onClick={(e) => e.preventDefault()}
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
                  /* Modo Lista */
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
    </div>
  );
}

