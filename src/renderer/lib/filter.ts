export const replaceCurrencyMask = (value: string) => {
  const cleanValue = value.replace(/[^\d,]/g, '');
  const floatValue = parseFloat(cleanValue.replace(',', '.'));
  return floatValue;
};

export const formatDateToString = (date: Date) => {
  if (!date) {
    return ''; // tratamento para valor nulo
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // adiciona zero à esquerda se necessário
  return `${year}-${month}`;
};

export const parseStringToDate = (str: string) => {
  if (!str) {
    return null; // tratamento para string vazia
  }
  const [year, month] = str.split('-');
  return new Date(Number(year), Number(month) - 1);
};
