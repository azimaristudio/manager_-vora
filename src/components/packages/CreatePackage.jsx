import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LifeBuoy,
  UserCircle2,
  ChevronDown,
  Plus,
  Search,
  EyeOff,
  Eye,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  Tags,
  LayoutGrid,
  BookOpen,
  UserSquare,
  Video,
  PencilRuler,
  Image,
  ListChecks,
  FileText,
  Check,
  X,
} from 'lucide-react';

const TOP_MENU = [
  { label: 'TALENTOS', path: '/' },
  { label: 'CONTATOS', path: '/contatos' },
  { label: 'WEBMAIL', path: '/webmail/inbox' },
  { label: 'PROJETOS', path: '/projetos' },
  { label: 'CALENDÁRIO', path: '/calendario' },
  { label: 'PACOTES', path: '/pacotes' },
  { label: 'ESTATÍSTICAS', path: '/estatisticas' },
  { label: 'CONTABILIDADE', path: '#' },
];

const MEDIA_SELECTION_BLOCKS = [
  { key: 'compo', label: 'COMPO', Icon: LayoutGrid, hasAlbumSelect: true },
  { key: 'book', label: 'BOOK', Icon: BookOpen, hasAlbumSelect: true },
  {
    key: 'polaroids',
    label: 'POLAROIDS',
    Icon: UserSquare,
    hasAlbumSelect: true,
  },
  { key: 'videos', label: 'VIDEOS', Icon: Video, hasAlbumSelect: true },
  { key: 'info', label: 'INFO', Icon: PencilRuler, hasAlbumSelect: false },
  { key: 'album', label: 'ALBUM', Icon: Image, hasAlbumSelect: false },
  {
    key: 'habilidades',
    label: 'HABILIDADES',
    Icon: ListChecks,
    hasAlbumSelect: false,
  },
  {
    key: 'documentos',
    label: 'DOCUMENTOS',
    Icon: FileText,
    hasAlbumSelect: false,
  },
];

export default function CreatePackage() {
  const navigate = useNavigate();

  // Estados do formulário (Imagem 47)
  const [packageName, setPackageName] = useState('');
  const [addedDates, setAddedDates] = useState([]);
  const [addedProducts, setAddedProducts] = useState([]);
  const [showTalentIdInsteadOfName, setShowTalentIdInsteadOfName] =
    useState(false);
  const [showCompositeAsCover, setShowCompositeAsCover] = useState(false);
  const [talentQuery, setTalentQuery] = useState('');
  const [sortBy, setSortBy] = useState('Padrão');
  const [showDetails, setShowDetails] = useState(false);
  const [pageSize, setPageSize] = useState('10');

  // Toggles de "CONFERIR CONFLITOS:"
  const [checkConflictDates, setCheckConflictDates] = useState(false);
  const [checkConflictProducts, setCheckConflictProducts] = useState(false);

  // Blocos de "SELECIONAR TUDO:" ('INFO' selecionado por padrão conforme Imagem 47)
  const [selectedBlocks, setSelectedBlocks] = useState({
    compo: false,
    book: false,
    polaroids: false,
    videos: false,
    info: true,
    album: false,
    habilidades: false,
    documentos: false,
  });

  const handleToggleBlock = (blockKey) => {
    setSelectedBlocks((prev) => ({
      ...prev,
      [blockKey]: !prev[blockKey],
    }));
  };

  const handleAddMockDate = () => {
    setAddedDates((prev) => [...prev, '30/10/2026']);
  };

  const handleAddMockProduct = () => {
    setAddedProducts((prev) => [...prev, `Produto #${prev.length + 1}`]);
  };

  return (
    <div className="min-h-screen bg-[#e6e7e9] text-slate-700 flex flex-col font-sans select-none">
      {/* Cabeçalho Superior (Fiel à Imagem 47) */}
      <header className="w-full bg-white border-b border-slate-200 px-6 lg:px-10 h-14 flex items-center justify-between sticky top-0 z-30">
        <nav className="flex flex-wrap items-center gap-4 sm:gap-6">
          {TOP_MENU.map((item) => {
            const isCurrent = item.label === 'PACOTES';
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  if (item.path !== '#') {
                    navigate(item.path);
                  }
                }}
                className={`text-[11px] tracking-wider uppercase transition-colors cursor-pointer ${
                  isCurrent
                    ? 'text-slate-900 font-bold'
                    : 'text-slate-600 hover:text-[#0077b5] font-medium'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-4 text-slate-600">
          <button
            type="button"
            className="inline-flex items-center gap-1 text-[11px] font-medium uppercase hover:text-slate-900 cursor-pointer"
          >
            <LifeBuoy className="w-3.5 h-3.5" />
            <span>AJUDA</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            title="Voltar ao Início"
            className="flex items-center gap-1 text-[#0077b5] cursor-pointer"
          >
            <UserCircle2 className="w-7 h-7 stroke-[1.5]" />
            <ChevronDown className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* Container Branco Principal (Imagem 47) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-4 sm:px-6 pt-8 pb-6 flex flex-col">
        <div className="flex-1 bg-white rounded-xs shadow-xs border border-slate-200/80 px-6 sm:px-10 py-6 flex flex-col justify-between relative">
          <div>
            {/* Topo: Títulos Centrais 'PACOTES' e 'CRIAR/EDITAR' + Botão Vermelho 'CANCELAR' */}
            <div className="relative flex items-center justify-center pt-2 pb-4">
              <div className="text-center">
                <p className="text-xs tracking-wider uppercase text-slate-500 font-normal leading-tight">
                  PACOTES
                </p>
                <h1 className="text-sm tracking-wide uppercase text-slate-800 font-semibold leading-tight mt-0.5">
                  CRIAR/EDITAR
                </h1>
              </div>

              <button
                type="button"
                onClick={() => navigate('/pacotes')}
                className="absolute right-0 top-0 px-3.5 py-1.5 bg-[#ff2c55] hover:bg-[#e01e45] text-white text-[10px] font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
              >
                CANCELAR
              </button>
            </div>

            {/* Secções do Formulário (Coluna Única) */}
            <div className="space-y-4">
              {/* NOME */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  NOME
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full h-8 px-3 bg-[#efefef] border border-slate-300/80 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-[#3eb5e6]"
                />
              </div>

              {/* DATAS */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  DATAS
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddMockDate}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#3eb5e6] hover:bg-[#2da3d4] text-white text-[10px] font-medium rounded-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.8]" />
                    <span>Adicionar</span>
                  </button>
                  {addedDates.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-xs text-[10px] text-slate-600"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* PRODUTOS */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  PRODUTOS
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddMockProduct}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#3eb5e6] hover:bg-[#2da3d4] text-white text-[10px] font-medium rounded-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.8]" />
                    <span>Adicionar produtos</span>
                  </button>
                  {addedProducts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-xs text-[10px] text-slate-600"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Opções de Apresentação (Duas Checkboxes) */}
              <div className="space-y-1.5 pt-1">
                <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTalentIdInsteadOfName}
                    onChange={(e) =>
                      setShowTalentIdInsteadOfName(e.target.checked)
                    }
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#3eb5e6]"
                  />
                  <span>Mostrar o ID do talento em vez do nome</span>
                </label>

                <label className="flex items-center gap-2 text-[11px] text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompositeAsCover}
                    onChange={(e) => setShowCompositeAsCover(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#3eb5e6]"
                  />
                  <span>Mostrar composite como foto de capa</span>
                </label>
              </div>

              {/* TALENTOS */}
              <div className="space-y-2 pt-1">
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  TALENTOS
                </label>
                <div className="flex items-center max-w-[615px]">
                  <input
                    type="text"
                    value={talentQuery}
                    onChange={(e) => setTalentQuery(e.target.value)}
                    className="flex-1 h-8 px-3 bg-[#efefef] border border-r-0 border-slate-300/80 rounded-l-xs text-xs text-slate-700 focus:outline-none focus:border-[#3eb5e6]"
                  />
                  <button
                    type="button"
                    title="Pesquisar Talento"
                    className="w-8 h-8 bg-[#3eb5e6] hover:bg-[#2da3d4] text-white rounded-r-xs flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* ORDENAR POR */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-slate-700">
                  ORDENAR POR
                </label>
                <div className="relative max-w-[615px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-8 px-3 pr-8 bg-[#4a4f55] text-white text-xs rounded-xs appearance-none outline-none cursor-pointer"
                  >
                    <option value="Padrão">Padrão</option>
                    <option value="Nome (A-Z)">Nome (A-Z)</option>
                    <option value="Nome (Z-A)">Nome (Z-A)</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-white absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Área de Seleção (Meio da página) */}
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              {/* Esquerda: Botão escuro MOSTRAR DETALHES */}
              <button
                type="button"
                onClick={() => setShowDetails((prev) => !prev)}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#4a4f55] hover:bg-[#3b3f44] text-white text-[11px] uppercase rounded-xs transition-colors cursor-pointer"
              >
                <span>MOSTRAR DETALHES</span>
                {showDetails ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Centro: Talentos: 0 */}
              <div className="text-xs text-slate-700">
                <span>Talentos: </span>
                <strong className="font-bold text-slate-900">0</strong>
              </div>

              {/* Direita: Paginação ('10', '1 - 1 < | >') */}
              <div className="flex items-center gap-3 text-[11px]">
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                    className="h-7 pl-2.5 pr-6 bg-[#4a4f55] text-white text-[11px] rounded-xs appearance-none outline-none cursor-pointer"
                  >
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="flex items-center gap-1.5 text-slate-500">
                  <span>
                    <strong className="text-slate-800">1</strong> - 1
                  </span>
                  <button
                    type="button"
                    className="p-0.5 hover:text-slate-800 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-slate-300">|</span>
                  <button
                    type="button"
                    className="p-0.5 hover:text-slate-800 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Tabela de Conflitos e Seleção (Inferior) */}
            <div className="mt-7 grid grid-cols-1 lg:grid-cols-12 items-start gap-6">
              {/* Lado Esquerdo: CONFERIR CONFLITOS: */}
              <div className="lg:col-span-4 space-y-2 pt-2">
                <p className="text-[10px] font-bold uppercase text-slate-700">
                  CONFERIR CONFLITOS:
                </p>

                <div className="space-y-1.5">
                  {/* Switch DATAS */}
                  <button
                    type="button"
                    onClick={() => setCheckConflictDates((prev) => !prev)}
                    className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer"
                  >
                    <span
                      className={`w-7 h-3.5 rounded-full border flex items-center px-0.5 transition-colors ${
                        checkConflictDates
                          ? 'bg-emerald-600 border-emerald-600 justify-end text-white'
                          : 'bg-white border-slate-600 justify-between text-slate-700'
                      }`}
                    >
                      {!checkConflictDates && (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </>
                      )}
                      {checkConflictDates && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="uppercase font-medium">DATAS</span>
                    <CalendarDays className="w-3.5 h-3.5 text-slate-700" />
                  </button>

                  {/* Switch PRODUTOS */}
                  <button
                    type="button"
                    onClick={() => setCheckConflictProducts((prev) => !prev)}
                    className="flex items-center gap-2 text-[11px] text-slate-700 cursor-pointer"
                  >
                    <span
                      className={`w-7 h-3.5 rounded-full border flex items-center px-0.5 transition-colors ${
                        checkConflictProducts
                          ? 'bg-emerald-600 border-emerald-600 justify-end text-white'
                          : 'bg-white border-slate-600 justify-between text-slate-700'
                      }`}
                    >
                      {!checkConflictProducts && (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </>
                      )}
                      {checkConflictProducts && (
                        <span className="w-2.5 h-2.5 rounded-full bg-white" />
                      )}
                    </span>
                    <span className="uppercase font-medium">PRODUTOS</span>
                    <Tags className="w-3.5 h-3.5 text-slate-700" />
                  </button>
                </div>
              </div>

              {/* Lado Direito: SELECIONAR TUDO: */}
              <div className="lg:col-span-8">
                <p className="text-[10px] font-bold uppercase text-slate-700 mb-1">
                  SELECIONAR TUDO:
                </p>

                <div className="bg-[#e9eaea] rounded-xs px-4 py-3 flex flex-wrap items-start justify-center gap-3">
                  {MEDIA_SELECTION_BLOCKS.map(
                    ({ key, label, Icon, hasAlbumSelect }) => {
                      const isSelected = Boolean(selectedBlocks[key]);
                      return (
                        <div
                          key={key}
                          className="flex flex-col items-center w-14"
                        >
                          <span className="text-[8px] font-semibold uppercase text-slate-600 mb-1 tracking-tight">
                            {label}
                          </span>

                          {/* Bloco Quadrado Selecionável */}
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(key)}
                            className={`relative w-10 h-10 rounded-xs border flex items-center justify-center transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#44484d] border-[#44484d] text-white'
                                : 'bg-[#e9eaea] border-slate-400/80 text-slate-500 hover:border-slate-600'
                            }`}
                          >
                            <Icon className="w-5 h-5 stroke-[1.8]" />

                            {/* Checkbox circular no canto superior direito */}
                            <span
                              className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-white border-slate-500 text-slate-700'
                                  : 'bg-[#e9eaea] border-slate-400 text-transparent'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          </button>

                          {/* Select pequeno 'ALBUM v' abaixo dos 4 primeiros blocos */}
                          {hasAlbumSelect && (
                            <div className="mt-1 w-12 border border-slate-400/70 rounded-[2px] px-1 py-0.5 flex items-center justify-between text-[7px] font-semibold uppercase text-slate-600 bg-[#e9eaea]">
                              <span>ALBUM</span>
                              <ChevronDown className="w-2 h-2 text-slate-500" />
                            </div>
                          )}
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé de Ações: Botão Verde 'SALVAR' e Botão Azul Claro 'SALVAR E ENVIAR' */}
          <div className="pt-28 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={() => navigate('/pacotes')}
              className="w-36 py-2.5 bg-[#1ec95b] hover:bg-[#19b34f] text-white text-[11px] font-semibold uppercase tracking-wide rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
            <button
              type="button"
              onClick={() => navigate('/pacotes')}
              className="w-44 py-2.5 bg-[#3eb5e6] hover:bg-[#2da3d4] text-white text-[11px] font-semibold uppercase tracking-wide rounded-xs transition-colors cursor-pointer"
            >
              SALVAR E ENVIAR
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

