import React, { useState } from 'react';
import { ChevronDown, Trash2 } from 'lucide-react';

const TAG_COLORS = [
  '#0077b5',
  '#2aa9d2',
  '#3ab565',
  '#f8b400',
  '#f06711',
  '#e02424',
  '#9333ea',
  '#ec4899',
  '#475569',
];

export default function TagsConfig() {
  const [tagName, setTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState('#0077b5');
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [tags, setTags] = useState([]);

  const handleSaveTag = (e) => {
    e.preventDefault();
    const trimmed = tagName.trim();
    if (!trimmed) return;

    setTags((prev) => [
      ...prev,
      {
        id: `tag-${Date.now()}`,
        name: trimmed,
        color: selectedColor,
      },
    ]);
    setTagName('');
  };

  const handleDeleteTag = (id) => {
    setTags((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-2xl pt-2 pl-4">
      {/* Formulário Superior: Nome da etiqueta + Cor + Botão SALVAR */}
      <form
        onSubmit={handleSaveTag}
        className="flex flex-wrap items-end gap-2.5 pb-4 border-b border-slate-200/90"
      >
        <div>
          <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
            Nome da etiqueta
          </label>
          <input
            type="text"
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            className="w-60 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
          />
        </div>

        <div className="relative">
          <label className="block text-[11px] font-semibold text-slate-600 mb-1.5">
            Cor
          </label>
          <button
            type="button"
            onClick={() => setIsColorPickerOpen((prev) => !prev)}
            style={{ backgroundColor: selectedColor }}
            className="w-6 h-8 rounded-xs text-white flex items-center justify-center shadow-2xs cursor-pointer"
            title="Selecionar cor da etiqueta"
          >
            <ChevronDown className="w-3.5 h-3.5" />
          </button>

          {isColorPickerOpen && (
            <div className="absolute left-0 top-full mt-1.5 p-2 bg-white border border-slate-200 rounded-xs shadow-lg z-30 flex items-center gap-1.5">
              {TAG_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setSelectedColor(color);
                    setIsColorPickerOpen(false);
                  }}
                  style={{ backgroundColor: color }}
                  className="w-5 h-5 rounded-xs border border-black/10 hover:scale-110 transition-transform cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        <button
          type="submit"
          className="px-3 h-8 bg-[#5ba4cf] hover:bg-[#0077b5] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs transition-colors cursor-pointer"
        >
          SALVAR
        </button>
      </form>

      {/* Lista de Etiquetas ou Empty State Centralizado (Imagem 66) */}
      {tags.length === 0 ? (
        <div className="py-16 px-4 text-center max-w-lg mx-auto">
          <p className="text-sm text-slate-500 font-normal">
            Sua conta não tem etiquetas de talento ainda.
          </p>
          <p className="text-xs text-slate-400 leading-relaxed mt-1">
            As etiquetas de talento permitem organização eficiente, recuperação
            rápida, colaboração aprimorada, maior eficiência e análise
            criteriosa
          </p>
        </div>
      ) : (
        <div className="pt-5 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag.id}
              style={{ backgroundColor: tag.color }}
              className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs text-white text-xs font-medium shadow-2xs"
            >
              <span>{tag.name}</span>
              <button
                type="button"
                onClick={() => handleDeleteTag(tag.id)}
                className="text-white/80 hover:text-white cursor-pointer"
                title="Remover etiqueta"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

