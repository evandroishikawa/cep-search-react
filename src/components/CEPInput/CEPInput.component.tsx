import { useAtom, useSetAtom } from 'jotai';
import { ChangeEvent } from 'react';

import { addressAtom, cepAtom } from '@/atoms';

import { Input } from '@/components/common';

import { CEP_REGEX } from '@/constants';

import { formatCEP } from '@/utils/formatters';
import { viaCEP } from '@/utils';
import { useToast } from '@/hooks';

const CEPInput = () => {
  const [cep, setCEP] = useAtom(cepAtom);
  const setIAddress = useSetAtom(addressAtom);
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
      await viaCEP
        .get<Omit<IAddress, 'numero' | 'complemento'>>(`${cep.replace(/-/g, '')}/json`)
        .then(({ data }) => setIAddress({
          bairro: data.bairro,
          cep: data.cep,
          localidade: data.localidade,
          logradouro: data.logradouro,
          uf: data.uf,
        }))
        .catch((error) => {
          console.error(error);

          setCEP(prevCEP => ({ ...prevCEP, error: true }));

          setIAddress(null);
        })
    }
  };

  return (
    <Input
      name="cep"
      label="Digite o seu CEP"
      value={cep.value}
      onChange={handleCEPInput}
      success={cepSuccess}
      error={cep.error}
    />
  );
};

export default CEPInput;
