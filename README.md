# Node Express Last.fm API
## Abstract
This project provides a simple Node.js REST API application to forward API calls to the Last.fm API. It utilizes its `search.artist` method. The user provides a search string, which is responded by the Last.fm API's search result. The user then has the possibility to let the Node server write and save the received search result as a CSV file in a given data format.

The request to build this application was given as a coding challenge for a job interview.
### Requirements
- [x] Search for an artist by name based on the following endpoint artist.search, return all the
results for this artist.
- [x] Writes the result to a user-supplied CSV filename.
- [x] The CSV file should include the following information (name, mbid, url, image_small,
image)
- [x] ⇒ If no results returned from the artist.search endpoint, retrieve random artist names from a JSON dictionary source file for example:
`[‘artistName1’, ‘artistName2’, ‘artistName3’]`
- [x] Repeat as necessary until you have gathered a list of artists.

## Installation
### Prerequisites
- [Node](https://nodejs.org/en/download/)
- [git](https://git-scm.com/downloads)
### Choose project directory
Use your terminal of choice and navigate to the directory where you want to create the project folder. Clone the project into the chosen directory:
```shell
git clone https://github.com/MrFootwork/node-express-last_fm_api
```
## Node Server Installation
After cloning the repository, you see two folders.
### Navigate to api folder
```shell
cd api
```
```shell

```

[API Key](https://www.last.fm/api/accounts)
<!-- FIXME create installation & run instructions -->
# Client (Vue setup)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


