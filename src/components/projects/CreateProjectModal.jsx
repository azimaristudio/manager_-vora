import React, { useState, useEffect } from 'react';
import {
  X,
  PlusCircle,
  Calendar,
  Clock,
  Plus,
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

const INITIAL_FORM_STATE = {
  department: '',
  projectName: '',
  client: '',
  producer: '',
  allDay: false,
  workDates: [
    {
      date: '30/10/2026',
      startTime: '',
      endTime: '',
    },
  ],
  description: '',
  medias: '',
  type: '',
  products: '',
  exclusivity: false,
  exclusivityNote: '',
  usagePeriodCount: '',
  usagePeriodUnit: 'dia(s)',
  usageStartDate: '',
  usageEndDate: '',
  exclusivityTerritory: '',
};

export default function CreateProjectModal({
  isOpen,
  onClose,
  onSaveProject,
  initialData = null,
}) {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [showExclusivityNote, setShowExclusivityNote] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...INITIAL_FORM_STATE,
          ...initialData,
        });
      } else {
        setFormData(INITIAL_FORM_STATE);
        setShowExclusivityNote(false);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleDateRowChange = (index, key, value) => {
    setFormData((prev) => {
      const updated = [...prev.workDates];
      updated[index] = { ...updated[index], [key]: value };
      return { ...prev, workDates: updated };
    });
  };

  const handleAddDateRow = () => {
    setFormData((prev) => ({
      ...prev,
      workDates: [
        ...prev.workDates,
        { date: '31/10/2026', startTime: '', endTime: '' },
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSaveProject) {
      onSaveProject(formData);
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-6 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[780px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[18px] text-slate-800 font-bold tracking-tight">
            Projeto{' '}
            <span className="font-normal text-slate-500">
              / #{initialData?.id || 0}
            </span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Corpo do Formulário */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 sm:px-10 py-6 space-y-3.5 max-h-[78vh] overflow-y-auto text-[12px] text-slate-600">
            {/* Departamento */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Departamento
              </label>
              <div className="sm:col-span-9">
                <div className="relative w-full sm:w-64">
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      handleFieldChange('department', e.target.value)
                    }
                    className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-slate-700 font-semibold text-[12px] appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="">Faça uma seleção</option>
                    <option value="Comercial">Comercial</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Editorial">Editorial</option>
                    <option value="Publicidade">Publicidade</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Nome do Projeto * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Nome do Projeto <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={formData.projectName}
                  onChange={(e) =>
                    handleFieldChange('projectName', e.target.value)
                  }
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Cliente * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Cliente <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.client}
                  onChange={(e) => handleFieldChange('client', e.target.value)}
                  className="w-full sm:w-60 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
                <button
                  type="button"
                  title="Adicionar Cliente"
                  className="text-[#0077b5] hover:text-[#005f92] transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                </button>
              </div>
            </div>

            {/* Produtor */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Produtor
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.producer}
                  onChange={(e) =>
                    handleFieldChange('producer', e.target.value)
                  }
                  className="w-full sm:w-60 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
                <button
                  type="button"
                  title="Adicionar Produtor"
                  className="text-[#0077b5] hover:text-[#005f92] transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                </button>
              </div>
            </div>

            {/* Data do trabalho* */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2 sm:gap-4 pt-1">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal pt-0.5">
                Data do trabalho<span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 space-y-2.5">
                {/* Checkbox Dia inteiro */}
                <label className="inline-flex items-center gap-2 cursor-pointer select-none text-slate-600">
                  <input
                    type="checkbox"
                    checked={formData.allDay}
                    onChange={(e) =>
                      handleFieldChange('allDay', e.target.checked)
                    }
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5] focus:ring-[#0077b5]"
                  />
                  <span>Dia inteiro</span>
                </label>

                {/* Linhas de Data e Hora */}
                <div className="space-y-2">
                  {formData.workDates.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex flex-wrap items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-[#0077b5] shrink-0" />
                      <input
                        type="text"
                        value={item.date}
                        onChange={(e) =>
                          handleDateRowChange(idx, 'date', e.target.value)
                        }
                        placeholder="DD/MM/AAAA"
                        className="w-24 h-8 px-2 border border-slate-200 rounded-xs text-center font-semibold text-slate-700 focus:outline-none focus:border-[#0077b5]"
                      />

                      {!formData.allDay && (
                        <>
                          <Clock className="w-4 h-4 text-[#0077b5] ml-2 shrink-0" />
                          <input
                            type="text"
                            value={item.startTime}
                            onChange={(e) =>
                              handleDateRowChange(
                                idx,
                                'startTime',
                                e.target.value
                              )
                            }
                            placeholder="__:__"
                            className="w-12 h-8 px-1.5 border border-slate-200 rounded-xs text-center text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
                          />
                          <span className="text-slate-400">-</span>
                          <input
                            type="text"
                            value={item.endTime}
                            onChange={(e) =>
                              handleDateRowChange(
                                idx,
                                'endTime',
                                e.target.value
                              )
                            }
                            placeholder="__:__"
                            className="w-12 h-8 px-1.5 border border-slate-200 rounded-xs text-center text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
                          />
                          <button
                            type="button"
                            onClick={handleAddDateRow}
                            title="Adicionar horário"
                            className="text-[#0077b5] hover:text-[#005f92] transition-colors cursor-pointer"
                          >
                            <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                          </button>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                {/* Botão + DATA */}
                <div>
                  <button
                    type="button"
                    onClick={handleAddDateRow}
                    className="inline-flex items-center gap-1 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold px-2.5 py-1.5 rounded-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-3 h-3 stroke-[3]" />
                    <span>DATA</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Descrição (Rich Text Editor Simulado) */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2 sm:gap-4 pt-1">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal pt-1.5">
                Descrição
              </label>
              <div className="sm:col-span-9">
                <div className="border border-slate-200 rounded-xs overflow-hidden bg-white">
                  {/* Barra de Ferramentas do Editor */}
                  <div className="border-b border-slate-200 bg-white px-2.5 py-2 space-y-2">
                    <div className="flex flex-wrap items-center gap-1.5 text-slate-700">
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

                      <span className="h-3.5 w-px bg-slate-200 mx-0.5" />

                      <button
                        type="button"
                        className="px-1.5 py-0.5 hover:bg-slate-100 rounded-xs font-serif font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                        title="Cor do texto"
                      >
                        <span className="underline decoration-2">A</span>
                        <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
                      </button>
                      <button
                        type="button"
                        className="px-1.5 py-0.5 hover:bg-slate-100 rounded-xs font-serif font-bold text-xs flex items-center gap-0.5 cursor-pointer"
                        title="Cor de realce"
                      >
                        <span className="bg-slate-800 text-white px-1 leading-tight rounded-[1px]">
                          A
                        </span>
                        <ChevronDown className="w-2.5 h-2.5 text-slate-500" />
                      </button>
                    </div>

                    {/* Segunda linha da barra do Editor: Format e Size */}
                    <div className="flex items-center gap-2 pt-0.5">
                      <button
                        type="button"
                        className="inline-flex items-center justify-between w-20 px-2 py-0.5 text-[11px] text-slate-700 hover:bg-slate-50 rounded-xs cursor-pointer"
                      >
                        <span>Format</span>
                        <ChevronDown className="w-3 h-3 text-slate-500" />
                      </button>
                      <span className="h-3.5 w-px bg-slate-200" />
                      <button
                        type="button"
                        className="inline-flex items-center justify-between w-20 px-2 py-0.5 text-[11px] text-slate-700 hover:bg-slate-50 rounded-xs cursor-pointer"
                      >
                        <span>Size</span>
                        <ChevronDown className="w-3 h-3 text-slate-500" />
                      </button>
                    </div>
                  </div>

                  {/* Área de Texto */}
                  <textarea
                    rows={6}
                    value={formData.description}
                    onChange={(e) =>
                      handleFieldChange('description', e.target.value)
                    }
                    className="w-full p-3 text-slate-700 text-xs focus:outline-none resize-y border-b border-slate-100"
                  />
                  <div className="h-4 bg-white" />
                </div>
              </div>
            </div>

            {/* Mídias */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Mídias
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.medias}
                  onChange={(e) => handleFieldChange('medias', e.target.value)}
                  className="w-full sm:w-72 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
                <button
                  type="button"
                  title="Adicionar Mídia"
                  className="text-[#0077b5] hover:text-[#005f92] transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                </button>
              </div>
            </div>

            {/* Tipo */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Tipo
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.type}
                  onChange={(e) => handleFieldChange('type', e.target.value)}
                  className="w-full sm:w-72 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
                <button
                  type="button"
                  title="Adicionar Tipo"
                  className="text-[#0077b5] hover:text-[#005f92] transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                </button>
              </div>
            </div>

            {/* Produtos */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Produtos
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  type="text"
                  value={formData.products}
                  onChange={(e) =>
                    handleFieldChange('products', e.target.value)
                  }
                  className="w-full sm:w-72 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
                <button
                  type="button"
                  title="Adicionar Produto"
                  className="text-[#0077b5] hover:text-[#005f92] transition-colors cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                </button>
              </div>
            </div>

            {/* Exclusividade */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4 pt-1">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Exclusividade
              </label>
              <div className="sm:col-span-9 space-y-2">
                <div className="flex items-center gap-5">
                  <input
                    type="checkbox"
                    checked={formData.exclusivity}
                    onChange={(e) =>
                      handleFieldChange('exclusivity', e.target.checked)
                    }
                    className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5] focus:ring-[#0077b5] cursor-pointer"
                  />
                  <button
                    type="button"
                    onClick={() => setShowExclusivityNote((prev) => !prev)}
                    className="text-[11px] text-[#0077b5] hover:underline uppercase tracking-wide cursor-pointer"
                  >
                    ADICIONAR NOTA
                  </button>
                </div>
                {showExclusivityNote && (
                  <input
                    type="text"
                    value={formData.exclusivityNote}
                    onChange={(e) =>
                      handleFieldChange('exclusivityNote', e.target.value)
                    }
                    placeholder="Nota sobre exclusividade..."
                    className="w-full sm:w-72 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                  />
                )}
              </div>
            </div>

            {/* Período de uso */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2 sm:gap-4 pt-1">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal pt-1.5">
                Período de uso
              </label>
              <div className="sm:col-span-9 space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-slate-400 text-[11px]">Período</span>
                  <input
                    type="number"
                    min="0"
                    value={formData.usagePeriodCount}
                    onChange={(e) =>
                      handleFieldChange('usagePeriodCount', e.target.value)
                    }
                    className="w-14 h-7 px-2 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                  />
                  <div className="relative w-24">
                    <select
                      value={formData.usagePeriodUnit}
                      onChange={(e) =>
                        handleFieldChange('usagePeriodUnit', e.target.value)
                      }
                      className="w-full h-7 px-2 pr-6 border border-slate-200 rounded-xs bg-white text-slate-700 font-semibold text-[11px] appearance-none focus:outline-none focus:border-[#0077b5]"
                    >
                      <option value="dia(s)">dia(s)</option>
                      <option value="semana(s)">semana(s)</option>
                      <option value="mês(es)">mês(es)</option>
                      <option value="ano(s)">ano(s)</option>
                    </select>
                    <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Começo e Fim */}
                <div className="flex items-center gap-3">
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-0.5">
                      Começo
                    </span>
                    <input
                      type="text"
                      value={formData.usageStartDate}
                      onChange={(e) =>
                        handleFieldChange('usageStartDate', e.target.value)
                      }
                      placeholder="__/__/____"
                      className="w-24 h-7 px-2 border border-slate-200 rounded-xs text-center text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                  <div>
                    <span className="block text-[11px] text-slate-400 mb-0.5">
                      Fim
                    </span>
                    <input
                      type="text"
                      value={formData.usageEndDate}
                      onChange={(e) =>
                        handleFieldChange('usageEndDate', e.target.value)
                      }
                      placeholder="__/__/____"
                      className="w-24 h-7 px-2 border border-slate-200 rounded-xs text-center text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Território de exclusividade */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2 sm:gap-4 pt-1">
              <label className="sm:col-span-3 sm:text-right text-slate-600 font-normal">
                Território de exclusividade
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={formData.exclusivityTerritory}
                  onChange={(e) =>
                    handleFieldChange('exclusivityTerritory', e.target.value)
                  }
                  className="w-full sm:w-72 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>
          </div>

          {/* Rodapé do Modal */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-4 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-[#0077b5] hover:underline uppercase font-medium px-2 py-1.5 cursor-pointer"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase px-4 py-2 rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

