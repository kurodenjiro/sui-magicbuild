import type { NextApiRequest, NextApiResponse } from 'next';
import { MongoClient } from "mongodb";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method = 'POST') {
        try {
            const data = await req.body;
            let client = new MongoClient(process.env.MONGO_DB_CLIENT as string)
            let clientPromsie = await client.connect();
            let db = clientPromsie.db()
            let col = await db.collection("action")
            const updata = await col.insertOne(data)
            res.send({ result: updata });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Error fetch data' });
        }
    }else{
        res.status(400).send({ error: 'Method no allowed' });
    }

}