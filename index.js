const express = require('express')
const axios = require('axios')

const app = express()

const port = 5555

function onListen () {
  console.log(`Listening on :${port}`)
}

const dataminerApi = 'http://localhost:4000'

function renderHomepage (data) {

  // { rein: {}, david: {}, lisa: {}
  const users = Object.keys(data)
  // ['rein', 'david', 'lisa']

  const paragraphs = users.map(user => {
    return `<p>${user}</p>`
  })


  // const array = ['a', 'b', 'c']
  // const joined = array.join('-----')
  // joined === 'a-----b-----c'
  const joined = paragraphs.join('')
  // '<p>David</p><p>Rein</p><p>Lisa</p>'
  

  const page = `<html>
  <head>
    <title>User Dashboard</title>
  </head>
  <body>
    <h1>Users</h1>
    ${joined}
  </body>
</html>`

  return page
}

app.get(
  '/',
  async (request, response) => {
    try {
      const dataminerResponse = await axios.get(dataminerApi)

      const { data } = dataminerResponse

      console.log('data test:', data)

      const page = renderHomepage(data)

      response.send(page)
    } catch (error) {
      console.log('error.message test:', error.message)
    }
  }
)

app.listen(port, onListen)