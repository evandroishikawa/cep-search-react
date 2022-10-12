import axios from 'axios';

export const viaCEP = axios.create({
  baseURL: 'https://viacep.com.br/ws'
});
