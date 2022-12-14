/**
 * Address data structure
 * @param {string} cep - Brazilian zip code
 * @param {string} logradouro - street name
 * @param {string} complemento - address' complement
 * @param {string} bairro - neighbourhood
 * @param {string} localidade - city
 * @param {string} uf - state
 */
interface IAddress {
  bairro: string;
  cep: string;
  localidade: string;
  logradouro: string;
  uf: string;
  complemento?: string;
  numero?: string;
}
