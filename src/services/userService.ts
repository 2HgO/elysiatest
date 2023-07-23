import { ObjectId } from "mongodb";

import { User } from "../models";
import { UserRepository } from "../repositories";
import { CreateUserRequest } from "../types/request";

export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
  ){}

  async createUser(user: typeof CreateUserRequest.static) : Promise<User> {
    user.password = Bun.password.hashSync(user.password, 'bcrypt');
    return this.userRepo.create(user);
  }
  async getUser(id: ObjectId) : Promise<User> {
    return this.userRepo.findById(id);
  }
}
