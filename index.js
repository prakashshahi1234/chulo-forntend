const express = require("express")
const path = require("path")
const app = express()
const  { createProxyMiddleware } = require('http-proxy-middleware')
app.use(express.static(path.join(__dirname, './frontend', 'build')))

const options = {

    target: 'http://localhost:8000/',
    changeOrigin: true, // needed for virtual hosted site

}



app.use("/api/v1/*",createProxyMiddleware(options))

app.get('/*', function(req, res) {

  res.sendFile(path.join(__dirname, './frontend/build/index.html'), function(err) {
     if (err) {
          res.status(500).send(err)
     }
  })
})




app.listen("3000")