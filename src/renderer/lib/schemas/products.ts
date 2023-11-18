import * as yup from 'yup';

export const updateProductSchema = yup.object().shape({
  description: yup.string().required('Campo obrigatório'),
  sell_value: yup.mixed().required('Campo obrigatório'),
  stock_quantity: yup
    .number()
    .typeError('O valor deve ser maior que zero')
    .min(1, 'O valor deve ser maior que zero')
    .required('Campo obrigatório'),
});

export const createProductSchema = yup.object().shape({
  description: yup.string().required('Campo obrigatório'),
  sell_value: yup.string().required('Campo obrigatório'),
  stock_quantity: yup
    .number()
    .typeError('O valor deve ser maior que zero')
    .min(1, 'O valor deve ser maior que zero')
    .required('Campo obrigatório'),
});
