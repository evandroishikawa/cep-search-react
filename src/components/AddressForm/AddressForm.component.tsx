import { useAtomValue } from 'jotai';
import { useState } from 'react';
import { FaClipboard, FaClipboardCheck } from 'react-icons/fa';
import { ValidationError } from 'yup';

import { addressAtom } from '@/atoms';

import { Button, Form, Input } from '@/components/common';

import { useToast } from '@/hooks';

import { getErrorMessages } from '@/utils';
import { addressToText } from '@/utils/formatters';

import { schema } from './AddressForm.validations';

import styles from './AddressForm.module.scss';

const AddressForm = () => {
  const [copied, setCopied] = useState(false);
  const address = useAtomValue(addressAtom);
  const { addToast } = useToast();

  const handleSubmit = async (data: IAddress) => {
    try {
      await schema.validate(data, { abortEarly: false });

      const textAddress = addressToText(data);

      navigator.clipboard.writeText(textAddress);

      setCopied(true);

      addToast({
        heading: 'Endereço copiado!',
        message: textAddress,
        type: 'success',
      })
    } catch (error) {
      if (error instanceof ValidationError) {
        const messages = getErrorMessages(error);

        addToast({
          heading: 'Confira os dados inseridos',
          message: messages.join('\n'),
          type: 'error',
        })
      }
    }
  };

  return (
    <Form<IAddress> id="address-form" onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <Input
          name="logradouro"
          label="Logradouro"
          disabled={!address || !!address.logradouro}
          defaultValue={address?.logradouro}
          fixed
          className={styles.item}
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
          disabled={!address || !!address.bairro}
          defaultValue={address?.bairro}
        />

        <Input
          name="localidade"
          label="Cidade"
          fixed
          disabled={!address || !!address.localidade}
          defaultValue={address?.localidade}
        />

        <Input
          name="uf"
          label="Estado"
          fixed
          disabled={!address || !!address.uf}
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
      </div>

      <div className={styles.buttonContainer}>
        <Button.Primary disabled={!address} form="address-form" type="submit">
          Copiar para compartilhar
        </Button.Primary>

        {copied
          ? (
            <>
              <FaClipboardCheck />
              <p>Endereço copiado!</p>
            </>
          )
          : <FaClipboard />
        }
      </div>
    </Form>
  );
};

export default AddressForm;
