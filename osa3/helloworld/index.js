console.log('moi maailma - logitus')

const http = require('http')

let notes = [
    {
        id: 1,
        content: "HTML is easy",
        date: "2020-01-10T17:30:31.098Z",
        important: true
      },
      {
        id: 2,
        content: "Browser can execute only Javascript",
        date: "2020-01-10T18:39:34.091Z",
        important: false
      },
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol",
        date: "2020-01-10T19:20:14.298Z",
        important: true
      }
]

function handleHttpRequest(request, response) {
        // response.writeHead(200, { 'Content-Type': 'text/plain'})
        response.writeHead(200, { 'Content-Type': 'application/json'})
        // response.write('moi---')
        // response.end('mualima')
        response.end(JSON.stringify(notes))
}

const server = http.createServer(handleHttpRequest);

const PORT = 3001 
server.listen(PORT)
console.log(`Palvelin käynnissä portissa ${PORT}`)

