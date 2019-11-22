const rollup = require('rollup')
const join = require('path').join
const sha = require('crypto').createHash('sha1')

exports.handler = async function http(req) {
  let params = req.pathParameters || {}
  let type = params.type
  let parts = params.module && params.module.split('-')
  let fingerprint = encodeURIComponent(parts[0])
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
      let hash = encodeURIComponent(await sha.update(body).digest('base64'))

      if (hash === fingerprint) {
        response = {
          headers: {
            'content-type': 'text/javascript; charset=utf-8;'
          },
          body
        }
      }
    } catch (err) {
      console.error('ERROR', err)
    }
  }

  return response
}
