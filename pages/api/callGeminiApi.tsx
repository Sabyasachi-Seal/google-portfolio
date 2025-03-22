// pages/api/gemini.js
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, userInfo } = req.body

  try {
    const apiKey = process.env.GEMINI_API_KEY // Store in .env.local
    const response = await fetch(
      'https://api.google.com/gemini/v1/models/gemini-pro:generate',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: `You are an AI assistant representing Sabyasachi Seal. Answer the following question using this info: ${JSON.stringify(
            userInfo
          )}. Question: ${prompt}`,
          maxTokens: 150,
        }),
      }
    )

    const data = await response.json()
    const botResponse = data.choices[0].text // Adjust based on actual Gemini API response structure
    res.status(200).json({ response: botResponse })
  } catch (error) {
    console.error('Gemini API error:', error)
    res.status(500).json({ error: 'Failed to fetch response' })
  }
}
