@app
wonder-ltg

@static

@http
get /js/:type/:module
get /bundle/:type/:module
get /raw/:type/:module

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
