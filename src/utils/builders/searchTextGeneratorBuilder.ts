export const searchTextGeneratorBuilder = (
  misspellings: string[],
  text: string
): (() => Generator<[string | null, number]>) => {
  return function* () {
    for (const misspelling of misspellings) {
      let current = ''
      for (let i = 0; i < misspelling.length; i++) {
        current += misspelling[i]
        yield [current, 20]
      }
      yield [null, 900]
      for (let i = 0; i < misspelling.length; i++) {
        current = current.slice(0, -1)
        yield [current, 10]
      }
      yield [null, 400]
    }
    for (let i = 0; i < text.length; i++) {
      let current = ''
      for (let j = 0; j <= i; j++) {
        current += text[j]
      }
      yield [current, 30]
    }
  }
}
