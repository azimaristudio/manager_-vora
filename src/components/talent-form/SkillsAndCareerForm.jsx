import React, { useMemo, useState } from 'react';
import {
  CheckSquare,
  X,
  Trophy,
  Compass,
  Music,
  Star,
  Search,
  Briefcase,
  Award,
  Layers,
} from 'lucide-react';
import { SKILLS_BY_GROUP } from '../../data/talentFormOptions';

const SKILL_GROUPS_META = [
  {
    key: 'sport',
    title: 'Esporte',
    placeholder: 'Buscar esporte...',
    icon: Trophy,
  },
  {
    key: 'drive_pilot',
    title: 'Dirige/Pilota',
    placeholder: 'Buscar veículo...',
    icon: Compass,
  },
  {
    key: 'music',
    title: 'Música',
    placeholder: 'Buscar instrumento...',
    icon: Music,
  },
  {
    key: 'other_skills',
    title: 'Outras Habilidades',
    placeholder: 'Buscar habilidade...',
    icon: Star,
  },
];

export default function SkillsAndCareerForm({
  mode = 'skills',
  formData,
  onNestedChange,
}) {
  const { skills, career } = formData;
  const [groupQueries, setGroupQueries] = useState({
    sport: '',
    drive_pilot: '',
    music: '',
    other_skills: '',
  });

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

  const { totalSelected, totalSkills } = useMemo(() => {
    let selected = 0;
    let total = 0;
    SKILL_GROUPS_META.forEach((g) => {
      selected += (skills[g.key] || []).length;
      total += (SKILLS_BY_GROUP[g.key] || []).length;
    });
    return { totalSelected: selected, totalSkills: total };
  }, [skills]);

  if (mode === 'career') {
    return (
      <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
          <div className="w-9 h-9 rounded-lg bg-[#E8AC51]/10 border border-[#E8AC51]/30 flex items-center justify-center text-[#E8AC51] shrink-0">
            <Briefcase className="w-4 h-4" />
          </div>
          <h3 className="font-serif text-xl font-semibold text-[#E8AC51]">
            Carreira
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-4 lg:border-r lg:border-white/10 lg:pr-6 space-y-2.5">
            <Award className="w-6 h-6 text-[#E8AC51]" />
            <h4 className="text-sm font-semibold text-white">
              Trajetória e experiências
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Registre aqui os principais trabalhos, campanhas, desfiles,
              participações em TV/Cinema, prêmios ou links de portfólio que
              marquem a carreira do talento.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">
                Outras Informações Sobre a Carreira
              </label>
              <textarea
                rows={6}
                value={career.careerNotes}
                onChange={(e) =>
                  onNestedChange('career', 'careerNotes', e.target.value)
                }
                placeholder="Descreva trabalhos anteriores, campanhas publicitárias, desfiles, participações em TV/Cinema, prêmios ou links de portfólio..."
                className="w-full px-3.5 py-2.5 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-xl focus:border-[#E8AC51]/60 outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">
                  Agência Mãe (Mother Agency)
                </label>
                <input
                  type="text"
                  value={career.motherAgency}
                  onChange={(e) =>
                    onNestedChange('career', 'motherAgency', e.target.value)
                  }
                  placeholder="ÉVORA MODELS"
                  className="w-full px-3.5 py-2 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">
                  Ano de Início na Carreira
                </label>
                <input
                  type="number"
                  value={career.startYear}
                  onChange={(e) =>
                    onNestedChange('career', 'startYear', e.target.value)
                  }
                  placeholder="Ex: 2021"
                  className="w-full px-3.5 py-2 text-xs bg-[#161617] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1c1c1e] border border-white/10 rounded-xl p-5 sm:p-6 shadow-xs space-y-5">
      {/* Cabeçalho Habilidades */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/10">
        <div className="flex items-start gap-3">
          <Trophy className="w-5 h-5 text-[#E8AC51] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-white">Habilidades</h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Selecione as habilidades e competências do talento, organizadas por
              categoria.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-[#161617] border border-white/10 text-xs self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 text-[#E8AC51] font-semibold tabular-nums">
            <Layers className="w-3.5 h-3.5" />
            {totalSelected}{' '}
            {totalSelected === 1 ? 'selecionada' : 'selecionadas'}
          </span>
          <span className="text-white/15">|</span>
          <span className="text-neutral-400 tabular-nums">
            Total: {totalSkills} habilidades
          </span>
        </div>
      </div>

      {/* 4 Colunas Pesquisáveis */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {SKILL_GROUPS_META.map((group) => {
          const GroupIcon = group.icon;
          const allOptions = SKILLS_BY_GROUP[group.key] || [];
          const selectedList = skills[group.key] || [];
          const allSelected =
            allOptions.length > 0 && selectedList.length === allOptions.length;
          const q = (groupQueries[group.key] || '').trim().toLowerCase();
          const visibleOptions = q
            ? allOptions.filter((item) => item.toLowerCase().includes(q))
            : allOptions;

          return (
            <div
              key={group.key}
              className="bg-[#161617] border border-white/10 rounded-xl p-3.5 flex flex-col gap-3"
            >
              {/* Título + Contador */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <GroupIcon className="w-4 h-4 text-[#E8AC51] shrink-0" />
                  <span className="text-xs font-semibold text-white truncate">
                    {group.title}
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#1c1c1e] border border-[#E8AC51]/35 text-[11px] font-semibold text-[#E8AC51] tabular-nums shrink-0">
                  {selectedList.length}/{allOptions.length}
                </span>
              </div>

              {/* Seletor rápido + Marcar todos */}
              <div className="flex items-center gap-1.5">
                <select
                  value=""
                  onChange={(e) => {
                    if (e.target.value) toggleSkill(group.key, e.target.value);
                  }}
                  className="flex-1 min-w-0 px-2.5 py-1.5 text-xs bg-[#1c1c1e] border border-white/10 rounded-lg text-neutral-300 focus:border-[#E8AC51]/60 outline-none cursor-pointer"
                >
                  <option value="">
                    Selecione ({selectedList.length}/{allOptions.length})
                  </option>
                  {allOptions.map((skill) => (
                    <option key={skill} value={skill}>
                      {selectedList.includes(skill) ? `✓ ${skill}` : skill}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  onClick={() => toggleAllInGroup(group.key)}
                  title="Selecionar ou limpar todos do grupo"
                  className={`p-1.5 rounded-lg border transition-colors cursor-pointer shrink-0 ${
                    allSelected
                      ? 'bg-[#880E1B] text-white border-[#880E1B]'
                      : 'bg-[#1c1c1e] text-[#E8AC51] border-[#E8AC51]/45 hover:bg-[#E8AC51]/10'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Busca interna da coluna */}
              <div className="relative flex items-center">
                <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 pointer-events-none" />
                <input
                  type="text"
                  value={groupQueries[group.key] || ''}
                  onChange={(e) =>
                    setGroupQueries((prev) => ({
                      ...prev,
                      [group.key]: e.target.value,
                    }))
                  }
                  placeholder={group.placeholder}
                  className="w-full pl-8 pr-7 py-1.5 text-xs bg-[#1c1c1e] text-white placeholder:text-neutral-500 border border-white/10 rounded-lg focus:border-[#E8AC51]/60 outline-none"
                />
                {groupQueries[group.key] && (
                  <button
                    type="button"
                    onClick={() =>
                      setGroupQueries((prev) => ({ ...prev, [group.key]: '' }))
                    }
                    className="absolute right-2 text-neutral-500 hover:text-white cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Lista de checkboxes */}
              <div className="bg-[#1c1c1e]/60 border border-white/10 rounded-lg p-2.5 max-h-60 overflow-y-auto space-y-1.5">
                {visibleOptions.length === 0 ? (
                  <p className="text-[11px] text-neutral-500 text-center py-4">
                    Nenhum item encontrado.
                  </p>
                ) : (
                  visibleOptions.map((skill) => {
                    const isChecked = selectedList.includes(skill);
                    return (
                      <label
                        key={skill}
                        className="flex items-center gap-2 text-xs text-neutral-200 hover:text-[#E8AC51] cursor-pointer py-0.5"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSkill(group.key, skill)}
                          className="w-3.5 h-3.5 accent-[#880E1B] rounded-xs cursor-pointer shrink-0"
                        />
                        <span className="truncate">{skill}</span>
                      </label>
                    );
                  })
                )}
              </div>

              {/* Chips selecionados */}
              {selectedList.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-0.5">
                  {selectedList.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#880E1B]/90 text-white text-[10px] font-medium rounded-md"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => toggleSkill(group.key, skill)}
                        className="hover:text-[#E8AC51] cursor-pointer"
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
