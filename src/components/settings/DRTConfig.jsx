import React from 'react';
import SettingsListConfig from './SettingsListConfig';

const INITIAL_DRT_ITEMS = [
  { id: 'drt-ator', name: 'Ator', isDefault: false },
  { id: 'drt-modelo', name: 'Modelo', isDefault: false },
  { id: 'drt-apresentador', name: 'Apresentador', isDefault: false },
];

export default function DRTConfig() {
  return (
    <SettingsListConfig
      initialItems={INITIAL_DRT_ITEMS}
      inputType="checkbox"
      defaultTagText="Padrão"
      showInfoBanner={false}
      selectionLabel="Selection"
      showDefaultAction={false}
      placeholder="Digite uma nova licença"
      saveButtonLabel="SALVAR LICENÇA"
    />
  );
}

