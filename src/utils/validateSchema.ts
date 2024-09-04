import { ZodRawShape, z } from 'zod';
import { Either, left, right } from './either';

export const validateSchema = <T extends ZodRawShape>(
  schema: z.ZodObject<T>,
  value: z.infer<typeof schema>,
): Either<string[], null> => {
  const { success, error } = schema.safeParse(value);

  if (!success) {
    const messages = error.errors.map((error) => error.message);
    return left(messages);
  }

  return right(null);
};
