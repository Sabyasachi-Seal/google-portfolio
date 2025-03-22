// pages/api/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai'

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, userInfo } = req.body

  try {
    const apiKey = process.env.GEMINI_API_KEY ?? '' // Ensure this is set in .env.local
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const chatPrompt = `You are an AI assistant representing Sabyasachi Seal. Answer the following question using this info: ${JSON.stringify(
      userInfo
    )}. Question: ${prompt}`

    const result = await model.generateContent(chatPrompt)
    const responseText = result.response.text() // Extract the response

    res.status(200).json({ response: responseText })
  } catch (error) {
    console.error('Gemini API error:', error)
    res.status(500).json({ error: 'Failed to fetch response' })
  }
}
