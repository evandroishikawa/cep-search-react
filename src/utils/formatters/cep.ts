export function formatCEP(value: string = '') {
  if (value.length <= 6) return value;

  const hasDash = value.includes('-');

  const chars = value.split('');

  if (!hasDash) chars.splice(6 - 1, 0, '-');

  return chars.join('');
}
