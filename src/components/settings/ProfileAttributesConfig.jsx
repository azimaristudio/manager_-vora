import React, { useState } from 'react';
import {
  Search,
  Eye,
  AlertTriangle,
  Lock,
  Check,
  GripVertical,
} from 'lucide-react';

const INITIAL_SECTIONS = [
  {
    id: 'foto-de-perfil',
    title: 'Foto de Perfil',
    fields: [
      { id: 'fp-1', name: 'Foto de Perfil', flags: [true, true, false, false, false, false] },
    ],
  },
  {
    id: 'detalhes-de-corpo',
    title: 'Detalhes de corpo',
    fields: [
      { id: 'dc-1', name: 'Tom da Pele', flags: [true, false, true, false, true, false] },
      { id: 'dc-2', name: 'Cicatrizes', flags: [true, false, false, false, false, false] },
      { id: 'dc-3', name: 'Tatuagem', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'dc-4', name: 'Notas', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'dc-5', name: 'Piercing', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'dc-6', name: 'Notas', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'dc-7', name: 'Marcas de nascimento', flags: [true, false, false, false, false, false] },
      { id: 'dc-8', name: 'Restrições corporais', flags: [true, false, false, false, false, false] },
      { id: 'dc-9', name: 'Restrições alimentárias', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'dc-10', name: 'Valor', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'dc-11', name: 'Notas', isSubItem: true, flags: [true, false, true, false, true, false] },
    ],
  },
  {
    id: 'contatos',
    title: 'Contatos',
    fields: [
      { id: 'ct-1', name: 'Relação', flags: [true, false, true, false, true, false] },
      { id: 'ct-2', name: 'Nome', flags: [true, false, true, false, true, false] },
      { id: 'ct-3', name: 'Telefone', flags: [true, false, true, false, true, false] },
      { id: 'ct-4', name: 'WhatsApp', flags: [false, false, false, false, false, false] },
      { id: 'ct-5', name: 'Email', flags: [false, false, false, false, false, false] },
      { id: 'ct-6', name: 'Endereço', flags: [false, false, false, false, false, false] },
      { id: 'ct-7', name: 'Data de Nascimento', flags: [false, false, false, false, false, false] },
      { id: 'ct-8', name: 'RG', flags: [false, false, false, false, false, false] },
      { id: 'ct-9', name: 'CNPJ', flags: [false, false, false, false, false, false] },
    ],
  },
  {
    id: 'info-basica',
    title: 'Info básica',
    fields: [
      { id: 'ib-1', name: 'Categorias', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'ib-2', name: 'Departamentos', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'ib-3', name: 'Etiquetas', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'ib-4', name: 'Booker de referencia', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'ib-5', name: 'Status', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'ib-6', name: 'Gênero', locked: true, flags: [false, false, true, true, true, true] },
      { id: 'ib-7', name: 'Identidade de Gênero', flags: [true, false, true, false, true, false] },
      { id: 'ib-8', name: 'Pronome', flags: [true, false, true, false, true, false] },
      { id: 'ib-9', name: 'Nome Artístico', locked: true, flags: [true, true, true, true, true, true] },
      { id: 'ib-10', name: 'Nome completo', flags: [true, true, true, true, true, true] },
      { id: 'ib-11', name: 'Nacionalidade', flags: [true, false, true, true, true, true] },
      { id: 'ib-12', name: 'Cidade de nascimento', flags: [true, false, true, false, true, false] },
      { id: 'ib-13', name: 'Idiomas', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'ib-14', name: 'Nível', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ib-15', name: 'Sotaque', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ib-16', name: 'Residência', isGroupHeader: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-17', name: 'País', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-18', name: 'Estado', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-19', name: 'Cidade', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-20', name: 'Endereço', isGroupHeader: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-21', name: 'Endereço Atual', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-22', name: 'Rua', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-23', name: 'Número', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-24', name: 'Bairro', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-25', name: 'CEP', isSubItem: true, flags: [true, false, true, true, true, true] },
      { id: 'ib-26', name: 'Etnia', flags: [true, false, false, false, false, false] },
      { id: 'ib-27', name: 'Data de Nascimento', locked: true, flags: [false, false, true, true, true, true] },
      { id: 'ib-28', name: 'Email', locked: true, flags: [false, false, true, true, true, true] },
      { id: 'ib-29', name: 'Emails alternativos', isGroupHeader: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-30', name: 'Etiqueta', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-31', name: 'Telefones', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'ib-32', name: 'Notas', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ib-33', name: 'Redes sociais', isGroupHeader: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-34', name: 'models.com', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-35', name: 'WhatsApp', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-36', name: 'Facebook', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-37', name: 'X (Twitter)', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-38', name: 'Instagram', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-39', name: 'Youtube', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-40', name: 'Vimeo', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-41', name: 'IMDB', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-42', name: 'TikTok', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-43', name: 'Snapchat', isSubItem: true, flags: [true, false, false, false, false, false] },
      { id: 'ib-44', name: 'Notas', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'ib-45', name: 'Notas Pacotes', locked: true, flags: [false, false, false, false, false, false] },
    ],
  },
  {
    id: 'medidas',
    title: 'Medidas',
    fields: [
      { id: 'md-1', name: 'Altura', flags: [true, false, true, true, true, true] },
      { id: 'md-2', name: 'Busto', flags: [false, false, false, false, false, false] },
      { id: 'md-3', name: 'Tórax', flags: [false, false, false, false, false, false] },
      { id: 'md-4', name: 'Cintura', flags: [false, false, false, false, false, false] },
      { id: 'md-5', name: 'Quadril', flags: [false, false, false, false, false, false] },
      { id: 'md-6', name: 'Peso', flags: [true, false, true, false, true, false] },
      { id: 'md-7', name: 'Olhos', flags: [true, false, true, true, true, true] },
      { id: 'md-8', name: 'Cabelo', flags: [true, false, true, true, true, true] },
      { id: 'md-9', name: 'Cor de Cabelo', flags: [true, false, true, false, true, false] },
      { id: 'md-10', name: 'Tamanho do cabelo', flags: [true, false, true, true, true, true] },
      { id: 'md-11', name: 'Tipo de cabelo', flags: [true, false, true, true, true, true] },
      { id: 'md-12', name: 'Soutien', isGroupHeader: true, flags: [false, false, false, false, false, false] },
      { id: 'md-13', name: 'Número', isSubItem: true, flags: [false, false, false, false, false, false] },
      { id: 'md-14', name: 'Unidade', isSubItem: true, flags: [false, false, false, false, false, false] },
      { id: 'md-15', name: 'Bojo', flags: [false, false, false, false, false, false] },
      { id: 'md-16', name: 'Camisa', isGroupHeader: true, flags: [true, false, false, false, true, false] },
      { id: 'md-17', name: 'Tamanho', isSubItem: true, flags: [true, false, false, false, true, false] },
      { id: 'md-18', name: 'Número', isSubItem: true, flags: [true, false, false, false, true, false] },
      { id: 'md-19', name: 'Manequim', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'md-20', name: 'Cintura', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'md-21', name: 'Longo', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'md-22', name: 'Unidade', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'md-23', name: 'Sapato', isGroupHeader: true, flags: [true, true, true, false, true, false] },
      { id: 'md-24', name: 'Número', isSubItem: true, flags: [true, true, true, false, true, false] },
      { id: 'md-25', name: 'Número BIS', isSubItem: true, flags: [true, true, true, false, true, false] },
      { id: 'md-26', name: 'Unidade', isSubItem: true, flags: [true, true, true, false, true, false] },
    ],
  },
  {
    id: 'restricoes-sessao',
    title: 'Restrições para sessão fotografica',
    fields: [
      { id: 'rs-1', name: 'Sem abaya', flags: [false, false, false, false, false, false] },
      { id: 'rs-2', name: 'Sem hijab', flags: [false, false, false, false, false, false] },
      { id: 'rs-3', name: 'Topless', flags: [true, false, false, false, false, false] },
      { id: 'rs-4', name: 'Nudez total', flags: [true, false, false, false, false, false] },
    ],
  },
  {
    id: 'habilidades',
    title: 'Habilidades',
    fields: [
      { id: 'hb-1', name: 'Esporte', flags: [true, false, true, false, true, false] },
      { id: 'hb-2', name: 'Dirige/Pilota', flags: [true, false, true, false, true, false] },
      { id: 'hb-3', name: 'Música', flags: [true, false, true, false, true, false] },
      { id: 'hb-4', name: 'Outras habilidades', flags: [true, false, true, false, true, false] },
    ],
  },
  {
    id: 'carreira',
    title: 'Carreira',
    fields: [
      { id: 'cr-1', name: 'Começo', flags: [false, false, false, false, false, false] },
      { id: 'cr-2', name: 'experiência', flags: [false, false, false, false, false, false] },
      { id: 'cr-3', name: 'Principais trabalhos', flags: [false, false, false, false, false, false] },
      { id: 'cr-4', name: 'Outras habilidades', flags: [false, false, false, false, false, false] },
      { id: 'cr-5', name: 'Outras informações sobre a carreira', flags: [true, false, true, true, true, true] },
      { id: 'cr-6', name: 'Aceita fazer figuração', flags: [false, false, false, false, false, false] },
    ],
  },
  {
    id: 'info-administrativas',
    title: 'Informações administrativas',
    fields: [
      { id: 'ia-1', name: 'Estado Civil', flags: [true, false, true, true, true, true] },
      { id: 'ia-2', name: 'Filhos', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-3', name: 'Notas', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-4', name: 'Séries', flags: [false, false, false, false, false, false] },
      { id: 'ia-5', name: 'Carteira de Trabalho', flags: [false, false, false, false, false, false] },
      { id: 'ia-6', name: 'RG', flags: [true, false, true, true, true, true] },
      { id: 'ia-7', name: 'Órgão expedidor', flags: [false, false, false, false, false, false] },
      { id: 'ia-8', name: 'CPF', flags: [true, false, true, true, true, true] },
      { id: 'ia-9', name: 'Tipo de faturamento', isGroupHeader: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-10', name: 'Razão social', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-11', name: 'Nome Fantasia', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-12', name: 'CNPJ', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-13', name: 'Endereço de Faturamento', isSubItem: true, flags: [true, false, true, false, true, false] },
      { id: 'ia-14', name: 'Inscrição municipal', flags: [true, false, false, false, false, false] },
    ],
  },
  {
    id: 'comissoes',
    title: 'Comissões',
    fields: [
      { id: 'cm-1', name: 'Comissão', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'cm-2', name: 'Tipo', isSubItem: true, locked: true, flags: [false, false, false, false, false, false] },
      { id: 'cm-3', name: 'Talento', isSubItem: true, locked: true, flags: [false, false, false, false, false, false] },
      { id: 'cm-4', name: 'Agência', isSubItem: true, locked: true, flags: [false, false, false, false, false, false] },
      { id: 'cm-5', name: 'Agencia Mãe', locked: true, flags: [false, false, false, false, false, false] },
      { id: 'cm-6', name: 'Scouter', locked: true, flags: [false, false, false, false, false, false] },
    ],
  },
  {
    id: 'termos',
    title: 'Termos',
    fields: [
      { id: 'tm-1', name: 'Autorização de uso de imagem', flags: [true, true, true, true, true, true] },
    ],
  },
  {
    id: 'viagens',
    title: 'Viagens',
    fields: [
      { id: 'vg-1', name: 'Passaporte', flags: [false, false, false, false, false, false] },
      { id: 'vg-2', name: 'Visto USA', flags: [false, false, false, false, false, false] },
      { id: 'vg-3', name: 'Disponível para viajar', flags: [false, false, false, false, false, false] },
      { id: 'vg-4', name: 'Condição de saúde para viajar', flags: [false, false, false, false, false, false] },
      { id: 'vg-5', name: 'Viajando', flags: [false, false, false, false, false, false] },
    ],
  },
  {
    id: 'vacinas',
    title: 'Vacinas',
    fields: [
      { id: 'vc-1', name: 'Vacinas', isGroupHeader: true, flags: [false, false, false, false, false, false] },
      { id: 'vc-2', name: 'Dose', isSubItem: true, locked: true, flags: [false, false, false, false, false, false] },
      { id: 'vc-3', name: 'Data', isSubItem: true, locked: true, flags: [false, false, false, false, false, false] },
      { id: 'vc-4', name: 'Laboratório', isSubItem: true, locked: true, flags: [false, false, false, false, false, false] },
    ],
  },
  {
    id: 'drt',
    title: 'DRT',
    fields: [
      { id: 'dr-1', name: 'Número', isGroupHeader: true, locked: true, flags: [true, false, true, false, false, false] },
      { id: 'dr-2', name: 'Ator', isSubItem: true, locked: true, flags: [true, false, true, false, false, false] },
      { id: 'dr-3', name: 'Modelo', isSubItem: true, locked: true, flags: [true, false, true, false, false, false] },
      { id: 'dr-4', name: 'Apresentador', isSubItem: true, locked: true, flags: [true, false, true, false, false, false] },
    ],
  },
  {
    id: 'contas-bancarias',
    title: 'Contas Bancárias',
    fields: [
      { id: 'cb-1', name: 'Nome', flags: [true, false, true, false, true, false] },
      { id: 'cb-2', name: 'Agência', flags: [true, false, true, false, true, false] },
      { id: 'cb-3', name: 'Número', flags: [true, false, true, false, true, false] },
      { id: 'cb-4', name: 'Beneficiário', flags: [true, false, false, false, false, false] },
      { id: 'cb-5', name: 'Pessoa', flags: [true, false, true, false, true, true] },
      { id: 'cb-6', name: 'ID de Registro da Pessoa', flags: [false, false, false, false, false, false] },
      { id: 'cb-7', name: 'Endereço', flags: [true, false, false, false, false, false] },
      { id: 'cb-8', name: 'PIX', flags: [false, false, false, false, false, false] },
      { id: 'cb-9', name: 'SWIFT', flags: [false, false, false, false, false, false] },
      { id: 'cb-10', name: 'IBAN', flags: [false, false, false, false, false, false] },
      { id: 'cb-11', name: 'Chave interbancária', flags: [true, false, false, false, false, false] },
      { id: 'cb-12', name: 'Tipo', flags: [true, false, false, false, false, false] },
      { id: 'cb-13', name: 'Notas', flags: [true, false, false, false, false, false] },
    ],
  },
  {
    id: 'carregar',
    title: 'Carregar',
    fields: [
      { id: 'cg-1', name: 'Book', locked: true, flags: [false, false, true, false, true, false] },
      { id: 'cg-2', name: 'Links de vídeo', locked: true, flags: [false, false, true, false, true, false] },
      { id: 'cg-3', name: 'Documentos', locked: true, flags: [false, false, true, false, true, false] },
    ],
  },
];

export default function ProfileAttributesConfig() {
  const [sections, setSections] = useState(INITIAL_SECTIONS);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchBySection, setSearchBySection] = useState({});
  const [savedBanner, setSavedBanner] = useState(false);

  const handleToggleFlag = (sectionId, fieldId, colIndex) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        return {
          ...sec,
          fields: sec.fields.map((f) => {
            if (f.id !== fieldId) return f;
            const nextFlags = [...f.flags];
            nextFlags[colIndex] = !nextFlags[colIndex];
            return { ...f, flags: nextFlags };
          }),
        };
      })
    );
  };

  const handleToggleAllColumn = (sectionId, colIndex) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id !== sectionId) return sec;
        const allChecked = sec.fields.every((f) => f.flags[colIndex]);
        return {
          ...sec,
          fields: sec.fields.map((f) => {
            const nextFlags = [...f.flags];
            nextFlags[colIndex] = !allChecked;
            return { ...f, flags: nextFlags };
          }),
        };
      })
    );
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveChanges = () => {
    setSavedBanner(true);
    setTimeout(() => setSavedBanner(false), 2000);
  };

  const visibleSections =
    activeFilter === 'all'
      ? sections
      : sections.filter((s) => s.id === activeFilter);

  return (
    <div className="pt-1 pb-16 relative">
      {/* Cabeçalho */}
      <div className="mb-3">
        <h2 className="text-xs font-bold text-slate-900">
          Configuração de Atributos de Perfil de Talento
        </h2>
        <p className="text-[11px] text-slate-500 mt-0.5">
          Configure quais atributos são visíveis e obrigatórios na plataforma e
          nas fichas informativas online
        </p>
      </div>

      {/* Legenda das Colunas */}
      <div className="bg-white border border-slate-200 rounded-xs p-3 mb-3 text-[10px]">
        <p className="font-bold text-slate-700 mb-2">Legenda das Colunas</p>
        <div className="flex flex-wrap items-center gap-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-teal-50 text-teal-700 font-semibold rounded-xs border border-teal-200/60">
              Plataforma
            </span>
            <span className="text-slate-500">
              Controla a visibilidade em todo o sistema
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 font-semibold rounded-xs border border-emerald-200/60">
              Novo Talento
            </span>
            <span className="text-slate-500">
              Ficha informativa para registro de novo talento
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 font-semibold rounded-xs border border-amber-200/60">
              Atualização de Perfil
            </span>
            <span className="text-slate-500">
              Ficha informativa para atualização de talento existente
            </span>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap items-center gap-4 text-slate-500">
          <span className="inline-flex items-center gap-1">
            <Eye className="w-3 h-3 text-slate-400" />
            <span>Visível</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <AlertTriangle className="w-3 h-3 text-slate-400" />
            <span>Obrigatório</span>
          </span>
          <span className="inline-flex items-center gap-1">
            <Lock className="w-3 h-3 text-slate-400" />
            <span>Campo bloqueado do sistema</span>
          </span>
        </div>
      </div>

      {/* Botões / Filtros de Seções */}
      <div className="flex flex-wrap items-center gap-1.5 mb-4">
        <button
          type="button"
          onClick={() => setActiveFilter('all')}
          className={`px-2.5 py-1 text-[10px] rounded-xs border transition-colors cursor-pointer ${
            activeFilter === 'all'
              ? 'bg-[#0f82b3] text-white border-[#0f82b3] font-semibold'
              : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          Todas as Seções
        </button>

        {sections.map((sec) => {
          const isActive = activeFilter === sec.id;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => setActiveFilter(sec.id)}
              className={`px-2.5 py-1 text-[10px] rounded-xs border transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[#0f82b3] text-white border-[#0f82b3] font-semibold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {sec.title}
            </button>
          );
        })}
      </div>

      {/* Grelha de Painéis (2 Colunas em Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
        {visibleSections.map((section) => {
          const searchVal = (searchBySection[section.id] || '').toLowerCase();
          const filteredFields = section.fields.filter((f) =>
            f.name.toLowerCase().includes(searchVal)
          );

          return (
            <div
              key={section.id}
              className="bg-white border border-slate-200 rounded-xs shadow-2xs overflow-hidden"
            >
              {/* Cabeçalho Azul Escuro do Painel */}
              <div className="bg-[#0f82b3] text-white px-3.5 py-2 text-xs font-semibold">
                {section.title}
              </div>

              {/* Barra de Pesquisa no Topo do Painel */}
              <div className="p-2 border-b border-slate-200 bg-[#fafafa]">
                <div className="relative">
                  <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchBySection[section.id] || ''}
                    onChange={(e) =>
                      setSearchBySection((prev) => ({
                        ...prev,
                        [section.id]: e.target.value,
                      }))
                    }
                    placeholder={`PESQUISAR ${section.title.toLowerCase()}...`}
                    className="w-full h-6 pl-7 pr-2 bg-white border border-slate-200 rounded-xs text-[10px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0f82b3]"
                  />
                </div>
              </div>

              {/* Tabela de Atributos */}
              <div className="text-[10px]">
                {/* Cabeçalho de Colunas */}
                <div className="grid grid-cols-[18px_repeat(6,22px)_1fr] items-center bg-[#f7f8fa] border-b border-slate-200 py-1.5 px-1.5 text-[9px] font-bold">
                  <div />
                  <div className="col-span-2 text-center text-teal-700 leading-tight">
                    <div>Plataforma</div>
                    <div className="flex items-center justify-around mt-1">
                      <Eye className="w-2.5 h-2.5 text-teal-600" />
                      <AlertTriangle className="w-2.5 h-2.5 text-teal-600" />
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-emerald-700 leading-tight">
                    <div>
                      Novo
                      <br />
                      Talento
                    </div>
                    <div className="flex items-center justify-around mt-1">
                      <Eye className="w-2.5 h-2.5 text-emerald-600" />
                      <AlertTriangle className="w-2.5 h-2.5 text-emerald-600" />
                    </div>
                  </div>
                  <div className="col-span-2 text-center text-amber-700 leading-tight">
                    <div>
                      Atualização
                      <br />
                      de Perfil
                    </div>
                    <div className="flex items-center justify-around mt-1">
                      <Eye className="w-2.5 h-2.5 text-amber-600" />
                      <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
                    </div>
                  </div>
                  <div className="pl-2 text-slate-700 text-[10px]">
                    Nome do campo
                  </div>
                </div>

                {/* Linha Selecionar tudo / Desmarcar tudo */}
                <div className="grid grid-cols-[18px_repeat(6,22px)_1fr] items-center bg-[#f1f3f5] border-b border-slate-200 py-1.5 px-1.5">
                  <div />
                  {[0, 1, 2, 3, 4, 5].map((colIdx) => {
                    const allChecked =
                      section.fields.length > 0 &&
                      section.fields.every((f) => f.flags[colIdx]);
                    return (
                      <div key={colIdx} className="flex justify-center">
                        <button
                          type="button"
                          onClick={() =>
                            handleToggleAllColumn(section.id, colIdx)
                          }
                          className={`w-3 h-3 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                            allChecked
                              ? 'bg-[#0b5394] border-[#0b5394] text-white'
                              : 'bg-white border-slate-400 hover:border-[#0b5394]'
                          }`}
                        >
                          {allChecked && <Check className="w-2 h-2 stroke-[3]" />}
                        </button>
                      </div>
                    );
                  })}
                  <div className="pl-2 font-semibold text-slate-600">
                    Selecionar tudo / Desmarcar tudo
                  </div>
                </div>

                {/* Lista de Campos */}
                <div className="divide-y divide-slate-100">
                  {filteredFields.map((field) => (
                    <div
                      key={field.id}
                      className={`grid grid-cols-[18px_repeat(6,22px)_1fr] items-center py-1 px-1.5 ${
                        field.isGroupHeader
                          ? 'bg-slate-100/80'
                          : 'hover:bg-slate-50/70'
                      }`}
                    >
                      <div className="flex justify-center text-slate-300">
                        {!field.isSubItem && (
                          <GripVertical className="w-2.5 h-2.5" />
                        )}
                      </div>

                      {field.flags.map((isChecked, colIdx) => (
                        <div key={colIdx} className="flex justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleFlag(section.id, field.id, colIdx)
                            }
                            className={`w-3 h-3 rounded-full border flex items-center justify-center transition-colors cursor-pointer ${
                              isChecked
                                ? 'bg-[#0b5394] border-[#0b5394] text-white'
                                : 'bg-white border-slate-300 hover:border-[#0b5394]'
                            }`}
                          >
                            {isChecked && (
                              <Check className="w-2 h-2 stroke-[3]" />
                            )}
                          </button>
                        </div>
                      ))}

                      <div
                        className={`pl-2 flex items-center gap-1 text-slate-500 truncate ${
                          field.isSubItem ? 'pl-4 text-slate-400' : ''
                        }`}
                      >
                        {field.isSubItem && (
                          <span className="text-slate-300 font-mono text-[9px]">
                            |--
                          </span>
                        )}
                        <span className="truncate">{field.name}</span>
                        {field.locked && (
                          <Lock className="w-2.5 h-2.5 text-slate-300 shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Rodapé Fixo com Botão 'Salvar alterações' */}
      <div className="sticky bottom-0 mt-6 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xs px-4 py-2.5 shadow-md flex items-center justify-end gap-3 z-20">
        {savedBanner && (
          <span className="text-xs text-emerald-600 font-medium">
            Alterações salvas com sucesso!
          </span>
        )}
        <button
          type="button"
          onClick={handleSaveChanges}
          className="px-4 py-1.5 bg-[#0f82b3] hover:bg-[#006399] text-white text-xs font-medium rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          Salvar alterações
        </button>
      </div>

      {/* Botão Flutuante 'IR PARA O TOPO' no Canto Inferior Direito */}
      <button
        type="button"
        onClick={handleScrollToTop}
        className="fixed bottom-14 right-4 z-40 px-3 py-1.5 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-md transition-colors cursor-pointer"
      >
        IR PARA O TOPO
      </button>
    </div>
  );
}

