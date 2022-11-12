const url = require('url')
const fetch = require('node-fetch')
const path = require('path')

// use environment variables for api-keys
const pathEnvironment = path.join(__dirname, '../config/.env')
require('dotenv').config({ path: pathEnvironment })

// choose a random artist from JSON dictionary source
const { getRandomArtist } = require('../models/default-artists.model')

// load models and utils
const Artist = require('../models/artist.model')
const ArtistList = require('../models/artist-list.model')
const utils = require('../utils/utils')

module.exports = async (req, res) => {
	// empty prior ArtistList
	ArtistList.updateArtists([])
	// read request
	const queryObject = url.parse(req.url, true).query // { artist: 'cher' }
	// get query params
	const artistToSearchFor = queryObject.artist || ''
	const apiKey = process.env.API_KEY || 0

	let lastFm_uri = ''
	let lastFm_response = {}
	let lastFm_data = {}

	try {
		if (Object.keys(queryObject).length === 0) {
			throw new Error('API call with empty response body...')
		}
		if (queryObject.artist === '') {
			throw new Error("Empty search parameter.{ artist: ''}...")
		}

		lastFm_uri = utils.getArtistURI(artistToSearchFor, apiKey)
		lastFm_response = await fetch(lastFm_uri)
		lastFm_data = await lastFm_response.json()

		if (
			lastFm_response.status !== 200 ||
			Object.keys(lastFm_data).length === 0
		) {
			throw new Error('Last.FM API call failed -> random artist will be picked')
		}
	} catch (error) {
		console.error(error, error.message)
		// if anything goes wrong, fetch an artist from source file JSON
		const randomArtist = getRandomArtist()

		lastFm_uri = utils.getArtistURI(randomArtist, apiKey)
		lastFm_response = await fetch(lastFm_uri)
		lastFm_data = await lastFm_response.json()

		if (lastFm_data.error) {
			return res.status(500).send(lastFm_data)
		}
	}
	// FIXME throw error if response data is in invalid form
	const lastFm_artists = lastFm_data.results?.artistmatches?.artist

	// shape data structure
	const lastFm_formatted = lastFm_artists.map(artist => {
		const imgIndexSmall = 0
		const imgIndexNormal = 3
		const keyImageUrl = '#text'

		let artistFormatted = {
			name: artist.name,
			mbid: artist.mbid,
			url: artist.url,
			image_small: artist.image[imgIndexSmall][keyImageUrl],
			image: artist.image[imgIndexNormal][keyImageUrl],
		}

		return new Artist(artistFormatted)
	})

	ArtistList.updateArtists(lastFm_formatted)
	return res.status(200).json(ArtistList.getList())
}
