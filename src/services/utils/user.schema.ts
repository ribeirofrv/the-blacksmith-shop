import { z } from 'zod';

const userSchema = z.object({
  username: z
    .string({
      required_error: '400|"username" is required',
      invalid_type_error: '422|"username" must be a string',
    })
    .min(3, {
      message: '422|"username" length must be at least 3 characters long',
    }),
  classe: z
    .string({
      required_error: '400|"classe" is required',
      invalid_type_error: '422|"classe" must be a string',
    })
    .min(3, {
      message: '422|"classe" length must be at least 3 characters long',
    }),
  level: z
    .number({
      required_error: '400|"level" is required',
      invalid_type_error: '422|"level" must be a number',
    })
    .min(1, { message: '422|"level" must be greater than or equal to 1' }),
  password: z
    .string({
      required_error: '400|"password" is required',
      invalid_type_error: '422|"password" must be a string',
    })
    .min(8, {
      message: '422|"password" length must be at least 8 characters long',
    }),
});

export default userSchema;
