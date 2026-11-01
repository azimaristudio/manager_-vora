import React, { useState, useRef } from 'react';
import {
  X,
  PlusCircle,
  Calendar,
  Clock,
  Plus,
  Folder,
  Package,
  ChevronDown,
} from 'lucide-react';
import RichTextField from './RichTextField';

export default function AddPRoupaModal({ isOpen, onClose, onSave }) {
  const [department, setDepartment] = useState('Todos departamentos');
  const [fittingName, setFittingName] = useState('');
  const [casting, setCasting] = useState('');
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [address, setAddress] = useState('');
  const [dates, setDates] = useState([
    { date: '30/10/2026', startTime: '08:00', endTime: '' },
  ]);
  const [notes, setNotes] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');
  const [talent, setTalent] = useState('');

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDateChange = (idx, field, val) => {
    setDates((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  const handleAddDateRow = () => {
    setDates((prev) => [
      ...prev,
      { date: '31/10/2026', startTime: '08:00', endTime: '' },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        type: 'P. Roupa',
        color: 'bg-[#3ab565]',
        title: fittingName ? `P. Roupa - ${fittingName}` : 'P. Roupa',
        date: dates[0]?.date || '30/10/2026',
        department,
        fittingName,
        casting,
        projectName,
        client,
        address,
        dates,
        notes,
        internalNotes,
        attachedFileName,
        talent,
      });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-6 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[760px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[17px] text-slate-800 font-bold tracking-tight">
            P. Roupa <span className="font-normal text-slate-500">/ Novo</span>
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

        {/* Corpo do Modal (Imagem 42) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 sm:px-10 py-6 max-h-[78vh] overflow-y-auto space-y-3.5 text-[11px] text-slate-600">
            {/* Departamento */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600">
                Departamento
              </label>
              <div className="sm:col-span-9">
                <div className="relative w-full sm:w-96">
                  <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 border border-slate-200 rounded-xs bg-white text-slate-700 font-semibold text-xs appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="Todos departamentos">
                      Todos departamentos
                    </option>
                    <option value="Comercial">Comercial</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Editorial">Editorial</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Nome da P. Roupa * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600">
                Nome da P. Roupa <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={fittingName}
                  onChange={(e) => setFittingName(e.target.value)}
                  className="w-full sm:w-96 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Casting */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600">
                Casting
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={casting}
                  onChange={(e) => setCasting(e.target.value)}
                  placeholder="Buscar castings existentes"
                  className="w-full sm:w-96 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Nome do Projeto * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600">
                Nome do Projeto <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <input
                  type="text"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="Pesquisar um projeto ou declarar um novo"
                  className="w-full sm:w-96 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Cliente * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600">
                Cliente <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  className="w-full sm:w-88 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                />
                <button
                  type="button"
                  className="text-[#0077b5] hover:text-[#005f92] cursor-pointer"
                >
                  <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                </button>
              </div>
            </div>

            {/* Endereço * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600 pt-1.5">
                Endereço <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9">
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full sm:w-96 p-2 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Data da P. Roupa * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600 pt-1.5">
                Data da P. Roupa <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 space-y-2">
                {dates.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex flex-wrap items-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#0077b5] shrink-0" />
                    <input
                      type="text"
                      value={row.date}
                      onChange={(e) =>
                        handleDateChange(idx, 'date', e.target.value)
                      }
                      className="w-24 h-8 px-2 border border-slate-200 rounded-xs text-center font-semibold text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                    />
                    <Clock className="w-4 h-4 text-[#0077b5] ml-4 shrink-0" />
                    <input
                      type="text"
                      value={row.startTime}
                      onChange={(e) =>
                        handleDateChange(idx, 'startTime', e.target.value)
                      }
                      placeholder="__:__"
                      className="w-12 h-8 px-1.5 border border-slate-200 rounded-xs text-center font-semibold text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                    />
                    <span className="text-slate-400">-</span>
                    <input
                      type="text"
                      value={row.endTime}
                      onChange={(e) =>
                        handleDateChange(idx, 'endTime', e.target.value)
                      }
                      placeholder="__:__"
                      className="w-12 h-8 px-1.5 border border-slate-200 rounded-xs text-center text-xs text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      onClick={handleAddDateRow}
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddDateRow}
                  className="inline-flex items-center gap-1 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-xs cursor-pointer"
                >
                  <Plus className="w-3 h-3 stroke-[3]" />
                  <span>DATA</span>
                </button>
              </div>
            </div>

            {/* Notas */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600 pt-1.5">
                Notas
              </label>
              <div className="sm:col-span-9 sm:max-w-96">
                <RichTextField value={notes} onChange={setNotes} rows={6} />
              </div>
            </div>

            {/* Notas Internas */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3 pt-2">
              <label className="sm:col-span-3 sm:text-right text-slate-600 pt-1.5">
                Notas Internas
              </label>
              <div className="sm:col-span-9 sm:max-w-96">
                <RichTextField
                  value={internalNotes}
                  onChange={setInternalNotes}
                  rows={6}
                />
              </div>
            </div>

            {/* Arquivos Anexados */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-3 pt-3">
              <label className="sm:col-span-3 sm:text-right text-slate-600">
                Arquivos Anexados
              </label>
              <div className="sm:col-span-9 flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAttachedFileName(file.name);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-[10px] text-[#0077b5] hover:underline uppercase cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5 fill-[#0077b5] text-[#0077b5]" />
                  <span>PESQUISAR</span>
                </button>
                {attachedFileName && (
                  <span className="text-[10px] text-slate-500">
                    {attachedFileName}
                  </span>
                )}
              </div>
            </div>

            {/* Talento * */}
            <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-3 pt-1">
              <label className="sm:col-span-3 sm:text-right text-slate-600 pt-2">
                Talento <span className="text-red-500">*</span>
              </label>
              <div className="sm:col-span-9 space-y-2.5">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full sm:w-96 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                />
                <div>
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-[10px] text-[#0077b5] hover:underline uppercase cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#0077b5]" />
                    <span>ADICIONAR A PARTIR DE PACOTES</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé */}
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

