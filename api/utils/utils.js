const { Parser } = require('json2csv')
const path = require('path')
const fs = require('fs')

exports.getArtistURI = function (artist, apiKey) {
	return `http://ws.audioscrobbler.com/2.0/
	?method=artist.search
	&artist=${artist}
	&api_key=${apiKey}
	&format=json`
}

exports.json2csv = function (dataJSON) {
	// TODO determine fields from artist.model.js
	const fields = ['name', 'mbid', 'url', 'image_small', 'image']
	const opts = { fields }

	try {
		const parser = new Parser(opts)
		const csv = parser.parse(dataJSON)
		console.log(dataJSON[0])
		return csv
	} catch (err) {
		console.error(err)
	}
}

const ensureDirectoryExistence = function (filePath) {
	const dirname = path.dirname(filePath)
	if (fs.existsSync(dirname)) return true

	ensureDirectoryExistence(dirname)
	fs.mkdirSync(dirname)
}
// only assigning function to a variable and exporting the variable
// allows to solve the Reference error with the recursion
exports.ensureDirectoryExistence = ensureDirectoryExistence
