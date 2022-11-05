const url = require('url')
const ArtistList = require('../models/artist-list.model')

// FIXME create CSV file and provide download function
// https://dev.to/davidokonji/generating-and-downloading-csv-files-using-express-js-1o4i

// needed for csv file saving
const fs = require('fs')
const stringify = require('csv-stringify').stringify

// save as csv
// /save?filename=${input}
module.exports = async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { filename: 'my file' }
	console.log(queryObject)
	console.log(ArtistList.length)
	res.status(200).json({ text: 'this text was sent back' })

	// console.log(req.body.data)
	// // read request
	// const queryObject = url.parse(req.url, true).query // { filename: 'my artists list' }
	// console.log(queryObject)
	// // use artists || make new api call
	// // convert to csv
	// // save csv
	// res.sendStatus(200)
}
