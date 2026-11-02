import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const INITIAL_ACCOUNTS = [
  {
    id: 'acc-default',
    label: 'DEFAULT ACCOUNT -',
    bank: 'DEFAULT ACCOUNT',
    beneficiary: '',
    address: '',
    agency: '',
    accountNumber: '',
    swift: '',
    iban: '',
    interbankKey: '',
    company: '',
    notes: '',
    initialBalance: '0.00 - BRL',
    attachments: '',
  },
];

export default function AccountsConfig() {
  const [accounts, setAccounts] = useState(INITIAL_ACCOUNTS);
  const [selectedId, setSelectedId] = useState('acc-default');
  const [isEditing, setIsEditing] = useState(false);

  const selectedAccount =
    accounts.find((a) => a.id === selectedId) || accounts[0];

  const handleAddAccount = () => {
    const newId = `acc-${Date.now()}`;
    const nextNum = accounts.length + 1;
    const newAcc = {
      id: newId,
      label: `CONTA #${nextNum} -`,
      bank: `CONTA #${nextNum}`,
      beneficiary: '',
      address: '',
      agency: '',
      accountNumber: '',
      swift: '',
      iban: '',
      interbankKey: '',
      company: '',
      notes: '',
      initialBalance: '0.00 - BRL',
      attachments: '',
    };
    setAccounts((prev) => [...prev, newAcc]);
    setSelectedId(newId);
  };

  const handleFieldChange = (field, value) => {
    setAccounts((prev) =>
      prev.map((acc) =>
        acc.id === selectedAccount.id ? { ...acc, [field]: value } : acc
      )
    );
  };

  const detailRows = [
    { key: 'bank', label: 'Banco', bold: true },
    { key: 'beneficiary', label: 'Beneficiário' },
    { key: 'address', label: 'Endereço' },
    { key: 'agency', label: 'Agência' },
    { key: 'accountNumber', label: 'Conta' },
    { key: 'swift', label: 'SWIFT' },
    { key: 'iban', label: 'IBAN' },
    { key: 'interbankKey', label: 'Chave interbancária' },
    { key: 'company', label: 'Empresa /' },
    { key: 'notes', label: 'Notas' },
    { key: 'initialBalance', label: 'Balanço Inicial Balance', bold: true },
    { key: 'attachments', label: 'Arquivos Anexados' },
  ];

  return (
    <div className="pt-2 flex flex-col md:flex-row gap-6 items-start">
      {/* Coluna Esquerda: Botão de Nova Conta + Lista de Contas */}
      <div className="w-full md:w-44 shrink-0">
        <button
          type="button"
          onClick={handleAddAccount}
          className="w-full py-2 px-2.5 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase tracking-tight rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          ADICIONA UMA NOVA CONTA DE BANCO
        </button>

        <div className="border-t border-slate-200 my-4" />

        <div className="space-y-2">
          {accounts.map((acc) => {
            const isSelected = acc.id === selectedAccount.id;
            return (
              <button
                key={acc.id}
                type="button"
                onClick={() => {
                  setSelectedId(acc.id);
                  setIsEditing(false);
                }}
                className={`w-full py-2 px-3 text-left text-[10px] font-semibold uppercase rounded-xs transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-[#0f82b3] text-white shadow-2xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {acc.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Coluna Direita: Painel Detalhando a Conta Selecionada */}
      <div className="flex-1 w-full bg-white border border-slate-200 rounded-xs p-6 sm:p-8 mt-6 md:mt-12">
        <div className="space-y-3 max-w-lg">
          {detailRows.map((row) => (
            <div
              key={row.key}
              className="grid grid-cols-[150px_1fr] items-center gap-4 text-[11px]"
            >
              <span className="text-right text-slate-400">{row.label}</span>
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={selectedAccount[row.key] || ''}
                    onChange={(e) => handleFieldChange(row.key, e.target.value)}
                    className="w-full h-7 px-2 border border-slate-200 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-[#0f82b3]"
                  />
                ) : (
                  <span
                    className={
                      row.bold
                        ? 'font-bold text-slate-900'
                        : 'text-slate-600'
                    }
                  >
                    {selectedAccount[row.key]}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Rodapé do Painel com botão azul EDITAR à direita */}
        <div className="mt-6 pt-3 border-t border-slate-200/90 flex justify-end">
          <button
            type="button"
            onClick={() => setIsEditing((prev) => !prev)}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs shadow-2xs transition-colors cursor-pointer"
          >
            <Pencil className="w-3 h-3 fill-white text-white" />
            <span>{isEditing ? 'SALVAR' : 'EDITAR'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

