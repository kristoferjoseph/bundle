const rollup = require('rollup')
const join = require('path').join

exports.handler = async function http(req) {
  let params = req.pathParameters || {}
  let type = params.type
  let parts = params.module && params.module.split('-')
  let module = parts[1]
  let response = {
    statusCode: 404,
    headers: {
      'content-type': 'text/html; charset=utf8'
    },
    body: '<h1>File not found</h1>'
  }
  if (type && module) {
    try {
      let bundle = await rollup.rollup({
        input: join(__dirname, 'node_modules', '@architect', 'views', type, module)
      })
      let bundled = await bundle.generate({
        format: 'esm'
      })
      let body = bundled.output[0].code
      console.log('BUNDLED')

      response = {
        headers: {
          'content-type': 'text/javascript; charset=utf-8;'
        },
        body
      }
    } catch (err) {
      console.error('ERROR', err)
    }
  }

  return response
}
