# trvia-game-code-challenge

Simple Trivia Game to show my current Frontend and Backend Code Skills

## Requisite

`npm`
`node`
`mongodb` for backend part

## Start

To start just the Frontend (which works with react/webpack dev server)

1. `cd client/`
2. `npm i`
3. `npm start`
4. check your browser at: `http://localhost:3000`

If you want to see how it works with backend API, you will need to add your
database string in `server/server.js` line 8 - where `DB_STRING` variable is.
Once this is done, backend can be run in this way.

1. `cd server/`
2. `npm i`
3. `npm start`

### Routes

The application has 3 public routes:
`/` - Welcome page
`/questions` - Trivia Game Questions
`/results` - Result page

The API routes are:
GET `/api/scores` - return a list of all saved usernames and scores
PUT `/api/score` - save or update a score for a certain user in the db.

### Notes

This application use `create-react-app`
