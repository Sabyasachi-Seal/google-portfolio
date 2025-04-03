import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next'
import { encrypt, decrypt } from './cryptoUtils'

// Middleware to handle encryption/decryption
export function withEncryption(handler: NextApiHandler) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Decrypt query params if they exist
      if (req.query.encryptedData) {
        const encryptedData = req.query.encryptedData as string
        const decryptedData = decrypt(encryptedData)
        req.query = { ...req.query, ...decryptedData } // Merge decrypted data
        delete req.query.encryptedData // Clean up
      }

      // Decrypt body if it exists
      if (req.body?.encryptedData) {
        const encryptedData = req.body.encryptedData as string
        const decryptedData = decrypt(encryptedData)
        req.body = decryptedData // Replace body
      }

      // Wrap res.json to encrypt the response
      const originalJson = res.json
      res.json = (data: any) => {
        const encryptedResponse = encrypt(data)
        return originalJson.call(res, { data: encryptedResponse })
      }

      // Call the original handler
      return await handler(req, res)
    } catch (error) {
      console.error('Middleware error:', error)
      return res.status(400).json({ error: 'Invalid encrypted data' })
    }
  }
}
