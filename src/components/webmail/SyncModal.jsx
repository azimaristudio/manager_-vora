import React from 'react';
import { RefreshCw, Mail } from 'lucide-react';

/**
 * Modal "Synchronize Inbox" (Fiel à Imagem 27 `27_webmail_synchronizeinbox_pop_up.png`)
 */
export default function SyncModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[1px] flex items-start justify-center pt-12 p-4 select-none animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#1c1c1e] rounded-xs shadow-2xl w-full max-w-[440px] border border-white/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-center gap-2 text-white">
          <RefreshCw className="w-4 h-4 stroke-[2.2] text-white" />
          <h2 className="text-sm font-normal tracking-wide">
            Synchronize Inbox
          </h2>
        </div>

        {/* Corpo do Modal: Ícone de Carta + "No New Message" */}
        <div className="px-6 py-8 flex flex-col items-center justify-center space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#1c1c1e] text-white flex items-center justify-center shadow-2xs">
              <Mail className="w-4 h-4 stroke-[2]" />
            </div>
            <span className="text-xs font-normal text-neutral-400">
              No New Message
            </span>
          </div>

          {/* Botão CLOSE */}
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-1.5 bg-[#161617] hover:bg-[#1c1c1e] border border-white/10 text-neutral-400 text-[10px] font-semibold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
}

