const url = require('url')
const fetch = require('node-fetch')
const path = require('path')

// use environment variables for api-keys
const pathEnvironment = path.join(__dirname, '../config/.env')
require('dotenv').config({ path: pathEnvironment })

// choose a random artist from JSON dictionary source
const { getRandomArtist } = require('../assets/default-artists')

// load models and utils
const Artist = require('../models/artist.model')
const ArtistList = require('../models/artist-list.model')
const utils = require('../utils/utils')

module.exports = async (req, res) => {
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
			throw new error('Query does not hold an artist to search for.')
		}

		lastFm_uri = utils.getArtistURI(artistToSearchFor, apiKey)
		lastFm_response = await fetch(lastFm_uri)
		lastFm_data = await lastFm_response.json()

		if (
			lastFm_response.status !== 200 ||
			Object.keys(lastFm_data).length === 0
		) {
			throw new error('last fm api did not work -> picking random artist')
		}
	} catch (error) {
		console.log(error, error.message)

		// FIXME catch lastFm_data.error = 10 (invalid api_key)

		const randomArtist = getRandomArtist()

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
