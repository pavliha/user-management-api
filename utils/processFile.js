const Drive = use('Drive')

const generateNameFromFile = (file) => {
  const clientName = file.clientName ? file.clientName.substring(0, file.clientName.indexOf('.')) : 'no-name'
  return `${new Date().getTime()}-${clientName}.${file.subtype}`
}

const processFile = request => new Promise(async resolve => {
  request.multipart.file('file', {}, async file => {
    const name = generateNameFromFile(file)
    resolve(name)
    await Drive.put(name, file.stream)
  })
  await request.multipart.process()
})

module.exports = processFile
