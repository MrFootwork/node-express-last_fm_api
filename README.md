# Node Express Last.fm API
## Abstract
This project provides a simple Node.js REST API application to forward API calls to the Last.fm API. It utilizes its `search.artist` method. The user provides a search string, to which the API responds with the search result from the Last.fm API. The user then has the possibility to let Node write and save the received search result as a CSV file by calling on another API endpoint.

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
### Choose a Project Directory
Use your terminal of choice and navigate to the directory where you want to create the project folder. Clone the project into the chosen directory by running
```shell
git clone https://github.com/MrFootwork/node-express-last_fm_api
```
## Node Server Installation
After successfully cloning the repository, you find two folders. Navigate to the api folder.
```shell
cd api
```
 Install the node modules from inside `node-express-last_fm_api/api` by running
```shell
npm install
```
## Web Frontend Installation (optional)
The following installation steps are not necessary to run the Node API application. But it's always nice to see the results on an UI while testing it. If you agree, follow the following installation steps. If you only need the server up running and access the api endpoints, continue with [Set Environment Variables](#set-environment-variables).

Navigate to the client folder.
```shell
cd -
cd client

```
Install node modules inside `node-express-last_fm_api/client`.
```shell
npm install
```
Create the production build.
```shell
npm run build
```
## Set Environment Variables
Navigate to the project folder and open it in any preferred code editor or IDE. You will need to provide a valid api key. Please go to `node-express-last_fm_api/api/config/` in your editor. You should find a file named `.env.example`. Rename this file to `.env`. This file holds the following two environment variables.
```shell
API_KEY=YOUR_LAST-FM_API_KEY
PORT=4000
```
Replace `YOUR_LAST-FM_API_KEY` with your own [key from last.FM](https://www.last.fm/api/accounts). If necessary you have to register for one, first. The default port number is `4000`. Feel free to change it in your environment variables. Running the Node application locally will use this port.
## Run Server
Navigate to the server directory in `node-express-last_fm_api/api/` and start the server with
```shell
node index.js
```
If you built a production build of the client side Vue app, you can access the web app from http://localhost:4000. Without the frontend build the server will still serve to this port.
# API endpoints
| Endpoint | Response |
| ----------- | ----------- |
| `/search?artist=ARTIST` | matching artists as array of artists |
| `/save?filename=FILENAME` | matching artists as text/CSV |