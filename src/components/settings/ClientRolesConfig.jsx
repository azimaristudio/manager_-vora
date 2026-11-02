import React from 'react';
import SettingsListConfig from './SettingsListConfig';

export default function ClientRolesConfig() {
  return (
    <SettingsListConfig
      title="Cargos"
      initialItems={[]}
      inputType="checkbox"
      defaultTagText="Padrão"
      showInfoBanner={false}
      selectionLabel="Selection"
      showDefaultAction={true}
      placeholder="Informe"
      saveButtonLabel="SALVAR"
    />
  );
}

