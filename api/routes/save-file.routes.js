const url = require('url')
const ArtistList = require('../models/artist-list.model')
const { json2csv, ensureDirectoryExistence } = require('../utils/utils')
const fs = require('fs')
const path = require('path')

// save as csv
// /save?filename=${input}
module.exports = async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { filename: 'my file' }

	const fileName = queryObject.filename + '.csv'
	const artistsJSON = ArtistList.getList()

	const artistsCSV = json2csv(artistsJSON)

	// save file on fs
	const savePath = path.join(__dirname, `../assets/uploads/${fileName}`)

	console.log('saving path: ', savePath, ensureDirectoryExistence(savePath))

	fs.writeFile(savePath, artistsCSV, function (err) {
		if (err) return console.log(err)
		console.log(`${fileName} wurde gespeichert 🥳`)
	})

	res.header('Content-Type', 'text/csv')
	res.attachment(fileName)
	return res.status(200).send(artistsCSV)
}
