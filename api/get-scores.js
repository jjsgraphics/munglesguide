export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  try {
    // Get top 10 scores (highest first) with names
    const resp = await fetch(`${url}/zrange/leaderboard/0/9/rev/withscores`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();

    // data.result is [member, score, member, score, ...]
    const entries = [];
    const results = data.result || [];
    for (let i = 0; i < results.length; i += 2) {
      const raw = results[i];
      // stored as "NAME:timestamp" to allow duplicate names
      const name = raw.split(':')[0];
      entries.push({ name, score: parseInt(results[i + 1]) });
    }

    res.status(200).json({ leaderboard: entries });
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
}
