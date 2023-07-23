import { TypeSystem } from '@sinclair/typebox/system';
import { Type } from '@sinclair/typebox';
import { ObjectId } from 'mongodb';

export const OIdSchema = TypeSystem.Type<ObjectId>('ObjectId', (_, value) => {
  return ObjectId.isValid(value as any)
});

export const SchemaBase = Type.Object({
  _id: Type.Optional(OIdSchema({ default: undefined })),
  createdAt: Type.Date(),
  updatedAt: Type.Date(),
});
