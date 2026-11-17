import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  User,
  Handshake,
  IdCard,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Building2,
  Star,
  Pencil,
} from 'lucide-react';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

const TABS = [
  { id: 'clientes', label: 'Clientes', icon: User },
  { id: 'fornecedores', label: 'Fornecedores', icon: Handshake },
  { id: 'outros', label: 'Outros Contatos', icon: IdCard },
];

export default function Contacts({ contactsData, onUpdateContactBooker }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('fornecedores'); // 'clientes' | 'fornecedores' | 'outros'
  const [activeLetter, setActiveLetter] = useState('TODOS');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookerDrafts, setBookerDrafts] = useState({});

  const currentList = contactsData?.[activeTab] || [];

  const filteredList = currentList.filter((item) => {
    const matchesLetter =
      activeLetter === 'TODOS' ||
      item.name?.charAt(0).toUpperCase() === activeLetter;
    const matchesSearch =
      !searchQuery.trim() ||
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLetter && matchesSearch;
  });

  const handleGoToNewContact = () => {
    navigate('/contatos/novo', {
      state: {
        contactGroup: activeTab,
      },
    });
  };

  return (
    <div className="w-full pb-20 select-none">
      {/* 1. Sub-Cabeçalho: Breadcrumb "Início > Contatos" + Busca + Botão "+" */}
      <div className="w-full bg-[#161617] border border-white/10 rounded-xs px-4 py-2.5 mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <Link
            to="/"
            className="text-[#E8AC51] hover:underline font-normal cursor-pointer"
          >
            Início
          </Link>
          <span>&gt;</span>
          <Link
            to="/contatos"
            className="text-[#E8AC51] hover:underline font-normal cursor-pointer"
          >
            Contatos
          </Link>
        </div>

        {/* Barra de Busca "Buscar um contato" + Botão Azul "+" */}
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#1c1c1e] border border-white/10 rounded-xs overflow-hidden focus-within:border-[#880E1B] transition-colors w-full sm:w-64">
            <span className="px-2.5 py-1.5 bg-[#161617] border-r border-white/10 text-neutral-400">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar um contato"
              className="w-full px-2.5 py-1 text-xs text-white placeholder:text-neutral-400 outline-none"
            />
          </div>

          <button
            type="button"
            onClick={handleGoToNewContact}
            title="Adicionar Novo Contato"
            className="px-2.5 py-1.5 bg-[#880E1B] hover:bg-[#a31121] text-white rounded-xs shadow-2xs transition-colors flex items-center justify-center cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Navegação por Abas: Clientes | Fornecedores | Outros Contatos */}
      <div className="flex flex-wrap items-end border-b border-white/10">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setActiveLetter('TODOS');
              }}
              className={`px-4 py-3 flex items-center gap-2.5 text-xs border-t border-x rounded-t-xs transition-colors cursor-pointer mr-1 ${
                isActive
                  ? 'bg-[#1c1c1e] border-white/10 text-white font-semibold -mb-px pb-[13px]'
                  : 'bg-[#161617] border-white/10 text-neutral-400 hover:bg-[#1c1c1e]'
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-[#1c1c1e] text-white flex items-center justify-center shrink-0">
                <Icon className="w-3.5 h-3.5" />
              </span>
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 3. Barra Alfabética (TODOS + A..Z) + Botão Reset + Paginação */}
      <div className="py-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center border border-white/10 rounded-xs overflow-hidden bg-[#161617]">
          <button
            type="button"
            onClick={() => setActiveLetter('TODOS')}
            className={`px-3.5 py-1.5 text-[11px] font-semibold uppercase transition-colors cursor-pointer ${
              activeLetter === 'TODOS'
                ? 'bg-[#880E1B] text-white'
                : 'text-neutral-400 hover:bg-[#1c1c1e]'
            }`}
          >
            TODOS
          </button>
          {ALPHABET.map((letter) => {
            const isCurrent = activeLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => setActiveLetter(letter)}
                className={`w-6 py-1.5 text-[10px] border-l border-white/10 transition-colors cursor-pointer ${
                  isCurrent
                    ? 'bg-[#880E1B] text-white font-bold'
                    : 'text-neutral-400 hover:bg-[#1c1c1e]'
                }`}
              >
                {letter}
              </button>
            );
          })}
        </div>

        {/* Botão Reset Azul Claro + Contador de Paginação */}
        <div className="flex items-center gap-4 ml-auto">
          <button
            type="button"
            onClick={() => {
              setActiveLetter('TODOS');
              setSearchQuery('');
            }}
            title="Limpar filtro alfabético"
            className="p-1.5 bg-[#E8AC51] hover:bg-[#d99b3f] text-white rounded-xs transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>
              <strong className="font-bold text-white">1</strong> -{' '}
              <strong className="font-bold text-white">
                {filteredList.length}
              </strong>{' '}
              de{' '}
              <strong className="font-bold text-white">
                {filteredList.length}
              </strong>
            </span>

            <div className="inline-flex border border-white/10 rounded-xs overflow-hidden bg-[#161617]">
              <button
                type="button"
                className="p-1.5 text-neutral-400 hover:bg-[#1c1c1e] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                className="p-1.5 border-l border-white/10 text-neutral-400 hover:bg-[#1c1c1e] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Tabela de Dados de Contatos (Fiel às imagens 14, 15 e 16) */}
      <div className="w-full border border-white/10 rounded-xs overflow-x-auto shadow-2xs">
        <table className="w-full border-collapse text-left min-w-[820px]">
          <thead>
            <tr className="bg-[#880E1B] text-white text-[11px] font-medium">
              <th className="py-2.5 px-3 w-[6%]">
                <div className="inline-flex items-center gap-1">
                  <span>#</span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[18%]">
                <div className="inline-flex items-center gap-1">
                  <span>Nome</span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[10%] text-center">
                <div className="inline-flex items-center justify-center gap-1">
                  <span>
                    {activeTab === 'clientes' ? 'Todos os tipos' : 'Tipo'}
                  </span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[9%] bg-[#1c1c1e] text-center">
                <div className="inline-flex items-center justify-center gap-1">
                  <span>Ativo</span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[14%]">
                <div className="inline-flex items-center gap-1">
                  <span>Categoria</span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[16%]">
                <div className="inline-flex items-center gap-1">
                  <span>
                    {activeTab === 'clientes'
                      ? 'Todas as localizações'
                      : 'Localização'}
                  </span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[15%]">
                <div className="inline-flex items-center gap-1">
                  <span>
                    {activeTab === 'clientes' ? 'Todos os bookers' : 'Booker'}
                  </span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
              <th className="py-2.5 px-3 w-[12%]">
                <div className="inline-flex items-center gap-1">
                  <span>
                    {activeTab === 'clientes'
                      ? 'Todas as classificações'
                      : 'Classificação'}
                  </span>
                  <Search className="w-3 h-3 opacity-85" />
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((contact, idx) => (
                <tr
                  key={contact.id}
                  className="bg-[#161617] hover:bg-[#1c1c1e] border-b border-white/10 text-xs text-neutral-400 transition-colors"
                >
                  {/* # */}
                  <td className="py-2.5 px-3 text-neutral-400">{idx + 1}</td>

                  {/* Nome */}
                  <td className="py-2.5 px-3">
                    <button
                      type="button"
                      onClick={() =>
                        navigate('/contatos/novo', {
                          state: {
                            contactGroup: activeTab,
                            contactToEdit: contact,
                          },
                        })
                      }
                      className="font-bold text-[#E8AC51] hover:underline cursor-pointer text-left"
                    >
                      {contact.name}
                    </button>
                  </td>

                  {/* Tipo (Ícone de Empresa ou Pessoa) */}
                  <td className="py-2.5 px-3 text-center">
                    <div className="inline-flex items-center justify-center text-neutral-400">
                      {contact.entityType === 'person' ? (
                        <User className="w-3.5 h-3.5" />
                      ) : (
                        <Building2 className="w-3.5 h-3.5" />
                      )}
                    </div>
                  </td>

                  {/* Ativo */}
                  <td className="py-2.5 px-3 text-center text-neutral-400">
                    {contact.statusLabel || 'Ativo'}
                  </td>

                  {/* Categoria (Tag Azul) */}
                  <td className="py-2.5 px-3">
                    <span className="inline-block px-2 py-0.5 bg-[#880E1B] text-white text-[10px] font-semibold rounded-xs">
                      {contact.category || 'Agencia'}
                    </span>
                  </td>

                  {/* Localização */}
                  <td className="py-2.5 px-3 text-neutral-400">
                    {contact.location || 'Recife, Brazil'}
                  </td>

                  {/* Booker (Select + Botão OK) */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center gap-1">
                      <select
                        value={
                          bookerDrafts[contact.id] ?? contact.booker ?? ''
                        }
                        onChange={(e) =>
                          setBookerDrafts((prev) => ({
                            ...prev,
                            [contact.id]: e.target.value,
                          }))
                        }
                        className="px-2 py-1 text-[11px] bg-[#1c1c1e] border border-white/10 rounded-xs text-neutral-400 outline-none focus:border-[#880E1B] max-w-[105px]"
                      >
                        <option value="">Faça uma seleção</option>
                        <option value="Sophia Booker">Sophia Booker</option>
                        <option value="Equipe Évora">Equipe Évora</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => {
                          if (onUpdateContactBooker) {
                            onUpdateContactBooker(
                              activeTab,
                              contact.id,
                              bookerDrafts[contact.id] ?? ''
                            );
                          }
                        }}
                        className="px-2 py-1 bg-[#880E1B] hover:bg-[#a31121] text-white text-[10px] font-bold uppercase rounded-xs cursor-pointer"
                      >
                        OK
                      </button>
                    </div>
                  </td>

                  {/* Classificação (Estrelas + Ícone de Lápis) */}
                  <td className="py-2.5 px-3">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-0.5 text-neutral-400">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-3 h-3 ${
                              star <= (contact.rating || 0)
                                ? 'text-amber-400 fill-amber-400'
                                : 'text-neutral-400'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          navigate('/contatos/novo', {
                            state: {
                              contactGroup: activeTab,
                              contactToEdit: contact,
                            },
                          })
                        }
                        title="Editar Contato"
                        className="text-[#E8AC51] hover:text-[#E8AC51] cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5 fill-current" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              /* Empty State para Clientes e Outros Contatos (Imagens 14 e 16) */
              <tr>
                <td
                  colSpan={8}
                  className="bg-[#161617] py-10 px-4 text-center text-xs text-neutral-400"
                >
                  Nenhum resultado para esta consulta
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

