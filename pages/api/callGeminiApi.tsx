// pages/api/gemini.js
import { GoogleGenerativeAI } from '@google/generative-ai'
import { chatprompt } from 'constants/userInfo'
import { withEncryption } from '../../lib/apiMiddleware'
import { decrypt } from '../../lib/cryptoUtils'

const stripCodeFences = (text: string) =>
  text
    .trim()
    .replace(/^```(?:json)?/i, '')
    .replace(/```$/i, '')
    .trim()

const extractJson = (text: string) => {
  const cleaned = stripCodeFences(text)
  const start = cleaned.indexOf('{')
  const end = cleaned.lastIndexOf('}')

  if (start === -1 || end === -1 || end <= start) {
    throw new Error('Gemini did not return JSON')
  }

  return JSON.parse(cleaned.slice(start, end + 1))
}

async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { prompt, query, userInfo, mode = 'chat' } = req.body

  const decrpytedUserInfo = decrypt(userInfo)

  try {
    const apiKey = process.env.GEMINI_API_KEY ?? '' // Ensure this is set in .env.local
    if (!apiKey) {
      return res.status(500).json({
        error:
          'Missing GEMINI_API_KEY. Add it to .env.local before using the AI summary feature.',
      })
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const modelCandidates = [
      process.env.GEMINI_MODEL,
      process.env.GEMINI_MODEL_FALLBACK,
      'gemini-2.5-flash',
      'gemini-2.5-flash-lite',
    ].filter((modelName): modelName is string => Boolean(modelName))

    const chatPrompt = `${chatprompt}: ${JSON.stringify(
      decrpytedUserInfo
    )}. Question: ${prompt}`

    const searchPrompt = `You are generating a Google-style portfolio search response.
Return ONLY valid JSON, no markdown, no code fences.
Schema:
{
  "response": string,
  "insights": {
    "mode": "overview" | "compare",
    "query": string,
    "summary": string,
    "confidence": number,
    "sourceChips": string[],
    "relatedQueries": string[],
    "relatedLinks": [{ "label": string, "url": string }],
    "featuredProjectNames": string[],
    "highlightPhrases": string[],
    "compare": {
      "left": string,
      "right": string,
      "leftStrengths": string[],
      "rightStrengths": string[],
      "verdict": string
    } | null
  }
}

Rules:
- Keep the response concise, factual, and specific to the query.
- Use the portfolio context only.
- Add source chips that point to sections like About, Projects, Blogs, Skills, Resume, or Contact.
- If the query compares two things or contains "vs", set mode to "compare" and fill compare.
- Otherwise set mode to "overview".
- Summary should be 2-4 sentences maximum.

Portfolio context question: ${prompt}
Search query: ${query ?? prompt}`

    let lastError: unknown = null

    for (const modelName of modelCandidates) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const requestPrompt = mode === 'chat' ? chatPrompt : searchPrompt
        const result = await model.generateContent(requestPrompt)
        const responseText = result.response.text() // Extract the response

        if (mode === 'chat') {
          return res
            .status(200)
            .json({ response: responseText, model: modelName })
        }

        try {
          const insights = extractJson(responseText)
          return res.status(200).json({
            response: insights.response ?? responseText,
            insights: insights.insights ?? null,
            model: modelName,
          })
        } catch (parseError) {
          return res.status(200).json({
            response: responseText,
            insights: null,
            model: modelName,
          })
        }
      } catch (error) {
        lastError = error
        console.warn(`Gemini model failed: ${modelName}`, error)
      }
    }

    throw lastError ?? new Error('No Gemini models could generate a response')
  } catch (error) {
    console.error('Gemini API error:', error)
    res.status(500).json({
      error:
        'Failed to fetch response from Gemini. Update GEMINI_MODEL in your env file if the current model is deprecated or unavailable.',
    })
  }
}

export default handler
