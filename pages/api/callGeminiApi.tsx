// pages/api/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai'
import { chatprompt } from 'constants/userInfo'
import { withEncryption } from '../../lib/apiMiddleware'
import { decrypt } from '../../lib/cryptoUtils'
async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, userInfo } = req.body

  const decrpytedUserInfo = decrypt(userInfo)

  try {
    const apiKey = process.env.GEMINI_API_KEY ?? '' // Ensure this is set in .env.local
    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

    const chatPrompt = `${chatprompt}: ${JSON.stringify(
      decrpytedUserInfo
    )}. Question: ${prompt}`

    const result = await model.generateContent(chatPrompt)
    const responseText = result.response.text() // Extract the response

    res.status(200).json({ response: responseText })
  } catch (error) {
    console.error('Gemini API error:', error)
    res.status(500).json({ error: 'Failed to fetch response' })
  }
}

export default handler
