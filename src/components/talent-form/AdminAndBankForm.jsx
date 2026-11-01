import React from 'react';
import { Plus, Trash2, Building2 } from 'lucide-react';
import {
  MARITAL_STATUS_OPTIONS,
  CHILDREN_OPTIONS,
  BANK_PERSON_TYPE_OPTIONS,
  BANK_ACCOUNT_TYPE_OPTIONS,
} from '../../data/talentFormOptions';

export default function AdminAndBankForm({
  mode = 'admin', // 'admin' | 'bank'
  formData,
  onNestedChange,
}) {
  const { admin, bankAccounts } = formData;

  const handleAdminField = (field, value) => {
    onNestedChange('admin', field, value);
  };

  const addBankAccount = () => {
    const nextAccount = {
      id: Date.now(),
      bankName: '',
      branch: '',
      accountNumber: '',
      beneficiary: '',
      personType: '',
      address: '',
      accountType: '',
      notes: '',
    };
    onNestedChange('bankAccounts', null, [...bankAccounts, nextAccount]);
  };

  const updateBankAccount = (id, key, value) => {
    const updated = bankAccounts.map((acc) =>
      acc.id === id ? { ...acc, [key]: value } : acc
    );
    onNestedChange('bankAccounts', null, updated);
  };

  const removeBankAccount = (id) => {
    const updated = bankAccounts.filter((acc) => acc.id !== id);
    onNestedChange('bankAccounts', null, updated);
  };

  if (mode === 'bank') {
    return (
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-2xs">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-6 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-800">Contas Bancárias</h3>
          <button
            type="button"
            onClick={addBankAccount}
            className="px-3.5 py-1.5 bg-[#0077b5] hover:bg-[#006399] text-white text-[11px] font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>+ ADICIONAR CONTA BANCÁRIA</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {bankAccounts.map((acc, index) => (
            <div
              key={acc.id}
              className="p-5 bg-slate-50/60 border border-slate-200 rounded-sm border-b-2 border-b-[#0077b5] space-y-3 relative"
            >
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#0077b5]">
                  <Building2 className="w-4 h-4" />
                  <span>Conta Bancária #{index + 1}</span>
                </div>
                {bankAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBankAccount(acc.id)}
                    className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-red-600 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                )}
              </div>

              {/* Nome (Banco) */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600">
                  Nome
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={acc.bankName}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'bankName', e.target.value)
                    }
                    placeholder="Nome (ex: Itaú, Nubank, Bradesco)"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>

              {/* Agência */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600">
                  Agência
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={acc.branch}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'branch', e.target.value)
                    }
                    placeholder="Agência"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>

              {/* Número */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600">
                  Número
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={acc.accountNumber}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'accountNumber', e.target.value)
                    }
                    placeholder="Número"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>

              {/* Beneficiário */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600">
                  Beneficiário
                </label>
                <div className="col-span-8">
                  <input
                    type="text"
                    value={acc.beneficiary}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'beneficiary', e.target.value)
                    }
                    placeholder="Beneficiário"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>

              {/* Pessoa */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600">
                  Pessoa
                </label>
                <div className="col-span-8">
                  <select
                    value={acc.personType}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'personType', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  >
                    <option value="">Selecione</option>
                    {BANK_PERSON_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Endereço */}
              <div className="grid grid-cols-12 items-start gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600 pt-1.5">
                  Endereço
                </label>
                <div className="col-span-8">
                  <textarea
                    rows={2}
                    value={acc.address}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'address', e.target.value)
                    }
                    placeholder="Endereço da agência ou titular"
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>

              {/* Tipo */}
              <div className="grid grid-cols-12 items-center gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600">
                  Tipo
                </label>
                <div className="col-span-8">
                  <select
                    value={acc.accountType}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'accountType', e.target.value)
                    }
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  >
                    <option value="">Selecione</option>
                    {BANK_ACCOUNT_TYPE_OPTIONS.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Notas / Chave PIX */}
              <div className="grid grid-cols-12 items-start gap-2">
                <label className="col-span-4 text-xs font-medium text-slate-600 pt-1.5">
                  Notas / PIX
                </label>
                <div className="col-span-8">
                  <textarea
                    rows={2}
                    value={acc.notes}
                    onChange={(e) =>
                      updateBankAccount(acc.id, 'notes', e.target.value)
                    }
                    placeholder="Chave PIX ou observações bancárias..."
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Aba: Informações Administrativas (Fiel à Imagem 07 - 3 Colunas)
  return (
    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-2xs">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna 1: Informações administrativas */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
            Informações administrativas
          </h3>

          <div className="space-y-3.5">
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Estado Civil
              </label>
              <div className="col-span-7">
                <select
                  value={admin.maritalStatus}
                  onChange={(e) =>
                    handleAdminField('maritalStatus', e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                >
                  <option value="">Selecione</option>
                  {MARITAL_STATUS_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Filhos
              </label>
              <div className="col-span-7">
                <select
                  value={admin.children}
                  onChange={(e) => handleAdminField('children', e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                >
                  <option value="">Selecione</option>
                  {CHILDREN_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                RG
              </label>
              <div className="col-span-7">
                <input
                  type="text"
                  value={admin.rg}
                  onChange={(e) => handleAdminField('rg', e.target.value)}
                  placeholder="RG"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                CPF
              </label>
              <div className="col-span-7">
                <input
                  type="text"
                  value={admin.cpf}
                  onChange={(e) => handleAdminField('cpf', e.target.value)}
                  placeholder="CPF"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Fatura Como Empresa
              </label>
              <div className="col-span-7">
                <select
                  value={admin.invoicesAsCompany}
                  onChange={(e) =>
                    handleAdminField('invoicesAsCompany', e.target.value)
                  }
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                >
                  <option value="">Selecione</option>
                  <option value="yes">Sim (Possui CNPJ)</option>
                  <option value="no">Não (Pessoa Física)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-5 text-xs font-medium text-slate-600">
                Inscrição Municipal
              </label>
              <div className="col-span-7">
                <input
                  type="text"
                  value={admin.municipalRegistration}
                  onChange={(e) =>
                    handleAdminField('municipalRegistration', e.target.value)
                  }
                  placeholder="Inscrição Municipal"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coluna 2: Termos */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
            Termos
          </h3>

          <div className="space-y-2.5">
            <p className="text-xs font-medium text-slate-600">
              Autorização De Uso De Imagem
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-1">
              {[
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'NÃO' },
                { value: 'unknown', label: 'Sem informação' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`inline-flex items-center gap-1.5 text-xs cursor-pointer ${
                    admin.imageRightsAuthorized === opt.value
                      ? 'text-[#0077b5] font-bold'
                      : 'text-slate-600'
                  }`}
                >
                  <input
                    type="radio"
                    name="imageRightsAuthorized"
                    value={opt.value}
                    checked={admin.imageRightsAuthorized === opt.value}
                    onChange={(e) =>
                      handleAdminField('imageRightsAuthorized', e.target.value)
                    }
                    className="accent-[#0077b5] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna 3: DRT */}
        <div>
          <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-4 border-b border-slate-200">
            DRT
          </h3>

          <div className="space-y-3.5">
            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs font-medium text-slate-600">
                Ator
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={admin.drtActor}
                  onChange={(e) => handleAdminField('drtActor', e.target.value)}
                  placeholder="Ator (Nº Registro DRT)"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs font-medium text-slate-600">
                Modelo
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={admin.drtModel}
                  onChange={(e) => handleAdminField('drtModel', e.target.value)}
                  placeholder="Modelo (Nº SATED / DRT)"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-12 items-center gap-2">
              <label className="col-span-4 text-xs font-medium text-slate-600">
                Apresentador
              </label>
              <div className="col-span-8">
                <input
                  type="text"
                  value={admin.drtPresenter}
                  onChange={(e) =>
                    handleAdminField('drtPresenter', e.target.value)
                  }
                  placeholder="Apresentador"
                  className="w-full px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

