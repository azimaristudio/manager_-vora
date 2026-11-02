import React, { useState } from 'react';
import { Globe, Plus, MoreVertical, Trash2 } from 'lucide-react';

const INITIAL_ACCENTS = [
  { id: 'acc-1', name: 'Inglês Americano', language: 'Inglês', count: 0 },
  { id: 'acc-2', name: 'Inglês Australiano', language: 'Inglês', count: 0 },
  { id: 'acc-3', name: 'Awadhi', language: 'Hindi', count: 0 },
  { id: 'acc-4', name: 'Bengali Bangladeshiano', language: 'Bengali', count: 0 },
  { id: 'acc-5', name: 'Bhojpuri', language: 'Hindi', count: 0 },
  { id: 'acc-6', name: 'Bundeli', language: 'Hindi', count: 0 },
  { id: 'acc-7', name: 'Espanhol Chileno', language: 'Espanhol', count: 0 },
  {
    id: 'acc-8',
    name: 'Bengali influenciado por Chittagonian',
    language: 'Bengali',
    count: 0,
  },
  { id: 'acc-9', name: 'Espanhol Colombiano', language: 'Espanhol', count: 0 },
  { id: 'acc-10', name: 'Árabe Egípcio', language: 'Árabe', count: 0 },
  { id: 'acc-11', name: 'Árabe do Golfo', language: 'Árabe', count: 0 },
  { id: 'acc-12', name: 'Sotaque de Hokkaido', language: 'Japonês', count: 0 },
  { id: 'acc-13', name: 'Inglês Indiano', language: 'Inglês', count: 0 },
  { id: 'acc-14', name: 'Inglês Irlandês', language: 'Inglês', count: 0 },
  { id: 'acc-15', name: 'Dialeto de Kansai', language: 'Japonês', count: 0 },
  { id: 'acc-16', name: 'Sotaque de Kyushu', language: 'Japonês', count: 0 },
  { id: 'acc-17', name: 'Árabe Magrebino', language: 'Árabe', count: 0 },
  { id: 'acc-18', name: 'Espanhol Mexicano', language: 'Espanhol', count: 0 },
  { id: 'acc-19', name: 'Árabe Padrão Moderno', language: 'Árabe', count: 0 },
  { id: 'acc-20', name: 'Sotaque de Moscou', language: 'Russo', count: 0 },
  {
    id: 'acc-21',
    name: 'Mandarim de Singapura',
    language: 'Mandarim',
    count: 0,
  },
  { id: 'acc-22', name: 'Inglês Sul-africano', language: 'Inglês', count: 0 },
  {
    id: 'acc-23',
    name: 'Sotaque do sul da Rússia',
    language: 'Russo',
    count: 0,
  },
  {
    id: 'acc-24',
    name: 'Mandarim do sudoeste',
    language: 'Mandarim',
    count: 0,
  },
  {
    id: 'acc-25',
    name: 'Sotaque de São Petersburgo',
    language: 'Russo',
    count: 0,
  },
  {
    id: 'acc-26',
    name: 'Mandarim padrão (Putonghua)',
    language: 'Mandarim',
    count: 0,
  },
  {
    id: 'acc-27',
    name: 'Bengali Padrão (Shuddho)',
    language: 'Bengali',
    count: 0,
  },
  {
    id: 'acc-28',
    name: 'Hindi Padrão (Khari Boli)',
    language: 'Hindi',
    count: 0,
  },
  { id: 'acc-29', name: 'Sylheti', language: 'Bengali', count: 0 },
  { id: 'acc-30', name: 'Mandarim de Taiwan', language: 'Mandarim', count: 0 },
  { id: 'acc-31', name: 'Dialeto de Tohoku', language: 'Japonês', count: 0 },
  {
    id: 'acc-32',
    name: 'Russo influenciado pelo ucraniano',
    language: 'Russo',
    count: 0,
  },
];

export default function AccentsConfig() {
  const [accents, setAccents] = useState(INITIAL_ACCENTS);
  const [selectedLanguage, setSelectedLanguage] = useState('Todos os Idiomas');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newAccentName, setNewAccentName] = useState('');
  const [newAccentLang, setNewAccentLang] = useState('Português');
  const [openMenuId, setOpenMenuId] = useState(null);

  const availableLanguages = [
    'Todos os Idiomas',
    ...Array.from(new Set(accents.map((a) => a.language))),
  ];

  const filteredAccents = accents.filter((acc) => {
    const matchesLang =
      selectedLanguage === 'Todos os Idiomas' ||
      acc.language === selectedLanguage;
    const q = searchQuery.trim().toLowerCase();
    const matchesQuery =
      !q ||
      acc.name.toLowerCase().includes(q) ||
      acc.language.toLowerCase().includes(q);
    return matchesLang && matchesQuery;
  });

  const handleAddAccent = (e) => {
    e.preventDefault();
    const trimmedName = newAccentName.trim();
    const trimmedLang = newAccentLang.trim() || 'Português';
    if (!trimmedName) return;

    setAccents((prev) => [
      {
        id: `acc-${Date.now()}`,
        name: trimmedName,
        language: trimmedLang,
        count: 0,
      },
      ...prev,
    ]);
    setNewAccentName('');
    setIsAddOpen(false);
  };

  const handleDeleteAccent = (id) => {
    setAccents((prev) => prev.filter((item) => item.id !== id));
    setOpenMenuId(null);
  };

  return (
    <div className="max-w-[520px] pt-1">
      {/* Topo: Título + Subtítulo e Botão '+ Adicionar Sotaque' à direita */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="text-sm font-bold text-slate-900">
            Sotaques de Idioma
          </h2>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Gerenciar sotaques de idioma para o seu banco de talentos
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddOpen((prev) => !prev)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0f82b3] hover:bg-[#006399] text-white text-[11px] font-medium rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          <span className="w-3.5 h-3.5 rounded-full bg-white/25 flex items-center justify-center">
            <Plus className="w-2.5 h-2.5 text-white stroke-[3]" />
          </span>
          <span>Adicionar Sotaque</span>
        </button>
      </div>

      {/* Formulário Inline para Adicionar Sotaque */}
      {isAddOpen && (
        <form
          onSubmit={handleAddAccent}
          className="mb-4 p-3.5 bg-sky-50/70 border border-sky-200 rounded-xs flex flex-wrap items-end gap-2.5"
        >
          <div className="flex-1 min-w-[160px]">
            <label className="block text-[10px] font-semibold text-slate-600 mb-1">
              Nome do Sotaque
            </label>
            <input
              type="text"
              value={newAccentName}
              onChange={(e) => setNewAccentName(e.target.value)}
              placeholder="Ex: Português Nordestino"
              className="w-full h-7 px-2 bg-white border border-slate-300 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
            />
          </div>
          <div className="w-36">
            <label className="block text-[10px] font-semibold text-slate-600 mb-1">
              Idioma
            </label>
            <input
              type="text"
              value={newAccentLang}
              onChange={(e) => setNewAccentLang(e.target.value)}
              placeholder="Ex: Português"
              className="w-full h-7 px-2 bg-white border border-slate-300 rounded-xs text-xs text-slate-700 focus:outline-none focus:border-[#0077b5]"
            />
          </div>
          <button
            type="submit"
            className="px-3 h-7 bg-[#0f82b3] hover:bg-[#006399] text-white text-[10px] font-semibold uppercase rounded-xs cursor-pointer"
          >
            Salvar
          </button>
        </form>
      )}

      {/* Bloco Central: Seleção de Idioma */}
      <div className="bg-white border border-slate-200 rounded-xs mb-3.5 shadow-2xs">
        <div className="px-4 py-3 border-b border-slate-200/80">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>Seleção de Idioma</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Selecione um idioma para ver e gerenciar seus sotaques
          </p>
        </div>

        <div className="px-4 py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#fcfcfc]">
          <div>
            <label className="block text-[10px] font-semibold text-slate-700 mb-1">
              Idioma
            </label>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="w-full h-7 px-2 bg-white border border-slate-300 rounded-xs text-[11px] text-slate-700 focus:outline-none focus:border-[#0077b5]"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-slate-700 mb-1">
              Buscar Sotaque
            </label>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por nome de sotaque ou idioma..."
              className="w-full h-7 px-2 bg-white border border-slate-300 rounded-xs text-[11px] text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-[#0077b5]"
            />
          </div>
        </div>
      </div>

      {/* Tabela Inferior: Sotaques - Todos os Idiomas */}
      <div className="bg-white border border-slate-200 rounded-xs shadow-2xs p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="text-xs font-bold text-slate-900">
              Sotaques - {selectedLanguage}
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {filteredAccents.length} Sotaques encontrado(s)
            </p>
          </div>

          <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-xs border border-slate-200/80">
            Total de Talentos: 0
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200/90 rounded-xs">
          <table className="w-full text-left border-collapse text-[11px]">
            <thead>
              <tr className="bg-[#0f82b3] text-white">
                <th className="py-2 px-3 font-semibold">Nome do Sotaque</th>
                <th className="py-2 px-3 font-semibold">Idioma</th>
                <th className="py-2 px-3 font-semibold text-center leading-tight">
                  Contagem de
                  <br />
                  Talentos
                </th>
                <th className="py-2 px-3 font-semibold text-center">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80">
              {filteredAccents.map((acc) => (
                <tr
                  key={acc.id}
                  className="hover:bg-slate-50/80 transition-colors"
                >
                  <td className="py-2 px-3 font-semibold text-slate-700">
                    {acc.name}
                  </td>
                  <td className="py-2 px-3 text-slate-500">{acc.language}</td>
                  <td className="py-2 px-3 text-center">
                    <span className="inline-block px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] rounded-xs">
                      {acc.count}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-center relative">
                    <button
                      type="button"
                      onClick={() =>
                        setOpenMenuId((prev) =>
                          prev === acc.id ? null : acc.id
                        )
                      }
                      className="inline-flex items-center justify-center w-5 h-5 bg-slate-200/80 hover:bg-slate-300 text-slate-600 rounded-xs cursor-pointer"
                      title="Ações"
                    >
                      <MoreVertical className="w-3 h-3" />
                    </button>

                    {openMenuId === acc.id && (
                      <div className="absolute right-6 top-7 bg-white border border-slate-200 rounded-xs shadow-md py-1 px-2 z-20">
                        <button
                          type="button"
                          onClick={() => handleDeleteAccent(acc.id)}
                          className="inline-flex items-center gap-1 text-[10px] text-rose-600 hover:underline cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Excluir</span>
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

