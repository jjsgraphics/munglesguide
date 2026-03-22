export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  const { name, score } = req.body || {};

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ error: 'Name is required' });
  }
  if (typeof score !== 'number' || score < 0 || score > 99999) {
    return res.status(400).json({ error: 'Invalid score' });
  }

  const cleanName = name.trim().toUpperCase().substring(0, 12).replace(/[^A-Z0-9 _\-]/g, '');
  // Use name:timestamp as member key so duplicate names can have separate entries
  const member = `${cleanName}:${Date.now()}`;

  try {
    await fetch(`${url}/zadd/leaderboard/${score}/${encodeURIComponent(member)}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Trim to top 50 entries to keep it clean
    await fetch(`${url}/zremrangebyrank/leaderboard/0/-51`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json({ success: true, name: cleanName, score });
  } catch (e) {
    res.status(500).json({ error: 'Failed to submit score' });
  }
}
