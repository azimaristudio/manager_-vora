import React from 'react';
import {
  Plus,
  Trash2,
  Landmark,
  CreditCard,
  Users,
  FileText,
  BadgeCheck,
  FileSpreadsheet,
} from 'lucide-react';
import {
  MARITAL_STATUS_OPTIONS,
  CHILDREN_OPTIONS,
  BANK_PERSON_TYPE_OPTIONS,
  BANK_ACCOUNT_TYPE_OPTIONS,
} from '../../data/talentFormOptions';

const INPUT_CLASS =
  'w-full px-3 py-2 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none transition-colors';

export default function AdminAndBankForm({
  mode = 'admin',
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
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 sm:p-6 shadow-xs space-y-6">
        {/* Cabeçalho Contas Bancárias */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E8AC51]/10 border border-[#E8AC51]/30 flex items-center justify-center text-[#E8AC51] shrink-0">
              <Landmark className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-semibold text-white">
                Contas Bancárias
              </h3>
              <p className="text-xs text-neutral-400">
                Cadastre as contas bancárias do talento para recebimentos,
                pagamentos e repasses.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={addBankAccount}
            className="px-4 py-2 bg-[#880E1B] hover:bg-[#a31121] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>ADICIONAR CONTA BANCÁRIA</span>
          </button>
        </div>

        {/* Lista de Contas Bancárias */}
        <div className="space-y-5">
          {bankAccounts.map((acc, index) => (
            <div
              key={acc.id}
              className="bg-[#161617] border border-white/10 border-b-2 border-b-[#880E1B] rounded-xl overflow-hidden"
            >
              {/* Barra Dourada da Conta */}
              <div className="px-5 py-3 bg-[#E8AC51]/10 border-b border-white/10 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#E8AC51]">
                  <CreditCard className="w-4 h-4" />
                  <span>Conta Bancária #{index + 1}</span>
                </div>
                {bankAccounts.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeBankAccount(acc.id)}
                    className="inline-flex items-center gap-1 text-xs text-neutral-400 hover:text-red-400 transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remover</span>
                  </button>
                )}
              </div>

              {/* 2 Colunas: Dados da Conta | Informações Complementares */}
              <div className="p-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Coluna Esquerda: DADOS DA CONTA */}
                <div className="space-y-3.5 lg:border-r lg:border-white/10 lg:pr-6">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#E8AC51]">
                    <Landmark className="w-3.5 h-3.5" />
                    <span>DADOS DA CONTA</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400">
                      Banco / Nome
                    </label>
                    <div className="sm:col-span-8">
                      <input
                        type="text"
                        value={acc.bankName}
                        onChange={(e) =>
                          updateBankAccount(acc.id, 'bankName', e.target.value)
                        }
                        placeholder="Nome (ex: Itaú, Nubank, Bradesco)"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400">
                      Agência
                    </label>
                    <div className="sm:col-span-8">
                      <input
                        type="text"
                        value={acc.branch}
                        onChange={(e) =>
                          updateBankAccount(acc.id, 'branch', e.target.value)
                        }
                        placeholder="Agência"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400">
                      Número
                    </label>
                    <div className="sm:col-span-8">
                      <input
                        type="text"
                        value={acc.accountNumber}
                        onChange={(e) =>
                          updateBankAccount(
                            acc.id,
                            'accountNumber',
                            e.target.value
                          )
                        }
                        placeholder="Número"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400">
                      Beneficiário
                    </label>
                    <div className="sm:col-span-8">
                      <input
                        type="text"
                        value={acc.beneficiary}
                        onChange={(e) =>
                          updateBankAccount(
                            acc.id,
                            'beneficiary',
                            e.target.value
                          )
                        }
                        placeholder="Beneficiário"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                </div>

                {/* Coluna Direita: INFORMAÇÕES COMPLEMENTARES */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#E8AC51]">
                    <Users className="w-3.5 h-3.5" />
                    <span>INFORMAÇÕES COMPLEMENTARES</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400">
                      Pessoa
                    </label>
                    <div className="sm:col-span-8">
                      <select
                        value={acc.personType}
                        onChange={(e) =>
                          updateBankAccount(
                            acc.id,
                            'personType',
                            e.target.value
                          )
                        }
                        className={INPUT_CLASS}
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

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400 pt-2">
                      Endereço
                    </label>
                    <div className="sm:col-span-8">
                      <textarea
                        rows={2}
                        value={acc.address}
                        onChange={(e) =>
                          updateBankAccount(acc.id, 'address', e.target.value)
                        }
                        placeholder="Endereço da agência ou titular"
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-center gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400">
                      Tipo
                    </label>
                    <div className="sm:col-span-8">
                      <select
                        value={acc.accountType}
                        onChange={(e) =>
                          updateBankAccount(
                            acc.id,
                            'accountType',
                            e.target.value
                          )
                        }
                        className={INPUT_CLASS}
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

                  <div className="grid grid-cols-1 sm:grid-cols-12 items-start gap-2">
                    <label className="sm:col-span-4 text-xs font-medium text-neutral-400 pt-2">
                      Notas / PIX
                    </label>
                    <div className="sm:col-span-8">
                      <textarea
                        rows={2}
                        value={acc.notes}
                        onChange={(e) =>
                          updateBankAccount(acc.id, 'notes', e.target.value)
                        }
                        placeholder="Chave PIX ou observações bancárias..."
                        className={INPUT_CLASS}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Aba: Informações Administrativas
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
      {/* Coluna Esquerda: Informações administrativas */}
      <div className="lg:col-span-6 bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
        <div className="flex items-start gap-3 pb-4 border-b border-white/10">
          <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              Informações administrativas
            </h3>
            <p className="text-[11px] text-neutral-400 mt-0.5">
              Dados pessoais e fiscais utilizados em contratos, pagamentos e
              obrigações legais.
            </p>
          </div>
        </div>

        <div className="divide-y divide-white/10">
          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
            <div className="sm:col-span-5">
              <div className="text-xs font-semibold text-white">Estado Civil</div>
              <div className="text-[11px] text-neutral-500">
                Situação civil do talento.
              </div>
            </div>
            <div className="sm:col-span-7">
              <select
                value={admin.maritalStatus}
                onChange={(e) =>
                  handleAdminField('maritalStatus', e.target.value)
                }
                className={INPUT_CLASS}
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

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
            <div className="sm:col-span-5">
              <div className="text-xs font-semibold text-white">Filhos</div>
              <div className="text-[11px] text-neutral-500">
                Possui filhos? (para controle interno e contratos).
              </div>
            </div>
            <div className="sm:col-span-7">
              <select
                value={admin.children}
                onChange={(e) => handleAdminField('children', e.target.value)}
                className={INPUT_CLASS}
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

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
            <div className="sm:col-span-5">
              <div className="text-xs font-semibold text-white">RG</div>
              <div className="text-[11px] text-neutral-500">
                Registro Geral (RG).
              </div>
            </div>
            <div className="sm:col-span-7">
              <input
                type="text"
                value={admin.rg}
                onChange={(e) => handleAdminField('rg', e.target.value)}
                placeholder="RG"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
            <div className="sm:col-span-5">
              <div className="text-xs font-semibold text-white">CPF</div>
              <div className="text-[11px] text-neutral-500">
                Cadastro de Pessoa Física.
              </div>
            </div>
            <div className="sm:col-span-7">
              <input
                type="text"
                value={admin.cpf}
                onChange={(e) => handleAdminField('cpf', e.target.value)}
                placeholder="CPF"
                className={INPUT_CLASS}
              />
            </div>
          </div>

          <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
            <div className="sm:col-span-5">
              <div className="text-xs font-semibold text-white">
                Fatura Como Empresa
              </div>
              <div className="text-[11px] text-neutral-500">
                Emite nota fiscal como pessoa jurídica?
              </div>
            </div>
            <div className="sm:col-span-7">
              <select
                value={admin.invoicesAsCompany}
                onChange={(e) =>
                  handleAdminField('invoicesAsCompany', e.target.value)
                }
                className={INPUT_CLASS}
              >
                <option value="">Selecione</option>
                <option value="yes">Sim (Possui CNPJ)</option>
                <option value="no">Não (Pessoa Física)</option>
              </select>
            </div>
          </div>

          <div className="pt-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
            <div className="sm:col-span-5">
              <div className="text-xs font-semibold text-white">
                Inscrição Municipal
              </div>
              <div className="text-[11px] text-neutral-500">
                Número da inscrição municipal (se houver).
              </div>
            </div>
            <div className="sm:col-span-7">
              <input
                type="text"
                value={admin.municipalRegistration}
                onChange={(e) =>
                  handleAdminField('municipalRegistration', e.target.value)
                }
                placeholder="Inscrição Municipal"
                className={INPUT_CLASS}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Coluna Direita: Termos + DRT */}
      <div className="lg:col-span-6 space-y-5">
        {/* Card Termos */}
        <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs space-y-4">
          <div className="flex items-start gap-3 pb-3.5 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">Termos</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Autorizações e consentimentos do talento.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5 max-w-sm">
              <div className="text-xs font-semibold text-white">
                Autorização De Uso De Imagem
              </div>
              <p className="text-[11px] text-neutral-500 leading-relaxed">
                Autoriza o uso de sua imagem em materiais da agência
                (divulgação, portfólio, campanhas etc.).
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0">
              {[
                { value: 'yes', label: 'Sim' },
                { value: 'no', label: 'NÃO' },
                { value: 'unknown', label: 'Sem informação' },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={`inline-flex items-center gap-1.5 text-xs cursor-pointer ${
                    admin.imageRightsAuthorized === opt.value
                      ? 'text-[#E8AC51] font-semibold'
                      : 'text-neutral-400'
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
                    className="accent-[#880E1B] cursor-pointer"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Card DRT */}
        <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 shadow-xs">
          <div className="flex items-start gap-3 pb-4 border-b border-white/10">
            <div className="w-8 h-8 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/25 flex items-center justify-center text-[#E8AC51] shrink-0">
              <BadgeCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">DRT</h3>
              <p className="text-[11px] text-neutral-400 mt-0.5">
                Registros profissionais do talento (SATED / DRT).
              </p>
            </div>
          </div>

          <div className="divide-y divide-white/10">
            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <div className="sm:col-span-5">
                <div className="text-xs font-semibold text-white">Ator</div>
                <div className="text-[11px] text-neutral-500">
                  Número do registro DRT de ator.
                </div>
              </div>
              <div className="sm:col-span-7">
                <input
                  type="text"
                  value={admin.drtActor}
                  onChange={(e) => handleAdminField('drtActor', e.target.value)}
                  placeholder="Ator (Nº Registro DRT)"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="py-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <div className="sm:col-span-5">
                <div className="text-xs font-semibold text-white">Modelo</div>
                <div className="text-[11px] text-neutral-500">
                  Número do registro SATED / DRT de modelo.
                </div>
              </div>
              <div className="sm:col-span-7">
                <input
                  type="text"
                  value={admin.drtModel}
                  onChange={(e) => handleAdminField('drtModel', e.target.value)}
                  placeholder="Modelo (Nº SATED / DRT)"
                  className={INPUT_CLASS}
                />
              </div>
            </div>

            <div className="pt-3.5 grid grid-cols-1 sm:grid-cols-12 items-center gap-3">
              <div className="sm:col-span-5">
                <div className="text-xs font-semibold text-white">
                  Apresentador
                </div>
                <div className="text-[11px] text-neutral-500">
                  Número do registro DRT de apresentador.
                </div>
              </div>
              <div className="sm:col-span-7">
                <input
                  type="text"
                  value={admin.drtPresenter}
                  onChange={(e) =>
                    handleAdminField('drtPresenter', e.target.value)
                  }
                  placeholder="Apresentador"
                  className={INPUT_CLASS}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
