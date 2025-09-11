import { test, expect } from 'vitest';
import request from 'supertest';
import { server } from '../app.ts';
import  defineConfig from '../../vitest.config.ts';
import { faker } from '@faker-js/faker';
import { makeUser } from './testes/factories/makeUsers.ts';

test ('make login', async () => {
   await server.ready();

   const { user, passwordWithoutHash } = await makeUser();

    const response = await request(server.server)
    .post('/sessions')
    .set('Content-type', 'application/json')
    .send({ 
        email: user.email, 
        password: passwordWithoutHash 
    })

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
        message: 'ok'
    })

})