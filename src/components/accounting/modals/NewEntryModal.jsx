import React, { useState, useRef } from 'react';
import { X, PlusCircle, Folder, ChevronDown } from 'lucide-react';

export default function NewEntryModal({
  isOpen,
  onClose,
  mode = 'entrada', // 'entrada' | 'saida'
  onOpenDirectPayment,
}) {
  const [category, setCategory] = useState('Padrão Categoria');
  const [subCategory, setSubCategory] = useState('Padrão Sub categoria');
  const [referenceDate, setReferenceDate] = useState('30/10/2026');
  const [dueDate, setDueDate] = useState('');
  const [repeat, setRepeat] = useState('Nunca');
  const [client, setClient] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('0.00');
  const [currency, setCurrency] = useState('BRL - Brazil Real');
  const [attachedFile, setAttachedFile] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('NÃO PAGO');

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const modalTitle =
    mode === 'saida' ? 'Registro de Saída' : 'Registro de Entrada';

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center overflow-y-auto py-8 px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-[500px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho (Imagem 55) */}
        <div className="relative flex items-center justify-center px-6 py-4 border-b border-slate-100">
          <h2 className="text-[15px] text-slate-700 font-normal">
            {modalTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Fechar"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

        {/* Corpo do Modal */}
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-6 space-y-3.5 text-[11px] text-slate-600">
            {/* Categoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Categoria
              </label>
              <div className="col-span-8">
                <div className="relative w-56">
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="Padrão Categoria">Padrão Categoria</option>
                    <option value="Cachê">Cachê</option>
                    <option value="Comissão">Comissão</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Sub categoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Sub categoria
              </label>
              <div className="col-span-8">
                <div className="relative w-56">
                  <select
                    value={subCategory}
                    onChange={(e) => setSubCategory(e.target.value)}
                    className="w-full h-8 px-2.5 pr-7 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="Padrão Sub categoria">
                      Padrão Sub categoria
                    </option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Data de Referencia */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Data de Referencia
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={referenceDate}
                  onChange={(e) => setReferenceDate(e.target.value)}
                  className="w-36 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Data de Vencimento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Data de Vencimento
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-36 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Repetir */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Repetir
              </label>
              <div className="col-span-8">
                <div className="relative w-36">
                  <select
                    value={repeat}
                    onChange={(e) => setRepeat(e.target.value)}
                    className="w-full h-8 px-2.5 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-400 appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="Nunca">Nunca</option>
                    <option value="Mensalmente">Mensalmente</option>
                    <option value="Anualmente">Anualmente</option>
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Cliente */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Cliente
              </label>
              <div className="col-span-8 flex items-center gap-2">
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="Pesquisa..."
                  className="flex-1 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
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
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Descrição
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-56 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Valor */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-700">
                Valor
              </label>
              <div className="col-span-8 flex items-center gap-2">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-28 h-8 px-2.5 bg-white border border-slate-200 rounded-xs text-right text-[11px] text-slate-400 focus:outline-none focus:border-[#0077b5]"
                />
                <div className="relative w-28">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-8 px-2 pr-5 bg-white border border-slate-200 rounded-xs text-[10px] text-slate-400 truncate appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="BRL - Brazil Real">BRL - Brazil Real</option>
                    <option value="USD - US Dollar">USD - US Dollar</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Anexar files */}
            <div className="grid grid-cols-12 items-center gap-3 pt-1">
              <label className="col-span-4 text-right text-slate-700">
                Anexar files
              </label>
              <div className="col-span-8 flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAttachedFile(file.name);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 text-[10px] text-[#0077b5] hover:underline uppercase cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5 fill-[#0077b5] text-[#0077b5]" />
                  <span>ADICIONAR</span>
                </button>
                {attachedFile && (
                  <span className="text-[10px] text-slate-500 truncate max-w-[140px]">
                    {attachedFile}
                  </span>
                )}
              </div>
            </div>

            {/* Status de Pagamento: dropdown vermelho 'NÃO PAGO' e botão azul 'ADICIONAR PAGAMENTO' */}
            <div className="grid grid-cols-12 items-center gap-3 pt-2">
              <label className="col-span-4 text-right text-slate-700">
                Status de Pagamento
              </label>
              <div className="col-span-8 flex items-center justify-between gap-2">
                <div className="relative">
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value)}
                    className={`h-8 pl-2.5 pr-6 rounded-xs text-white text-[10px] font-semibold uppercase appearance-none cursor-pointer focus:outline-none ${
                      paymentStatus === 'NÃO PAGO'
                        ? 'bg-[#ff3b30]'
                        : 'bg-emerald-600'
                    }`}
                  >
                    <option value="NÃO PAGO">NÃO PAGO</option>
                    <option value="PAGO">PAGO</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-white absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (onOpenDirectPayment) onOpenDirectPayment();
                  }}
                  className="h-8 px-3 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
                >
                  ADICIONAR PAGAMENTO
                </button>
              </div>
            </div>
          </div>

          {/* Rodapé: FECHAR e SALVAR MUDANÇAS */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-end gap-2 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-2 bg-[#f2f2f2] hover:bg-slate-200 border border-slate-200 rounded-xs text-[10px] text-slate-500 uppercase font-medium cursor-pointer"
            >
              FECHAR
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
            >
              SALVAR MUDANÇAS
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

