// import { db } from '@vercel/postgres';
// import { responses } from '@/lib/seed_data'

// const client = await db.connect();



// async function seed() {

    // await client.sql`
    // CREATE TABLE IF DOES NOT EXIST responses
    // (audience VARCHAR(255) NOT NULL
    // rating VARCHAR(255) NOT NULL
    // comments VARCHAR(255) NOT NULL
    // date VARCHAR(255) NOT NULL
    // )`;

    // const insertedResponses = await Promise.all(
    //     responses.map(r => 
    //         client.sql`
    //     INSERT INTO responses (audience, rating, comments)
    //     VALUES (${r.audience}, ${r.rating}, ${r.comments} ${r.date}) 
    //     `
    //     ));

    // return insertedResponses;
// }

export async function GET() {


    // try {
    //     await seed();

    //     return Response.json({ message: 'Database seeded successfully' });
    // } catch (error) {
    //     await client.sql`ROLLBACK`
    //     return Response.json({ error }, { status: 500 });
    // }






}
