import * as jsonServer from 'json-server';
import { Express } from 'express'
import * as fs from 'fs'
import * as https from 'https'

var server: Express = jsonServer.create();

const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server 
server.use(jsonServer.bodyParser)

// Use default router
server.use(router)

const options = {
  cert: fs.readFileSync('./backend/key/cert.pem'),
  key: fs.readFileSync('./backend/key/key.pem')
}

https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})

//nodemon --watch backend backend\dist\server.js