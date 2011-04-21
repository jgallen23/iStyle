express = require "express"
app = express.createServer()

app.configure () ->
        app.use express.methodOverride()
        app.use express.bodyParser()
        app.use app.router

        app.set "views", "#{ __dirname }/templates"
        app.set "view options", layout: false

        app.use express.static "#{ __dirname }/public"
        app.use express.errorHandler { dumpExceptions: true, showStack: true }
 

app.get "/", (req, res) ->
        res.render "index.jade"

app.listen 3000
