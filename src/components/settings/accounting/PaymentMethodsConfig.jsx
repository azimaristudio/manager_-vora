import React from 'react';
import SettingsListConfig from '../SettingsListConfig';

const INITIAL_PAYMENT_METHODS = [
  { id: 'pm-1', name: 'Cartão de Crédito', isDefault: true },
  { id: 'pm-2', name: 'Cheque Bancário', isDefault: true },
  { id: 'pm-3', name: 'Dinheiro', isDefault: true },
  { id: 'pm-4', name: 'Transferência Bancária', isDefault: true },
  { id: 'pm-5', name: 'pix', isDefault: false },
];

export default function PaymentMethodsConfig() {
  return (
    <SettingsListConfig
      title="Métodos de Pagamento"
      initialItems={INITIAL_PAYMENT_METHODS}
      inputType="checkbox"
      defaultTagText="default"
      showInfoBanner={false}
      selectionLabel="Selection"
      showDefaultAction={true}
      placeholder="Digite um novo método de pagamento"
      saveButtonLabel="SALVAR"
    />
  );
}

