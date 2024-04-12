const http = require('http')
const qs = require('querystring')
const calculator = require('./calculator') 

const server = http.createServer(function(request, response) {
  console.dir(request.param)

  if (request.method == 'POST') {
    console.log('POST')
    var body = ''
    request.on('data', function(data) {
      body += data
    })

    request.on('end', function() {
      const post = qs.parse(body)
      const numbers = post.numbers
      const result = calculator.add(numbers)
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.end('Result: ' + result)
    })
  } else {
    var html = `
            <html>
                <body>
                    <form method="post" action="https://happy-sand-0c49e1103.5.azurestaticapps.net/">Numbers: 
                        <input type="text" name="numbers" />
                        <input type="submit" value="Add" />
                    </form>
                </body>
            </html>`
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.end(html)
  }
})

const port = 0
const host = 'https://happy-sand-0c49e1103.5.azurestaticapps.net/'
server.listen(port, host)
console.log(`Listening at http://${host}:${port}`)