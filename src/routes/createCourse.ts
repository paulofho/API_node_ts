import type { FastifyPluginAsync } from "fastify";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { db } from "../database/client.ts";
import { courses } from "../database/schema.ts";
import { string, z } from "zod";

export const createCourseRoute: FastifyPluginAsyncZod = async (server) => {
  server.post("/courses", {
    schema: {
      tags: ['Courses'],
      summary: 'Create a new course',
      description: 'That route is used to create a new course in database',

      body: z.object({
        title: z.string().min(5, "O título deve ter pelo menos 5 caracteres!"),
      }),
      response: {
        201: z.object({courseId: z.uuid()}).describe('Course created successfully!'),
      }
    },
  }, async (request, reply) => {
    const  courseTitle  = request.body.title

    const result = await db
      .insert(courses)
      .values({ title: courseTitle })
      .returning();
     

    return reply.status(201).send({ courseId: result[0].id });
  });
};
