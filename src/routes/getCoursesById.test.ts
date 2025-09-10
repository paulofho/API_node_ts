import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import  defineConfig from '../../vitest.config.ts';
import { faker } from '@faker-js/faker';

test ('get course by id', async () => {
   await server.ready();

    const response = await request(server.server)
    .get('/courses/13dea16b-5833-4e12-b36a-97af3c67798b')

    console.log(response.body)

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({
        course: {
            id : expect.any(String),
            title: expect.any(String),
            description: null,
        }
    })

})