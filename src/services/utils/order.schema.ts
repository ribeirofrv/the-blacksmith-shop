import { z } from 'zod';

const orderSchema = z
  .array(
    z.number({
      required_error: '400|"productsIds" is required',
      invalid_type_error: '422|"productsIds" must be a number',
    }),
    { invalid_type_error: '422|"productsIds" must be an array' },
  )
  .nonempty({ message: '422|"productsIds" must include only numbers' });

export default orderSchema;
