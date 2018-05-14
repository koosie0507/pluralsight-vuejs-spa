const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const routes = require('./src/api/routes')

const indexHTML = (function readIndexHtmlFile () {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/dist', express.static(path.resolve(__dirname, './dist')))

require(path.resolve(__dirname, './build/dev-server'))(app)

routes(app)

app.get('*', function (req, res) {
  res.write(indexHTML)
  res.end()
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`server started at http://localhost:${port}`)
})
