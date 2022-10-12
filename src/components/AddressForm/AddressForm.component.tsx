import { useAtomValue } from 'jotai';

import { addressAtom } from '@/atoms';

import { Form, Input } from '@/components/common';

import styles from './AddressForm.module.scss';

const AddressForm = () => {
  const address = useAtomValue(addressAtom);

  const handleSubmit = (data: Address) => {
    console.log(data);
  };

  if (!address) return <></>;

  return (
    <Form<Address> id="address-form" onSubmit={handleSubmit} className={styles.form}>
      <Input name="logradouro" defaultValue={address.logradouro} />

      <Input name="bairro" defaultValue={address.bairro} />

      <Input name="localidade" defaultValue={address.localidade} />

      <Input name="uf" defaultValue={address.uf} />

      <Input name="numero" defaultValue={address.numero} />

      <Input name="complemento" defaultValue={address.complemento} />

      <button form="address-form">Copiar</button>
    </Form>
  );
};

export default AddressForm;
