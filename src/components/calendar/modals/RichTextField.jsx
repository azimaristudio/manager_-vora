import React from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  ListOrdered,
  List,
  Outdent,
  Indent,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
} from 'lucide-react';

export default function RichTextField({
  value,
  onChange,
  rows = 5,
  placeholder = '',
  compactToolbar = false,
}) {
  return (
    <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
      {/* Barra de Ferramentas do Editor Rich Text */}
      <div className="border-b border-slate-200 bg-white px-2.5 py-1.5 space-y-1.5">
        <div className="flex flex-wrap items-center gap-1 text-slate-700">
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Negrito"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Itálico"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Sublinhado"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Tachado"
          >
            <Strikethrough className="w-3.5 h-3.5" />
          </button>

          <span className="h-3.5 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Lista numerada"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Lista com marcadores"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs text-slate-300 cursor-pointer"
            title="Diminuir recuo"
          >
            <Outdent className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Aumentar recuo"
          >
            <Indent className="w-3.5 h-3.5" />
          </button>

          <span className="h-3.5 w-px bg-slate-200 mx-0.5" />

          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Alinhar à esquerda"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Centralizar"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Alinhar à direita"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            className="p-1 hover:bg-slate-100 rounded-xs cursor-pointer"
            title="Justificar"
          >
            <AlignJustify className="w-3.5 h-3.5" />
          </button>

          {!compactToolbar && (
            <>
              <span className="h-3.5 w-px bg-slate-200 mx-0.5" />
              <button
                type="button"
                className="px-1 py-0.5 hover:bg-slate-100 rounded-xs font-serif font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                title="Cor do texto"
              >
                <span className="underline decoration-2">A</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
              </button>
              <button
                type="button"
                className="px-1 py-0.5 hover:bg-slate-100 rounded-xs font-serif font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                title="Cor de realce"
              >
                <span className="bg-slate-800 text-white px-1 leading-tight rounded-[1px]">
                  A
                </span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
              </button>
            </>
          )}
        </div>

        {/* Segunda linha da barra do Editor */}
        <div className="flex items-center gap-2 pt-0.5">
          {compactToolbar && (
            <>
              <button
                type="button"
                className="px-1 py-0.5 hover:bg-slate-100 rounded-xs font-serif font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                title="Cor do texto"
              >
                <span className="underline decoration-2">A</span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
              </button>
              <button
                type="button"
                className="px-1 py-0.5 hover:bg-slate-100 rounded-xs font-serif font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                title="Cor de realce"
              >
                <span className="bg-slate-800 text-white px-1 leading-tight rounded-[1px]">
                  A
                </span>
                <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
              </button>
              <span className="h-3.5 w-px bg-slate-200" />
            </>
          )}

          <button
            type="button"
            className="inline-flex items-center justify-between w-18 px-1.5 py-0.5 text-[11px] text-slate-700 hover:bg-slate-50 rounded-xs cursor-pointer"
          >
            <span>Format</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
          <span className="h-3.5 w-px bg-slate-200" />
          <button
            type="button"
            className="inline-flex items-center justify-between w-16 px-1.5 py-0.5 text-[11px] text-slate-700 hover:bg-slate-50 rounded-xs cursor-pointer"
          >
            <span>Size</span>
            <ChevronDown className="w-3 h-3 text-slate-500" />
          </button>
        </div>
      </div>

      {/* Área de Texto */}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full p-2.5 text-slate-700 text-xs focus:outline-none resize-y border-b border-slate-100"
      />
      <div className="h-3.5 bg-white" />
    </div>
  );
}

