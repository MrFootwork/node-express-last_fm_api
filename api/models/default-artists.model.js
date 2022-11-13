const defaultArtists = require('../assets/default-artists.json').defaultArtists

// returns a random artist from defaultArtists array
exports.getRandomArtist = function () {
	const indexRandom = Math.floor(Math.random() * defaultArtists.length)
	const artistRandom = defaultArtists[indexRandom]

	return artistRandom
}
