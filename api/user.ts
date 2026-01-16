import Redis from 'ioredis';

export const config = {
    runtime: 'nodejs',
};

// Initialize Redis client outside of handler to reuse connection if possible
let client;

const getClient = () => {
    if (!client) {
        const connectionString = process.env.KV_REDIS_URL;
        if (!connectionString) {
            throw new Error("Missing KV_REDIS_URL environment variable");
        }
        client = new Redis(connectionString);
    }
    return client;
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
        const redis = getClient();

        if (request.method === 'GET') {
            const { name } = request.query;
            if (!name) {
                return response.status(400).json({ error: 'Name is required' });
            }

            const userId = `user:${name.toLowerCase()}`;
            const dataStr = await redis.get(userId);
            const data = dataStr ? JSON.parse(dataStr) : null;

            return response.status(200).json(data || { completedLevels: [] });
        }

        if (request.method === 'POST') {
            const { name, completedLevels } = request.body;

            if (!name || !Array.isArray(completedLevels)) {
                return response.status(400).json({ error: 'Invalid data' });
            }

            const userId = `user:${name.toLowerCase()}`;
            await redis.set(userId, JSON.stringify({ completedLevels }));

            return response.status(200).json({ success: true });
        }

        return response.status(405).json({ error: 'Method not allowed' });

    } catch (error) {
        console.error("Redis Error:", error);
        return response.status(500).json({ error: 'Database error', details: error.message });
    }
}
