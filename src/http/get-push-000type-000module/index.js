const { promisify } = require('util')
const readFile = promisify(require('fs').readFile)
const join = require('path').join

exports.handler = async function http(req) {
  let params = req.pathParameters || {}
  let type = params.type
  let module = params.module
  let response = {
    statusCode: 404,
    headers: {
      'content-type': 'text/html; charset=utf8'
    },
    body: '<h1>File not found</h1>'
  }
  if (type && module) {
    try {
      let body = await readFile(join(__dirname, 'node_modules', '@architect', 'views', type, module), 'utf-8')
      response = {
        headers: {
          'content-type': 'text/javascript; charset=utf-8;',
          'LINK': '</raw/ui/header.js>; rel=preload; as=script',
          'LINK': '</raw/ui/footer.js>; rel=preload; as=script'
        },
        body
      }
    } catch (err) {
      console.error('ERROR', err)
    }
  }

  return response
}

