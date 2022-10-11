import { atom } from 'jotai';

export interface CEPAtom {
  value: string;
  error?: string;
}

export const cepAtom = atom<CEPAtom>({
  value: '',
  error: undefined,
});
