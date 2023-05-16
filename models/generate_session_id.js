function generateSessionId() {
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
  const upperCaseLetters = lowerCaseLetters.toUpperCase()
  const number = '1234567890'
  const box = [...lowerCaseLetters, ...upperCaseLetters, ...number]

  let sessionId = ''

  for (let i = 0; i < 9; i++) {
    sessionId += box[Math.floor(Math.random() * box.length)]
  }
  return sessionId
}

module.exports = generateSessionId