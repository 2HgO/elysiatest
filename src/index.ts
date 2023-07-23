import { Elysia } from "elysia";

import { ENV } from './config';
import dbCon from './db';
import { UserRepository } from "./repositories";
import { UserService } from "./services/userService";
import { UserRouter } from './handlers';

const UserRepo: UserRepository = new UserRepository(dbCon);
const UserSvc: UserService = new UserService(UserRepo);

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .group('/users', UserRouter(UserSvc))
  .listen(ENV.APP_PORT);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
