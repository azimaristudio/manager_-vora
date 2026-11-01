import React from 'react';
import { List, Plus, ThumbsUp } from 'lucide-react';

export default function TasksDropdown() {
  return (
    <div
      className="absolute right-0 top-full mt-2.5 w-[340px] sm:w-[430px] bg-white border border-slate-200 rounded-xs shadow-xl z-50 text-slate-700 select-none animate-in fade-in zoom-in-95 duration-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Seta superior apontando para o ícone da bandeira */}
      <div className="absolute -top-1.5 right-6 w-3 h-3 bg-[#0077b5] rotate-45" />

      {/* 1. Cabeçalho Azul "Tarefas" + Ícones de Lista e "+" à direita */}
      <div className="relative bg-[#0077b5] text-white px-3.5 py-2 flex items-center justify-between rounded-t-xs">
        <span className="text-xs font-medium tracking-wide">Tarefas</span>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            title="Ver todas as tarefas"
            onClick={() => console.log('📋 [TasksDropdown] Ver lista de tarefas')}
            className="text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <List className="w-4 h-4 stroke-[2.2]" />
          </button>
          <button
            type="button"
            title="Nova tarefa"
            onClick={() => console.log('➕ [TasksDropdown] Criar nova tarefa')}
            className="text-white/90 hover:text-white transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Corpo Centralizado (Empty State: Joinha + "Bacana!" + "Você não tem tarefas pendentes.") */}
      <div className="py-7 px-6 flex flex-col items-center justify-center text-center bg-white rounded-b-xs">
        <ThumbsUp className="w-12 h-12 text-[#9e9e9e] fill-[#9e9e9e] stroke-[1.5] mb-3" />
        <h4 className="text-xl font-normal text-slate-600 leading-tight">
          Bacana!
        </h4>
        <p className="text-[11px] text-slate-500 mt-1.5">
          Você não tem tarefas pendentes.
        </p>
      </div>
    </div>
  );
}

