import * as yup from 'yup';

export const schema = yup.object().shape({
  logradouro: yup.string().required('Logradouro não informado'),
  numero: yup.string().required('Número não informado'),
  complemento: yup.string(),
  bairro: yup.string().required('Bairro não informado'),
  localidade: yup.string().required('Cidade não informado'),
  uf: yup.string().required('Estado não informado'),
});
