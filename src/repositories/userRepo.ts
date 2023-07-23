import { Collection, Db, IndexDescription, MongoServerError, ObjectId } from "mongodb";
import { Value } from '@sinclair/typebox/value';

import { User, UserSchema } from "../models/user";

export class UserRepository {
  static readonly Collection = 'users';
  static readonly Indexes: IndexDescription[] = [
    {
      name: 'unique_user_email',
      unique: true,
      key: {
        email: 1,
      },
    }
  ];

  private readonly col: Collection<User>;
  
  constructor(
    dbCon: Db,
  ) {
    this.col = dbCon.collection<User>(UserRepository.Collection);

    this.col.createIndexes(UserRepository.Indexes);
  }

  async create(user: Partial<User>) : Promise<User> {
    user.createdAt = user.updatedAt = new Date();
    if (!Value.Check(UserSchema, user)) {
      throw Value.Errors(UserSchema, user).First(); // ???
    }

    try {
      const dbUser = Value.Cast(UserSchema, user);

      const res = await this.col.insertOne(dbUser);
      dbUser._id = res.insertedId;

      return dbUser;
    } catch (err) {
      if (err instanceof MongoServerError && err.code === 11000) {
        console.log(err.cause)
        console.log(err.errmsg)
        console.log(err.message)
        console.log(err.errInfo)
        throw new Error('user with name already exists')
      }

      throw err;
    }
  }
  
  async findById(id: ObjectId) : Promise<User> {
    const dbUser = await this.col.findOne({ _id: id });
    if (dbUser == null)
      throw new Error('user not found');
    
    return Value.Cast(UserSchema, dbUser);
  }

  async list({ limit = 100, page = 1, q = undefined } : { limit: number, page: number, q?: string }) : Promise<User[]> {
    const dbUsers = await this.col
      .find(q ? { name: new RegExp(`^${q}`) } : {})
      .skip(page - 1 * limit)
      .limit(limit)
      .toArray();
    
    return dbUsers.map((user) => Value.Cast(UserSchema, user));
  }
}
