const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const fs = require('fs')
const path = require('path')
const routes = require('./src/api/routes')
const { createBundleRenderer } = require('vue-server-renderer')
const serialize = require('serialize-javascript')
const isProd = typeof process.env.NODE_ENV !== 'undefined' && process.env.NODE_ENV === 'production'

const indexHTML = (function readIndexHtmlFile () {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const publicStaticFilePath = isProd ? '/' : '/dist'
app.use(publicStaticFilePath, express.static(path.resolve(__dirname, './dist')))

let renderer = { renderToString: function () {} }
if (isProd) {
  const bundlePath = path.resolve(__dirname, './dist/server/main.js')
  renderer = createBundleRenderer(fs.readFileSync(bundlePath, 'utf-8'))
} else {
  require(path.resolve(__dirname, './build/dev-server'))(app, bundle => {
    renderer = createBundleRenderer(bundle)
  })
}

routes(app)

app.get('*', function (req, res, next) {
  if (!renderer.renderToString) {
    return next()
  }
  const context = { url: req.url }
  renderer.renderToString(context, (err, html) => {
    if (err) {
      if (err.response && err.response.status === 401) {
        return res.redirect('/')
      } else {
        return res.status(500).send('SSR Error')
      }
    }

    html = indexHTML.replace('{{APP}}', html)
    html = html.replace('{{STATE}}',
      `<script type="text/javascript">window.__INITIAL_STATE__ = ${serialize(context.initialState, {isJSON: true})}</script>`)
    res.write(html)

    res.end()
  })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
  console.log(`server started at http://localhost:${port}`)
})
