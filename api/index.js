// load routes
const saveFile = require('./routes/save-file.routes')
const searchArtist = require('./routes/search-artist.routes')
const express = require('express')
const cors = require('cors')
const path = require('path')

// define node express server
const app = express()
const port = process.env.PORT || 4000

// allows to communicate with server, when client is served from somewhere else
app.use(cors())

// TODO research what express.json() actually does..😶
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// FIXME fallback route, if vue client has no dist-folder, yet
// show express the path to the distribution folder of the vue app -> serve vue app on root
app.use(express.static(path.join(__dirname, '../client/dist')))

// API endpoints
// TODO it should have app.get('../client/dist')
// this app seems to do that automatically?
app.get('/search', searchArtist)
app.post('/save', saveFile)

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`)
})
