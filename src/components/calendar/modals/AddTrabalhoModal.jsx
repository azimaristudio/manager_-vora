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

export default function AddTrabalhoModal({ isOpen, onClose, onSave }) {
  // Coluna esquerda
  const [department, setDepartment] = useState('Todos departamentos');
  const [jobName, setJobName] = useState('');
  const [casting, setCasting] = useState('');
  const [projectName, setProjectName] = useState('');
  const [client, setClient] = useState('');
  const [producer, setProducer] = useState('');
  const [description, setDescription] = useState('');
  const [medias, setMedias] = useState('');
  const [type, setType] = useState('');
  const [products, setProducts] = useState('');
  const [exclusivity, setExclusivity] = useState(false);
  const [periodCount, setPeriodCount] = useState('');
  const [periodUnit, setPeriodUnit] = useState('dia(s)');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [territory, setTerritory] = useState('');

  // Coluna direita
  const [address, setAddress] = useState('');
  const [allDay, setAllDay] = useState(false);
  const [workDates, setWorkDates] = useState([
    { date: '30/10/2026', startTime: '08:00', endTime: '' },
  ]);
  const [notesForTalents, setNotesForTalents] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');

  // Rodapé inferior do formulário
  const [talent, setTalent] = useState('');
  const [checkSchedule, setCheckSchedule] = useState(true);

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleDateChange = (idx, field, val) => {
    setWorkDates((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: val };
      return next;
    });
  };

  const handleAddDateRow = () => {
    setWorkDates((prev) => [
      ...prev,
      { date: '31/10/2026', startTime: '08:00', endTime: '' },
    ]);
  };

  const handleSubmit = (e, shouldCloseProject = false) => {
    if (e) e.preventDefault();
    if (onSave) {
      onSave({
        type: 'Trabalho',
        color: 'bg-[#2aa9d2]',
        title: jobName ? `Trabalho - ${jobName}` : 'Trabalho',
        date: workDates[0]?.date || '30/10/2026',
        department,
        jobName,
        casting,
        projectName,
        client,
        producer,
        description,
        medias,
        workType: type,
        products,
        exclusivity,
        periodCount,
        periodUnit,
        startDate,
        endDate,
        territory,
        address,
        allDay,
        workDates,
        notesForTalents,
        internalNotes,
        attachedFileName,
        talent,
        checkSchedule,
        closed: shouldCloseProject,
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
        className="bg-white w-full max-w-[960px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-[17px] text-slate-800 font-bold tracking-tight">
            Trabalho <span className="font-normal text-slate-500">/ Novo</span>
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

        {/* Corpo do Modal (Imagem 43) */}
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <div className="px-6 py-5 max-h-[78vh] overflow-y-auto text-[11px] text-slate-600 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coluna Esquerda */}
              <div className="lg:col-span-6 space-y-3">
                {/* Departamento */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Departamento
                  </label>
                  <div className="col-span-9 relative">
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

                {/* Nome do trabalho * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Nome do trabalho <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={jobName}
                      onChange={(e) => setJobName(e.target.value)}
                      className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                </div>

                {/* Casting */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Casting
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={casting}
                      onChange={(e) => setCasting(e.target.value)}
                      placeholder="Buscar castings existentes"
                      className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                </div>

                {/* Nome do Projeto * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Nome do Projeto <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      placeholder="Pesquisar um projeto ou declarar um novo"
                      className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                </div>

                {/* Cliente * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      className="flex-1 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                </div>

                {/* Produtor */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Produtor
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={producer}
                      onChange={(e) => setProducer(e.target.value)}
                      className="flex-1 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                </div>

                {/* Descrição */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-slate-600 pt-1.5">
                    Descrição
                  </label>
                  <div className="col-span-9">
                    <RichTextField
                      value={description}
                      onChange={setDescription}
                      rows={5}
                      compactToolbar={true}
                    />
                  </div>
                </div>

                {/* Mídias */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Mídias
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={medias}
                      onChange={(e) => setMedias(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="flex-1 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                </div>

                {/* Tipo * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Tipo <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="flex-1 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                </div>

                {/* Produtos */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600">
                    Produtos
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={products}
                      onChange={(e) => setProducts(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="flex-1 h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                    <button
                      type="button"
                      className="text-[#0077b5] hover:text-[#005f92] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                    </button>
                  </div>
                </div>

                {/* Exclusividade */}
                <div className="grid grid-cols-12 items-center gap-3 pt-1">
                  <label className="col-span-3 text-right text-slate-600">
                    Exclusividade
                  </label>
                  <div className="col-span-9 flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={exclusivity}
                      onChange={(e) => setExclusivity(e.target.checked)}
                      className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5] cursor-pointer"
                    />
                    <button
                      type="button"
                      className="text-[10px] text-[#0077b5] hover:underline uppercase cursor-pointer"
                    >
                      ADICIONAR NOTA
                    </button>
                  </div>
                </div>

                {/* Período de uso */}
                <div className="grid grid-cols-12 items-start gap-3 pt-1">
                  <label className="col-span-3 text-right text-slate-600 pt-1">
                    Período de uso
                  </label>
                  <div className="col-span-9 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-400 text-[10px]">
                        Período
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={periodCount}
                        onChange={(e) => setPeriodCount(e.target.value)}
                        className="w-12 h-7 px-1.5 border border-slate-200 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                      />
                      <div className="relative w-24">
                        <select
                          value={periodUnit}
                          onChange={(e) => setPeriodUnit(e.target.value)}
                          className="w-full h-7 px-2 pr-6 border border-slate-200 rounded-xs bg-white text-slate-700 font-semibold text-[11px] appearance-none focus:outline-none focus:border-[#0077b5]"
                        >
                          <option value="dia(s)">dia(s)</option>
                          <option value="semana(s)">semana(s)</option>
                          <option value="mês(es)">mês(es)</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">
                          Começo
                        </span>
                        <input
                          type="text"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          placeholder="__/__/____"
                          className="w-20 h-7 px-1.5 border border-slate-200 rounded-xs text-center text-slate-700 placeholder:text-slate-500 text-[11px] focus:outline-none focus:border-[#0077b5]"
                        />
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">Fim</span>
                        <input
                          type="text"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          placeholder="__/__/____"
                          className="w-20 h-7 px-1.5 border border-slate-200 rounded-xs text-center text-slate-700 placeholder:text-slate-500 text-[11px] focus:outline-none focus:border-[#0077b5]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Território de exclusividade */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-slate-600 leading-tight">
                    Território de
                    <br />
                    exclusividade
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={territory}
                      onChange={(e) => setTerritory(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="lg:col-span-6 space-y-3">
                {/* Endereço * */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-slate-600 pt-1">
                    Endereço <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9">
                    <textarea
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full p-2 border border-slate-200 rounded-xs text-slate-700 text-xs focus:outline-none focus:border-[#0077b5]"
                    />
                  </div>
                </div>

                {/* Data do trabalho * */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-slate-600 pt-0.5">
                    Data do trabalho <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9 space-y-2">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-600">
                      <input
                        type="checkbox"
                        checked={allDay}
                        onChange={(e) => setAllDay(e.target.checked)}
                        className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                      />
                      <span>All Day</span>
                    </label>

                    {workDates.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap items-center gap-1.5"
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
                        {!allDay && (
                          <>
                            <Clock className="w-4 h-4 text-[#0077b5] ml-4 shrink-0" />
                            <input
                              type="text"
                              value={row.startTime}
                              onChange={(e) =>
                                handleDateChange(
                                  idx,
                                  'startTime',
                                  e.target.value
                                )
                              }
                              placeholder="__:__"
                              className="w-12 h-8 px-1 border border-slate-200 rounded-xs text-center font-semibold text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
                            />
                            <span className="text-slate-400">-</span>
                            <input
                              type="text"
                              value={row.endTime}
                              onChange={(e) =>
                                handleDateChange(idx, 'endTime', e.target.value)
                              }
                              placeholder="__:__"
                              className="w-12 h-8 px-1 border border-slate-200 rounded-xs text-center text-xs text-slate-700 placeholder:text-slate-500 focus:outline-none focus:border-[#0077b5]"
                            />
                            <button
                              type="button"
                              onClick={handleAddDateRow}
                              className="text-[#0077b5] hover:text-[#005f92] cursor-pointer"
                            >
                              <PlusCircle className="w-4 h-4 fill-[#0077b5] text-white" />
                            </button>
                          </>
                        )}
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={handleAddDateRow}
                      className="inline-flex items-center gap-1 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold px-2.5 py-1 rounded-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>DATA</span>
                    </button>
                  </div>
                </div>

                {/* Notas para Talentos */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-slate-600 pt-1.5">
                    Notas para Talentos
                  </label>
                  <div className="col-span-9">
                    <RichTextField
                      value={notesForTalents}
                      onChange={setNotesForTalents}
                      rows={5}
                      compactToolbar={true}
                    />
                  </div>
                </div>

                {/* Notas Internas */}
                <div className="grid grid-cols-12 items-start gap-3 pt-2">
                  <label className="col-span-3 text-right text-slate-600 pt-1.5">
                    Notas Internas
                  </label>
                  <div className="col-span-9">
                    <RichTextField
                      value={internalNotes}
                      onChange={setInternalNotes}
                      rows={5}
                      compactToolbar={true}
                    />
                  </div>
                </div>

                {/* Arquivos Anexados */}
                <div className="grid grid-cols-12 items-center gap-3 pt-6">
                  <label className="col-span-3 text-right text-slate-600">
                    Arquivos Anexados
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
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
              </div>
            </div>

            {/* Linha Inferior: Talento * */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-3 pt-2">
              <label className="lg:col-span-1 lg:text-right text-slate-600 pt-2">
                Talento <span className="text-red-500">*</span>
              </label>
              <div className="lg:col-span-11 space-y-2.5 pl-0 lg:pl-7">
                <input
                  type="text"
                  value={talent}
                  onChange={(e) => setTalent(e.target.value)}
                  placeholder="Pesquisar Talento..."
                  className="w-full h-8 px-2.5 border border-slate-200 rounded-xs text-slate-700 placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#0077b5]"
                />

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-[10px] text-[#0077b5] hover:underline uppercase cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#0077b5]" />
                    <span>ADICIONAR A PARTIR DE PACOTES</span>
                  </button>

                  <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] text-slate-600">
                    <input
                      type="checkbox"
                      checked={checkSchedule}
                      onChange={(e) => setCheckSchedule(e.target.checked)}
                      className="w-3.5 h-3.5 rounded-xs border-slate-300 text-[#0077b5]"
                    />
                    <span>Conferir Agenda dos Participantes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Rodapé com 3 Botões: CANCELAR, SALVAR E FECHAR (laranja) e SALVAR (azul) */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-[#0077b5] hover:underline uppercase font-medium px-2 py-1.5 cursor-pointer"
            >
              CANCELAR
            </button>
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              className="bg-[#f38315] hover:bg-[#d9710c] text-white text-[11px] font-semibold uppercase px-4 py-2 rounded-xs transition-colors cursor-pointer"
            >
              SALVAR E FECHAR
            </button>
            <button
              type="submit"
              className="bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-semibold uppercase px-6 py-2 rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

