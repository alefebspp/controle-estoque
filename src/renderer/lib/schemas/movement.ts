import * as yup from 'yup';

export const createMovementSchema = yup.object().shape({
  product_id: yup.string().required('Campo obrigatório'),
  type: yup.string().required('Campo obrigatório'),
  quantity: yup
    .number()
    .typeError('O valor deve ser maior que zero')
    .min(1, 'O valor deve ser maior que zero')
    .required('Campo obrigatório'),
  date: yup.string().required('Data obrigatória'),
});
