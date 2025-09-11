import { db } from "../../../database/client.ts"
import { enrollments, users } from "../../../database/schema.ts"
import { fakerPT_BR as faker } from '@faker-js/faker'
import { courses } from "../../../database/schema.ts"
import { hash } from "argon2"
import { randomUUID } from "node:crypto"

export async function makeUser() {

    const passwordWithoutHash = randomUUID()

    const result = await db.insert(users).values({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: await hash(passwordWithoutHash) 

    }).returning()

    console.log(result)
    
    return {
        user: result[0],
        passwordWithoutHash
    }
}
makeUser()