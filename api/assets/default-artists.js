const defaultArtists = ['Michael Jackson', 'Sam Smith', 'Beyoncé']

module.exports = {
	// returns a random artist from defaultArtists array
	random: function () {
		const indexRandom = Math.floor(Math.random() * defaultArtists.length)
		const artistRandom = defaultArtists[indexRandom]

		return artistRandom
	},
}
