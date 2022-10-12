import { useAtomValue } from 'jotai';

import { addressAtom } from '@/atoms';

import { Form, Input } from '@/components/common';

import styles from './AddressForm.module.scss';
import { addressToText } from '@/utils/formatters';

const AddressForm = () => {
  const address = useAtomValue(addressAtom);

  const handleSubmit = (data: IAddress) => {
    const textAddress = addressToText(data);

    navigator.clipboard.writeText(textAddress);
  };

  return (
    <Form<IAddress> id="address-form" onSubmit={handleSubmit} className={styles.form}>
      <Input
        name="logradouro"
        label="Logradouro"
        disabled={!address}
        defaultValue={address?.logradouro}
        fixed
      />

      <Input
        name="numero"
        label="Número"
        fixed
        disabled={!address}
        defaultValue={address?.numero}
      />

      <Input
        name="complemento"
        label="Complemento"
        fixed
        disabled={!address}
        defaultValue={address?.complemento}
      />

      <Input
        name="bairro"
        label="Bairro"
        fixed
        disabled={!address}
        defaultValue={address?.bairro}
      />

      <Input
        name="localidade"
        label="Cidade"
        fixed
        disabled={!address}
        defaultValue={address?.localidade}
      />

      <Input
        name="uf"
        label="Estado"
        fixed
        disabled={!address}
        defaultValue={address?.uf}
      />

      <Input
        name="cep"
        label="CEP"
        fixed
        hidden
        disabled
        defaultValue={address?.cep}
      />

      <button form="address-form">Copiar para compartilhar</button>
    </Form>
  );
};

export default AddressForm;
