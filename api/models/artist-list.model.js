module.exports = class ArtistList {
	_artists = []
	static instance

	constructor(artists) {
		this._artists = artists
	}

	static getInstance(artists) {
		if (!this.instance) {
			this.instance = new ArtistList(artists)
		}
		return this.instance
	}

	static updateArtists(artists) {
		this._artists = artists
	}

	static getList() {
		return this._artists
	}
}
