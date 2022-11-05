const getArtistURI = function (artist, apiKey) {
	return `http://ws.audioscrobbler.com/2.0/
	?method=artist.search
	&artist=${artist}
	&api_key=${apiKey}
	&format=json`
}

exports.getArtistURI = getArtistURI
