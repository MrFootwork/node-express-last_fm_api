const url = require('url')

// FIXME create CSV file and provide download function
// https://dev.to/davidokonji/generating-and-downloading-csv-files-using-express-js-1o4i

// save as csv
// /save?filename=${input}
const saveFile = async function (req, res) {
	// read request
	const queryObject = url.parse(req.url, true).query // { filename: 'my file' }
	console.log(queryObject)
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

module.exports = saveFile
