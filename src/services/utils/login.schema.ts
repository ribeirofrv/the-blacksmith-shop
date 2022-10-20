import { z } from 'zod';

const loginSchema = z.object({
  username: z.string({ required_error: '400|"username" is required' }).min(1),
  password: z.string({ required_error: '400|"password" is required' }).min(8),
});

export default loginSchema;
