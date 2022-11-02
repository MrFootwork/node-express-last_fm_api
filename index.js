const express = require('express')
const fetch = require('node-fetch')
const bodyParser = require('body-parser')
const url = require('url')
require('dotenv').config()

// get node server running
const app = express()
app.use(bodyParser.json())
const port = process.env.PORT || 4000
app.listen(port, () => {
	console.log(`listening on ${port}`)
})

// FIXME create CSV file and provide download function
// https://dev.to/davidokonji/generating-and-downloading-csv-files-using-express-js-1o4i

// artist search endpoint
app.get('/api', async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { artist: 'cher' }
	// build query
	const artistToSearchFor = queryObject.artist || ''
	const apiKey = process.env.API_KEY || 0
	const lastFm_url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistToSearchFor}&api_key=${apiKey}&format=json`
	// process response
	const lastFm_response = await fetch(lastFm_url)
	const lastFm_data = await lastFm_response.json()
	const lastFm_artists = lastFm_data.results.artistmatches.artist
	// shape data structure
	const lastFm_formatted = lastFm_artists.map(artist => {
		const imgIndexSmall = 0
		const imgIndexNormal = 2

		let oArtist = {
			name: artist.name,
			mbid: artist.mbid,
			url: artist.url,
			image_small: artist.image[imgIndexSmall]['#text'],
			image: artist.image[imgIndexNormal]['#text'],
		}

		return oArtist
	})

	// build response
	const data = lastFm_formatted
	res.json(data)
})
