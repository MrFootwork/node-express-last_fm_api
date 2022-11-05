// load routes
const saveFile = require('./routes/save-file.routes')
const searchArtist = require('./routes/search-artist.routes')

// define node express server
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

// allows to communicate with server, when client is served from somewhere else
const cors = require('cors')
app.use(cors())

// TODO research what express.json() actually does..😶
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// show express the path to the distribution folder of the vue app -> serve vue app on root
// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-vue-js-app-with-nodejs-bd86feec1a20
const path = require('path')
app.use(express.static(path.join(__dirname, '../client/dist')))

// API endpoints
app.get('/search', searchArtist)
app.post('/save', saveFile)

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`)
})
