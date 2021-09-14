# Node-vue-url-shortener

Mongo Express &amp; Vue URL shortener

## How to run

- Ensure you have docker and docker compose setup
- run `docker-compose up` at the root of this repo
- visit http://localhost:8080 in your browser
- Enter a url into the input box (make sure to include the protocol! (http:// | https://)) - you should see a short url result

**NOTES**

- Made the choice to reset the db on each startup - saves the bother of this demo of checking for existing counts etc when starting up again with a perhaps persistent mongoDb instance. Is called in the server index although this would NEVER be right in a production app.
- The urls must include the protocol (http and https). http and https are treated as different url's - easy to change if that was required but figured it made sense to keep it this way.
- Env vars are saved in the docker-compose.yml - This again would never be the case in production we would be providing env's to the build but for the sake of this challenge there are no sensitive variables to worry about.
- Everything is vanilla css as requested although I made the assumption that including it in the style tags in vue components was still ok rather than in the main.css file.

## How to develop

There are 3 parts to the development setup for now

### setup mongodb locally if you haven't already - easiest way is with brew on mac

- brew tap mongodb/brew
- brew install mongodb-community@5.0
- brew services start mongodb-community

### Setup the api client

- ensure mongodb is already running
- `$ cd api/`
- `npm i`
- `npm run dev`

### Setup the vue client

- `$ cd client/`
- `npm i`
- `npm run serve`

visit http://localhost:8080 in your browser

## Tests

### api

- `$ cd api/`
- `npm i`
- `npm test`

### client

- `$ cd client/`
- `npm i`
- `npm run test:unit`

### Task

All completed

- [x] A user needs to be able to enter a URL and they will get an 8 character (lowercase-alphanumeric) shortened version of the URL
- [x] URLs are shortened and persisted into MongoDB via a REST API.
- [x] The frontend app will display a list of previously shortened URLs.
- [x] New URLs will be generated and added to the frontend list.
- [x] The same 8-characters cannot be used twice i.e. each shortened URL needs to be unique.
- [x] The URLs need to be shortened with the following domain 'pbid.io' e.g. https://pbid.io/f3x2ab1c
- [x] The shortened URL do not need to actually redirect/work as the domain doesn’t exist.
- [x] The entire system needs to be runnable using Docker, a simple compose file will do.
- [x] Appropriate tests should be added to the code, using the jest framework.
- [x] The app layout should be responsive.
- [x] Add a root README.md describing what the application is, and how to run it.

### Description

**The backend**

The URL shortener uses a count collection in MongoDb to convert a base 10 id to a base 36 string (base 36 a-z 0-9). The task stipulates using 8 characters. This technically gives us 36^8 (2,821,109,907,456) different combinations of shortUrl before we'd need to add another character to the short url. For the purpose of allowing full range of 36^8 combinations but maintaining 8 characters we can 0 pad anything less than 8 characters as `000000zz` is the same as `zz` when converted to base 10 (1295).

Using this mechanism we can create short URL's for each unique number. We store this shortUrl against the longUrl in mongoDb.

When the user submits a URL we check it against any record in Mongo already - if it exists then we just return the previous record rather than duplicating a new one.

The counter is incremented on a pre-save hook when entering a url record into the db. And has been arbitrarily set at a high number in order for the URL's to look a little more exciting in the demo. We also increment the count by 1000 each time in order to provide some variety to the short url's. In proudction/reality this wouldn't be the case.

**The client**

The client is built in Vue 3 using the latest composition api.

Both apps are typescript and a full version of the system can be easily started up by using docker-compose

### Areas for improvement

- Pagination to the list call - currently I dont for the demo but adding limit/offset values would allow us to do this easily.
- Env vars - they dont belong in the docker compose..
- Tests - some integration tests and some e2e tests here would be nice. Unit tests cover the key functionality though.
- Styling - little crude, could use some more attention especially around some of the jumping ui but as a flow it works and is accessible.
- Accessibility - made the basic setup work here - aria-labels for unclear buttons etc but more could be done. Colour scheme matches a good standard of contrast.
- The server setup file is very basic, no reconnection logic etc for mongo but for the purposes of this challenge app I think it's fine.
