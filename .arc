@app
wonder-ltg

@static

@http
get /js/:type/:module
get /bundle/:type/:module
get /raw/:type/:module
get /push/:type/:module
get /pusher

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
