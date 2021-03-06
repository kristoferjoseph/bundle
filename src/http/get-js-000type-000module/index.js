const rollup = require('rollup')
const join = require('path').join
const crypto = require('crypto')

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
      let bundle = await rollup.rollup({
        input: join(__dirname, 'node_modules', '@architect', 'views', type, module)
      })
      let bundled = await bundle.generate({
        format: 'esm'
      })
      let body = bundled.output[0].code
      let hash = encodeURIComponent(await crypto.createHash('sha1').update(body).digest('base64'))
      let location = `/bundle/${type}/${hash}-${module}`
      response = {
        statusCode: 302,
        headers: {
          location
        }
      }
    } catch (err) {
      console.error('ERROR', err)
    }
  }

  return response
}

