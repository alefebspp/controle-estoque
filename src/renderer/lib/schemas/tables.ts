import * as yup from 'yup';

export const productsTableSchema = yup.object().shape({
  description: yup.string().optional(),
  filter: yup.string().optional(),
  order: yup.string().optional(),
});
