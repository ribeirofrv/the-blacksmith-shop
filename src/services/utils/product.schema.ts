import { z } from 'zod';

const productSchema = z.object({
  name: z
    .string({
      required_error: '400|"name" is required',
      invalid_type_error: '422|"name" must be a string',
    })
    .min(3, {
      message: '422|"name" length must be at least 3 characters long',
    }),
  amount: z
    .string({
      required_error: '400|"amount" is required',
      invalid_type_error: '422|"amount" must be a string',
    })
    .min(3, {
      message: '422|"amount" length must be at least 3 characters long',
    }),
});

export default productSchema;
