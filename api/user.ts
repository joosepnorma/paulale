import { kv } from '@vercel/kv';

export const config = {
    runtime: 'nodejs',
};

export default async function handler(request, response) {
    // CORS setup
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    response.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (request.method === 'OPTIONS') {
        response.status(200).end();
        return;
    }

    try {
        if (request.method === 'GET') {
            const { name } = request.query;
            if (!name) {
                return response.status(400).json({ error: 'Name is required' });
            }

            const userId = `user:${name.toLowerCase()}`;
            const data = await kv.get(userId);

            return response.status(200).json(data || { completedLevels: [] });
        }

        if (request.method === 'POST') {
            const { name, completedLevels } = request.body;

            if (!name || !Array.isArray(completedLevels)) {
                return response.status(400).json({ error: 'Invalid data' });
            }

            const userId = `user:${name.toLowerCase()}`;
            await kv.set(userId, { completedLevels });

            return response.status(200).json({ success: true });
        }

        return response.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error("KV Error:", error);
        return response.status(500).json({ error: 'Database error' });
    }
}
