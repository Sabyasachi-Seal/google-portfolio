import CryptoJS from 'crypto-js'

// Encryption function
export function encrypt(
  data: any,
  key: string = process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? 'sabyasachiseal.com'
): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString()
}

// Decryption function
export function decrypt(
  encryptedData: string,
  key: string = process.env.NEXT_PUBLIC_ENCRYPTION_KEY ?? 'sabyasachiseal.com'
): any {
  const decrypted = CryptoJS.AES.decrypt(encryptedData, key).toString(
    CryptoJS.enc.Utf8
  )
  if (!decrypted) {
    throw new Error('Decryption failed: Invalid data or key')
  }
  return JSON.parse(decrypted)
}
