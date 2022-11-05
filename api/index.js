const express = require('express')
const path = require('path')
const fetch = require('node-fetch')

// routes
const saveFile = require('./routes/save.routes')

// FIXME Refactoring needed!
// 1. extract functions and modules
// 2. restructure folders

// use environment variables for api-keys
const pathEnvironment = path.join(__dirname, '/config/.env')
require('dotenv').config({ path: pathEnvironment })

// define node express server
const app = express()
const port = process.env.PORT || 4000

// simplify query object parsing from URIs
const url = require('url')

// needed for csv file saving
const fs = require('fs')
const stringify = require('csv-stringify').stringify

// allows to communicate with server, when client is served from somewhere else
const cors = require('cors')
app.use(cors())

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }))
// Parse JSON bodies (as sent by API clients)
app.use(express.json())
// show express the path to the distribution folder of the vue app -> serve vue app on root
// https://medium.com/bb-tutorials-and-thoughts/how-to-develop-and-build-vue-js-app-with-nodejs-bd86feec1a20
app.use(express.static(path.join(__dirname, '../client/dist')))

// choose a random artist from JSON dictionary source
const { getRandomArtist } = require('./assets/default-artists')

// last artists during runtime
var artists = []
const utils = require('./utils/utils')

// artist search endpoint
// /search?artist=${searchText}
app.get('/search', async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { artist: 'cher' }
	// get query params
	const artistToSearchFor = queryObject.artist || ''
	const apiKey = process.env.API_KEY || 0

	let lastFm_uri = ''
	let lastFm_response = {}
	let lastFm_data = {}

	try {
		lastFm_uri = utils.getArtistURI(artistToSearchFor, apiKey)
		lastFm_response = await fetch(lastFm_uri)
		lastFm_data = await lastFm_response.json()

		// console.log(lastFm_response.status, queryObject)
		// console.log(
		// 	lastFm_response.status !== 200,
		// 	Object.keys(lastFm_data).length === 0,
		// 	Object.keys(queryObject).length === 0
		// )

		if (
			lastFm_response.status !== 200 ||
			Object.keys(lastFm_data).length === 0 ||
			Object.keys(queryObject).length === 0
		) {
			throw new error("last fm api didn't work -> picking random artist")
		}
	} catch (error) {
		// console.log(error, error.message)

		// FIXME catch lastFm_data.error = 10 (invalid api_key)

		const randomArtist = getRandomArtist()
		// console.log('new search: ', randomArtist)

		lastFm_uri = utils.getArtistURI(randomArtist, apiKey)
		lastFm_response = await fetch(lastFm_uri)
		lastFm_data = await lastFm_response.json()
	}

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

app.post('/save', saveFile)

app.listen(port, () => {
	console.log(`listening on http://localhost:${port}`)
})
