import React, { useState, useRef } from 'react';
import { X, Folder, ChevronDown } from 'lucide-react';

export default function DirectEntryModal({ isOpen, onClose }) {
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [amount, setAmount] = useState('0');
  const [currency, setCurrency] = useState('BRL - Brazil Real');
  const [paymentDate, setPaymentDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('Pago');
  const [account, setAccount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Transferência Bancária');
  const [description, setDescription] = useState('');
  const [notes, setNotes] = useState('');
  const [receiptFile, setReceiptFile] = useState('');

  const fileInputRef = useRef(null);

  if (!isOpen) return null;

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
        className="bg-white w-full max-w-[420px] rounded-xs shadow-2xl border border-slate-200 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho (Imagem 56) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100">
          <h2 className="text-[15px] text-slate-800 font-bold">
            Registro de pagamento
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

        {/* Corpo Cinza Claro Interno */}
        <form onSubmit={handleSubmit} className="p-4 bg-white">
          <div className="bg-[#f5f5f5] border border-slate-200/70 rounded-xs p-5 space-y-2.5 text-[11px] text-slate-600">
            {/* Categoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600">
                Categoria
              </label>
              <div className="col-span-8 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="">Faça uma seleção</option>
                  <option value="Book">Book</option>
                  <option value="Cachê">Cachê</option>
                  <option value="Comissão">Comissão</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* SubCategoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600">
                SubCategoria
              </label>
              <div className="col-span-8 relative">
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="">Faça uma seleção</option>
                  <option value="Padrão">Padrão</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Montante */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600">
                Montante
              </label>
              <div className="col-span-8 flex items-center gap-1.5">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-16 h-7 px-2 bg-white border border-slate-200 rounded-xs text-right font-bold text-slate-700 text-[11px] focus:outline-none focus:border-[#0077b5]"
                />
                <div className="relative flex-1">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-7 px-1.5 pr-5 bg-white border border-slate-200 rounded-xs text-[10px] font-bold text-slate-700 truncate appearance-none focus:outline-none focus:border-[#0077b5]"
                  >
                    <option value="BRL - Brazil Real">BRL - Brazil Real</option>
                    <option value="USD - US Dollar">USD - US Dollar</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Data de Pagamento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600 leading-tight">
                Data de
                <br />
                Pagamento
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-24 h-7 px-2 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Status do pagamento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600 leading-tight">
                Status do
                <br />
                pagamento
              </label>
              <div className="col-span-8 relative">
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="Pago">Pago</option>
                  <option value="Pendente">Pendente</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Conta */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600">
                Conta
              </label>
              <div className="col-span-8 relative">
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="">Selecione uma conta</option>
                  <option value="DEFAULT ACCOUNT -">DEFAULT ACCOUNT -</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Metodo de Pagamento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600 leading-tight">
                Metodo de
                <br />
                Pagamento
              </label>
              <div className="col-span-8 relative">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 appearance-none focus:outline-none focus:border-[#0077b5]"
                >
                  <option value="Transferência Bancária">
                    Transferência Bancária
                  </option>
                  <option value="PIX">PIX</option>
                  <option value="Boleto">Boleto</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Descrição */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-slate-600">
                Descrição
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-7 px-2 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Notas */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-4 text-right text-slate-600 pt-1">
                Notas
              </label>
              <div className="col-span-8">
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-1.5 bg-white border border-slate-200 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
                />
              </div>
            </div>

            {/* Comprovante */}
            <div className="grid grid-cols-12 items-center gap-3 pt-1">
              <label className="col-span-4 text-right text-slate-600">
                Comprovante
              </label>
              <div className="col-span-8 flex items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setReceiptFile(file.name);
                  }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1 text-[10px] text-[#0077b5] hover:underline uppercase cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5 fill-[#0077b5] text-[#0077b5]" />
                  <span>ADICIONAR</span>
                </button>
                {receiptFile && (
                  <span className="text-[10px] text-slate-500 truncate max-w-[110px]">
                    {receiptFile}
                  </span>
                )}
              </div>
            </div>

            {/* Rodapé interno com CANCELAR e SALVAR */}
            <div className="pt-5 border-t border-slate-200/80 mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-[#f2f2f2] hover:bg-slate-200 border border-slate-200 rounded-xs text-[10px] text-slate-600 uppercase font-medium cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#0077b5] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
              >
                SALVAR
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

