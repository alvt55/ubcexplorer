import { db } from '@vercel/postgres';
import { feedback } from '@/lib/seed_data'

const client = await db.connect();



async function seed() {

    await client.sql`
    CREATE TABLE IF NOT EXISTS feedback
    (audience VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    rating VARCHAR(255) NOT NULL,
    comments VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL
    );
`;

    const insertedFeedback = await Promise.all(
        feedback.map(r =>
            client.sql`
        INSERT INTO feedback (audience, email, rating, comments, date)
        VALUES (${r.audience}, ${r.email}, ${r.rating}, ${r.comments}, ${r.date}) 
        `
        ));

    return insertedFeedback;
}

export async function GET() {


    try {
        await client.sql`BEGIN`;
        await seed();
        await client.sql`COMMIT`;

        return Response.json({ message: 'Database seeded successfully' });
    } catch (error) {
        await client.sql`ROLLBACK`
        return Response.json({ error }, { status: 500 });
    }






}
