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
        className="bg-[#1c1c1e] w-full max-w-[420px] rounded-xs shadow-2xl border border-white/10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho (Imagem 56) */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10">
          <h2 className="text-[15px] text-white font-bold">
            Registro de pagamento
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

        {/* Corpo Cinza Claro Interno */}
        <form onSubmit={handleSubmit} className="p-4 bg-[#1c1c1e]">
          <div className="bg-[#161617] border border-white/10 rounded-xs p-5 space-y-2.5 text-[11px] text-neutral-400">
            {/* Categoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Categoria
              </label>
              <div className="col-span-8 relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                >
                  <option value="">Faça uma seleção</option>
                  <option value="Book">Book</option>
                  <option value="Cachê">Cachê</option>
                  <option value="Comissão">Comissão</option>
                </select>
                <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* SubCategoria */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                SubCategoria
              </label>
              <div className="col-span-8 relative">
                <select
                  value={subCategory}
                  onChange={(e) => setSubCategory(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                >
                  <option value="">Faça uma seleção</option>
                  <option value="Padrão">Padrão</option>
                </select>
                <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Montante */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Montante
              </label>
              <div className="col-span-8 flex items-center gap-1.5">
                <input
                  type="text"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-16 h-7 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-right font-bold text-white text-[11px] focus:outline-none focus:border-[#880E1B]"
                />
                <div className="relative flex-1">
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full h-7 px-1.5 pr-5 bg-[#1c1c1e] border border-white/10 rounded-xs text-[10px] font-bold text-white truncate appearance-none focus:outline-none focus:border-[#880E1B]"
                  >
                    <option value="BRL - Brazil Real">BRL - Brazil Real</option>
                    <option value="USD - US Dollar">USD - US Dollar</option>
                  </select>
                  <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Data de Pagamento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400 leading-tight">
                Data de
                <br />
                Pagamento
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-24 h-7 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Status do pagamento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400 leading-tight">
                Status do
                <br />
                pagamento
              </label>
              <div className="col-span-8 relative">
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                >
                  <option value="Pago">Pago</option>
                  <option value="Pendente">Pendente</option>
                </select>
                <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Conta */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Conta
              </label>
              <div className="col-span-8 relative">
                <select
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                >
                  <option value="">Selecione uma conta</option>
                  <option value="DEFAULT ACCOUNT -">DEFAULT ACCOUNT -</option>
                </select>
                <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Metodo de Pagamento */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400 leading-tight">
                Metodo de
                <br />
                Pagamento
              </label>
              <div className="col-span-8 relative">
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full h-7 px-2 pr-6 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white appearance-none focus:outline-none focus:border-[#880E1B]"
                >
                  <option value="Transferência Bancária">
                    Transferência Bancária
                  </option>
                  <option value="PIX">PIX</option>
                  <option value="Boleto">Boleto</option>
                  <option value="Dinheiro">Dinheiro</option>
                </select>
                <ChevronDown className="w-3 h-3 text-neutral-400 absolute right-1.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Descrição */}
            <div className="grid grid-cols-12 items-center gap-3">
              <label className="col-span-4 text-right text-neutral-400">
                Descrição
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-7 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Notas */}
            <div className="grid grid-cols-12 items-start gap-3">
              <label className="col-span-4 text-right text-neutral-400 pt-1">
                Notas
              </label>
              <div className="col-span-8">
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-1.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-[11px] text-white focus:outline-none focus:border-[#880E1B]"
                />
              </div>
            </div>

            {/* Comprovante */}
            <div className="grid grid-cols-12 items-center gap-3 pt-1">
              <label className="col-span-4 text-right text-neutral-400">
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
                  className="inline-flex items-center gap-1 text-[10px] text-[#E8AC51] hover:underline uppercase cursor-pointer"
                >
                  <Folder className="w-3.5 h-3.5 fill-[#E8AC51] text-[#E8AC51]" />
                  <span>ADICIONAR</span>
                </button>
                {receiptFile && (
                  <span className="text-[10px] text-neutral-400 truncate max-w-[110px]">
                    {receiptFile}
                  </span>
                )}
              </div>
            </div>

            {/* Rodapé interno com CANCELAR e SALVAR */}
            <div className="pt-5 border-t border-white/10 mt-4 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 bg-[#1c1c1e] hover:bg-[#1c1c1e] border border-white/10 rounded-xs text-[10px] text-neutral-400 uppercase font-medium cursor-pointer"
              >
                CANCELAR
              </button>
              <button
                type="submit"
                className="px-3.5 py-1.5 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer"
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

