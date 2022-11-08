const url = require('url')
const ArtistList = require('../models/artist-list.model')
const { json2csv, ensureDirectoryExistence } = require('../utils/utils')
const fs = require('fs')
const path = require('path')

// save as csv
module.exports = async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { filename: 'my file' }
	// FIXME handle empty ArtistList
	// set name and data for csv file
	const fileName = queryObject.filename + '.csv'
	const artistsJSON = ArtistList.getList()
	// convert json to csv
	const artistsCSV = json2csv(artistsJSON)
	// save file on fs
	const savePath = path.join(__dirname, `../assets/uploads/${fileName}`)
	ensureDirectoryExistence(savePath)
	fs.writeFile(savePath, artistsCSV, function (err) {
		if (err) return console.log(err)
		console.log(`${fileName} was saved 🥳`)
	})
	// respond with csv
	res.header('Content-Type', 'text/csv')
	res.attachment(fileName)
	return res.status(200).send(artistsCSV)
}
