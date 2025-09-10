import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import  defineConfig from '../../vitest.config.ts';
import { faker } from '@faker-js/faker';

test ('create a course', async () => {
   await server.ready();

    const response = await request(server.server)
    .post('/courses')
    .set('Content-type', 'application/json')
    .send({ title: faker.lorem.words(7) })
    console.log(response.body)

    expect(response.statusCode).toEqual(201);
    expect(response.body).toEqual({
        courseId : expect.any(String)
    })

})