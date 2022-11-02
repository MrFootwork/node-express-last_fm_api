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

// artist search endpoint
app.get('/api', async (req, res) => {
	// read request
	const queryObject = url.parse(req.url, true).query // { myQuery: '123' }
	// build query
	const artistToSearchFor = queryObject.artist || ''
	const apiKey = process.env.API_KEY || 0
	const lastFm_Url = `http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${artistToSearchFor}&api_key=${apiKey}&format=json`
	// process response
	const lastFm_response = await fetch(lastFm_Url)
	const lastFm_data = await lastFm_response.json()
	console.log(lastFm_data)
	// FIXME lastFm_data must be processed
	// it contains all artists

	// build answer
	const data = {
		name: 'test',
		mbid: 'test',
		url: 'test',
		image_small: 'test',
		image: 'test',
	}
	res.json(lastFm_data)
})
// app.post('/api', (request, response) => {
// 	console.log(request)
// 	const data = request.body
// 	const timestamp = Date.now()
// 	data.timestamp = timestamp
// 	response.json(data)
// 	console.log(response)
// })

// app.post('/api', (req, res) => {
// 	const queryObject = url.parse(req.url, true).query
// })

// eriks query
// // hello?search=123
//   // {search: 123}
//   const queryObject = url.parse(req.url as string, true).query;
//   let data = { data: [{ data: "" }] };

//   const { search } = queryObject;
//   if (search) {
//     data = await $fetch(`https://api.tvmaze.com/search/shows?q=${search}`);
//   }
//   // lazy writeHead: usually you would need to catch a 404
//   res.writeHead(200, { "Content-Type": "application/json" });
//   res.write(JSON.stringify(data));
//   res.end();
