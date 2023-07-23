import { t } from 'elysia';

export const CreateUserRequest = t.Object({
  name: t.String(),
  email: t.String({ format: 'email' }),
  password: t.String(),
});
