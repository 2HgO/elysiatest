import { Type, Static } from '@sinclair/typebox';
// import { Value } from '@sinclair/typebox/value';

import { SchemaBase } from './base';

export const UserSchema = Type.Composite([SchemaBase, Type.Object({
  name: Type.String(),
  email: Type.String(),
  password: Type.String(),
})], { additionalProperties: false });

export type User = Static<typeof UserSchema>;

// console.log(...Value.Errors(UserSchema, {
//   name: "baba",
//   password: "$2b$10$wvte1coKvFe0Wd4UojNmQOUeotu2TA59OMa.CEQo1LOGPMlmfy9fC",
//   email: "oghogho@inflow.finance",
//   updatedAt: new Date('2023-07-23T13:14:59.310Z'),
//   createdAt: new Date('2023-07-23T13:14:59.310Z')
// }))
