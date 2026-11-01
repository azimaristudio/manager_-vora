import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  Calendar,
  ArrowDownWideNarrow,
  RefreshCw,
  Download,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Globe,
} from 'lucide-react';
import CreateProjectModal from './CreateProjectModal';

const STATUS_LEGEND = [
  { label: 'Sem Status', color: 'bg-[#777777]' },
  { label: 'Ativo', color: 'bg-[#0077b5]' },
  { label: 'Confirmado', color: 'bg-[#28a745]' },
  { label: 'Expirado', color: 'bg-[#ff0080]' },
  { label: 'Cancelado', color: 'bg-[#999999]' },
  { label: 'Fechado', color: 'bg-[#f37021]' },
];

export default function ProjectsList({ onProjectCreated }) {
  const navigate = useNavigate();

  // Estado para abrir/fechar o modal de criação de projeto (Imagem 29)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Estados locais dos filtros da barra de ferramentas (Imagem 28)
  const [topSearch, setTopSearch] = useState('');
  const [creatorFilter, setCreatorFilter] = useState('Todos');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [dateRangeFilter, setDateRangeFilter] = useState('');
  const [referenceDateFilter, setReferenceDateFilter] = useState(
    'Primeira data do projeto'
  );
  const [projectNameFilter, setProjectNameFilter] = useState('');
  const [sortBy, setSortBy] = useState('Data de criação');
  const [sortDirection, setSortDirection] = useState('DESC');
  const [pageSize, setPageSize] = useState('10');

  const handleResetFilters = () => {
    setCreatorFilter('Todos');
    setStatusFilter('Todos');
    setDateRangeFilter('');
    setReferenceDateFilter('Primeira data do projeto');
    setProjectNameFilter('');
    setSortBy('Data de criação');
    setSortDirection('DESC');
  };

  const handleSaveNewProject = (projectFormData) => {
    if (onProjectCreated) {
      const createdId = onProjectCreated(projectFormData);
      navigate(`/projetos/${createdId || '1'}`);
    } else {
      navigate('/projetos/1');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between py-4 px-4 sm:px-8">
      <div className="max-w-[1160px] w-full mx-auto">
        {/* Topo: Breadcrumb 'Início > Projetos' e barra de pesquisa com botão '+' */}
        <div className="bg-[#f5f5f5] border border-slate-200/80 rounded-xs px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs">
            <Link
              to="/"
              className="text-[#0077b5] hover:underline font-normal"
            >
              Início
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500 font-normal">Projetos</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-white border border-slate-200 rounded-xs overflow-hidden">
              <span className="px-2.5 py-1.5 bg-[#eaeaea] border-r border-slate-200 text-slate-600 flex items-center justify-center">
                <Search className="w-3.5 h-3.5 stroke-[2.2]" />
              </span>
              <input
                type="text"
                value={topSearch}
                onChange={(e) => setTopSearch(e.target.value)}
                placeholder="Pesquisar projeto"
                className="w-48 sm:w-60 px-2.5 py-1 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none"
              />
            </div>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              title="Criar novo projeto"
              className="w-7 h-7 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.8]" />
            </button>
          </div>
        </div>

        {/* Barra de Ferramentas (Filtros) */}
        <div className="flex flex-wrap items-end gap-2.5 mb-3">
          {/* Ícone de Funil Azul à esquerda */}
          <div className="pb-1.5 pr-0.5 text-[#0077b5]">
            <Filter className="w-3.5 h-3.5 fill-[#0077b5]" />
          </div>

          {/* Criador */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-500">Criador</label>
            <div className="relative w-32">
              <select
                value={creatorFilter}
                onChange={(e) => setCreatorFilter(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-white text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#0077b5]"
              >
                <option value="Todos">Todos</option>
                <option value="Mozart de Marias">Mozart de Marias</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-500">Status</label>
            <div className="relative w-28">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-white text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#0077b5]"
              >
                <option value="Todos">Todos</option>
                <option value="Sem Status">Sem Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Confirmado">Confirmado</option>
                <option value="Expirado">Expirado</option>
                <option value="Cancelado">Cancelado</option>
                <option value="Fechado">Fechado</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Período de datas */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-500">
              Período de datas
            </label>
            <div className="relative w-64">
              <Calendar className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={dateRangeFilter}
                onChange={(e) => setDateRangeFilter(e.target.value)}
                placeholder="-"
                className="w-full h-8 pl-8 pr-3 border border-slate-200 rounded-xs bg-white text-xs text-center text-slate-600 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
              />
            </div>
          </div>

          {/* Data de referência */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-500">
              Data de referência
            </label>
            <div className="relative w-36">
              <select
                value={referenceDateFilter}
                onChange={(e) => setReferenceDateFilter(e.target.value)}
                className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-white text-xs text-slate-600 truncate appearance-none focus:outline-none focus:border-[#0077b5]"
              >
                <option value="Primeira data do projeto">
                  Primeira data do projeto
                </option>
                <option value="Data de criação">Data de criação</option>
                <option value="Última atualização">Última atualização</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Nome do Projeto */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-500">
              Nome do Projeto
            </label>
            <input
              type="text"
              value={projectNameFilter}
              onChange={(e) => setProjectNameFilter(e.target.value)}
              className="w-28 h-8 px-2.5 border border-slate-200 rounded-xs bg-white text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
            />
          </div>

          {/* Ícone de Ordenação */}
          <div className="pb-1.5 pl-1 text-[#0077b5]">
            <ArrowDownWideNarrow className="w-4 h-4" />
          </div>

          {/* Ordenar por */}
          <div className="flex flex-col gap-1">
            <label className="text-[11px] text-slate-500">Ordenar por</label>
            <div className="flex items-center gap-1.5">
              <div className="relative w-36">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-white text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="Data de criação">Data de criação</option>
                  <option value="Nome do Projeto">Nome do Projeto</option>
                  <option value="Data do trabalho">Data do trabalho</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              <div className="relative w-20">
                <select
                  value={sortDirection}
                  onChange={(e) => setSortDirection(e.target.value)}
                  className="w-full h-8 px-2.5 pr-6 border border-slate-200 rounded-xs bg-white text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="DESC">DESC</option>
                  <option value="ASC">ASC</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Botão Refresh Verde */}
          <button
            type="button"
            onClick={handleResetFilters}
            title="Redefinir filtros"
            className="h-8 px-1.5 text-[#28a745] hover:text-emerald-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 stroke-[2.5]" />
          </button>

          {/* Botão PESQUISAR Azul */}
          <button
            type="button"
            className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Search className="w-3 h-3 stroke-[2.5]" />
            <span>PESQUISAR</span>
          </button>
        </div>

        {/* Legenda de Status à esquerda + Exportação Excel e Paginação à direita */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          {/* Legenda de Status */}
          <div className="flex flex-wrap items-center gap-2.5 text-[11px] text-slate-500">
            {STATUS_LEGEND.map((item) => (
              <div key={item.label} className="flex items-center gap-1">
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block ${item.color}`}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          {/* Exportação Excel e Paginação */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              className="h-7 px-2.5 bg-[#5fa2dd] hover:bg-[#4b8fc9] text-white text-[10px] font-semibold uppercase rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Download className="w-3 h-3 stroke-[2.5]" />
              <span>EXPORTAÇÃO EXCEL</span>
            </button>

            <div className="flex items-center gap-2 text-xs text-slate-600">
              <button
                type="button"
                className="w-6 h-7 bg-[#e2e2e2] hover:bg-slate-300 text-slate-600 rounded-xs flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <span className="px-2 text-xs text-slate-600">
                - <strong className="text-slate-800">De</strong> 0
              </span>
              <button
                type="button"
                className="w-6 h-7 bg-[#e2e2e2] hover:bg-slate-300 text-slate-600 rounded-xs flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="relative w-16 ml-1">
              <select
                value={pageSize}
                onChange={(e) => setPageSize(e.target.value)}
                className="w-full h-7 px-2 pr-5 border border-slate-200 rounded-xs bg-white text-xs text-slate-600 appearance-none focus:outline-none focus:border-[#0077b5]"
              >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Corpo Principal: Estado Vazio ('Nenhum registro encontrado') */}
        <div className="py-24 flex flex-col items-center justify-center text-center">
          <p className="text-[19px] text-slate-600 font-normal">
            Nenhum registro encontrado
          </p>
        </div>
      </div>

      {/* Rodapé Padrão ManagerFashion */}
      <footer className="mt-12 pb-6 text-center space-y-2 text-xs text-slate-500">
        <div className="flex items-center justify-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-slate-500">
            <Globe className="w-3.5 h-3.5" />
            <span>Idiomas</span>
          </span>
          <button
            type="button"
            className="text-[#0077b5] underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ENGLISH
          </button>
          <button
            type="button"
            className="text-[#0077b5] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            ESPAÑOL
          </button>
          <button
            type="button"
            className="text-[#0077b5] hover:underline font-normal text-[11px] uppercase cursor-pointer"
          >
            PORTUGUÊS
          </button>
        </div>
        <p className="text-slate-500 text-xs">© ManagerFashion.com</p>
      </footer>

      {/* Modal de Criação de Projeto (Imagem 29) */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSaveProject={handleSaveNewProject}
      />
    </div>
  );
}

