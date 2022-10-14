import { useAtom, useSetAtom } from 'jotai';
import { ChangeEvent, useState } from 'react';

import { addressAtom, cepAtom } from '@/atoms';

import { Input, Loader } from '@/components/common';

import { CEP_REGEX } from '@/constants';

import { useToast } from '@/hooks';

import { viaCEP } from '@/utils';
import { formatCEP } from '@/utils/formatters';

import styles from './CEPInput.module.scss';

type ViaCEPResponse = IAddress | { erro: 'true'; };

const CEPInput = () => {
  const [loading, setLoading] = useState(false);
  const [cep, setCEP] = useAtom(cepAtom);
  const setAddress = useSetAtom(addressAtom);
  const { addToast } = useToast();

  const cepSuccess = !!cep.value && !!cep.value.match(CEP_REGEX) && !cep.error;

  const handleCEPInput = async (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length >= 10) return;

    const cep = formatCEP(value);

    setCEP({ value: cep });

    const isValidCEP = cep.match(CEP_REGEX);

    if (cep.length === 9 && !isValidCEP) {
      setCEP(prevCEP => ({ ...prevCEP, error: true }));

      addToast({
        heading: 'CEP inválido',
        message: 'Confira os dados inseridos',
        type: 'error',
      });
    }

    else if (isValidCEP) {
      setLoading(true);

      await viaCEP
        .get<ViaCEPResponse>(`${cep.replace(/-/g, '')}/json`)
        .then(({ data }) => {
          if ('erro' in data) {
            setCEP(prevCEP => ({ ...prevCEP, error: true }));
            setAddress(undefined);
            addToast({
              heading: 'CEP inválido',
              message: 'Confira os dados inseridos',
              type: 'error',
            });
          } else {
            setAddress({
              bairro: data.bairro,
              cep: data.cep,
              localidade: data.localidade,
              logradouro: data.logradouro,
              uf: data.uf,
              numero: data.numero,
              complemento: '',
            });
          }
        })
        .catch((error) => {
          console.error(error);

          setCEP(prevCEP => ({ ...prevCEP, error: true }));
          addToast({
            heading: 'CEP inválido',
            message: 'Confira os dados inseridos',
            type: 'error',
          });

          setAddress(undefined);
        })
        .finally(() => setLoading(false));
    }
  };

  return (
    <div className={styles.container}>
      <Input
        name="cep"
        label="Digite o seu CEP"
        value={cep.value}
        onChange={handleCEPInput}
        success={cepSuccess}
        error={cep.error}
      />

      {loading && <Loader />}
    </div>
  );
};

export default CEPInput;
