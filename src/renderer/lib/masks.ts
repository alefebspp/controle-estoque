export const CURRENCYMask = (value: string) => {
  const cleanedValue = value.replace(/[^\d]/g, '');

  const parsedValue = !isNaN(parseFloat(cleanedValue))
    ? parseFloat(cleanedValue) / 100
    : 0;

  return parsedValue.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const applyCurrency = (value: number) => {
  if (value) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
};
