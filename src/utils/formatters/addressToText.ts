export function addressToText(address: IAddress) {
  let text = `${address.logradouro}, ${address.numero}`;

  if (address.complemento) text += `, ${address.complemento}`;

  text += `\n${address.bairro}`;
  text += `\n${address.localidade}, ${address.uf}`;
  text += `\n${address.cep}`;

  return text;
}
