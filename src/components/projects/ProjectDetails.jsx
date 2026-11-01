import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  Pencil,
  ToggleLeft,
  Globe,
} from 'lucide-react';
import CreateProjectModal from './CreateProjectModal';

const DEFAULT_MOCK_PROJECT = {
  id: '1',
  projectName: 'foto',
  status: 'ATIVO',
  responsibleBooker: 'Mozart de Marias',
  createdBy: 'Mozart de Marias',
  createdAt: '2026-10-30 15:04:39',
  department: '',
  client: 'rubem',
  producer: '',
  workDatesLabel: '31/Out/2026 até 31/Out/2026',
  description: '',
  medias: '',
  type: '',
  products: '',
  exclusivity: false,
  usagePeriodRangeLabel: '30/Out/2026 - 31/Out/2026',
  exclusivityTerritory: '',
  activities: [
    { key: 'casting', label: 'CASTING', count: 0, bg: 'bg-[#f8b400]' },
    { key: 'callback', label: 'CALLBACK', count: 0, bg: 'bg-[#c5299b]' },
    { key: 'opcao', label: 'OPÇÃO', count: 0, bg: 'bg-[#f06711]' },
    { key: 'proupa', label: 'P. ROUPA', count: 0, bg: 'bg-[#3ab565]' },
    { key: 'trabalho', label: 'TRABALHO', count: 0, bg: 'bg-[#2aa9d2]' },
  ],
  billingSummary: {
    grossAmount: '0.00',
    extraCommission: '0.00',
    extraExpense: '0.00',
    totalToCharge: '0.00',
  },
};

export default function ProjectDetails({ projectsMap, onSaveProject }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentProject =
    (projectsMap && projectsMap[id]) || {
      ...DEFAULT_MOCK_PROJECT,
      id: id || '1',
    };

  const [projectState, setProjectState] = useState(currentProject);
  const [topSearch, setTopSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' ou 'edit'

  // Sincroniza quando o ID da rota muda
  React.useEffect(() => {
    const found =
      (projectsMap && projectsMap[id]) || {
        ...DEFAULT_MOCK_PROJECT,
        id: id || '1',
      };
    setProjectState(found);
  }, [id, projectsMap]);

  const handleToggleProjectStatus = () => {
    setProjectState((prev) => ({
      ...prev,
      status: prev.status === 'ATIVO' ? 'CANCELADO' : 'ATIVO',
    }));
  };

  const handleOpenCreateModal = () => {
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = () => {
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleModalSave = (formData) => {
    if (modalMode === 'edit') {
      const updated = {
        ...projectState,
        department: formData.department || '',
        projectName: formData.projectName?.trim() || projectState.projectName,
        client: formData.client?.trim() || projectState.client,
        producer: formData.producer || '',
        description: formData.description || '',
        medias: formData.medias || '',
        type: formData.type || '',
        products: formData.products || '',
        exclusivity: Boolean(formData.exclusivity),
        exclusivityTerritory: formData.exclusivityTerritory || '',
      };
      setProjectState(updated);
      if (onSaveProject) {
        onSaveProject(updated, projectState.id);
      }
    } else if (onSaveProject) {
      const newId = onSaveProject(formData);
      navigate(`/projetos/${newId || '1'}`);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-white flex flex-col justify-between py-4 px-4 sm:px-8">
      <div className="max-w-[1160px] w-full mx-auto">
        {/* Topo: Breadcrumb dinâmico 'Início > Projetos > foto' e barra de pesquisa */}
        <div className="bg-[#f5f5f5] border border-slate-200/80 rounded-xs px-4 py-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-xs">
            <Link
              to="/"
              className="text-[#0077b5] hover:underline font-normal"
            >
              Início
            </Link>
            <span className="text-slate-400">&gt;</span>
            <Link
              to="/projetos"
              className="text-[#0077b5] hover:underline font-normal"
            >
              Projetos
            </Link>
            <span className="text-slate-400">&gt;</span>
            <span className="text-slate-500 font-normal">
              {projectState.projectName}
            </span>
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
              onClick={handleOpenCreateModal}
              title="Criar novo projeto"
              className="w-7 h-7 bg-[#0077b5] hover:bg-[#006399] text-white rounded-xs flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Plus className="w-4 h-4 stroke-[2.8]" />
            </button>
          </div>
        </div>

        {/* Container Principal de Detalhes do Projeto (Imagem 30) */}
        <div className="border border-slate-200 rounded-xs bg-white overflow-hidden">
          {/* Bloco Superior de Informações */}
          <div className="bg-[#f4f4f4] border-b border-slate-200 px-6 py-5 relative">
            {/* Link EDITAR no canto superior direito */}
            <button
              type="button"
              onClick={handleOpenEditModal}
              className="absolute top-5 right-6 inline-flex items-center gap-1.5 text-[11px] text-[#0077b5] hover:underline uppercase font-normal cursor-pointer"
            >
              <Pencil className="w-3.5 h-3.5 fill-[#0077b5] text-[#0077b5]" />
              <span>EDITAR</span>
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Esquerda: Título, Status e Metadados de Criação */}
              <div className="lg:col-span-4 space-y-4">
                <div>
                  <h1 className="text-[25px] text-slate-700 font-normal leading-tight">
                    {projectState.projectName}{' '}
                    <span className="text-[17px] text-slate-500 font-normal">
                      #{projectState.id}
                    </span>
                  </h1>

                  <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400 text-[11px]">Status:</span>
                    <span
                      className={`px-2.5 py-1 rounded-xs text-white text-[11px] font-bold uppercase leading-none ${
                        projectState.status === 'ATIVO'
                          ? 'bg-[#0077b5]'
                          : 'bg-slate-500'
                      }`}
                    >
                      {projectState.status}
                    </span>

                    <button
                      type="button"
                      onClick={handleToggleProjectStatus}
                      className="inline-flex items-center gap-1 text-[11px] text-[#0077b5] hover:underline uppercase ml-1 cursor-pointer"
                    >
                      <ToggleLeft className="w-4 h-4 text-[#0077b5]" />
                      <span>
                        {projectState.status === 'ATIVO'
                          ? 'CANCELAR ESTE PROJETO'
                          : 'REATIVAR ESTE PROJETO'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Metadados de Booker e Criação */}
                <div className="space-y-1.5 pt-1 text-[11px]">
                  <div className="grid grid-cols-12 gap-3 items-center">
                    <span className="col-span-5 text-right text-slate-400">
                      Booker Responsável
                    </span>
                    <span className="col-span-7 text-slate-800 italic">
                      {projectState.responsibleBooker}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-3 items-center">
                    <span className="col-span-5 text-right text-slate-400">
                      Criação por
                    </span>
                    <span className="col-span-7 text-slate-800 italic">
                      {projectState.createdBy}
                    </span>
                  </div>

                  <div className="grid grid-cols-12 gap-3 items-center">
                    <span className="col-span-5 text-right text-slate-400">
                      Criado em
                    </span>
                    <span className="col-span-7 text-slate-800 italic">
                      {projectState.createdAt}
                    </span>
                  </div>
                </div>
              </div>

              {/* Direita: Lista de Atributos do Projeto */}
              <div className="lg:col-span-8 pr-16 space-y-1.5 text-[11px]">
                {/* Departamento */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Departamento
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.department}
                  </span>
                </div>

                {/* Cliente */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Cliente
                  </span>
                  <span className="col-span-8 sm:col-span-9">
                    <button
                      type="button"
                      onClick={() => navigate('/contatos')}
                      className="text-[#0077b5] hover:underline font-bold text-xs cursor-pointer"
                    >
                      {projectState.client}
                    </button>
                  </span>
                </div>

                {/* Produtor */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Produtor
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.producer}
                  </span>
                </div>

                {/* Data(s) do trabalho */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Data(s) do trabalho
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.workDatesLabel}
                  </span>
                </div>

                {/* Descrição */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Descrição
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.description}
                  </span>
                </div>

                {/* Mídias */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Mídias
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.medias}
                  </span>
                </div>

                {/* Tipo */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Tipo
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.type}
                  </span>
                </div>

                {/* Produto */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Produto
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.products}
                  </span>
                </div>

                {/* Exclusividade */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[18px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Exclusividade
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs uppercase">
                    {projectState.exclusivity ? 'SIM' : 'NÃO'}
                  </span>
                </div>

                {/* Período de uso */}
                <div className="grid grid-cols-12 gap-4 items-start min-h-[34px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400">
                    Período de uso
                  </span>
                  <div className="col-span-8 sm:col-span-9 text-slate-700 text-xs pt-4">
                    {projectState.usagePeriodRangeLabel}
                  </div>
                </div>

                {/* Território de exclusividade */}
                <div className="grid grid-cols-12 gap-4 items-baseline min-h-[24px]">
                  <span className="col-span-4 sm:col-span-3 text-right text-slate-400 leading-tight">
                    Território de
                    <br />
                    exclusividade
                  </span>
                  <span className="col-span-8 sm:col-span-9 text-slate-700 text-xs">
                    {projectState.exclusivityTerritory}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Secções Inferiores (3 Colunas: Pacotes, Atividades, Orçamento + Faturamento Sumário) */}
          <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-5 items-start bg-white">
            {/* Coluna 1: Card 'Pacotes' */}
            <div className="border border-slate-200 rounded-xs bg-white overflow-hidden shadow-2xs">
              <div className="bg-[#f5f5f5] px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                <h3 className="text-[13px] font-bold text-slate-800">
                  Pacotes
                </h3>
                <button
                  type="button"
                  onClick={() => navigate('/pacotes')}
                  className="inline-flex items-center gap-1 text-[11px] text-[#0077b5] hover:underline uppercase font-normal cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                  <span>ADICIONAR</span>
                </button>
              </div>
              <div className="min-h-[42px] bg-white" />
            </div>

            {/* Coluna 2: Card 'Atividades' */}
            <div className="border border-slate-200 rounded-xs bg-white overflow-hidden shadow-2xs">
              <div className="bg-[#f5f5f5] px-4 py-2.5 border-b border-slate-200">
                <h3 className="text-[13px] font-bold text-slate-800">
                  Atividades
                </h3>
              </div>
              <div className="p-3.5">
                {/* 5 Blocos Coloridos lado a lado */}
                <div className="grid grid-cols-5 gap-1">
                  {projectState.activities.map((act) => (
                    <div
                      key={act.key}
                      className={`${act.bg} text-white rounded-xs py-1.5 px-1 flex flex-col items-center justify-center text-center`}
                    >
                      <span className="text-[9px] font-semibold tracking-tight uppercase leading-tight">
                        {act.label}
                      </span>
                      <span className="text-xs font-semibold leading-tight mt-0.5">
                        {act.count}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mensagem 'No activities found' */}
                <div className="py-8 text-center">
                  <p className="text-[13px] text-slate-400 font-normal">
                    No activities found
                  </p>
                </div>
              </div>
            </div>

            {/* Coluna 3: Card 'Orçamento' e Card 'Faturamento Sumário' */}
            <div className="space-y-4">
              {/* Card 'Orçamento' */}
              <div className="border border-slate-200 rounded-xs bg-white overflow-hidden shadow-2xs">
                <div className="bg-[#f5f5f5] px-4 py-2.5 border-b border-slate-200 flex items-center justify-between">
                  <h3 className="text-[13px] font-bold text-slate-800">
                    Orçamento
                  </h3>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1 text-[11px] text-[#0077b5] hover:underline uppercase font-normal cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5 stroke-[2.8]" />
                    <span>ADD</span>
                  </button>
                </div>
                <div className="min-h-[36px] bg-white" />
              </div>

              {/* Card 'Faturamento Sumário' */}
              <div className="border border-slate-200 rounded-xs bg-white overflow-hidden shadow-2xs">
                <div className="bg-[#f5f5f5] px-4 py-2.5 border-b border-slate-200">
                  <h3 className="text-[13px] font-bold text-slate-800">
                    Faturamento Sumário
                  </h3>
                </div>
                <div className="p-4 space-y-1.5 text-[12px] text-slate-500">
                  <div className="flex items-center justify-between">
                    <span>Montante Bruto</span>
                    <span>{projectState.billingSummary.grossAmount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Comissão extra</span>
                    <span>{projectState.billingSummary.extraCommission}</span>
                  </div>
                  <div className="flex items-center justify-between pb-1">
                    <span>Gasto extra</span>
                    <span>{projectState.billingSummary.extraExpense}</span>
                  </div>

                  <div className="border-t border-slate-800 pt-2 flex items-center justify-between font-bold text-slate-800 text-[12px]">
                    <span>Valor a ser cobrado</span>
                    <span>{projectState.billingSummary.totalToCharge}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé Padrão ManagerFashion */}
      <footer className="mt-10 pb-6 text-center space-y-2 text-xs text-slate-500">
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

      {/* Modal para Criar ou Editar Projeto */}
      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSaveProject={handleModalSave}
        initialData={modalMode === 'edit' ? projectState : null}
      />
    </div>
  );
}

