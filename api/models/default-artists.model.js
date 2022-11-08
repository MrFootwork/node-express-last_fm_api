const defaultArtists = ['Michael Jackson', 'Sam Smith', 'Beyoncé']

// returns a random artist from defaultArtists array
exports.getRandomArtist = function () {
	const indexRandom = Math.floor(Math.random() * defaultArtists.length)
	const artistRandom = defaultArtists[indexRandom]

	return artistRandom
}
