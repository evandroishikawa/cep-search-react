import { useAtom } from 'jotai';
import { ChangeEvent } from 'react';

import { cepAtom } from '@/atoms';

import { Input } from '@/components/common';

const CEPInput = () => {
  const [cep, setCEP] = useAtom(cepAtom);

  const handleCEPInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.length >= 10) return;

    if (value.length <= 6) {
      setCEP({ value });

      return;
    }

    let cep = '';

    const hasDash = value.includes('-');

    const chars = value.split('');

    if (!hasDash) chars.splice(6 - 1, 0, '-');

    cep = chars.join('');

    setCEP({ value: cep });
  };

  return (
    <Input name="cep" value={cep.value} onChange={handleCEPInput} />
  );
};

export default CEPInput;
