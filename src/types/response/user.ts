import { t } from 'elysia';

import { BaseEntityResponse } from './base';

export const UserResponse = t.Composite([
  BaseEntityResponse,
  t.Object({
    name: t.String(),
    email: t.String({ format: 'email' }),
  })
], { additionalProperties: false });
