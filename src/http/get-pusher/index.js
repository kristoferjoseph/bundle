// Enable secure sessions, express-style middleware, and more:
// https://docs.begin.com/en/functions/http/
//
// let begin = require('@architect/functions')

let html = `
<!doctype html>
<html lang=en>
  <head>
    <meta charset=utf-8>
    <title>Push it real good</title>
    <link rel="stylesheet" href="/styles.css">
    <link href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" rel="icon" type="image/x-icon" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/raw/pages/main.js" crossorigin="use-credentials"></script>
  </body>
</html>
`

// HTTP function
exports.handler = async function http(req) {
  console.log(req)
  return {
    headers: {
      'content-type': 'text/html; charset=utf8',
      'LINK': '</styles.css>; rel=preload; as=style, </raw/ui/header.js>; rel=preload; as=script, </raw/ui/footer.js>; rel=preload; as=script'
    },
    body: html
  }
}
