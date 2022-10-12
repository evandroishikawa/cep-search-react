import { atom } from 'jotai';

export interface CEPAtom {
  value: string;
  error?: boolean;
}

export const cepAtom = atom<CEPAtom>({
  value: '',
  error: false,
});
