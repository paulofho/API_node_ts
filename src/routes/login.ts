

import type { FastifyPluginAsync } from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { string, z } from "zod";
import {eq} from 'drizzle-orm';
import { users } from "../database/schema.ts";
import { verify } from "argon2";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/sessions", {
    schema: {
      tags: ['auth'],
      summary: 'login',
      description: 'That route is used to login a user in the system',

      body: z.object({
        email: z.string().email(),
        password: z.string(),
      }),

    },
  }, async (request, reply) => {
    const  { email, password }  = request.body

    const result = await db.select()
    .from(users)
    .where(eq(users.email, email))

    if (result.length === 0) {
        return reply.status(400).send({message: 'Invalid credentials'});
    }

    const user = result[0];

    const doesPasswordMatch = await verify(user.password, password);

    if (!doesPasswordMatch) {
        return reply.status(400).send({message: 'Invalid credentials'});
    }

    return reply.status(200).send({ message: 'ok' });

  });
};