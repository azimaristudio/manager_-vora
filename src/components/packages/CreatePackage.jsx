import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
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
import Header from '../Header';

const TOP_MENU = [
  { label: 'TALENTOS', path: '/' },
  { label: 'CONTATOS', path: '/contatos' },
  { label: 'WEBMAIL', path: '/webmail/inbox' },
  { label: 'PROJETOS', path: '/projetos' },
  { label: 'CALENDÁRIO', path: '/calendario' },
  { label: 'PACOTES', path: '/pacotes' },
  { label: 'ESTATÍSTICAS', path: '/estatisticas' },
  { label: 'CONTABILIDADE', path: '/contabilidade' },
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
    <div className="min-h-screen bg-[#161617] text-white flex flex-col font-sans select-none">
      {/* Cabeçalho Superior Responsivo */}
      <Header />

      {/* Container Principal (Imagem 47) */}
      <main className="flex-1 max-w-[1400px] w-full mx-auto p-4 md:px-6 md:pt-8 md:pb-6 flex flex-col">
        <div className="flex-1 bg-[#1c1c1e] rounded-xs shadow-xs border border-white/10 p-4 sm:p-6 md:px-10 md:py-6 flex flex-col justify-between relative">
          <div>
            {/* Topo: Títulos Centrais 'PACOTES' e 'CRIAR/EDITAR' + Botão Vermelho 'CANCELAR' */}
            <div className="relative flex items-center justify-center pt-2 pb-4">
              <div className="text-center">
                <p className="text-xs tracking-wider uppercase text-neutral-400 font-normal leading-tight">
                  PACOTES
                </p>
                <h1 className="text-sm tracking-wide uppercase text-white font-semibold leading-tight mt-0.5">
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
                <label className="block text-[11px] font-bold uppercase text-white">
                  NOME
                </label>
                <input
                  type="text"
                  value={packageName}
                  onChange={(e) => setPackageName(e.target.value)}
                  className="w-full h-8 px-3 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                />
              </div>

              {/* DATAS */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-white">
                  DATAS
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddMockDate}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[10px] font-medium rounded-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.8]" />
                    <span>Adicionar</span>
                  </button>
                  {addedDates.map((d, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#161617] border border-white/10 rounded-xs text-[10px] text-neutral-400"
                    >
                      {d}
                    </span>
                  ))}
                </div>
              </div>

              {/* PRODUTOS */}
              <div className="space-y-1.5">
                <label className="block text-[11px] font-bold uppercase text-white">
                  PRODUTOS
                </label>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={handleAddMockProduct}
                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[10px] font-medium rounded-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[2.8]" />
                    <span>Adicionar produtos</span>
                  </button>
                  {addedProducts.map((p, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-[#161617] border border-white/10 rounded-xs text-[10px] text-neutral-400"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              {/* Opções de Apresentação (Duas Checkboxes) */}
              <div className="space-y-1.5 pt-1">
                <label className="flex items-center gap-2 text-[11px] text-neutral-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showTalentIdInsteadOfName}
                    onChange={(e) =>
                      setShowTalentIdInsteadOfName(e.target.checked)
                    }
                    className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51]"
                  />
                  <span>Mostrar o ID do talento em vez do nome</span>
                </label>

                <label className="flex items-center gap-2 text-[11px] text-neutral-400 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showCompositeAsCover}
                    onChange={(e) => setShowCompositeAsCover(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51]"
                  />
                  <span>Mostrar composite como foto de capa</span>
                </label>
              </div>

              {/* TALENTOS */}
              <div className="space-y-2 pt-1">
                <label className="block text-[11px] font-bold uppercase text-white">
                  TALENTOS
                </label>
                <div className="flex items-center max-w-[615px]">
                  <input
                    type="text"
                    value={talentQuery}
                    onChange={(e) => setTalentQuery(e.target.value)}
                    className="flex-1 h-8 px-3 bg-[#1c1c1e] border border-r-0 border-white/10 rounded-l-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                  />
                  <button
                    type="button"
                    title="Pesquisar Talento"
                    className="w-8 h-8 bg-[#E8AC51] hover:bg-[#d99b3f] text-white rounded-r-xs flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  >
                    <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>
              </div>

              {/* ORDENAR POR */}
              <div className="space-y-1">
                <label className="block text-[11px] font-bold uppercase text-white">
                  ORDENAR POR
                </label>
                <div className="relative max-w-[615px]">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full h-8 px-3 pr-8 bg-[#1c1c1e] text-white text-xs rounded-xs appearance-none outline-none cursor-pointer"
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
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#161617] text-white text-[11px] uppercase rounded-xs transition-colors cursor-pointer"
              >
                <span>MOSTRAR DETALHES</span>
                {showDetails ? (
                  <Eye className="w-3.5 h-3.5" />
                ) : (
                  <EyeOff className="w-3.5 h-3.5" />
                )}
              </button>

              {/* Centro: Talentos: 0 */}
              <div className="text-xs text-white">
                <span>Talentos: </span>
                <strong className="font-bold text-white">0</strong>
              </div>

              {/* Direita: Paginação ('10', '1 - 1 < | >') */}
              <div className="flex items-center gap-3 text-[11px]">
                <div className="relative">
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(e.target.value)}
                    className="h-7 pl-2.5 pr-6 bg-[#1c1c1e] text-white text-[11px] rounded-xs appearance-none outline-none cursor-pointer"
                  >
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <div className="flex items-center gap-1.5 text-neutral-400">
                  <span>
                    <strong className="text-white">1</strong> - 1
                  </span>
                  <button
                    type="button"
                    className="p-0.5 hover:text-white cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-neutral-400">|</span>
                  <button
                    type="button"
                    className="p-0.5 hover:text-white cursor-pointer"
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
                <p className="text-[10px] font-bold uppercase text-white">
                  CONFERIR CONFLITOS:
                </p>

                <div className="space-y-1.5">
                  {/* Switch DATAS */}
                  <button
                    type="button"
                    onClick={() => setCheckConflictDates((prev) => !prev)}
                    className="flex items-center gap-2 text-[11px] text-white cursor-pointer"
                  >
                    <span
                      className={`w-7 h-3.5 rounded-full border flex items-center px-0.5 transition-colors ${
                        checkConflictDates
                          ? 'bg-[#E8AC51] border-[#E8AC51] justify-end text-white'
                          : 'bg-[#1c1c1e] border-white/10 justify-between text-white'
                      }`}
                    >
                      {!checkConflictDates && (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e]" />
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </>
                      )}
                      {checkConflictDates && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e]" />
                      )}
                    </span>
                    <span className="uppercase font-medium">DATAS</span>
                    <CalendarDays className="w-3.5 h-3.5 text-white" />
                  </button>

                  {/* Switch PRODUTOS */}
                  <button
                    type="button"
                    onClick={() => setCheckConflictProducts((prev) => !prev)}
                    className="flex items-center gap-2 text-[11px] text-white cursor-pointer"
                  >
                    <span
                      className={`w-7 h-3.5 rounded-full border flex items-center px-0.5 transition-colors ${
                        checkConflictProducts
                          ? 'bg-[#E8AC51] border-[#E8AC51] justify-end text-white'
                          : 'bg-[#1c1c1e] border-white/10 justify-between text-white'
                      }`}
                    >
                      {!checkConflictProducts && (
                        <>
                          <span className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e]" />
                          <X className="w-2.5 h-2.5 stroke-[3]" />
                        </>
                      )}
                      {checkConflictProducts && (
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1c1c1e]" />
                      )}
                    </span>
                    <span className="uppercase font-medium">PRODUTOS</span>
                    <Tags className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </div>

              {/* Lado Direito: SELECIONAR TUDO: */}
              <div className="lg:col-span-8">
                <p className="text-[10px] font-bold uppercase text-white mb-1">
                  SELECIONAR TUDO:
                </p>

                <div className="bg-[#1c1c1e] rounded-xs px-4 py-3 flex flex-wrap items-start justify-center gap-3">
                  {MEDIA_SELECTION_BLOCKS.map(
                    ({ key, label, Icon, hasAlbumSelect }) => {
                      const isSelected = Boolean(selectedBlocks[key]);
                      return (
                        <div
                          key={key}
                          className="flex flex-col items-center w-14"
                        >
                          <span className="text-[8px] font-semibold uppercase text-neutral-400 mb-1 tracking-tight">
                            {label}
                          </span>

                          {/* Bloco Quadrado Selecionável */}
                          <button
                            type="button"
                            onClick={() => handleToggleBlock(key)}
                            className={`relative w-10 h-10 rounded-xs border flex items-center justify-center transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-[#880E1B] border-[#880E1B] text-white'
                                : 'bg-[#1c1c1e] border-white/10 text-neutral-400 hover:border-white/20'
                            }`}
                          >
                            <Icon className="w-5 h-5 stroke-[1.8]" />

                            {/* Checkbox circular no canto superior direito */}
                            <span
                              className={`absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                                isSelected
                                  ? 'bg-[#1c1c1e] border-white/10 text-white'
                                  : 'bg-[#1c1c1e] border-white/10 text-transparent'
                              }`}
                            >
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </span>
                          </button>

                          {/* Select pequeno 'ALBUM v' abaixo dos 4 primeiros blocos */}
                          {hasAlbumSelect && (
                            <div className="mt-1 w-12 border border-white/10 rounded-[2px] px-1 py-0.5 flex items-center justify-between text-[7px] font-semibold uppercase text-neutral-400 bg-[#1c1c1e]">
                              <span>ALBUM</span>
                              <ChevronDown className="w-2 h-2 text-neutral-400" />
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
              className="w-36 py-2.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[11px] font-semibold uppercase tracking-wide rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
            <button
              type="button"
              onClick={() => navigate('/pacotes')}
              className="w-44 py-2.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[11px] font-semibold uppercase tracking-wide rounded-xs transition-colors cursor-pointer"
            >
              SALVAR E ENVIAR
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

