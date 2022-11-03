const express = require('express')
const path = require('path')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const url = require('url')
require('dotenv').config()

// needed for csv
const fs = require('fs')
const stringify = require('csv-stringify').stringify

// get node server running
const app = express()
const port = 4000

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))

// Parse JSON bodies (as sent by API clients)
app.use(express.json())

app
	// .use(bodyParser.json())
	// .use(bodyParser.urlencoded({ extended: true }))
	// show express the path to the distribution folder of the vue app -> serve vue app on root
	// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-vue-js-app-with-nodejs-bd86feec1a20
	.use(express.static(path.join(__dirname, '../client/dist')))

// last artists during runtime
var artists = []

// artist search endpoint
// /search?artist=${searchText}
app.get('/search', async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { artist: 'cher' }

	// build query
	const artistToSearchFor = queryObject.artist || ''
	const apiKey = process.env.API_KEY || 0
	const lastFm_url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistToSearchFor}&api_key=${apiKey}&format=json`

	// process response
	// FIXME error handle failed fetch
	// crash case: http://localhost:4000/search
	const lastFm_response = await fetch(lastFm_url)
	const lastFm_data = await lastFm_response.json()
	const lastFm_artists = lastFm_data.results?.artistmatches?.artist

	// shape data structure
	const lastFm_formatted = lastFm_artists.map(artist => {
		const imgIndexSmall = 0
		const imgIndexNormal = 2
		const keyImageUrl = '#text'

		let csvArtist = {
			name: artist.name,
			mbid: artist.mbid,
			url: artist.url,
			image_small: artist.image[imgIndexSmall][keyImageUrl],
			image: artist.image[imgIndexNormal][keyImageUrl],
		}

		artists = csvArtist
		return csvArtist
	})

	// build response
	const data = lastFm_formatted
	res.json(data)
})

// FIXME create CSV file and provide download function
// https://dev.to/davidokonji/generating-and-downloading-csv-files-using-express-js-1o4i

// save as csv
// /save?filename=${input}
// app.use(express.urlencoded({ extended: true }))

app.post('/save', async (req, res) => {
	console.log('Got body:', req.body)
	console.log(req.body.filename)
	res.send(req.body)
	// res.sendStatus(200)

	// console.log(req.body.data)
	// // read request
	// const queryObject = url.parse(req.url, true).query // { filename: 'my artists list' }
	// console.log(queryObject)
	// // use artists || make new api call
	// // convert to csv
	// // save csv
	// res.sendStatus(200)
})

app.listen(port, () => {
	console.log(`listening on ${port}`)
})
