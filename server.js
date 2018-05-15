const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const routes = require('./src/api/routes')
const { createBundleRenderer } = require('vue-server-renderer')
let renderer = {}
const indexHTML = (function readIndexHtmlFile () {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/dist', express.static(path.resolve(__dirname, './dist')))

require(path.resolve(__dirname, './build/dev-server'))(app, bundle => {
  renderer = createBundleRenderer(bundle)
})

routes(app)

app.get('*', function (req, res, next) {
  if (!renderer.renderToString) {
    return next()
  }

  renderer.renderToString({ url: req.url }, (err, html) => {
    if (err) {
      return res.status(500).send('SSR Error')
    }

    res.write(indexHTML.replace('{{APP}}', html))
    res.end()
  })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`server started at http://localhost:${port}`)
})
