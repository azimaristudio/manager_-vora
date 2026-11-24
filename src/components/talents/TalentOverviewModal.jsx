import React, { useEffect, useState } from 'react';
import {
  X,
  User,
  Calendar,
  Activity,
  FileSignature,
  Plane,
  LayoutGrid,
  BookOpen,
  Camera,
  Video,
  FileText,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { formatTitleCase, getTalentInitials } from './TalentCard';

export const OVERVIEW_SECTIONS = [
  { id: 'Info', key: 'info', label: 'Info', icon: User },
  { id: 'Agenda', key: 'agenda', label: 'Agenda', icon: Calendar },
  { id: 'Atividades', key: 'atividades', label: 'Atividades', icon: Activity },
  { id: 'Contratos', key: 'contratos', label: 'Contratos', icon: FileSignature },
  { id: 'Vôos', key: 'voos', label: 'Vôos', icon: Plane },
  { id: 'Compo', key: 'compo', label: 'Compo', icon: LayoutGrid },
  { id: 'Book', key: 'book', label: 'Book', icon: BookOpen },
  { id: 'Snaps', key: 'snaps', label: 'Snaps', icon: Camera },
  { id: 'Video', key: 'video', label: 'Video', icon: Video },
  { id: 'Docs', key: 'docs', label: 'Docs', icon: FileText },
];

const INFO_FIELD_LABELS = [
  ['codigo', 'Código'],
  ['nomeArtistico', 'Nome artístico'],
  ['nomeCompleto', 'Nome completo'],
  ['unidade', 'Unidade'],
  ['status', 'Status'],
  ['categorias', 'Categorias'],
  ['cidade', 'Cidade / UF'],
  ['idade', 'Idade'],
  ['altura', 'Altura'],
  ['olhos', 'Olhos'],
  ['cabelo', 'Cabelo'],
  ['manequim', 'Manequim'],
  ['sapato', 'Sapato'],
  ['drt', 'DRT'],
  ['idiomas', 'Idiomas'],
  ['email', 'E-mail'],
  ['telefone', 'Telefone'],
];

const EMPTY_DESCRIPTIONS = {
  agenda: 'Nenhum compromisso, casting ou job agendado no momento.',
  atividades: 'Nenhuma atividade recente registrada para este talento.',
  contratos: 'Nenhum contrato ou termo vinculado até o momento.',
  voos: 'Nenhuma reserva aérea cadastrada para este talento.',
  compo: 'Nenhum composite salvo ainda. Crie um layout personalizado no CompoMake.',
  book: 'Nenhuma fotografia adicionada ao Book ainda.',
  snaps: 'Nenhum polaroid ou snap recente cadastrado.',
  video: 'Nenhum showreel ou vídeo cadastrado ainda.',
  docs: 'Nenhum documento anexado ao prontuário do talento.',
};

export default function TalentOverviewModal({
  talent,
  initialTab = 'Info',
  onClose,
  onOpenCompoMake,
}) {
  const [activeTab, setActiveTab] = useState(initialTab || 'Info');

  useEffect(() => {
    setActiveTab(initialTab || 'Info');
  }, [talent?.id, initialTab]);

  useEffect(() => {
    if (!talent) return;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [talent, onClose]);

  if (!talent) return null;

  const photoSrc = talent.photoUrl || talent.coverUrl || null;
  const displayName = formatTitleCase(talent.stageName || talent.fullName);
  const fullName = formatTitleCase(talent.fullName || talent.stageName);
  const initials = getTalentInitials(talent);
  const categories =
    Array.isArray(talent.categories) && talent.categories.length > 0
      ? talent.categories
      : [talent.category || 'Modelo'];

  const overview = talent.overview || {};
  const currentSection =
    OVERVIEW_SECTIONS.find((sec) => sec.id === activeTab) || OVERVIEW_SECTIONS[0];

  const mergedInfo = {
    codigo: talent.code || '—',
    nomeArtistico: displayName,
    nomeCompleto: fullName,
    unidade: `${talent.officeName || 'ÉVORA'} ${talent.officeSubtitle || 'MODELS'}`.trim(),
    status: talent.status || 'Ativo',
    categorias: categories.join(', '),
    cidade: talent.attributes?.city || '—',
    idade: talent.attributes?.age ? `${talent.attributes.age} anos` : '—',
    altura: talent.attributes?.height ? `${talent.attributes.height} cm` : '—',
    olhos: talent.attributes?.eyesLabel || '—',
    cabelo: talent.attributes?.hairLabel || '—',
    manequim: talent.attributes?.manequim || '—',
    sapato: talent.attributes?.sapato || '—',
    drt: talent.attributes?.drt || '—',
    idiomas: Array.isArray(talent.attributes?.languagesLabel)
      ? talent.attributes.languagesLabel.join(', ')
      : talent.attributes?.languages?.join(', ') || '—',
    email: talent.attributes?.email || '—',
    telefone: talent.attributes?.phone || '—',
    ...(overview.info || {}),
  };

  const sectionItems = Array.isArray(overview[currentSection.key])
    ? overview[currentSection.key]
    : [];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex justify-end animate-content-fade"
      role="dialog"
      aria-modal="true"
      aria-label={`Panorama de ${displayName}`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl h-full bg-[#161617] border-l border-white/10 shadow-2xl flex flex-col"
      >
        {/* Header do Panorama */}
        <div className="p-5 bg-[#1c1c1e] border-b border-white/10 flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-16 h-20 rounded-xl bg-[#161617] border border-[#E8AC51]/40 overflow-hidden shrink-0 flex items-center justify-center">
              {photoSrc ? (
                <img
                  src={photoSrc}
                  alt={displayName}
                  className="w-full h-full object-cover object-top"
                />
              ) : (
                <span className="font-serif text-lg font-semibold text-[#E8AC51]">
                  {initials}
                </span>
              )}
            </div>

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl font-semibold text-white truncate">
                  {displayName}
                </h2>
                {talent.code && (
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-[#E8AC51]">
                    {talent.code}
                  </span>
                )}
              </div>
              <p className="text-xs text-neutral-400 truncate">
                {fullName} • {mergedInfo.unidade}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    talent.status === 'Stand by'
                      ? 'bg-[#E8AC51]/15 text-[#E8AC51] border-[#E8AC51]/35'
                      : talent.status === 'Inativo'
                      ? 'bg-red-500/15 text-red-400 border-red-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                  }`}
                >
                  {talent.status || 'Ativo'}
                </span>
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-2 py-0.5 rounded-md bg-[#161617] border border-white/10 text-[10px] text-neutral-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar panorama"
            className="p-2 rounded-lg bg-[#161617] border border-white/10 text-neutral-400 hover:text-white hover:border-[#E8AC51]/40 transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Barra de Navegação das 10 Seções */}
        <div className="px-4 py-2.5 bg-[#1c1c1e]/70 border-b border-white/10 flex items-center gap-1.5 overflow-x-auto shrink-0">
          {OVERVIEW_SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = sec.id === activeTab;
            return (
              <button
                key={sec.id}
                type="button"
                onClick={() => setActiveTab(sec.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border whitespace-nowrap transition-colors cursor-pointer shrink-0 ${
                  isActive
                    ? 'bg-[#880E1B] border-[#880E1B] text-white'
                    : 'bg-[#161617] border-white/10 text-neutral-400 hover:text-white hover:border-[#E8AC51]/40'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>

        {/* Conteúdo da Seção Selecionada */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {activeTab === 'Info' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {INFO_FIELD_LABELS.map(([key, label]) => (
                <div
                  key={key}
                  className="bg-[#1c1c1e] border border-white/10 rounded-xl px-3.5 py-2.5"
                >
                  <span className="block text-[10px] uppercase tracking-wider text-neutral-400">
                    {label}
                  </span>
                  <span className="block text-sm font-medium text-white mt-0.5 break-words">
                    {mergedInfo[key] || '—'}
                  </span>
                </div>
              ))}
            </div>
          ) : sectionItems.length > 0 ? (
            <div className="space-y-3">
              {sectionItems.map((item, idx) => (
                <div
                  key={item.id || idx}
                  className="bg-[#1c1c1e] border border-white/10 rounded-xl p-4 flex items-start justify-between gap-3"
                >
                  <div className="min-w-0 space-y-1">
                    <h4 className="text-sm font-semibold text-white">
                      {item.title || item.name || `${currentSection.label} #${idx + 1}`}
                    </h4>
                    {item.subtitle && (
                      <p className="text-xs text-neutral-400">{item.subtitle}</p>
                    )}
                    {item.date && (
                      <span className="inline-block text-[11px] text-[#E8AC51]">
                        {item.date}
                      </span>
                    )}
                  </div>
                  {item.status && (
                    <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[11px] text-neutral-300 shrink-0">
                      {item.status}
                    </span>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center mx-auto text-[#E8AC51]">
                {React.createElement(currentSection.icon, {
                  className: 'w-5 h-5',
                })}
              </div>
              <div className="space-y-1 max-w-sm mx-auto">
                <h3 className="text-sm font-semibold text-white">
                  {currentSection.label} — Sem registros
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {EMPTY_DESCRIPTIONS[currentSection.key] ||
                    'Nenhum registro disponível nesta seção.'}
                </p>
              </div>
              {activeTab === 'Compo' && onOpenCompoMake && (
                <button
                  type="button"
                  onClick={() => onOpenCompoMake(talent)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E8AC51] hover:bg-[#d99b3f] text-[#161617] text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Abrir no CompoMake</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Rodapé do Panorama */}
        <div className="px-5 py-3 bg-[#1c1c1e] border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <span className="text-[11px] text-neutral-400">
            Última atualização: {talent.updatedAtLabel || 'Recente'}
          </span>
          <div className="flex items-center gap-2">
            {onOpenCompoMake && (
              <button
                type="button"
                onClick={() => onOpenCompoMake(talent)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-[#E8AC51]/50 text-[#E8AC51] hover:bg-[#E8AC51]/10 text-xs font-medium transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>CompoMake</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-[#880E1B] hover:bg-[#a31121] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
