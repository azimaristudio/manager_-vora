import React, { useEffect, useRef, useState } from 'react';
import {
  Calendar,
  BookOpen,
  Video,
  MoreHorizontal,
  Eye,
  LayoutGrid,
  CheckSquare,
} from 'lucide-react';
import {
  STATUS_BADGE_MAP,
  formatTitleCase,
  getTalentInitials,
} from './TalentCard';
import { TableRowSkeleton } from '../ui/Skeleton';

export default function TalentList({
  talents = [],
  selectedIds = [],
  allSelected = false,
  onToggleSelectAll,
  onToggleSelect,
  onOpenOverview,
  onOpenCompoMake,
  isLoading = false,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuContainerRef = useRef(null);

  useEffect(() => {
    if (!openMenuId) return;
    const handleOutside = (event) => {
      if (
        menuContainerRef.current &&
        !menuContainerRef.current.contains(event.target)
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, [openMenuId]);

  return (
    <div className="bg-[#1c1c1e] border border-white/10 rounded-xl overflow-hidden animate-content-fade">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#161617]/80 border-b border-white/10 text-neutral-400 text-xs uppercase tracking-wider select-none">
              <th className="py-3.5 px-4 w-12">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleSelectAll}
                  aria-label="Selecionar todos os talentos"
                  className="w-4 h-4 rounded-xs accent-[#880E1B] cursor-pointer align-middle"
                />
              </th>
              <th className="py-3.5 px-4 font-semibold">Talento</th>
              <th className="py-3.5 px-4 font-semibold">Status</th>
              <th className="py-3.5 px-4 font-semibold">Categoria</th>
              <th className="py-3.5 px-4 font-semibold text-right">
                Ações Rápidas
              </th>
            </tr>
          </thead>

          <tbody>
            {isLoading ? (
              <TableRowSkeleton variant="talents" rows={6} />
            ) : (
              talents.map((talent, index) => {
                const isSelected = selectedIds.includes(talent.id);
                const photoSrc = talent.photoUrl || talent.coverUrl || null;
                const displayName = formatTitleCase(
                  talent.stageName || talent.fullName
                );
                const agencyLabel = `${talent.officeName || 'ÉVORA'} ${
                  talent.officeSubtitle || 'MODELS'
                }`.trim();
                const statusStyle =
                  STATUS_BADGE_MAP[talent.status] || STATUS_BADGE_MAP.Ativo;
                const categories =
                  Array.isArray(talent.categories) &&
                  talent.categories.length > 0
                    ? talent.categories
                    : [talent.category || 'Modelo'];
                const initials = getTalentInitials(talent);
                const isMenuOpen = openMenuId === talent.id;
                const openUpward = talents.length > 2 && index >= talents.length - 2;

                return (
                  <tr
                    key={talent.id}
                    onClick={() => onOpenOverview?.(talent, 'Info')}
                    className={`group border-b border-white/5 transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#E8AC51]/5 hover:bg-[#E8AC51]/10 border-l-2 border-l-[#E8AC51]'
                        : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    {/* Checkbox */}
                    <td
                      className={`py-3.5 px-4 w-12 border-l-2 ${
                        isSelected ? 'border-l-[#E8AC51]' : 'border-l-transparent'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onToggleSelect?.(talent.id)}
                        aria-label={`Selecionar ${displayName}`}
                        className="w-4 h-4 rounded-xs accent-[#880E1B] cursor-pointer align-middle"
                      />
                    </td>

                    {/* Talento (Avatar + Nome Completo + Agência) */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full shrink-0 overflow-hidden bg-[#161617] border border-[#E8AC51]/40 flex items-center justify-center">
                          {photoSrc ? (
                            <img
                              src={photoSrc}
                              alt={displayName}
                              className="w-full h-full object-cover object-top"
                              loading="lazy"
                            />
                          ) : (
                            <span className="font-serif text-xs font-semibold text-[#E8AC51]">
                              {initials}
                            </span>
                          )}
                        </div>

                        <div>
                          <div className="text-sm font-semibold text-white group-hover:text-[#E8AC51] transition-colors">
                            {displayName}
                          </div>
                          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
                            {agencyLabel}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Status Pill */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[11px] font-semibold ${statusStyle.wrapper}`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${statusStyle.dot}`}
                        />
                        {talent.status || 'Ativo'}
                      </span>
                    </td>

                    {/* Categoria Pills */}
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-1.5">
                        {categories.map((cat) => (
                          <span
                            key={cat}
                            className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-neutral-300"
                          >
                            {cat}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Ações Rápidas + Menu "..." */}
                    <td
                      className="py-3.5 px-4 text-right whitespace-nowrap select-none"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="inline-flex items-center justify-end gap-3.5">
                        <button
                          type="button"
                          onClick={() => onOpenOverview?.(talent, 'Agenda')}
                          className="text-xs font-medium text-neutral-400 hover:text-[#E8AC51] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Calendar className="w-3.5 h-3.5 shrink-0" />
                          <span>Agenda</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenOverview?.(talent, 'Book')}
                          className="text-xs font-medium text-neutral-400 hover:text-[#E8AC51] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <BookOpen className="w-3.5 h-3.5 shrink-0" />
                          <span>Book</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => onOpenOverview?.(talent, 'Video')}
                          className="text-xs font-medium text-neutral-400 hover:text-[#E8AC51] transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Video className="w-3.5 h-3.5 shrink-0" />
                          <span>Video</span>
                        </button>

                        <div
                          ref={isMenuOpen ? menuContainerRef : null}
                          className="relative"
                        >
                          <button
                            type="button"
                            onClick={() =>
                              setOpenMenuId((prev) =>
                                prev === talent.id ? null : talent.id
                              )
                            }
                            aria-label={`Mais opções para ${displayName}`}
                            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </button>

                          {isMenuOpen && (
                            <div
                              className={`absolute right-0 z-30 w-44 bg-[#161617] border border-white/15 rounded-xl shadow-2xl py-1.5 text-xs text-left ${
                                openUpward ? 'bottom-8' : 'top-8'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onOpenOverview?.(talent, 'Info');
                                }}
                                className="w-full px-3 py-1.5 text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                              >
                                <Eye className="w-3.5 h-3.5 shrink-0" />
                                <span>Abrir panorama</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onOpenOverview?.(talent, 'Agenda');
                                }}
                                className="w-full px-3 py-1.5 text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                              >
                                <Calendar className="w-3.5 h-3.5 shrink-0" />
                                <span>Ver agenda</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onOpenCompoMake?.(talent);
                                }}
                                className="w-full px-3 py-1.5 text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                              >
                                <LayoutGrid className="w-3.5 h-3.5 shrink-0" />
                                <span>Abrir CompoMake</span>
                              </button>
                              <div className="my-1 border-t border-white/10" />
                              <button
                                type="button"
                                onClick={() => {
                                  setOpenMenuId(null);
                                  onToggleSelect?.(talent.id);
                                }}
                                className="w-full px-3 py-1.5 text-neutral-200 hover:bg-white/5 hover:text-[#E8AC51] flex items-center gap-2 cursor-pointer"
                              >
                                <CheckSquare className="w-3.5 h-3.5 shrink-0" />
                                <span>
                                  {isSelected ? 'Desmarcar' : 'Selecionar'}
                                </span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
