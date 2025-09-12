import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import  defineConfig from '../../vitest.config.ts';
import { faker } from '@faker-js/faker';

test ('Get all courses', async () => {
   await server.ready();

    const response = await request(server.server)
    .get('/courses')
 
    console.log('paulo aqui :)')
    console.log(response.body.courses)

    // expect(response.body).toEqual({
    //     courses: expect(Array)
    // })


})