export const replaceCurrencyMask = (value: string) => {
  const cleanValue = value.replace(/[^\d,]/g, '');
  const floatValue = parseFloat(cleanValue.replace(',', '.'));
  return floatValue;
};
