import React, { useState, useRef } from 'react';
import {
  X,
  PlusCircle,
  Calendar,
  Clock,
  Plus,
  Folder,
  Package,
  Filter,
  Info,
  ChevronDown,
} from 'lucide-react';
import RichTextField from './RichTextField';

export default function AddOpcaoModal({ isOpen, onClose, onSave }) {
  const [department, setDepartment] = useState('Todos departamentos');
  const [optionType, setOptionType] = useState('1ª Opção');
  const [casting, setCasting] = useState('');
  const [project, setProject] = useState('');
  const [client, setClient] = useState('');
  const [producer, setProducer] = useState('');
  const [description, setDescription] = useState('');
  const [medias, setMedias] = useState('');
  const [type, setType] = useState('');
  const [product, setProduct] = useState('');
  const [exclusivity, setExclusivity] = useState(false);
  const [periodCount, setPeriodCount] = useState('');
  const [periodUnit, setPeriodUnit] = useState('dia(s)');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [territory, setTerritory] = useState('');

  // Coluna direita
  const [budgetAmount, setBudgetAmount] = useState('');
  const [budgetCurrency, setBudgetCurrency] = useState('BRL - Brazil R$');
  const [budgetExtraPercent, setBudgetExtraPercent] = useState('0');
  const [workDates, setWorkDates] = useState([
    { date: '30/10/2026', startTime: '08:00', endTime: '' },
  ]);
  const [notes, setNotes] = useState('');
  const [internalNotes, setInternalNotes] = useState('');
  const [attachedFileName, setAttachedFileName] = useState('');

  // Talento inferior
  const [talent, setTalent] = useState('');
  const [checkSchedule, setCheckSchedule] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave({
        type: 'Opção',
        color: 'bg-[#f06711]',
        title: project || client ? `Opção - ${project || client}` : '1ª Opção',
        date: workDates[0]?.date || '30/10/2026',
        department,
        optionType,
        casting,
        project,
        client,
        producer,
        description,
        medias,
        workType: type,
        product,
        exclusivity,
        periodCount,
        periodUnit,
        startDate,
        endDate,
        territory,
        budgetAmount,
        budgetCurrency,
        budgetExtraPercent,
        workDates,
        notes,
        internalNotes,
        attachedFileName,
        talent,
        checkSchedule,
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
        className="bg-[#1c1c1e] w-full max-w-[960px] rounded-xs shadow-2xl border border-white/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-[17px] text-white font-bold tracking-tight">
            Opção <span className="font-normal text-neutral-400">/ Novo</span>
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="text-neutral-400 hover:text-white p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Corpo do Modal (Imagem 41) */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-5 max-h-[78vh] overflow-y-auto text-[11px] text-neutral-400 space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Coluna Esquerda */}
              <div className="lg:col-span-6 space-y-3">
                {/* Departamento */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Departamento
                  </label>
                  <div className="col-span-9 relative">
                    <select
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full h-8 px-2.5 pr-7 border border-white/10 rounded-xs bg-[#1c1c1e] text-white font-semibold text-xs appearance-none focus:outline-none focus:border-[#880E1B]"
                    >
                      <option value="Todos departamentos">
                        Todos departamentos
                      </option>
                      <option value="Comercial">Comercial</option>
                      <option value="Fashion">Fashion</option>
                      <option value="Editorial">Editorial</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Tipo de opção */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Tipo de opção
                  </label>
                  <div className="col-span-9">
                    <div className="relative w-32">
                      <select
                        value={optionType}
                        onChange={(e) => setOptionType(e.target.value)}
                        className="w-full h-8 px-2.5 pr-6 border border-white/10 rounded-xs bg-[#1c1c1e] text-white font-semibold text-xs appearance-none focus:outline-none focus:border-[#880E1B]"
                      >
                        <option value="1ª Opção">1ª Opção</option>
                        <option value="2ª Opção">2ª Opção</option>
                        <option value="3ª Opção">3ª Opção</option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Casting */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Casting
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={casting}
                      onChange={(e) => setCasting(e.target.value)}
                      placeholder="Buscar castings existentes"
                      className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                  </div>
                </div>

                {/* Projeto * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Projeto <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9">
                    <input
                      type="text"
                      value={project}
                      onChange={(e) => setProject(e.target.value)}
                      placeholder="Pesquisar um projeto ou declarar um novo"
                      className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                  </div>
                </div>

                {/* Cliente * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Cliente <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      className="flex-1 h-8 px-2.5 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                    <button
                      type="button"
                      className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                    </button>
                  </div>
                </div>

                {/* Produtor */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Produtor
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={producer}
                      onChange={(e) => setProducer(e.target.value)}
                      className="flex-1 h-8 px-2.5 border border-white/10 rounded-xs text-white text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                    <button
                      type="button"
                      className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                    </button>
                  </div>
                </div>

                {/* Descrição */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-neutral-400 pt-1.5">
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
                  <label className="col-span-3 text-right text-neutral-400">
                    Mídias
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={medias}
                      onChange={(e) => setMedias(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="flex-1 h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                    <button
                      type="button"
                      className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                    </button>
                  </div>
                </div>

                {/* Tipo */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Tipo
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="flex-1 h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                    <button
                      type="button"
                      className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                    </button>
                  </div>
                </div>

                {/* Produto */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Produto
                  </label>
                  <div className="col-span-9 flex items-center gap-2">
                    <input
                      type="text"
                      value={product}
                      onChange={(e) => setProduct(e.target.value)}
                      placeholder="Selecione ou digite uma nova opção"
                      className="flex-1 h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                    <button
                      type="button"
                      className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer shrink-0"
                    >
                      <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                    </button>
                  </div>
                </div>

                {/* Exclusividade */}
                <div className="grid grid-cols-12 items-center gap-3 pt-1">
                  <label className="col-span-3 text-right text-neutral-400">
                    Exclusividade
                  </label>
                  <div className="col-span-9 flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={exclusivity}
                      onChange={(e) => setExclusivity(e.target.checked)}
                      className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] cursor-pointer"
                    />
                    <button
                      type="button"
                      className="text-[10px] text-[#E8AC51] hover:underline uppercase cursor-pointer"
                    >
                      ADICIONAR NOTA
                    </button>
                  </div>
                </div>

                {/* Período de uso */}
                <div className="grid grid-cols-12 items-start gap-3 pt-1">
                  <label className="col-span-3 text-right text-neutral-400 pt-1">
                    Período de uso
                  </label>
                  <div className="col-span-9 space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 text-[10px]">
                        Período
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={periodCount}
                        onChange={(e) => setPeriodCount(e.target.value)}
                        className="w-12 h-7 px-1.5 border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                      />
                      <div className="relative w-24">
                        <select
                          value={periodUnit}
                          onChange={(e) => setPeriodUnit(e.target.value)}
                          className="w-full h-7 px-2 pr-6 border border-white/10 rounded-xs bg-[#1c1c1e] text-white font-semibold text-[11px] appearance-none focus:outline-none focus:border-[#880E1B]"
                        >
                          <option value="dia(s)">dia(s)</option>
                          <option value="semana(s)">semana(s)</option>
                          <option value="mês(es)">mês(es)</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block text-[10px] text-neutral-400 mb-0.5">
                          Começo
                        </span>
                        <input
                          type="text"
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          placeholder="__/__/____"
                          className="w-20 h-7 px-1.5 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 text-[11px] focus:outline-none focus:border-[#880E1B]"
                        />
                      </div>
                      <div className="flex items-center gap-1.5 pt-3.5">
                        <span className="text-[10px] text-neutral-400">Fim</span>
                        <input
                          type="text"
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          placeholder="__/__/____"
                          className="w-20 h-7 px-1.5 border border-white/10 rounded-xs text-center text-white placeholder:text-neutral-400 text-[11px] focus:outline-none focus:border-[#880E1B]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Território de exclusividade */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400 leading-tight">
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
                      className="w-full h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                    />
                  </div>
                </div>
              </div>

              {/* Coluna Direita */}
              <div className="lg:col-span-6 space-y-3">
                {/* Orçamento * */}
                <div className="grid grid-cols-12 items-center gap-3">
                  <label className="col-span-3 text-right text-neutral-400">
                    Orçamento <span className="text-red-500">*</span>
                  </label>
                  <div className="col-span-9 flex flex-wrap items-center gap-1.5">
                    <input
                      type="text"
                      value={budgetAmount}
                      onChange={(e) => setBudgetAmount(e.target.value)}
                      className="w-28 h-8 px-2 border border-white/10 rounded-xs text-xs text-white focus:outline-none focus:border-[#880E1B]"
                    />
                    <div className="relative w-24">
                      <select
                        value={budgetCurrency}
                        onChange={(e) => setBudgetCurrency(e.target.value)}
                        className="w-full h-8 px-1.5 pr-5 border border-white/10 rounded-xs bg-[#1c1c1e] text-white font-semibold text-[11px] truncate appearance-none focus:outline-none focus:border-[#880E1B]"
                      >
                        <option value="BRL - Brazil R$">BRL - Brazil</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                      </select>
                      <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                    <span className="text-neutral-400">+</span>
                    <input
                      type="text"
                      value={budgetExtraPercent}
                      onChange={(e) => setBudgetExtraPercent(e.target.value)}
                      className="w-10 h-8 px-1.5 border border-white/10 rounded-xs text-center font-semibold text-xs text-white focus:outline-none focus:border-[#880E1B]"
                    />
                    <span className="text-neutral-400">%</span>
                    <Info className="w-3.5 h-3.5 fill-[#E8AC51] text-white" />
                  </div>
                </div>

                {/* Data(s) do trabalho */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-neutral-400 pt-1.5">
                    Data(s) do trabalho
                  </label>
                  <div className="col-span-9 space-y-2">
                    {workDates.map((row, idx) => (
                      <div
                        key={idx}
                        className="flex flex-wrap items-center gap-1.5"
                      >
                        <Calendar className="w-4 h-4 text-[#E8AC51] shrink-0" />
                        <input
                          type="text"
                          value={row.date}
                          onChange={(e) =>
                            handleDateChange(idx, 'date', e.target.value)
                          }
                          className="w-24 h-8 px-2 border border-white/10 rounded-xs text-center font-semibold text-xs text-white focus:outline-none focus:border-[#880E1B]"
                        />
                        <Clock className="w-4 h-4 text-[#E8AC51] ml-2 shrink-0" />
                        <input
                          type="text"
                          value={row.startTime}
                          onChange={(e) =>
                            handleDateChange(idx, 'startTime', e.target.value)
                          }
                          placeholder="__:__"
                          className="w-12 h-8 px-1 border border-white/10 rounded-xs text-center font-semibold text-xs text-white focus:outline-none focus:border-[#880E1B]"
                        />
                        <span className="text-neutral-400">-</span>
                        <input
                          type="text"
                          value={row.endTime}
                          onChange={(e) =>
                            handleDateChange(idx, 'endTime', e.target.value)
                          }
                          placeholder="__:__"
                          className="w-12 h-8 px-1 border border-white/10 rounded-xs text-center text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
                        />
                        <button
                          type="button"
                          onClick={handleAddDateRow}
                          className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer"
                        >
                          <PlusCircle className="w-4 h-4 fill-[#E8AC51] text-white" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleAddDateRow}
                      className="inline-flex items-center gap-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold px-2.5 py-1 rounded-xs cursor-pointer"
                    >
                      <Plus className="w-3 h-3 stroke-[3]" />
                      <span>DATA</span>
                    </button>
                  </div>
                </div>

                {/* Notas */}
                <div className="grid grid-cols-12 items-start gap-3">
                  <label className="col-span-3 text-right text-neutral-400 pt-1.5">
                    Notas
                  </label>
                  <div className="col-span-9">
                    <RichTextField
                      value={notes}
                      onChange={setNotes}
                      rows={5}
                      compactToolbar={true}
                    />
                  </div>
                </div>

                {/* Notas Internas */}
                <div className="grid grid-cols-12 items-start gap-3 pt-2">
                  <label className="col-span-3 text-right text-neutral-400 pt-1.5">
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
                <div className="grid grid-cols-12 items-center gap-3 pt-3">
                  <label className="col-span-3 text-right text-neutral-400">
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
                      className="inline-flex items-center gap-1.5 text-[10px] text-[#E8AC51] hover:underline uppercase cursor-pointer"
                    >
                      <Folder className="w-3.5 h-3.5 fill-[#E8AC51] text-[#E8AC51]" />
                      <span>PESQUISAR</span>
                    </button>
                    {attachedFileName && (
                      <span className="text-[10px] text-neutral-400 truncate max-w-[160px]">
                        {attachedFileName}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Linha Inferior: Talento * */}
            <div className="grid grid-cols-1 lg:grid-cols-12 items-start gap-3 pt-1">
              <label className="lg:col-span-1 lg:text-right text-neutral-400 pt-2">
                Talento <span className="text-red-500">*</span>
              </label>
              <div className="lg:col-span-11 space-y-2 pl-0 lg:pl-7">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={talent}
                    onChange={(e) => setTalent(e.target.value)}
                    placeholder="Pesquisar Talento..."
                    className="w-full sm:w-80 h-8 px-2.5 border border-white/10 rounded-xs text-white placeholder:text-neutral-400 text-xs focus:outline-none focus:border-[#880E1B]"
                  />

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-[10px] text-[#E8AC51] hover:underline uppercase cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#E8AC51]" />
                    <span>ADICIONAR A PARTIR DE PACOTES</span>
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold px-2.5 py-1.5 rounded-xs uppercase cursor-pointer"
                  >
                    <Filter className="w-3 h-3 fill-white" />
                    <span>FILTRO</span>
                  </button>
                </div>

                <label className="inline-flex items-center gap-1.5 cursor-pointer text-[11px] text-neutral-400">
                  <input
                    type="checkbox"
                    checked={checkSchedule}
                    onChange={(e) => setCheckSchedule(e.target.checked)}
                    className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51]"
                  />
                  <span>Conferir Agenda dos Participantes</span>
                </label>
              </div>
            </div>
          </div>

          {/* Rodapé */}
          <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-4 bg-[#1c1c1e]">
            <button
              type="button"
              onClick={onClose}
              className="text-[11px] text-[#E8AC51] hover:underline uppercase font-medium px-2 py-1.5 cursor-pointer"
            >
              CANCELAR
            </button>
            <button
              type="submit"
              className="bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-semibold uppercase px-4 py-2 rounded-xs transition-colors cursor-pointer"
            >
              SALVAR
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

