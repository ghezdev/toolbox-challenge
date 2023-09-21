export const prettierTableFiles = tableFile => {
  const [head, ...dataFile] = tableFile.split('\n')
  const fileNameOfDataFile = dataFile[0].split(',')[0]
  return {
    file: fileNameOfDataFile,
    lines: dataFile.map(csvToJsonFile)
  }
}

export const hasDataFiles = file => file.includes('\n')

const csvToJsonFile = value => {
  const [file, text, number, hex] = value.split(',')
  return {
    text,
    number: Number(number),
    hex
  }
}
