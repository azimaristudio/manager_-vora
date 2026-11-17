import React, { useState } from 'react';

const INITIAL_SKILL_GROUPS = {
  'Dirige/Pilota': [
    'Aeromodelo',
    'Asa Delta',
    'Avião',
    'Barco',
    'Bicicleta',
    'Bike (Freestyle)',
    'Caminhão',
    'Carro (Automático)',
    'Carro (Manual)',
    'Helicóptero',
    'Jet Ski',
    'Moto',
  ],
  Esporte: [
    'Aikido',
    'Alpinismo',
    'Arco e Flecha',
    'ArtDo',
    'Atleta Paraolímpico',
    'Atletismo',
    'Automobilismo',
    'Basquete',
    'Boxe',
    'Capoeira',
    'Corrida',
    'Futebol',
  ],
  Música: [
    'Acordeon',
    'Afoxé',
    'Agogô',
    'Alaúde',
    'Atabaque',
    'Baixo Acústico',
    'Baixo Elétrico',
    'Bateria',
    'Canto',
    'Guitarra',
    'Piano',
    'Violão',
  ],
  Outro: [
    'Apresentador(a) Reality Show',
    'Apresentador(a) Telejornal',
    'Arte Grafite',
    'Ator/Atriz Comediante',
    'Bartender',
    'Cantor(a) Heavy Metal',
    'Cantor(a) Lírico(a)',
    'Circo / Acrobacia',
    'Dança Contemporânea',
    'Dublagem',
  ],
};

const GROUP_KEYS = ['Dirige/Pilota', 'Esporte', 'Música', 'Outro'];

export default function SkillsConfig() {
  const [skillGroups, setSkillGroups] = useState(INITIAL_SKILL_GROUPS);
  const [newSkillText, setNewSkillText] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('Dirige/Pilota');
  const [checkedSkills, setCheckedSkills] = useState({});

  const handleToggleCheck = (group, skill) => {
    const key = `${group}::${skill}`;
    setCheckedSkills((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const trimmed = newSkillText.trim();
    if (!trimmed) return;

    setSkillGroups((prev) => ({
      ...prev,
      [selectedGroup]: [trimmed, ...(prev[selectedGroup] || [])],
    }));
    setNewSkillText('');
  };

  return (
    <div className="max-w-[740px] pt-2">
      {/* Barra Superior de Inserção (Alinhada à direita conforme Imagem 81) */}
      <form
        onSubmit={handleAddSkill}
        className="flex flex-wrap items-center justify-end gap-1.5 pb-4 mb-5 border-b border-white/10"
      >
        <input
          type="text"
          value={newSkillText}
          onChange={(e) => setNewSkillText(e.target.value)}
          placeholder="Declare aqui uma habilidade"
          className="w-44 h-8 px-2.5 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-white placeholder:text-neutral-400 focus:outline-none focus:border-[#880E1B]"
        />

        <select
          value={selectedGroup}
          onChange={(e) => setSelectedGroup(e.target.value)}
          className="w-32 h-8 px-2 bg-[#1c1c1e] border border-white/10 rounded-xs text-xs text-neutral-400 focus:outline-none focus:border-[#880E1B]"
        >
          {GROUP_KEYS.map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="px-3.5 h-8 bg-[#E8AC51] hover:bg-[#d99b3f] text-white text-[10px] font-semibold uppercase tracking-wide rounded-xs shadow-2xs transition-colors cursor-pointer"
        >
          ADICIONAR
        </button>
      </form>

      {/* Grid 2x2 com os 4 Painéis de Cabeçalho Azul Claro */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {GROUP_KEYS.map((groupTitle) => {
          const skills = skillGroups[groupTitle] || [];

          return (
            <div
              key={groupTitle}
              className="bg-[#1c1c1e] border border-white/10 rounded-xs shadow-xs overflow-hidden"
            >
              {/* Cabeçalho Azul Claro */}
              <div className="bg-[#E8AC51] text-white px-3.5 py-2 text-xs font-medium">
                {groupTitle}
              </div>

              {/* Corpo com Lista de Checkboxes e Barra de Rolagem Simulada */}
              <div className="p-3.5 relative">
                <div className="max-h-52 overflow-y-auto pr-3 space-y-2.5">
                  {skills.map((skill) => {
                    const key = `${groupTitle}::${skill}`;
                    const isChecked = Boolean(checkedSkills[key]);

                    return (
                      <label
                        key={skill}
                        className="flex items-center gap-2 text-xs text-neutral-400 cursor-pointer select-none"
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleCheck(groupTitle, skill)}
                          className="w-3.5 h-3.5 rounded-xs border-white/10 text-[#E8AC51] focus:ring-[#880E1B] cursor-pointer"
                        />
                        <span>{skill}</span>
                      </label>
                    );
                  })}
                </div>

                {/* Barra horizontal decorativa na base do card igual à Imagem 81 */}
                <div className="mt-3 mx-1 h-1 bg-[#1c1c1e] rounded-full" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

