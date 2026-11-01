import React from 'react';
import { CheckSquare, X } from 'lucide-react';
import { SKILLS_BY_GROUP } from '../../data/talentFormOptions';

const SKILL_GROUPS_META = [
  { key: 'sport', title: 'Esporte' },
  { key: 'drive_pilot', title: 'Dirige/Pilota' },
  { key: 'music', title: 'Música' },
  { key: 'other_skills', title: 'Outras Habilidades' },
];

export default function SkillsAndCareerForm({
  mode = 'skills', // 'skills' | 'career'
  formData,
  onNestedChange,
}) {
  const { skills, career } = formData;

  const toggleSkill = (groupKey, skillName) => {
    const currentGroup = skills[groupKey] || [];
    const exists = currentGroup.includes(skillName);
    const updated = exists
      ? currentGroup.filter((s) => s !== skillName)
      : [...currentGroup, skillName];
    onNestedChange('skills', groupKey, updated);
  };

  const toggleAllInGroup = (groupKey) => {
    const allOptions = SKILLS_BY_GROUP[groupKey] || [];
    const currentGroup = skills[groupKey] || [];
    if (currentGroup.length === allOptions.length) {
      onNestedChange('skills', groupKey, []);
    } else {
      onNestedChange('skills', groupKey, [...allOptions]);
    }
  };

  if (mode === 'career') {
    return (
      <div className="bg-white border border-slate-200 rounded-md p-6 shadow-2xs">
        <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-5 border-b border-slate-200">
          Carreira
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-12 items-start gap-4 max-w-3xl">
          <label className="md:col-span-4 text-xs font-medium text-slate-600 pt-2">
            Outras Informações Sobre A Carreira
          </label>
          <div className="md:col-span-8 space-y-3">
            <textarea
              rows={6}
              value={career.careerNotes}
              onChange={(e) =>
                onNestedChange('career', 'careerNotes', e.target.value)
              }
              placeholder="Descreva trabalhos anteriores, campanhas publicitárias, desfiles, participações em TV/Cinema, prêmios ou links de portfólio..."
              className="w-full px-3.5 py-2.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Agência Mãe (Mother Agency)
                </label>
                <input
                  type="text"
                  value={career.motherAgency}
                  onChange={(e) =>
                    onNestedChange('career', 'motherAgency', e.target.value)
                  }
                  placeholder="Ex: Évora Models"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-slate-500 mb-1">
                  Ano de Início na Carreira
                </label>
                <input
                  type="number"
                  value={career.startYear}
                  onChange={(e) =>
                    onNestedChange('career', 'startYear', e.target.value)
                  }
                  placeholder="Ex: 2021"
                  className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xs focus:border-[#0077b5] outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-md p-6 shadow-2xs">
      <h3 className="text-sm font-bold text-slate-800 pb-2.5 mb-5 border-b border-slate-200">
        Habilidades
      </h3>

      {/* 4 Colunas de Habilidades idênticas à Imagem 05 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILL_GROUPS_META.map((group) => {
          const options = SKILLS_BY_GROUP[group.key] || [];
          const selectedList = skills[group.key] || [];
          const allSelected =
            options.length > 0 && selectedList.length === options.length;

          return (
            <div key={group.key} className="space-y-3">
              <label className="block text-xs font-bold text-slate-700">
                {group.title}
              </label>

              {/* Select + Botão Selecionar Tudo do Grupo (como na imagem 05) */}
              <div className="flex items-center gap-1.5">
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) {
                      toggleSkill(group.key, e.target.value);
                    }
                  }}
                  className="flex-1 px-2.5 py-1.5 text-xs bg-white border border-slate-300 rounded-xs text-slate-600 focus:border-[#0077b5] outline-none"
                >
                  <option value="">
                    Selecione ({selectedList.length}/{options.length})
                  </option>
                  {options.map((skill) => (
                    <option key={skill} value={skill}>
                      {selectedList.includes(skill) ? `✓ ${skill}` : skill}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => toggleAllInGroup(group.key)}
                  title="Selecionar tudo do grupo"
                  className={`p-1.5 border rounded-xs transition-colors cursor-pointer ${
                    allSelected
                      ? 'bg-[#0077b5] text-white border-[#0077b5]'
                      : 'bg-white text-[#0077b5] border-[#0077b5] hover:bg-sky-50'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Lista de Checkboxes / Chips das Habilidades do Grupo */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-xs p-2.5 max-h-56 overflow-y-auto space-y-1.5">
                {options.map((skill) => {
                  const isChecked = selectedList.includes(skill);
                  return (
                    <label
                      key={skill}
                      className="flex items-center gap-2 text-xs text-slate-700 hover:text-[#0077b5] cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => toggleSkill(group.key, skill)}
                        className="w-3.5 h-3.5 accent-[#0077b5] rounded-xs cursor-pointer"
                      />
                      <span className="truncate">{skill}</span>
                    </label>
                  );
                })}
              </div>

              {/* Tags Selecionadas */}
              {selectedList.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1">
                  {selectedList.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#0077b5] text-white text-[10px] font-medium rounded-xs"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => toggleSkill(group.key, skill)}
                        className="hover:text-sky-200 cursor-pointer"
                      >
                        <X className="w-2.5 h-2.5" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

