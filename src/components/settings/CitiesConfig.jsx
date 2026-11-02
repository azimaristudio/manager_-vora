import React from 'react';
import SettingsListConfig from './SettingsListConfig';

const INITIAL_CITIES = [
  { id: 'city-sp', name: 'São Paulo', isDefault: true },
  { id: 'city-rj', name: 'Rio de Janeiro', isDefault: false },
  { id: 'city-rec', name: 'Recife', isDefault: true },
];

export default function CitiesConfig() {
  return (
    <SettingsListConfig
      initialItems={INITIAL_CITIES}
      inputType="checkbox"
      defaultTagText="Padrão"
      showInfoBanner={false}
      selectionLabel="Seleção"
      showDefaultAction={true}
      placeholder="Declare uma nova cidade"
      saveButtonLabel="SALVAR"
    />
  );
}
