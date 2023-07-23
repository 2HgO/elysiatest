import { t } from 'elysia';
// import { ObjectId } from 'mongodb';

export const BaseEntityResponse = t.Object({
  _id: t.Optional(t.Any()), // TODO: figure out unsafe type ObjectId
  createdAt: t.Date(),
  updatedAt: t.Date(),
});
