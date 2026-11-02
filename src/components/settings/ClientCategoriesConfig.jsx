import React from 'react';
import SettingsListConfig from './SettingsListConfig';

const INITIAL_CLIENT_CATEGORIES = [
  { id: 'cc-1', name: 'Agencia', isDefault: true },
  { id: 'cc-2', name: 'Agência Casting', isDefault: true },
  { id: 'cc-3', name: 'Agência Mãe', isDefault: true },
  { id: 'cc-4', name: 'Fotógrafo', isDefault: true },
  { id: 'cc-5', name: 'Outro', isDefault: true },
  { id: 'cc-6', name: 'Produtora', isDefault: true },
];

export default function ClientCategoriesConfig() {
  return (
    <SettingsListConfig
      title="Categories"
      initialItems={INITIAL_CLIENT_CATEGORIES}
      inputType="checkbox"
      defaultTagText="Padrão"
      showInfoBanner={false}
      selectionLabel="Seleção"
      showDefaultAction={true}
      placeholder="Inserir uma nova categoria"
      saveButtonLabel="SALVAR CATEGORIA"
    />
  );
}

