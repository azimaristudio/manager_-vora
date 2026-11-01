import React, { useState } from 'react';
import {
  RefreshCw,
  Trash2,
  Eye,
  EyeOff,
  ChevronLeft,
  ChevronRight,
  X,
  Pointer,
} from 'lucide-react';

export default function EmailList({
  folder = 'inbox', // 'inbox' | 'unread' | 'sent' | 'draft' | 'deleted'
  emails = [],
  onOpenSyncModal,
  onDeleteSelected,
}) {
  const [showSynchroBanner, setShowSynchroBanner] = useState(true);
  const [selectedIds, setSelectedIds] = useState([]);

  const showSyncAlert =
    (folder === 'inbox' || folder === 'unread') && showSynchroBanner;

  const allSelected =
    emails.length > 0 && selectedIds.length === emails.length;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(emails.map((e) => e.id));
    }
  };

  return (
    <div className="space-y-4 select-none">
      {/* Banner Azul Claro "Synchro" (Exibido em Inbox e Unread - Imagens 20 e 21) */}
      {showSyncAlert && (
        <div className="relative bg-[#67c2ef] border border-[#3db0e8] text-white rounded-xs px-5 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          {/* Lado Esquerdo: Ícone de Sincronização + "Synchro" */}
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white text-[#67c2ef] flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4 stroke-[2.5]" />
            </div>
            <span className="text-xl font-light tracking-wide">Synchro</span>
          </div>

          {/* Lado Direito: Texto + Link "synchronizing your inbox" + Ícone de Mão */}
          <div className="flex items-center gap-2.5 pr-4 text-xs">
            <span className="text-white/95">
              Get your new emails by{' '}
              <button
                type="button"
                onClick={onOpenSyncModal}
                className="underline font-medium hover:text-sky-100 cursor-pointer"
              >
                synchronizing your inbox
              </button>
            </span>
            <Pointer
              onClick={onOpenSyncModal}
              className="w-6 h-6 text-white -rotate-90 stroke-[1.75] cursor-pointer shrink-0"
            />
          </div>

          {/* Botão "×" discreto no canto superior direito */}
          <button
            type="button"
            onClick={() => setShowSynchroBanner(false)}
            aria-label="Fechar aviso Synchro"
            className="absolute top-1.5 right-2 text-white/70 hover:text-white cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Container da Tabela de Emails */}
      <div className="border border-slate-200 rounded-xs bg-white overflow-hidden shadow-2xs">
        {/* Barra de Ferramentas da Lista: Checkbox Geral, Lixo, Lido, Não Lido e Paginação */}
        <div className="bg-[#f4f5f7] border-b border-slate-200 px-3.5 py-2.5 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleSelectAll}
              className="w-3.5 h-3.5 rounded-xs accent-[#0077b5] cursor-pointer mr-1"
            />

            <button
              type="button"
              onClick={() => {
                if (selectedIds.length > 0 && onDeleteSelected) {
                  onDeleteSelected(folder, selectedIds);
                  setSelectedIds([]);
                }
              }}
              title="Move to Deleted"
              className="p-1.5 bg-[#eaecef] hover:bg-slate-300/70 border border-slate-200/90 text-slate-500 rounded-xs transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              title="Mark as read"
              className="p-1.5 bg-[#eaecef] hover:bg-slate-300/70 border border-slate-200/90 text-slate-500 rounded-xs transition-colors cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              title="Mark as unread"
              className="p-1.5 bg-[#eaecef] hover:bg-slate-300/70 border border-slate-200/90 text-slate-500 rounded-xs transition-colors cursor-pointer"
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Paginação: "0-0 of 0" + Setas */}
          <div className="flex items-center gap-2 text-[11px] text-slate-600">
            <span>
              <strong className="font-bold text-slate-800">
                {emails.length > 0 ? 1 : 0}-{emails.length}
              </strong>{' '}
              of{' '}
              <strong className="font-bold text-slate-800">
                {emails.length}
              </strong>
            </span>

            <div className="inline-flex items-center gap-1">
              <button
                type="button"
                className="p-1.5 bg-[#eaecef] hover:bg-slate-300/70 border border-slate-200/90 text-slate-500 rounded-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button
                type="button"
                className="p-1.5 bg-[#eaecef] hover:bg-slate-300/70 border border-slate-200/90 text-slate-500 rounded-xs transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>

        {/* Corpo da Tabela (Empty State "This inbox is empty" ou Lista de Emails) */}
        {emails.length === 0 ? (
          <div className="py-6 px-4 text-center text-xs text-slate-500 bg-white">
            This inbox is empty
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {emails.map((mail) => (
              <div
                key={mail.id}
                className="px-4 py-3 flex items-center justify-between gap-4 hover:bg-slate-50 text-xs text-slate-700"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(mail.id)}
                    onChange={() =>
                      setSelectedIds((prev) =>
                        prev.includes(mail.id)
                          ? prev.filter((i) => i !== mail.id)
                          : [...prev, mail.id]
                      )
                    }
                    className="w-3.5 h-3.5 accent-[#0077b5] cursor-pointer"
                  />
                  <span className="font-semibold text-[#0077b5] truncate w-44">
                    {mail.to || '(Sem destinatário)'}
                  </span>
                  <span className="text-slate-600 truncate">
                    {mail.subject || '(No Subject)'}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 shrink-0">
                  {mail.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

