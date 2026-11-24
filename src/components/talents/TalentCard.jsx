import React, { useState, useRef, useEffect } from 'react';
import {
  Check,
  MoreHorizontal,
  Calendar,
  BookOpen,
  Video,
  Eye,
  LayoutGrid,
  CheckSquare,
} from 'lucide-react';

export const STATUS_BADGE_MAP = {
  Ativo: {
    wrapper: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    dot: 'bg-emerald-400',
  },
  'Stand by': {
    wrapper: 'bg-[#E8AC51]/15 text-[#E8AC51] border-[#E8AC51]/35',
    dot: 'bg-[#E8AC51]',
  },
  Inativo: {
    wrapper: 'bg-red-500/15 text-red-400 border-red-500/30',
    dot: 'bg-red-400',
  },
};

export function formatTitleCase(value) {
  return String(value || '')
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function getTalentInitials(talent) {
  const source = talent?.stageName || talent?.fullName || 'EV';
  const parts = String(source).trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
  }
  return source.slice(0, 2).toUpperCase();
}

export default function TalentCard({
  talent,
  isSelected = false,
  onToggleSelect,
  onOpenOverview,
  onOpenCompoMake,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handleOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [menuOpen]);

  const photoSrc = talent.photoUrl || talent.coverUrl || null;
  const displayName = formatTitleCase(talent.stageName || talent.fullName);
  const agencyLabel = `${talent.officeName || 'ÉVORA'} ${
    talent.officeSubtitle || 'MODELS'
  }`.trim();
  const statusStyle =
    STATUS_BADGE_MAP[talent.status] || STATUS_BADGE_MAP.Ativo;
  const categories =
    Array.isArray(talent.categories) && talent.categories.length > 0
      ? talent.categories
      : [talent.category || 'Modelo'];
  const initials = getTalentInitials(talent);

  return (
    <article
      onClick={() => onOpenOverview?.(talent, 'Info')}
      className={`bg-[#1c1c1e] rounded-xl border transition-all duration-200 overflow-hidden flex min-h-[154px] cursor-pointer group relative ${
        isSelected
          ? 'border-[#E8AC51] ring-1 ring-[#E8AC51]/40 shadow-lg shadow-[#E8AC51]/5'
          : 'border-white/10 hover:border-[#E8AC51]/40 hover:bg-[#222225]'
      }`}
    >
      {/* Área de Retrato à Esquerda */}
      <div className="w-[76px] sm:w-[82px] shrink-0 relative bg-[#161617] border-r border-white/10 overflow-hidden">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleSelect?.(talent.id);
          }}
          aria-label={isSelected ? `Desmarcar ${displayName}` : `Selecionar ${displayName}`}
          className={`absolute top-2 left-2 z-10 w-5 h-5 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
            isSelected
              ? 'bg-[#E8AC51] border-[#E8AC51] text-[#161617]'
              : 'bg-[#161617]/80 border-white/25 text-transparent hover:border-[#E8AC51]'
          }`}
        >
          <Check className="w-3.5 h-3.5 stroke-[2.75]" />
        </button>

        {photoSrc ? (
          <img
            src={photoSrc}
            alt={displayName}
            className="w-full h-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#242427] via-[#1b1b1d] to-[#141415] flex flex-col items-center justify-center p-2 text-center">
            <div className="w-10 h-10 rounded-full border border-[#E8AC51]/45 bg-[#161617]/90 flex items-center justify-center shadow-inner">
              <span className="font-serif text-xs font-semibold tracking-wide text-[#E8AC51]">
                {initials}
              </span>
            </div>
            <span className="mt-2 text-[9px] font-medium tracking-[0.2em] text-neutral-400 uppercase">
              Évora
            </span>
          </div>
        )}
      </div>

      {/* Coluna de Informações à Direita */}
      <div className="flex-1 min-w-0 p-2.5 sm:p-3 flex flex-col justify-between gap-2">
        {/* Topo: Nome, Agência e Menu "..." */}
        <div className="flex items-start justify-between gap-1.5">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-white truncate leading-snug group-hover:text-[#E8AC51] transition-colors">
              {displayName}
            </h3>
            <p className="text-[10px] font-medium tracking-[0.12em] uppercase text-neutral-400 truncate mt-0.5">
              {agencyLabel}
            </p>
          </div>

          <div
            ref={menuRef}
            className="relative shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={`Ações para ${displayName}`}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-6 z-30 w-36 bg-[#161617] border border-white/15 rounded-xl shadow-2xl py-1 text-[11px]">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenOverview?.(talent, 'Info');
                  }}
                  className="w-full px-2.5 py-1 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3 h-3 shrink-0" />
                  <span className="truncate">Abrir panorama</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenOverview?.(talent, 'Agenda');
                  }}
                  className="w-full px-2.5 py-1 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-1.5 cursor-pointer"
                >
                  <Calendar className="w-3 h-3 shrink-0" />
                  <span className="truncate">Ver agenda</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onOpenCompoMake?.(talent);
                  }}
                  className="w-full px-2.5 py-1 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-1.5 cursor-pointer"
                >
                  <LayoutGrid className="w-3 h-3 shrink-0" />
                  <span className="truncate">Abrir CompoMake</span>
                </button>
                <div className="my-1 border-t border-white/10" />
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    onToggleSelect?.(talent.id);
                  }}
                  className="w-full px-2.5 py-1 text-left text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckSquare className="w-3 h-3 shrink-0" />
                  <span className="truncate">{isSelected ? 'Desmarcar' : 'Selecionar'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Status e Tags de Categoria */}
        <div className="space-y-1.5 min-w-0">
          <div>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[10px] font-semibold ${statusStyle.wrapper}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`} />
              {talent.status || 'Ativo'}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 3).map((cat) => (
              <span
                key={cat}
                className="px-1.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-[10px] text-neutral-300"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* Links Rápidos Inferiores */}
        <div className="pt-2 border-t border-white/10 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 min-w-0">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenOverview?.(talent, 'Agenda');
            }}
            className="text-[11px] font-medium text-neutral-400 hover:text-[#E8AC51] transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Calendar className="w-3 h-3 shrink-0" />
            <span>Agenda</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenOverview?.(talent, 'Book');
            }}
            className="text-[11px] font-medium text-neutral-400 hover:text-[#E8AC51] transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <BookOpen className="w-3 h-3 shrink-0" />
            <span>Book</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenOverview?.(talent, 'Video');
            }}
            className="text-[11px] font-medium text-neutral-400 hover:text-[#E8AC51] transition-colors inline-flex items-center gap-1 cursor-pointer shrink-0"
          >
            <Video className="w-3 h-3 shrink-0" />
            <span>Video</span>
          </button>
        </div>
      </div>
    </article>
  );
}
