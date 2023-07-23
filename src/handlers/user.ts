import Elysia from "elysia";

import { CreateUserRequest } from "../types/request";
import { UserService } from "../services/userService";
import { UserResponse } from "../types/response";
import { Value } from "@sinclair/typebox/value";

export default (svc: UserService) => (app: Elysia) => app
  // create new user
  .post(
    // path
    '',
    // handler
    async (c) => {
      // ? TODO: figure out injecting scv dependency through plugin
      const user = await svc.createUser(c.body);

      c.set.status = 201;
      delete (user as any).password;
      return user;
    },
    // req/res schema
    {
      body: CreateUserRequest,
      response: { 201: UserResponse },
    }
  );
